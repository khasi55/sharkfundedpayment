import nodemailer from 'nodemailer';
import path from 'path';
import { generateServerInvoice } from './serverInvoiceGenerator';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

interface PaymentEmailProps {
    to: string;
    name: string;
    amount: string;
    orderId: string;
    utr: string;
    date: string;
}

export const sendPaymentSuccessEmail = async ({ to, name, amount, orderId, utr, date }: PaymentEmailProps) => {
    if (!to) {
        console.error('Email sending failed: No recipient email provided');
        return;
    }

    try {


        // Generate Invoice PDF
        // Generate Invoice PDF
        const invoiceBuffer = await generateServerInvoice({
            orderId,
            date,
            amount,
            name,
            email: to,
            utr
        });


        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Shark Funded" <no-reply@sharkfunded.com>',
            to: to,
            subject: `Payment Successful - Order #${orderId}`,
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmed - Shark Funded</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0f172a;
            margin: 0;
            padding: 20px;
            -webkit-font-smoothing: antialiased;
            color: #f8fafc;
        }
        table {
            border-collapse: collapse;
            width: 100%;
        }
        .container {
            max-width: 520px;
            margin: 0 auto;
            background-color: #1e293b;
            border-radius: 22px;
            overflow: hidden;
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
            border: 1px solid #334155;
        }
        .header-bg {
            background: linear-gradient(135deg, #1e293b 0, #0f172a 100%);
            border-bottom: 1px solid #334155;
        }
        .status-chip {
            background-color: rgba(16, 185, 129, 0.1);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.2);
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 600;
            display: inline-block;
        }
        .success-icon {
            width: 64px;
            height: 64px;
            background-color: rgba(16, 185, 129, 0.1);
            border: 2px solid rgba(16, 185, 129, 0.2);
            border-radius: 50%;
            color: #34d399;
            font-size: 30px;
            line-height: 64px;
            text-align: center;
            margin: 0 auto;
            display: block;
        }
        .payment-card {
            background-color: #0f172a;
            border: 1px solid #334155;
            border-radius: 16px;
            padding: 20px;
        }
        .amount {
            font-size: 26px;
            font-weight: 700;
            color: #34d399;
        }
        .label {
            font-size: 11px;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-weight: 600;
            margin-bottom: 4px;
            display: block;
        }
        .value {
            font-size: 14px;
            font-weight: 600;
            color: #f8fafc;
        }
        .btn-primary {
            background-color: #3b82f6;
            color: #ffffff;
            display: block;
            width: 100%;
            padding: 12px;
            text-align: center;
            text-decoration: none;
            border-radius: 999px;
            font-weight: 600;
            font-size: 14px;
        }
        .btn-secondary {
            background-color: #1e293b;
            color: #94a3b8;
            border: 1px solid #334155;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 500;
            display: inline-block;
            margin: 0 5px;
        }
        .footer-text {
            font-size: 11px;
            color: #64748b;
            text-align: center;
        }
    </style>
</head>
<body>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center">
                <!-- Main Container -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="container" width="520">
                    <!-- Top Bar -->
                    <tr>
                        <td class="header-bg" style="padding: 16px 24px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="left" valign="middle">
                                        <img src="cid:sharklogo" alt="Shark Funded" height="45" style="display: block; height: 45px; width: auto; border-radius: 0;">
                                    </td>
                                    <td align="right" valign="middle">
                                        <div class="status-chip">
                                            <span style="color: #34d399;">●</span> Payment confirmed
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 24px;">
                            <div class="success-icon">✓</div>
                            
                            <div style="text-align: center; margin-top: 16px; margin-bottom: 24px;">
                                <h1 style="font-size: 22px; font-weight: 700; color: #f8fafc; margin: 0 0 8px 0;">Payment successful</h1>
                                <p style="font-size: 14px; color: #94a3b8; margin: 0;">
                                    Thank you, <span style="font-weight: 600; color: #f8fafc;">${name}</span>. Your purchase is confirmed.
                                </p>
                                <div style="margin-top: 8px; font-size: 12px; color: #64748b;">
                                    <span style="font-weight: 500; color: #94a3b8;">${date}</span> · Order <span style="font-weight: 500; color: #94a3b8;">${orderId}</span>
                                </div>
                            </div>

                            <!-- Payment Card -->
                            <div class="payment-card">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                                    <tr>
                                        <td align="left" valign="top">
                                            <span class="label">Amount paid</span>
                                            <div class="amount">₹${amount}</div>
                                        </td>
                                        <td align="right" valign="top">
                                            <span style="font-size: 11px; background: #1e293b; border: 1px solid #334155; padding: 4px 8px; border-radius: 999px; color: #94a3b8;">Mode: UPI</span>
                                            <span style="font-size: 11px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); padding: 4px 8px; border-radius: 999px; color: #34d399; margin-left: 4px;">Success</span>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Details Grid (Table) -->
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td width="50%" style="padding-bottom: 16px; padding-right: 8px;" valign="top">
                                            <span class="label">Order ID</span>
                                            <div class="value">${orderId}</div>
                                        </td>
                                        <td width="50%" style="padding-bottom: 16px; padding-left: 8px;" valign="top">
                                            <span class="label">Transaction reference</span>
                                            <div class="value">${utr}</div>
                                            <div style="font-size: 11px; color: #64748b; margin-top: 2px;">Share with bank if needed.</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style="padding-top: 8px;">
                                            <span class="label">Billing date</span>
                                            <div class="value">${date}</div>
                                        </td>
                                    </tr>
                                </table>

                                <!-- Next Steps -->
                                <div style="margin-top: 20px; background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; padding: 12px;">
                                    <div style="font-size: 11px; font-weight: 600; color: #60a5fa; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 4px;">Next steps</div>
                                    <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #94a3b8;">
                                        <li style="margin-bottom: 4px;">We’ll email your challenge credentials shortly.</li>
                                        <li style="margin-bottom: 4px;">Use your order ID and UTR for any support queries.</li>
                                        <li>Track your status from the Shark Funded dashboard.</li>
                                    </ul>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <!-- Actions -->
                    <tr>
                        <td style="padding: 0 24px 24px;">
                            <a href="https://dashboard.sharkfunded.com/login" class="btn-primary">Go to dashboard</a>
                            <div style="text-align: center; margin-top: 16px;">
                                <a href="mailto:support@sharkfunded.com" class="btn-secondary">Contact support</a>
                                <a href="https://www.sharkfunded.com" class="btn-secondary">Back to website</a>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #1e293b; padding: 16px 24px; border-top: 1px solid #334155;">
                            <div class="footer-text" style="margin-bottom: 8px;">
                                <span style="display: inline-block; width: 8px; height: 8px; border: 1px solid #64748b; border-radius: 2px; margin-right: 4px;"></span>
                                Your payment was processed securely.
                            </div>
                            <div class="footer-text">
                                Need help? <a href="mailto:support@sharkfunded.com" style="color: #60a5fa; text-decoration: none;">support@sharkfunded.com</a>
                            </div>
                            <div class="footer-text" style="margin-top: 4px;">
                                © ${new Date().getFullYear()} Shark Funded. All rights reserved.
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            `,
            attachments: [
                {
                    filename: `Invoice-${orderId}.pdf`,
                    content: invoiceBuffer,
                    contentType: 'application/pdf'
                },
                {
                    filename: 'shark-logo-email.png',
                    path: path.join(process.cwd(), 'public', 'shark-logo-email.png'),
                    cid: 'sharklogo'
                }
            ]
        });

        return info;
    } catch (error) {
        console.error('Error sending payment success email:', error);
    }
};
