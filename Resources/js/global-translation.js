/*Copyright (c) 2016 - 2021. Roger Pedrós Villorbina, All rights reserved.*/
/*Clase que s'encarrega de fer la traducció.*/


$(document).ready(() => {
    $("#menuConfig").text(chrome.i18n.getMessage("menu_config")); //configuració lateral navbar
    $("#menuAtajos").text(chrome.i18n.getMessage("menu_atajos")); //Atajos lateral navbar
    $("#menuDonate").text(chrome.i18n.getMessage("menu_donaciones")); //Mas lateral navbar
});


