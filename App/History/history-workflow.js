/*Copyright (C) 2016-2019, Roger Pedrós Villorbina, All rights reserved.*/
/*Clase que controla el workflow del drag and drop i els historials*/

$(document).ready(() => {

    this.lastSessionSaved = {};
    let lastSessionSavedTag = $("#lastSessionSaved");
    let sessionNotFoundTag = $("#sessionNotFound");

    let step1 = () => {
        let wait = $.Deferred();
        getSessionFromDB()
            .then((lastSessionSaved) => {
                this.lastSessionSaved = lastSessionSaved.sessionTabs;
                console.log(lastSessionSaved);
                wait.resolve();
            });

        return wait.promise();
    };

    step1()
        .then(() => {
            if (!_.isNil(this.lastSessionSaved)) {
                _.forEach(this.lastSessionSaved, function (tabData) {
                    console.log(tabData);

                    lastSessionSavedTag.append(
                        '<div class="card" style="width: 13rem; height: 9rem; margin-left: 0.5rem; margin-right: 0.5rem;">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title text-center"> <img style="max-width: 20px; max-height: 20px" src="' + tabData.favIconUrl + '"></h5>' +
                        '<p class="card-text" style="font-size:13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px; max-height: 50px">' + tabData.title + '</p>' +
                        //'<a href=' + tabData.url + ' target="_blank" class="card-link">Link</a>' +
                        '</div>' +
                        '</div>');
                });
            }

            if (_.isNil(this.lastSessionSaved)) {
                sessionNotFoundTag.append(
                    '<div style="padding-top: 20px" class="panel-empty text-center">' +
                    '<i class="material-icons not-found-icon">wifi_tethering</i>' +
                    '<p style="font-size: 13px" class="text-danger">No se ha encontrado ninguna sessión guardada.</p>' +
                    '</div>');
            }

        });
});