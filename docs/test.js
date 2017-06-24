chrome.runtime.sendMessage('kpbidbdboieeimkoeabnpdpjhgglmnig', { screenShare: true }, res => {
    if (streamId) {
        navigator.mediaDevices.getUserMedia({
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: streamId
                }
            }
        }).then(stream => {
            vid.srcObject = stream;
        });
    }
})