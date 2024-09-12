import { NextResponse } from "next/server";
import auth from "../../../../utils/supabase/auth";
import GroupsList from "../../../../utils/supabase/backend/groups/groupsList";

export async function GET(request) {
    if (request.method === 'GET') {
        try {
            const data = await GroupsList.get();
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
            const { groupName, selectedContacts } = data;

            const existingGroup = await GroupsList.getGroup(groupName);

            const userData = await auth.getSession();
            let result;

            if (!existingGroup) {
                result = await GroupsList.update({
                    user_id: userData.session.user.id,
                    groupName : groupName,
                    selectedContacts: selectedContacts
                });
            } else {
                result = await GroupsList.create({
                    user_id: userData.session.user.id,
                    groupName : groupName,
                    selectedContacts: selectedContacts
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
            const { groupName, selectedContacts } = data;

            const result = await GroupsList.update({
                groupName : groupName,
                selectedContacts: selectedContacts
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

export async function DELETE(request) {
    if (request.method === 'DELETE') { // Assuming partial updates
        try {
            const data = await request.json();
            const { id } = data;

            const result = await GroupsList.delete({
                id : id,
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