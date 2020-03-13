/*
 * Copyright (c) 2016 - 2020. Roger Pedrós Villorbina, All rights reserved.
 *
 */

/*ALTRES*/
//Get JSON data form internet.
let getJSON = (url) => {
    return new Promise((resolve, reject) => {
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                resolve(this.responseText)
            }
        });

        xhr.open("GET", url);
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(data);
    });
};