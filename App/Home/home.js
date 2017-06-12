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
    let step2 = () => {
        let wait = $.Deferred();
        getBoards()
            .then((dataFromDB)=>{
                
                if (dataFromDB.boards) {
                    this.boards = $.extend(true, [], dataFromDB.boards);
                }
                wait.resolve();
            });
        return wait.promise();
    };

    step1().then(() => {
        _.map(this.sessionTabs, (tabData) => {
            $('#savedTabs').append(
                '<li class="list-group-item">' +
                '<img id="pageIcon" style="width: 20px; height: 20px" src="' + tabData.favIconUrl + '">' +
                '<a  target="_blank" href="' + tabData.url + '"> ' + tabData.title + '</a>' +
                '</li>'
            );
        });

    });
    step2().then(() => {
        _.map(this.boards, (boardData) => {

            $('#boards').append(
                '<div class="panel panel-default container">' +
                '<div class="panel-heading "><b>' + boardData.title + '</b></div>' +
                '<div class="panel-body drag-container" id="' + boardData.boardId + '">' +
                '</div>' +
                '</div>'
            );
            _.map(boardData.tabs, (boardTabs) => {
                $('#' + boardData.boardId + '').append(
                    '<li class="list-group-item">' +
                    '<img style="width: 20px; height: 20px" src="' + boardTabs.favIconUrl + '">' +
                    '<a  target="_blank" href="' + boardTabs.url + '"> ' + boardTabs.title + '</a>' +
                    '</li>'
                );
            });

        });
    });

    let containers = $('.drag-container').toArray();
    containers.concat($('#savedTabs').toArray());


    dragula(containers, {
        isContainer: (el) => {
            return el.classList.contains('drag-container');
        }
    }).on('drag', (el, container, handle) => {
        if(container.id === "savedTabs"){}
        if(container.id !== "savedTabs"){
            let indexById = _.findIndex(this.boards, {boardId:container.id} );
            let indexOfObjectToSplice = _.findIndex(this.boards[indexById].tabs, {url: el.getElementsByTagName('a')[0].href});
            this.boards[indexById].tabs.splice(indexOfObjectToSplice);
            let objectToSave ={
                boards: this.boards
            };
            this.saveDatatoDB(objectToSave)
        }

    }).on('drop', (el, container, handle) => {
        if(container.id === "savedTabs"){}
        if(container.id !== "savedTabs"){
            let indexById = _.findIndex(this.boards, {'boardId':container.id} );
            let objectToPush = {
                title: el.getElementsByTagName('a')[0].textContent,
                url: el.getElementsByTagName('a')[0].href,
                favIconUrl: el.getElementsByTagName('img')[0].src
            };
            this.boards[indexById].tabs.push(objectToPush);
            let objectToSave ={
                boards: this.boards
            };
            this.saveDatatoDB(objectToSave)
        }

    });

});