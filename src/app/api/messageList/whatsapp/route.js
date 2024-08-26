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
            const { ChatFrom, Fullname, MobileNumber, messageList } = data;

            const existingInbox = await WhatsappMessageList.getChat(MobileNumber, ChatFrom);
            let result;
            if(existingInbox && existingInbox.length > 0){
                result = await WhatsappMessageList.create({
                    user_id: existingInbox[0].user_id, // Assuming `user_id` is the primary key or identifier in your table
                    wamessageid: messageList[0].wamessageid,
                    generatedmessages: messageList[0].generatedmessages, 
                    ChatFrom: ChatFrom, 
                    MobileNumber: MobileNumber,
                    Fullname: Fullname ? Fullname : MobileNumber,
                    status: messageList[0].status, 
                    SentFromWhatsapp: true,
                });
            }else{
                result = await WhatsappMessageList.create({
                    wamessageid: messageList[0].wamessageid,
                    generatedmessages: messageList[0].generatedmessages, 
                    ChatFrom: ChatFrom, 
                    MobileNumber: MobileNumber,
                    Fullname: Fullname ? Fullname : MobileNumber,
                    status: messageList[0].status, 
                    SentFromWhatsapp: true,
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