"use client";
import Head from 'next/head';
import {WelcomePage} from "../components/welcome-page";
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
  return (
      <div>
        <Head>
          <title>Home Page</title>
        </Head>
        <main>
          <WelcomePage/>
        </main>
      </div>
  );
}
