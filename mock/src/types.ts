export interface Channel {
    id: number;
    name: string;
}

export interface Message {
    id: number;
    text: string;
    timestamp: number;
    channelId: number;
    user: {
        id: number;
        name: string;
    }
}
