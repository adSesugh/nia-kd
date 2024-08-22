import * as puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium'
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as QRCode from 'qrcode';
import { Event } from '@/graphql/__generated__/graphql';

const eventTitle = "KADAF 2.0";
const profilePicUrl = "https://i.seadn.io/gae/Ihufw_BbfNUhFBD-XF74FlY2JjpYeUkkTdhzJy_bjEdfz0qKlLMOkxlUKxyJR7ib5dgsji9XZAMuorSX20Fw12q5XZ2LJTj2efcS?auto=format&dpr=1&w=1000";

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

async function generateQRCode(text: string): Promise<string> {
    return await QRCode.toDataURL(text, {
        width: 100,
    });
}

async function generateNameTagHtml(data: any) {
    const qrCodeDataUrl = await generateQRCode(data?.eventId);

    return `
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
                .container {
                    width: 5.125in;
                    height: 6.45in;
                    margin: 0 auto;
                    border: 1px solid #000;
                }
                .header, .footer {
                    padding: 10px;
                }
                .header div {
                    font-size: 12px;
                    font-weight: 400;
                }
                .header img {
                    width: 28%;
                }
                .content {
                    padding: 20px 0;
                    margin-top: -15px;
                }
                .title {
                    font-size: 40px;
                    font-weight: bold;
                }
                .theme {
                    font-size: 18px;
                    margin: 10px 5px;
                    color: #fff;
                    font-weight: 200;
                    padding-left: 30px;
                    padding-right: 30px;
                }
                .theme-title {
                    font-size: 13px;
                    margin: 10px 5px;
                    color: #f3efef;
                    text-transform: uppercase;
                }
                .details {
                    font-size: 10px;
                    margin-bottom: 10px;
                    color: #f3efef;
                }
                .qr-code, .profile-pic {
                    display: inline-block;
                    vertical-align: top;
                    margin: 14px 5px;
                }
                .qr-code {
                    width: 100px;
                    height: 100px;
                }
                .profile-pic img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
                .code-pic-section {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                }
                .speaker {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 16px;
                    font-weight: bold;
                    margin-top: -25px;
                }
                .sponsors img {
                    width: 80px;
                    margin: 5px;
                }
                .speaker-title {
                    color: #fff;
                    align-self: center;
                    margin-top: -10px !important;
                }
                .speaker-title span {
                    align-self: center;
                    background-color: #1d0b6d;
                    padding-left: 15px;
                    padding-right: 15px;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    border-radius: 5px;
                }
                .theme-wrapper {
                    background: linear-gradient(180deg, #1d0b6d 0%, #3c0b6d 100%);
                    padding-top: 5px;
                    padding-bottom: 5px;
                }
                .divider {
                    border: #333;
                    border-style: dashed;
                    border-spacing: 6px;
                    border-width: 0.2px;
                }
                .sponsor-header {
                    margin-top: 10px;
                    padding-left: 20px;
                    padding-right: 20px;
                }
                .sponsor-title {
                    margin-top: 10px;
                    margin-bottom: 10px;
                    font-size: 12px !important; 
                    font-weight: normal !important;
                    color: #171616;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://nia-kd.s3.amazonaws.com/logo.png" alt="NIA-Kd"/>
                    <div class="font-size:40px; !important">NIGERIAN INSTITUTE OF ARCHITECTS KADUNA STATE CHAPTER</div>
                </div>
                <div class="content">
                    <div class="title">${eventTitle}</div>
                    <div class="theme-wrapper">
                        <div class="theme-title">Theme</div>
                        <div class="theme">${data?.eventName}</div>
                        <div class="details">${data?.startDate} | ${data?.address}</div>
                    </div>
                    <div class="code-pic-section">
                        <div class="qr-code">
                            <img src="${qrCodeDataUrl}" alt="QR Code">
                        </div>
                        <div class="profile-pic">
                            <img src="${data?.speakers?.[0].avatar || profilePicUrl}" alt="Profile Picture">
                        </div>
                    </div>
                    <div class="speaker">
                        <h4 class="">${data?.speakers?.[0]?.name}</h4>
                    </div>
                    <div class="speaker-title">
                        <span>SPEAKER</span>
                    </div>
                </div>
                <div class="sponsor-header">
                    <div class="divider"></div>
                    <div class="sponsor-title">Sponsors</div>
                </div>
                <div class="sponsors">
                    ${data?.sponsors?.map((sponsor: any, index: number)=> `<img src="${sponsor?.logo}" alt="Sponsor ${index+1}">`).join('')}
                </div>
            </div>
        </body>
        </html>
    `;
}

export async function sendEmail(to: string, subject: string, content: string, data: any) {
    console.log("Data sent => ", data)
    console.log("to =>", to)
    const nameTagHtml = await generateNameTagHtml(data);

    // Launch puppeteer and generate the PDF
    const browser = await puppeteer.launch({
        // args: chromium.args,
        // defaultViewport: chromium.defaultViewport,
        // executablePath: await chromium.executablePath()
    });

    const page = await browser.newPage();
    
    await page.setContent(nameTagHtml);
    const pdfPath = path.resolve(__dirname, 'name_tag.pdf');
    //await page.pdf({ path: pdfPath, format: 'A4' });
    await page.pdf({ 
        path: pdfPath, 
        width: '4.125in', 
        height: '6.45in',
        printBackground: true // Ensure the background colors are printed
    });
    await browser.close();

    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST!,
        port: parseInt(process.env.MAIL_PORT!),
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME!,
            pass: process.env.MAIL_PASSWORD!,
        },
    });

    const emailContent = replacePlaceholders(content, data);

    // Email options
    const mailOptions = {
        from: process.env.MAILER_EMAIL!,
        to: to, // Replace with recipient email
        subject: `Name Tag PDF - ${subject}`,
        html: emailContent,
        attachments: [
            {
                filename: 'name_tag.pdf',
                path: pdfPath,
            },
        ],
    };

    // Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        fs.unlinkSync(pdfPath);
        return info.response
    } catch (error) {
        console.error('Error sending email:', error);
    }
}