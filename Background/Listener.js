/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/

let configDataJsonUrl = "https://api.myjson.com/bins/13uvth";

(() => {
    /*Comprovacions inicials*/
    setContextMenu();
    //newUpdate();
})();


/*Listener que controla les actualitzacions i les instalaions. */
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason == "install") {
        newInstall()
            .then(() => {
                getJSON(configDataJsonUrl)
                    .then((textData) => {
                        let jsonData = JSON.parse(textData);
                        saveDatatoDB(jsonData)
                    })
            })
            .then(() => {
                setTimeout(() => {
                    chrome.runtime.openOptionsPage();
                }, 1500);
            });
    }

    if (details.reason == "update") {
        newUpdate();

    }
});

let newInstall = () => {
    return new Promise((resolve, reject) => {
        //TODO Google Analytics event goes here
        resolve()
    });
};
let newUpdate = () =>{
    return new Promise((resolve, reject) => {
        //TODO Google Analytics event goes here
        resolve()
    });
};


let getJSON = (url) => {
    return new Promise((resolve, reject) => {
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                resolve(this.responseText)
            }
        });

        xhr.open("GET", url);
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(data);
    });
};

/*Functions called form contexMenu onCick
* Generador del menu, quan el boto dret es clicat
* */
function getAndOpenPreSavedSession() {

    getPreSavedSession()
        .then((preSavedSessionFromDB) => {
            openSavedTabs(preSavedSessionFromDB.preSavedSession);
        });
}