const { FB } = require("fb/lib/fb");

const WhatsappTemplateList = {
    get : async (business_id, accessToken) => {
        try {
            FB.setAccessToken(accessToken);

            // Use Promises or async/await to handle the Facebook API call
            const data = await new Promise((resolve, reject) => {
                FB.api(business_id + '?fields=message_templates', function (response) {
                    if (!response || response.error) {
                        resolve(response.error || 'error occurred');
                    } else {
                        resolve(response);
                    }
                });
            });

            return data;
        } catch (error) {
            return { message: error.message };
        }
    },
    getById: async(business_id,accessToken,CampaignTemplateId) => {
        try {
            FB.setAccessToken(accessToken);

            // Use Promises or async/await to handle the Facebook API call
            const data = await new Promise((resolve, reject) => {
                FB.api(business_id + '?fields=message_templates', function (response) {
                    if (!response || response.error) {
                        resolve(response.error || 'error occurred');
                    } else {
                        resolve(response);
                    }
                });
            });

            return data;
        } catch (error) {
            return { message: error.message };
        }
    }
}

export default WhatsappTemplateList;