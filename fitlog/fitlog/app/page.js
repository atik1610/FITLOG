"use client";
import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {ArrowDown,ChevronDown} from "lucide-react";
import {getAll} from "@/lib/api";
import Loader from "@/components/Loader";
import Stats from "@/components/Stats";
const KEYS={Duration:"duration",Calories:"caloriesBurned",Rating:"rating"};
export default function Home(){
  const [data,setData]=useState([]);const [loading,setLoading]=useState(true);const [err,setErr]=useState(false);const [sort,setSort]=useState("Duration");
  useEffect(()=>{getAll().then(setData).catch(()=>setErr(true)).finally(()=>setLoading(false))},[]);
  const list=useMemo(()=>[...data].sort((a,b)=>b[KEYS[sort]]-a[KEYS[sort]]),[data,sort]);
  return(<>
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:py-24">
      <div>
        <p className="text-sm font-semibold tracking-[0.25em] text-acid">WORKOUT LIBRARY</p>
        <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[1.05] sm:text-6xl lg:text-7xl">Train with intent. Log every set.</h1>
        <p className="mt-5 max-w-lg text-neutral-400">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.</p>
        <a href="#library" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-acid px-6 py-3 font-semibold text-black transition hover:brightness-110">BROWSE WORKOUTS <ArrowDown size={18}/></a>
      </div>
      <div className="overflow-hidden rounded-2xl border border-line">
        <img src="https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740" alt="Lifter training" className="aspect-[4/3] w-full object-cover"/>
      </div>
    </section>
    <section id="library" className="mx-auto max-w-7xl scroll-mt-20 px-4 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h2 className="font-display text-4xl font-bold uppercase">The Library</h2>
          <p className="mt-1 text-neutral-400">Twelve lifts covering every major muscle group.</p></div>
        <label className="relative flex items-center gap-2 text-sm text-neutral-400">Sort By
          <select value={sort} onChange={e=>setSort(e.target.value)} className="appearance-none rounded-lg border border-line bg-panel py-2 pl-3 pr-9 text-white outline-none focus:border-acid">
            {Object.keys(KEYS).map(k=><option key={k}>{k}</option>)}</select>
          <ChevronDown size={16} className="pointer-events-none absolute right-3"/></label>
      </div>
      {loading?<Loader/>:err?<p className="py-20 text-center text-red-400">Couldn't load workouts. Refresh to try again.</p>:
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(w=>(<Link key={w.id} href={`/workout/${w.id}`} className="group overflow-hidden rounded-xl border border-line bg-panel transition hover:border-acid">
          <img src={w.image} alt={w.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition group-hover:scale-[1.02]"/>
          <div className="space-y-2 p-4">
            <div className="flex flex-wrap gap-2">{w.muscleGroups.map(m=><span key={m} className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase">{m}</span>)}</div>
            <h3 className="font-display text-xl font-semibold uppercase">{w.name}</h3>
            <p className="text-sm text-neutral-400">{w.equipment}</p>
            <Stats w={w}/></div></Link>))}
      </div>}
    </section></>);
}
