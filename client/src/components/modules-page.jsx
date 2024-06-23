"use client";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export function ModulesPage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    const fetchUserData = async () => {

      if (!userName) {
        router.push("/"); // Redirect to welcome page if no userName in local storage
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/api/users/${userName}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Error fetching user data:", response.statusText);
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/");
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userName"); // Clear the user's name from local storage
    router.push("/"); // Redirect to the welcome page
  };

  const navigateToAdditionPage = () => {
    router.push('/additionlesson');
  };

  const navigateToSubtractionPage = () => {
    router.push('/subtractionlesson');
  };

  const navigateToMultiplicationPage = () => {
    router.push('/multippage');
  };

  const navigateToDivisionPage = () => {
    router.push('/divlesson');
  };

  const navigateToChatUIPage = (prompt) => {
    const query = new URLSearchParams({ prompt }).toString();

    router.push(`/chatuipage?${query}`);
  };

  if (!userData) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  const { points, levels } = userData;
  return (
      <section className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col items-center justify-center">
        <div className="container px-4 md:px-6">
          <Button variant="outline" className="animate-fade-in-delay" onClick={handleLogout}>
            Log Out
          </Button>
          <div className="flex justify-center mb-4">
            <Image src="/bear-logo.png" alt="Bear Logo" width={150} height={150}/>
          </div>
          <h2 className="text-4xl font-bold text-white text-center mb-2 animate-fade-in">Explore Math Subjects</h2>
          <p className="text-lg text-white text-center mb-8 animate-fade-in-delay">
            Hey {userName}, use our interactive lessons to become a master the fundamentals of mathematics!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-black">
            <div
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center animate-fade-in-up glow">
              <div className="bg-[#FEF2F2] rounded-full p-4 mb-4">
                <PlusIcon className="w-10 h-10 text-[#EF4444]"/>
              </div>
              <h3 className="text-xl font-bold mb-2">Addition</h3>
              <p className="text-muted-foreground text-sm">Learn to add numbers and build a solid foundation.</p>
              <div className="w-full bg-gray-200 rounded-full mt-4">
                <div
                    className="bg-[#EF4444] text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                    style={{width: `${(points.addition / 100) * 100}%`}}
                >
                  {points.addition}%
                </div>
              </div>
              <p className="text-sm font-medium mt-2">{points.addition} Points</p>
              <Button
                  onClick={navigateToAdditionPage}
                  className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-[#EF4444] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#DC2626] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Start Learning
              </Button>
            </div>
            <div
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center animate-fade-in-up glow delay-100">
              <div className="bg-[#ECFDF5] rounded-full p-4 mb-4">
                <MinusIcon className="w-10 h-10 text-[#10B981]"/>
              </div>
              <h3 className="text-xl font-bold mb-2">Subtraction</h3>
              <p className="text-muted-foreground text-sm">Explore the art of taking away and finding differences.</p>
              <div className="w-full bg-gray-200 rounded-full mt-4">
                <div
                    className="bg-[#10B981] text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                    style={{width: `${(points.subtraction / 100) * 100}%`}}
                >
                  {points.subtraction}%
                </div>
              </div>
              <p className="text-sm font-medium mt-2">{points.subtraction} Points</p>
              <Button
                  onClick={navigateToSubtractionPage}
                  className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-[#11B981] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#DC2626] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Start Learning
              </Button>
            </div>
            <div
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center animate-fade-in-up glow delay-200 ">
              <div className="bg-[#F0FEFF] rounded-full p-4 mb-4">
                <XIcon className="w-10 h-10 text-[#06B6D4]"/>
              </div>
              <h3 className="text-xl font-bold mb-2">Multiplication</h3>
              <p className="text-muted-foreground text-sm">Discover the power of repeated addition and arrays.</p>
              <div className="w-full bg-gray-200 rounded-full mt-4">
                <div
                    className="bg-[#06B6D4] text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                    style={{width: `${(points.multiplication / 100) * 100}%`}}
                >
                  {points.multiplication}%
                </div>
              </div>
              <p className="text-sm font-medium mt-2">{points.multiplication} Points</p>
              <Button
                  onClick={navigateToMultiplicationPage}
                  className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-[#06B6D4] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#0891B2] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Start Learning
              </Button>
            </div>
            <div
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center animate-fade-in-up glow delay-300 ">
              <div className="bg-[#FEF9C3] rounded-full p-4 mb-4">
                <DivideIcon className="w-10 h-10 text-[#F59E0B]"/>
              </div>
              <h3 className="text-xl font-bold mb-2">Division</h3>
              <p className="text-muted-foreground text-sm">Explore the concept of equal sharing and partitioning.</p>
              <div className="w-full bg-gray-200 rounded-full mt-4">
                <div
                    className="bg-[#F59E0B] text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                    style={{width: `${(points.division / 100) * 100}%`}}
                >
                  {points.division}%
                </div>
              </div>
              <p className="text-sm font-medium mt-2">{points.division} Points</p>
              <Button
                  onClick={navigateToDivisionPage}
                  className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-[#F59E0B] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#D97706] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </section>
  );
}


function DivideIcon(props) {
  return (
      (<svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
        <circle cx="12" cy="6" r="1"/>
        <line x1="5" x2="19" y1="12" y2="12"/>
        <circle cx="12" cy="18" r="1"/>
      </svg>)
  );
}

function MinusIcon(props) {
  return (
      (<svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
        <path d="M5 12h14"/>
      </svg>)
  );
}

function PlusIcon(props) {
  return (
      (<svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
        <path d="M5 12h14"/>
        <path d="M12 5v14"/>
      </svg>)
  );
}

function SquareDivideIcon(props) {
  return (
      (<svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
        <line x1="8" x2="16" y1="12" y2="12"/>
        <line x1="12" x2="12" y1="16" y2="16"/>
        <line x1="12" x2="12" y1="8" y2="8"/>
      </svg>)
  );
}
