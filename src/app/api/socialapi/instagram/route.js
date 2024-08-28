import { NextResponse } from "next/server";
import auth from "../../../../../utils/supabase/auth";
import InstagramCredential from "../../../../../utils/supabase/backend/Crendentials/instagram/credentials";

export async function GET(request) {
    try {
        const data = await InstagramCredential.get();

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
            
            const getCredentialData = await InstagramCredential.getCredential();

            let result;
            if(getCredentialData.length > 0){
                result = await InstagramCredential.updateCredentialData(formData);
            }else{
                const data = Object.fromEntries(formData);
                const { username, password } = data;
                const userData = await auth.getSession();
                
                result = await InstagramCredential.create({
                    user_id: userData.session.user.id, // Assuming `user_id` is the primary key or identifier in your table
                    username,
                    password, 
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