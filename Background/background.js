/*
 * Copyright (c) 2016 - 2021. Roger Pedrós Villorbina, All rights reserved.
 *
 */
( ()=>{
    /* worker_wrapper.js */
    try {
        importScripts("Provider/Provider.js",
            "Manager/button-logic.js",
            "Manager/icon-logic.js",
            "Manager/history-logic.js",
            "Manager/Manager.js",
            "Listener/initial-setup.js",
            "Listener/Listener.js"
        );
    } catch (e) {
        console.log(e);
    }
})();