import { IgApiClient } from "instagram-private-api";
import { NextResponse } from "next/server";

export async function POST(request) {
    if (request.method === 'POST') {
        const ig = new IgApiClient();
        const userId = '1175532000386310';
        try {
            // Fetch user info
            const other = await ig.user.search('makwanakrunal');
            // Print full name
            return NextResponse.json(other, { status: 200 });
        } catch (error) {
            if (error.message.includes('404')) {
                return NextResponse.json('User not found. Please check the user ID.', { status: 404 });
            } else if (error.message.includes('403')) {
                return NextResponse.json('Access denied. Ensure you have permission to view this user.', { status: 403 });
            }
        }
    }   
}
