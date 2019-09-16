/*Copyright (C) 2016-2019, Roger Pedrós Villorbina, All rights reserved.*/
$(window).keypress((event) => {
    if ($('input').is(":focus")) {
        return 0;
    } else{
        console.log(event.keyCode);
        switch (event.keyCode) {

            /*Configuracion*/
            case 104:
            case 72:
                window.location.replace("../../App/History/history.html");
                break;

            /*Configuracion*/
            case 115:
            case 83:
                window.location.replace("../../App/Settings/settings.html");
                break;

            /*Atajos*/
            case 97:
            case 65:
                window.location.replace("../../App/Shortcuts/shortcuts.html");
                break;

            /*Donaciones*/
            case 112:
            case 80:
                window.location.replace("../../App/More/more.html");
                break;

            default:
                console.log('Shortcut not detected');
        }


    }
});