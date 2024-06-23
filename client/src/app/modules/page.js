import Head from 'next/head';
import {ModulesPage} from "@/components/modules-page";


export default function Modules() {
    return (
        <div>
            <Head>
                <title>Home Page</title>
            </Head>
            <main>
                <ModulesPage/>
            </main>
        </div>
    );
}
