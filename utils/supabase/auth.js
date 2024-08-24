import { revalidatePath } from "next/cache";
import { createClient } from "./server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const auth = {
    user: null,
    sessionCookie: null,

    createSession: async (formData) => {
        try {
            const supabase = createClient();
            const data = Object.fromEntries(formData);
            const { email, password } = data;
            
            const { data: sessionData, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
    
            if (error) {
                return { message: error.message };
            }
    
            // Store session or token if necessary
            // For example, you might want to store the session in a cookie or local storage
    
            return { success: true, session: sessionData };
        } catch (error) {
            return { message: error.message };
        }
    },

    getSession: async () => {
        const supabase = createClient();
        const { data: sessionData, error } = await supabase.auth.getSession();
        
        if (error) {
            return { message: error.message };
        }
    
        return { session: sessionData.session }; // Ensure you return the session data correctly
    },

    createUserData: async (data) => {
        const supabase = createClient();
        const { error } = await supabase.from("UserInfo").insert(data);
        
        if (error) {
            return { message: error.message };
        }

        return { success: true };
    },

    getUserData: async () => {
        const supabase = createClient();
        
        const userData = await auth.getSession();

        const { data , error } = await supabase.from("UserInfo").select("*").eq("user_id",userData.session.user.id);

        if (error) {
            return { message: error.message };
        }

        return data;
    },

    
    updateUserData: async (formData) => {
        const supabase = createClient();
        
        const userData = await auth.getSession();
        
        const updateData = Object.fromEntries(formData);
        const { name, phone, address, channels } = updateData;

        const { data , error } = await supabase.from("UserInfo").update({ 
            name: name ,
            phone: phone ,
            address: address ,
            channels : channels,
        }).eq("user_id",userData.session.user.id);

        if (error) {
            return { message: error.message };
        }

        return data;
    },

    createSession: async (formData) => {
        try {
            const supabase = createClient();
            const data = Object.fromEntries(formData);
            const { email, password } = data;
            
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                return { message: error.message };
            }

            return { success: true };
        } catch (error) {
            return { message: error.message };
        }
    },

    deleteSession: async () => {
        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signOut();
    
            if (error) {
                return { message: error.message };
            }
    
            // Clear session or token if necessary
            // For example, you might want to clear the session from cookies or local storage
    
            auth.user = null;
            auth.sessionCookie = null;
            return { success: true };
        } catch (error) {
            return { message: error.message };
        }
    },
};

export default auth;