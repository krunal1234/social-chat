import { NextResponse } from "next/server";

export async function POST(request) {
    if (request.method === 'POST') {
        try {   
            const data = await request.json(); // Parse JSON payload
            const { ChatFrom, Fullname, MobileNumber , messageList} = data;
            const userData = await auth.getSession();

            const result = await whatsappCredentials.create({
                user_id: userData.session.user.id, // Assuming `user_id` is the primary key or identifier in your table
                wamessageid : messageList[0].wamessageid,
                generatedmessages : messageList[0].generatedmessages, 
                ChatFrom, 
                MobileNumber,
                Fullname,
                status : messageList[0].status, 
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