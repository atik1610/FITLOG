import {Clock,Flame,Star} from "lucide-react";
export default function Stats({w}){
  return(<div className="flex items-center gap-4 text-sm text-neutral-300">
    <span className="flex items-center gap-1"><Clock size={14} className="text-acid"/>{w.duration} min</span>
    <span className="flex items-center gap-1"><Flame size={14} className="text-orange-400"/>{w.caloriesBurned} kcal</span>
    <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400"/>{w.rating}</span></div>);
}
