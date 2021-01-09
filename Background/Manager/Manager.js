/*Copyright (c) 2016 - 2021. Roger Pedrós Villorbina, All rights reserved.*/
/*Manager s'encarrega de portar la logica de la extencio*/

this.configData = {};
this.privacyConfigData = {};

(() => {
    /*Comprovacions inicials*/
    updateInternalConfigData();
    checkIconStatus();
})();

//browserActionTrigged es la funció que es crida desde el Listener.js un s'ha capturat l'event de Chrome.
//Aquesta funció posa en marxa el procés de guardar o recuperar les pestanyes. Es es la funció principal.
//Els events son caputurats al Listener i poden ser per comandos o per un click al boto.
function browserActionTrigged() {
    if (this.configData.simple === undefined || this.configData.onlySave === undefined) {
        alert(chrome.i18n.getMessage("error_saved_config_data"));
        chrome.runtime.openOptionsPagle();
    }

    getDataFromDB("sessionTabs") //Miro si hi ha una sessio guardada
        .then((dataFromDB) => {
            if (dataFromDB.sessionTabs) {//true. Aixo es que HI HA informacio guardada.
                if (this.configData.simple === true) {
                    simpleWithSessionSaved(dataFromDB);
                }

                if (this.configData.onlySave === true) {
                    onlySaveWithSessionSaved();
                }
            }

            if (!dataFromDB.sessionTabs) { //false. Aixo es no hi ha informacio guardada.
                if (this.configData.simple === true) {
                    simpleWithOutSessionSaved();
                }

                if (this.configData.onlySave === true) {
                    onlySaveWithOutSessionSaved();
                }
            }
        });
}

/*changesOnDB es la funció que es crida desde el Listener.js un s'ha capturat l'event de Chrome.
* Aquesta funció actualitza la configuració local de this.configdata i actualiza també l'icona si fa falta. */
function changesOnDBUpdate(changes) {
    if (changes.configData) {
        this.configData = changes.configData.newValue; //Actualitza la configuració interna
        updateInternalConfigData();
        checkIconStatus();
    }
}

/*Comproba la configuració elegida per l'usuari i la carrega localment*/
function updateInternalConfigData() {
    getDataFromDB('configData')
        .then((configFromDB) => {
            this.configData = configFromDB.configData;
        });

    getDataFromDB('privacyConfigData')
        .then((configFromDB) => {
            this.privacyConfigData = configFromDB.privacyConfigData;
        });
}


/*Genera el menu contextual del boto dret*/
openHistory = () => {
    chrome.tabs.create({url: 'chrome-extension://' + chrome.runtime.id + '/App/History/history.html'});
};

chrome.contextMenus.create({
    title: "Open History",
    contexts:["page"],  // ContextType
    onclick: openHistory // A callback function
});