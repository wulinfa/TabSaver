/**
 * Created by pedro on 30/05/2017.
 */

function generateId(){
    return newId = s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}