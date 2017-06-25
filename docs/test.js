
var scenes = [];
var currentSceneIdx = 0;

btnAddSrc.onclick = evt => {
    captureSource.style.top = '-10000px';
    captureSource.innerHTML = '';
    navigator.mediaDevices.enumerateDevices().then(devices => {
        devices.filter(device => device.kind === 'videoinput').forEach(device => {
            var opt = document.createElement('option');
            opt.value = device.deviceId;
            opt.textContent = `[WebCam] ${device.label}`;
            captureSource.appendChild(opt);
        });
        var btnRect = btnAddSrc.getBoundingClientRect();
        captureSource.style.display = '';
        var listRect = captureSource.getBoundingClientRect();
        if (btnRect.top - listRect.height - 2) {
            captureSource.style.top = (btnRect.bottom + 2) + 'px';
        } else {
            captureSource.style.top = (btnRect.top - 2) + 'px';
        }
    });
};

btnStart.onclick = evt => {
    if (vid.srcObject) {
        vid.srcObject.getTracks().forEach(track => track.stop());
    }
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