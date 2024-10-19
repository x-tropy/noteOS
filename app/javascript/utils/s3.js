import {
    S3Client,
    ListBucketsCommand,
    ListObjectsV2Command,
    GetObjectCommand,
} from "@aws-sdk/client-s3";

const S3 = new S3Client({
    region: "auto",
    endpoint: `https://fly.storage.tigris.dev`,
});

export default S3
