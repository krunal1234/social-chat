import auth from "../../auth";
import { createClient } from "../../server";

const MessengerCredential = {
    create : async (data) => {
        try {
            const supabase = createClient();

            const { error } = await supabase.from("MessengerCredential").insert(data);
            
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

        const { data , error } = await supabase.from("MessengerCredential")
        .select("*")
        .eq("user_id",userData.session.user.id);

        if (error) {
            return { message: error.message };
        }

        return data;
    },
    getCredential: async () => {

        const supabase = createClient();
        
        const userData = await auth.getSession();

        const { data , error } = await supabase.from("MessengerCredential").select("*").eq("user_id",userData.session.user.id);

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

            const { data , error } = await supabase.from("MessengerCredential").update({ 
                app_id: app_id, 
                access_token: access_token, 
                phone: phone, 
                phone_id: phone_id, 
                business_id: business_id,
            }).eq("user_id",userData.session.user.id);

            if (error) {
                return { message: error.message };
            }

            return data;
        } catch (error) {
            return { message: error.message };
        }
    }
};

export default MessengerCredential;