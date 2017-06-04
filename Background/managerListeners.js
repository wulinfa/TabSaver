/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/

//default init config
let objectToSaveConfig = {
    configData: {
        simple: true,
        simpleSave: true,
        onlySave: false,
        onlySaveCloseTabs: false
    }
};

let serviceArray = [
    {
        serviceName: 'Google Docs',
        serviceUrl: 'docs.google.com/document/',
        serviceId: '17c3c3db7ccde4444da4b34c2aa07c0f'
    },
    {
        serviceName: 'Google Sheets',
        serviceUrl: 'docs.google.com/spreadsheets/',
        serviceId: '288b370339d9411b14539545e993a485'
    },
    {
        serviceName: 'Google Slides',
        serviceUrl: 'docs.google.com/presentation/',
        serviceId: '651afe98c7dd334505f14033440fd896'
    },
];

let objectToSaveServices = {
    servicesList: serviceArray
};


let boards =[
    {
        title: 'TO-DO',
        boardId: '',
        tabs: []
    },
    {
        title: 'Favorites',
        boardId: '',
        tabs: []
    },
    {
        title: 'StackOverFlow',
        boardId: '',
        tabs: []
    },
    {
        title: 'GitHub',
        boardId: '',
        tabs: []
    }
];

let objectToSaveBoard = {
    boards: boards
};


chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason == "install") {
        saveDatatoDB(objectToSaveConfig)
            .then((configFromDB) => {
                saveDatatoDB(objectToSaveServices);
                saveDatatoDB(objectToSaveBoard);
                setTimeout(()=>{
                    chrome.runtime.openOptionsPage();
                }, 2000);
            });

    } else if (details.reason == "update") {
        //TODO reload form firebase
        getConfigFromDB()
            .then((configFromDB) => {
                if (configFromDB.configData) {
                    return 0;
                }

                if (!configFromDB.configData) {
                    saveDatatoDB(objectToSaveConfig);
                }
            });
    }
});
