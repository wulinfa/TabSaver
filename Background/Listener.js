/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/

let configDataJsonUrl = "https://api.myjson.com/bins/13uvth";
let servicesJsonUrl = "https://api.myjson.com/bins/m3rbx";
let defauldBoardJsonUrl = "https://api.myjson.com/bins/bekth";

( () => {
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
                getJSON(servicesJsonUrl)
                    .then((textData) => {
                        let jsonData = JSON.parse(textData);
                        saveDatatoDB(jsonData)
                    })
            })
            .then(() => {
                getJSON(defauldBoardJsonUrl)
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

//TODO REORGANITZACIO PENDENT
let newInstall = () => {
    return new Promise((resolve, reject) => {
        //TODO Google Analytics event goes here
        resolve()
    });
};
let newUpdate = () =>{
    updateServices()
        // .then(() => {
        //     getJSON(servicesJsonUrl)
        //         .then((textData) => {
        //             let jsonData = JSON.parse(textData);
        //             saveDatatoDB(jsonData)
        //         })
        // })
        .then(() => {
            setTimeout(() => {
                chrome.runtime.openOptionsPage();
            }, 1500);
        });

};
let updateServices = () => {
    return new Promise((resolve, reject) => {
        //TODO Google Analytics event goes here
        resolve()
    });
};
//TODO REORGANITZACIO PENDENT

/*Functions called form contexMenu onCick*/
function getAndOpenPreSavedSession() {
    getPreSavedSession()
        .then((preSavedSessionFromDB) => {
            openSavedTabs(preSavedSessionFromDB.preSavedSession);
        });
}