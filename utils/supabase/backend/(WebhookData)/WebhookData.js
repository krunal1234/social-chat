import { createClient } from "../../server";

const WebhookData = {
    create : async (data) => {
        const supabase = createClient();

        const { error } = await supabase.from("WebhookData").insert({webhookData : data});
        
        if (error) {
            
            return { message: error.message };
        }

        return { success: true };
    },
};

export default WebhookData;