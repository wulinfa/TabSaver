/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/
this.configData = {};

(() => {
    /*Comprovacions inicials*/
    checkModeStatus();
    checkIconStatus();
})();

chrome.browserAction.onClicked.addListener(() => {
    if (this.configData.simple === undefined || this.configData.onlySave === undefined) {
        alert('Problema con la configuración guardada');
        chrome.runtime.openOptionsPage();
    }

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

/*Listener a la DB interna. Si hi ha un canvi a configS'actualitza automaticament la configuració local i l'icona*/
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.configData) {
        checkModeStatus();
        checkIconStatus();
    }
});

/*Comproba l'icona que hauria d'anar i la actualiza*/
function checkIconStatus() {
    getSessionFromDB()
        .then((dataFromDB) => {
            if (dataFromDB.sessionTabs) {//true. Aixo es que hi ha informacio guardada, per tant posem l'icono com que n'hi ha
                if (this.configData.onlySaveCloseTabs === true) {
                    let emptyBadge = "";
                    setIconBadge(emptyBadge)
                        .then(() => {
                            updateIcon(false);
                        })
                }
                if (this.configData.onlySave === true) {
                    let emptyBadge = "";
                    setIconBadge(emptyBadge)
                        .then(() => {
                            updateIcon(false);
                        })
                }
                if (this.configData.simple === true) {
                    setIconBadge(dataFromDB.sessionTabs.length)
                        .then(() => {
                            updateIcon(true);
                        })
                }
            }
            if (!dataFromDB.sessionTabs) { //false. Aixo es no hi ha informacio, per tant la app es marca com a disponible per a guardarne
                updateIcon(false);
            }
        });
}
/*Comproba la configuració elegida per l'usuari i la carrega localment*/
function checkModeStatus() {
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
        });
}

function simpleWithSessionSaved(dataFromDB) {
    //TODO? FER LA CRIDA AQUI DINS?
    openSavedTabs(dataFromDB.sessionTabs)
        .then(removeSessionFromDB())
        .then(() => {
            if (this.configData.simpleSave === true) {
                getBookmarkFolderId()
                    .then((bookmarkFolderId) => {
                        removeBookmarks(bookmarkFolderId);
                    });
            }
        })
        .then(() => {
            let emptyBadge = "";
            setIconBadge(emptyBadge);
        })
        .then(updateIcon(false));
}

function onlySaveWithSessionSaved() {
    getTabs()
        .then((dataFromChromeWindow) => {
            let objectToSave = {
                sessionTabs: dataFromChromeWindow
            };
            saveDatatoDB(objectToSave);
            return dataFromChromeWindow;
        })
        .then((dataFromChromeWindow) => {
            saveDatatoBookmarks(dataFromChromeWindow)
                .then((folderId) => {
                    let objectToSave = {
                        bookmarkFolderCreated: folderId
                    };
                    saveDatatoDB(objectToSave);
                });
            return dataFromChromeWindow;
        })
        .then((dataFromChromeWindow) => {
            if (this.configData.onlySaveCloseTabs === true) {
                closeActualTabs(dataFromChromeWindow);
            }
        })
        .then(launchNotification())
        .then(updateIcon(false));
}

function simpleWithOutSessionSaved() {
    getTabs()
        .then((dataFromChromeWindow) => {
            let objectToSave = {
                sessionTabs: dataFromChromeWindow
            };
            saveDatatoDB(objectToSave);
            return dataFromChromeWindow;
        })
        .then((dataFromChromeWindow) => {
            if (this.configData.simpleSave === true) {
                saveDatatoBookmarks(dataFromChromeWindow)
                    .then((folderId) => {
                        let objectToSave = {
                            bookmarkFolderCreated: folderId
                        };
                        saveDatatoDB(objectToSave);
                    });
            }
            return dataFromChromeWindow;
        })
        .then((dataFromChromeWindow) => {
            closeActualTabs(dataFromChromeWindow);
            return dataFromChromeWindow
        })
        .then((dataFromChromeWindow) => {
            setIconBadge(dataFromChromeWindow.length);
            return dataFromChromeWindow;
        })
        .then(updateIcon(true))
}

function onlySaveWithOutSessionSaved() {
    getTabs()
        .then((dataFromChromeWindow) => {
            let objectToSave = {
                sessionTabs: dataFromChromeWindow
            };
            saveDatatoDB(objectToSave);
            return dataFromChromeWindow;
        })
        .then((dataFromChromeWindow) => {
            saveDatatoBookmarks(dataFromChromeWindow)
                .then((folderId) => {
                    let objectToSave = {
                        bookmarkFolderCreated: folderId
                    };
                    saveDatatoDB(objectToSave);
                });
            return dataFromChromeWindow;
        })
        .then((dataFromChromeWindow) => {
            if (this.configData.onlySaveCloseTabs === true) {
                closeActualTabs(dataFromChromeWindow);
            }
        })
        .then(launchNotification())
        .then(updateIcon(false));
}

