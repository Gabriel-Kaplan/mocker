"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  const cookieStore = cookies();

  try {
    // Create session cookie
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION * 1000, // milliseconds
    });

    // Set cookie in the browser
    (await
      // Set cookie in the browser
      cookieStore).set("session", sessionCookie, {
      maxAge: SESSION_DURATION,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error setting session cookie:", error);
    return { success: false, error };
  }
}

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    // check if user exists in db
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };
    }

    // Create user data object
    const userData = {
      name,
      email,
      createdAt: new Date().toISOString(),
      // Optional fields below, comment out if not used
      // profileURL: "",
      // resumeURL: "",
    };

    // save user to db with retry mechanism
    let retries = 3;
    let success = false;
    
    while (retries > 0 && !success) {
      try {
        await db.collection("users").doc(uid).set(userData);
        success = true;
      } catch (dbError) {
        console.error(`Database write attempt failed (${retries} retries left):`, dbError);
        retries--;
        if (retries === 0) throw dbError;
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating user:", error);

    // Handle Firebase specific errors
    if (error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use",
      };
    }

    return {
      success: false,
      message: `Failed to create account: ${error.message || "Unknown error"}`,
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    // First verify if the user exists
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
      if (!userRecord) {
        return {
          success: false,
          message: "User does not exist. Create an account.",
        };
      }
    } catch (userLookupError) {
      console.error("Error looking up user:", userLookupError);
      return {
        success: false,
        message: "Failed to find user account. Please try again.",
      };
    }

    // Then set the session cookie
    const cookieResult = await setSessionCookie(idToken);
    if (!cookieResult.success) {
      return {
        success: false,
        message: "Failed to create session. Please try again.",
      };
    }

    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Sign in error:", error);

    return {
      success: false,
      message: `Failed to log into account: ${error.message || "Unknown error"}`,
    };
  }
}

// Sign out user by clearing the session cookie
export async function signOut() {
  try {
    const cookieStore = cookies();
    (await cookieStore).delete("session");
    return { success: true };
  } catch (error) {
    console.error("Error during sign out:", error);
    return { success: false, error };
  }
}

// Get current user from session cookie
export async function getCurrentUser(): Promise< User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // get user info from db
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
      
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.error("Error getting current user:", error);

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
}