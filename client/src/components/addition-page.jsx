// addition-page.jsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

export default function AdditionPage() {
    const router = useRouter();
    const [score, setScore] = useState(0);
    const [currentProblem, setCurrentProblem] = useState(generateProblem());
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [feedback, setFeedback] = useState("");

    const navigateToChatUIPage = (prompt, module) => {
        const query = new URLSearchParams({ prompt, module }).toString();
        router.push(`/chatuipage?${query}`);
    };
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateProblem() {
        let a = getRandomInt(1, 5);
        let b = getRandomInt(1, Math.min(9 - a, 5));
        return { a, b };
    }

    function generateNewProblem() {
        setCurrentProblem(generateProblem());
        setFeedback("");
    }

    function handleAnswer(answer) {
        const result = currentProblem.a + currentProblem.b;
        if (answer === result) {
            setScore(score + 1);
            setQuestionsAnswered(questionsAnswered + 1);
            if (questionsAnswered + 1 < 5) {
                generateNewProblem();
            }
        } else {
            setFeedback(`Incorrect! The correct answer is ${result}. Try again!`);
        }
    }

    function nextPage() {
        router.push("/next-page"); // Replace '/next-page' with your next page route
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-300 via-pink-300 to-purple-300 text-white p-4">
            <div className="flex items-center gap-4 mb-8">
                <SmileIcon className="w-12 h-12"/>
                <h1 className="text-3xl font-bold">Let's Add!</h1>
            </div>
            <div className="flex flex-col items-center gap-4 p-4 rounded-xl bg-white shadow-lg w-full max-w-md">
                <div className="flex gap-4 items-center">
                    <div className="grid grid-cols-[repeat(currentProblem.a,1fr)] gap-2">
                        {Array.from({ length: currentProblem.a }).map((_, i) => (
                            <AppleIcon key={i} className="w-8 h-8 text-pink-600" />
                        ))}
                    </div>
                    <PlusIcon className="w-8 h-8 text-purple-600" />
                    <div className="grid grid-cols-[repeat(currentProblem.b,1fr)] gap-2">
                        {Array.from({ length: currentProblem.b }).map((_, i) => (
                            <AppleIcon key={i} className="w-8 h-8 text-pink-600" />
                        ))}
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <Button
                            key={i}
                            variant="ghost"
                            size="lg"
                            onClick={() => handleAnswer(i)}
                            className="w-12 h-12 rounded-full bg-pink-200 text-pink-800 font-bold"
                        >
                            {i}
                        </Button>
                    ))}
                </div>
            </div>
            {feedback && <p className="mt-4 text-white-500 text-center">{feedback}</p>}
            <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center gap-2">
                    <StarIcon className="w-6 h-6 text-yellow-400" />
                    <span className="text-2xl font-bold">{score}</span>
                </div>
                <Progress value={(questionsAnswered / 5) * 100} className="w-full max-w-sm h-6 rounded-full" />
            </div>
            {questionsAnswered >= 5 && (
                <Button
                    onClick={() => navigateToChatUIPage('Give me a unique and fun addition question. It could be a word problem or a regular number problem.', 'addition')}
                    className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-purple-700 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#DC2626] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    Talk with a Teacher
                </Button>

                //<Button onClick={nextPage} className="mt-8 bg-purple-700 text-white px-4 py-2 rounded">
                    //Move to Next Page
                //</Button>
            )}
        </div>
    );
}

function AppleIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"
            />
            <path d="M10 2c1 .5 2 2 2 5" />
        </svg>
    );
}

function PlusIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}

function SmileIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
    );
}

function StarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}
