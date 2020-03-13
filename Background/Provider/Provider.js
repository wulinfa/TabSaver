/*Copyright (C) 2016-2020, Roger Pedrós Villorbina, All rights reserved.*/

/*REFERENT A LA FINESTRA OBERTA*/

/*Agafa les finestres actuals de la finesta oberta*/
function getTabs() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({currentWindow: true}, (tabs) => {
            resolve(tabs);
        });
    });
}

/*Tanca les finestres que l'hi entris, normalment aquesta funció s'encadena despres de getTabs()*/
function closeActualTabs(sessionData) {
    return new Promise((resolve, reject) => {
        //Obra una finestra per evitar que es tanqui el navegador
        chrome.tabs.create({url: null});

        for (key in sessionData) {
            chrome.tabs.remove(sessionData[key].id);
        }
        resolve();
    });

}

/*Obra les pestanyes de la sessio guardada a la BD, normalment aquesta funció s'enadena despres de getSessionFromDB()*/
function openSavedTabs(sessionTabs) {
    return new Promise((resolve, reject) => {
        for (key in sessionTabs) {
            chrome.tabs.create({url: sessionTabs[key].url});
        }
        resolve();
    });
}

/* REFERENT A LA BD*/

/*Guarda l'obecjte que l'hi pasis a la BD interna*/
function saveDataToDB(objectToSave) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set(objectToSave, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError.message)
            } else {
                resolve(result);
            }
        });
    });
}

function getDataFromDB(objectToGet) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(objectToGet, (result) => {
            resolve(result);
        });
    });
}

/*Esborra de la BD el parametre d'entrada guardat*/
function removeFromDB(objectToRemove) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.remove(objectToRemove, () => {
            resolve();
        });
    });
}


function getTamany(object) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.getBytesInUse(object, (result) => {
            resolve(result);
        });
    });
}


/*REFERENT ALS MARCADORS*/

/*Creació de la carpeta dins els marcadors, creació dels marcadors dins la carpeta i RESPOSTA de la ID de la carpeta*/
function saveDataToBookmarks(sessionData) {
    return new Promise((resolve, reject) => {
        let bookmarkBar = '';
        chrome.bookmarks.create({'parentId': bookmarkBar.id, 'title': 'Saved Tabs'}, (newFolder) => {
            for (key in sessionData) {
                chrome.bookmarks.create({
                    'parentId': newFolder.id,
                    'title': sessionData[key].title,
                    'url': sessionData[key].url
                });
            }
            resolve(newFolder);
        });
    });
}

/*Elimina la carpeta amb tots els marcadors a dins*/
function removeBookmarks(bookmarkFolderId) {
    return new Promise((resolve, reject) => {
        chrome.bookmarks.removeTree(bookmarkFolderId.bookmarkFolderCreated.id, () => {
            resolve();
        });
    });
}


/*REFERENT A NOTIFICACIONS*/

/*Llençador de notificació, creada per OnlySave*/
function launchNotification(title, message) {
    let options = {
        type: 'basic',
        iconUrl: '../Resources/Icons/iconBlue.png',
        title: title,
        message: message
    };

    return new Promise((resolve, reject) => {
        chrome.notifications.create('Simple Tab Manager', options, () => {
            resolve();
        });
    });
}


/*REFERENT A L'ICONO*/

/*Actualitza l'icono segons l'estat que se l'hi envii*/
function updateIcon(status) {
    if (status === true) {
        chrome.browserAction.setIcon({
            path: "../Resources/Icons/iconbarRoll.png"
        });
    }
    if (status === false) {
        chrome.browserAction.setIcon({
            path: "../Resources/Icons/iconbarPlus.png"
        });
    } else {
        console.log("Feinades");
    }
}

/*Setejar el badge del icon */
function setIconBadge(number) {
    return new Promise((resolve, reject) => {
        let numberToString = number.toString();
        chrome.browserAction.setBadgeBackgroundColor({color: "#616161"});
        chrome.browserAction.setBadgeText({text: numberToString});
        resolve();
    });
}


/*Check ingonito*/
function isIncognitoAllowed() {
    return new Promise((resolve, reject) => {
        chrome.extension.isAllowedIncognitoAccess((isAllowedAccess) => {
            resolve(isAllowedAccess);
        });
    });

}

/*Get extension ID*/
function getExtensionID() {
    return new Promise((resolve, reject) => {
        resolve(chrome.i18n.getMessage("@@extension_id"));
    });
}





