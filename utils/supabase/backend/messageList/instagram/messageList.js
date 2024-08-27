import { createClient } from "../../../server";

const InstagramMessageList = {
    // Create a new Instagram message record
    create: async (data) => {
        const supabase = createClient();

        const { error } = await supabase.from("InstagramMessageList").insert(data);
        
        if (error) {
            return { message: error.message };
        }

        return { success: true };
    },

    // Get all Instagram message records
    get: async () => {
        const supabase = createClient();
        
        const { data, error } = await supabase.from("InstagramMessageList").select("*");

        if (error) {
            return { message: error.message };
        }

        return data;
    },

    // Get a specific Instagram message by its ID
    getByInstagramMessageId: async (InstaMessageId) => {
        const supabase = createClient();
        
        const { data, error } = await supabase.from("InstagramMessageList").select("*").eq("InstaMessageId", InstaMessageId).single();

        if (error) {
            return { message: error.message };
        }

        return data;
    },

    // Start listening for real-time updates
    startListening: async () => {
        const supabase = createClient();

        const { subscription, error } = supabase
            .from('InstagramMessageList')
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

export default InstagramMessageList;
