
interface IOptions {
    onClose?: (wasClean: boolean) => void
}

/**
 * This class create connection with websocket server
 */
export default class Ws {

    private options: IOptions = null;

    private socket: WebSocket = null;

    private onMessageListeners = [];

    private channel = null;

    constructor(port: number, channel: string, options: IOptions = {}){

        this.socket = new WebSocket(`ws:localhost:${port}/${channel}`);

        this.channel = channel;

        this.options = options;

        this.initEvents();
    }

    public getSocket(){
        return this.socket;
    }

    public onMessage(cb){

        let listener = {
            cb
        };
        
        this.onMessageListeners.push(listener);

        return () => {
            this.onMessageListeners.splice(this.onMessageListeners.indexOf(listener), 1);
        }
    }

    private processMessage(message){

        // process only string messages which can be parsed
        if(Object.prototype.toString.call(message) === '[object String]'){

            let parsedMsd
            try {
                parsedMsd = JSON.parse(  message  );
            } catch(e){
                // do nothing

                parsedMsd = message;
            }
    
            this.onMessageListeners.forEach((listener) => {
                listener.cb(parsedMsd);
            });

        }

    }

    private initEvents(){
        this.socket.onopen = (e) => {
            console.log(`[open] Connection established, channel: ${this.channel}`);
        };

        this.socket.onmessage = (event) => {
            if (event.data instanceof Blob) {
                let reader = new FileReader();
        
                reader.onload = () => {

                    this.processMessage(reader.result);
                };
        
                reader.readAsText(event.data);
            } else {
                this.processMessage(event.data);
            }

            console.log(`[message] Data received from server: ${event.data}`);
        };

        this.socket.onclose = (event) => {
            if (event.wasClean) {

                console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);

                this.options.onClose && this.options.onClose(event.wasClean);

            } else {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                console.log(`[close] Connection died, channel: ${this.channel}`);
            }
        };

        this.socket.onerror = (error:any) => {
            console.error(`[error] ${error.message}`);
        };
    }
}