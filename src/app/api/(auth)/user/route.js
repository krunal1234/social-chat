import { NextResponse } from "next/server";
import auth from "../../../../../utils/supabase/auth";

export async function GET(request) {
    if(request.method == 'GET'){
        try {
            const data = await auth.getUserData();

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

export async function PUT(request) {
    if(request.method == 'PUT'){
        try {
            const formData = await request.formData();
            const getUserData = await auth.getUserData();
            let data;
            if(getUserData.length > 0){
                data = await auth.updateUserData(formData);
            }else{
                const data = Object.fromEntries(formData);
                const { name, phone, email, address, password, channels } = data;
                const userData = await auth.getUserData();
                const { error: createUserError } = await auth.createUserData({
                    user_id: userData.session.id, // Assuming `user_id` is the primary key or identifier in your table
                    address,
                    phone,
                    name,
                    channels
                });
            }
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