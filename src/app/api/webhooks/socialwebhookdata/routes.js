import WebhookData from "../../../../../utils/supabase/backend/(WebhookData)/webhookData";

export async function POST(request) {
    if (request.method === 'POST') {
        try {   
            // Parse the form data
            const data = await request.json();
            const result = await WebhookData.create(data);

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