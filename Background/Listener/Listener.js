/*Copyright (c) 2016 - 2021. Roger Pedrós Villorbina, All rights reserved.*/
/*Listener s'encarrega de escoltar els events i fer lo que l'hi correspongui*/


/*Listener que escolta quan es clica el boto de l'extenció*/
chrome.action.onClicked.addListener(() => {
    browserActionTrigged();
});

/*Listener a la DB interna. Si hi ha un canvi de configuracio s'executa changesOnDBUpdate() del Manager.js per a que actualizi la informació local i l'icona*/
chrome.storage.onChanged.addListener((changes, namespace) => {
    changesOnDBUpdate(changes);
});

chrome.commands.onCommand.addListener( (command) => {
    console.log('Command:', command);
});

/*Listener que controla les actualitzacions i les instalaions. */
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason == "install") {
        initialSetup();
    }
    if (details.reason == "update") {
        console.log('Updated');
        //Migrate from storage.sync to storage.local
        chrome.storage.sync.get("sessionTabs", (result) => {saveDataToDB(result);});
        chrome.storage.sync.get("configData", (result) => {saveDataToDB(result);});
        chrome.storage.sync.get("bookmarkFolderCreated", (result) => {saveDataToDB(result);});
        chrome.storage.sync.get("privacyConfigData", (result) => {saveDataToDB(result);});

        chrome.storage.sync.remove("HISTORY1");
        chrome.storage.sync.remove("HISTORY2");
        chrome.storage.sync.remove("HISTORY3");
        chrome.storage.sync.remove("HISTORY4");
        chrome.storage.sync.remove("HISTORY5");
        chrome.storage.sync.remove("HISTORY6");
        chrome.storage.sync.remove("HISTORY7");
        chrome.storage.sync.remove("HISTORY8");
        chrome.storage.sync.remove("HISTORY9");

        chrome.storage.sync.remove("sessionTabs");

        let defaultPrivacyConfigData = {
            "privacyConfigData": {
                "localStorage": true,
                "respectIncognito": false
            }
        };
        saveDataToDB(defaultPrivacyConfigData);

        }
});




