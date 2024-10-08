import { NextResponse } from 'next/server';

const my_token = "messengerwebhook";

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

            if (data.object === 'messenger') {
                const entry = data.entry[0];
                const messaging = entry.messaging[0];
                const chatId = entry.id;
                const value = messaging.message;

                if (value) {
                    const senderId = messaging.sender.id;
                    const recipientId = messaging.recipient.id;
                    const message = value.text;
                    const MessengerMessageId = value.mid;

                    const sendData = {
                        ChatFrom: chatId, // Messenger user ID of the sender
                        Fullname: "", // Messenger API does not provide the user's name directly in this payload
                        SentFromMessenger: true, // Indicates the source is Messenger
                        MessengerMessageId: MessengerMessageId, // Messenger message ID
                        SenderId: senderId, // Sender's Messenger user ID
                        RecipientId: recipientId, // Recipient's Messenger user ID
                        Message: message
                    };

                    await fetch('https://social-chat-mu.vercel.app/api/messageList/messenger', {
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
