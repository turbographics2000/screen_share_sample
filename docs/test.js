navigator.mediaDevices.enumerateDevices().then(devices => {
    devices.filter(device => device.kind === 'videoinput').forEach(device => {
        var opt = document.createElement('option');
        opt.value = device.deviceId;
        opt.textContent = `[WebCam] ${device.name}`;
        captureSource.appendChild(opt);
    })
});
btnStart.onclick = evt => {
    if (['screen', 'window'].includes(captureSource.value)) {
        if (window.chrome) {
            chrome.runtime.sendMessage('gmmpnajlmiejobjejmahldpgmcpfpnin', { screenShare: [captureSource.value] }, ({ streamId }) => {
                if (streamId) {
                    gum({
                        video: {
                            mandatory: {
                                chromeMediaSource: 'desktop',
                                chromeMediaSourceId: streamId
                            }
                        }
                    });
                }
            });
        } else if (typeof InstallTrigger !== 'undefined') {
            gum({
                video: {
                    mediaSource: captureSource.value // 'window', 'application'
                }
            });
        }
    } else {
        gum({
            video: {
                deviceId: captureSource.value
            }
        })
    }
};

function gum(constraints) {
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        vid.srcObject = stream;
    });
}