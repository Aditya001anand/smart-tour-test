import twilio from 'twilio';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { lat, lon, contactNumber } = await req.json();
    
    // Ensure variables exist
    if (!lat || !lon || !contactNumber) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // Validate environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !twilioPhone) {
      console.error("Twilio credentials missing in .env.local (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER)");
      return NextResponse.json({ error: 'Twilio Configuration Error' }, { status: 500 });
    }

    // Initialize Twilio
    const client = twilio(accountSid, authToken);
    
    const mapsLink = `https://www.google.com/maps?q=${lat},${lon}`;
    const messageBody = `EMERGENCY ALERT from SmartTour: Aditya has triggered an SOS. Last known location: ${mapsLink}`;

    const message = await client.messages.create({
      body: messageBody,
      from: twilioPhone,
      to: contactNumber
    });

    return NextResponse.json({ success: true, messageId: message.sid });
  } catch (error) {
    console.error('SMS Error:', error);
    return NextResponse.json({ error: 'Failed to send SMS' }, { status: 500 });
  }
}
