import auth from "../../auth";
import { createClient } from "../../server";

const whatsappCredentials = {
    create : async (data) => {
        try {
            const supabase = createClient();

            const { error } = await supabase.from("WhatsappCredentials").insert(data);
            
            if (error) {
                return { message: error.message };
            }
    
            return { success: true };
        } catch (error) {
            return { message: error.message };
        }
    },
    get: async () => {
        const supabase = createClient();
        
        const userData = await auth.getSession();

        const { data , error } = await supabase.from("WhatsappCredentials")
        .select("*")
        .eq("platform_id","1")
        .eq("user_id",userData.session.user.id);

        if (error) {
            return { message: error.message };
        }

        return data;
    },
};

export default whatsappCredentials;