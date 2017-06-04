/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/

$(document).ready(() => {
    let user = firebase.auth().currentUser;
    if (user) {
        $('#createAccount').hide();
        $('#signIn').hide();
        $('#errorMessage').hide();
        $('#correctMessage').hide();

        $('#userPanel').show();
    } else {
        $('#createAccount').hide();
        $('#signIn').show();
        $('#errorMessage').hide();
        $('#correctMessage').hide();
        $('#userPanel').hide();
    }

    $('#showCreateAccount').click((event) => {
        $('#signIn').hide();
        $('#createAccount').show();
        $('#showCreateAccount').hide();
    });


    $('#sigInButton').click((event) => {
        let email = $('#singInInputEmail').val();
        let pass = $('#singInInputPassword').val();
        this.email = email;

        if (email.length && pass.length) {
            firebase.auth().signInWithEmailAndPassword(email, pass)
                .then((result) => {
                    var user = result.user;
                    var credential = result.credential;
                    $('#correctMessage').append('<div class="alert alert-dismissible alert-success">Todo correcto</div>').show();
                    $('h2').append('' + this.email + '').show();
                    waitAndLoadUserMenu();
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    $('#errorMessage').append('<div class="alert alert-dismissible alert-danger">Error. ' + errorMessage + '</div>').show();
                });
        }
        if (!email.length && !pass.length) {
            $('#errorMessage').append('<div class="alert alert-dismissible alert-danger">Error. Compruebe los parametros</div>').show();
        }

    });

    $('#createAccountButton').click((event) => {
        let email = $('#createInputEmail').val();
        let pass = $('#createInputPassword').val();

        if (email.length && pass.length) {
            firebase.auth().createUserWithEmailAndPassword(email, pass)
                .then((result) => {
                    var user = result.user;
                    var credential = result.credential;
                    $('#correctMessage').append('<div class="alert alert-dismissible alert-success">Todo correcto</div>').show();
                    waitAndLoadUserMenu();
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    $('#errorMessage').append('<div class="alert alert-dismissible alert-danger">Error. ' + errorMessage + '</div>').show();
                });
        }
        if (!email.length && !pass.length) {
            $('#errorMessage').append('<div class="alert alert-dismissible alert-danger">Error. Compruebe los parametros</div>').show();
        }

    });


    let step1 = () => {
        let wait = $.Deferred();
        getServiceList()
            .then((servicesFromDB) => {
                if (servicesFromDB.servicesList) {
                    this.servicesList = servicesFromDB.servicesList.slice();
                }
                wait.resolve();
            });
        return wait.promise();
    };
    let step2 = () => {
        let wait = $.Deferred();
        getConfigFromDB()
            .then((dataFromDB) => {
                if (dataFromDB.configData) {
                    this.configData = $.extend(true, {}, dataFromDB.configData);
                }
                wait.resolve();
            });
        return wait.promise();
    };
    let step3 = () => {
        let wait = $.Deferred();
        getSessionFromDB()
            .then((dataFromDB) => {
                if (dataFromDB.sessionTabs) {
                    this.sessionTabs = $.extend(true, {}, dataFromDB.sessionTabs);
                }
                this.sessionTabs = null;
                wait.resolve();
            });
        return wait.promise();
    };

    function waitAndLoadUserMenu() {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).once('value')
            .then((snapshot) => {
                this.FconfigData = snapshot.val().configData;
                this.FserviceList = snapshot.val().serviceList;
                this.FsessionTabs = snapshot.val().sessionTabs;

                if (this.FconfigData || this.FserviceList || this.FsessionTabs) {
                    $('#copiaDisponible').append('Se ha detectado una copia almacenada en la nube.');
                }
            });

        setTimeout(() => {
            $('#createAccount').hide();
            $('#signIn').hide();
            $('#errorMessage').hide();
            $('#correctMessage').hide();
            $('#showCreateAccount').hide();

            $('#userPanel').show();

        }, 800);
    }

    $('#saveDataToFirebase').click((event) => {
        let userId = firebase.auth().currentUser.uid;

        step1().then(() => {
            firebase.database().ref('users/' + userId).update({
                serviceList: this.servicesList,
            });
        });
        step2().then(() => {
            firebase.database().ref('users/' + userId).update({
                configData: this.configData,
            });
        });
        step3().then(() => {
            if (this.sessionTabs) {
                firebase.database().ref('users/' + userId).update({
                    sessionTabs: this.sessionTabs,
                });
            }
            if (!this.sessionTabs) {
                firebase.database().ref('users/' + userId + '/sessionTabs').remove();
            }
        });

    });

    $('#restorDataFromFirebase').click((event) => {
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
            let objectToSave = {
                configData: snapshot.val().configData
            };

            let objectToSave2 = {
                servicesList: snapshot.val().serviceList
            };

            let objectToSave3 = {
                sessionTabs: snapshot.val().sessionTabs
            };

            saveDatatoDB(objectToSave);
            saveDatatoDB(objectToSave2);
            saveDatatoDB(objectToSave3);

        });

    });

});