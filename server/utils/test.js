import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) ;

async function main() {

    // console.log(process.cwd())
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Give me dating tips!" },
        ],
        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0].message);
}

main();
