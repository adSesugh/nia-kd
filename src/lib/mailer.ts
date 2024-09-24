import * as nodemailer from 'nodemailer';

const content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Name Tag</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin: 0;
                    padding: 0;
                }
            </style>
        </head>
        <body>
            <h5>Hi {{name}}</h5>
            <h6>Your NIAKD Registration ID: {{regId}}</h6>
            <p>Thank you for Signing up! to the NIAKD website, We're excited to have you as part of our growing community. As a member, you now have access to exclusive features and resources designed to enhance your experience.</p>
            <p>Here’s what you can do:</p>
            <ul>
                <li>Explore your personalized dashboard.</li>
                <li>Pay membership dues.</li>
                <li>Seamlessly find and register for events.</li>
                <li>Access our library of resources to enhance your experience.</li>
                <li>Track and manage your transaction history etc</li>
            </ul>
            <p>If you need any assistance, feel free to reach out to our support team.</p>
            <p>Welcome aboard!</p>
            <p>
                Best regards,<br/>
                The NIAKD Team
            </p>
        </body>
        </html>
    `

function replacePlaceholders(template: string, replacements: { [x: string]: any; }) {
    return template.replace(/{{(\w+)}}/g, (placeholder, key) => {
        return replacements[key] || placeholder;
    });
}

export async function sendEmail(to: string, data: any) {
    const emailContent = replacePlaceholders(content, data);

    const stringToBoolean = (value: string): boolean => {
        return value.toLowerCase() === "true";
      };

    let transporter = nodemailer.createTransport({
        host: process.env.NEXT_PUBLIC_MAIL_HOST!,
        port: Number(process.env.NEXT_PUBLIC_MAIL_PORT!),
        secure: stringToBoolean(process.env.NEXT_PUBLIC_MAIL_SECURE!),
        auth: {
            user: process.env.NEXT_PUBLIC_MAIL_USERNAME!,
            pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD!,
        },
    });

    // Email options
    const mailOptions = {
        from: process.env.NEXT_PUBLIC_MAILER_EMAIL!,
        to: to,
        subject: `Welcome to the NIAKD`,
        html: emailContent,
    };

    // Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info.response
    } catch (error) {
        console.error('Error sending email:', error);
    }
}