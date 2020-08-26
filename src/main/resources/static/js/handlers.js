let stompClient = null;
const ENDPOINT_URI = '/ws';
const SUBSCRIBE_URI = '/app/topic/messages';
const SEND_URI = '/app/chat';

function onconnect(frame) {
    setConnected(true);
    console.log('frame');
    stompClient.subscribe(SUBSCRIBE_URI, onreceive);
}

function onerror(frame) {
    console.log(frame);
}

function onreceive(payload) {

    if (payload.body) {
        const message = JSON.parse(payload);
        console.log(`got message with body ${message.from}`);
    } else {
        console.log("got empty message");
    }
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    const from = document.getElementById('from').value;
    const text = document.getElementById('text').value;

    stompClient.send(SEND_URI, {}, JSON.stringify({
        'from': from,
        'text': text
    }))
}

function sendName() {
    var name = document.getElementById('from').value;
    stompClient.send(SEND_URI, {}, JSON.stringify({ 'name': name }));
}

function connect() {
    const socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onconnect);
}

// function(frame) {
//     setConnected(true);
//     sendName();
//     console.log('Connected: ' + frame);
//     stompClient.subscribe('/topic/greetings', function(greeting) {
//         showGreeting(JSON.parse(greeting.body).content);
//     });