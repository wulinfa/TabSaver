/*Copyright (C) 2016-2019, Roger Pedrós Villorbina, All rights reserved.*/


function generateId(){
    return newId = s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}