//Roger Pedrós Villorbina - Barcelona.

//Extension made as part of my self-learning 
//If you're reading this it's cause ur intereseted in my code. It's far to be perfect, but it works and it's mine. 


chrome.browserAction.onClicked.addListener(function() => {
    alert('Hello, World!'); 
    if (checkTree() = true){ //TRUE ES QUE LA CARPETA ESTA
        //SHA DE MIRAR EL TREE, AGAFAR LA CARPETA QUE YO VUI I DESPLEGARLA. 
        
        updateIcon(true);
    }
    if (checkTree() = false){ //FALSE ES QUE LA CAPERTA NO ESTA, PER TANT S'HA DE CREAR. 
        chrome.windows.getAll({populate: true, windowTypes: ["normal"]}, logTabsForWindows);
        updateIcon(false);
    }

    else{
        alert("Ha surjido un problema con la extensión. Por favor, cierre el Chrome y asegurese que este actulizado, si el problema persiste resintale la extensión.");
    }
});

chrome.windows.onCreated.addListener(function() {
    if (checkTree() = true){
        updateIcon(true);
    }
    if (checkTree() = false){
        updateIcon(false);
    }
});

chrome.bookmarks.onRemoved.addListener(function(){ 
    if (checkTree() = false){
        updateIcon(false);
    }
});

function updateIcon(var status) {
    if(status = true){
        chrome.browserAction.setIcon({path:"resources/icon2.png"});
    }
    if (status = false){
        chrome.browserAction.setIcon({path:"resources/icon.png"});
    }
    else{
        alert("feinades");
    }
}

var tabsUrlData;
function logTabsForWindows(windowInfoArray) {
    for (windowInfo of windowInfoArray) {
        tabsUrlData = (windowInfo.tabs.map( (tab) => {return (tab.url) }));
    }
    createTree();
}

function launchTabs(){
    chrome.tabs.create({url:"http:www.google.com"});
}

function createBookmarks(){
    var bookmarkBar = '';    
    
    chrome.bookmarks.create({'parentId': bookmarkBar.id, 'title': 'Extension'}, function(newFolder) {
        console.log("added folder: " + newFolder.title);
        console.log(newFolder);

        chrome.bookmarks.create({'parentId': newFolder.id, 
                                 'title': 'Extensions doc', 
                                 'url': 'http://www.google.com'}); 
    });
    
}

function checkTree(){
    //if(get tree)
        //if x caprta esta ok si no feinades
    return true;  //TRUE ES QUE LA CARPETA DELS BOOKSMARKS ESTA. FALSE ES QUE NO ESTA/LHAN BORRAT
}
