btnStart.onclick = evt => {
    if (window.chrome) {
        chrome.runtime.sendMessage('gmmpnajlmiejobjejmahldpgmcpfpnin', { screenShare: [captureSource.value] }, ({ streamId }) => {
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
    } else if (typeof InstallTrigger !== 'undefined') {
        navigator.mediaDevices.getUserMedia({
            video: {
                mediaSource: captureSource.value // 'window', 'application'
            },
        }).then(stream => {
            vid.srcObject = stream;
        });
    }
};