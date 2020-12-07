class WebSocketService {

    static instance = null;

    constructor() {
        this.socketRef = null;
        this.callbacks = {};
        this.baseurl = 'ws://' + "127.0.0.1:8000" + '/ws/chat/';
    }

    static getInstance = function () {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance
    }

    connect = function () {
        const path = this.baseurl + 'test/';
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {
            console.log(`Websocket is open! on ${path}`);
        }
        this.socketNewMessage(JSON.stringify({
            command: "fetch_messages"
        }))
        this.socketRef.onmessage = (e) => {
            this.socketNewMessage(e.data);
        }
        this.socketRef.onerror = (e) => {
            console.log(e);
        }
        this.socketRef.onclose = () => {
            console.log('Websocket is closed!');
            this.connect();
        }
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if (Object.keys(this.callbacks).length === 0) {
            // do nothing
            return;
        }
        if (command === 'messages') {
            this.callbacks[command](parsedData.messages);
        }
        if (command === 'new_message') {
            this.callbacks[command](parsedData.message);
        }
    }

    fetchMessages = function (username) {
        this.sendMessage({
            command: 'fetch_messages',
            username: username
        });
    }

    newChatMessage = function (message) {
        this.sendMessage({
            command: 'new_message',
            from: message.from,
            message: message.content
        });
    }

    addCallbacks = function (messagesCallback, newMessageCallback) {
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback;
    }

    sendMessage = function (data) {
        try {
            this.socketRef.send(JSON.stringify({
                ...data
            }))
        } catch (error) {
            console.log(error.message);
        }
    }

    state = function () {
        var response = 0
        try {
            response = this.socketRef.readyState;
        } catch (error) {
            // console.log(error)
        }
        return response
    }

    waitForSocketConnection = function (callback) {
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;
        setTimeout(function () {
            if (socket.readyState === 1) {
                console.log('connection is secure');
                if (callback != null) {
                    callback();
                }
                return;
            } else {
                console.log('waiting for connection');
                recursion(callback);
            }
        }, 1)
    }

}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;