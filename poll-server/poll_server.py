#!/usr/bin/env python3
"""Vote counter for Bucky's Weekly Poll on the scoutmasterbucky.com home page.

Runs on the home server behind nginx (see README.md). Python 3.9+ standard library only.

  GET  /poll/results?week=YYYY-MM-DD  -> {"week", "counts", "total"}
  POST /poll/vote  {"week": "YYYY-MM-DD", "choice": 0}  -> the same, after counting the vote

The questions come from the website's /weekly-poll.json, so votes are only taken for the
current week's question and for options that exist. Each week's tallies are saved as
<results dir>/<week>.json inside the filestore (question, options, counts), which Resilio
copies back to C:\\filestore\\weekly-poll\\results. Visitor addresses are never saved: only a
salted hash per week, kept outside the filestore, to cap how many votes one address can cast.

Settings (environment variables):
  POLL_PORT            port to listen on, on 127.0.0.1 (default 8787)
  POLL_RESULTS_DIR     where the weekly tallies go (the filestore's weekly-poll/results)
  POLL_PRIVATE_DIR     private working folder for the salt and per-address counts
                       (default ~/.smb-poll; never inside the filestore)
  POLL_QUESTIONS       URL or file path of weekly-poll.json
                       (default https://scoutmasterbucky.com/weekly-poll.json)
  POLL_ORIGINS         comma-separated sites allowed to call this
                       (default https://scoutmasterbucky.com,https://www.scoutmasterbucky.com)
  POLL_MAX_PER_ADDRESS votes allowed per address per week (default 25: a troop meeting on one
                       church Wi-Fi shares an address, so this only stops ballot stuffing)
"""
import datetime
import hashlib
import json
import os
import re
import secrets
import sys
import threading
import time
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

PORT = int(os.environ.get('POLL_PORT', '8787'))
RESULTS_DIR = os.environ.get('POLL_RESULTS_DIR', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'results'))
PRIVATE_DIR = os.environ.get('POLL_PRIVATE_DIR', os.path.expanduser('~/.smb-poll'))
QUESTIONS = os.environ.get('POLL_QUESTIONS', 'https://scoutmasterbucky.com/weekly-poll.json')
ORIGINS = [o.strip() for o in os.environ.get(
    'POLL_ORIGINS', 'https://scoutmasterbucky.com,https://www.scoutmasterbucky.com').split(',') if o.strip()]
MAX_PER_ADDRESS = int(os.environ.get('POLL_MAX_PER_ADDRESS', '25'))
WEEK = re.compile(r'^\d{4}-\d{2}-\d{2}$')

lock = threading.Lock()
os.makedirs(RESULTS_DIR, exist_ok=True)
os.makedirs(PRIVATE_DIR, exist_ok=True)


def central_today():
    """Today's date in Central time (Bucky Time). POLL_TODAY overrides it, for testing only."""
    if os.environ.get('POLL_TODAY'):
        return os.environ['POLL_TODAY']
    try:
        from zoneinfo import ZoneInfo
        return datetime.datetime.now(ZoneInfo('America/Chicago')).date().isoformat()
    except Exception:
        # no time zone data: Central is 5 or 6 hours behind UTC; 6 is close enough for a date
        return (datetime.datetime.utcnow() - datetime.timedelta(hours=6)).date().isoformat()


_questions = {'at': 0, 'list': []}


def questions():
    """The poll list from the website, refreshed every 15 minutes (last good copy kept)."""
    if time.time() - _questions['at'] > 900 or not _questions['list']:
        try:
            if re.match(r'^https?://', QUESTIONS):
                with urllib.request.urlopen(QUESTIONS, timeout=10) as r:
                    data = json.load(r)
            else:
                with open(QUESTIONS, encoding='utf8') as f:
                    data = json.load(f)
            if isinstance(data, list):
                _questions['list'] = data
                with open(os.path.join(PRIVATE_DIR, 'questions-cache.json'), 'w', encoding='utf8') as f:
                    json.dump(data, f)
        except Exception as e:
            print('could not load questions:', e, file=sys.stderr)
            if not _questions['list']:
                try:
                    with open(os.path.join(PRIVATE_DIR, 'questions-cache.json'), encoding='utf8') as f:
                        _questions['list'] = json.load(f)
                except Exception:
                    pass
        _questions['at'] = time.time()
    return _questions['list']


def poll_for(week):
    return next((p for p in questions() if p.get('week') == week), None)


