/* Auth stays on the server. IndexedDB holds the retry journal; localStorage keeps offline study. */
(function(){
 'use strict';
 const CLOUD='https://frm-pocket-charaf.zgcharaf.chatgpt.site',hosted=location.origin===CLOUD;
 let controller=null,commitToken=null,initialToken=null,db=null,initialized=false,ownsTab=!hosted,setupError='',importVariants=[];
 try{initialToken=JSON.parse(localStorage.getItem(KEY)||'null')?._cloudCommit||null;commitToken=initialToken;}catch{}
 const labels={loading:'Connexion…',syncing:'Synchronisation…',saved:'Synchronisé',pending:'À synchroniser',offline:'Hors ligne',error:'Sync en attente',signin:'Se connecter',account:'Vérifier le compte'};
 const stamp=n=>n?new Date(n).toLocaleString('fr-FR',{dateStyle:'short',timeStyle:'short'}):'Aucune synchronisation réussie';
 function status(){
  if(window.CloudBootPending&&['saved','error','offline','signin','account'].includes(controller?.status)){window.CloudBootPending=false;render();}
  const button=$('#sync-status');if(!button)return;
  button.textContent=hosted?(setupError?'Sync indisponible':labels[controller?.status||'loading']):'Activer la sync';
  button.dataset.syncState=controller?.status||'local';button.setAttribute('aria-label',hosted?'Synchronisation : '+button.textContent:'Ouvrir la version synchronisée');
  const panel=$('#sync-live');if(panel)panel.innerHTML=panelBody();
 }
 function panelBody(){
  if(!hosted)return `<p>Retrouve ta progression sur téléphone et ordinateur dans la version privée.</p><ol><li>Exporte ta progression ici.</li><li>Ouvre la version synchronisée et connecte-toi avec ton compte ChatGPT.</li><li>Importe le fichier dans Réglages. L’import fusionne les progrès.</li></ol><div class="flex"><button class="secondary" data-action="export">Exporter mes progrès</button><a class="primary dark" href="${CLOUD}/" target="_blank" rel="noopener">Ouvrir la version synchronisée ↗</a></div><p class="micro">Le stockage GitHub et celui de la version privée sont séparés. Ce transfert est nécessaire une seule fois pour chaque appareil contenant des progrès supplémentaires.</p>`;
  const c=controller,m=c?.meta,variants=[...(m?.conflicts||[]),...(m?.localConflicts||[]),...importVariants];
  return `<div class="row"><strong>${labels[c?.status||'loading']}</strong>${c?.busy?'<span class="dot"></span>':'<button class="secondary" data-cloud="retry">Synchroniser maintenant</button>'}</div><p class="micro">${m?.userName?'Compte : '+esc(m.userName)+'<br>':''}Dernière vérification : ${stamp(m?.lastSync)}</p>${setupError||c?.error?`<p class="warning">${esc(setupError||c.error)}</p>`:''}${c?.status==='signin'?'<p><a class="primary dark" href="/signin-with-chatgpt?return_to=%2F" target="_top">Se connecter avec ChatGPT</a></p>':''}<p>Tes réponses, cartes, erreurs, notes, lectures et historiques se synchronisent avec ce compte. Hors ligne, continue à étudier : l’envoi reprend au retour du réseau et à la réouverture de l’app.</p><p class="micro">Les sessions en cours et les chronos restent sur leur appareil. Les nouveaux progrès sont vérifiés toutes les 30 secondes quand l’app est visible.</p><details><summary>Transférer depuis l’ancienne version GitHub</summary><ol><li>Sur <a href="https://zgcharaf.github.io/frm-pocket/" target="_blank" rel="noopener">l’ancienne app</a>, ouvre Réglages → Exporter.</li><li>Ici, choisis Importer et fusionner.</li><li>Ouvre cette même adresse privée sur l’autre appareil, avec le même compte ChatGPT.</li></ol><button class="secondary" data-action="import">Importer et fusionner</button></details>${m?.backup?'<p><button class="textbtn" data-cloud="backup">Télécharger la copie avant synchronisation</button></p>':''}${variants.length?`<details><summary>${variants.length} conflit(s) de notes · copies conservées</summary><p class="micro">La dernière synchronisation a choisi une version. Les deux textes restent ci-dessous pour te permettre de les réunir dans ta note.</p>${variants.map(x=>`<article class="sync-conflict"><strong>${esc(x.path)}</strong><p class="micro">Version de l’appareil</p><pre>${esc(x.local)}</pre><p class="micro">Autre version</p><pre>${esc(x.remote)}</pre></article>`).join('')}</details>`:''}<p class="micro">Exporter reste utile comme copie personnelle. Aucun mot de passe ni jeton de connexion n’est inclus dans l’export.</p>`;
 }
 function settingsPanel(){return `<section class="sync-settings"><h3>Mon compte et ma synchronisation</h3><div id="sync-live">${panelBody()}</div></section>`;}
 function panel(){openModal(`<div class="row"><h2>Mes progrès, partout.</h2>${closeButton()}</div>${settingsPanel()}`);}
 function download(value,name){const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 function localWrite(){localStorage.setItem(KEY,JSON.stringify({...state,_cloudCommit:commitToken}));}
 function apply(projected,token,previousBase,remote){
  const session=state.session,clean=validate(projected);
  // A question seen on the other device is no longer fresh in a paused local session.
  if(session)for(const item of session.items)if(!item.answered && ((remote?.quiz?.[item.id]?.attempts||0)>(previousBase?.quiz?.[item.id]?.attempts||0) || (remote?.cards?.[item.id]?.attempts||0)>(previousBase?.cards?.[item.id]?.attempts||0) || (remote?.exposed?.[item.id]||0)>(previousBase?.exposed?.[item.id]||0)))item.fresh=false;
  const next={...clean,session};localStorage.setItem(KEY,JSON.stringify({...next,_cloudCommit:token}));state=next;commitToken=token;localCloudCommit=token;window.CloudBootPending=false;render();
 }
 async function openDB(){
  db=await new Promise((resolve,reject)=>{const req=indexedDB.open('frm-pocket-cloud-v1',1);req.onupgradeneeded=()=>req.result.createObjectStore('journal');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);req.onblocked=()=>reject(Error('database_blocked'));});
  importVariants=await new Promise((resolve,reject)=>{const req=db.transaction('journal','readonly').objectStore('journal').get('imports');req.onsuccess=()=>resolve(req.result||[]);req.onerror=()=>reject(req.error);});
  return {
   load:()=>new Promise((resolve,reject)=>{const tx=db.transaction('journal','readonly'),req=tx.objectStore('journal').get('meta');req.onsuccess=()=>resolve(req.result||null);req.onerror=()=>reject(req.error);}),
   save:value=>new Promise((resolve,reject)=>{const tx=db.transaction('journal','readwrite');tx.objectStore('journal').put(value,'meta');tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);})
  };
 }
 async function transport(method,body){
  const abort=new AbortController(),timeout=setTimeout(()=>abort.abort(),20000);
  try{const response=await fetch('/api/sync',{method,credentials:'same-origin',cache:'no-store',headers:method==='POST'?{'Content-Type':'application/json'}:{'Accept':'application/json'},body:body?JSON.stringify(body):undefined,signal:abort.signal});
   if(response.status===401 || response.redirected || !response.headers.get('content-type')?.includes('application/json'))throw Error('sign_in_required');
   const json=await response.json();if(!response.ok)throw Error(json.error||'sync_unavailable');return json;
  }finally{clearTimeout(timeout);}
 }
 // Preserve the existing synchronous save path and attach cloud retries to successful local writes.
 const originalPersist=persist;
 persist=function(){if(hosted&&!ownsTab)return;originalPersist();try{localWrite();if(initialized)controller?.changed();}catch{storageOk=false;controller?.statusAs('error','Sauvegarde locale indisponible. Exporte ta progression.');}};
 importData=function(){
  if(state.session?.assessment){toast('Termine ou remets ta copie avant de fusionner une sauvegarde.');return;}
  const input=document.createElement('input');input.type='file';input.accept='.json,application/json';
  input.onchange=async()=>{const file=input.files[0];if(!file)return;if(file.size>8*1024*1024){toast('Fichier trop volumineux (8 Mo maximum).');return;}
   try{const imported=validate(JSON.parse(await file.text()));openModal(`<div class="row"><h2>Fusionner cette sauvegarde ?</h2>${closeButton()}</div><p>${Object.keys(imported.quiz).length} notions en quiz, ${Object.keys(imported.cards).length} en cartes. Les réponses, notes et historiques sont réunis. Les compteurs anciens qui se recouvrent utilisent le maximum pour éviter les doublons.</p><p>Une copie de la progression actuelle sera téléchargée avant la fusion. Ta session en cours reste sur cet appareil.</p><button class="primary dark full" id="confirm-import">Conserver et fusionner</button>`);
    $('#confirm-import').onclick=()=>{pauseClock();download(state,'frm-pocket-avant-fusion-'+dayKey()+'.json');const session=state.session,result=SyncEngine.mergeProgress(defaults(),imported,state,{seed:true});if(session)for(const item of session.items)if(!item.answered&&(imported.quiz[item.id]||imported.cards[item.id]||imported.exposed[item.id]))item.fresh=false;state={...validate(result.state),session};if(result.conflicts.length){importVariants.push(...result.conflicts);if(db){const tx=db.transaction('journal','readwrite');tx.objectStore('journal').put(importVariants,'imports');}}persist();closeModal();navigate('home');toast('Progression fusionnée.');};
   }catch{toast('Sauvegarde invalide : aucun changement effectué.');}
  };input.click();
 };
 document.addEventListener('click',e=>{const b=e.target.closest('[data-cloud],#sync-status');if(!b)return;
  if(b.id==='sync-status')panel();else if(b.dataset.cloud==='retry')controller?.flush();else if(b.dataset.cloud==='backup'&&controller?.meta?.backup)download(controller.meta.backup,'frm-pocket-avant-sync.json');
 });
 window.CloudUI={settingsPanel,panel,controller:()=>controller};status();
 if(!hosted)return;
 document.addEventListener('click',e=>{if(!ownsTab && !e.target.closest('#sync-status,[data-cloud],[data-action="export"],[data-action="close"]')){e.preventDefault();e.stopImmediatePropagation();panel();}},true);
 async function activate(){try{const raw=JSON.parse(localStorage.getItem(KEY)||'null');if(raw){state=validate(raw);initialToken=raw._cloudCommit||null;commitToken=initialToken;localCloudCommit=initialToken;}ownsTab=true;window.CloudWriteReady=true;const storage=await openDB();controller=new SyncController({storage,transport,getState:()=>state,apply,defaults,token:initialToken,getToken:()=>localCloudCommit,online:()=>navigator.onLine,onStatus:status});initialized=await controller.init();if(initialized)controller.flush();}catch{window.CloudBootPending=false;setupError='Le stockage de synchronisation est indisponible dans ce navigateur. Ta progression reste sur cet appareil : exporte-la pour la conserver.';status();}}
 // A single active tab owns this browser's retry sequence. Web Locks release automatically on close.
 if(navigator.locks){navigator.locks.request('frm-pocket-cloud-writer',{ifAvailable:true},async lock=>{if(!lock){setupError='FRM Pocket est déjà ouvert dans un autre onglet de ce navigateur. Ferme cet onglet, puis recharge ici pour continuer.';status();return;}await activate();await new Promise(()=>{});}).catch(()=>{setupError='Le verrou de synchronisation est indisponible. Utilise une fenêtre normale du navigateur.';status();});}
 else{ownsTab=true;window.CloudWriteReady=true;window.CloudBootPending=false;setupError='Ce navigateur ne prend pas en charge la synchronisation sûre. Mets-le à jour, ou exporte ta progression pour la transférer.';status();}
 window.addEventListener('online',()=>controller?.flush());window.addEventListener('offline',()=>controller?.statusAs('offline'));window.addEventListener('focus',()=>controller?.flush());
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)controller?.flush();});
 setInterval(()=>{if(!document.hidden)controller?.flush();},30000);
})();
