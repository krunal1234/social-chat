import { createClient } from "./server";

const auth = {
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

    return { session: sessionData.session };
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
    const { session } = await auth.getSession();

    if (!session?.user) {
      return { message: "No user session found" };
    }

    const { data, error } = await supabase.from("UserInfo").select("*").eq("user_id", session.user.id);

    if (error) {
      return { message: error.message };
    }

    return data;
  },

  updateUserData: async (formData) => {
    const supabase = createClient();
    const { session } = await auth.getSession();

    if (!session?.user) {
      return { message: "No user session found" };
    }

    const updateData = Object.fromEntries(formData);
    const { name, phone, address, channels } = updateData;

    const { data, error } = await supabase.from("UserInfo").update({
      name,
      phone,
      address,
      channels
    }).eq("user_id", session.user.id);

    if (error) {
      return { message: error.message };
    }

    return data;
  },

  deleteSession: async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { message: error.message };
      }

      return { success: true };
    } catch (error) {
      return { message: error.message };
    }
  },
};

export default auth;
