const connectBtn = document.getElementById('connect');
if (connectBtn) {
    connectBtn.addEventListener('click', connect)
}

const disconnectBtn = document.getElementById('disconnect');
if (disconnectBtn) {
    disconnectBtn.addEventListener('click', disconnect);
}

const sendMessageBtn = document.getElementById('sendMessage');
if (sendMessageBtn) {
    sendMessageBtn.addEventListener('click', sendMessage);
}

window.onload = () => disconnect();