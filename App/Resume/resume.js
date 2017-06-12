/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/

$(document).ready(() => {
    $('.panel-empty').hide();

    let step1 = () => {
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


    step1().then(() => {
        _.map(this.sessionTabs, (tabData) => {
            $('#savedTabs').append(
                '<li class="list-group-item">' +
                '<img id="pageIcon" style="width: 20px; height: 20px" src="' + tabData.favIconUrl + '">' +
                '<a target="_blank" href="' + tabData.url + '"> ' + tabData.title + '</a>' +
                '</li>'
            );
        });

    });


});