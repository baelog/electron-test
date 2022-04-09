const communicator = (ipcMain) => {
    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log(arg);
        event.sender.send('asynchronous-reply', 'pong');
    })
};

const transponder = (ipcRenderer) => {
    ipcRenderer.on('asynchronous-message', (event, arg) => {
        console.log(arg);
    });
    ipcRenderer.send('asynchronous-reply', 'ping');
};

module.exports =  {communicator, transponder};