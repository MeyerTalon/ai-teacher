import Head from 'next/head';
import {WelcomePage} from "../components/welcome-page";


export default function Home() {

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
