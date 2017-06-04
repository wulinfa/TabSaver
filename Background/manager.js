/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/

this.configData = {};
//on init:

(function () {
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
                // TODO? Si no hi ha informació asigada es torna afegir
            }
        });

    getSessionFromDB()
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
})();

function onInit() {}


chrome.browserAction.onClicked.addListener(() => {
    onInit(); //TODO IMPORTANT TO FIX.

    getSessionFromDB()
        .then((dataFromDB) => {
            if (dataFromDB.sessionTabs) {//true. Aixo es que HI HA informacio guardada.
                if (this.configData.simple === true) {
                    simpleWithSessionSaved(dataFromDB);
                }

                if (this.configData.onlySave === true) {
                    onlySaveWithSessionSaved();
                }
            }

            if (!dataFromDB.sessionTabs) { //false. Aixo es no hi ha informacio guardada.
                if (this.configData.simple === true) {
                    simpleWithOutSessionSaved();
                }

                if (this.configData.onlySave === true) {
                    onlySaveWithOutSessionSaved();
                }

            }
        });

});


function simpleWithSessionSaved(dataFromDB) {
    openSavedTabs(dataFromDB.sessionTabs);
    removeSessionFromDB();
    if (this.configData.simpleSave === true) {
        getBookmarkFolderId()
            .then((bookmarkFolderId)=>{
                removeBookmarks(bookmarkFolderId);
            });
    }
    updateIcon(false);
}

function onlySaveWithSessionSaved() {
    getTabs()
        .then((dataFromChromeWindow) => {
            let objectToSave = {
                sessionTabs:  dataFromChromeWindow
            };

            saveDatatoDB(objectToSave);
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

function simpleWithOutSessionSaved() {
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

function onlySaveWithOutSessionSaved() {
    getTabs()
        .then((dataFromChromeWindow) => {
            let objectToSave = {
                sessionTabs: dataFromChromeWindow
            };
            saveDatatoDB(objectToSave);
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

