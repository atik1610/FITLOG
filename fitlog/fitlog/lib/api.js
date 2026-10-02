const BASES=["https://api.abcz.workers.dev/api/fitlog","https://api.api-store.workers.dev/api/fitlog"];
async function get(path=""){
  let err;
  for(const b of BASES){try{const r=await fetch(b+path);if(!r.ok)throw new Error(r.status);return await r.json()}catch(e){err=e}}
  throw err;
}
export const getAll=()=>get();
export const getOne=id=>get("/"+id);
