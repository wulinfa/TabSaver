//Roger Pedrós Villorbina - Barcelona.

onInit();
function onInit() {
    //getAndSetConfigData();
    //checkAndUpdateIcon()
}
function checkAndUpdateIcon() {
    getDataFromDB()
        .then((dataFromDB) => {
            //console.log(dataFromDB);
            if(dataFromDB){ //true. Aixo es que hi ha informacio guardada, per tant posem l'icono com que n'hi ha
                updateIcon(true);
            }
            if(!dataFromDB){ //false. Aixo es no hi ha informacio, per tant la app es marca com a disponible per a guardarne
                updateIcon(false);
            }
        });
}
function updateIcon(status) {
    if(status == true){
        chrome.browserAction.setIcon({path:"resources/icon2.png"});
    }
    if(status == false){
        chrome.browserAction.setIcon({path:"resources/icon.png"});
    }
    else{
        console.log("Feinades");
    }
}


chrome.browserAction.onClicked.addListener(() => {
    console.log('Extension Clicked.');
    debugger;

    getDataFromDB()
        .then((dataFromDB) => {
            console.log(dataFromDB);

        });

    // if(dataFromDB){ //true. Aixo es que hi ha informacio guardada, per tant posem l'icono com que n'hi ha
    //     openSavedTabs();
    //     chrome.browserAction.setIcon({path:"resources/icon.png"});
    // }
    // if(!dataFromDB){ //false. Aixo es no hi ha informacio, per tant la app es marca com a disponible per a guardarne
    //     getTabs()
    //         .then((dataFromChromeWindow)=>{saveData(dataFromChromeWindow)});
    //     chrome.browserAction.setIcon({path:"resources/icon2.png"});
    //
    // }

});

//GET TABS
function getTabs() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({currentWindow: true}, (tabs) => {
            resolve(tabs);
        });
    });
}

//SAVE TABS ON DB or bookmarks
function saveData(dataFromChromeWindow) {
    let objectToSave = {
        sessionTabs: dataFromChromeWindow
    };

    saveDatatoDB(objectToSave);
    //saveDatatoBookmarks(objectToSave);

    //aqui tanquem les finestes
    //closeActualTabs(dataFromChromeWindow)
}
function saveDatatoDB(objectToSave) {
    chrome.storage.local.set(objectToSave);
}
function saveDatatoBookmarks(objectToSave) {
    var bookmarkBar = '';
    chrome.bookmarks.create({'parentId': bookmarkBar.id, 'title': 'Saved Tabs'}, (newFolder) => {
        for(key in objectToSave.sessionTabs){
            chrome.bookmarks.create({'parentId': newFolder.id, 'title': objectToSave.sessionTabs[key].title ,'url': objectToSave.sessionTabs[key].url});
        }

    });

}


//GET DATA FORM DB
function getDataFromDB() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get('sessionTabs',(result) =>{
            resolve(result);
        });
    });
}
function removeDataFromDB() {
    chrome.storage.local.remove('sessionTabs',() =>{});
}

//TANCAR O OBRE LES PESTANYES
function closeActualTabs(dataFromChromeWindow) {
    for(key in dataFromChromeWindow){
        chrome.tabs.remove( dataFromChromeWindow[key].id, function() {});
    }
    chrome.tabs.create({ url: null });
    onInit();
}
function openSavedTabs(dataFromDB) {
    for(key in dataFromDB){
        console.log(dataFromDB[key]);
        // chrome.tabs.remove( dataFromDB[key].id, function() {});
    }
    removeDataFromDB();
}




