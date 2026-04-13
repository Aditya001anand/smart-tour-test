"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useLocation } from '@/lib/hooks/useLocation';
import Image from "next/image";

export default function GlobalHeader({ isScrolled }) {
  const pathname = usePathname();
  const router = useRouter();
  const { location } = useLocation();
  const { isSignedIn } = useUser();

  const getLinkClass = (path) => {
    const isActive = pathname === path;
    return `transition-colors ${isActive ? 'text-orange-500 font-bold drop-shadow-sm' : 'text-teal-800 font-bold hover:text-orange-500 drop-shadow-sm'}`;
  };

  const handleFoodClick = () => {
    const lat = location?.latitude || "";
    const lon = location?.longitude || "";
    router.push(`/food?lat=${lat}&lon=${lon}`);
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white shadow-md border-b border-slate-100 h-15 flex items-center print:hidden">
  
  <div className="w-full pl-16 pr-6 flex items-center justify-between">
    
    <Link href="/" className="text-3xl flex items-center gap-1">
      <span className="text-slate-900 font-extrabold tracking-tight">𝕊mart</span>
      <span className="text-orange-500 font-extrabold tracking-tight">𝕋our</span>
    </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className={getLinkClass('/')}>HOME</Link>
          <Link href="/guide" className={getLinkClass('/guide')}>GUIDES</Link>
          <button onClick={handleFoodClick} className="text-teal-800 font-bold hover:text-orange-500 transition-colors drop-shadow-sm">FOOD</button>
          <button onClick={() => router.push('/translate')} className="text-teal-800 font-bold hover:text-orange-500 transition-colors drop-shadow-sm">TRANSLATE</button>
          <Link href="/ai-mode" className={getLinkClass('/ai-mode')}>AI MODE</Link>

        </nav>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <div className="flex items-center gap-4 pl-2">
              <Link href="/dashboard" className="text-teal-800 font-bold hover:text-orange-500 transition-colors drop-shadow-sm hidden md:block">DASHBOARD</Link>
              <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: { width: 36, height: 36 } } }} />
            </div>
          ) : (
           <div className="flex items-center gap-4 pl-2">
  <SignInButton mode="modal">
    <button className="w-30 px-10 py-3 cursor-pointer rounded-full bg-orange-500 text-white font-semibold text-lg shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-300">
      Log In
    </button>
  </SignInButton>
</div>
          )}
        </div>
      </div>
    </nav>
  );
}
