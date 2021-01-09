/* Copyright (c) 2016 - 2021. Roger Pedrós Villorbina, All rights reserved.*/

let defaultConfigData = {
    "configData": {
        "onlySave": false,
        "onlySaveCloseTabs": false,
        "simple": true,
        "simpleSave": false,
    }
};

let defaultPrivacyConfigData = {
    "privacyConfigData": {
        "localStorage": true,
        "respectIncognito": false
    }
};

function initialSetup(){
    newInstall()
        .then(() => { //guarda la configuració per defecte a la bd
            saveDataToDB(defaultConfigData);
            saveDataToDB(defaultPrivacyConfigData);
        })
        .then(() => { //obra la pagina de settings
            setTimeout(() => {
                chrome.runtime.openOptionsPage();
            }, 1500);
        });
}


let newInstall = () => {
    return new Promise((resolve, reject) => {
        //TODO Google Analytics event goes here
        resolve()
    });
};

