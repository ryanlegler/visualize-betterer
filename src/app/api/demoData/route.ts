// import fs from "fs";
export const runtime = "edge";
import data from "@/betterer.results.json";

export async function GET() {
    try {
        return new Response(JSON.stringify(data), {
            status: 200,
        });
    } catch (e) {
        return new Response("Request cannot be processed!", {
            status: 400,
        });
    }
}
