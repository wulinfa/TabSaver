/*
 * Copyright (c) 2016 - 2019. Roger Pedrós Villorbina, All rights reserved.
 *
 */

/*Manager de historial: Actualitzar i controlar que l'array de historial manté el tamany desitjat perque no es faci molt gran*/

function dataPreparation(dataFromChromeWindow) {
    return new Promise((resolve, reject) => {

        for (index = 0; index < dataFromChromeWindow.length; index++) {
            delete dataFromChromeWindow[index].active;
            delete dataFromChromeWindow[index].audible;
            delete dataFromChromeWindow[index].autoDiscardable;
            delete dataFromChromeWindow[index].discarded;
            delete dataFromChromeWindow[index].height;
            delete dataFromChromeWindow[index].highlighted;
            delete dataFromChromeWindow[index].mutedInfo;
            delete dataFromChromeWindow[index].status;
            delete dataFromChromeWindow[index].width;
            //console.log(dataFromChromeWindow[index]);
        }
        resolve(dataFromChromeWindow)
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

function historyManager(dataFromChromeWindow) {
    dataPreparation(dataFromChromeWindow)
        .then((historyData) => {
            //PREPACIO DE LA SESSIO A GUARDAR
            let session = {date: Date.now(), sessionTabs: historyData};
            return session
        })
        .then((session) => {
            //Dictaminar si puc escriure en la db
            let a = JSON.stringify(session);
            let b = encodeURI(a).split(/%..|./).length - 1;
            console.log(b);

            return session
        })
        .then((session) => {
            checkAndSet(1, session)
        });

}
