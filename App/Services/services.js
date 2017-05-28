/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/

$(document).ready(() => {
    $('.panel-empty').hide();

    let step1 = () => {
        let wait = $.Deferred();
        getServiceList()
            .then((servicesFromDB) => {
                if (servicesFromDB.servicesList) {
                    this.servicesList = servicesFromDB.servicesList.slice();
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
        getDataFromDB()
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

    step1()
        .then(step2)
        .then(()=>{
            _.map(this.servicesList, (dataService) => {
                _.map(this.sessionTabs, (dataTabs) => {
                    if(_.includes(dataTabs.url, dataService.serviceUrl)){
                        console.log(dataTabs);
                        if(!$("#"+dataService.serviceId).length){
                            $('.panel-generator').append(
                                '<div class="panel panel-default">' +
                                '<div class="panel-heading">'+dataService.serviceName+'</span></div>' +
                                '<div class="panel-body" style="overflow: auto">' +
                                '<div class="row-fluid" id="'+dataService.serviceId+'">' +
                                '</div>'+
                                '</div>'
                            );
                        }

                        if($("#"+dataService.serviceId).length){
                            $("#"+dataService.serviceId).append(
                                '<div class="col-lg-3" style="float: none">' +
                                '<a target="_blank" href="'+dataTabs.url+'">'+
                                '<div class="demo-card-image mdl-card mdl-shadow--2dp">'+
                                    '<div class="mdl-card__title mdl-card--expand"></div>'+
                                    '<div class="mdl-card__actions">'+
                                    '<span class="demo-card-image__filename">' +
                                        '<img style="margin: 3px" src="'+dataTabs.favIconUrl+'">'+dataTabs.title+
                                    '</span>'+
                                    '</div>'+
                                    '</div>'+
                                '</div>'+
                                '</a>'+
                                '</div>'
                            );
                        }
                    }
                });
            });

    });

});
