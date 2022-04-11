// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

require('electron').ipcRenderer.on('asyncChannelToRenderer', (event, arg) => {
    console.log(arg + ' from main')
    if (arg === 'hello') {
        event.sender.send('asyncChannelToMain', 'world')
    }
})




/*
clients.on('data', (data) => {
    console.log(data.toString());
    clients.end();
});

clients.on('end', () => {
    console.log('disconnected from server');
});*/