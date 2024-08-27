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
            const { ChatFrom, Fullname, SetFromInstagram, InstaMessageId, SenderId, RecipientId, Message, timestamp } = data;

            const existingMessage = await InstagramMessageList.getByInstagramMessageId(InstaMessageId);

            let result;
            if (existingMessage) {
                // Update logic can be added here if needed
                result = { success: true, message: "Message already exists." };
            } else {
                result = await InstagramMessageList.create({
                    ChatFrom: ChatFrom,
                    Fullname: Fullname || ChatFrom,
                    SetFromInstagram: SetFromInstagram,
                    InstaMessageId: InstaMessageId,
                    SenderId: SenderId,
                    RecipientId: RecipientId,
                    Message: Message,
                    timestamp: timestamp
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
