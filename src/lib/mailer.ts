import nodemailer from 'nodemailer'

function replacePlaceholders(template: string, replacements: { [key: string]: string }): string {
    return template.replace(/{{(\w+)}}/g, (placeholder, key) => {
        return replacements[key] || placeholder;
    });
}

// function replacePlaceholders(template: string, values: PlaceholderValues): string {
//     let result = template;
//     for (const [key, value] of Object.entries(values)) {
//         const placeholder = new RegExp(`{{${key}}}`, 'g');
//         result = result.replace(placeholder, value);
//     }
//     return result;
// }

export async function sendEmail(to: string, subject: string, content: string, member: any) {
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST!,
        port: parseInt(process.env.MAIL_PORT!),
        auth: {
            user: process.env.MAIL_USERNAME!,
            pass: process.env.MAIL_PASSWORD!,
        },
    });

    const emailContent = replacePlaceholders(content, member);

    let mailOptions = {
        from: process.env.MAILER_EMAIL!,
        to: to,
        subject: subject,
        text: emailContent
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info.response
    } catch (error) {
        console.error('Error sending email:', error);
    }
}