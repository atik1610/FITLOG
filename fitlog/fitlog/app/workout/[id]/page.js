"use client";
import {use,useEffect,useState} from "react";
import {notFound} from "next/navigation";
import {Plus,Bookmark} from "lucide-react";
import {getOne} from "@/lib/api";
import {useStore} from "@/components/Store";
import Loader from "@/components/Loader";
export default function Detail({params}){
  const {id}=use(params);
  const [w,setW]=useState(null);const [state,setState]=useState("loading");
  const {plan,addPlan,addSaved}=useStore();
  useEffect(()=>{getOne(id).then(d=>{if(!d||!d.id)throw 0;setW(d);setState("ok")}).catch(()=>setState("missing"))},[id]);
  if(state==="loading")return <Loader text="Loading workout…"/>;
  if(state==="missing")notFound();
  const inPlan=plan.some(p=>p.id===w.id);const full=plan.length>=5&&!inPlan;
  const specs=[["Equipment",w.equipment],["Difficulty",w.difficulty],["Sets",w.sets],["Reps",w.reps],["Duration",`${w.duration} min`],["Calories",`${w.caloriesBurned} kcal`],["Rating",w.rating]];
  return(<div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2">
    <img src={w.image} alt={w.name} className="w-full rounded-2xl border border-line object-cover lg:sticky lg:top-24 lg:self-start"/>
    <div>
      <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">{w.name}</h1>
      <p className="mt-3 text-neutral-400">{w.description}</p>
      <div className="mt-4 flex gap-2">{w.muscleGroups.map(m=><span key={m} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{m}</span>)}</div>
      <dl className="mt-6 divide-y divide-line rounded-xl border border-line bg-panel">
        {specs.map(([k,v])=><div key={k} className="flex justify-between px-4 py-3 text-sm"><dt className="font-semibold uppercase tracking-wide text-neutral-400">{k}</dt><dd>{v}</dd></div>)}</dl>
      <h2 className="mt-8 font-display text-2xl font-semibold uppercase">Instructions</h2>
      <ol className="mt-3 space-y-3">{w.instructions.map((s,i)=><li key={i} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-acid text-sm font-bold text-black">{i+1}</span><span className="text-neutral-300">{s}</span></li>)}</ol>
      <div className="mt-8 flex flex-wrap gap-3">
        <button disabled={inPlan||full} onClick={()=>addPlan(w.id)} className="inline-flex items-center gap-2 rounded-lg bg-acid px-5 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-40"><Plus size={18}/>{inPlan?"In today's plan":full?"Plan is full":"Add to today's plan"}</button>
        <button onClick={()=>addSaved(w.id)} className="inline-flex items-center gap-2 rounded-lg border border-neutral-500 px-5 py-3 font-semibold hover:border-acid"><Bookmark size={18}/>Save for later</button>
      </div></div></div>);
}
