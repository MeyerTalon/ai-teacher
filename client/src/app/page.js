// ./app/page.js
import ClientComponent from "@/components/ClientComponent";
import { fetchAccessToken } from "@humeai/voice";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" })

export default async function Page() {
  var accessToken = await fetchAccessToken({
    apiKey: String(process.env.HUME_API_KEY),
    secretKey: String(process.env.HUME_SECRET_KEY),
  });

  if (!accessToken) {
    throw new Error();
  }

  return <ClientComponent accessToken={accessToken} />;
}