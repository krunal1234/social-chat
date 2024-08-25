import { createClient } from "../../../server";

const WhatsappMessageList = {
    create : async (data) => {
        const supabase = createClient();

        const { error } = await supabase.from("WhatsappMessageList").insert(data);
        
        if (error) {
            return { message: error.message };
        }

        return { success: true };
    },
    get: async () => {
        const supabase = createClient();
        
        const userData = await auth.getSession();

        const { data , error } = await supabase.from("WhatsappMessageList")
        .select("*")
        .eq("platform_id","1")
        .eq("wamessageid","")
        .eq("user_id",userData.session.user.id);

        if (error) {
            return { message: error.message };
        }
    },
};

export default WhatsappMessageList;