import auth from "../../auth";
import { createClient } from "../../server";

const ContactsList = {
    create : async (data) => {
        try {
            const supabase = createClient();

            const { error } = await supabase.from("Contacts").insert(data);
            
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

        const { data , error } = await supabase.from("Contacts")
        .select("*")
        .eq("user_id",userData.session.id);

        if (error) {
            return { message: error.message };
        }

        return data;
    },
    findById: async (id) => {
        const supabase = createClient();
        
        const userData = await auth.getSession();

        const { data , error } = await supabase.from("Contacts")
        .select("*")
        .eq("id",id)
        .eq("user_id",userData.session.id);

        if (error) {
            return { message: error.message };
        }

        return data;
    },
    getGroupContacts: async (groupId) => {
        const supabase = createClient();
        
        const userData = await auth.getSession();

        const { data , error } = await supabase.from("Contacts")
        .select("*")
        .eq("groupId",groupId)
        .eq("user_id",userData.session.id);

        if (error) {
            return { message: error.message };
        }

        return data;
    },
    getByContactsList: async (mobilenumber) => {

        const supabase = createClient();
        
        const userData = await auth.getSession();

        const { data , error } = await supabase.from("Contacts").select("*").eq("mobilenumber",mobilenumber).eq("user_id",userData.session.id);

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

            const { data , error } = await supabase.from("Contacts").update({ 
                email : email,
                fullname : fullname,
                mobilenumber: mobilenumber,
                country: country
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

export default ContactsList;