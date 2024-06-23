import Head from 'next/head';
import {Lessonpage} from "@/components/lessonpage";


export default function Lesson() {
    return (
        <div>
            <Head>
                <title>Home Page</title>
            </Head>
            <main>
                <Lessonpage/>
            </main>
        </div>
    );
}
