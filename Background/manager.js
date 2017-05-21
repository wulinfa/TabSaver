/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/

this.configData  = {
    simple: null,
    simpleSave: null,
    onlySave: null,
    onlySaveCloseTabs: null
};
onInit();
function onInit() {
    //get and set config data
    getConfigFromDB()
        .then((configFromDB) => {
            if (configFromDB.configData) {
                this.configData = {
                    simple: configFromDB.configData.simple,
                    simpleSave: configFromDB.configData.simpleSave,
                    onlySave: configFromDB.configData.onlySave,
                    onlySaveCloseTabs: configFromDB.configData.onlySaveCloseTabs
                }
            }

            if (!configFromDB.configData) {
                let objectToSave = {
                    configData: {
                        simple: true,
                        simpleSave: true,
                        onlySave: false,
                        onlySaveCloseTabs: false
                    }
                };
                saveConfigtoDB(objectToSave)
                    .then(() => {
                        onInit();
                    });
            }
        });

    getDataFromDB()
        .then((dataFromDB) => {
            if (dataFromDB.sessionTabs) {//true. Aixo es que hi ha informacio guardada, per tant posem l'icono com que n'hi ha
                updateIcon(true);
            }
            if (!dataFromDB.sessionTabs) { //false. Aixo es no hi ha informacio, per tant la app es marca com a disponible per a guardarne
                updateIcon(false);
            }
        });

}

function updateIcon(status) {
    if (status === true) {
        chrome.browserAction.setIcon({path: "resources/iconbarRollReversed.png"});
    }
    if (status === false) {
        chrome.browserAction.setIcon({path: "resources/iconbarPlusReversed.png"});
    }
    else {
        console.log("Feinades");
    }
}

chrome.browserAction.onClicked.addListener(() => {
    getDataFromDB()
        .then((dataFromDB) => {
            if (dataFromDB.sessionTabs) {//true. Aixo es que hi ha informacio guardada.
                if (this.configData.simple === true) {
                    openSavedTabs(dataFromDB.sessionTabs);
                    removeDataFromDB();
                    if(this.configData.simpleSave === true){
                        //TODO EN EL FUTUR POTSE TAMBE S'HAN D'ESBORRAR DELS MARCADORS.
                    }
                updateIcon(false);
                }

                if (this.configData.onlySave === true){

                }
            }

            if (!dataFromDB.sessionTabs) { //false. Aixo es no hi ha informacio, per tant la app es marca com a disponible per a guardarne
                if (this.configData.simple === true) {
                    getTabs()
                        .then((dataFromChromeWindow)=>{
                            let objectToSave = {
                                sessionTabs: dataFromChromeWindow
                            };
                            saveDatatoDB(objectToSave);

                            if(this.configData.simpleSave === true){
                                saveDatatoBookmarks(objectToSave);
                            }
                            closeActualTabs(dataFromChromeWindow);
                        });
                    updateIcon(true);
                }

            }
        });

});

//GET TABS
function getTabs() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({currentWindow: true}, (tabs) => {
            resolve(tabs);
        });
    });
}

//SAVE TABS ON DB or bookmarks
function saveDatatoDB(objectToSave) {
    chrome.storage.local.set(objectToSave);
}
function saveDatatoBookmarks(objectToSave) {
    var bookmarkBar = '';
    chrome.bookmarks.create({'parentId': bookmarkBar.id, 'title': 'Saved Tabs'}, (newFolder) => {
        for (key in objectToSave.sessionTabs) {
            chrome.bookmarks.create({
                'parentId': newFolder.id,
                'title': objectToSave.sessionTabs[key].title,
                'url': objectToSave.sessionTabs[key].url
            });
        }

    });

}

//GET DATA FORM DB
function getDataFromDB() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('sessionTabs', (result) => {
            resolve(result);
        });
    });
}

//remove bd or boomarks
function removeDataFromDB() {
    chrome.storage.local.remove('sessionTabs', () => {

    });
}
function removeBookmarks() {
    
}

//TANCAR O OBRE LES PESTANYES
function closeActualTabs(dataFromChromeWindow) {
    chrome.tabs.create({url: null});

    for (key in dataFromChromeWindow) {
        chrome.tabs.remove(dataFromChromeWindow[key].id, function () {
        });
    }
}
function openSavedTabs(sessionTabs) {
    for (key in sessionTabs) {
        //console.log(sessionTabs[key]);
        chrome.tabs.create({url: sessionTabs[key].url});

    }
}





