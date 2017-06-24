chrome.runtime.onMessageExternal.addListener((msg, sender, res) => {
    if (msg.screenShare) {
        chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], sender.tab, (streamId) => {
            res({ streamId });
        });
        return true;
    }
});