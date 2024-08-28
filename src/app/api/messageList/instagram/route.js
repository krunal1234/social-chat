import { NextResponse } from "next/server";
import InstagramMessageList from "../../../../../utils/supabase/backend/messageList/instagram/messageList";

export async function GET(request) {
    if (request.method === 'GET') {
        try {
            const data = await InstagramMessageList.get();
            return NextResponse.json({ data }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: "Failed to get Instagram messages: " + error.message }, { status: 403 });
        }
    } else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}

export async function POST(request) {
    if (request.method === 'POST') {
        try {
            const data = await request.json();
            const { ChatFrom, Fullname, SentFromInstagram, InstaMessageId, SenderId, RecipientId, Message, chatId } = data;

            const existingMessage = await InstagramMessageList.getByInstagramMessageList(SenderId, RecipientId);

            let result;
            if (!existingMessage) {
                result = await InstagramMessageList.create({
                    user_id: existingMessage[0].user_id, // Assuming `user_id` is the primary key or identifier in your table
                    ChatFrom: chatId,
                    Fullname: Fullname || ChatFrom,
                    SentFromInstagram: SentFromInstagram,
                    InstaMessageId: InstaMessageId,
                    SenderId: SenderId,
                    RecipientId: RecipientId,
                    Message: Message
                });
            } else {
                result = await InstagramMessageList.create({
                    ChatFrom: chatId,
                    Fullname: Fullname || ChatFrom,
                    SentFromInstagram: SentFromInstagram,
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
