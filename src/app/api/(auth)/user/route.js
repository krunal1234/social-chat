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
            const data = await auth.updateUserData(formData);

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