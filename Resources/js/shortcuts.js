/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/
$(window).keypress((event) => {
    if ($('input').is(":focus")) {
        return 0;
    } else{
        console.log(event.keyCode)
        switch (event.keyCode) {
            /*Inicio*/
            case 105:
            case 73:
                window.location.replace("../../App/Home/home.html");
                break;

            /*Destacados*/
            case 100:
            case 68:
                window.location.replace("../../App/Services/services.html");
                break;

            /*Resumen*/
            case 108:
            case 76:
                window.location.replace("../../App/Resume/resume.html");
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
                window.location.replace("../../App/Donate/donate.html");
                break;

            default:
                console.log('Shortcut not detected');
        }


    }
});