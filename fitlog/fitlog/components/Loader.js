export default function Loader({text="Loading workouts…"}){
  return(<div className="flex flex-col items-center gap-3 py-24 text-neutral-400"><div className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-acid"/><p>{text}</p></div>);
}
