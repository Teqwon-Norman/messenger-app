'use client';

import axios from 'axios';
import { FullMessageType } from "@/app/types";
import { FC, useEffect, useState, useRef } from "react";


import useConversation from "@/app/hooks/useConversation";
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