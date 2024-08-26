import auth from "../../../auth";
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
        .eq("user_id",userData.session.user.id);

        
        if (error) {
            return { message: error.message };
        }

        return data;
    },
    getChat: async (MobileNumber, ChatFrom) => {
        const supabase = createClient();
        
        const { data , error } = await supabase.from("WhatsappMessageList")
        .select("user_id")
        .eq("ChatFrom",ChatFrom)
        .eq("MobileNumber",MobileNumber);

        
        if (error) {
            return { message: error.message };
        }

        return data;
    },
};

export default WhatsappMessageList;