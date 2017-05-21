/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/

function saveConfigtoDB(objectToSave) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(objectToSave,(result) =>{
            resolve(true);
        });
    });
}

function getConfigFromDB() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('configData',(result) =>{
            resolve(result);
        });
    });
}



function setFirstTimeConfig(objectToSave) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(objectToSave,(result) =>{
            resolve(true);
        });
    });
}

function getFirstTimeConfig() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('configData',(result) =>{
            resolve(result);
        });
    });
}