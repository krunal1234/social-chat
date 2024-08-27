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

            if (data.object === 'instagram') {
                const entry = data.entry[0];
                const messaging = entry.messaging[0]; // Changed from `changes` to `messaging`
                const value = messaging.message;

                if (value) {
                    const senderId = messaging.sender.id;
                    const recipientId = messaging.recipient.id;
                    const timestamp = messaging.timestamp;
                    const message = value.text;
                    const instaMessageId = value.mid;

                    const sendData = {
                        ChatFrom: senderId, // Instagram user ID of the sender
                        Fullname: "", // Instagram API does not provide the user's name directly in this payload
                        SetFromInstagram: true, // Indicates the source is Instagram
                        InstaMessageId: instaMessageId, // Instagram message ID
                        SenderId: senderId, // Sender's Instagram user ID
                        RecipientId: recipientId, // Recipient's Instagram user ID
                        Message: message, // Message text
                        timestamp: new Date(timestamp).toISOString() // Convert timestamp to ISO string
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
