import * as fs from "fs";
import * as path from "path";

export async function readJsonFile() {
    const filePath = path.join(__dirname, "../../src/example.json");

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) reject();

            try {
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
    })
}