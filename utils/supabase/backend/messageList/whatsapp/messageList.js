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
        

        const { data , error } = await supabase.from("WhatsappMessageList")
        .select("*")

        
        if (error) {
            return { message: error.message };
        }

        return data;
    },
    getChat: async (MobileNumber, ChatFrom) => {
        try {
            const supabase = createClient();
            
            const { data , error } = await supabase.from("WhatsappMessageList").select("user_id").eq("ChatFrom",ChatFrom).eq("MobileNumber",MobileNumber);

            
            if (error) {
                return { message: error.message };
            }

            return data;
        }
        catch (error) {
            return { message: error.message };
        }
    },
    startListening: async () => {
        const supabase = createClient();

        const { subscription, error} = supabase
            .from('WhatsappMessageList')
            .on('INSERT', payload => {
                handleRealTimeUpdates(payload);
            })
            .subscribe();

        if (error) {
            return { message: error.message };
        }

        return subscription;
    }    
};

export default WhatsappMessageList;