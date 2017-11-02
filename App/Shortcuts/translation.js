/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/
/*Clase que s'encarrega de fer la traducció.*/


$(document).ready(() => {
    $("#atajosTitol").text(chrome.i18n.getMessage("atajos_titol"));
    $("#atajosSubtitol").text(chrome.i18n.getMessage("atajos_subtitol"));

    $("#atajosEntrada1").text(chrome.i18n.getMessage("atajos_entrada1"));
    $("#atajosSubentrada1_1").text( chrome.i18n.getMessage("atajos_subentrada1_1"));

    $("#atajosEntrada2").text(chrome.i18n.getMessage("atajos_entrada2"));
    $("#atajosSubentrada2_1").text(chrome.i18n.getMessage("atajos_subentrada2_1"));
    $("#atajosSubentrada2_2").text(chrome.i18n.getMessage("atajos_subentrada2_2"));
    $("#atajosSubentrada2_3").text(chrome.i18n.getMessage("atajos_subentrada2_3"));
});


