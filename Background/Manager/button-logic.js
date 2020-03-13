/*Copyright (c) 2016 - 2019. Roger Pedrós Villorbina, All rights reserved.*/
/*LOGICA*/
//Amb informació guardada i per tant per a desplegar
function simpleWithSessionSaved(dataFromDB) {
    openSavedTabs(dataFromDB.sessionTabs)
        .then(removeFromDB("sessionTabs"))
        .then(() => {
            if (this.configData.simpleSave === true) {
                getDataFromDB("bookmarkFolderCreated")
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
            saveDataToDB(objectToSave)
                .catch( (errorMessage)=>{
                    onError(errorMessage)
                })
                .then( ()=> {
                    return dataFromChromeWindow;
                })
                .then((dataFromChromeWindow) => {
                    saveDataToBookmarks(dataFromChromeWindow)
                        .then((folderId) => {
                            let objectToSave = {
                                bookmarkFolderCreated: folderId
                            };
                            saveDataToDB(objectToSave);
                        });
                    return dataFromChromeWindow;
                })
                .then((dataFromChromeWindow) => { //Guardar pestanyes al historial
                    historyManager(dataFromChromeWindow);
                    return dataFromChromeWindow;
                })
                .then((dataFromChromeWindow) => {
                    if (this.configData.onlySaveCloseTabs === true) {
                        closeActualTabs(dataFromChromeWindow);
                    }
                })
                .then(launchNotification('Guardado.','Pestañas guardadas en los marcadores.'))
                .then(updateIcon(false));
        })

}

//Sense informació guardada i per tant per guardar
function simpleWithOutSessionSaved() {
    getTabs()
        .then((dataFromChromeWindow) => { //Guardar pestanyes com a ultima sessio guardada
            //console.log(dataFromChromeWindow);
            let objectToSave = {
                sessionTabs: dataFromChromeWindow
            };
            saveDataToDB(objectToSave)
                .catch( (errorMessage)=>{
                    onError(errorMessage)
                })
                .then( ()=> {
                    return dataFromChromeWindow;
                })
                .then((dataFromChromeWindow) => {  //Guadar pestanyes als bookmarks en cas de que estigiu activat
                    if (this.configData.simpleSave === true) {
                        saveDataToBookmarks(dataFromChromeWindow)
                            .then((folderId) => {
                                let objectToSave = {
                                    bookmarkFolderCreated: folderId
                                };
                                saveDataToDB(objectToSave);
                            });
                    }
                    return dataFromChromeWindow;
                })
                .then((dataFromChromeWindow) => { //Guardar pestanyes al historial
                    historyManager(dataFromChromeWindow);
                    return dataFromChromeWindow;
                })
                .then((dataFromChromeWindow) => { //Tancar pestanyes de la finestra actual
                    closeActualTabs(dataFromChromeWindow);
                    return dataFromChromeWindow
                })
                .then((dataFromChromeWindow) => { //Col·loca el numero en el badge del icono
                    setIconBadge(dataFromChromeWindow.length);
                    return dataFromChromeWindow;
                })
                .then(updateIcon(true)) //actualiza el icono
        })

}

function onlySaveWithOutSessionSaved() {
    getTabs()
        .then((dataFromChromeWindow) => {
            let objectToSave = {
                sessionTabs: dataFromChromeWindow
            };
            saveDataToDB(objectToSave)
                .catch( (errorMessage)=>{
                    onError(errorMessage)
                })
                .then( () => {
                    return dataFromChromeWindow;
                })
                .then((dataFromChromeWindow) => {
                    saveDataToBookmarks(dataFromChromeWindow)
                        .then((folderId) => {
                            let objectToSave = {
                                bookmarkFolderCreated: folderId
                            };
                            saveDataToDB(objectToSave);
                        });
                    return dataFromChromeWindow;
                })
                .then((dataFromChromeWindow) => { //Guardar pestanyes al historial
                    historyManager(dataFromChromeWindow);
                    return dataFromChromeWindow;
                })
                .then((dataFromChromeWindow) => {
                    if (this.configData.onlySaveCloseTabs === true) {
                        closeActualTabs(dataFromChromeWindow);
                    }
                })
                .then(launchNotification('Guardado.','Pestañas guardadas en los marcadores.'))
                .then(updateIcon(false));
        })

}

function dataPreparation(dataFromChromeWindow) {
    return new Promise((resolve, reject) => {
        for (index = 0; index < dataFromChromeWindow.length; index++) {
            delete dataFromChromeWindow[index].audible;
            delete dataFromChromeWindow[index].autoDiscardable;
            delete dataFromChromeWindow[index].discarded;
            delete dataFromChromeWindow[index].height;
            delete dataFromChromeWindow[index].highlighted;
            delete dataFromChromeWindow[index].status;
            delete dataFromChromeWindow[index].width;
        }
        resolve(dataFromChromeWindow)
    });
}

function onError(errorMessage) {
    console.warn('Chrome internal error: ' + errorMessage);
    updateIcon(false);

    launchNotification('Error', 'Estas intentant una sessió mes gran del que permet la base de dades de Chrome.');
    throw new Error('This is not an error. This is just a trick to abort javascript execution.');
}