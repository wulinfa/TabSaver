/*Copyright (c) 2016 - 2021. Roger Pedrós Villorbina, All rights reserved.*/
/*Clase que s'encarrega de fer la traducció.*/


$(document).ready(() => {

    $("#atajosTitol").text(chrome.i18n.getMessage("atajos_titol"));
    $("#atajosSubtitol").text(chrome.i18n.getMessage("atajos_subtitol"));

    $("#atajosEntrada1").text(chrome.i18n.getMessage("atajos_entrada1"));
    $("#atajosSubentrada1_1").text( chrome.i18n.getMessage("atajos_subentrada1_1"));

    $("#atajosEntrada2").text(chrome.i18n.getMessage("atajos_entrada2"));

    //ESTA DUPLICAT AMB EL MENU, NO TOCAR NI ELIMINAR HA DE SER AIXI.
    $("#atajosSubentrada2_1").text(chrome.i18n.getMessage("atajos_subentrada2_1")); //configuració
    $("#atajosSubentrada2_2").text(chrome.i18n.getMessage("atajos_subentrada2_2")); //Atajos
    $("#atajosSubentrada2_3").text(chrome.i18n.getMessage("atajos_subentrada2_3")); //Mas

});


