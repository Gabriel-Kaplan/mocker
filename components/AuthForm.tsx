/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";

// Define the form type
type FormType = "sign-in" | "sign-up";

// Schema generator based on type
const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3, "Name must be at least 3 characters") : z.string().optional(),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(3, "Password must be at least 3 characters"),
  });
};

// Timeout helper with typings
function promiseWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutMessage: string
): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]) as Promise<T>;
}

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const isSignIn = type === "sign-in";

    try {
      const { name, email, password } = data;
      const loadingToast = toast.loading(isSignIn ? "Signing in..." : "Creating your account...");

      if (isSignIn) {
        const userCredential = await promiseWithTimeout(
          signInWithEmailAndPassword(auth, email, password),
          15000,
          "Sign in timed out. Please check your connection and try again."
        );

        const idToken = await promiseWithTimeout(
          userCredential.user.getIdToken(),
          8000,
          "Failed to get authentication token"
        );

        const result = await promiseWithTimeout(
          signIn({ email, idToken }),
          15000,
          "Server authentication timed out"
        );

        toast.dismiss(loadingToast);

        if (!result?.success) {
          toast.error(result?.message || "Failed to complete sign in. Please try again.");
          return;
        }

        toast.success("Signed in successfully!");
        router.push("/");

      } else {
        const userCredential = await promiseWithTimeout(
          createUserWithEmailAndPassword(auth, email, password),
          15000,
          "Firebase connection timed out. Please try again."
        );

        const result = await promiseWithTimeout(
          signUp({
            uid: userCredential.user.uid,
            name: name!,
            email,
            password,
          }),
          15000,
          "Server action timed out"
        );

        toast.dismiss(loadingToast);

        if (!result.success) {
          console.error("Server signup failed:", result.message);
          toast.warning("Account created, but profile setup incomplete. Please try signing in.");
          router.push("/sign-in");
          return;
        }

        toast.success("Account created successfully!");
        router.push("/sign-in");
      }
    } catch (error: any) {
      toast.dismiss();
      console.error("Auth error:", error);

      const message = error?.message || error?.code || "Unknown error";

      if (message.includes("auth/email-already-in-use")) {
        toast.error("This email is already registered. Please sign in instead.");
      } else if (message.includes("auth/user-not-found") || message.includes("auth/wrong-password")) {
        toast.error("Invalid email or password.");
      } else {
        toast.error(`Authentication failed: ${message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/mockerlogo.png" alt="logo" height={32} width={38} />
          <h2 className="text-white">Mocker</h2>
        </div>

        <h3>Smash Your Interviews. Practice with Mocker</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? isSignIn
                  ? "Signing In..."
                  : "Creating Account..."
                : isSignIn
                ? "Sign In"
                : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;