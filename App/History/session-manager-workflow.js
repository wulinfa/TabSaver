/*Copyright (c) 2016 - 2020. Roger Pedrós Villorbina, All rights reserved.*/
$(document).on('historyGenerated', () => {
        var boxArray = document.getElementsByClassName("box");
        var boxes = Array.prototype.slice.call(boxArray);

        dragula({containers: boxes});

});

