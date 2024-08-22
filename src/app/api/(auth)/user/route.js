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