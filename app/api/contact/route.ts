import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, businessType, to, subject } = await req.json();

    // Validate required fields
    if (!name || !email || !message || !businessType) {
      return NextResponse.json(
        { error: "Alle Felder sind erforderlich" },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
Neue Anfrage von Hanz Chatbot:

Name: ${name}
E-Mail: ${email}
Geschäftsbereich: ${businessType}

Nachricht:
${message}

---
Diese Nachricht wurde über das Hanz Chatbot Kontaktformular gesendet.
    `.trim();

    // For now, we'll just log the email content
    // In production, you would integrate with an email service like SendGrid, Resend, or Nodemailer
    console.log('=== NEW CONTACT FORM SUBMISSION ===');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Content:', emailContent);
    console.log('=====================================');

    // TODO: Replace this with actual email sending logic
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@hanz.com',
    //   to: to,
    //   subject: subject,
    //   text: emailContent,
    // });

    return NextResponse.json({ 
      success: true, 
      message: "Nachricht erfolgreich gesendet" 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: "Fehler beim Senden der Nachricht" },
      { status: 500 }
    );
  }
}