def current_week():
    today = central_today()
    started = [p['week'] for p in questions() if p.get('week', '') <= today]
    return max(started) if started else None


def salt():
    path = os.path.join(PRIVATE_DIR, 'salt')
    if not os.path.exists(path):
        with open(path, 'w') as f:
            f.write(secrets.token_hex(32))
    with open(path) as f:
        return f.read().strip()


SALT = salt()


def write_json(path, data):
    tmp = path + '.tmp'
    with open(tmp, 'w', encoding='utf8') as f:
        json.dump(data, f, indent=2)
    os.replace(tmp, path)


def read_json(path, default):
    try:
        with open(path, encoding='utf8') as f:
            return json.load(f)
    except Exception:
        return default


def tally(week):
    poll = poll_for(week)
    n = len(poll['options']) if poll else 0
    data = read_json(os.path.join(RESULTS_DIR, f'{week}.json'), {})
    counts = (data.get('counts') or []) + [0] * n
    counts = counts[:max(n, len(data.get('counts') or []))]
    return {'week': week, 'counts': counts, 'total': sum(counts)}


def vote(week, choice, address):
    poll = poll_for(week)
    with lock:
        path = os.path.join(RESULTS_DIR, f'{week}.json')
        data = read_json(path, {})
        counts = (data.get('counts') or []) + [0] * len(poll['options'])
        counts = counts[:len(poll['options'])]
        # per-address cap, by salted hash only
        seen_path = os.path.join(PRIVATE_DIR, f'seen-{week}.json')
        seen = read_json(seen_path, {})
        key = hashlib.sha256(f'{SALT}|{week}|{address}'.encode()).hexdigest()[:24]
        if seen.get(key, 0) < MAX_PER_ADDRESS:
            seen[key] = seen.get(key, 0) + 1
            counts[choice] += 1
            write_json(seen_path, seen)
            write_json(path, {
                'week': week,
                'question': poll['question'],
                'options': poll['options'],
                'counts': counts,
                'total': sum(counts),
                'updated': datetime.datetime.now().isoformat(timespec='seconds'),
            })
    return {'week': week, 'counts': counts, 'total': sum(counts)}


class Handler(BaseHTTPRequestHandler):
    server_version = 'smb-poll'

    def cors(self):
        origin = self.headers.get('Origin', '')
        if origin in ORIGINS or re.match(r'^http://(localhost|127\.0\.0\.1)(:\d+)?$', origin):
            self.send_header('Access-Control-Allow-Origin', origin)
            self.send_header('Vary', 'Origin')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def reply(self, status, body):
        raw = json.dumps(body).encode()
        self.send_response(status)
        self.cors()
        self.send_header('Content-Type', 'application/json')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_OPTIONS(self):
        self.send_response(204)
        self.cors()
        self.end_headers()

    def do_GET(self):
        url = urlparse(self.path)
        if url.path.rstrip('/') == '/poll/results':
            week = (parse_qs(url.query).get('week') or [''])[0]
            if not WEEK.match(week) or not poll_for(week) or week > central_today():
                return self.reply(404, {'error': 'no such poll'})
            return self.reply(200, tally(week))
        if url.path.rstrip('/') == '/poll/health':
            return self.reply(200, {'ok': True, 'current': current_week()})
        self.reply(404, {'error': 'not found'})

    def do_POST(self):
        if urlparse(self.path).path.rstrip('/') != '/poll/vote':
            return self.reply(404, {'error': 'not found'})
        try:
            length = min(int(self.headers.get('Content-Length', '0')), 2000)
            body = json.loads(self.rfile.read(length) or b'{}')
            week, choice = str(body.get('week', '')), body.get('choice')
        except Exception:
            return self.reply(400, {'error': 'bad request'})
        poll = poll_for(week)
        if not poll or week != current_week():
            return self.reply(409, {'error': 'this poll is closed'})
        if not isinstance(choice, int) or isinstance(choice, bool) or not 0 <= choice < len(poll['options']):
            return self.reply(400, {'error': 'no such option'})
        address = self.headers.get('X-Real-IP') or self.client_address[0]
        self.reply(200, vote(week, choice, address))

    def log_message(self, fmt, *args):
        # no visitor addresses in the log
        sys.stderr.write('%s %s\n' % (self.log_date_time_string(), fmt % args))

    def address_string(self):
        return '-'


if __name__ == '__main__':
    print(f'Weekly poll server on 127.0.0.1:{PORT}; results in {RESULTS_DIR}', flush=True)
    ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
