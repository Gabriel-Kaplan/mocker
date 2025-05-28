import { signOut } from "@/lib/actions/auth.action";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const LogoutButton = () => {
  async function handleLogout() {
    "use server";
    
    const result = await signOut();
    
    if (result.success) {
      redirect('/sign-in');
    } else {
      // Even if signOut fails, redirect for security
      redirect('/sign-in');
    }
  }

  return (
    <form action={handleLogout}>
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </form>
  );
};

export default LogoutButton;