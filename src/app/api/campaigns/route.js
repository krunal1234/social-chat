import { NextResponse } from "next/server";
import auth from "../../../../utils/supabase/auth";
import WhatsappCampaignsList from "../../../../utils/supabase/backend/campaigns/campaigns";

export async function GET(request) {
    if (request.method === 'GET') {
        try {
            const data = await WhatsappCampaignsList.get();
            return NextResponse.json({ data }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: "Failed to get Instagram messages: " + error.message }, { status: 403 });
        }
    } else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}

export async function POST(request) {
    if (request.method === 'POST') {
        try {
            const data = await request.json();
            const { email, fullname , mobilenumber, country } = data;

            const existingMessage = await WhatsappCampaignsList.getByWhatsappCampaignsList(mobilenumber);

            const userData = await auth.getSession();

            let result;
            if (!existingMessage) {
                result = await WhatsappCampaignsList.update({
                    user_id: userData.session.user.id,
                    fullname : fullname,
                    country: country,
                    mobilenumber: mobilenumber,
                    email: email,
                    status: 1,
                    IsActive: 1,
                    IsDeleted: 0
                });
            } else {
                result = await WhatsappCampaignsList.create({
                    user_id: userData.session.user.id,
                    fullname : fullname,
                    country: country,
                    mobilenumber: mobilenumber,
                    email: email,
                    status: 1,
                    IsActive: 1,
                    IsDeleted: 0
                });
            }

            return NextResponse.json(result, { status: 200 });
        } catch (error) {
            console.error("Error handling POST request:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}

export async function PATCH(request) {
    if (request.method === 'PATCH') { // Assuming partial updates
        try {
            const data = await request.json();
            const { email, fullname , mobilenumber, country } = data;

            const result = await WhatsappCampaignsList.update({
                fullname : fullname,
                country: country,
                mobilenumber: mobilenumber,
                email: email,
            });
            // Implement update logic if needed
            return NextResponse.json({ success: true }, { status: 200 });
        } catch (error) {
            console.error("Error handling UPDATE request:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}
