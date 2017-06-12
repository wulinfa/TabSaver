/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/
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
function saveDatatoDB(objectToSave) {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set(objectToSave, (result) => {
            resolve();
        });
    });
}

/*Recupera de la BD la configuració del usuari*/
function getConfigFromDB() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('configData', (result) => {
            resolve(result);
        });
    });
}

/*Recupera de la BD la carpeta dels marcadors on s'haguardat la informació*/
function getBookmarkFolderId() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('bookmarkFolderCreated', (result) => {
            resolve(result);
        });
    });
}

/*Recupera de la BD la sessio guardada*/
function getSessionFromDB() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('sessionTabs', (result) => {
            resolve(result);
        });
    });
}

/*Recupera de la BD els serveis*/
function getServiceList() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('servicesList', (result) => {
            resolve(result);
        });
    });
}

/*Recupera de la BD els boards*/
function getBoards() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('boards', (result) => {
            resolve(result);
        });
    });
}

/*Recupera de la BD la sessio preguarda*/
function getPreSavedSession() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('preSavedSession', (result) => {
            resolve(result);
        });
    });
}

/*Esborra de la BD la sessio guardada*/
function removeSessionFromDB() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.remove('sessionTabs', () => {
            resolve();
        });
    });
}


/*REFERENT ALS MARCADORS*/
/*Creació de la carpeta dins els marcadors, creació dels marcadors dins la carpeta i RESPOSTA de la ID de la carpeta*/
function saveDatatoBookmarks(sessionData) {
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
//TODO Fer-la dinamica: launchNotification(title, message)
function launchNotification() {
    let options = {
        type: 'basic',
        iconUrl: 'Resources/Icons/iconBlue.png',
        title: 'Guardado.',
        message: 'Pestañas guardadas en los marcadores.'
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
        chrome.browserAction.setIcon({path: "Resources/Icons/iconbarRollReversed.png"});
    }
    if (status === false) {
        chrome.browserAction.setIcon({path: "Resources/Icons/iconbarPlusReversed.png"});
    }

    else {
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


/*REFEENT ALS MENUS*/
/*Creacio de menus*/
function setContextMenu() {

        // chrome.contextMenus.create({
        //     'title': 'Cambiar a "Solo guardado"',
        //     'contexts': ['all'],
        //     /*'onclick': ,*/
        // });

        chrome.contextMenus.create({
            'title': 'Abrir sessión pre-guardada',
            'contexts': ['all'],
            'onclick': getAndOpenPreSavedSession
        });

        // chrome.contextMenus.create({
        //     'title': 'Suspender pestañas',
        //     'contexts': ['all'],
        //     /*'onclick': ,*/
        // });

        // chrome.contextMenus.create({
        //     'title': 'Unir ventanas en una',
        //     'contexts': ['all'],
        //     /*'onclick': ,*/
        // });
}



/*REFERENT ALS SCREENSHOTS*/
/*Creació dels screenshots*/
function doScrenshots() {

}

