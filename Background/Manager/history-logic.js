/* Copyright (c) 2016 - 2021. Roger Pedrós Villorbina, All rights reserved.*/

/*Manager de historial: Actualitzar i controlar que l'array de historial manté el tamany desitjat perque no es faci molt gran*/

function historyManager(dataFromChromeWindow) {
    checkIfDataHasToBeSaved(dataFromChromeWindow)
        .catch( ()=>{
            throw new Error('This is not an error. This is just a trick to abort javascript execution.');
        })
        .then((dataFromChromeWindow) => {
            dataPreparation(dataFromChromeWindow) //TODO PENDENT DE ELIMINAR !!!!
                .then((historyData) => {
                    //PREPACIO DE LA SESSIO A GUARDAR
                    let session = {date: Date.now(), sessionTabs: historyData};
                    return session
                })
                .then((session) => {
                    checkAndSet(1, session)
                });
        })
}

function checkIfDataHasToBeSaved(dataFromChromeWindow) {
    return new Promise((resolve, reject) => {
        if (this.privacyConfigData.respectIncognito === true && dataFromChromeWindow[0].incognito === true) {
            reject();
        }

        if (this.privacyConfigData.respectIncognito === false || dataFromChromeWindow[0].incognito === false) {
            resolve(dataFromChromeWindow)
        }
    });
}

let historyEntries = 10;

function checkAndSet(historyPosition, historyToSave) {
    if (historyPosition >= historyEntries) {
        return true
    }

    let historyN = String("HISTORY" + historyPosition);
    getDataFromDB(historyN).then((resposta) => {
        let objectToSave = {[historyN]: historyToSave};
        saveDataToDB(objectToSave);

        if (resposta.hasOwnProperty(historyN)) {
            checkAndSet(historyPosition + 1, resposta[Object.keys(resposta)[0]])
        }
    });
}

