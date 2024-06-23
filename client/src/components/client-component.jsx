// ./components/client-component.js
"use client";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./messages";
import Controls from "./controls";

export default function ClientComponent(props) {
    const prompt = props.prompt;
    const module = props.module;
    return (
        <div className="w-full p-4">
            <VoiceProvider
                auth={{ type: "apiKey", value: "e5nXEAY14PvAy4lxw7GUGsDGxpdJzRM1M3YiOrwNx7E6BTVr" }}
                configId={"b3ba0fa3-29cc-4b41-9b8b-0798ccf90f44"}
            >
                <Messages prompt={{ prompt }} module = {{ module }} />
                <Controls />
            </VoiceProvider>
        </div>
    );
}

