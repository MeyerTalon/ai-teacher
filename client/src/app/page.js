"use client";
import {WelcomePage} from "@/components/welcome-page";
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
  return (
      <div>
        <main>
          <WelcomePage/>
        </main>
      </div>
  );
}
