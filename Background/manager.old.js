//Roger Pedrós Villorbina - Barcelona.

chrome.browserAction.onClicked.addListener(() => {
    console.log('Extension Clicked.'); 
    console.log(checkTree().then(checSubTree(callback)));
    
//    if (checkTree() == true){ //TRUE ES QUE LA CARPETA ESTA
//        console.log("TRUE");
//        launchTabs();
//        updateIcon(true);
//    }
//    if (checkTree() == false){ //FALSE ES QUE LA CAPERTA NO ESTA, PER TANT S'HA DE CREAR. 
//        console.log("FALSE");
//        chrome.windows.getAll({populate: true, windowTypes: ["normal"]}, getTabsAndCreateBookmarks);
//        updateIcon(false);
//    }
});


function checkTree(){ //TRUE ES QUE LA CARPETA DELS BOOKSMARKS ESTA. FALSE ES QUE NO ESTA/LHAN BORRAT
    chrome.storage.local.get('BookmarkFolderId', function(id){
        console.log(id.BookmarkFolderId + " El ID es undefined.");
        return id.BookmarkFolderId;
    });
}

function checkSubTree(callback) {
    chrome.bookmarks.getSubTree(callback, function(folder){
        console.log(folder);
    });
}





function closedCODE(){
//chrome.windows.onCreated.addListener(function() {
//    if (checkTree() === true){
//        updateIcon(true);
//    }
//    if (checkTree() === false){
//        updateIcon(false);
//    }
//});
//
//chrome.bookmarks.onRemoved.addListener(function(){ 
//    if (checkTree() === false){
//        updateIcon(false);
//    }    
//    if (checkTree() === true){
//        updateIcon(true);
//    }
//});
}

function updateIcon(status) {
    if(status == true){
        chrome.browserAction.setIcon({path:"resources/icon.png"});
    }
    if(status == false){
        chrome.browserAction.setIcon({path:"resources/icon2.png"});
    }
    else{
        console.log("Feinades");
    }
}

//GET TABS AND CREATE BOOKMARKS. 
function getTabsAndCreateBookmarks(windowInfoArray) {  
    launchNotification("Guardando pestañas", "Guardando las paginas web.\n Puede recuperarlas vez haciendo click en la extensión.");
    for (windowInfo of windowInfoArray) {
        tabsUrlData = (windowInfo.tabs.map((tab) => {
            return (tab.url);
        }));
    }
    var bookmarkBar = '';
    chrome.bookmarks.create({'parentId': bookmarkBar.id, 'title': 'Extension'}, function(newFolder) {
        saveData(newFolder.id); //Saving the bookmarkFolderID
        
        for(key in tabsUrlData){
            chrome.bookmarks.create({'parentId': newFolder.id, 'title': 'Extensions doc','url': tabsUrlData[key]});
        } 
    });
}

function saveData(FolderId){ //TODO: En un futur potse s'ha de canviar. 
    chrome.storage.local.set({'BookmarkFolderId': FolderId}, function() {
        console.log('Settings saved');
    });
}

function launchTabs(){
    launchNotification("Recuperando pestañas", "Recuperando las paginas web guardadas.");
    chrome.storage.local.get('BookmarkFolderId', function(id){
        chrome.bookmarks.getSubTree(id.BookmarkFolderId, function(folder){    
            for(key in folder["0"].children){
                chrome.tabs.create({url: folder["0"].children[key].url});
            }
        });
    });
}


function launchNotification(titol, message2){
    var options = {
        type: 'basic',
        iconUrl: 'resources/icon.png',
        title: titol,
        message: message2}
    
   chrome.notifications.create('Tab Saver',options,function(){}); 
    
}
