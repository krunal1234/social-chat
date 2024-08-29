import { NextResponse } from "next/server";
import InstagramCredential from "../../../../../utils/supabase/backend/Crendentials/instagram/credentials";

export async function POST(request) {
    const { SenderId, RecipientId, generatedmessages } = await request.json();
  
    // Replace these with your own credentials and endpoint
    const accessToken = 'IGQWRQMUtpUFFmOU5xUld1dzY0V0lnN3BqZA2ZAmcE80Yml5X3BmcHlTMGlFODJuWkp1SmJxTjdRbDZAvbXVleUlxbzR5UUNLenM1MTBtZAWdrTW1KWUxvLTJIcUQ5aHFjN2FJMmI1M3h5VDJORjdXRVdCRHAtZAlc0U2sZD';
    const instagramApiUrl = `https://graph.instagram.com/v20.0/${RecipientId}/messages`;
  
    try {
      const response = await fetch(instagramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          recipient: { id: SenderId },
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
