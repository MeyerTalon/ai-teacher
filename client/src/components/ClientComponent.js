// ./components/ClientComponent.js
"use client";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Controls";
import Controls from "./Messages";

export default function ClientComponent(props) {
    return (
        <VoiceProvider auth={{ type: "accessToken", value: props.accessToken }}>
            <Messages />
            <Controls />
        </VoiceProvider>
    );
}
