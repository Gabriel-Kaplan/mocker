import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl p-2">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
       <h3 className="text-white text-xl font-semibold">Talk to the AI to Generate Your Interview</h3>
      <p className="text-white text-sm mt-2">
      Start a conversation with our AI to instantly generate a customized interview based on your goals, experience, or job role. Just speak naturally, and the AI will craft relevant, role-specific questions for you — no manual setup needed.
      </p>

      </div>
      
      <Agent
        userName={user?.name || ""}
        userId={user?.id}
        profileImage={user?.profileURL}
        type="generate"
      />
    </>
  );
};

export default Page;