import { NextResponse } from "next/server";
import auth from "../../../../../utils/supabase/auth";
import MessengerCredential from "../../../../../utils/supabase/backend/Crendentials/messenger/credentials";

export async function GET(request) {
    try {
        const data = await MessengerCredential.get();

        return NextResponse.json({data}, {
            status: 200
        });
    }catch (error) {
        return NextResponse.json("Failed to get account:" + error, {
            status: 403
        });
    }
}

export async function POST(request) {
    if (request.method === 'POST') {
        try {   
            // Parse the form data
            const formData = await request.formData();
            
            const getCredentialData = await MessengerCredential.getCredential();

            let result;
            if(getCredentialData.length > 0){
                result = await MessengerCredential.updateCredentialData(formData);
            }else{
                const data = Object.fromEntries(formData);
                const { access_token } = data;
                const userData = await auth.getSession();
                result = await MessengerCredential.create({
                    user_id: userData.session.id, // Assuming `user_id` is the primary key or identifier in your table
                    access_token
                });
            }
            
            return NextResponse.json(result, {
                status: 200
            });
        } catch (error) {
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    } else {
        return NextResponse.json(`Method ${request.method} Not Allowed`, { status: 405 });
    }
  }