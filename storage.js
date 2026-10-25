/* Progress persistence for the existing quiz state schema. No question data lives here. */
(()=>{'use strict';
const DB_NAME='pathology-mcq-progress';
const STORE='bank-states';
let databasePromise;
let lastWrite=0;
const status=(kind,message)=>{
  const el=document.getElementById('saveStatus');
  if(el){el.textContent=message;el.dataset.kind=kind}
  const alert=document.getElementById('storageAlert');
  if(alert){alert.hidden=kind!=='error'&&kind!=='fallback';if(!alert.hidden)alert.textContent=kind==='error'?'Progress could not be saved. Keep this page open and export a backup now.':'IndexedDB is unavailable. Progress is using browser storage with reduced reliability; export a backup.'}
};
function openDatabase(){
  if(databasePromise)return databasePromise;
  databasePromise=new Promise((resolve,reject)=>{
    if(!('indexedDB' in window)){reject(new Error('IndexedDB is unavailable'));return}
    const req=indexedDB.open(DB_NAME,1);
    req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains(STORE))req.result.createObjectStore(STORE)};
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error||new Error('IndexedDB open failed'));
    req.onblocked=()=>reject(new Error('IndexedDB is blocked by another open tab'));
  });
  return databasePromise;
}
async function read(key){const db=await openDatabase();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readonly');const req=tx.objectStore(STORE).get(key);req.onsuccess=()=>resolve(req.result||null);req.onerror=()=>reject(req.error||new Error('IndexedDB read failed'))})}
async function write(key,value){const db=await openDatabase();return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(value,key);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error||new Error('IndexedDB write failed'));tx.onabort=()=>reject(tx.error||new Error('IndexedDB write aborted'))})}
function readLegacy(key){try{const raw=localStorage.getItem(key);if(!raw)return null;const value=JSON.parse(raw);return value&&value.schemaVersion===1&&value.bankId===key.slice(key.indexOf(':')+1)&&Array.isArray(value.sessions)&&typeof value.questionState==='object'?value:null}catch{return null}}
function localMirror(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}}
async function load(key,makeEmpty){
  const legacy=readLegacy(key);
  try{
    const saved=await read(key);
    if(saved&&saved.schemaVersion===1&&saved.bankId===makeEmpty().bankId){
      // A prior IndexedDB write may have failed after a newer local mirror succeeded.
      if(legacy&&(legacy._storageRevision||0)>(saved._storageRevision||0)){await write(key,legacy);status('saved','Latest progress restored');return{state:legacy,migrated:true,mode:'indexeddb'}}
      status('saved','Progress restored');return{state:saved,migrated:false,mode:'indexeddb'}
    }
    if(legacy){await write(key,legacy);status('saved','Existing progress moved to IndexedDB');return{state:legacy,migrated:true,mode:'indexeddb'}}
    const initial=makeEmpty();await write(key,initial);status('saved','Automatic saving is on');return{state:initial,migrated:false,mode:'indexeddb'};
  }catch(error){const initial=legacy||makeEmpty();status(legacy?'fallback':'error',legacy?'Progress restored from browser storage':'IndexedDB could not start; progress may not persist');return{state:initial,migrated:false,mode:'localStorage',error}}
}
function save(key,value){
  const sequence=++lastWrite;
  value._storageRevision=(value._storageRevision||0)+1;
  value._storageSavedAt=Date.now();
  status('saving','Saving…');
  // Opening the transaction now starts a durable write without a debounce delay.
  const snapshot=typeof structuredClone==='function'?structuredClone(value):JSON.parse(JSON.stringify(value));
  return write(key,snapshot).then(()=>{
    localMirror(key,snapshot); // optional recovery mirror; IndexedDB is authoritative
    if(sequence===lastWrite)status('saved','Saved automatically');
    return true;
  }).catch(error=>{
    const mirrored=localMirror(key,snapshot);
    if(sequence===lastWrite)status(mirrored?'fallback':'error',mirrored?'Saved in browser fallback; IndexedDB unavailable':'Save failed — export a backup');
    if(!mirrored)throw error;
    return false;
  });
}
window.ProgressStore={load,save,read,write,openDatabase};
})();
