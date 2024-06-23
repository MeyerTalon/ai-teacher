// ./components/Controls.js
"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";

export default function Controls() {
    const voice = useVoice();
    const connect = voice.connect;
    const disconnect = voice.disconnect;
    const readyState = voice.readyState;
    let messages = voice.messages;

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => connect()}
                className="bg-blue-500 py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
                Start Conversation
            </button>
        </div>
    );
}
