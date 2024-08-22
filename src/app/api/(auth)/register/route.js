import { NextResponse } from "next/server";
import auth from "../../../../../utils/supabase/auth";

export async function GET(request) {
    try {
        return NextResponse.json("working", {
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
            const result = await auth.createUser(formData);

            if (result?.message) {
                return NextResponse.json(result, { status: 200 });
            } else {
                // Handle success, set cookies if necessary
                // You can use the response to set cookies directly
                return NextResponse.json({ success: true }, { status: 200 });
            }
        } catch (error) {
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    } else {
        return NextResponse.json(`Method ${request.method} Not Allowed`, { status: 405 });
    }
  }