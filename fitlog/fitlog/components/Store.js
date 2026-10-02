"use client";
import {createContext,useContext,useEffect,useState,useCallback} from "react";
const C=createContext(null);
export const useStore=()=>useContext(C);
export function Store({children}){
  const [plan,setPlan]=useState([]);   // [{id,done}]
  const [saved,setSaved]=useState([]); // [id]
  const [toast,setToast]=useState(null);
  const [ready,setReady]=useState(false);
  useEffect(()=>{try{setPlan(JSON.parse(localStorage.getItem("fl_plan")||"[]"));setSaved(JSON.parse(localStorage.getItem("fl_saved")||"[]"))}catch{}setReady(true)},[]);
  useEffect(()=>{if(ready){try{localStorage.setItem("fl_plan",JSON.stringify(plan));localStorage.setItem("fl_saved",JSON.stringify(saved))}catch{}}},[plan,saved,ready]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(null),2200);return()=>clearTimeout(t)},[toast]);
  const notify=useCallback(m=>setToast({m,k:Date.now()}),[]);
  const addPlan=id=>{
    if(plan.some(p=>p.id===id))return notify("Already in today's plan");
    if(plan.length>=5)return notify("Plan is full: 5 lifts max");
    setPlan([...plan,{id,done:false}]);notify("Added to today's plan");
  };
  const addSaved=id=>{
    if(saved.includes(id))return notify("Already saved");
    setSaved([...saved,id]);notify("Saved for later");
  };
  const removePlan=id=>{setPlan(plan.filter(p=>p.id!==id));notify("Removed from today's plan")};
  const removeSaved=id=>{setSaved(saved.filter(s=>s!==id));notify("Removed from saved")};
  const markDone=id=>{setPlan(plan.map(p=>p.id===id?{...p,done:true}:p));notify("Marked as done. Nice work!")};
  return(<C.Provider value={{plan,saved,ready,addPlan,addSaved,removePlan,removeSaved,markDone}}>
    {children}
    {toast&&<div key={toast.k} role="status" className="toast fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-lg bg-acid px-5 py-3 text-sm font-semibold text-black shadow-lg">{toast.m}</div>}
  </C.Provider>);
}
