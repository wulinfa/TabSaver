/*Copyright (C) 2016-2020, Roger Pedrós Villorbina, All rights reserved.*/
/*Listener s'encarrega de escoltar els events i fer lo que l'hi correspongui*/


/*Listener que escolta quan es clica el boto de l'extenció*/
chrome.browserAction.onClicked.addListener(() => {
    browserActionTrigged();
});

/*Listener a la DB interna. Si hi ha un canvi de configuracio s'executa changesOnDBUpdate() del Manager.js per a que actualizi la informació local i l'icona*/
chrome.storage.onChanged.addListener((changes, namespace) => {
    changesOnDBUpdate(changes);
});

chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);
});

/*Listener que controla les actualitzacions i les instalaions. */
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason == "install") {
        initialSetup();
    }
    if (details.reason == "update") {
        console.log('updated');
    }
});



