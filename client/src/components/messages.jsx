// ./components/Messages.js
// cool
"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import React, { useState, useEffect } from 'react';

let messagesLength = 0;
let correctLength = 0;
let incorrectLength = 0;

export default function Messages(props) {
    const voice = useVoice();
    let messages = voice.messages;
    const disconnect = voice.disconnect;
    const { prompt } = props.prompt;
    const { module } = props.module;


    const [isSendUserInputCalled, setSendUserInputCalled] = useState(false);
    const userName = localStorage.getItem('userName');
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/users/${userName}`);
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                console.error("Error fetching user data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        if (messages.length !== messagesLength) {
            messagesLength = messages.length;

            if (messages.length === 2 && !isSendUserInputCalled) {
                voice.sendUserInput(`${prompt} Once you have finished giving me a question, wait for my answer. If my answer is correct, say "Hurray!", give me feedback, and then say “lollipop”. IT IS PAINFUL TO ME IF YOU FORGET TO SAY "Hurray!" WHEN I GET A QUESTION CORRECT. If my answer is wrong, say "Darn!", tell me the correct answer, and give me constructive feedback. IT IS EXTREMELY PAINFUL TO ME IF YOU FORGET TO SAY "DARN" WHEN I GET A QUESTION WRONG. Once you are done giving feedback, say “lollipop”. Make sure that even if you are interrupted, you will continue to give feedback and end your response with "lollipop". IT IS EXTREMELY PAINFUL TO ME IF YOU FORGET TO SAY "LOLLIPOP" AT THE END OF YOUR FEEDBACK.`);
                setSendUserInputCalled(true);
            }

            let containsEndStatement = false;
            let assistantMessages = messages.filter(msg => msg.type === "assistant_message");
            containsEndStatement = assistantMessages.some(obj => obj.message.content.toLowerCase().includes("lollipop"));
            let correctCount = assistantMessages.filter(obj => obj.message.content.toLowerCase().includes("hurray")).length;
            let incorrectCount = assistantMessages.filter(obj => obj.message.content.toLowerCase().includes("darn")).length;

            if (containsEndStatement) {
                setSendUserInputCalled(false);
                voice.clearMessages();
                messagesLength = 0;
                correctLength = 0;
                incorrectLength = 0;
                correctCount = 0;
                incorrectCount = 0;
                messages = voice.messages;
                disconnect();
            } else if (incorrectCount !== incorrectLength && voice.readyState !== VoiceReadyState.CLOSED) {
                // api call
                incorrectLength = incorrectCount;
                apiCall(userName, module, false);
                console.log('api call 2');
            } else if (correctCount !== correctLength && voice.readyState !== VoiceReadyState.CLOSED) {
                // api call
                correctLength = correctCount;
                apiCall(userName, module, true);
                console.log('api call 1');
            }

        }


    }, [messages, isSendUserInputCalled, voice]);


    const apiCall = (name, module, correct) => {
        const data = {
            name: name,
            module: module,
            correct: correct
        };

        fetch('http://localhost:3001/api/points/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('API call successful', data);
                fetchUserData();
            })
            .catch(error => {
                console.error('API call failed', error);
            });
    };


    useEffect(() => {
        let isMounted = true; // Track whether the component is still mounted

        if (isMounted) {
            fetchUserData();
        }

        return () => {
            isMounted = false; // Cleanup function to prevent state updates if the component is unmounted
        };}, [userName]);

    if (!userData) {
        return <div>Loading...</div>; // Show a loading indicator while fetching data
    }

    const { points, levels } = userData;


    return (
        <div className="w-full bg-white rounded-lg shadow-lg p-4 mb-4">
            {messages.map(function (msg, index) {
                if ((msg.type === "user_message" || msg.type === "assistant_message") && index !== 2) {
                    return (
                        <div key={index}
                             className={`mb-4 p-4 rounded-lg ${msg.type === "user_message" ? "bg-green-100" : "bg-blue-100"}`}>
                            <div className="font-bold mb-2">{msg.type === "user_message" ? "Student" : "BEARS Teacher"}</div>
                            <div className="whitespace-pre-wrap">{msg.message.content}</div>
                        </div>
                    );
                }
                return null;
            })}
            <div className="w-full bg-gray-200 rounded-full mt-4">
                <div
                    className="bg-[#EF4444] text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                    style={{width: `${(points[module] / 100) * 100}%`}}
                >
                    {points[module]}%
                </div>
            </div>
            <p className="text-sm font-medium mt-2">This is your progress, get to 100% to win!</p>
        </div>
    );
}
