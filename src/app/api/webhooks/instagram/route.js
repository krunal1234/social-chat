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

            if (data.entry && data.entry[0].changes && data.entry[0].changes[0].value) {
                const value = data.entry[0].changes[0].value;
                const metadata = value.metadata;
                const contacts = value.contacts && value.contacts[0];
                const messages = value.messages;
                const statuses = value.statuses;

                let sendData;

                if (messages) {
                    const message = messages[0];
                    const messageType = message.type;
                    let messageValue;

                    if (messageType === 'text') {
                        messageValue = message.text.body;
                    } else if (messageType === 'button') {
                        messageValue = message.button.payload;
                    } else if (messageType === 'image') {
                        messageValue = message.image.caption;
                    }

                    sendData = {
                        ChatFrom: metadata.display_phone_number,
                        Fullname: contacts ? contacts.profile.name : '',
                        MobileNumber: contacts ? contacts.wa_id : '',
                        Email: "",
                        messageList: [{
                            wamessageid: message.id,
                            CampaignTemplateId: '',
                            generatedmessages: messageValue || '',
                            FileUploaded: messageType === 'image' ? message.image.id : '',
                            FileType: messageType || "",
                            BtnURL: "",
                            ChatFrom: '1',
                            status: "sent",
                            templateType: "",
                            BtnPayload: messageType === 'button' ? true : false,
                            BtnPhone: "",
                            timestamp: new Date().toISOString(),
                        }]
                    };

                    await fetch('https://social-chat-mu.vercel.app/api/messageList/whatsapp', {
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
