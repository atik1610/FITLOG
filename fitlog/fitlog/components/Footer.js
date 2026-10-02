import {Dumbbell} from "lucide-react";
export default function Footer(){
  return(<footer className="mt-16 border-t border-line bg-black"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-neutral-400 sm:flex-row sm:px-6">
    <div className="flex items-center gap-2 font-display text-lg font-bold text-white"><span className="grid h-7 w-7 place-items-center rounded bg-acid text-black"><Dumbbell size={15}/></span>FITLOG</div>
    <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p></div></footer>);
}
