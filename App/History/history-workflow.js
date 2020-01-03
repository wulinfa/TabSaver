/*Copyright (C) 2016-2019, Roger Pedrós Villorbina, All rights reserved.*/
/*Clase que controla el workflow del drag and drop i els historials*/

$(document).ready(() => {
    this.lastSessionSaved = {};

    /*STEP 1: Peticio de la sessio actual*/
    let lastSessionSaved = () => {
        let wait = $.Deferred();
        getDataFromDB("sessionTabs")
            .then((lastSessionSaved) => {
                this.lastSessionSaved = lastSessionSaved.sessionTabs;
                wait.resolve();
            });
        return wait.promise();
    };

    /*Generador de la targeta en base la informació de la ultima sessio*/
    lastSessionSaved()
        .then(() => {
            lastSessionSavedGen();
        })
        .then(() => {
            getAndGenerate(1);
        });


    function lastSessionSavedGen() {
        let lastSessionSavedTag = $("#lastSessionSaved");
        let sessionNotFoundTag = $("#sessionNotFound");

        if (!_.isNil(this.lastSessionSaved)) {
            _.forEach(this.lastSessionSaved, function (tabData) {
                cardGeneration(tabData, lastSessionSavedTag)
            });
        }

        if (_.isNil(this.lastSessionSaved)) {
            sessionNotFound(sessionNotFoundTag);
        }

    }

    let historyEntries = 10;
    function getAndGenerate(historyPosition) {
        let historyPanel = $("#historyPanel");
        if (historyPosition >= historyEntries) {
            return true
        }

        let historyN = String("HISTORY" + historyPosition);
        getDataFromDB(historyN).then((resposta) => {
            if (resposta.hasOwnProperty(historyN)) {
                historyPanelGeneration(historyPanel ,historyPosition);
                let historyTagN = $('#historySession'+historyPosition);

                _.forEach(resposta[Object.keys(resposta)[0]].sessionTabs, (historyData) => {
                    if (!_.isNil(historyData)) {
                        cardGeneration(historyData, historyTagN );
                    }

                    if (_.isNil(historyData)) {
                        sessionNotFound(historyTagN);
                    }
                });

                getAndGenerate(historyPosition + 1)
            }

            if (historyPosition === 1 && !(resposta.hasOwnProperty(historyN))) {
                sessionNotFound(historyPanel);
            }


        });
    }
});