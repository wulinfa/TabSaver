

chrome.browserAction.onClicked.addListener(() => {
    console.log("Hello World!");
    //launchNotification("Tab Saver", "Notification test");
    chrome.windows.getAll({populate: true, windowTypes: ["normal"]}, logTabsForWindows);
    
    //checkTree();

});


var tabsUrlData;
function logTabsForWindows(windowInfoArray) {    
    for (windowInfo of windowInfoArray) {
        tabsUrlData = (windowInfo.tabs.map((tab) => {
            return (tab.url);
        }));
    }
    //console.log("tabsUrlData: " + tabsUrlData);
    createBookmarks();
}

function createBookmarks(){
    var bookmarkBar = '';    
    chrome.bookmarks.create({'parentId': bookmarkBar.id, 'title': 'Extension'}, function(newFolder) {
        saveData(newFolder.id); //AQUI ESTA EL SAVE DATA
        
        for(key in tabsUrlData){
            chrome.bookmarks.create({'parentId': newFolder.id, 'title': 'Extensions doc','url': tabsUrlData[key]});
        } 
    });
    
}

function saveData(FolderId){
    chrome.storage.local.set({'BookmarkFolderId': FolderId}, function() {
        console.log('Settings saved');
    });
    
    checkTree();
}

// chrome.storage.local.set({'userid': "foo"}, function (result) {
//    chrome.storage.local.get('userid', function (result) {
//        console.log(result.userid);
//   });
//});

function checkTree(){
    chrome.storage.local.get('BookmarkFolderId', function(id){
        console.log(id.BookmarkFolderId);
        chrome.bookmarks.getSubTree(id.BookmarkFolderId, function(folder){
            console.log(folder);
        });
    });
    launchTabs();
    return true;
    //TRUE ES QUE LA CARPETA DELS BOOKSMARKS ESTA. FALSE ES QUE NO ESTA/LHAN BORRAT
}

function launchTabs(){
    var urlFromBookmarks;
    chrome.storage.local.get('BookmarkFolderId', function(id){
        console.log(id.BookmarkFolderId);
        chrome.bookmarks.getSubTree(id.BookmarkFolderId, function(folder){
            console.log(folder["0"].children);
            urlFromBookmarks = folder["0"].children;
        });
    });
    
    
    for(key in urlFromBookmarks){
        console.log(urlFromBookmarks[key]);
        chrome.tabs.create({url:urlFromBookmarks[key]});
        
    } 
}

