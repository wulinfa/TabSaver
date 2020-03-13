/*Copyright (C) 2016-2020, Roger Pedrós Villorbina, All rights reserved.*/
/*Clase que controla el workflow del interruptors de la configuració*/

$(document).ready(() => {
    /*DECLARACIONS inicial dels objectes de configuració i serveis*/
    this.configData = {};
    this.privacyConfigData = {};
    this.incognitoStatus;

    this.snackBarTranslationResonse = "updated";
    /*Objecte html des de on es llança el snackbar*/
    let snackbarContainer = document.querySelector('#demo-toast-example');

    /*Declaració de les crides per carregar de la BD als objectes configData i privacyConfigData i la traducció d'snackbar*/
    let dataPreparation = () => {
        let wait = $.Deferred();
        getDataFromDB('configData')
            .then((configFromDB) => {
                this.configData = configFromDB.configData;
                wait.resolve();
            });

        getDataFromDB('privacyConfigData')
            .then((configFromDB) => {
                this.privacyConfigData = configFromDB.privacyConfigData;
                wait.resolve();
            });

        getSnackBarTranslation()
            .then( (response) =>{
                this.snackBarTranslationResonse = response;
                wait.resolve();
            });

        isIncognitoAllowed()
            .then((resposta)=>{
                this.incognitoStatus = resposta;
                wait.resolve();
            });

        return wait.promise();
    };

    /*EXECUSIONS de es declaracions i crides*/
    /*dataPreparation() seteja la informacio de la DB a la vista, si no hi ha informacío posa la que hi ha per defecte*/
    dataPreparation()
        .then(() => {
            if (!_.isNil(this.configData.simple) && !_.isNil(this.configData.onlySave) && !_.isNil(this.privacyConfigData)) {
                setOptionsSaved();
            }
            if (_.isNil(this.configData.simple) && _.isNil(this.configData.onlySave) && _.isNil(this.privacyConfigData)) {
                setOptionsDefault();
            }
        });

    /*Posen la informació de la BD a la vista*/
    function setOptionsSaved() {
        let optionSimple = $("#optionSimple");
        let checkboxSimple = $("#checkboxSimple");

        let optionOnlySave = $("#optionOnlySave");
        let checkboxOnlySave = $("#checkboxOnlySave");

        let locaStorage = $("#checkboxLocalStorage");
        let respectIncognito = $("#optionRespectIncognito");
        let incognitoWarning = $("#show-dialog");

        //RADIOBUTTON SIMPLE
        if (this.configData.simple === true) {
            optionSimple.prop('disabled', false);
            optionSimple.prop('checked', true);

            checkboxOnlySave.prop('disabled', true);
            checkboxSimple.prop('disabled', false);
        }

        if (this.configData.simple === false) {
            optionSimple.prop('disabled', false);
            optionSimple.prop('checked', false);
        }

        //CHECKBOX DE SIMPLE
        if (this.configData.simpleSave === true) {
            checkboxSimple.prop('disabled', false);
            checkboxSimple.prop('checked', true);
        }

        if (this.configData.simpleSave === false) {
            checkboxSimple.prop('checked', false);
        }

        //RADIOBUTTON DE ONLY SAVE
        if (this.configData.onlySave === true) {
            optionOnlySave.prop('disabled', false);
            optionOnlySave.prop('checked', true);

            checkboxOnlySave.prop('disabled', false);
            checkboxSimple.prop('disabled', true);
        }

        if (this.configData.onlySave === false) {
            optionOnlySave.prop('disabled', false);
            optionOnlySave.prop('checked', false);
        }

        //CHECKBOX DE ONLY SAVE
        if (this.configData.onlySaveCloseTabs === true) {
            checkboxOnlySave.prop('disabled', false);
            checkboxOnlySave.prop('checked', true);
        }

        if (this.configData.onlySaveCloseTabs === false) {
            checkboxOnlySave.prop('checked', false);
        }

        //CHECKBOX LOCAL STORAGE ENABLED?
        if(this.privacyConfigData.localStorage === true){
            locaStorage.prop('checked', true);
        }
        if(this.privacyConfigData.localStorage === false){
            locaStorage.prop('checked', false);
        }

        //CHECKBOX RESPECT INCOGNITO ENABLED?
        if(this.privacyConfigData.respectIncognito === true){
            respectIncognito.prop('checked', true);
        }
        if(this.privacyConfigData.respectIncognito === false){
            respectIncognito.prop('checked', false);
        }
        if(this.incognitoStatus === false){
            respectIncognito.prop('disabled', true);
        }else{respectIncognito.prop('disabled', false); incognitoWarning.hide();}

    }
    function setOptionsDefault() {
        this.configData.simple = true;
        this.configData.simpleSave = true;
        this.configData.onlySave = false;
        this.configData.onlySaveCloseTabs = false;
        this.privacyConfigData.localStorage = false;
        this.privacyConfigData.respectIncognito = false;

        let optionSimple = $("#optionSimple");
        let checkboxSimple = $("#checkboxSimple");

        let optionOnlySave = $("#optionOnlySave");
        let checkboxOnlySave = $("#checkboxOnlySave");

        let localStorage = $("#checkboxLocalStorage");
        let respectIncognito = $("#optionRespectIncognito");

        optionSimple.prop('disabled', false);
        optionSimple.prop('checked', true);
        checkboxSimple.prop('disabled', false);
        checkboxSimple.prop('checked', true);

        optionOnlySave.prop('disabled', false);
        optionOnlySave.prop('checked', false);
        checkboxOnlySave.prop('disabled', true);
        checkboxOnlySave.prop('checked', false);

        localStorage.prop('checked', false);
        respectIncognito.prop('checked', false);
    }

    /*Snackbar launch function*/
    function launchSnackBar() {
        let data = {
            message: this.snackBarTranslationResonse,
            timeout: 1750
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }

    /*Listeners dels RadioButtons i els CheckBox*/
    $("#optionSimple").click((event) => {
        ga('send', 'event', 'options', 'simple', 'RadioButton');

        let checkboxSimple = $("#checkboxSimple");
        let checkboxOnlySave = $("#checkboxOnlySave");

        checkboxSimple.prop('disabled', false);
        checkboxOnlySave.prop('disabled', true);
        checkboxSimple.prop('checked', true);

        let objectToSave = {
            configData: {
                simple: true,
                simpleSave: true,
                onlySave: false,
                onlySaveCloseTabs: false
            }
        };

        saveDataToDB(objectToSave)
            .then(launchSnackBar());
    });

    $("#checkboxSimple").click((event) => {
        ga('send', 'event', 'options', 'simple', 'Checkbox');

        let checkboxSimple = $("#checkboxSimple");
        if (checkboxSimple[0].checked === true) {
            /*Important fer ús del var i no el let aqui*/
            var objectToSave = {
                configData: {
                    simple: true,
                    simpleSave: true,
                    onlySave: false,
                    onlySaveCloseTabs: false
                }
            };
        }
        if (checkboxSimple[0].checked === false) {
            var objectToSave = {
                configData: {
                    simple: true,
                    simpleSave: false,
                    onlySave: false,
                    onlySaveCloseTabs: false
                }
            };
        }
        saveDataToDB(objectToSave)
            .then(launchSnackBar());
    });

    $("#optionOnlySave").click((event) => {
        ga('send', 'event', 'options', 'onlySave', 'RadioButton');

        let checkboxSimple = $("#checkboxSimple");
        let checkboxOnlySave = $("#checkboxOnlySave");

        checkboxSimple.prop('disabled', true);
        checkboxOnlySave.prop('disabled', false);

        let objectToSave = {
            configData: {
                simple: false,
                simpleSave: false,
                onlySave: true,
                onlySaveCloseTabs: false
            }
        };

        saveDataToDB(objectToSave)
            .then(launchSnackBar());
    });

    $("#checkboxOnlySave").click((event) => {
        ga('send', 'event', 'options', 'onlySave', 'Checkbox');

        let checkboxOnlySave = $("#checkboxOnlySave");
        if (checkboxOnlySave[0].checked === true) {
            /*Important fer ús del var i no el let aqui*/
            var objectToSave = {
                configData: {
                    simple: false,
                    simpleSave: false,
                    onlySave: true,
                    onlySaveCloseTabs: true
                }
            };
        }
        if (checkboxOnlySave[0].checked === false) {
            var objectToSave = {
                configData: {
                    simple: false,
                    simpleSave: false,
                    onlySave: true,
                    onlySaveCloseTabs: false
                }
            };
        }

        saveDataToDB(objectToSave)
            .then(launchSnackBar());
    });

    $("#checkboxLocalStorage").click((event) => {
        ga('send', 'event', 'options', 'localStorage', 'Checkbox');

        let locaStorage = $("#checkboxLocalStorage");
        if (locaStorage[0].checked === true) {
            /*Important fer ús del var i no el let aqui*/
            var objectToSave = {
                privacyConfigData: {
                    localStorage: true,
                }
            };
        }
        if (locaStorage[0].checked === false) {
            var objectToSave = {
                privacyConfigData: {
                    localStorage: false,
                }
            };
        }

        saveDataToDB(objectToSave)
            .then(launchSnackBar());

    });

    $("#optionRespectIncognito").click((event) => {
        ga('send', 'event', 'options', 'respectIncognito', 'Checkbox');

        let respectIncognito = $("#optionRespectIncognito");
        if (respectIncognito[0].checked === true) {
            /*Important fer ús del var i no el let aqui*/
            var objectToSave = {
                privacyConfigData: {
                    localStorage: false,
                    respectIncognito: true
                }
            };
        }
        if (respectIncognito[0].checked === false) {
            var objectToSave = {
                privacyConfigData: {
                    localStorage: false,
                    respectIncognito: false
                }
            };
        }

        saveDataToDB(objectToSave)
            .then(launchSnackBar());

    });

});