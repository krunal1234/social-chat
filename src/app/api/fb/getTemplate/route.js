import { NextResponse } from 'next/server';
import FB from 'fb'; // Ensure you have the FB module imported

export async function GET(request) {
    try {
        // Extract query parameters from the URL
        const url = new URL(request.url);
        const fbappid = url.searchParams.get('fbappid');
        const accessToken = url.searchParams.get('accessToken');
        
        if (!fbappid || !accessToken) {
            return NextResponse.json({ error: 'Missing fbappid or accessToken' }, { status: 400 });
        }

        // Set the access token for the Facebook API
        FB.setAccessToken(accessToken);

        // Use Promises or async/await to handle the Facebook API call
        const data = await new Promise((resolve, reject) => {
            FB.api(fbappid + '?fields=message_templates', function (response) {
                if (!response || response.error) {
                    reject(response.error || 'error occurred');
                } else {
                    resolve(response);
                }
            });
        });

        return NextResponse.json({
            response: "1",
            message: "Facebook Template Found",
            data: data
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
