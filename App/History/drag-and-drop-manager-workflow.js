/*Copyright (c) 2016 - 2021. Roger Pedrós Villorbina, All rights reserved.*/
//Aquesta clase iniciatliza el drag and drop i els sliders horitzontals
$(document).on('historyGenerated_event', () => {

        //INICIALITZAR SLIDERS HORITZONTALS

        var boxArray = document.getElementsByClassName("box");
        var boxes = Array.prototype.slice.call(boxArray);

        dragula({containers: boxes});

});


