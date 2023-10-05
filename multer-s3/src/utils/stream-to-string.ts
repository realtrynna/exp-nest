import { Readable } from "stream";

export const streamToString = async (stream: Readable) => {
    return await new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];

        stream.on("data", (chunk) => {
            chunks.push(chunk)
        });
        stream.on("error", (e) => {
            reject(e)
        });
        stream.on("end", () => {
            console.log("ended");
            resolve(Buffer.concat(chunks).toString("utf-8"));
        });

        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", (e) => reject(e));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
    })
}