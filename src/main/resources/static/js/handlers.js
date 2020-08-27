let stompClient = null;
const ENDPOINT_URI = '/ws';
const SUBSCRIBE_URI = '/topic/messages';
const SEND_URI = '/app/chat';

const SEND_USER = '/app/chat.addUser';

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

function onconnect(frame) {
    setConnected(true);
    console.log('frame');
    stompClient.subscribe(SUBSCRIBE_URI, (payload) => console.log(payload));
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
    let name = document.getElementById('from').value;
    stompClient.send(SEND_USER, {}, JSON.stringify({ 'from': name, 'text': "" }));
}

function showMessage(content) {
    const messages = document.getElementById('messages');

    if (content.messageType === 'SEND') {
        const newMessage = document.createElement('P');
        newMessage.innerHTML = `${content.time}::${content.text}`;
        messages.appendChild(newMessage);
    } else if (content.messageType === 'CONNECT') {
        const greeting = document.createElement('h2');

        greeting.innerHTML = `Welcome, ${content.from}`;
        messages.appendChild(greeting);
    }

    console.log('text:' + content);
}

function connect() {
    const socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame) => {
        setConnected(true);
        sendName();
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', (payload) => {
            showMessage(JSON.parse(payload.body));
        });
    });
}