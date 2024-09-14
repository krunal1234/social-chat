import auth from "../../auth";
import { createClient } from "../../server";

const GroupsList = {
    create : async (updateData) => {
        try {
            const supabase = createClient(); // Make sure to pass your Supabase URL and Key
    
            // Insert updateData into the 'Groups' table
            const { data , error } = await supabase.from("Groups").insert(updateData).select(); // Use .single() if inserting a single row
            
            if (error) {
                return { message: error.message };
            }
    
            // Return the ID of the newly inserted row
            return data; // Assuming 'id' is the primary key column
        } catch (error) {
            return { message: error.message };
        }
    },
    get: async () => {
        const supabase = createClient();
        
        const userData = await auth.getSession();

        const { data , error } = await supabase.from("Groups")
        .select("*")
        .eq("user_id",userData.session.id);

        if (error) {
            return { message: error.message };
        }

        return data;
    },
    getGroup: async (groupName) => {
        const supabase = createClient();
        
        const userData = await auth.getSession();

        const { data , error } = await supabase.from("Groups")
        .select("*")
        .eq("groupName",groupName)
        .eq("user_id",userData.session.id);

        if (error) {
            return { message: error.message };
        }

        return data;
    },
    update: async (updateData) => {
        try {
            const supabase = createClient();
            
            const userData = await auth.getSession();
            
            const { groupName , selectedContacts } = updateData;

            const { data , error } = await supabase.from("Groups").update({ 
                groupName : groupName,
                selectedContacts: selectedContacts
            }).eq("user_id",userData.session.id);

            if (error) {
                return { message: error.message };
            }

            return data;
        } catch (error) {
            return { message: error.message };
        }
    },
    delete: async (updateData) => {
        try {
            const supabase = createClient();
            
            const userData = await auth.getSession();
            
            const { id } = updateData;

            const { data , error } = await supabase.from("Groups").delete({ 
                id : id,
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

export default GroupsList;