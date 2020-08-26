function setConnected(isConnected) {
    document.getElementById('connect').disabled = isConnected;
    document.getElementById('disconnect').disabled = !isConnected;
    document.getElementById('conversationDiv').style.visibility = isConnected ? 'visible' : 'hidden';
    document.getElementById('response').innerHTML = '';
}