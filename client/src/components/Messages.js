// ./components/Messages.js
"use client";
import { useVoice } from "@humeai/voice-react";
import React, { useState, useEffect }  from 'react';



export default function Messages() {
    const voice = useVoice();
    let messages = voice.messages;
    const disconnect = voice.disconnect;
    console.log(messages);
    // Initialize the state variable
    const [isSendUserInputCalled, setSendUserInputCalled] = useState(false);

    useEffect(() => {
        if (messages.length === 2 && !isSendUserInputCalled) {
            voice.sendUserInput('Give me a single-digit addition question. Once you have finished giving me a question, wait for my answer. If my answer is correct, praise me and then say “lollipop”. If my answer is wrong, tell me the correct answer and give me constructive feedback. Once you are done giving feedback, say “lollipop”');
            setSendUserInputCalled(true);
        }

        let containsEndStatement = false;
        let assistantMessages = messages.filter(msg => msg.type === "assistant_message");
        containsEndStatement = assistantMessages.some(obj => obj.message.content.toLowerCase().includes("lollipop"));

        if (containsEndStatement) {
            setSendUserInputCalled(false);
            voice.clearMessages();
            messages = voice.messages;
            disconnect();
        }

        console.log(messages);

    }, [messages, isSendUserInputCalled, voice]);


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