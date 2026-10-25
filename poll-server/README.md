# Bucky's Weekly Poll vote server

The home page shows a weekly Scouting poll right below the news. The questions live in
`src/data/weekly-poll.yaml` (one per Monday) and the site publishes them at
`/weekly-poll.json`. This small program counts the votes. It runs on the home server next to
the filestore, behind nginx, at `https://filestore.scoutmasterbucky.com/poll/`.

- `GET /poll/results?week=2026-10-26` returns that week's counts.
- `POST /poll/vote` with `{"week": "2026-10-26", "choice": 0}` counts a vote for this week's
  question and returns the counts.
- `GET /poll/health` shows whether it is running and which week is current.

Each week's tallies are saved in the filestore at `weekly-poll/results/<week>.json`, so Resilio
copies them back to `C:\filestore\weekly-poll\results`. Visitor addresses are never stored; a
salted hash per week, kept in a private folder outside the filestore, caps votes per address.

## Install on the home server (Linux with systemd)

Needs Python 3.9 or newer (standard library only).

1. Copy `poll_server.py` to `/opt/smb-poll/poll_server.py`.
2. Create `/etc/systemd/system/smb-poll.service`, with `RESULTS_DIR` set to the server's
   filestore folder plus `/weekly-poll/results`:

   ```ini
   [Unit]
   Description=Bucky's Weekly Poll vote server
   After=network-online.target

   [Service]
   ExecStart=/usr/bin/python3 /opt/smb-poll/poll_server.py
   Environment=POLL_RESULTS_DIR=/path/to/filestore/weekly-poll/results
   Environment=POLL_PRIVATE_DIR=/var/lib/smb-poll
   StateDirectory=smb-poll
   DynamicUser=yes
   ReadWritePaths=/path/to/filestore/weekly-poll/results
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

   If the results folder belongs to the Resilio user, replace `DynamicUser=yes` with
   `User=` that account so the files it writes stay syncable.

3. Start it: `sudo systemctl daemon-reload && sudo systemctl enable --now smb-poll`
4. In the nginx `server` block for `filestore.scoutmasterbucky.com`, add:

   ```nginx
   location /poll/ {
       proxy_pass http://127.0.0.1:8787;
       proxy_set_header X-Real-IP $remote_addr;
   }
   ```

   then `sudo nginx -t && sudo systemctl reload nginx`.
5. Check it: `https://filestore.scoutmasterbucky.com/poll/health` should show
   `{"ok": true, "current": "..."}`.

## Test on a PC

```bash
POLL_QUESTIONS=weekly-poll.json POLL_RESULTS_DIR=results POLL_TODAY=2026-11-03 python poll_server.py
```

With the site's dev server running, open `http://localhost:4321/?poll-date=2026-11-03`; on
localhost the page talks to the test server on port 8787 instead of the real one.

## Adding questions

Add weeks to the end of `src/data/weekly-poll.yaml`, one per Monday, in order. Never reorder or
reword the options of a week that has started, because votes are counted by position. The build
warns, and the Monday Scouting America watch reports, when four or fewer weeks are left.
