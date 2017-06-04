/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/
$(window).keypress((event) => {
    if ($('input').is(":focus")) {
        return 0;
    } else{
        switch (event.keyCode) {
            case 100:
            case 68:
                window.location.replace("../../App/Donate/donate.html");
                break;

            case 105:
            case 73:
                window.location.replace("../../App/Home/home.html");
                break;

            case 104:
            case 72:
                window.location.replace("../../App/Home/home.html");
                break;

            case 115:
            case 83:
                window.location.replace("../../App/Services/services.html");
                break;

            case 99:
            case 67:
                window.location.replace("../../App/Settings/settings.html");
                break;

            case 117:
            case 85:
                window.location.replace("../../App/User/user.html");
                break;
            default:
                console.log('Shortcut not detected');
        }


    }
});