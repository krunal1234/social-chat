import { NextResponse } from "next/server";
import MessengerCredential from "../../../../../utils/supabase/backend/Crendentials/messenger/credentials";

export async function POST(request) {
    const { SenderId, RecipientId, generatedmessages } = await request.json();
  
    // Replace these with your own credentials and endpoint
    const token = await MessengerCredential.get();
    const MessengerApiUrl = `https://graph.Messenger.com/v20.0/${RecipientId}/messages`;
  
    try {
      const response = await fetch(MessengerApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token[0].access_token}`,
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
      console.error('Error sending Messenger message:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
