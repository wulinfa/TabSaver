/**
 * Created by pedro on 12/06/2017.
 */
/*Declaracio inicial dels objectes de configuració i serveis*/
$(document).ready(() => {

    this.servicesList = {};

    /*Declaració de les crides per carregar de la BD als objectes configData i serviceList*/
    let step2 = () => {
        let wait = $.Deferred();
        getServiceList()
            .then((servicesFromDB) => {
                this.servicesList = $.extend(true, {}, servicesFromDB.servicesList);
                wait.resolve();
            });
        return wait.promise();
    };

    /*Execució de es declaracions i crides*/
    /*Step2 genera la llista dels serveis*/
    step2()
        .then(() => {
            serviceTableGenerator();
        });

    /*Generador de la llista*/
    function serviceTableGenerator() {
        _.map(this.servicesList, (dataService) => {
            $('.service-table-content-generator').append(
                '<tr>' +
                '<td>' + dataService.serviceName + '</td>' +
                '<td>' + dataService.serviceUrl + '</td>' +
                '<td><i class="material-icons">delete</i></td>' +
                '</tr>'
            );
        });
    }


    /*Listener del boto per a guardar serveis*/
    $("#saveButton").click((event) => {
        ga('send', 'event', 'options', 'Save Service', 'Button');

        let serviceName = $("#inputServiceName");
        let serviceUrl = $("#inputUrl");
        let serviceID = generateId();

        this.serviceArray = [];
        /*Agafafem de nou la taula que hi ha ara a la bd*/
        getServiceList()
            .then((servicesFromDB) => {
                /*En fem una copia local*/
                this.serviceArray = servicesFromDB.servicesList.slice();

                /*Afegim el nou servei als altres localment*/
                let objecteToPush = {
                    serviceName: serviceName.val(),
                    serviceUrl: serviceUrl.val(),
                    serviceId: serviceID
                };
                this.serviceArray.push(objecteToPush);

                /*El guardem de nou a la BD, de local a BD*/
                let objectToSave = {
                    servicesList: this.serviceArray
                };
                saveDatatoDB(objectToSave);

                /*Mostrem al usuari (vista) el nou servei*/
                $('.table-content-generator').append(
                    '<tr>' +
                    '<td>' + serviceName.val() + '</td>' +
                    '<td>' + serviceUrl.val() + '</td>' +
                    '<td><i class="material-icons">delete</i></td>' +
                    '</tr>'
                );

                /*Netejem els caps de la vista*/
                serviceName.val('');
                serviceUrl.val('');
            });
    });

});