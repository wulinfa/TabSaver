/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/

function saveConfigtoDB(objectToSave) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(objectToSave,(result) =>{
            resolve(true);
        });
    });
}
//UNIVERSAL
function saveDatatoDB(objectToSave) {
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

function getDataFromDB() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('sessionTabs', (result) => {
            resolve(result);
        });
    });
}

function setServiceList(objectToSave) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(objectToSave,(result) =>{
            resolve(true);
        });
    });
}

function getServiceList() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('servicesList',(result) =>{
            resolve(result);
        });
    });
}
    
