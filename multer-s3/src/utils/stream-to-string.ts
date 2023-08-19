import { Readable } from "stream";

export const streamToString = async (stream: Readable) => {
    return await new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];

<<<<<<< HEAD
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
=======
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", (e) => reject(e));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
>>>>>>> a00fe465bb59b21bee96979acca1e709c22c94da
    })
}