import { createClient } from "../../../server";

const MessengerMessageList = {
    // Create a new Messenger message record
    create: async (data) => {
        const supabase = createClient();

        const { error } = await supabase.from("MessengerMessageList").insert(data);
        
        if (error) {
            return { message: error.message };
        }

        return { success: true };
    },

    // Get all Messenger message records
    get: async () => {
        const supabase = createClient();
        
        const { data, error } = await supabase.from("MessengerMessageList").select("*");

        if (error) {
            return { message: error.message };
        }

        return data;
    },

    // Get a specific Messenger message by its ID
    getByMessengerMessageList: async (SenderId,RecipientId) => {
        const supabase = createClient();
        
        const { data, error } = await supabase.from("MessengerMessageList").select("*")
        .eq("SenderId", SenderId)
        .eq("RecipientId", RecipientId);

        if (error) {
            return { message: error.message };
        }

        return data;
    },

    // Start listening for real-time updates
    startListening: async () => {
        const supabase = createClient();

        const { subscription, error } = supabase
            .from('MessengerMessageList')
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

// Example handler for real-time updates (implement as needed)
const handleRealTimeUpdates = (payload) => {
    console.log("Real-time update:", payload);
};

export default MessengerMessageList;
