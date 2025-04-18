import nodemailer from 'nodemailer';

export async function sendEmailWithPDF(userEmail: string, pdfBuffer: Buffer) {
  const smtpUser = 'support@mythara.org';
  const smtpPass = 'Nz5W6dym5Yg5';

  const transporter = nodemailer.createTransport({
    host: 'smtppro.zoho.in',
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    logger: true,
    debug: true,
  });

  const mailOptions = {
    from: smtpUser,
    to: userEmail,
    subject: 'Your Personalized Itinerary',
    text: 'Please find attached your personalized itinerary.',
    attachments: [
      {
        filename: `India itinerary-${Date.now()}.pdf`,

        content: pdfBuffer,
        encoding: 'base64',
      },
    ],
  };

  try {
    console.log('📨 Sending email to:', userEmail);
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (error: any) {
    console.error('❌ Error sending email:', error.message);
    if (error.response) console.error('🔎 SMTP response:', error.response);
  }
}
