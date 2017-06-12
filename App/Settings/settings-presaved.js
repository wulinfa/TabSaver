/**
 * Created by pedro on 12/06/2017.
 */
/*Declaracio inicial dels objectes de configuració i serveis*/
$(document).ready(() => {

    this.preSavedUrl = {};

    /*Declaració de les crides per carregar de la BD als objectes configData i serviceList*/
    let step3 = () => {
        let wait = $.Deferred();
        getPreSavedSession()
            .then((preSavedSessionFromDB) => {
                this.preSavedUrl = $.extend(true, {}, preSavedSessionFromDB.preSavedSession);
                wait.resolve();
            });
        return wait.promise();
    };

    /*Execució de es declaracions i crides*/
    /*Step2 genera la llista dels serveis*/
    step3()
        .then(() => {
            preSavedTableGenerator();
        });

    /*Generador de la llista*/
    function preSavedTableGenerator() {
        _.map(this.preSavedUrl, (dataPreSavedUrl) => {
            $('.presaved-table-content-generator').append(
                '<tr>' +
                '<td>' + dataPreSavedUrl.url + '</td>' +
                '</tr>'
            );
        });
    }


    /*Listener del boto per a guardar serveis*/
    $("#saveButtonURL").click((event) => {
        ga('send', 'event', 'options', 'Save Pre-Saved URL', 'Button');

        let preSavedUrl = $("#inputPreSavedUrl");

        this.preSavedSessionArray = [];
        /*Agafafem de nou la taula que hi ha ara a la bd*/
        getPreSavedSession()
            .then((preSavedSessionFromDB) => {
                /*En fem una copia local*/
                this.preSavedSessionArray = $.extend(true, [], preSavedSessionFromDB.preSavedSession);

                debugger;
                /*Afegim el nou servei als altres localment*/
                let objecteToPush = {
                    url: preSavedUrl.val(),
                };
                this.preSavedSessionArray.push(objecteToPush);

                /*El guardem de nou a la BD, de local a BD*/
                let objectToSave = {
                    preSavedSession: this.preSavedSessionArray
                };
                saveDatatoDB(objectToSave);

                /*Mostrem al usuari (vista) el nou servei*/
                $('.presaved-table-content-generator').append(
                    '<tr>' +
                    '<td>' + preSavedUrl.val() + '</td>' +
                    '</tr>'
                );

                /*Netejem els caps de la vista*/
                preSavedUrl.val('');
            });
    });

});