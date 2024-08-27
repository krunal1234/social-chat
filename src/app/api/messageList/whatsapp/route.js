import { NextResponse } from "next/server";
import InstagramMessageList from "../../../../../utils/supabase/backend/messageList/instagram/messageList";
import auth from "../../../../../utils/supabase/auth";

// GET handler for fetching Instagram messages
export async function GET(request) {
    if (request.method === 'GET') {
        try {
            const data = await InstagramMessageList.get();
            return NextResponse.json({ data }, { status: 200 });
        } catch (error) {
            console.error("Failed to get Instagram messages:", error);
            return NextResponse.json({ error: "Failed to get Instagram messages: " + error.message }, { status: 403 });
        }
    } else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}

// POST handler for storing Instagram messages
export async function POST(request) {
    if (request.method === 'POST') {
        try {
            const data = await request.json();
            const { ChatFrom, Fullname, SetFromInstagram, InstaMessageId, SenderId, RecipientId, Message, timestamp } = data;

            // Check if the message already exists
            const existingMessage = await InstagramMessageList.getByInstagramMessageId(InstaMessageId);

            let result;
            if (existingMessage) {
                // Update the existing message if necessary
                result = await InstagramMessageList.update({
                    InstaMessageId: InstaMessageId,
                    Message: Message,
                    timestamp: timestamp,
                    // Additional fields if needed
                });
            } else {
                // Create a new record if it does not exist
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

// UPDATE handler (if needed)
export async function UPDATE(request) {
    if (request.method === 'PATCH') { // PATCH is typically used for partial updates
        try {
            const data = await request.json();
            // Implement the update logic
            return NextResponse.json({ success: true }, { status: 200 });
        } catch (error) {
            console.error("Error handling UPDATE request:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}
