chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create(
    'index.html',
    {
        id: 'Writer',
        width: 900,
        height: 500,
        minWidth: 500,
        minHeight: 400,
        frame: 'none'
    }, function(win){
        win.onRestored.addListener(function(){
            chrome.runtime.sendMessage({restored: true});
        });
        win.onMaximized.addListener(function(){
            chrome.runtime.sendMessage({max: true});
        });
        win.onMinimized.addListener(function(){
            chrome.runtime.sendMessage({min: true});
        });
        win.onFullscreened.addListener(function(){
            chrome.runtime.sendMessage({full: true});
        });
    });
});
