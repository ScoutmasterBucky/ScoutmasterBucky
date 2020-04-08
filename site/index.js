$(function () {
    $('#calendar').eCalendar({
        weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        textArrows: {previous: '<', next: '>'},
        eventTitle: 'Events',
        url: '',
        events: [
            // colors can be red, black, white, blue, green, yellow, brown, grey, orange, pink
            {title: 'Scoutmaster Bucky March Merit Badge Day', description: 'click here for more info', url: '#2020-03-14-SMB', datetime: new Date(2020, 2, 14), color: 'green'},
            {title: 'Scoutmaster Bucky Online', description: 'Crime Prevention Merit Badge', url: '#2020-03-16-SMBO', datetime: new Date(2020, 2, 16), color: 'SMB-online'},
            {title: 'Scoutmaster Bucky Online', description: 'Digital Technology Merit Badge', url: '#2020-03-26-SMBO', datetime: new Date(2020, 2, 26), color: 'SMB-online'},
            {title: 'Scoutmaster Bucky On The Road', description: 'Hortonville, Wisconsin', url: '#2020-03-28-SMBOTR', datetime: new Date(2020, 2, 28), color: 'blue-otr'},
            {title: 'Scoutmaster Bucky Merit Badge Special', description: 'Railroading Merit Badge', url: '#2020-03-28-SMB', datetime: new Date(2020, 2, 28), color: 'black'},
            {title: 'Scoutmaster Bucky Online', description: 'Disabilities Awareness Merit Badge', url: '#2020-04-06-SMBO', datetime: new Date(2020, 3, 6), color: 'SMB-online'},
            {title: 'Scoutmaster Bucky Online', description: 'Dog Care Merit Badge', url: '#2020-04-16-SMBO', datetime: new Date(2020, 3, 16), color: 'SMB-online'},
            {title: 'Scoutmaster Bucky Online', description: 'Energy Merit Badge', url: '#2020-04-22-SMBO', datetime: new Date(2020, 3, 22), color: 'SMB-online'},
            {title: 'Scoutmaster Bucky April Merit Badge Day', description: 'click here for more info', url: '#2020-04-25-SMB', datetime: new Date(2020, 3, 25), color: 'blue-pale'},
            {title: 'Ten Ring Rifle Shooting Day', description: 'Rifle Shooting Merit Badge', url: '#2020-05-02-TR', datetime: new Date(2020, 4, 2), color: 'TR2'},
            {title: 'Scoutmaster Bucky Online', description: 'Engineering Merit Badge', url: '#2020-05-06-SMBO', datetime: new Date(2020, 4, 6), color: 'SMB-online'},
            {title: 'Scoutmaster Bucky Online', description: 'Entrepreneurship Merit Badge', url: '#2020-05-14-SMBO', datetime: new Date(2020, 4, 14), color: 'SMB-online'},
            {title: 'Ten Ring Rifle Shooting Day', description: 'Rifle Shooting Merit Badge', url: '#2020-05-16-TR', datetime: new Date(2020, 4, 16), color: 'TR2'},
            {title: 'Scoutmaster Bucky Online', description: 'Inventing Merit Badge', url: '#2020-05-19-SMBO', datetime: new Date(2020, 4, 19), color: 'SMB-online'},
            {title: '2020 Fall Wood Badge', description: 'click here for more info', url: '#2020-09-11-WB', datetime: new Date(2020, 8, 11), color: 'rose'},
            {title: '2020 Fall Wood Badge', description: 'Weekend 1', url: '#2020-09-11-WB', datetime: new Date(2020, 8, 12), color: 'rose'},
            {title: '2020 Fall Wood Badge', description: 'Weekend 1', url: '#2020-09-11-WB', datetime: new Date(2020, 8, 13), color: 'rose'},
            {title: '2020 Fall Wood Badge', description: 'Weekend 2', url: '#2020-09-11-WB', datetime: new Date(2020, 9, 3), color: 'rose'},
            {title: '2020 Fall Wood Badge', description: 'Weekend 2', url: '#2020-09-11-WB', datetime: new Date(2020, 9, 4), color: 'rose'},
        ]
    });
});

function toggleClass(ele, findClass, toggleClass) {
    while (ele && !ele.classList.contains(findClass)) {
        ele = ele.parentElement;
    }

    if (ele) {
        ele.classList.toggle(toggleClass);
    }
}
