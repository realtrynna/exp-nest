import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import forge from "node-forge";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rsa = forge.pki.rsa;

rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, data) {
    const privateKeyPem = forge.pki.privateKeyToPem(data.privateKey);
    const publicKeyPem = forge.pki.publicKeyToPem(data.publicKey);

    const rootPath = path.join(__dirname);

    fs.writeFile(path.join(__dirname, "./private.pem"), "privateKeyPem", err => {
    })import * as fs from "fs";
    import * as path from "path";
    import { fileURLToPath } from "url";
    import jwt from "jsonwebtoken";
    import forge from "node-forge";

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const rsa = forge.pki.rsa;

    rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, data) {
        const privateKeyPem = forge.pki.privateKeyToPem(data.privateKey);
        const publicKeyPem = forge.pki.publicKeyToPem(data.publicKey);

        const rootPath = path.join(__dirname);

        fs.writeFile(path.join(__dirname, "./private.pem"), "privateKeyPem", err => {
        })
        // fs.writeFile("public.pem", publicKeyPem);

        // console.log(data);
    });

    const privateKey = {
        key: fs.readFileSync(path.join(__dirname, "./private.pem")),
    };
    const publicKey = fs.readFileSync(path.join(__dirname, "./public.pem"));
    const payload = {
        id: 1,
        email: "reantrynna@gmail.com",
    };
    const options = {
        subject: "비대칭 알고리즘",
        algorithm: "RS256",
    }
    /**
     * 생성
     */
    const token = jwt.sign(payload, privateKey, options);
    /**
     * 검증
     */
    const decoded = jwt.verify(token, publicKey);

    // console.log(token)

    if (fs.exists) {
        console.log("존재")
    } else {
        console.log("미존재")
    }

    // fs.writeFile("public.pem", publicKeyPem);

    // console.log(data);
});

const privateKey = {
    key: fs.readFileSync(path.join(__dirname, "./private.pem")),
};
const publicKey = fs.readFileSync(path.join(__dirname, "./public.pem"));
const payload = {
    id: 1,
    email: "reantrynna@gmail.com",
};
const options = {
    subject: "비대칭 알고리즘",
    algorithm: "RS256",
}
/**
 * 생성
 */
const token = jwt.sign(payload, privateKey, options);
/**
 * 검증
 */
const decoded = jwt.verify(token, publicKey);

// console.log(token)

if (fs.exists) {
    console.log("존재")
} else {
    console.log("미존재")
}
