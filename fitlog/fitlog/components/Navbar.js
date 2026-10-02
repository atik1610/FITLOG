"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Dumbbell} from "lucide-react";
import {useStore} from "./Store";
export default function Navbar(){
  const path=usePathname();const {plan,saved}=useStore();
  const link=a=>`rounded-md px-3 py-1.5 text-sm font-medium transition ${a?"bg-white/10 text-acid":"text-neutral-400 hover:text-white"}`;
  return(<header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
    <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
      <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-wide">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-acid text-black"><Dumbbell size={18}/></span>
        <span className="hidden sm:inline">FITLOG</span></Link>
      <div className="flex gap-1">
        <Link href="/" className={link(path==="/"||path.startsWith("/workout"))}>Workout</Link>
        <Link href="/my-plan" className={link(path==="/my-plan")}>My Plan</Link>
      </div>
      <Link href="/my-plan" className="flex gap-2 text-xs font-semibold">
        <span className="rounded-full bg-acid px-3 py-1 text-black">Plan {plan.length}</span>
        <span className="rounded-full border border-neutral-500 px-3 py-1">Saved {saved.length}</span>
      </Link>
    </nav></header>);
}
