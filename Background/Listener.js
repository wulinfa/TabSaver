/*Copyright (C) 2016-2019, Roger Pedrós Villorbina, All rights reserved.*/
/*Listener s'encarrega de escoltar els events i fer lo que l'hi correspongui*/

let configDataFromUrl = "https://api.myjson.com/bins/13uvth";
let defaultConfigData = {
    "configData": {
        "onlySave": false,
        "onlySaveCloseTabs": false,
        "simple": true,
        "simpleSave": true
    }
};

(() => {
    /*Comprovacions inicials*/
    setContextMenu(); //Actualment no funcional. Aquesta funció pretent incluir conext en el boto dret.
})();

/*Listener que escolta quan es clica el boto de l'extenció*/
chrome.browserAction.onClicked.addListener(() => {
    browserActionTrigged();
});

/*Listener a la DB interna. Si hi ha un canvi de configuracio s'executa changesOnDBUpdate() del Manager.js per a que actualizi la informació local i l'icona*/
chrome.storage.onChanged.addListener((changes, namespace) => {
    changesOnDBUpdate(changes);
});

chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
});


/*Listener que controla les actualitzacions i les instalaions. */
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason == "install") {
        newInstall()
            .then(() => {
                saveDatatoDB(defaultConfigData)
            })
            .then(() => {
                setTimeout(() => {
                    chrome.runtime.openOptionsPage();
                }, 1500);
            });
    }

    if (details.reason == "update") {
        // getJSON(configDataFromUrl).then((textData) => {
        //     let jsonData = JSON.parse(textData);
        //     saveDatatoDB(jsonData)
        // })
    }
});

let newInstall = () => {
    return new Promise((resolve, reject) => {
        //TODO Google Analytics event goes here
        resolve()
    });
};