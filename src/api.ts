import axios from "axios";
import {Message} from "./types";

const BASE_URL = "http://localhost:3000";

export const getChannels = async () => {
    const response = await axios.get(`${BASE_URL}/channels`);
    return response.data;
};

export const getChannelMessages = async (channelId: number) => {
    const response = await axios.get(`${BASE_URL}/channels/${channelId}/messages`);
    return response.data;
};

export async function createMessage(channelId: number, text: string, userId: undefined): Promise<Message> {
    const response = await fetch(`${BASE_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ channelId, text, userId }),
    });
    if (!response.ok) {
        throw new Error('Failed to create message');
    }
    return response.json();
}

export const getUsers = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
};

export const getChannelUsers = async (channelId: number) => {
    const response = await axios.get(`${BASE_URL}/channels/${channelId}/users`);
    return response.data;
};

export const addUserToChannel = async (channelId: number, userId: number) => {
    const response = await axios.post(`${BASE_URL}/channels/${channelId}/users`, {
        userId,
    });
    return response.data;
};

export const removeUserFromChannel = async (channelId: number, userId: number) => {
    const response = await axios.delete(`${BASE_URL}/channels/${channelId}/users/${userId}`);
    return response.data;
};
