"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

export default function DivPage() {
    const router = useRouter();
    const [score, setScore] = useState(0);
    const [currentProblem, setCurrentProblem] = useState(generateNewProblem());
    const [userAnswer, setUserAnswer] = useState("");
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [feedback, setFeedback] = useState("");

    const navigateToChatUIPage = (prompt) => {
        const query = new URLSearchParams({ prompt }).toString();
        router.push(`/chatuipage?${query}`);
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateNewProblem() {
        const divisor = getRandomInt(1, 4);
        const quotient = getRandomInt(1, 4);
        const dividend = divisor * quotient;
        return {
            dividend,
            divisor,
            quotient,
            fruit: "banana",
        };
    }

    function handleAnswer() {
        const answer = parseInt(userAnswer);
        const result = currentProblem.quotient;
        if (answer === result) {
            setScore(score + 1);
            setQuestionsAnswered(questionsAnswered + 1);
            if (questionsAnswered + 1 >= 5) {
                setFeedback(`Great job! You've completed the lesson.`);
            } else {
                setCurrentProblem(generateNewProblem());
                setUserAnswer("");
                setFeedback("");
            }
        } else {
            setFeedback(`Incorrect! The correct answer is ${result}. Try again!`);
        }
    }

    function nextPage() {
        router.push("/next-page"); // Replace '/next-page' with your next page route
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 text-white p-4">
            <div className="flex items-center gap-4 mb-8">
                <BananaIcon className="w-12 h-12"/>
                <h1 className="text-4xl font-bold">Let's Divide!</h1>
            </div>
            <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-white text-black shadow-lg w-full max-w-md">
                <div className="flex gap-4 items-center">
                    <div className="grid grid-cols-3 gap-2">
                        {Array.from({ length: currentProblem.dividend }).map((_, i) => (
                            <BananaIcon key={i} className="w-8 h-8 text-yellow-500" />
                        ))}
                    </div>
                    <SquareDivideIcon className="w-8 h-8 text-green-600" />
                    <div className="grid grid-cols-3 gap-2">
                        {Array.from({ length: currentProblem.divisor }).map((_, i) => (
                            <BananaIcon key={i} className="w-8 h-8 text-yellow-500" />
                        ))}
                    </div>
                </div>
                <Input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    className="w-full max-w-xs text-center text-2xl font-bold"
                />
                <Button onClick={handleAnswer} className="mt-4 bg-[#F59E0B] text-white px-4 py-2 rounded-md">
                    Submit Answer
                </Button>
                {feedback && <p className="mt-4 text-red-500 text-center">{feedback}</p>}
            </div>
            <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center gap-2">
                    <StarIcon className="w-6 h-6 text-yellow-400" />
                    <span className="text-2xl font-bold">{score}</span>
                </div>
                <Progress value={(questionsAnswered / 5) * 100} className="w-full max-w-sm h-6 rounded-full" />
            </div>
            {questionsAnswered >= 5 && (
                <Button
                    onClick={() => navigateToChatUIPage('Give me a unique and fun division question. It could be a word problem or a regular number problem.', 'division')}
                    className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-[#F59E0B] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#D97706] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    Talk with a Teacher
                </Button>
            )}
        </div>
    );
}

function BananaIcon(props) {
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
            <path d="M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5" />
            <path d="M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z" />
        </svg>
    );
}

function SquareDivideIcon(props) {
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
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="8" x2="16" y1="12" y2="12" />
            <line x1="12" x2="12" y1="16" y2="16" />
            <line x1="12" x2="12" y1="8" y2="8" />
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
