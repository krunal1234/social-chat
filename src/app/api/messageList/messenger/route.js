import { NextResponse } from "next/server";
import MessengerMessageList from "../../../../../utils/supabase/backend/messageList/messenger/messageList";

export async function GET(request) {
    if (request.method === 'GET') {
        try {
            const data = await MessengerMessageList.get();
            return NextResponse.json({ data }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: "Failed to get Messenger messages: " + error.message }, { status: 403 });
        }
    } else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}

export async function POST(request) {
    if (request.method === 'POST') {
        try {
            const data = await request.json();
            const { ChatFrom, Fullname, SentFromMessenger, InstaMessageId, SenderId, RecipientId, Message } = data;

            const existingMessage = await MessengerMessageList.getByMessengerMessageList(SenderId, RecipientId);

            let result;
            if (!existingMessage) {
                result = await MessengerMessageList.create({
                    user_id: existingMessage[0].user_id, // Assuming `user_id` is the primary key or identifier in your table
                    ChatFrom: ChatFrom,
                    Fullname: Fullname || ChatFrom,
                    SentFromMessenger: SentFromMessenger,
                    InstaMessageId: InstaMessageId,
                    SenderId: SenderId,
                    RecipientId: RecipientId,
                    Message: Message
                });
            } else {
                result = await MessengerMessageList.create({
                    ChatFrom: ChatFrom,
                    Fullname: Fullname || ChatFrom,
                    SentFromMessenger: SentFromMessenger,
                    InstaMessageId: InstaMessageId,
                    SenderId: SenderId,
                    RecipientId: RecipientId,
                    Message: Message
                });
            }

            return NextResponse.json(result, { status: 200 });
        } catch (error) {
            console.error("Error handling POST request:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}

export async function UPDATE(request) {
    if (request.method === 'PATCH') { // Assuming partial updates
        try {
            // Implement update logic if needed
            return NextResponse.json({ success: true }, { status: 200 });
        } catch (error) {
            console.error("Error handling UPDATE request:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}
