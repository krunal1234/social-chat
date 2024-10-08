import auth from "../../../auth";
import { createClient } from "../../../server";

const InstagramCredential = {
    create : async (data) => {
        try {
            const supabase = createClient();

            const { error } = await supabase.from("InstagramCredential").insert(data);
            
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

        const { data , error } = await supabase.from("InstagramCredential")
        .select("*")
        .eq("user_id",userData.session.id);

        if (error) {
            return { message: error.message };
        }

        return data;
    },
    getCredential: async () => {

        const supabase = createClient();
        
        const userData = await auth.getSession();

        const { data , error } = await supabase.from("InstagramCredential").select("*").eq("user_id",userData.session.id);

        if (error) {
            return { message: error.message };
        }

        return data;
    },
    updateCredentialData: async (formData) => {
        try {
            const supabase = createClient();
            
            const userData = await auth.getSession();
            
            const updateData = Object.fromEntries(formData);
            const { access_token, phone, phone_id, business_id , app_id} = updateData;

            const { data , error } = await supabase.from("InstagramCredential").update({ 
                access_token: access_token, 
            }).eq("user_id",userData.session.id);

            if (error) {
                return { message: error.message };
            }

            return data;
        } catch (error) {
            return { message: error.message };
        }
    }
};

export default InstagramCredential;