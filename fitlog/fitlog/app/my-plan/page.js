"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {Check,X} from "lucide-react";
import {getAll} from "@/lib/api";
import {useStore} from "@/components/Store";
import Loader from "@/components/Loader";
import Stats from "@/components/Stats";
export default function MyPlan(){
  const [all,setAll]=useState([]);const [loading,setLoading]=useState(true);const [tab,setTab]=useState("plan");
  const {plan,saved,ready,removePlan,removeSaved,markDone}=useStore();
  useEffect(()=>{getAll().then(setAll).catch(()=>{}).finally(()=>setLoading(false))},[]);
  const by=id=>all.find(w=>w.id===id);
  const planItems=plan.map(p=>({...by(p.id),done:p.done})).filter(w=>w.id);
  const savedItems=saved.map(by).filter(Boolean);
  const items=tab==="plan"?planItems:savedItems;
  const sum=k=>planItems.reduce((a,w)=>a+w[k],0);
  const metrics=[["Exercises",planItems.length],["Minutes",sum("duration")],["Calories",sum("caloriesBurned")]];
  const tabCls=a=>`rounded-lg px-5 py-2 text-sm font-semibold ${a?"bg-acid text-black":"border border-line text-neutral-300"}`;
  return(<div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
    <h1 className="font-display text-5xl font-bold uppercase">My Plan</h1>
    <p className="mt-2 text-neutral-400">Cap of five lifts for today. Finish them, then load more.</p>
    <div className="mt-6 grid grid-cols-3 gap-3">{metrics.map(([k,v])=><div key={k} className="rounded-xl border border-line bg-panel p-4"><p className="font-display text-3xl font-bold text-acid">{v}</p><p className="text-sm text-neutral-400">{k}</p></div>)}</div>
    <div className="mt-8 flex gap-2"><button onClick={()=>setTab("plan")} className={tabCls(tab==="plan")}>Today's Plan</button><button onClick={()=>setTab("saved")} className={tabCls(tab==="saved")}>Saved</button></div>
    <div className="mt-5 space-y-3">
      {loading||!ready?<Loader/>:items.length===0?
        <div className="rounded-xl border border-dashed border-line py-16 text-center"><h2 className="font-display text-3xl font-bold">NOTHING HERE YET</h2><p className="mt-2 text-neutral-400">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="mt-6 inline-block rounded-lg bg-acid px-6 py-3 font-semibold text-black">Go to workouts</Link></div>
      :items.map(w=>(<div key={w.id} className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-3 sm:flex-row sm:items-center">
        <img src={w.image} alt={w.name} className="h-24 w-full rounded-lg object-cover sm:w-28"/>
        <div className="flex-1 space-y-1"><h3 className={`font-display text-xl font-semibold uppercase ${w.done?"line-through opacity-50":""}`}>{w.name}</h3><p className="text-sm text-neutral-400">{w.equipment}</p><Stats w={w}/></div>
        <div className="flex items-center gap-2">
          <Link href={`/workout/${w.id}`} className="rounded-lg border border-neutral-500 px-3 py-2 text-sm font-semibold hover:border-acid">View Details</Link>
          {tab==="plan"&&<button disabled={w.done} onClick={()=>markDone(w.id)} className="inline-flex items-center gap-1 rounded-lg bg-acid px-3 py-2 text-sm font-semibold text-black disabled:opacity-40"><Check size={16}/>{w.done?"Done":"Mark as Done"}</button>}
          <button aria-label="Remove" onClick={()=>tab==="plan"?removePlan(w.id):removeSaved(w.id)} className="grid h-9 w-9 place-items-center rounded-lg border border-line hover:border-red-400 hover:text-red-400"><X size={18}/></button>
        </div></div>))}
    </div></div>);
}
