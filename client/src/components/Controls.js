// ./components/Controls.js
"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";

export default function Controls() {
    var voice = useVoice();
    var connect = voice.connect;
    var disconnect = voice.disconnect;
    var readyState = voice.readyState;

    if (readyState === VoiceReadyState.OPEN) {
        return (
            <button
                onClick={() => {
                    disconnect();
                }}
            >
                End Session
            </button>
        );
    }

    return (
        <button
            onClick={() => {
                connect()
                    .then(() => {
                        /* handle success */
                    })
                    .catch(() => {
                        /* handle error */
                    });
            }}
        >
            Start Session
        </button>
    );
}