import { NextResponse } from "next/server";
import InstagramCredential from "../../../../../utils/supabase/backend/Crendentials/instagram/credentials";

export async function POST(request) {
    const { SenderId, RecipientId, generatedmessages } = await request.json();
  
    // Replace these with your own credentials and endpoint
    const token = await InstagramCredential.get();
    const instagramApiUrl = `https://graph.instagram.com/v20.0/${SenderId}/messages`;
  
    try {
      const response = await fetch(instagramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token[0].access_token}`,
        },
        body: JSON.stringify({
          recipient: { id: RecipientId },
          message: { text: generatedmessages },
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return NextResponse.json({ message: data.error.message }, { status: response.status });
      }
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error sending Instagram message:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
