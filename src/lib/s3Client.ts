import {
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

export const s3FileUpload = async (key: string, content: string, buffer: any) => {
    const command = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
        Key: key,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
    });

    const { $metadata: res } = await s3Client.send(command);

    return res

} 

export const s3FileUploadPdf = async (key: string, buffer: any) => {
    const command = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME as string,
        Key: key,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'application/pdf'
    });

    const { $metadata: res } = await s3Client.send(command);

    return res

} 

export default s3Client