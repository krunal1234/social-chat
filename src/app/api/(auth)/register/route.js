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
        const { name, email, phone, address, password, channels } = await request.json();
        
        const result = await auth.createUser({
          name,
          email,
          phone,
          address,
          password,
          channels
        });
  
        if (result?.message) {
          return NextResponse.json(result, { status: 200 });
        } else {
          return NextResponse.json({ success: true }, { status: 200 });
        }
      } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
      }
    } else {
      return NextResponse.json(`Method ${request.method} Not Allowed`, { status: 405 });
    }
  }