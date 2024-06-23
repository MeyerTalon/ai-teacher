// ./components/Controls.js
"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { UserTranscriptMessageSchema } from "@humeai/voice";

export default function Controls() {
    const voice = useVoice();
    const connect = voice.connect;
    const disconnect = voice.disconnect;
    const readyState = voice.readyState;
    let messages = voice.messages;

    if (readyState === VoiceReadyState.OPEN) {
        return (
            <button
                onClick={() => {
                    disconnect();
                    voice.clearMessages();
                    console.log(voice.messages);
                }}
            >
                End Question
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
            }
        }
        >
            Start Question
        </button>
    );
}