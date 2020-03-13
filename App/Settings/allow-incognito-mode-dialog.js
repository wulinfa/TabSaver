/*Copyright (c) 2016 - 2020. Roger Pedrós Villorbina, All rights reserved. */

$(document).ready(() => {
    $("#show-dialog").click((event) => {
        $('#allowIncognitoModeModal').show();
    });

    $("#doit").click((event) => {
        openSavedTabs([{'url': 'chrome://extensions/?id=' + chrome.runtime.id}])
    });

});
