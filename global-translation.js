/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/
/*Clase que s'encarrega de fer la traducció.*/


$(document).ready(() => {
    var menu_config = chrome.i18n.getMessage("menu_config");
    var menu_atajos = chrome.i18n.getMessage("menu_atajos");
    var menu_donaciones = chrome.i18n.getMessage("menu_donaciones");

    $("#menuConfig").text(menu_config);
    $("#menuAtajos").text(menu_atajos);
    $("#menuDonate").text(menu_donaciones);
});


