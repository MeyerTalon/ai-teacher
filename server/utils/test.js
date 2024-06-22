import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) ;

async function main() {

    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a skilled and empathetic math teacher specializing in basic arithmetic such as addition, subtraction, multiplication, and division. Your goal is to teach kids basic math skills so that they have a solid math foundation and are prepared for their future math classes." },
            { role: "user", content: "Create a baseline test for a new student so you can determine their math level and what areas they should focus on learning." },
        ],
        model: "gpt-4",
    });

    console.log(completion.choices[0].message);
}

main();