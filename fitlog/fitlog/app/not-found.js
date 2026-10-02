import Link from "next/link";
export default function NotFound(){
  return(<div className="mx-auto max-w-xl px-4 py-32 text-center"><h1 className="font-display text-8xl font-bold text-acid">404</h1>
    <p className="mt-3 text-neutral-400">This page skipped leg day and doesn't exist.</p>
    <Link href="/" className="mt-6 inline-block rounded-lg bg-acid px-6 py-3 font-semibold text-black">Go to workouts</Link></div>);
}
