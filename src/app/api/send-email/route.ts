import { NextRequest, NextResponse } from 'next/server';
import { InvokeCommand, InvokeCommandOutput, LambdaClient, LogType, } from '@aws-sdk/client-lambda'


interface EmailRequest {
    to: string;
    subject: string;
    content: string;
    data: any
}


export async function POST(request: NextRequest) {
    try {
        const body: EmailRequest = await request.json();

        console.log(body)

        const client = new LambdaClient({
            region: `${process.env.AWS_REGION!}`,
            credentials: {
                accessKeyId: `${process.env.AWS_ACCESS_KEY_ID!}`,
                secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY!}`
            }
        });
    
        const command = new InvokeCommand({
          FunctionName: 'nia-kd-mailer',
          Payload: JSON.stringify(body),
          LogType: LogType.Tail,
        });

        const response: InvokeCommandOutput = await client.send(command);
        console.log("Response:", response);
        
        return new NextResponse(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });

    } catch (error) {
        console.error('Error sending email:', error);
        return new NextResponse(JSON.stringify({ error: 'Error sending email' }), { status: 500 });
    }
}