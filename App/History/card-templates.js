/*Copyright (C) 2016-2020, Roger Pedrós Villorbina, All rights reserved.*/
$(document).ready(() => {

    this.historyPanelGeneration = (historyPanel, sessionNumber) => {
        historyPanel.append(
            '<div class="card card-body" style="margin-top:10px;margin-bottom: 15px;">' +
            '<b class="card-title">Sessión ' + sessionNumber + ':</b>' +

            '<div class="box" id="sessionNotFound' + sessionNumber + '"></div>' +
            '<div class="box list-group list-group-horizontal" style="" id="historySession' + sessionNumber + '"></div>' +
            '</div>'
        );
    };

    this.cardGeneration = (tabData, tag) => {
        tag.append(
                '<div class="card card-body movable" style="width: 13rem; height: 9rem; margin-left: 0.5rem; margin-right: 0.5rem;">' +
                        '<h5 class="card-title text-center"> <img style="max-width: 20px; max-height: 20px" src="' + tabData.favIconUrl + '"></h5>' +
                        '<p class="card-text" style="font-size:13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px; max-height: 50px">' + tabData.title + '</p>' +
                        //'<a href=' + tabData.url + ' target="_blank" class="card-link">Link</a>' +
                '</div>' +
            '</div>');

    };


    this.sessionNotFound = (tag) => {
        tag.append(
            '<div style="padding-top: 20px" class="panel-empty text-center">' +
            '<i class="material-icons not-found-icon">wifi_tethering</i>' +
            '<p style="font-size: 13px" class="text-danger">No se ha encontrado ninguna sessión guardada.</p>' +
            '</div>');
    };

});