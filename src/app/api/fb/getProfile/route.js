import { NextResponse } from 'next/server';
import FB from 'fb'; // Ensure you have the FB module imported

export async function GET(request) {
    try {
        // Extract query parameters from the URL
        const url = new URL(request.url);
        const phoneid = url.searchParams.get('phoneid');
        const accessToken = url.searchParams.get('accessToken');
        
        if (!phoneid || !accessToken) {
            return NextResponse.json({ error: 'Missing phoneid or accessToken' }, { status: 400 });
        }


        // Set the access token for the Facebook API
        FB.setAccessToken(accessToken);

        // Use Promises or async/await to handle the Facebook API call
        const data = await new Promise((resolve, reject) => {
            FB.api(phoneid, function (response) {
                if (!response || response.error) {
                    resolve(response.error || 'error occurred');
                } else {
                    resolve(response);
                }
            });
        });
        if(data.message){
            return NextResponse.json({
                response: "0",
                data: data.message
            });
        }else{
            return NextResponse.json({
                response: "1",
                message: "Facebook Profile",
                data: data
            });
        }

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
