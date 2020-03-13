/*
 * Copyright (c) 2016 - 2020. Roger Pedrós Villorbina, All rights reserved.
 *
 */

/*Comproba l'icona que hauria d'anar i la actualiza*/
function checkIconStatus() {
    getDataFromDB("sessionTabs")
        .then((dataFromDB) => {
            if (dataFromDB.sessionTabs) {//true. Aixo es que hi ha informacio guardada, per tant posem l'icono com que n'hi ha
                if (this.configData.onlySaveCloseTabs === true) {
                    let emptyBadge = "";
                    setIconBadge(emptyBadge)
                        .then(() => {
                            updateIcon(false);
                        })
                }
                if (this.configData.onlySave === true) {
                    let emptyBadge = "";
                    setIconBadge(emptyBadge)
                        .then(() => {
                            updateIcon(false);
                        })
                }
                if (this.configData.simple === true) {
                    setIconBadge(dataFromDB.sessionTabs.length)
                        .then(() => {
                            updateIcon(true);
                        })
                }
            }

            if (!dataFromDB.sessionTabs) { //false. Aixo es no hi ha informacio, per tant la app es marca com a disponible per a guardarne
                updateIcon(false);
            }
        });
}

