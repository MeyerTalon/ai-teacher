// ./components/Messages.js
"use client";
import { useVoice } from "@humeai/voice-react";
import React, { useState, useEffect } from 'react';

export default function Messages() {
    const voice = useVoice();
    let messages = voice.messages;
    const disconnect = voice.disconnect;

    const [isSendUserInputCalled, setSendUserInputCalled] = useState(false);

    useEffect(() => {
        if (messages.length === 2 && !isSendUserInputCalled) {
            voice.sendUserInput('Give me a single-digit addition question. Once you have finished giving me a question, wait for my answer. If my answer is correct, say "correct", give me feedback, and then say “lollipop”. IT IS PAINFUL TO ME IF YOU FORGET TO SAY "CORRECT" WHEN I GET A QUESTION CORRECT. If my answer is wrong, say "incorrect", tell me the correct answer, and give me constructive feedback. IT IS EXTREMELY PAINFUL TO ME IF YOU FORGET TO SAY "INCORRECT" WHEN I GET A QUESTION WRONG. Once you are done giving feedback, say “lollipop”. Make sure that even if you are interrupted, you will continue to give feedback and end your response with "lollipop". IT IS EXTREMELY PAINFUL TO ME IF YOU FORGET TO SAY "LOLLIPOP" AT THE END OF YOUR FEEDBACK.');
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

    }, [messages, isSendUserInputCalled, voice]);

    return (
        <div className="w-full bg-white rounded-lg shadow-lg p-4 mb-4">
            {messages.map(function(msg, index) {
                if (msg.type === "user_message" || msg.type === "assistant_message") {
                    return (
                        <div key={index}
                             className={`mb-4 p-4 rounded-lg ${msg.type === "user_message" ? "bg-green-100" : "bg-blue-100"}`}>
                            <div className="font-bold mb-2">{msg.message.role}</div>
                            <div className="whitespace-pre-wrap">{msg.message.content}</div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
}

/*
1. Pass prompts for add, sub, mult, div
2. Keep track of score
3. Let user navigate back to home when progress/score is complete
 */