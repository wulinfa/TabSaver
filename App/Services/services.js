/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/

$(document).ready(() => {
    /*Amaga el misatge que alerta al usuari quan no hi ha informació, aquest s'activa dinamicament més endavant quan no hi ha informacio*/
    $('.panel-empty').hide();

    /*Declaracio inicial dels objectes de configuració i serveis*/
    this.servicesList = {};
    this.sessionTabs = {};

    /* Carregar localment desde la BD les pestanyes actualmente guardades i els serveis guardats*/
    let step1 = () => {
        let wait = $.Deferred();
        getServiceList()
            .then((servicesFromDB) => {
                if (servicesFromDB.servicesList) {
                    this.servicesList = $.extend(true, {}, servicesFromDB.servicesList);
                }
                wait.resolve();

                if (!servicesFromDB.servicesList) {
                    $('.panel-empty').show();
                }
            });
        return wait.promise();
    };
    let step2 = () => {
        let wait = $.Deferred();
        getSessionFromDB()
            .then((dataFromDB) => {
                if (dataFromDB.sessionTabs) {
                    this.sessionTabs = $.extend(true, {}, dataFromDB.sessionTabs);
                }
                wait.resolve();

                if (!dataFromDB.sessionTabs) {
                    $('.panel-empty').show();
                }
            });
        return wait.promise();
    };

    /*Execució y interació per generar els elements*/
    step1()
        .then(step2)
        .then(() => {
            _.map(this.servicesList, (dataService) => {
                _.map(this.sessionTabs, (dataTabs) => {
                    if (_.includes(dataTabs.url, dataService.serviceUrl)) {
                        generator(dataTabs, dataService)
                    }
                });
            });
        });

    /* Generador de taules i elements de dins la taula*/
    function generator(dataTabs, dataService) {

        if (!$("#" + dataService.serviceId).length) {
            $('.panel-generator').append(
                '<div class="panel panel-default">' +
                '<div class="panel-heading">' + dataService.serviceName + '</span></div>' +
                '<div class="panel-body" style="overflow: auto">' +
                '<div class="row-fluid" id="' + dataService.serviceId + '">' +
                '</div>' +
                '</div>'
            );
        }
        let currentService = $("#" + dataService.serviceId);
        if (currentService.length) {
            currentService.append(
                '<div class="col-lg-3" style="float: none">' +
                '<a target="_blank" href="' + dataTabs.url + '">' +
                '<div class="demo-card-image mdl-card mdl-shadow--2dp">' +
                '<div class="mdl-card__title mdl-card--expand"></div>' +
                '<div class="mdl-card__actions">' +
                '<span class="demo-card-image__filename">' +
                '<img id="pageIcon" style="margin: 3px" src="' + dataTabs.favIconUrl + '">' + dataTabs.title +
                '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</a>' +
                '</div>'
            );
        }

    }

});

