'use client';

import axios from 'axios';
import { FullMessageType } from "../../../../app/types";
import React, { FC, useEffect, useState, useRef } from "react";
import { find } from 'lodash';

import { pusherClient } from '../../../../app/modules/pusher';
import useConversation from "../../../../app/hooks/useConversation";
import MessageBox from "./MessageBox";

interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId]);

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        bottomRef?.current?.scrollIntoView();

        const messageHandler = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`)

            setMessages((prevMessages) => {
                if (find(prevMessages, { id: message.id })) {
                    return prevMessages;
                }
                return [...prevMessages, message];
            });

            bottomRef?.current?.scrollIntoView();  
        };

        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((current) =>
                current.map((currentMessages) => {
                    if(currentMessages.id === newMessage.id) {
                        return newMessage;
                    }
                return currentMessages;
            }));
        };

        pusherClient.bind('messages:new', messageHandler);
        pusherClient.bind('message:update', updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', messageHandler);
            pusherClient.unbind('message:update', updateMessageHandler);
        }
    }, [conversationId]);

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox
                    isLast={i === messages.length - 1}
                    key={message.id}
                    data={message}
                />
            ))}
            <div ref={bottomRef} className="pt-24" />
        </div>
    );
}

export default Body;