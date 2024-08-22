import { revalidatePath } from "next/cache";
import { createClient } from "./server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const auth = {
    user: null,
    sessionCookie: null,

    createUser: async (formData) => {
        try {
            const supabase = createClient();
            const data = Object.fromEntries(formData);
            const { name, phone, email, address, password, channels } = data;
            
            // Sign up the user
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                // Additional parameters if needed
            });

            if (signUpError) {
                return { message: signUpError.message };
            }

            // Retrieve user session data
            const userData = await auth.getSession();

            if (userData.message) {
                return { message: userData.message };
            }

            // Create user details in the database
            const { error: createUserError } = await auth.createUserData({
                user_id: userData.session.user.id, // Assuming `user_id` is the primary key or identifier in your table
                address,
                phone,
                name,
                channels
            });

            if (createUserError) {
                return { message: createUserError.message };
            }

            return { success: true };
        } catch (error) {
            return { message: error.message };
        }
    },

    getSession: async () => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
            return { message: error.message };
        }

        return data;
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

            auth.user = null;
            auth.sessionCookie = null;
            return { success: true };
        } catch (error) {
            return { message: error.message };
        }
    }
};

export default auth;