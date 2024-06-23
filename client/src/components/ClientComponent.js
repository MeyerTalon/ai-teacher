// ./components/ClientComponent.js
"use client";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Controls";
import Controls from "./Messages";

export default function ClientComponent(props) {
    return (
        <VoiceProvider
            auth={{ type: "accessToken", value: props.accessToken }}
            configId={ "b3ba0fa3-29cc-4b41-9b8b-0798ccf90f44" }
        >
            <Messages />
            <Controls />
        </VoiceProvider>
    );
}

/*
1. User clicks "Start Question" button.
2. Hume gives a question based on the passed system prompt.
3. User answers the question.
4. Hume gives feedback on the user's answer.
5. The question session is ended.
6. Start question button re-appears.
 */
