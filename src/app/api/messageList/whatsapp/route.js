import { NextResponse } from "next/server";
import WhatsappMessageList from "../../../../../utils/supabase/backend/messageList/whatsapp/messageList";
import auth from "../../../../../utils/supabase/auth";

export async function GET(request) {
    if (request.method === 'GET') {
        try {
            const data = await WhatsappMessageList.get();
    
            return NextResponse.json({data}, {
                status: 200
            });
        }catch (error) {
            return NextResponse.json("Failed to get account:" + error, {
                status: 403
            });
        }
    }
}
export async function POST(request) {
    if (request.method === 'POST') {
        try {   
            const data = await request.json(); // Parse JSON payload
            const { ChatFrom, Fullname, MobileNumber , messageList} = data;

            const existingInbox = await WhatsappMessageList.getChat(MobileNumber, ChatFrom);

            const result = await WhatsappMessageList.create({
                user_id: existingInbox.user_id, // Assuming `user_id` is the primary key or identifier in your table
                wamessageid : messageList[0].wamessageid,
                generatedmessages : messageList[0].generatedmessages, 
                ChatFrom, 
                MobileNumber,
                Fullname,
                status : messageList[0].status, 
                SentFromWhatsapp: true,
            });

            return NextResponse.json(result, {
                status: 200
            });

        } catch (error) {
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    }
}

export async function UPDATE(request) {
    if (request.method === 'UPDATE') {
        try {   
            return NextResponse.json({success : true}, {
                status: 200
            });
        } catch (error) {
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    }
}