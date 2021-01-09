/*Copyright (c) 2016 - 2021. Roger Pedrós Villorbina, All rights reserved.*/
$(document).ready(() => {

    this.historyPanelGeneration = (historyPanel, sessionNumber) => {
        historyPanel.append(
            '<div class="card" style="margin-top:10px; margin-bottom: 15px;">'+
                '<div class="card-header" style="background-color: white"> ' +
                    '<b> Sessión ' + sessionNumber + '</b>'+
                    '<b class="btn btn-sm float-right deleteSession" alt="Detete" title="Delete this session" id="HISTORY' + sessionNumber+ '-deleteSession" >'+
                        '<i class="material-icons" style="font-size: 200%;">delete_outline</i>'+
                    '</b>'+
                    '<b class="btn btn-sm float-right openSession" alt="Open" title="Open all the tabs" id="HISTORY' + sessionNumber+ '-openSession">'+
                        '<i class="material-icons" style="font-size: 200%;">launch</i>'+
                    '</b>'+
                '</div>'+

                '<div class="container-fluid py-3" id="historySession' + sessionNumber + '-container" style="overflow-x: auto; overflow-y:hidden;"> '+

                    '<div class="box d-flex flex-row flex-nowrap" style="">' +
                        '<div class="box list-group list-group-horizontal" id="sessionNotFound' + sessionNumber + '"></div>' +
                        '<div class="box d-flex flex-row flex-nowrap" style="" id="historySession' + sessionNumber + '"></div>' +
                    '</div>'+

                '</div>'+

            '</div>'
        );
    };


    this.cardGeneration = (tabData, tag) => {
        tag.append(
                '<div class="card card-body custom-body movable">' +
                       '<div class="card-title" style="margin-bottom: 5px;">'+
                           '<img class="d-inline text-left" style="max-width: 25px; max-height: 25px" src="' + tabData.favIconUrl + '" >'+
                           '<a class="d-inline-block align-middle url-text-container">' + domain_from_url(tabData.url) + '</a> '+

                            '<a class="d-inline card-link float-right text-right" href="' + tabData.url + '" target="_blank" >' +
                                '<i class="material-icons" style="font-size: 130%;">launch</i>'+
                           '</a>'+
                       '</div>'+

                       '<p class="card-text text-left text-container ">' + tabData.title + '</p>'+
                '</div>' +
            '</div>'
        );
    };


    this.sessionNotFound = (tag) => {
        tag.append(
            '<div style="padding-top: 20px" class="panel-empty text-center">' +
            '<i class="material-icons not-found-icon">wifi_tethering</i>' +
            '<p style="font-size: 13px" class="text-danger">No se ha encontrado ninguna sessión guardada.</p>' +
            '</div>');
    };

});