import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect('/sign-in')
  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/mockerlogo.png" alt="MockMate Logo" width={38} height={32} />
          <h2 className="text-white">Mocker</h2>
        </Link>
        
        <LogoutButton />
      </nav>

      {children}
      
    </div>
    
  );
};

export default Layout;  