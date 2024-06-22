// ./components/Messages.js
"use client";
import { useVoice } from "@humeai/voice-react";

export default function Messages() {
    var voice = useVoice();
    var messages = voice.messages;

    return (
        <div>
            {messages.map(function(msg, index) {
                if (msg.type === "user_message" || msg.type === "assistant_message") {
                    return (
                        <div key={msg.type + index}>
                            <div>{msg.message.role}</div>
                            <div>{msg.message.content}</div>
                        </div>
                    );
                }

                return null;
            })}
        </div>
    );
}