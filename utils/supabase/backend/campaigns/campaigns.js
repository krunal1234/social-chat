import auth from "../../auth";
import { createClient } from "../../server";

const WhatsappCampaignsList = {
    create : async (data) => {
        try {
            const supabase = createClient();

            const { error } = await supabase.from("WhatsappCampaigns").insert(data);
            
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

        const { data , error } = await supabase.from("WhatsappCampaigns")
        .select("*")
        .eq("user_id",userData.session.user.id);

        if (error) {
            return { message: error.message };
        }

        return data;
    },
    getGroupCampaign: async (groupId) => {
        const supabase = createClient();
        
        const userData = await auth.getSession();

        const { data , error } = await supabase.from("WhatsappCampaigns")
        .select("*")
        .eq("groupId",groupId)
        .eq("user_id",userData.session.user.id);

        if (error) {
            return { message: error.message };
        }

        return data;
    },
    getByCampaignList: async (mobilenumber) => {

        const supabase = createClient();
        
        const userData = await auth.getSession();

        const { data , error } = await supabase.from("WhatsappCampaigns").select("*").eq("mobilenumber",mobilenumber).eq("user_id",userData.session.user.id);

        if (error) {
            return { message: error.message };
        }

        return data;
    },
    update: async (updateData) => {
        try {
            const supabase = createClient();
            
            const userData = await auth.getSession();
            
            const { email, fullname , mobilenumber, country } = updateData;

            const { data , error } = await supabase.from("WhatsappCampaigns").update({ 
                email : email,
                fullname : fullname,
                mobilenumber: mobilenumber,
                country: country
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

export default WhatsappCampaignsList;