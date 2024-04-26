import { S3 } from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const s3 = new S3({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const data = await req.formData()
    const uniqId = data.get('regId')?.toString().replace('\/,\-', '')

    const file: File | null = data.get('photoURL') as unknown as File
    if (!file) {
        return NextResponse.json({ message: "File not found!", success: false }, { status: 400 })
    }

    const params = {
        Bucket: `${process.env.AWS_BUCKET_NAME}`,
        Key: `${data.get('folderName')}/${uniqId}`,
        Body: file,
        ACL: 'public-read',
        ContentType: file.type
    };


    try {
        const { Location } = await s3.upload(params).promise();
        const imageUrl = Location;

        NextResponse.json({ imageUrl, success: true }, { status: 200 });
    } catch (error) {
        console.error('Error uploading image to S3:', error);
        NextResponse.json({ error: 'Error uploading image to S3' }, { status: 500 });
    }
}