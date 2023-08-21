import { Job, DoneCallback } from 'bull';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const sdk = new S3Client({
    region: "",
    credentials: {
        accessKeyId: "",
        secretAccessKey: "",
    }
});

export default async function (job: Job, done: DoneCallback) {
    const { data } = job.data.task;

    const command = new GetObjectCommand({
        Bucket: "dev-know",
        Key: data,
    });

    const { Body }: any = await sdk.send(command);

    done(null, Body);
}
