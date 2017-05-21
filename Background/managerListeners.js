/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/

//default init config
let objectToSave = {
    configData: {
        simple: true,
        simpleSave: true,
        onlySave: false,
        onlySaveCloseTabs: false
    }
};

chrome.runtime.onInstalled.addListener( (details) =>{
    if(details.reason == "install"){
        saveConfigtoDB(objectToSave)
            .then((configFromDB) =>{
                chrome.runtime.openOptionsPage();
            });

    }else if(details.reason == "update"){
        getConfigFromDB()
            .then((configFromDB) =>{
                if(configFromDB.configData){
                    return 0;
                }

                if(!configFromDB.configData){
                    saveConfigtoDB(objectToSave);
                }
            });
    }
});
