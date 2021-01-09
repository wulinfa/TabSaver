/*Copyright (c) 2016 - 2021. Roger Pedrós Villorbina, All rights reserved.*/
/*Clase que controla la generacio dels historials*/

$(document).ready(() => {
    this.privacyConfigData = {};
    let historyEntries = 11;

    /*STEP 1: Peticio de configuració de privacitat*/
    let getPrivacyConfigData = () => {
        let wait = $.Deferred();
        getDataFromDB('privacyConfigData')
            .then((configFromDB) => {
                this.privacyConfigData = configFromDB.privacyConfigData;
                wait.resolve();
            });
        return wait.promise();
    };

    /*Generador de la targeta en base la informació de la ultima sessio*/
    getPrivacyConfigData()
        .then(() => {
            getAndGenLastSessionSaved();
        })
        .then(() => {
            getAndGenHistory(1);
        });


    function getAndGenLastSessionSaved() {
        let lastSessionSavedTag = $("#lastSessionSaved");
        let sessionNotFoundTag = $("#sessionNotFound");

        getDataFromDB("sessionTabs")
            .then((lastSessionSaved) => {
                if (!_.isNil(lastSessionSaved.sessionTabs)) {
                    _.forEach(lastSessionSaved.sessionTabs, (tabData) => {
                        cardGeneration(tabData, lastSessionSavedTag)
                    });
                }

                if (_.isNil(lastSessionSaved.sessionTabs)) {
                    sessionNotFound(sessionNotFoundTag);
                }
            });

    }

    //Aquesta funció genera les sessions dels historials, amb les seves pestanyes i tot. A mes, també inicialitza el scrollhortizontal de cada sessió
    function getAndGenHistory(historyPosition) {
        let historyPanel = $("#historyPanel");

        if (historyPosition >= historyEntries) {
            $(document).trigger('historyGenerated_event');
            return true
        }
        let historyN = String("HISTORY" + historyPosition);
        getDataFromDB(historyN).then((resposta) => {

            if (resposta.hasOwnProperty(historyN)) {
                historyPanelGeneration(historyPanel, historyPosition);
                let tagN = '#historySession' + historyPosition;
                let historyTagN = $(tagN);
                horitzontalSliderInit(tagN+'-container'); //Inicialització dels sliders hortizontals. El afegit "-container" en el HTML es un element que esta per sobre de tagN, i per tant per evitar conflictes. Ja que en tagN es on es genera les "cards"/pestanyes de la sessio

                _.forEach(resposta[Object.keys(resposta)[0]].sessionTabs, (historyData) => {
                    if (!_.isNil(historyData)) {
                        cardGeneration(historyData, historyTagN);
                    }

                    if (_.isNil(historyData)) { //TODO REVISAR SI REALMENT QUAN UNA SESSIO ESTA BUIDA ENTRA AQUI O S'HA DE POSAR FORA DEL BUCLE?
                        sessionNotFound(historyTagN);
                    }
                });

                getAndGenHistory(historyPosition + 1)
            }

            if (!(resposta.hasOwnProperty(historyN))) {
                $(document).trigger('historyGenerated_event'); ///TODO REVISAR TRIGER DEL EVENT

            }

            if (historyPosition === 1 && !(resposta.hasOwnProperty(historyN))) { //TODO FER DEBUG AQUI. AIXO FUNCIONA?????
                sessionNotFound(historyPanel);
            }


        });

    }
});