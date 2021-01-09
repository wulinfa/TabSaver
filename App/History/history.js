/*
 * Copyright (c) 2016 - 2021. Roger Pedrós Villorbina, All rights reserved.
 *
 */

$(document).ready(() => {
    //Inicialitza el slider horitzontal de la ultima sessió guardada.
    //Com que aquest historial sempre es genera, es a dir es static, es fa aqui i no el history-generator-workflow.js
    horitzontalSliderInit('#hortizontal-scroll-last-session-saved');

    //Bodyselector on llegir els events "ON"
    let bodySelector = $('body');

    //DELETE TABS LISTENERS
    bodySelector.on('click', '.deleteSession', (event) => {
        console.log(event);
        //INTERPRETA L'OBJECTE QUE ARRIBA
        let keySessionToGet = _.replace(event.currentTarget.id, '-deleteSession', '');
        console.log(keySessionToGet);

        if (_.includes(keySessionToGet, "HISTORY")) {
            //removeFromDB(resposta[Object.keys(resposta)[0]].sessionTabs)
        }

        if (!_.includes(keySessionToGet, "HISTORY")) { //S'ELIMINA LA SESSIO GUARDADA EN EL BOTO. LA ULTIMA SESSIO GUARDADA.
            removeFromDB(keySessionToGet)
                .then(() => {
                    let emptyBadge = "";
                    setIconBadge(emptyBadge)
                })
                .then(() => {
                    updateIcon(false);
                })
                .then(() => {
                    getDataFromDB("bookmarkFolderCreated")
                        .then((bookmarkFolderId) => {
                            console.log(bookmarkFolderId);
                            removeBookmarks(bookmarkFolderId);
                        });
                })
                .then( ()=> {
                    $("#lastSessionSaved").empty();
                    sessionNotFound($("#sessionNotFound"));
                });
        }

        //saveDataToDB(objectToSave).then(launchSnackBar());

    });

    //OPEN TABS LISTENERS
    bodySelector.on('click', '.openSession', (event) => {
        //INTERPRETA L'OBJECTE QUE ARRIBA
        let keySessionToGet = _.replace(event.currentTarget.id, '-openSession', '');

        //L'agafa de la BD i Enxufal a la funció per a que l'obri
        getDataFromDB(keySessionToGet).then((resposta) => {
            if (_.includes(keySessionToGet, "HISTORY")) {
                openSavedTabs(resposta[Object.keys(resposta)[0]].sessionTabs)
            }

            if (!_.includes(keySessionToGet, "HISTORY")) {
                openSavedTabs(resposta.sessionTabs)
            }
        });
    });


});

//Iniciliatzació dels sliders horitozontals per a tot element que entri a la funció.
function horitzontalSliderInit(element) {
    const wrapper = document.querySelector(element);
    horwheel(wrapper);
}


function domain_from_url(url) {
    return  _.upperFirst(_.replace(new URL(url).hostname, 'www.', ''))
}