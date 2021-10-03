import Ws from "./Ws";

const WS_PORT = 8081;

/**
 * Websocket client
 */
export default class WebsocketClient {

    private sockets = {};

    public init(channel, _options?: {
        doNotTryToReconnect: boolean
    }): Ws {

        let options = {
            onClose: (wasClean) => {

                if(_options && _options.doNotTryToReconnect){
                    return;
                }

                if(wasClean){
                    this.sockets[channel] = new Ws( WS_PORT, channel, options );
                }
            }
        }

        this.sockets[channel] = new Ws( WS_PORT, channel, options );

        return this.sockets[channel];
    }

    public getSocket( channel: string ): Ws {

        if(this.sockets[channel] === void(0)){
            return null;
        }

        return this.sockets[channel];
    }
}
