import { NextResponse } from 'next/server';

const my_token = "instagramwebhook";

export async function GET(request) {
    if (request.method === 'GET') {
        try {
            const url = new URL(request.url);
            let mode = url.searchParams.get("hub.mode");
            let challenge = url.searchParams.get("hub.challenge");
            let token = url.searchParams.get("hub.verify_token");

            if (mode === "subscribe" && token === my_token) {
                return new NextResponse(challenge, { status: 200, headers: { 'Content-Type': 'text/plain' } });
            } else {
                return NextResponse.json({ success: false }, { status: 403 });
            }
        } catch (error) {
            console.error("Error handling GET request:", error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}

export async function POST(request) {
    if (request.method === 'POST') {
        try {
            const data = await request.json();

            await fetch('https://social-chat-mu.vercel.app/api/webhooks/socialwebhookdata', {
                method: "POST",
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            return NextResponse.json({ success: true }, { status: 200 });

            if (data.object === 'instagram') {
                const entry = data.entry[0];
                const changes = entry.changes[0];
                const value = changes.value;

                if (value && value.message) {
                    const senderId = value.sender.id;
                    const recipientId = value.recipient.id;
                    const timestamp = value.timestamp;
                    const message = value.message;

                    const sendData = {
                        ChatFrom: senderId, // Instagram user ID of the sender
                        Fullname: "", // Instagram API does not provide the user's name directly in this payload
                        MobileNumber: "", // Instagram payload does not include phone numbers
                        Email: "", // Instagram payload does not include email addresses
                        messageList: [{
                            wamessageid: message.mid, // Message ID
                            CampaignTemplateId: '', // Empty as no campaign ID provided
                            generatedmessages: message.text, // Message text
                            FileUploaded: '', // No file uploaded in this payload
                            FileType: 'text', // Assuming text as file type for plain text messages
                            BtnURL: "", // No button URL in this payload
                            ChatFrom: '1', // Static or default value as per your needs
                            status: "sent", // Status of the message
                            templateType: "", // Empty as no template type provided
                            BtnPayload: false, // No button payload
                            BtnPhone: "", // No button phone number
                            timestamp: new Date(timestamp * 1000).toISOString(), // Convert timestamp to ISO string
                        }]
                    };

                    await fetch('https://social-chat-mu.vercel.app/api/messageList/instagram', {
                        method: "POST",
                        body: JSON.stringify(sendData),
                        headers: { 'Content-Type': 'application/json' }
                    });

                    return NextResponse.json({ success: true }, { status: 200 });
                }
            }

            return NextResponse.json({ error: "Bad Request" }, { status: 400 });
        } catch (error) {
            console.error("Error handling POST request:", error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}