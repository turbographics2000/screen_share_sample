btnStart.onclick = evt => {
    chrome.runtime.sendMessage('gmmpnajlmiejobjejmahldpgmcpfpnin', { screenShare: true }, ({ streamId }) => {
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
    });
};