var mainWindow = null;
chrome.app.runtime.onLaunched.addListener(function(launchData) {
    if (mainWindow) {
        mainWindow.contentWindow.launchData = launchData;
        mainWindow.focus();
        mainWindow.drawAttention();
        chrome.runtime.sendMessage({
            open: true
        });
    }
    chrome.app.window.create(
        'index.html', {
            id: 'Writer',
            width: Math.round(screen.width * 0.75),
            height: Math.round(screen.height * 0.75),
            left: Math.round(screen.width * 0.125),
            top: Math.round(screen.height * 0.125),
            minWidth: 780,
            minHeight: 400,
            frame: 'none'
        },
        function(win) {
            win.onRestored.addListener(function() {
                chrome.runtime.sendMessage({
                    restored: true
                });
            });
            win.onMaximized.addListener(function() {
                chrome.runtime.sendMessage({
                    max: true
                });
            });
            win.onMinimized.addListener(function() {
                chrome.runtime.sendMessage({
                    min: true
                });
            });
            win.onFullscreened.addListener(function() {
                chrome.runtime.sendMessage({
                    full: true
                });
            });
            mainWindow = win;
            win.contentWindow.launchData = launchData;
        });
});
