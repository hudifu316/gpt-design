import React, { useState, useEffect } from 'react';
import { getChannels, getChannelMessages, createMessage } from './api';
import { Channel, Message } from './types';

export const Chat = () => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessageText, setNewMessageText] = useState('');

    useEffect(() => {
        const fetchChannels = async () => {
            const channels = await getChannels();
            setChannels(channels);
            if (channels.length > 0) {
                setSelectedChannel(channels[0]);
            }
        };
        fetchChannels();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedChannel) {
                const messages = await getChannelMessages(selectedChannel.id);
                setMessages(messages);
            }
        };
        fetchMessages();
    }, [selectedChannel]);

    const handleChannelSelect = (channel: Channel) => {
        setSelectedChannel(channel);
    };

    const handleNewMessageTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessageText(event.target.value);
    };

    const handleNewMessageSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedChannel) {
            const message = await createMessage(selectedChannel.id, newMessageText, undefined);
            setMessages([...messages, message]);
            setNewMessageText('');
        }
    };

    return (
        <div>
            <div>
                {channels.map((channel) => (
                    <button key={channel.id} onClick={() => handleChannelSelect(channel)}>
                        {channel.name}
                    </button>
                ))}
            </div>
            {selectedChannel && (
                <div>
                    <h2>{selectedChannel.name}</h2>
                    <ul>
                        {messages.map((message) => (
                            <li key={message.id}>
                                {message.user.name}: {message.text}
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleNewMessageSubmit}>
                        <input type="text" value={newMessageText} onChange={handleNewMessageTextChange} />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
};
