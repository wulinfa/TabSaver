/*Copyright (C) 2016-2020, Roger Pedrós Villorbina, All rights reserved.*/
/*Clase que controla el workflow del drag and drop i els historials*/

$(document).ready(() => {
    this.privacyConfigData = {};
    let historyEntries = 10;

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

    function getAndGenHistory(historyPosition) {            //TODO REVISAR LOGICA!!
        let historyPanel = $("#historyPanel");

        if (historyPosition >= historyEntries) {
            $(document).trigger('historyGenerated');
            return true
        }
        let historyN = String("HISTORY" + historyPosition);
        getDataFromDB(historyN).then((resposta) => {

            if (resposta.hasOwnProperty(historyN)) {
                historyPanelGeneration(historyPanel, historyPosition);
                let historyTagN = $('#historySession' + historyPosition);

                _.forEach(resposta[Object.keys(resposta)[0]].sessionTabs, (historyData) => {
                    if (!_.isNil(historyData)) {
                        cardGeneration(historyData, historyTagN);
                    }

                    if (_.isNil(historyData)) {
                        sessionNotFound(historyTagN);
                    }
                });

                getAndGenHistory(historyPosition + 1)
            }

            if (!(resposta.hasOwnProperty(historyN))) {
                $(document).trigger('historyGenerated');

            }

            if (historyPosition === 1 && !(resposta.hasOwnProperty(historyN))) { //TODO FER DEBUG AQUI. AIXO FUNCIONA?????
                sessionNotFound(historyPanel);
            }


        });

    }
});