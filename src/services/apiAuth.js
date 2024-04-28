import supabase, { supabaseUrl } from "./supabase";

export async function signup({
  firstName,
  lastName,
  userName,
  phoneNumber,
  email,
  password,
  passwordConfirm,
  role,
}) {
  try {
    const requestBody = {
      firstName: firstName,
      lastName: lastName,
      username: userName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      confirmPassword: passwordConfirm,
      role: role,
    };
    console.log("sharmoot", requestBody);
    const response = await fetch(
      "http://localhost:5023/api/v1/Staff/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    console.log("res", response);
    if (!response.ok) {
      throw new Error("Failed to sign up a7a");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function Logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. upload the avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  return updatedUser;
}
