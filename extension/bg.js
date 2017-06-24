chrome.runtime.onMessageExternal.addListener((msg, sender, res) => {
    if (msg.screenShare) {
        chrome.desktopCapture.chooseDesktopMedia(msg.screenShare, sender.tab, (streamId) => {
            res({ streamId });
        });
        return true;
    }
});