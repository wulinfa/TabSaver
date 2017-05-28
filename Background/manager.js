/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/

this.configData = {
    simple: null,
    simpleSave: null,
    onlySave: null,
    onlySaveCloseTabs: null
};
//on init:
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
                alert('Sin configuración del modo de trabajo. Asigna uno en "configuración".')
            }
        });

    getDataFromDB()
        .then((dataFromDB) => {
            if (dataFromDB.sessionTabs) {//true. Aixo es que hi ha informacio guardada, per tant posem l'icono com que n'hi ha
                if (this.configData.onlySaveCloseTabs === true) {
                    updateIcon(false);
                }
                if (this.configData.simple === true) {
                    updateIcon(true);
                }
            }
            if (!dataFromDB.sessionTabs) { //false. Aixo es no hi ha informacio, per tant la app es marca com a disponible per a guardarne
                updateIcon(false);
            }
        });

}
function updateIcon(status) {
    if (status === true) {
        chrome.browserAction.setIcon({path: "Resources/Icons/iconbarRollReversed.png"});
    }
    if (status === false) {
        chrome.browserAction.setIcon({path: "Resources/Icons/iconbarPlusReversed.png"});
    }
    else {
        console.log("Feinades");
    }
}

chrome.browserAction.onClicked.addListener(() => {
    onInit();

    getDataFromDB()
        .then((dataFromDB) => {
            if (dataFromDB.sessionTabs) {//true. Aixo es que HI HA informacio guardada.
                if (this.configData.simple === true) {
                    openSavedTabs(dataFromDB.sessionTabs);
                    removeDataFromDB();
                    if (this.configData.simpleSave === true) {
                        getBookmarkFolderId()
                            .then((bookmarkFolderId)=>{
                                removeBookmarks(bookmarkFolderId);
                            });
                    }
                    updateIcon(false);
                }

                if (this.configData.onlySave === true) {
                    getTabs()
                        .then((dataFromChromeWindow) => {
                            let objectToSave = {
                                sessionTabs:  dataFromChromeWindow
                            };
                            //saveDatatoDB(objectToSave); INTERESA QUE ES GUARDI LA INFORMACIÓ? SI L'USUARI CANVIA A SIMPLE ES POT PERDRE LA SESSIO.
                            saveDatatoBookmarks(dataFromChromeWindow)
                                .then((folderId) => {
                                    let objectToSave = {
                                        bookmarkFolderCreated: folderId
                                    };
                                    saveDatatoDB(objectToSave);
                                });

                            if (this.configData.onlySaveCloseTabs === true) {
                                closeActualTabs(dataFromChromeWindow);
                            }
                            launchNotification();
                        });
                }
            }

            if (!dataFromDB.sessionTabs) { //false. Aixo es no hi ha informacio
                if (this.configData.simple === true) {
                    getTabs()
                        .then((dataFromChromeWindow) => {
                            let objectToSave = {
                                sessionTabs: dataFromChromeWindow
                            };
                            saveDatatoDB(objectToSave);

                            if (this.configData.simpleSave === true) {
                                saveDatatoBookmarks(dataFromChromeWindow)
                                    .then((folderId) => {
                                        let objectToSave = {
                                            bookmarkFolderCreated: folderId
                                        };
                                        saveDatatoDB(objectToSave);
                                    });
                            }
                            closeActualTabs(dataFromChromeWindow);
                        });
                    updateIcon(true);
                }

                if (this.configData.onlySave === true) {
                    getTabs()
                        .then((dataFromChromeWindow) => {
                            let objectToSave = {
                                sessionTabs: dataFromChromeWindow
                            };
                            //saveDatatoDB(objectToSave);
                            saveDatatoBookmarks(dataFromChromeWindow)
                                .then((folderId) => {
                                    let objectToSave = {
                                        bookmarkFolderCreated: folderId
                                    };
                                    saveDatatoDB(objectToSave);
                                });

                            if (this.configData.onlySaveCloseTabs === true) {
                                closeActualTabs(dataFromChromeWindow);
                            }
                            launchNotification();
                        });
                }

            }
        });

});

//Captura pestanyes
function getTabs() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({currentWindow: true}, (tabs) => {
            resolve(tabs);
        });
    });
}

//Guardar informacio a la BD o als marcadors
function saveDatatoDB(objectToSave) {
    chrome.storage.local.set(objectToSave);
}
function saveDatatoBookmarks(dataFromChromeWindowToBookmark) {
    return new Promise((resolve, reject) => {
        let bookmarkBar = '';
        chrome.bookmarks.create({'parentId': bookmarkBar.id, 'title': 'Saved Tabs'}, (newFolder) => {
            for (key in dataFromChromeWindowToBookmark) {
                chrome.bookmarks.create({
                    'parentId': newFolder.id,
                    'title': dataFromChromeWindowToBookmark[key].title,
                    'url': dataFromChromeWindowToBookmark[key].url
                });
            }
            resolve(newFolder);
        });
    });

}

//Agafa informaci de la BD
function getDataFromDB() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('sessionTabs', (result) => {
            resolve(result);
        });
    });
}
function getBookmarkFolderId() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('bookmarkFolderCreated', (result) => {
            resolve(result);
        });
    });
}

//Esborrar BD o marcadors
function removeDataFromDB() {
    chrome.storage.local.remove('sessionTabs', () => {

    });
}
function removeBookmarks(bookmarkIdFolder) {
    chrome.bookmarks.removeTree(bookmarkIdFolder.bookmarkFolderCreated.id);
}

//Tancar i obrir pestanyes
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

//Notification
function launchNotification() {
    let options = {
        type: 'basic',
        iconUrl: 'Resources/iconBlueL.png',
        title: 'Guardado.',
        message: 'Pestañas guardadas en los marcadores.'
    };

    chrome.notifications.create('Simple Tab Manager', options);
}

//Screenshots
function doScrenshots() {

}



