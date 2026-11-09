const $=i=>document.getElementById(i);
const CH=[
{n:'Goku',c:0xff8a1e,h:0x111111,f:'Ultra Instinto',fc:0xdfe8ff,sp:1,dm:1},
{n:'Vegeta',c:0x2b5bd6,h:0x111111,f:'Ultra Ego',fc:0x8a3dff,sp:.96,dm:1.1},
{n:'Gohan',c:0x7a3ff0,h:0x111111,f:'Gohan Beast',fc:0xe8ecff,sp:1,dm:1.05},
{n:'Piccolo',c:0x7a3ff0,h:0x5fb85a,f:'Forma Orange',fc:0xff9d2e,sp:.95,dm:1.1},
{n:'Freeza',c:0xf1e6ff,h:0x7a3fb0,f:'Golden Freeza',fc:0xffd700,sp:1.1,dm:.95},
{n:'Jiren',c:0xc8323c,h:0x9a9aa5,f:'Poder Total',fc:0xff3b3b,sp:.9,dm:1.2},
{n:'Broly',c:0x3aa655,h:0x2a2a2a,f:'Lendário SSJ',fc:0x9dff3a,sp:.88,dm:1.25},
{n:'Goku Black',c:0xc2487f,h:0x111111,f:'Super Saiyajin Rosé',fc:0xff6fa6,sp:1.05,dm:1.1},
{n:'Naruto',c:0xff7a1a,h:0xffd84a,f:'Modo Kurama',fc:0xffc21a,sp:1.1,dm:1},
{n:'Sasuke',c:0x4a3aa0,h:0x111111,f:'Selo Amaldiçoado',fc:0x4a2a8a,sp:1.12,dm:1.05,ts:0x8a7a8a},
{n:'Asta',c:0x555566,h:0xcfcfd8,f:'Forma Demoníaca',fc:0x1a0a14,sp:1.05,dm:1.2,ts:0x1a1218},
{n:'Kefla',c:0xf2a22a,h:0x111111,f:'Lendário SSJ',fc:0x9dff3a,sp:1,dm:1.2},
{n:'Gogeta',c:0x2a4fb8,h:0x111111,f:'Super Saiyajin Blue',fc:0x35a7ff,sp:1.05,dm:1.3},
{n:'Saitama',c:0xf2d21a,h:0xf1c27d,f:'Modo Sério',fc:0xfff4d8,sp:1.2,dm:1.4},
{n:'Gojo',c:0x4aa8ff,h:0xf2f6ff,f:'Seis Olhos',fc:0x6ac8ff,sp:1.1,dm:1.15},
{n:'Itadori',c:0xe0505e,h:0xe89aa8,f:'Fluxo Negro',fc:0xff4a5a,sp:1.15,dm:1.15},
{n:'Megumi',c:0x2a2a44,h:0x1a1a22,f:'Jardim das Sombras',fc:0x2a1a4a,sp:1.1,dm:1.1}];
const FORM_COUNT=4;
const BASE_FORM={n:'Base',hair:null,eye:null,glow:null};
const FORM_VARIANTS={
 Goku:{names:['Aurora','Pulsar','Horizonte'],colors:[[0x43efff,0x8fffff,0x27dfff],[0xffb84d,0xffe6a3,0xff6a24],[0x9d8aff,0xd8ceff,0x654bff]]},
 Vegeta:{names:['Coroa Astral','Vácuo Real','Cometa de Aço'],colors:[[0x68d8ff,0xd5f6ff,0x168fff],[0x9d72ff,0xe3cfff,0x6330db],[0xff657c,0xffd0d8,0xe6254e]]},
 Gohan:{names:['Despertar Prismático','Limiar Celeste','Ímpeto Lunar'],colors:[[0xe8ecff,0xffffff,0x9daeff],[0x54d9ff,0xd8f7ff,0x258cff],[0xc78aff,0xf1d6ff,0x813bdb]]},
 Piccolo:{names:['Guardião Esmeralda','Núcleo Âmbar','Muralha Carmesim'],colors:[[0x72ff9b,0xd0ffdc,0x21c86a],[0xffc15c,0xffedb5,0xff7a19],[0xff6b7a,0xffd7db,0xd92d43]]},
 Freeza:{names:['Prisma Imperial','Vácuo Glacial','Sol Negro'],colors:[[0xffa6ed,0xffe1f7,0xd147c1],[0x8beaff,0xe2fbff,0x3b9eff],[0xffc46a,0xffe7b5,0xc94b29]]},
 Jiren:{names:['Impacto Rubro','Colosso Solar','Núcleo Absoluto'],colors:[[0xff6879,0xffd1d6,0xe52f45],[0xffd36b,0xfff0bd,0xff851f],[0xd5e6ff,0xffffff,0x729cff]]},
 Broly:{names:['Fúria Selvagem','Verde Estelar','Titã Esmeralda'],colors:[[0xff7048,0xffd0ae,0xe83e2f],[0x8bff65,0xe2ffc9,0x35d33f],[0x4cffe0,0xd1fff5,0x18bda2]]},
 'Goku Black':{names:['Rosa Cósmica','Crepúsculo Violeta','Eclipse Carmesim'],colors:[[0xff83c5,0xffd9ec,0xe43a91],[0xb795ff,0xe5d9ff,0x7545df],[0xff6464,0xffd6d6,0xd62842]]},
 Naruto:{names:['Brasa Espiritual','Manto Dourado','Chama Solar'],colors:[[0xff8b58,0xffdec5,0xf04c28],[0xffdf62,0xfff4bd,0xffa817],[0xff6c31,0xffd4a3,0xff3d19]]},
 Sasuke:{names:['Trovão Violeta','Visão Carmesim','Eclipse Sombrio'],colors:[[0x9d82ff,0xe0d5ff,0x6138dd],[0xff6b80,0xffd7dc,0xdc294d],[0x64caff,0xd5f4ff,0x2556c9]]},
 Asta:{names:['Lâmina Umbral','Ruptura Rubra','Asa Espectral'],colors:[[0x8b7b9d,0xe1d5ed,0x443650],[0xff6473,0xffd2d7,0xd7213d],[0xd5c4ff,0xf0e9ff,0x8b5cff]]},
 Kefla:{names:['Pulso Selvagem','Chama Esmeralda','Cometa Verde'],colors:[[0xffa443,0xffe0b3,0xe85a20],[0x9cff45,0xe1ffc1,0x47d12e],[0x4bffe0,0xd4fff5,0x14b7a1]]},
 Gogeta:{names:['Horizonte Azul','Prisma Celeste','Estrela Branca'],colors:[[0x62c5ff,0xd8f2ff,0x2679f5],[0xa988ff,0xe4d8ff,0x6a42e8],[0xffffff,0xffffff,0x9dbaff]]},
 Saitama:{names:['Impacto Sério','Núcleo Solar','Brilho Final'],colors:[[0xffe38a,0xfff5cc,0xffa625],[0xff9a53,0xffe0b5,0xf05a23],[0xffffff,0xffffff,0xffd15a]]},
 Gojo:{names:['Prisma Infinito','Céu Glacial','Azul Profundo'],colors:[[0x8deaff,0xe2fbff,0x35bfff],[0xe2f3ff,0xffffff,0x8abfff],[0x4b88ff,0xd3e0ff,0x2545d4]]},
 Itadori:{names:['Impacto Carmesim','Pulso Sombrio','Fluxo Rubro'],colors:[[0xff6e7c,0xffd8dc,0xdd2942],[0x9e73a6,0xead8ef,0x512956],[0xff9865,0xffddc7,0xed4e38]]},
 Megumi:{names:['Jardim Noturno','Vórtice Sombrio','Eclipse Azul'],colors:[[0x6689ff,0xd7e2ff,0x3048c7],[0x9b82d4,0xe4dbff,0x49367c],[0x49d5ff,0xd5f7ff,0x2367d4]]}
};
const FORM_TRAITS={
 Goku:'spikes',Vegeta:'crest',Gohan:'tall-spike',Piccolo:'antenna',Freeza:'horns',
 Jiren:'armor',Broly:'mane','Goku Black':'swept-hair',Naruto:'tails',Sasuke:'wings',
 Asta:'demon',Kefla:'twin-tails',Gogeta:'collar',Saitama:'cape',Gojo:'blindfold',
 Itadori:'marks',Megumi:'shadows'
};
const FORM_CACHE=new Map();
function formsFor(character){
 if(!FORM_CACHE.has(character.n)){
  const variants=FORM_VARIANTS[character.n];
  FORM_CACHE.set(character.n,variants?[BASE_FORM,...variants.names.map((n,i)=>({n,glow:variants.colors[i][2]}))]:[BASE_FORM]);
 }
 return FORM_CACHE.get(character.n);
}
function addFormTrait(group,character,id){
 const type=FORM_TRAITS[character.n],level=id,factor=1+(level-1)*.22,hair=character.h,accent=character.fc,cloth=character.c;
 const part=(shape,color,sx,sy,sz,x,y,z,rx=0,rz=0)=>{
  const mesh=new THREE.Mesh(U[shape],toonMaterial(color));
  mesh.scale.set(sx,sy,sz);mesh.position.set(x,y,z);mesh.rotation.set(rx,0,rz);group.add(mesh);return mesh
 };
 if(type==='spikes'||type==='swept-hair'||type==='mane'||type==='twin-tails'){
  const count=type==='mane'?6+level:type==='twin-tails'?2+level:3+level;
  for(let i=0;i<count;i++){
   const side=i-(count-1)/2,x=side*.22;
   const length=(type==='mane'?.72:type==='twin-tails'?.9:.7)*(1+((i+level)%3)*.14)*factor;
   const z=type==='swept-hair'?.32:type==='twin-tails'?.02:0;
   part('k',hair,.24*factor,length,.24*factor,x,3.12+length*.28,z,
    type==='swept-hair'?-.55:type==='twin-tails'?-.35:0,-side*.16)
  }
  if(type==='mane')[-1,1].forEach(side=>part('s',cloth,.28,.46,.3,side*.48,2.52,0,0,0,side*.2));
  if(type==='twin-tails')[-1,1].forEach(side=>part('s',accent,.07,.12,.07,side*.37,2.82,.38));
 }else if(type==='crest'||type==='tall-spike'){
  const height=(type==='tall-spike'?1.5:1.15)*factor;
  part('k',hair,type==='tall-spike'?.42:.34,height,.34,0,3.15+height*.3,.12,type==='tall-spike'?.08:0);
  if(type==='crest')[-1,1].forEach(side=>part('k',hair,.3,.85*factor,.3,side*.3,3.12,.08,0,-side*.25));
  else if(level>1)[-1,1].forEach(side=>part('k',hair,.2,.6*factor,.2,side*.3,3.05,0,0,-side*.7));
 }else if(type==='antenna'){
  [-1,1].forEach(side=>part('k',hair,.18,.95*factor,.18,side*.2,3.22,.02,-.1,-side*.18));
  [-1,1].forEach(side=>part('s',cloth,.56,.25,.5,side*.78,2.45,0,0,0,side*.12));
 }else if(type==='horns'||type==='demon'){
  [-1,1].forEach(side=>part('k',type==='demon'?cloth:accent,.24,.8*factor,.24,side*.38,3.02,.02,-.25,side*.52));
  if(type==='demon'||level>1){
   for(let i=0;i<2+level;i++)part('k',type==='demon'?cloth:accent,.22,.85*factor,.12,(i-(1+level/2))*.34,2.3, -.32,-.25,(i%2?.35:-.35));
  }
  if(type==='horns')for(let i=0;i<level+1;i++)part('k',accent,.16,.48*factor,.16,(i%2?1:-1)*.12,1.25-i*.18,-.55,-.9,(i%2?.2:-.2));
 }else if(type==='armor'){
  [-1,1].forEach(side=>{
   part('b',cloth,.62*factor,.42,.68,side*.72,2.35,0,0,0,side*.16);
   part('s',accent,.35,.32,.35,side*.75,2.55,.08);
  });
  if(level>1)part('b',cloth,.72,.24,.12,0,2.15,.42);
 }else if(type==='tails'){
  part('b',cloth,.9,.13,.08,0,2.9,.45);
  for(let side=-1;side<=1;side+=2)for(let i=0;i<level+1;i++){
   const x=side*(.35+i*.2),y=1.65-i*.2,z=-.38-i*.16;
   part('k',i%2?accent:cloth,.23*factor,.95*factor,.24,x,y,z,-.75,side*.32)
  }
 }else if(type==='wings'){
  [-1,1].forEach(side=>{
   for(let i=0;i<level+2;i++)part('k',level===1?cloth:accent,.3,.9*factor,.22,
    side*(.52+i*.15),2.1+i*.11,-.42,-.8,side*(.65+i*.08));
  });
 }else if(type==='collar'){
  [-1,1].forEach(side=>{
   part('k',cloth,.38,.9*factor,.34,side*.42,2.72,-.12,-.3,side*.48);
   part('b',accent,.25,.2,.5,side*.72,2.4,0,0,0,side*.2);
  });
 }else if(type==='cape'){
  part('b',cloth,1.18*factor,1.8*factor,.08,0,1.8,-.48,-.08);
  [-1,1].forEach(side=>part('k',accent,.16,.42,.16,side*.52,2.62,-.48,-.12,side*.1));
 }else if(type==='blindfold'){
  part('b',cloth,1.02,.2,.12,0,2.79,.48);
  if(level>1)[-1,1].forEach(side=>part('k',accent,.1,.4,.1,side*.46,2.6,.38,.1,side*.12));
 }else if(type==='marks'){
  [-1,1].forEach(side=>{
   part('b',cloth,.08,.28,.045,side*.3,2.78,.49,0,side*.28);
   part('b',accent,.07,.22,.05,side*.38,2.66,.47,0,-side*.22);
  });
  if(level>1)part('b',cloth,.36,.055,.045,0,2.58,.5);
 }else if(type==='shadows'){
  for(let side=-1;side<=1;side++)for(let i=0;i<level+1;i++){
   part('k',i%2?cloth:accent,.22,.9*factor,.2,side*(.45+i*.08),2.15+i*.08,-.42,-.55,side*.28)
  }
 }
}
const hx=c=>'#'+c.toString(16).padStart(6,'0');
const RANKS=['Guerreiro Z','Saiyajin','Super Saiyajin','Super Saiyajin God','Ultra Instinto','Lenda do Torneio'];
let save={pts:0,rank:0};try{save=JSON.parse(localStorage.getItem('dbr3'))||save}catch(e){}
const persist=()=>{try{localStorage.setItem('dbr3',JSON.stringify(save))}catch(e){}};
// ---- lobby estilo Free Fire
document.head.insertAdjacentHTML('beforeend',`<style>
#lobby{padding:0;overflow:hidden;background:linear-gradient(180deg,rgba(0,0,0,.6),transparent 20%,transparent 66%,rgba(0,0,0,.78));font-family:Rajdhani,sans-serif;font-style:italic;font-weight:700}
.ffp{position:absolute;left:14px;top:12px;display:flex;gap:12px;align-items:center;background:linear-gradient(90deg,rgba(10,20,40,.9),rgba(10,20,40,.35));padding:8px 40px 14px 8px;clip-path:polygon(0 0,100% 0,94% 100%,0 100%);border-left:4px solid #ffb400}
.ffa{width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,#ffd23a,#ff6a00);display:grid;place-items:center;font-size:30px;color:#2a1400}
#rank .ri{display:none}#rank strong{color:#ffd23a;font:900 20px Rajdhani,sans-serif}#rank small{font:700 11px Rajdhani,sans-serif;color:#9fb2cc}
.fftr{position:absolute;right:14px;top:12px;display:flex;gap:8px;align-items:center}
.chip{background:rgba(10,20,40,.85);border:1px solid #ffffff33;padding:7px 14px;border-radius:20px;font-size:16px}
#cfgb{position:static;font-style:italic}
.ffm{position:absolute;left:14px;top:112px;display:flex;flex-direction:column;gap:10px}
.ffm button{width:92px;padding:10px 4px;background:rgba(10,20,40,.85);border:2px solid #ffffff33;color:#fff;font:inherit;font-size:12px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;clip-path:polygon(0 0,100% 0,100% 80%,88% 100%,0 100%)}
.ffm button b{font-size:26px}.ffm button.on{border-color:#ffb400;background:rgba(255,180,0,.22)}
.ffpn{position:absolute;left:118px;top:112px;width:min(380px,58vw);max-height:58vh;overflow:auto;background:rgba(8,16,34,.9);border-top:3px solid #ffb400;padding:12px;display:none}
.ffpn .row{justify-content:flex-start;margin:0}
.arw{position:absolute;top:44%;width:46px;height:74px;background:rgba(10,20,40,.7);border:2px solid #ffffff44;color:#fff;font-size:24px;cursor:pointer;z-index:2}.arw.l{left:33vw}.arw.r{right:33vw}
#info{position:absolute;left:50%;bottom:158px;transform:translateX(-50%);text-align:center;background:linear-gradient(90deg,transparent,rgba(10,20,40,.88),transparent);padding:8px 70px;white-space:nowrap}
#info .nm{font:900 30px Rajdhani,sans-serif;letter-spacing:2px}#info .fm{font:600 15px Rajdhani,sans-serif;color:#c3d2e6}
.form-picker{display:flex;justify-content:center;gap:6px;margin-top:5px}
.form-choice{padding:4px 10px;background:#101f37;border:1px solid #ffffff44;color:#d9e8fa;font:700 12px Rajdhani,sans-serif;cursor:pointer}
.form-choice.on{border-color:var(--form-color);color:#fff;box-shadow:0 0 10px var(--form-color)}
#modes{position:absolute;left:50%;bottom:88px;transform:translateX(-50%);display:flex}
#modes .btn{border-radius:0;font:900 18px Rajdhani,sans-serif;font-style:italic;padding:10px 28px;background:rgba(10,20,40,.88);border:2px solid #ffffff33;letter-spacing:1px}
#modes .btn.on{background:linear-gradient(#ffd23a,#ff8a00);color:#1a1000;border-color:#ffe08a}
#slots{position:absolute;right:14px;top:72px;display:flex;flex-direction:column;gap:8px}
.slot{width:150px;background:rgba(10,20,40,.85);border-left:4px solid #ffb400;padding:6px 10px;display:flex;gap:8px;align-items:center;font-size:15px}.slot i{width:26px;height:26px;border-radius:50%;border:2px solid #fff}
#hint{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);font:600 13px Rajdhani,sans-serif;font-style:normal;opacity:.7;white-space:nowrap}
#golbl{position:absolute;right:26px;bottom:92px;font-size:16px;color:#ffd23a;text-shadow:0 2px 4px #000}
#go{position:absolute;right:20px;bottom:20px;padding:18px 56px;font:900 30px Rajdhani,sans-serif;font-style:italic;background:linear-gradient(#ffd23a,#ff8a00);color:#2a1400;border:0;border-radius:0;clip-path:polygon(8% 0,100% 0,92% 100%,0 100%);letter-spacing:2px;box-shadow:none}
@media(max-width:700px){.arw.l{left:4px;top:30%}.arw.r{right:4px;top:30%}#hint{display:none}#slots{display:none}.ffm button{width:70px}.ffpn{left:96px;width:60vw}#modes .btn{padding:8px 12px;font-size:15px}#info{padding:5px 16px}#info .nm{font-size:22px}.form-choice{padding:4px 7px;font-size:11px}}
</style>`);
$('lobby').innerHTML=`<div class="ffp"><div class="ffa">★</div><div id="rank"></div></div><div class="rbar" style="position:absolute;left:84px;top:84px"><div id="rb"></div></div>
<div class="fftr"><div class="chip" id="chips"></div><button class="btn" id="cfgb">⚙ CONFIGURAÇÕES</button></div>
<div class="ffm"><button data-p="chars" class="on"><b>👤</b>PERSONAGENS</button><button data-p="maps"><b>🗺</b>CENÁRIOS</button><button data-p="cam"><b>🎥</b>CÂMERA</button></div>
<div class="ffpn" id="pchars" style="display:block"><div class="row" id="cards"></div></div><div class="ffpn" id="pmaps"><div class="row" id="scns"></div></div><div class="ffpn" id="pcam"><div class="row" id="cams"></div></div>
<button class="arw l" id="pl">◀</button><button class="arw r" id="pr">▶</button>
<div id="info"></div><div id="modes"></div><div id="slots"></div>
<div id="hint">Fila de até 15s · até 30 jogadores reais; bots completam 50 (exceto X1) · WASD mover · Clique atira · Q especial · E carrega ki</div>
<div id="golbl"></div><button id="go">INICIAR</button>`;
document.head.insertAdjacentHTML('beforeend','<style>#mm-panel{position:absolute;right:24px;bottom:94px;z-index:10;display:none;align-items:center;flex-wrap:wrap;gap:12px;padding:10px 14px;max-width:calc(100vw - 32px);background:#071427eF;border:1px solid #ffb400;color:#fff;font:700 15px Rajdhani,sans-serif}#mm-status{overflow-wrap:anywhere}#mm-cancel{padding:7px 12px;font-size:12px}</style>');
const mmPanel=document.createElement('div');mmPanel.id='mm-panel';mmPanel.innerHTML='<span id="mm-status"></span><button class="btn" id="mm-cancel">CANCELAR</button>';$('lobby').appendChild(mmPanel);
// ---- celular: reconhecimento automático, orientação e tela cheia
const MOB=(('ontouchstart' in window)||navigator.maxTouchPoints>0)&&(!window.matchMedia||matchMedia('(pointer:coarse)').matches);
document.head.insertAdjacentHTML('beforeend','<style>html,body{overscroll-behavior:none;touch-action:none}#rot{position:fixed;inset:0;z-index:200;background:#050816;color:#fff;display:none;flex-direction:column;align-items:center;justify-content:center;text-align:center;font:700 22px Rajdhani,Arial,sans-serif;gap:14px}#rot b{font-size:64px;animation:rt 1.6s ease-in-out infinite}@keyframes rt{0%,100%{transform:rotate(0)}50%{transform:rotate(-90deg)}}#fsb{position:fixed;left:50%;top:8px;transform:translateX(-50%);z-index:60;font:700 14px Rajdhani,Arial,sans-serif;padding:6px 14px;background:rgba(10,20,40,.85);border:2px solid #ffffff55;color:#fff;cursor:pointer}#fsb:hover{border-color:#ffb400}#toast2{position:fixed;left:50%;bottom:20%;transform:translateX(-50%);z-index:300;background:#000d;padding:10px 18px;border:1px solid #ffb400;font:600 15px Rajdhani,Arial,sans-serif;max-width:80vw;text-align:center;display:none}@media(max-height:520px){.ffm button{width:64px;padding:6px 2px;font-size:10px}.ffm button b{font-size:18px}.ffm{top:96px}.ffp{transform:scale(.8);transform-origin:left top}.rbar{top:70px!important}#info{bottom:92px;padding:4px 40px}#info .nm{font-size:22px}#modes{bottom:50px}#modes .btn{padding:6px 18px;font-size:14px}#go{padding:10px 36px;font-size:20px}#golbl{bottom:58px}#hint,#slots{display:none}.arw{width:36px;height:56px}.ffpn{top:96px;left:100px;max-height:50vh}}</style>');
document.body.insertAdjacentHTML('beforeend','<div id="rot"><b>📱</b><div>Gire o celular na horizontal<br><small style="font-weight:500;opacity:.7">O jogo funciona em modo paisagem</small></div></div><button id="fsb" title="Tela cheia">⛶ TELA CHEIA</button><div id="toast2"></div>');
const FSEL=()=>document.fullscreenElement||document.webkitFullscreenElement;
function toast2(t){const e=$('toast2');e.textContent=t;e.style.display='block';clearTimeout(toast2.t);toast2.t=setTimeout(()=>{e.style.display='none'},3800)}
async function goFull(){
 const el=document.documentElement,rq=el.requestFullscreen||el.webkitRequestFullscreen;
 try{
  if(FSEL()){(document.exitFullscreen||document.webkitExitFullscreen).call(document);return}
  if(!rq){toast2(MOB?'No iPhone: toque em Compartilhar e depois em Adicionar à Tela de Início para jogar em tela cheia.':'Seu navegador não permite tela cheia.');return}
  await rq.call(el);
  try{if(MOB&&screen.orientation&&screen.orientation.lock)await screen.orientation.lock('landscape')}catch(e){}
 }catch(e){toast2('Não foi possível ativar a tela cheia aqui. Abra o jogo direto no navegador (no computador, use F11).')}}
$('fsb').onclick=goFull;
document.addEventListener('fullscreenchange',()=>{$('fsb').textContent=FSEL()?'⛶ SAIR DA TELA CHEIA':'⛶ TELA CHEIA'});
function chkRot(){$('rot').style.display=(MOB&&innerHeight>innerWidth)?'flex':'none'}
addEventListener('resize',chkRot);addEventListener('orientationchange',chkRot);chkRot();
let autoFs=false;document.addEventListener('pointerdown',()=>{if(MOB&&!autoFs&&!FSEL()){autoFs=true;goFull()}});
const PN=['chars','maps','cam'];
document.querySelectorAll('.ffm button').forEach(b=>b.onclick=()=>{const n=b.dataset.p;PN.forEach(k=>{$('p'+k).style.display=(k==n&&$('p'+k).style.display!='block')?'block':'none'});document.querySelectorAll('.ffm button').forEach(x=>x.classList.toggle('on',$('p'+x.dataset.p).style.display=='block'))});
$('pl').onclick=()=>{sel=(sel+CH.length-1)%CH.length;ui();prev()};$('pr').onclick=()=>{sel=(sel+1)%CH.length;ui();prev()};
function ffUpd(){
 const st=Math.min(3,Math.floor(save.pts/75));
 $('chips').innerHTML='🏅 '+RANKS[save.rank]+' &nbsp; ★'+st+'/4 &nbsp; 💠 '+save.pts+'/300';
 $('slots').innerHTML=mode=='squad'?[0,1,2,3,4].map(i=>'<div class="slot"><i style="background:'+(i==0?hx(CH[sel].c):'#33405a')+'"></i>'+(i==0?'VOCÊ':'BOT '+(i+1))+'</div>').join(''):'';
 $('golbl').textContent=['Arena do Torneio','Cidade em Ruínas','Floresta','Gelo','Treino'][scn]+' · '+(mode=='squad'?'Esquadrão':mode=='x1'?'X1 · apenas jogadores reais':'Individual');$('go').textContent=scn===4?'INICIAR TREINO':'BUSCAR PARTIDA'}
let sel=0,formSel=0,mode='solo',fp=false,slk=false,scn=0,TRAIN=false,ICE=false;
let netSocket=null,netMatch=null,netPlayerId=null,netHostId=null,netIsHost=false,netPending=false,netQueued=false,netDeadline=0,netCount=0,netMax=30,netQueueMode=null,lastNetSend=0,lastBotSend=0,mmLastSecond=-1;
const socketReady=window.socketReady||Promise.resolve(null);
function updateMatchmaking(text,visible=true){$('mm-panel').style.display=visible?'flex':'none';$('mm-status').textContent=text;$('go').disabled=visible}
function cancelMatchmaking(){if(netSocket&&netQueued)netSocket.emit('matchmaking:cancel');netPending=false;netQueued=false;netQueueMode=null;updateMatchmaking('',false)}
function sendMatchRequest(){netPending=false;netQueued=true;netQueueMode=mode;netSocket.emit('matchmaking:join',{mode,scene:scn,character:sel,form:formSel},result=>{if(!result||!result.ok){netQueued=false;netQueueMode=null;updateMatchmaking('',false);toast2(result&&result.error||'Não foi possível entrar na fila.');return}if(result.roomId)netMatch={roomId:result.roomId}})}
function checkNetworkWin(){if(netMatch&&state==='play'&&me&&me.alive&&!P.some(p=>p.alive&&p.team!==me.team))endGame(true,1)}
function enqueueMatch(){
 if(scn===4){start();return}
 if(!netSocket){if(location.protocol==='file:'&&mode!=='x1')start();else toast2(mode==='x1'?'O modo X1 exige conexão com o servidor e outro jogador real.':'Servidor indisponível. Inicie o backend antes de procurar uma partida.');return}
 if(netQueued||netPending)return;
 netPending=true;updateMatchmaking('Conectando ao servidor…');
 if(netSocket.connected)sendMatchRequest();else netSocket.connect();
}
socketReady.then(socket=>{
 if(!socket)return;
 netSocket=socket;
 socket.on('connect',()=>{if(netPending)sendMatchRequest()});
 socket.on('connect_error',()=>{if(netPending){netPending=false;updateMatchmaking('',false);toast2('Não foi possível conectar ao servidor.')}});
 socket.on('disconnect',()=>{if(netQueued){netPending=false;netQueued=false;netQueueMode=null;updateMatchmaking('',false)}if(state==='play')toast2('Conexão com o servidor perdida.')});
 socket.on('matchmaking:waiting',data=>{netQueued=true;netMatch={roomId:data.roomId};netQueueMode=data.mode||netQueueMode;netDeadline=Date.now()+(data.remainingMs||0);netCount=data.count;netMax=data.maxPlayers;mmLastSecond=-1});
 socket.on('matchmaking:started',data=>{netQueued=false;netPending=false;netQueueMode=null;updateMatchmaking('',false);netMatch=data;netPlayerId=data.playerId;netHostId=data.hostId;netIsHost=netHostId===netPlayerId;mode=data.mode;scn=data.scene;const self=data.players.find(p=>p.id===data.playerId);if(self){sel=self.character;formSel=self.form||0}ui();prev();start(data)});
 socket.on('player:state',data=>{const p=P&&P.find(q=>q.netId===data.playerId);if(p&&data.state)p.netTarget=data.state});
 socket.on('combat:shot',data=>{if(data&&data.playerId!==netPlayerId)spawnRemoteShot(data)});
 socket.on('combat:beam',data=>{if(data&&data.playerId!==netPlayerId)spawnRemoteBeam(data)});
 socket.on('bots:state',bots=>{if(!Array.isArray(bots)||!P)return;for(const data of bots){const p=P.find(q=>q.bot&&q.slot===data.slot);if(p&&p.remoteBot){p.botTarget=data;p.hp=data.hp;p.alive=data.alive;if(!p.alive)p.m.visible=false}}checkNetworkWin()});
 socket.on('bot:health',data=>{const p=P&&P.find(q=>q.bot&&q.slot===data.slot);if(!p)return;p.hp=data.hp;p.alive=data.alive;if(data.attackerId===netPlayerId&&p!==me&&!netIsHost){me.dd=(me.dd||0)+(data.damage||0);if(!p.alive)me.kills++}if(!p.alive)p.m.visible=false;else showBar(p);checkNetworkWin()});
 socket.on('room:host',data=>{netHostId=data.hostId;netIsHost=netHostId===netPlayerId;if(P)for(const p of P)if(p.bot)p.remoteBot=!netIsHost});
 socket.on('combat:state',data=>{const p=P&&P.find(q=>q.netId===data.playerId);if(!p)return;p.hp=data.hp;p.alive=data.alive;if(data.attackerId===netPlayerId&&p!==me){me.dd=(me.dd||0)+(data.damage||0);if(!p.alive)me.kills++}if(!p.alive){p.m.visible=false;if(p===me)endGame(false,P.filter(q=>q.alive&&q.team!==me.team).length+1)}else if(p!==me)showBar(p);checkNetworkWin()});
 socket.on('player:left',data=>{const p=P&&P.find(q=>q.netId===data.playerId);if(p){p.alive=false;p.hp=0;p.m.visible=false}checkNetworkWin()});
 socket.on('player:eliminated',data=>{const p=P&&P.find(q=>q.netId===data.playerId);if(p){p.alive=false;p.hp=0;p.m.visible=false;if(p===me)endGame(false,P.filter(q=>q.alive&&q.team!==me.team).length+1)}checkNetworkWin()});
});
 setInterval(()=>{if(!netQueued)return;if(netQueueMode==='x1'){if(mmLastSecond!==-2){mmLastSecond=-2;updateMatchmaking('Aguardando outro jogador real · '+netCount+'/2 · modo sem bots')}return}const seconds=Math.ceil(Math.max(0,netDeadline-Date.now())/1000);if(seconds!==mmLastSecond){mmLastSecond=seconds;updateMatchmaking('Buscando partida · '+seconds+'s · '+netCount+'/'+netMax+' jogadores · bots completam 50')}},250);
// ---- configurações
const KBD={fwd:'KeyW',back:'KeyS',left:'KeyA',right:'KeyD',up:'Space',down:'KeyC',melee:'KeyF',spec:'KeyQ',charge:'KeyE',tr:'KeyT',dash:'KeyX',lock:'ShiftLeft',cam:'KeyV',guard:'KeyR',spec2:'KeyZ',settings:'KeyP',fire:''};
const GPD={fire:7,melee:2,spec:3,charge:6,tr:4,dash:5,up:0,down:1,lock:10,cam:11,guard:8,spec2:12,settings:9};
const CFG={vol:.6,sens:1,touch:0,tsz:1,top:.7,fastFire:false,fastMove:false},KB={...KBD},GP={...GPD},gpd={f:0,r:0},tch={f:0,r:0};
let waitK=null,waitG=null,pl=false,pcm=false,psettings=false,AC=null;
try{const s=JSON.parse(localStorage.getItem('dbr3cfg'));if(s){Object.assign(CFG,s.CFG);Object.assign(KB,s.KB);Object.assign(GP,s.GP)}}catch(e){}
const HUDD={joy:[14,78],fire:[90,64],melee:[79,74],spec:[91,80],charge:[80,88],tr:[68,82],dash:[68,68],up:[56,76],down:[56,90],guard:[44,84],spec2:[58,60]},HUDSIZE={};Object.keys(HUDD).forEach(k=>HUDSIZE[k]=1);CFG.hud=Object.assign({},HUDD,CFG.hud||{});CFG.hudSize=Object.assign({},HUDSIZE,CFG.hudSize||{});
const act=a=>K[KB[a]]||gpd[a]||tch[a];
const showTouch=()=>CFG.touch==1||(CFG.touch==0&&('ontouchstart' in window||navigator.maxTouchPoints>0));
function sfx(f,d,type,v){if(!CFG.vol)return;try{AC=AC||new AudioContext();const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.type=type||'sawtooth';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(Math.max(30,f*.4),t+d);g.gain.setValueAtTime(CFG.vol*(v||.15),t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(AC.destination);o.start();o.stop(t+d)}catch(e){}}
function applyCfg(){$('touch').style.setProperty('--s',CFG.tsz);$('touch').style.setProperty('--o',CFG.top);applyHud()}
function saveCfg(){try{localStorage.setItem('dbr3cfg',JSON.stringify({CFG,KB,GP}))}catch(e){}applyCfg()}
function applyHud(){const j=$('joy'),h=CFG.hud;j.style.left=h.joy[0]+'%';j.style.top=h.joy[1]+'%';j.style.bottom='auto';j.style.transform='translate(-50%,-50%)';j.style.setProperty('--button-scale',CFG.hudSize.joy||1);$('tbtns').querySelectorAll('b').forEach(b=>{const p=h[b.dataset.a];if(p){b.style.left=p[0]+'%';b.style.top=p[1]+'%';b.style.setProperty('--button-scale',CFG.hudSize[b.dataset.a]||1)}})}
function openHudEd(){
 $('cfg').style.display='none';
 let ed=$('hudEd');if(!ed){ed=document.createElement('div');ed.id='hudEd';ed.style.cssText='position:fixed;inset:0;z-index:9;background:rgba(3,8,20,.92);touch-action:none;font-family:Rajdhani,sans-serif';document.body.appendChild(ed)}
 ed.style.display='block';let tmp={};for(const k in CFG.hud)tmp[k]=CFG.hud[k].slice();
 let tmpSizes=Object.assign({},CFG.hudSize),selected='fire';
 const LB={joy:'\ud83d\udd79',fire:'\ud83d\udd25',melee:'\ud83d\udc4a',spec:'\u2b50',charge:'\u26a1',tr:'T',dash:'\ud83d\udca8',up:'\u25b2',down:'\u25bc',guard:'\ud83d\udee1',spec2:'\ud83c\udf00'};
 const names={joy:'Analógico',fire:'Rajada',melee:'Soco',spec:'Especial',charge:'Carregar ki',tr:'Transformar',dash:'Dash',up:'Subir',down:'Descer',guard:'Defesa',spec2:'Segundo especial'};
 const back=()=>{ed.style.display='none';renderCfg();$('cfg').style.display='flex'};
 const markSelected=()=>{ed.querySelectorAll('[data-hud]').forEach(item=>{item.style.borderColor=item.dataset.hud===selected?'#57e7ff':'#ffd23a';item.style.boxShadow=item.dataset.hud===selected?'0 0 16px #57e7ff':''});const name=ed.querySelector('#hud-selected'),value=ed.querySelector('#hud-size-value');if(name)name.textContent=names[selected];if(value)value.textContent=Math.round(tmpSizes[selected]*100)+'%'};
 const draw=()=>{
  ed.innerHTML='<div style="position:absolute;top:12px;width:100%;text-align:center;font:700 20px Rajdhani,sans-serif;color:#ffd23a;z-index:3;pointer-events:none">EDITAR HUD \u00b7 arraste para mover e selecione para redimensionar</div><div style="position:absolute;top:52px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:8px;padding:8px;background:#08142a;border:1px solid #57e7ff88;color:white;font:700 15px Rajdhani,sans-serif;white-space:nowrap;z-index:3"><span id="hud-selected"></span><button class="btn" id="hud-smaller" aria-label="Diminuir bot\u00e3o">−</button><span id="hud-size-value"></span><button class="btn" id="hud-larger" aria-label="Aumentar bot\u00e3o">+</button></div><div style="position:absolute;bottom:14px;width:100%;text-align:center;z-index:3"><button class="btn on" id="hs">SALVAR</button> <button class="btn" id="hr">RESETAR</button> <button class="btn" id="hc">CANCELAR</button></div>';
  for(const k in tmp){const d=document.createElement('div'),s=(k=='joy'?150:62)*CFG.tsz*tmpSizes[k];d.textContent=LB[k];d.dataset.hud=k;
   d.style.cssText='position:absolute;z-index:1;transform:translate(-50%,-50%);width:'+s+'px;height:'+s+'px;border-radius:50%;border:2px dashed #ffd23a;background:rgba(255,255,255,.15);display:grid;place-items:center;font:700 '+s*.3+'px Orbitron,sans-serif;cursor:grab;touch-action:none;left:'+tmp[k][0]+'%;top:'+tmp[k][1]+'%';
   d.onpointerdown=e=>{selected=k;markSelected();d.setPointerCapture(e.pointerId);d.dragging=true};
   d.onpointermove=e=>{if(!d.dragging)return;tmp[k]=[Math.max(4,Math.min(96,e.clientX/innerWidth*100)),Math.max(6,Math.min(94,e.clientY/innerHeight*100))];d.style.left=tmp[k][0]+'%';d.style.top=tmp[k][1]+'%'};
   d.onpointerup=d.onpointercancel=()=>d.dragging=false;ed.appendChild(d)}
  const resizeSelected=delta=>{tmpSizes[selected]=Math.max(.6,Math.min(1.6,Math.round((tmpSizes[selected]+delta)*10)/10));draw()};
  $('hud-smaller').onclick=()=>resizeSelected(-.1);$('hud-larger').onclick=()=>resizeSelected(.1);
  $('hs').onclick=()=>{CFG.hud=tmp;CFG.hudSize=tmpSizes;saveCfg();back()};
  $('hr').onclick=()=>{tmp={};for(const k in HUDD)tmp[k]=HUDD[k].slice();tmpSizes=Object.assign({},HUDSIZE);draw()};
  $('hc').onclick=back;markSelected()};
 draw()}
function resetCfg(){CFG.hud=Object.assign({},HUDD);CFG.hudSize=Object.assign({},HUDSIZE);Object.assign(CFG,{vol:.6,sens:1,touch:0,tsz:1,top:.7,fastFire:false,fastMove:false});Object.assign(KB,KBD);Object.assign(GP,GPD);saveCfg();renderCfg()}
function pollGp(dt){
 const pads=navigator.getGamepads?[...navigator.getGamepads()]:[],g0=pads.find(x=>x);
 for(const k in GP)gpd[k]=false;gpd.f=gpd.r=0;if(!g0)return;
 const dz=v=>Math.abs(v)<.15?0:v;gpd.r=dz(g0.axes[0]);gpd.f=-dz(g0.axes[1]);
 yaw-=dz(g0.axes[2]||0)*dt*2.6*CFG.sens;pitch=Math.max(-.9,Math.min(1,pitch+dz(g0.axes[3]||0)*dt*2*CFG.sens));
 for(const k in GP){const b=g0.buttons[GP[k]];gpd[k]=!!(b&&b.pressed)}
 if(waitG)for(let i=0;i<g0.buttons.length;i++)if(g0.buttons[i].pressed){GP[waitG]=i;waitG=null;saveCfg();renderCfg();break}
 if(state=='play'){if(!waitG&&gpd.settings&&!psettings){if($('cfg').style.display==='flex')closeSettings();else openMatchSettings()}if($('cfg').style.display!=='flex'){if(gpd.lock&&!pl)slk=!slk;if(gpd.cam&&!pcm)fp=!fp}}pl=gpd.lock;pcm=gpd.cam;psettings=gpd.settings}
const ACT=[['fwd','Frente'],['back','Trás'],['left','Esquerda'],['right','Direita'],['up','Subir / voar'],['down','Descer'],['melee','Soco'],['spec','Golpe especial'],['charge','Carregar ki'],['tr','Transformar'],['dash','Dash'],['lock','Shift Lock'],['cam','1ª / 3ª pessoa'],['guard','Defesa'],['spec2','Segundo especial (domínio)'],['settings','Abrir configurações da partida']];
const GPN=[['fire','Rajada de ki'],['melee','Soco'],['spec','Golpe especial'],['charge','Carregar ki'],['tr','Transformar'],['dash','Dash'],['up','Subir'],['down','Descer'],['lock','Shift Lock'],['cam','Câmera'],['guard','Defesa'],['spec2','Segundo especial'],['settings','Abrir configurações da partida']];
const kn=c=>c.replace('Key','').replace('Digit','').replace('Left',' Esq').replace('Right',' Dir').replace('Arrow','Seta ');
function renderCfgBase(){
 const sl=(l,k,mn,mx,st)=>`<div class="crow"><span>${l}</span><input type="range" min="${mn}" max="${mx}" step="${st}" value="${CFG[k]}" oninput="CFG.${k}=+this.value;saveCfg();${k=='vol'?"sfx(440,.15,'sine',.25)":''}"></div>`;
 $('cbox').innerHTML=`<h1 style="font-size:28px;text-align:left">CONFIGURAÇÕES</h1><h3>ÁUDIO</h3>${sl('Volume','vol',0,1,.05)}<h3>SENSIBILIDADE</h3>${sl('Sensibilidade (mouse, controle e toque)','sens',.3,3,.1)}<h3>TECLADO</h3>${ACT.map(([a,l])=>`<div class="crow"><span>${l}</span><button class="btn" onclick="waitK='${a}';waitG=null;renderCfg()">${waitK==a?'Pressione uma tecla...':kn(KB[a])}</button></div>`).join('')}<div class="crow"><span>Rajada de ki</span><span>Botão esquerdo do mouse</span></div><h3>COMBATE</h3><div class="crow"><span>Disparo rápido (FPS) · tiros mais frequentes, consumindo o mesmo ki por tiro</span><button class="btn" onclick="CFG.fastFire=!CFG.fastFire;saveCfg();renderCfg()">${CFG.fastFire?'LIGADO':'DESLIGADO'}</button></div><h3>CONTROLE (GAMEPAD)</h3><div class="crow"><span>Analógico esquerdo: mover · direito: mirar</span></div>${GPN.map(([a,l])=>`<div class="crow"><span>${l}</span><button class="btn" onclick="waitG='${a}';waitK=null;renderCfg()">${waitG==a?'Pressione um botão...':'Botão '+GP[a]}</button></div>`).join('')}<h3>HUD (CELULAR)</h3><div class="crow"><span>Controles na tela</span><button class="btn" onclick="CFG.touch=(CFG.touch+1)%3;saveCfg();renderCfg()">${['Automático','Sempre ligado','Desligado'][CFG.touch]}</button></div><div class=\"crow\"><span>Posição dos botões</span><button class=\"btn\" onclick=\"openHudEd()\">✎ EDITAR HUD</button></div>${sl('Tamanho dos botões','tsz',.6,1.6,.1)}${sl('Opacidade','top',.2,1,.05)}<div class="row" style="margin-top:18px"><button class="btn on" id="cfg-back">VOLTAR</button><button class="btn" onclick="resetCfg()">RESTAURAR PADRÕES</button></div>`;
 $('cfg-back').onclick=closeSettings;
}
function renderCfg(){
renderCfgBase();
const gamepadHeading=[...$('cbox').querySelectorAll('h3')].find(heading=>heading.textContent==='CONTROLE (GAMEPAD)');
gamepadHeading.insertAdjacentHTML('beforebegin','<div class="crow"><span>Movimentação rápida (FPS) · deslocamento e dash +30%, sem mudar o dano</span><button class="btn" id="fast-move-toggle">'+(CFG.fastMove?'LIGADO':'DESLIGADO')+'</button></div>');
$('fast-move-toggle').onclick=()=>{CFG.fastMove=!CFG.fastMove;saveCfg();renderCfg()};
if(state==='play')$('cbox').insertAdjacentHTML('beforeend','<div style="margin-top:14px;padding-top:12px;border-top:1px solid #ffffff33"><button class="btn" id="cfg-leave" style="width:100%;border-color:#ff5964;color:#ff8a91">SAIR DA PARTIDA</button></div>');
const leave=$('cfg-leave');if(leave)leave.onclick=returnToLobby;
}
$('cfgb').onclick=()=>{renderCfg();$('cfg').style.display='flex'};
if($('match-cfg'))$('match-cfg').onclick=openMatchSettings;
function openMatchSettings(){
 if(state!=='play')return;
 Object.keys(K).forEach(code=>K[code]=0);Object.keys(tch).forEach(action=>tch[action]=false);md=false;
 if(document.pointerLockElement)document.exitPointerLock();
 renderCfg();$('cfg').style.display='flex';
}
function closeSettings(){
 $('cfg').style.display='none';waitK=waitG=null;
 if(state==='play'&&slk)try{$('gl').requestPointerLock()}catch(e){}
}
(function(){
 const joy=$('joy'),dot=joy.firstChild;let jid=null;
 const jm=e=>{const b=joy.getBoundingClientRect(),dx=(e.clientX-b.left-b.width/2)/(b.width/2),dy=(e.clientY-b.top-b.height/2)/(b.height/2),l=Math.max(1,Math.hypot(dx,dy));tch.r=dx/l;tch.f=-dy/l;dot.style.transform='translate('+dx/l*40+'%,'+dy/l*40+'%)'};
 joy.onpointerdown=e=>{jid=e.pointerId;joy.setPointerCapture(jid);jm(e)};joy.onpointermove=e=>{if(e.pointerId==jid)jm(e)};
 joy.onpointerup=joy.onpointercancel=()=>{jid=null;tch.r=tch.f=0;dot.style.transform=''};
 [['fire','🔥'],['melee','👊'],['spec','⭐'],['charge','⚡'],['tr','T'],['dash','💨'],['up','▲'],['down','▼'],['guard','🛡'],['spec2','🌀']].forEach(([a,l])=>{const b=document.createElement('b');let firePointer=null,fireX=0,fireY=0;b.textContent=l;b.dataset.a=a;b.style.cssText='position:absolute;transform:translate(-50%,-50%);width:calc(62px*var(--s)*var(--button-scale,1))';b.onpointerdown=e=>{tch[a]=true;b.setPointerCapture(e.pointerId);if(a==='fire'){firePointer=e.pointerId;fireX=e.clientX;fireY=e.clientY}};b.onpointermove=e=>{if(a!=='fire'||e.pointerId!==firePointer)return;yaw-=(e.clientX-fireX)*.005*CFG.sens;pitch=Math.max(-.9,Math.min(1,pitch+(e.clientY-fireY)*.005*CFG.sens));fireX=e.clientX;fireY=e.clientY};b.onpointerup=b.onpointercancel=()=>{tch[a]=false;if(a==='fire')firePointer=null};$('tbtns').appendChild(b)});
 let lx,ly,lid=null;const tl=$('tlook');
 tl.onpointerdown=e=>{lid=e.pointerId;tl.setPointerCapture(lid);lx=e.clientX;ly=e.clientY};
 tl.onpointermove=e=>{if(e.pointerId!=lid)return;yaw-=(e.clientX-lx)*.005*CFG.sens;pitch=Math.max(-.9,Math.min(1,pitch+(e.clientY-ly)*.005*CFG.sens));lx=e.clientX;ly=e.clientY};
 tl.onpointerup=tl.onpointercancel=()=>lid=null;$('tbtns').style.cssText='position:absolute;inset:0;display:block;pointer-events:none';applyCfg()})();
function ui(){
 const st=Math.min(3,Math.floor(save.pts/75));
 $('rank').innerHTML='<span class="ri">✦</span><div><small>SUA PATENTE</small><strong>'+RANKS[save.rank]+' '+'★'.repeat(st)+'☆'.repeat(4-st)+' · '+save.pts+'/300</strong></div>';
 $('rb').style.width=save.pts/3+'%';ffUpd();
 $('modes').innerHTML='';[['solo','Individual'],['squad','Esquadrão (5)'],['x1','X1 · Real']].forEach(([k,l])=>{const b=document.createElement('button');b.className='btn'+(mode==k?' on':'');b.textContent=l;b.onclick=()=>{mode=k;ui()};$('modes').appendChild(b)});
 $('scns').innerHTML='';['Arena do Torneio','Cidade em Ruínas','Floresta','Gelo','Treino'].forEach((n,i)=>{const b=document.createElement('button');b.className='btn'+(scn==i?' on':'');b.textContent=n;b.onclick=()=>{scn=i;setScene(i);ui()};$('scns').appendChild(b)});
 $('cams').innerHTML='';[[false,'3ª Pessoa'],[true,'1ª Pessoa']].forEach(([v,l])=>{const b=document.createElement('button');b.className='btn'+(fp==v?' on':'');b.textContent=l;b.onclick=()=>{fp=v;ui()};$('cams').appendChild(b)});
 $('cards').innerHTML='';CH.forEach((c,i)=>{const d=document.createElement('div');d.className='card'+(sel==i?' on':'');d.innerHTML='<i style="background:'+hx(c.c)+';box-shadow:0 0 12px '+hx(c.fc)+'"></i>'+c.n+'<small>'+c.f+'</small>';d.onclick=()=>{sel=i;ui();prev()};$('cards').appendChild(d)});
}
ui();
// ---- three.js
const ren=new THREE.WebGLRenderer({canvas:$('gl'),antialias:true});
const scene=new THREE.Scene();scene.background=new THREE.Color(0x07041a);scene.fog=new THREE.Fog(0x07041a,60,330);
const cam=new THREE.PerspectiveCamera(70,1,.1,900);
function rs(){ren.setSize(innerWidth,innerHeight);ren.setPixelRatio(Math.min(devicePixelRatio,1.25));cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}addEventListener('resize',rs);rs();
scene.add(new THREE.AmbientLight(0xffffff,.75));const sun=new THREE.DirectionalLight(0xfff0d0,.8);sun.position.set(80,150,50);scene.add(sun);
const AH=280,Z=[260,190,130,80,45,14];const gArena=new THREE.Group();scene.add(gArena);
// terreno de pedra com textura irregular e falésias esculpidas
const tex=mkTex('#858372','#777764','#625f50');tex.repeat.set(7,7);
const slab=new THREE.Mesh(new THREE.PlaneGeometry(AH*2,AH*2),new THREE.MeshLambertMaterial({map:tex}));slab.rotation.x=-Math.PI/2;scene.add(slab);
function makeCliffGeometry(){
 const segments=28,rings=8,positions=[],colors=[],indices=[];
 for(let row=0;row<rings;row++){
  const drop=row/(rings-1),scale=1-drop*.32;
  for(let i=0;i<segments*4;i++){
   const side=Math.floor(i/segments),u=(i%segments)/segments;
   let x,z;
   if(side===0){x=-AH+u*AH*2;z=-AH}
   else if(side===1){x=AH;z=-AH+u*AH*2}
   else if(side===2){x=AH-u*AH*2;z=AH}
   else{x=-AH;z=AH-u*AH*2}
   const noise=Math.sin(i*12.9898+side*7.23)*Math.cos(i*4.141+side);
   const rough=row===0?0:Math.sin(drop*Math.PI)*noise*7;
   positions.push(x*scale+rough,-drop*78+noise*drop*3,z*scale+rough*.55);
   const shade=.76+Math.sin(i*2.7+row*1.9)*.1-drop*.22;
   colors.push(.8*shade,.75*shade,.65*shade);
  }
 }
 for(let row=0;row<rings-1;row++)for(let i=0;i<segments*4;i++){
  const a=row*segments*4+i,b=row*segments*4+(i+1)%(segments*4),c=b+segments*4,d=a+segments*4;
  indices.push(a,b,d,b,c,d);
 }
 const geometry=new THREE.BufferGeometry();
 geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
 geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
 geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}
const under=new THREE.Mesh(makeCliffGeometry(),new THREE.MeshLambertMaterial({color:0xaaa18b,vertexColors:true,side:THREE.DoubleSide}));scene.add(under);
const sp=[];for(let i=0;i<500;i++){const a=Math.random()*6.283,b=Math.acos(Math.random()*2-1);sp.push(450*Math.sin(b)*Math.cos(a),450*Math.cos(b),450*Math.sin(b)*Math.sin(a))}
const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.Float32BufferAttribute(sp,3));const starsPts=new THREE.Points(sg,new THREE.PointsMaterial({color:0xffffff,size:1.6,fog:false}));scene.add(starsPts);
const zone=new THREE.Mesh(new THREE.BoxGeometry(1,70,1),new THREE.MeshBasicMaterial({color:0xff2020,transparent:true,opacity:.16,side:THREE.DoubleSide,depthWrite:false}));zone.position.y=30;scene.add(zone);
const MT=[[-90,-90,36,48,'p',14],[90,-90,38,55,'p',15],[-90,90,34,44,'p',13],[90,90,40,58,'p',16],[0,-190,32,42,'p',12],[0,190,35,50,'p',14],[-190,0,30,40,'p',12],[190,0,34,46,'p',13],[-190,-190,28,36,'p',11],[190,-190,30,42,'p',12],[-190,190,32,44,'p',13],[190,190,29,39,'p',11],[0,0,25,32,'p',9]];
const terrainObstacles=[];
function terrainRecord(x,z,r,h,type,visual,top){
 const obstacle=[x,z,r,h,type,top];obstacle.visual=visual;obstacle.hits=0;obstacle.destroyed=false;terrainObstacles.push(obstacle);return obstacle;
}
function makeMountainGeometry(r,h,top,seed){
 const sides=12,levels=7,positions=[],colors=[],indices=[];
 for(let level=0;level<levels;level++){
  const t=level/(levels-1),base=1-t*(1-top/r);
  for(let i=0;i<sides;i++){
   const angle=(i/sides+level*.025)*Math.PI*2;
   const irregular=.88+.16*Math.sin(i*8.13+seed)*Math.cos(level*4.7+seed*.3);
   const radius=base*r*irregular;
   positions.push(Math.cos(angle)*radius,t*h,Math.sin(angle)*radius);
   const rock=.72+.18*Math.sin(i*5.2+seed+level)*Math.cos(level*2.8+seed);
   const snow=THREE.MathUtils.smoothstep(t+Math.sin(i*3.1+seed)*.08,.72,.96);
   colors.push(.62*rock*(1-snow)+.88*snow,.56*rock*(1-snow)+.91*snow,.48*rock*(1-snow)+.97*snow);
  }
 }
 for(let level=0;level<levels-1;level++)for(let i=0;i<sides;i++){
  const a=level*sides+i,b=level*sides+(i+1)%sides,c=b+sides,d=a+sides;
  indices.push(a,d,b,b,d,c);
 }
 const peak=positions.length/3,peakHeight=h*(.04+.03*(.5+.5*Math.sin(seed)));
 positions.push(0,h+peakHeight,0);colors.push(.88,.91,.97);
 const topRing=(levels-1)*sides;
 for(let i=0;i<sides;i++)indices.push(topRing+i,peak,topRing+(i+1)%sides);
 const geometry=new THREE.BufferGeometry();
 geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
 geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
 geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}
const rmat=new THREE.MeshLambertMaterial({vertexColors:true});
for(let i=0;i<MT.length;i++){const [x,z,r,h,t,top]=MT[i],seed=Math.abs(x*13+z*7),m=new THREE.Mesh(makeMountainGeometry(r,h,top,seed),rmat);m.position.set(x,0,z);m.rotation.y=seed*.017;gArena.add(m);MT[i].visual=m;MT[i].hits=0;MT[i].destroyed=false;terrainObstacles.push(MT[i])}
// partículas, ondas de choque e efeitos de ki
const NP=300,pgeo=new THREE.BufferGeometry(),ppos=new Float32Array(NP*3),parts=[],waves=[],gW=new THREE.RingGeometry(.85,1,40);
pgeo.setAttribute('position',new THREE.BufferAttribute(ppos,3));
const ptsM=new THREE.Points(pgeo,new THREE.PointsMaterial({color:0xaee8ff,size:.7,transparent:true,opacity:.9,depthWrite:false,fog:false}));ptsM.frustumCulled=false;scene.add(ptsM);
function spawnP(x,y,z,vx,vy,vz,l){if(parts.length<NP)parts.push({x,y,z,vx,vy,vz,l})}
const energyGlowMap=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,1,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.16,'rgba(255,255,255,.82)');g.addColorStop(.48,'rgba(255,255,255,.2)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)})();
function energyGlow(color,size){const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:energyGlowMap,color,transparent:true,opacity:.72,blending:THREE.AdditiveBlending,depthWrite:false,fog:false}));glow.scale.set(size,size,1);glow.userData.base=size;return glow}
function wave(x,y,z,col,size){const m=new THREE.Mesh(gW,new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.8,side:THREE.DoubleSide,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(x,y+.1,z);scene.add(m);waves.push({m,t:0,size})}
function burst(p){wave(p.x,p.y,p.z,p.tf?p.ch.fc:p.ch.c,p.tf?14:10);for(let i=0;i<28;i++){const a=Math.random()*6.283,s=6+Math.random()*10;spawnP(p.x,p.y+1.5,p.z,Math.cos(a)*s,Math.random()*6,Math.sin(a)*s,.7)}if(p===me){shake=Math.max(shake,.5);sfx(260,.6,'triangle',.25);if(p.tf){const f=$('flash');f.style.transition='none';f.style.opacity=.7;requestAnimationFrame(()=>{f.style.transition='opacity .7s';f.style.opacity=0})}}}
function updP(dt){
 updateTerrainDebris(dt);
 for(let i=parts.length-1;i>=0;i--){const q=parts[i];q.l-=dt;if(q.l<=0){parts.splice(i,1);continue}q.x+=q.vx*dt;q.y+=q.vy*dt;q.z+=q.vz*dt}
 parts.forEach((q,i)=>{ppos[i*3]=q.x;ppos[i*3+1]=q.y;ppos[i*3+2]=q.z});pgeo.setDrawRange(0,parts.length);pgeo.attributes.position.needsUpdate=true;
 for(let i=waves.length-1;i>=0;i--){const w=waves[i];w.t+=dt;const k=w.t/.7;w.m.scale.setScalar(1+k*w.size);w.m.material.opacity=.8*(1-k);if(k>=1){scene.remove(w.m);waves.splice(i,1)}}
 for(const q of P)q.dsl=false;
 for(let i=doms.length-1;i>=0;i--){const d=doms[i];d.t+=dt;const k=Math.min(1,d.t/.8),fade=d.t>5?Math.max(0,1-(d.t-5)/.4):1;d.g.scale.setScalar(d.R*(.96+.04*Math.sin(T*3.2)));d.lattice.rotation.y+=dt*.16;d.motes.rotation.y-=dt*.22;d.rings.forEach(r=>{if(r.vertical)r.m.rotation.y+=dt*r.speed;else r.m.rotation.z+=dt*r.speed});d.shell.material.opacity=.38*fade;d.lattice.material.opacity=.32*fade;d.floor.material.opacity=.18*fade;d.floorRing.material.opacity=.78*fade;d.motes.material.opacity=.82*fade;
  if(d.t<5)for(const q of P){if(!q.alive||q.team==d.o.team)continue;const dx=d.x-q.x,dz=d.z-q.z,r=Math.hypot(dx,dz);if(r<d.R*1.9){if(r>d.R&&r>1){q.kx+=dx/r*18*dt*3;q.kz+=dz/r*18*dt*3}if(r<d.R){q.dsl=true;hit(q,16*dt*mul(d.o),d.o,0,0,0)}}}
  if(d.t>=5.4){removeDomain(d);doms.splice(i,1)}}
 for(let i=beams.length-1;i>=0;i--){const b=beams[i];b.t+=dt;const u=b.t/b.d,w=Math.min(1,b.t/.12)*(1-u*u*u)*(1+.12*Math.sin(b.t*60));b.m[0].scale.set(b.W*w,b.LEN,b.W*w);b.m[1].scale.set(b.W*.43*w,b.LEN,b.W*.43*w);b.m[0].material.opacity=.75*(1-u);b.m[1].material.opacity=.95*(1-u);if(u>=1){b.m.forEach(m=>scene.remove(m));beams.splice(i,1)}}}
// barra de vida flutuante (aparece quando o lutador é acertado)
function drawBar(p){const c=p.bar.userData.cv,g=c.getContext('2d'),f=Math.max(0,p.hp)/100;p.barHp=p.hp;g.clearRect(0,0,128,32);g.fillStyle='rgba(0,0,0,.7)';g.fillRect(0,14,128,16);g.fillStyle=f>.5?'#4cd964':f>.25?'#ffcc00':'#ff3b30';g.fillRect(2,16,124*f,12);g.fillStyle='#fff';g.font='bold 13px Arial';g.textAlign='center';g.fillText(p.name+' '+Math.ceil(Math.max(0,p.hp)),64,11);p.bar.userData.tex.needsUpdate=true}
function showBar(p){if(p===me)return;if(!p.bar){const c=document.createElement('canvas');c.width=128;c.height=32;const t=new THREE.CanvasTexture(c),s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthTest:false}));s.scale.set(4.5,1.1,1);s.position.y=5.3;s.renderOrder=5;s.userData={cv:c,tex:t};p.m.add(s);p.bar=s}p.bar.visible=true;p.barT=3;drawBar(p)}
function mtCol(p){for(const o of MT){if(o.destroyed)continue;const [x,z,r,h,t,top]=o;if(p.y>=h)continue;const dx=p.x-x,dz=p.z-z;
 if(t=='b'){const e=r+.8;if(Math.abs(dx)<e&&Math.abs(dz)<e){if(Math.abs(dx)>Math.abs(dz))p.x=x+Math.sign(dx||1)*e;else p.z=z+Math.sign(dz||1)*e}}
 else{const d=Math.hypot(dx,dz)||.01,ry=(t=='y'?r:t=='p'?r-(r-top)*Math.max(0,p.y)/h:r*(1-Math.max(0,p.y)/h))+.8;if(d<ry){p.x=x+dx/d*ry;p.z=z+dz/d*ry}}}}
function inMt(x,z,y,m){for(const o of MT){if(o.destroyed)continue;const [mx,mz,r,h,t,top]=o;if(y>=h)continue;if(t=='b'){if(Math.abs(x-mx)<r+(m||0)&&Math.abs(z-mz)<r+(m||0))return true}else if(Math.hypot(x-mx,z-mz)<(t=='y'?r:t=='p'?r-(r-top)*Math.max(0,y)/h:r*(1-y/h))+(m||0))return true}return false}
function groundHeight(x,z){let y=0;for(const o of MT){if(o.destroyed)continue;const [mx,mz,r,h,t,top]=o;if(t=='p'&&Math.hypot(x-mx,z-mz)<top-.5)y=Math.max(y,h);else if(t=='b'&&Math.abs(x-mx)<r-.5&&Math.abs(z-mz)<r-.5)y=Math.max(y,h)}return y}
// ---- cenários
const gCity=new THREE.Group(),gFor=new THREE.Group(),gIce=new THREE.Group();[gCity,gFor,gIce].forEach(g=>{g.visible=false;scene.add(g)});
const MT0=MT.slice();let sd=7;const srn=()=>(sd=(sd*16807)%2147483647)/2147483647;
function mkTex(a,b,c){
 const cv=document.createElement('canvas');cv.width=cv.height=256;
 const g=cv.getContext('2d'),image=g.createImageData(256,256),colors=[a,b,c].map(hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)));
 let seed=parseInt(a.slice(1),16)>>>0;
 const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 const fields=[4,8,16,32,64].map(size=>Array.from({length:size*size},rand));
 const sample=(field,size,x,y)=>{
  const px=x/256*size,py=y/256*size,ix=Math.floor(px),iy=Math.floor(py),fx=px-ix,fy=py-iy,sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy),at=(xx,yy)=>field[(yy%size)*size+xx%size];
  const top=at(ix,iy)*(1-sx)+at((ix+1)%size,iy)*sx,bottom=at(ix,(iy+1)%size)*(1-sx)+at((ix+1)%size,(iy+1)%size)*sx;
  return top*(1-sy)+bottom*sy;
 };
 for(let y=0;y<256;y++)for(let x=0;x<256;x++){
  const n=sample(fields[0],4,x,y)*.42+sample(fields[1],8,x,y)*.27+sample(fields[2],16,x,y)*.16+sample(fields[3],32,x,y)*.1+sample(fields[4],64,x,y)*.05;
  const lower=n<.5?colors[2]:colors[1],upper=n<.5?colors[1]:colors[0],mix=(n<.5?n*2:(n-.5)*2),i=(y*256+x)*4;
  for(let channel=0;channel<3;channel++)image.data[i+channel]=lower[channel]*(1-mix)+upper[channel]*mix;
  image.data[i+3]=255;
 }
 g.putImageData(image,0,0);
 const t=new THREE.CanvasTexture(cv);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(12,12);return t;
}
const TX=[mkTex('#9a9488','#837d71','#5b5548'),mkTex('#4a4f58','#42464e','#2b2e34'),mkTex('#3f7a3a','#386d34','#2a5527'),mkTex('#cfefff','#bfe6f9','#8fc9e6')];
const matIce=new THREE.MeshPhongMaterial({map:TX[3],shininess:100,specular:0xffffff}),matBase=slab.material;
const SKY=[0x07041a,0x3b4a6b,0x86c2e6,0xb9e3f7];
function buildCity(){
 const wc=document.createElement('canvas');wc.width=64;wc.height=128;const w=wc.getContext('2d');w.fillStyle='#2d3345';w.fillRect(0,0,64,128);for(let y=6;y<124;y+=14)for(let x=6;x<60;x+=14){w.fillStyle=Math.random()<.5?'#ffe9a0':'#1c2233';w.fillRect(x,y,8,8)}
 const wt=new THREE.CanvasTexture(wc);wt.wrapS=wt.wrapT=THREE.RepeatWrapping;const cols=[0x8d93a0,0xa8a39c,0x7b8494,0x9a8f88],list=[];sd=11;
 for(let gx=-240;gx<=240;gx+=48)for(let gz=-240;gz<=240;gz+=48){if(Math.hypot(gx,gz)<36||srn()<.28)continue;const hs=11+srn()*6,h=24+srn()*52,x=gx+(srn()-.5)*8,z=gz+(srn()-.5)*8,t=wt.clone();t.needsUpdate=true;t.repeat.set(Math.round(hs/4),Math.round(h/12));
  const m=new THREE.Mesh(new THREE.BoxGeometry(hs*2,h,hs*2),new THREE.MeshLambertMaterial({map:t,color:cols[(srn()*4)|0]}));m.position.set(x,h/2,z);gCity.add(m);list.push(terrainRecord(x,z,hs,h,'b',m))}
 for(let i=0;i<22;i++){const a=srn()*6.283,d=35+srn()*215,r=8+srn()*9,x=Math.cos(a)*d,z=Math.sin(a)*d;if(list.some(o=>Math.abs(o[0]-x)<o[2]+r&&Math.abs(o[1]-z)<o[2]+r))continue;
  const c=new THREE.Mesh(new THREE.CircleGeometry(r,28),new THREE.MeshBasicMaterial({color:0x151313}));c.rotation.x=-Math.PI/2;c.position.set(x,.08,z);gCity.add(c);
  const rim=new THREE.Mesh(new THREE.RingGeometry(r,r*1.3,28),new THREE.MeshBasicMaterial({color:0x4d4036}));rim.rotation.x=-Math.PI/2;rim.position.set(x,.07,z);gCity.add(rim)}
 gCity.userData.ob=list}
function buildFor(){sd=23;const list=[],tm=new THREE.MeshLambertMaterial({color:0x6b4a2b}),fm=[0x2f7d32,0x276b2a,0x358a38].map(c=>new THREE.MeshLambertMaterial({color:c,flatShading:true})),gt=new THREE.CylinderGeometry(1,1.3,1,7),gf=new THREE.ConeGeometry(1,1,8);
 for(let i=0;i<160;i++){const x=(srn()*2-1)*190,z=(srn()*2-1)*190;if(Math.hypot(x,z)<22||list.some(o=>Math.hypot(o[0]-x,o[1]-z)<7))continue;const h=14+srn()*10,tree=new THREE.Group(),t=new THREE.Mesh(gt,tm);t.scale.set(1,h*.5,1);t.position.y=h*.25;tree.add(t);
  for(let j=0;j<3;j++){const c=new THREE.Mesh(gf,fm[(srn()*3)|0]),s=6.5-j*1.6;c.scale.set(s,h*.42,s);c.position.y=h*.5+j*h*.2;tree.add(c)}tree.position.set(x,0,z);gFor.add(tree);const obstacle=terrainRecord(x,z,1.4,h*.6,'y',tree);obstacle.impactRadius=5.5;obstacle.impactHeight=h;list.push(obstacle)}
 for(let i=0;i<24;i++){const x=(srn()*2-1)*190,z=(srn()*2-1)*190;if(Math.hypot(x,z)<18||list.some(o=>Math.hypot(o[0]-x,o[1]-z)<6))continue;const s=2+srn()*2.5,m=new THREE.Mesh(new THREE.DodecahedronGeometry(s,0),new THREE.MeshLambertMaterial({color:0x7d7d78,flatShading:true}));m.position.set(x,s*.5,z);gFor.add(m);list.push(terrainRecord(x,z,s*.9,s*1.2,'y',m))}
 gFor.userData.ob=list}
function buildIce(){sd=31;const list=[],m=new THREE.MeshPhongMaterial({color:0x9fdcff,transparent:true,opacity:.75,shininess:100,flatShading:true});
 for(let i=0;i<30;i++){const x=(srn()*2-1)*185,z=(srn()*2-1)*185;if(Math.hypot(x,z)<24||list.some(o=>Math.hypot(o[0]-x,o[1]-z)<14))continue;const r=4+srn()*6,h=12+srn()*22,c=new THREE.Mesh(new THREE.ConeGeometry(r,h,6),m);c.position.set(x,h/2,z);c.rotation.y=srn()*3;gIce.add(c);list.push(terrainRecord(x,z,r,h,'c',c))}
 for(let i=0;i<70;i++){const x=(srn()*2-1)*195,z=(srn()*2-1)*195,s=.8+srn()*1.4,c=new THREE.Mesh(new THREE.OctahedronGeometry(s,0),m);c.position.set(x,s,z);gIce.add(c)}
 gIce.userData.ob=list}
function setScene(i){
 scn=i;TRAIN=i==4;ICE=i==3;const e=TRAIN?0:i;
 if(e==1&&!gCity.userData.ob)buildCity();if(e==2&&!gFor.userData.ob)buildFor();if(e==3&&!gIce.userData.ob)buildIce();
 gArena.visible=e==0;gCity.visible=e==1;gFor.visible=e==2;gIce.visible=e==3;starsPts.visible=e==0;
 slab.material=e==3?matIce:matBase;matBase.map=TX[e==3?3:e];matBase.needsUpdate=true;
 under.material.color.setHex([0xb1a78f,0x95969a,0x718f60,0xa9d7e8][e]);
 scene.background.setHex(SKY[e]);scene.fog.color.setHex(SKY[e]);scene.fog.far=e==0?450:400;
 MT.length=0;(e==0?MT0:[gCity,gFor,gIce][e-1].userData.ob).forEach(o=>MT.push(o))}
const terrainDebris=[];
function terrainMaterialColor(ob){
 let color=0x8b8172;
 ob.visual.traverse(m=>{if(color!==0x8b8172||!m.isMesh)return;const material=Array.isArray(m.material)?m.material[0]:m.material;if(material&&material.color&&!material.vertexColors)color=material.color.getHex()});
 return color;
}
function clearTerrainDebris(){
 for(const d of terrainDebris){scene.remove(d.mesh);d.mesh.geometry.dispose();d.mesh.material.dispose()}
 terrainDebris.length=0;
 for(const ob of terrainObstacles){ob.hits=0;ob.destroyed=false;if(ob.visual)ob.visual.visible=true}
}
function collapseTerrain(ob,x,z){
 ob.destroyed=true;ob.visual.visible=false;
 const color=terrainMaterialColor(ob),height=ob.impactHeight||ob[3],count=Math.min(14,Math.max(8,Math.ceil(ob[2]/3)));
 wave(x,.12,z,0xffd18a,Math.max(5,ob[2]*.7));
 for(let i=0;i<18;i++){const a=Math.random()*Math.PI*2,s=3+Math.random()*ob[2]*.35;spawnP(x,.5,z,Math.cos(a)*s,2+Math.random()*7,Math.sin(a)*s,.9)}
 for(let i=0;i<count;i++){
  const size=.8+Math.random()*1.8,material=new THREE.MeshLambertMaterial({color:new THREE.Color(color).multiplyScalar(.72+Math.random()*.55)}),mesh=new THREE.Mesh(new THREE.DodecahedronGeometry(1,0),material);
  mesh.scale.set(size*(.8+Math.random()*.6),size*(.6+Math.random()*.8),size*(.8+Math.random()*.6));
  mesh.position.set(ob[0]+(Math.random()-.5)*ob[2]*1.4,Math.max(size,height*(.25+Math.random()*.65)),ob[1]+(Math.random()-.5)*ob[2]*1.4);
  mesh.rotation.set(Math.random()*6,Math.random()*6,Math.random()*6);scene.add(mesh);
  terrainDebris.push({mesh,vx:(Math.random()-.5)*12,vy:Math.random()*8+2,vz:(Math.random()-.5)*12,spin:(Math.random()-.5)*5,size});
 }
 while(terrainDebris.length>220){const d=terrainDebris.shift();scene.remove(d.mesh);d.mesh.geometry.dispose();d.mesh.material.dispose()}
}
function damageTerrainRay(x,y,z,ad,length,width){
 const d=new THREE.Vector3(ad[0],ad[1],ad[2]).normalize();let target=null,hitX=0,hitZ=0,hitY=0,best=length;
 for(const ob of MT){
  if(ob.destroyed||!ob.visual)continue;
  const dx=ob[0]-x,dz=ob[1]-z,horizontal=d.x*d.x+d.z*d.z;
  const t=horizontal>1e-5?Math.max(0,(dx*d.x+dz*d.z)/horizontal):Math.max(0,((ob[3]*.5-y)*d.y));
  if(t>length||t>=best)continue;
  const px=x+d.x*t,pz=z+d.z*t,dist=Math.hypot(ob[0]-px,ob[1]-pz),radius=(ob.impactRadius||ob[2]*(ob[4]=='b'?1.42:1))+width;
  const py=y+d.y*t,height=ob.impactHeight||ob[3];
  if(dist>radius||py< -width||py>height+width)continue;
  target=ob;best=t;hitX=px;hitZ=pz;hitY=py;
 }
 if(!target)return false;
 target.hits++;
 for(let i=0;i<6;i++){const a=Math.random()*Math.PI*2,s=2+Math.random()*4;spawnP(hitX,hitY,hitZ,Math.cos(a)*s,2+Math.random()*4,Math.sin(a)*s,.45)}
 wave(hitX,Math.max(.15,hitY),hitZ,0xffc66d,2.4);
 if(target.hits>=4)collapseTerrain(target,hitX,hitZ);
 return true;
}
function updateTerrainDebris(dt){
 for(const d of terrainDebris){
  if(d.mesh.position.y<=d.size*.45&&d.vy<=0){d.mesh.position.y=d.size*.45;d.vx=d.vy=d.vz=d.spin=0;continue}
  d.vy-=22*dt;d.mesh.position.x+=d.vx*dt;d.mesh.position.y+=d.vy*dt;d.mesh.position.z+=d.vz*dt;
  d.mesh.rotation.x+=d.spin*dt;d.mesh.rotation.y+=d.spin*dt*.8;
 }
}
$('exitb').onclick=()=>$('back').onclick();setScene(0);
// ---- jogo
let P,me,items,pr,feed,zc,zi,zph,zt,zfrom,zto,state='lobby',T,yaw=0,pitch=.3,last=0;
const R=(a,b)=>a+Math.random()*(b-a),K={};let md=false,mx=innerWidth/2,my=innerHeight/2,locked=false;
const gB=new THREE.CylinderGeometry(.5,.6,1.4,10),gH=new THREE.SphereGeometry(.38,10,8),gC=new THREE.ConeGeometry(.16,.7,5),gA=new THREE.SphereGeometry(2.4,16,12),gR=new THREE.RingGeometry(1.1,1.4,24),gS=new THREE.SphereGeometry(1,10,8);
const toonGradient=(()=>{const c=document.createElement('canvas');c.width=4;c.height=1;const x=c.getContext('2d');[48,105,180,255].forEach((v,i)=>{x.fillStyle=`rgb(${v},${v},${v})`;x.fillRect(i,0,1,1)});const t=new THREE.CanvasTexture(c);t.minFilter=THREE.NearestFilter;t.magFilter=THREE.NearestFilter;t.generateMipmaps=false;return t})();
const toonMaterial=c=>new THREE.MeshToonMaterial({color:c,gradientMap:toonGradient});
const MC={};const U={b:new THREE.BoxGeometry(1,1,1),c:new THREE.CylinderGeometry(.5,.5,1,10),s:new THREE.SphereGeometry(.5,12,10),k:new THREE.ConeGeometry(.5,1,5)};
const O={
Goku:{sk:0xf1c27d,top:0xf57c1f,arm:0x1f4fa8,pants:0xf57c1f,belt:0x1f4fa8,boot:0x1f4fa8,gl:0xf1c27d,wr:0x1f4fa8},
Vegeta:{sk:0xf1c27d,top:0xf2f2f2,arm:0x2a4fb8,pants:0x2a4fb8,belt:0xf2f2f2,boot:0xf2f2f2,gl:0xf2f2f2,wr:0xf2f2f2},
Gohan:{sk:0xf1c27d,top:0x5b2a9e,arm:0x5b2a9e,pants:0x5b2a9e,belt:0xc9302c,boot:0x222233,gl:0xf1c27d,wr:0xc9302c},
Piccolo:{sk:0x5fb85a,top:0x6a2fb0,arm:0x6a2fb0,pants:0x6a2fb0,belt:0xc9302c,boot:0x3b1d6b,gl:0x5fb85a,wr:0x3b1d6b},
Freeza:{sk:0xf2eef8,top:0xf2eef8,arm:0xf2eef8,pants:0xf2eef8,belt:0xf2eef8,boot:0x7a3fb0,gl:0xf2eef8,wr:0x7a3fb0},
Jiren:{sk:0x9a9aa5,top:0xc8323c,arm:0xc8323c,pants:0x1c1c22,belt:0xeeeeee,boot:0x1c1c22,gl:0x9a9aa5,wr:0x1c1c22},
Broly:{sk:0xf0a890,top:0xf0a890,arm:0xf0a890,pants:0x6a2a8e,belt:0x6aa83a,boot:0xf2f2f2,cuff:0x222222,toe:0x2e8b3a,gl:0xf0a890,wr:0x222222},
GokuB:{sk:0xf1c27d,top:0x15151c,arm:0xb8b8c4,pants:0x15151c,belt:0xe0558c,boot:0x2a2a35,cuff:0xe0558c,gl:0xf1c27d,wr:0xe0558c},
NarutoB:{sk:0xf1c27d,top:0xff7a1a,arm:0xff7a1a,pants:0xff7a1a,belt:0x222222,boot:0x20306a,cuff:0x20306a,gl:0xf1c27d,wr:0xdddddd},
SasukeB:{sk:0xf3d5b5,top:0x1d2a4a,arm:0x1d2a4a,pants:0xe8e8ee,belt:0x6a4a9a,boot:0x202030,gl:0xf3d5b5,wr:0x202030},
AstaB:{sk:0xe0b890,top:0x2a2a34,arm:0xe0b890,pants:0x3a3a44,belt:0xdddddd,boot:0x2a2a34,gl:0xe0b890,wr:0x888888},
KeflaB:{sk:0xf1c27d,top:0xf2a22a,arm:0xf1c27d,pants:0x222230,belt:0xe0e0e8,boot:0xf2f2f2,cuff:0xf2a22a,gl:0xf2f2f2,wr:0xf2a22a},
GogetaB:{sk:0xf1c27d,top:0x1f4fb0,arm:0xf1c27d,pants:0xf2f2f2,belt:0xff8a1e,boot:0x1f4fb0,cuff:0xff8a1e,gl:0xf1c27d,wr:0xf2f2f2},
SaitamaB:{sk:0xf1c27d,top:0xf2d21a,arm:0xf2d21a,pants:0xf2d21a,belt:0x333333,boot:0xd02020,gl:0xd02020,wr:0xf2d21a},
GojoB:{sk:0xf3d5b5,top:0x16161f,arm:0x16161f,pants:0x16161f,belt:0x16161f,boot:0x0e0e14,cuff:0x16161f,gl:0xf3d5b5,wr:0x16161f},
ItadoriB:{sk:0xf1c27d,top:0x1b2440,arm:0x1b2440,pants:0x1b2440,belt:0x1b2440,boot:0x151a2c,gl:0xf1c27d,wr:0x1b2440},
MegumiB:{sk:0xf3d5b5,top:0x1b2440,arm:0x1b2440,pants:0x1b2440,belt:0x1b2440,boot:0x151a2c,cuff:0x1b2440,gl:0xf3d5b5,wr:0x1b2440}};
// personagens estilo anime, forma base
function mkMuscle(ch,tag){
 const g=new THREE.Group(),body=new THREE.Group(),hair=[],o=O[ch.n],k=ch.n,H=ch.h,sr=k=='Piccolo'||k=='Jiren',L=c=>MC[c]||(MC[c]=toonMaterial(c));g.add(body);
 const nd=(par,x,y,z)=>{const q=new THREE.Group();q.position.set(x,y,z);par.add(q);return q};
 const pt=(par,t,c,sx,sy,sz,x,y,z,rec,rx,rz)=>{const m=new THREE.Mesh(U[t],L(c));m.scale.set(sx,sy,sz);m.position.set(x,y,z);m.rotation.set(rx||0,0,rz||0);par.add(m);if(rec){m.material=toonMaterial(c);hair.push(m)}return m};
 const sp=(x,y,z,w,h,rx,rz)=>pt(body,'k',H,w,h,w,x,y+.2,z,true,rx,rz);
 const rig={hip:[],knee:[],sh:[],el:[]};
 [-1,1].forEach(s=>{
  const hip=nd(body,s*.3,1.35,0),kn=nd(hip,0,-.8,0),sh=nd(body,s*.9,2.45,0),el=nd(sh,0,-.7,0);
  pt(hip,'c',o.pants,.56,.85,.56,0,-.4,0);pt(kn,'c',o.pants,.46,.75,.46,0,-.37,0);pt(kn,'c',o.cuff||o.boot,.52,.4,.52,0,-.5,0);pt(kn,'b',o.boot,.5,.45,.75,0,-.82,.1);pt(kn,'b',o.toe||o.boot,.5,.2,.3,0,-.9,.4);
  pt(sh,'s',o.arm,.7,.7,.7,0,0,0);pt(sh,'c',o.arm,.46,.8,.46,0,-.35,0);pt(el,'c',o.arm,.4,.7,.4,0,-.32,0);pt(el,'c',o.wr,.46,.22,.46,0,-.55,0);pt(el,'s',o.gl,.42,.42,.42,0,-.85,0,sr);
  pt(body,'s',0xffffff,.22,.26,.08,s*.2,3.0,.43);pt(body,'s',0x111111,.11,.18,.08,s*.2,2.99,.47);
  rig.hip.push(hip);rig.knee.push(kn);rig.sh.push(sh);rig.el.push(el);
  if(k=='Freeza')pt(el,'c',H,.44,.45,.44,0,-.45,0,true)});
 pt(body,'c',o.pants,1.05,.5,.7,0,1.2,0);pt(body,'c',o.top,1.45,1,.85,0,2,0);pt(body,'s',o.top,.75,.6,.45,-.36,2.15,.3);pt(body,'s',o.top,.75,.6,.45,.36,2.15,.3);
 pt(body,'c',o.top,1,.65,.65,0,1.55,0);pt(body,'c',o.belt,1.1,.22,.72,0,1.3,0);pt(body,'c',o.sk,.3,.3,.3,0,2.62,0,sr);pt(body,'s',o.sk,1,1.05,.92,0,2.95,0,sr);
 if(k=='Goku'){pt(body,'b',0x1f4fa8,.4,.75,.06,0,2,.45);sp(0,3.5,0,.5,1.1);[-1,1].forEach(s=>{sp(s*.3,3.4,0,.45,1,0,-s*.4);sp(s*.5,3.15,0,.4,.85,0,-s*.9);sp(s*.15,3.1,.4,.28,.7,.9,-s*.1)});sp(0,3.3,-.35,.45,.9,-.6,0)}
 if(k=='Vegeta'){pt(body,'c',0x2a4fb8,.95,.5,.6,0,1.6,0);[-1,1].forEach(s=>{pt(body,'s',0xf5c518,.6,.45,.6,s*.9,2.55,0);sp(s*.3,3.55,0,.45,1.2,0,-s*.25);sp(s*.5,3.3,0,.4,.9,0,-s*.7)});sp(0,3.65,0,.5,1.4);sp(0,3.15,.42,.3,.6,.7,0)}
 if(k=='Gohan'){[-1,1].forEach(s=>{sp(s*.3,3.3,0,.4,.8,0,-s*.5);sp(s*.5,3.1,0,.35,.6,0,-s*.9)});sp(0,3.4,0,.45,.9);sp(0,3.1,.42,.3,.8,1,0)}
 if(k=='Broly'){pt(body,'c',0x6aa83a,1.4,.6,.98,0,1.1,0);pt(body,'b',0xc9b48a,.7,.8,.1,0,1.0,.5);pt(body,'k',0x6aa83a,1.45,.5,1.0,0,.72,0,0,3.14);[-1,1].forEach(s=>{sp(s*.3,3.55,0,.5,1.3,0,-s*.3);sp(s*.5,3.35,0,.45,1.1,0,-s*.7);sp(s*.65,3.1,0,.4,.8,0,-s*1.1)});sp(0,3.7,0,.55,1.5);sp(0,3.3,-.35,.5,1,-.6,0);sp(0,3.1,.4,.3,.7,.9,0)}
 if(k=='Piccolo'){pt(body,'b',0xf2f2f2,1.8,1.5,.14,0,2,-.5);pt(body,'s',0xf2f2f2,1.04,.55,.96,0,3.32,-.02);[-1,1].forEach(s=>{pt(body,'b',0xf2f2f2,.75,.22,.8,s*.9,2.65,0,0,0,-s*.1);pt(body,'k',H,.1,.7,.1,s*.15,3.75,.1,true,0,-s*.3);pt(body,'k',H,.18,.5,.18,s*.52,3,0,true,0,-s*1.5)})}
 if(k=='Freeza'){pt(body,'s',H,.98,.55,.92,0,3.2,-.02,true);pt(body,'c',H,1.46,.6,.86,0,2.2,0,true);pt(body,'k',0xf2eef8,.3,1.5,.3,0,.8,-.6,0,-1.2,0);[-1,1].forEach(s=>{pt(body,'k',0xf2eef8,.2,.8,.2,s*.38,3.55,.05,0,0,-s*.35);pt(body,'s',H,.6,.45,.6,s*.9,2.55,0,true)})}
 if(k=='Jiren'){[-1,1].forEach(s=>pt(body,'b',0x111111,.26,.07,.1,s*.2,3.22,.43,0,0,s*.35))}
 const au=new THREE.Mesh(gA,new THREE.MeshBasicMaterial({color:ch.fc,transparent:true,opacity:.3,depthWrite:false}));au.position.y=1.9;au.visible=false;g.add(au);
 const r=new THREE.Mesh(gR,new THREE.MeshBasicMaterial({color:tag,side:THREE.DoubleSide}));r.rotation.x=-Math.PI/2;r.position.y=.05;r.visible=false;g.add(r);
 g.userData={hair,au,ring:r,rig};return g}
// animação fluida do corpo
function anim(p,dt){
 if(p===pvp){updateFormStyle(p.m);limbs(p,dt);return}const u=p.m.userData;updateFormStyle(p.m);
 if(!u.rig){
  const mv=Math.min(1,Math.hypot(p.vx||0,p.vz||0)/14),air=p.y>.4,chg=p.charge&&!p.tf&&p.ki<100;p.m.rotation.order='YXZ';
  p.ph=(p.ph||0)+dt*(2+mv*8);
  const fx=Math.sin(p.m.rotation.y),fz=Math.cos(p.m.rotation.y),fwd=((p.vx||0)*fx+(p.vz||0)*fz)/14,side=((p.vx||0)*fz-(p.vz||0)*fx)/14;
  let tx=fwd*(air?.7:.25),tz=-side*(air?.5:.2),by=0,sc=1;
  if(air){by=Math.sin(T*3+p.x)*.12;tx+=.1}else if(mv>.05){by=Math.abs(Math.sin(p.ph))*.12;tz+=Math.sin(p.ph)*.05*mv}else by=Math.sin(T*2+p.x)*.02;
  if(chg){tx=-.12+Math.sin(T*30)*.02;by=-.1+Math.sin(T*25)*.03;sc=.94}
  if(p.sh>0)tx=-.15;
  if(p.mc>0){const w=Math.sin((1-p.mc/.4)*Math.PI);tx=.3*w;tz+=.15*w*(Math.floor(T/.4)%2?1:-1)}
  if(p.land>0){p.land-=dt;sc=1-.12*Math.sin(Math.max(0,p.land)/.25*Math.PI)}
  if(Math.hypot(p.kx,p.kz)>15)spawnP(p.x,p.y+1.8,p.z,0,0,0,.3);
  if(p.tf&&Math.random()<.6)spawnP(p.x+(Math.random()-.5)*3,p.y+Math.random()*3,p.z+(Math.random()-.5)*3,0,3+Math.random()*3,0,.8);
  if(u.eyes)u.eyes.forEach(m=>m.material.color.setHex(p.tf?EYE[p.ch.n]:(EYEB[p.ch.n]||0x111111)));
  if(u.sk2)u.sk2.forEach(m=>m.material.color.setHex(p.tf?p.ch.ts:u.sk0));
  if(u.tfx){u.tfx.visible=p.tf;if(p.tf)u.tfx.children.forEach(m=>{if(!m.userData.st)m.rotation.z=m.userData.rz+Math.sin(T*3+m.userData.ph)*.12})}
  if(u.hideTf)u.hideTf.forEach(m=>m.visible=!p.tf);
  if(p.gd){let sh=u.shield;if(!sh){sh=u.shield=new THREE.Mesh(gS,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.3,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));p.m.add(sh)}
   const st=SHD[p.ch.n]||{},sz=st.s||[2.8,2.8,2.8];sh.visible=true;sh.material.color.setHex(st.c||p.ch.fc);sh.scale.set(sz[0],sz[1],sz[2]);sh.position.set(0,1.9,st.z||0);sh.material.opacity=.25+.08*Math.sin(T*18)}
  else if(u.shield)u.shield.visible=false;
  u.hair.forEach(h=>{if(h.geometry!==U.k)return;const s0=h.userData.s0||(h.userData.s0=h.scale.clone()),f=p.tf?1.18:1;h.scale.set(s0.x*f,s0.y*f,s0.z*f)});
  if(u.flames){const on=p.tf||chg;u.flames.visible=on;if(on){const col=p.tf?(AU[p.ch.n]?AU[p.ch.n][0]:p.ch.fc):0xaee8ff,gr=p.tf?1:.5+Math.min(p.cc||0,2.5)*.2;u.flames.children.forEach((m,i)=>{const d=m.userData,pulse=1+.07*Math.sin(T*5+d.ph),sy=d.h*gr*pulse,a=d.a+T*.12;m.scale.set(d.w*gr,sy,1);m.position.set(Math.cos(a)*d.r*gr,.65+sy*.46,Math.sin(a)*d.r*gr);m.rotation.z=Math.cos(a)*.08;m.material.color.setHex(col);m.material.opacity=.1+.07*(.5+.5*Math.sin(T*7+d.ph+i))})}}
  if(u.bolts){u.bolts.visible=p.tf;if(p.tf&&Math.floor(T*14)!=Math.floor((T-dt)*14))u.bolts.children.forEach(b=>{b.position.set((Math.random()-.5)*2.4,.4+Math.random()*3.2,(Math.random()-.5)*1.6);b.rotation.set(Math.random()*3,0,Math.random()*3);b.scale.set(.08,.6+Math.random()*1.3,.08)})}
  if(u.shirt){u.shirt.forEach(m=>m.visible=!p.tf);u.bare.forEach(m=>m.visible=p.tf)}
  if(p.fl>0){p.fl-=dt;const v=p.fl>0?.6:0;p.m.traverse(o=>{if(o.material&&o.material.emissive)o.material.emissive.setRGB(v,v*.3,v*.3)})}
  const k=1-Math.exp(-14*dt),q=p.mt||(p.mt={x:0,z:0,y:0,s:1,g:1,w:1});
  q.x+=(tx-q.x)*k;q.z+=(tz-q.z)*k;q.y+=(by-q.y)*k;q.s+=(sc-q.s)*k;q.g+=((p.tf?(BIG[p.ch.n]||1.05):(BASE[p.ch.n]||1))-q.g)*k;q.w+=((p.tf&&(p.ch.n=='Broly'||p.ch.n=='Kefla')?1.2:1)-q.w)*k;
  if(p.bar&&p.bar.visible){p.barT-=dt;if(p.barT<=0)p.bar.visible=false;else if(p.hp!==p.barHp)drawBar(p)}
  p.m.rotation.x=q.x;p.m.rotation.z=q.z;p.m.position.y=p.y+q.y;p.m.scale.set(q.g*q.w,q.s*q.g,q.g*q.w);limbs(p,dt);p.sh=(p.sh||0)-dt;return}
 const r=u.rig;if(!r)return;
 const mv=Math.min(1,Math.hypot(p.ix,p.iz)),air=p.y>.4,chg=p.charge&&!p.tf&&p.ki<100;p.sh=(p.sh||0)-dt;
 p.ph=(p.ph||0)+dt*(mv>.05?10*p.ch.sp*(p.tf?1.3:1):2);
 const s=Math.sin(p.ph),c=Math.cos(p.ph),t={lean:0,twist:0,y:Math.sin(T*2+p.x)*.015,h:[-.1,.1],k:[.15,.15],s:[-.35,-.35],sz:[-.12,.12],e:[-1.2,-1.2]};
 if(air){t.lean=.15+.5*mv;t.h=[.5,.3];t.k=[.9,.6];t.s=[.5,.5];t.e=[-.3,-.3];t.sz=[-.15,.15];t.y=0}
 else if(mv>.05){t.lean=.12;t.h=[s*.9,-s*.9];t.k=[Math.max(0,-s)+.1,Math.max(0,s)+.1];t.s=[-s*.7-.2,s*.7-.2];t.e=[-.9,-.9];t.y=Math.abs(c)*.08}
 if(chg){t.y=-.35;t.h=[-.6,-.6];t.k=[1.1,1.1];t.s=[0,0];t.sz=[-.7,.7];t.e=[-.2,-.2];t.lean=.2}
 if(p.sh>0){t.s=[-1.55,-1.55];t.e=[-.1,-.1];t.sz=[-.1,.1];t.lean=.1}
 if(p.mc>0){const u=Math.sin((1-p.mc/.4)*Math.PI),a=Math.floor(T/.4)%2;t.s[a]=-1.6*u-.2;t.e[a]=-.2;t.twist=(a?-1:1)*.5*u;t.s[1-a]=.4*u}
 const z=p.pz||(p.pz=JSON.parse(JSON.stringify(t))),k=1-Math.exp(-16*dt);
 for(const q in t){if(Array.isArray(t[q]))for(let i=0;i<2;i++)z[q][i]+=(t[q][i]-z[q][i])*k;else z[q]+=(t[q]-z[q])*k}
 r.body.rotation.x=z.lean;r.body.rotation.y=z.twist;r.body.position.y=z.y;
 for(let i=0;i<2;i++){r.hip[i].rotation.x=z.h[i];r.knee[i].rotation.x=z.k[i];r.sh[i].rotation.x=z.s[i];r.sh[i].rotation.z=z.sz[i];r.el[i].rotation.x=z.e[i]}}
const EYEB={Freeza:0xcc1133},EYE={Goku:0xc8d6ff,'Goku Black':0xff9fc0,Vegeta:0xb070ff,Gohan:0xff3a3a,Naruto:0xff6a00,Sasuke:0xff2020,Asta:0xff2a2a,Kefla:0xffffff,Gogeta:0x26e0d0,Saitama:0xffffff,Gojo:0x6ac8ff,Itadori:0xff2030,Megumi:0x8a5aff,Broly:0xffffff,Jiren:0xff4040,Piccolo:0xffee66,Freeza:0xff2244},BIG={Broly:1.32,Jiren:1.1,Piccolo:1.12,Freeza:1.08,Goku:1,'Goku Black':1,Vegeta:1.12,Gohan:1.1,Naruto:1.08,Sasuke:2.2,Asta:1.12,Kefla:1.5,Gogeta:1.05,Saitama:1.05,Gojo:1.05,Itadori:1.08,Megumi:1.05},BASE={Kefla:.8};
// novos personagens (usam a estrutura de outro lutador com cores e detalhes próprios)
const AL={Naruto:['Goku','NarutoB'],Sasuke:['Gohan','SasukeB'],Asta:['Goku','AstaB'],Kefla:['Goku','KeflaB'],Gogeta:['Goku','GogetaB'],Saitama:['Jiren','SaitamaB'],Gojo:['Goku','GojoB'],Itadori:['Gohan','ItadoriB'],Megumi:['Goku','MegumiB']};
const ACC={Naruto:[0x222222,0x222222,0x20306a],Asta:[0x555566,0xdddddd,0x2a2a34],Kefla:[0xf2a22a,0xe0e0e8,0xf2a22a],Gogeta:[0xf2f2f2,0xff8a1e,0xff8a1e],Gojo:[0x16161f,0x16161f,0x16161f],Megumi:[0x1b2440,0x1b2440,0x1b2440]};
function mk(ch,tag){
 const al=AL[ch.n];if(!al)return mkOld3(ch,tag);
 const b=al[0],c2={...ch,n:b},og=O[b];O[b]=O[al[1]];
 const g=mkBase(c2,tag);deco(g,c2);deco2(g,c2);O[b]=og;extras(g,ch);extras2(g,ch);addModelDetails(g,ch);attachPlayerAura(g,ch);rigify(g);if(ch.n=='Asta')attachSword(g);return g}
function extras(g,ch){
 const k=ch.n,L=toonMaterial,tfx=new THREE.Group();tfx.visible=false;g.add(tfx);g.userData.tfx=tfx;
 const pt=(t,c,sx,sy,sz,x,y,z,rx,rz)=>{const m=new THREE.Mesh(U[t],L(c));m.scale.set(sx,sy,sz);m.position.set(x,y,z);m.rotation.set(rx||0,0,rz||0);g.add(m);return m};
 const tf=(t,c,add,sx,sy,sz,x,y,z,rx,rz)=>{const m=new THREE.Mesh(U[t],add?new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}):L(c));m.scale.set(sx,sy,sz);m.position.set(x,y,z);m.rotation.set(rx||0,0,rz||0);m.userData={rz:rz||0,ph:Math.random()*6};tfx.add(m);return m};
 g.userData.shirt=(g.userData.shirt||[]).filter(m=>{const d=m.geometry===U.c&&Math.abs(m.scale.y-.04)<.001;if(d)m.visible=false;return !d});
 const A=ACC[k];
 g.traverse(m=>{if(!m.isMesh||!m.material.color||m.parent===tfx)return;const h=m.material.color.getHex();
  if(A){if(h==0x1f4fa8)m.material.color.setHex(m.scale.y>.6?A[0]:A[1]);else if(h==0xf5c518)m.material.color.setHex(A[2])}
  if(k=='Sasuke'||k=='Itadori'){if(h==0xffffff&&m.geometry===U.c&&Math.abs(m.position.y-2.35)<.01)m.material.color.setHex(k=='Sasuke'?0x2a3560:0xc0303a);else if(h==0xc9302c&&m.geometry===U.b)m.material.color.setHex(k=='Sasuke'?0x6a4a9a:0xc0303a)}});
 if(k=='Naruto'){
  pt('c',0x2a3f8f,1.08,.16,1,0,3.02,-.02);pt('b',0xc0c8d8,.34,.13,.05,0,3.02,.48);
  [-1,1].forEach(s=>{for(let i=-1;i<=1;i++)pt('b',0x7a4a2a,.14,.02,.02,s*.4,2.62+i*.05,.3,0,s*i*.3)});
  for(let i=0;i<5;i++){const a=(i-2)*.5;tf('k',0xffc21a,1,.4,3.4,.4,Math.sin(a)*.9,1.7,-.7,-1.1,a*.9)}
  [-1,1].forEach(s=>tf('k',0xffc21a,1,.28,.7,.2,s*.32,3.55,0,0,-s*.2))}
 if(k=='Sasuke'){tf('s',0x7a4aff,1,3.4,4.4,2.8,0,1.9,0);tf('s',0x9a70ff,1,1.5,1.5,1.5,-1.3,2.7,0);tf('s',0x9a70ff,1,1.5,1.5,1.5,1.3,2.7,0);[-1,1].forEach(s=>{tf('k',0xb08aff,1,.5,2,.5,s*.6,4.2,0,0,-s*.3)});tf('b',0xb08aff,1,.35,.35,4.5,1.9,2.2,1.5)}
 if(k=='Asta'){
  
  [-1,1].forEach(s=>{tf('k',0x2a0a18,0,.28,1.2,.28,s*.3,3.5,.05,0,-s*.25);tf('b',0xff2a3a,1,.05,.5,.03,s*.78,1.8,.05,0,s*.2)});
  [[-.15,2.1],[.2,1.9],[.05,1.6],[-.22,1.75]].forEach(([x,y],i)=>tf('b',0xff2a3a,1,.04,.35,.03,x,y,.42,0,i%2?.5:-.4))}
 if(k=='Kefla'){
  g.userData.armX=.68;
  g.children.slice().forEach(m=>{if(!m.isMesh)return;const x=m.position.x,y=m.position.y,ax=Math.abs(x);
   if(ax>.55&&ax<.85&&y>1.2&&y<2.5){m.scale.x*=.6;m.scale.z*=.6}
   else if(y<1.2&&Math.abs(ax-.22)<.021){m.scale.x*=.7;m.scale.z*=.7}
   else if(y>=1.3&&y<2.45&&ax<.1&&m.geometry===U.c){m.scale.x*=.68}
   else if(m.material.color){const h=m.material.color.getHex();if(h==0x0a0a0a)m.scale.y*=.5;else if(h==0x3a1a1a||(h==0xffffff&&m.geometry===U.b))m.visible=false}});
  pt('s',0x222230,.95,.6,.62,0,1.2,0);const hrk=g.userData.hair;[-1,1].forEach(s=>hrk.push(pt('k',0x111111,.45,1.7,.45,s*.18,2.85,-.55,-1,0)));
  [-1,1].forEach(s=>{pt('s',0xf2a22a,.62,.55,.5,s*.22,2.15,.33);pt('s',0x3ac86a,.12,.2,.08,s*.55,2.62,0)});g.userData.shirt=[];g.userData.bare=(g.userData.bare||[]).filter(m=>m.geometry!==U.c);
  const bg=new THREE.Group();bg.visible=false;g.add(bg);g.userData.bolts=bg;for(let i=0;i<5;i++)bg.add(new THREE.Mesh(U.b,new THREE.MeshBasicMaterial({color:0xbfff66,blending:THREE.AdditiveBlending,transparent:true})))}}
function mkOld3(ch,tag){
 const B=ch.n=='Goku Black',c2=B?{...ch,n:'Goku'}:ch,og=O.Goku;if(B)O.Goku=O.GokuB;
 const g=mkBase(c2,tag);deco(g,c2);deco2(g,c2);if(B)O.Goku=og;addModelDetails(g,ch);rigify(g);
 if(B){g.traverse(m=>{if(!m.isMesh||!m.material.color)return;const h=m.material.color.getHex();if(h==0x1f4fa8)m.material.color.setHex(m.scale.y>.6?0xb8b8c4:0xe0558c);else if(h==0xf5c518)m.material.color.setHex(0xe0558c)});
  g.userData.shirt=g.userData.shirt.filter(m=>{const d=m.geometry===U.c&&Math.abs(m.scale.y-.04)<.001;if(d)m.visible=false;return !d});
  const e=new THREE.Mesh(U.s,toonMaterial(0x3ac86a));e.scale.set(.12,.2,.08);e.position.set(-.55,1.32,0);g.userData.R.up.add(e)}
 attachPlayerAura(g,ch);return g}
function deco(g,ch){
 const k=ch.n,hr=g.userData.hair,L=toonMaterial;
 const pt=(t,c,sx,sy,sz,x,y,z,rec,rx,rz)=>{const m=new THREE.Mesh(U[t],L(c));m.scale.set(sx,sy,sz);m.position.set(x,y,z);m.rotation.set(rx||0,0,rz||0);g.add(m);if(rec)hr.push(m);return m};
 [-1,1].forEach(s=>pt('b',0x111111,.2,.045,.06,s*.18,2.98,.43,0,0,s*.25));
 pt('s',0xd9a070,.09,.09,.09,0,2.7,.47);
 const sk=O[k].sk,dk=(((sk>>16&255)*.82|0)<<16)|(((sk>>8&255)*.82|0)<<8)|((sk&255)*.82|0);
 const absL=[pt('b',dk,.52,.85,.04,0,1.78,.305)];
 [-1,1].forEach(s=>{absL.push(pt('s',sk,.34,.28,.2,s*.17,2.17,.3));for(let r=0;r<3;r++)absL.push(pt('b',sk,.2,.2,.07,s*.11,1.95-r*.22,.325))});
 const hs=(x,y,z,w,h,rx,rz)=>pt('k',ch.h,w,h,w,x,y,z,true,rx,rz);
 if(k=='Goku'||k=='Vegeta'||k=='Gohan'||k=='Broly')pt('s',ch.h,1.06,.5,.98,0,3.2,-.1,true);
 if(k=='Goku'){hs(0,3.2,.38,.3,.7,1.9);hs(-.22,3.15,.36,.26,.6,1.8,.3);hs(.22,3.15,.36,.26,.6,1.8,-.3);[-1,1].forEach(s=>{hs(s*.5,3,0,.3,.8,0,-s*1.2);hs(s*.2,3.1,-.4,.36,.9,-1,0)})}
 if(k=='Vegeta'){hs(0,3.95,0,.55,1.6);[-1,1].forEach(s=>{hs(s*.3,3.8,0,.42,1.4,0,-s*.2);hs(s*.5,3.5,0,.38,1.1,0,-s*.4)})}
 if(k=='Gohan'){hs(0,3.25,.4,.28,.6,1.8);hs(-.2,3.2,.38,.24,.5,1.7,.3);hs(.2,3.2,.38,.24,.5,1.7,-.3);[-1,1].forEach(s=>hs(s*.5,3,0,.28,.7,0,-s*1.2))}
 if(k=='Broly'){hs(0,4,0,.6,1.8);hs(0,3.3,-.4,.5,1.1,-.8);hs(0,3.25,.4,.3,.7,1.8);[-1,1].forEach(s=>{hs(s*.35,3.8,0,.5,1.5,0,-s*.3);hs(s*.55,3.5,0,.45,1.3,0,-s*.6);hs(s*.65,3.2,0,.4,1,0,-s*1.1)})}pt('b',k=='Freeza'?0x7a3fb0:0xa8553a,.14,.035,.05,0,2.55,.44);
 if(k=='Goku'){pt('c',0xffffff,.22,.04,.22,-.22,2,.33,0,Math.PI/2);pt('c',0xffffff,.4,.04,.4,0,2,-.33,0,Math.PI/2);pt('b',0x1f4fa8,.2,.5,.08,.25,1,.35,0,0,.2);[-1,1].forEach(s=>pt('c',0xf5c518,.5,.1,.62,s*.22,.52,.05))}
 if(k=='Vegeta'){pt('k',0x111111,.3,.4,.2,0,3.08,.4,true,Math.PI);[-1,1].forEach(s=>{pt('b',0xf2f2f2,.4,.35,.62,s*.32,1.1,0,0,0,s*.15);pt('c',0xf5c518,.5,.1,.62,s*.22,.52,.05)})}
 if(k=='Gohan'){pt('c',0xffffff,.5,.15,.5,0,2.35,0);pt('b',0xc9302c,.2,.5,.08,.25,1,.35,0,0,.2)}
 if(k=='Freeza')[-1,1].forEach(s=>pt('s',0xcc1133,.12,.2,.05,s*.18,2.79,.5));
 if(k=='Jiren')[-1,1].forEach(s=>{pt('b',0x111111,.08,.9,.06,s*.3,1.9,.32);pt('b',0x111111,.5,.2,.6,s*.62,2.3,0)});
 if(k=='Broly'){pt('k',0x6aa83a,1.3,.9,.9,0,1,0);pt('b',0xc9b48a,.5,.6,.06,0,.95,.43)}
 const eyes=[];[-1,1].forEach(s=>{const m=pt('s',0x111111,.12,.19,.04,s*.18,2.79,.515);m.material=new THREE.MeshBasicMaterial({color:EYEB[k]||0x111111});eyes.push(m)});g.userData.eyes=eyes;
 const fg=new THREE.Group();fg.visible=false;g.add(fg);g.userData.flames=fg;
 for(let i=0;i<14;i++){const a=i/14*6.283,inner=i%3===0,m=new THREE.Sprite(new THREE.SpriteMaterial({map:gTex,color:ch.fc,transparent:true,opacity:.2,depthWrite:false,blending:THREE.AdditiveBlending}));m.position.set(Math.cos(a)*(inner?.58:.9),1.2,Math.sin(a)*(inner?.58:.9));m.userData={a,ph:Math.random()*6,h:2+Math.random()*1.5,r:inner?.58:.9,w:.28+Math.random()*.18};fg.add(m)}
 if(k=='Gohan'||k=='Broly'){const bg=new THREE.Group();bg.visible=false;g.add(bg);g.userData.bolts=bg;for(let i=0;i<5;i++)bg.add(new THREE.Mesh(U.b,new THREE.MeshBasicMaterial({color:k=='Gohan'?0xffffff:0xbfff66,blending:THREE.AdditiveBlending,transparent:true})))}
 if(k=='Goku'||k=='Broly'){
  const sh=[],bare=absL.slice(),sk2=O[k].sk;
  if(k=='Goku'){
   g.children.forEach(m=>{if(!m.isMesh)return;const y=m.position.y,x=Math.abs(m.position.x);
    if(m.geometry===U.c&&Math.abs(y-1.85)<.01&&((x<.01&&Math.abs(m.scale.x-1)<.01)||Math.abs(x-.68)<.01))sh.push(m);
    else if(m.geometry===U.b&&Math.abs(m.scale.z-.06)<.001&&Math.abs(m.scale.x-.4)<.001)sh.push(m);
    else if(m.geometry===U.c&&Math.abs(m.scale.y-.04)<.001)sh.push(m)});
   bare.push(pt('c',sk2,1,1.05,.62,0,1.85,0));[-1,1].forEach(s=>bare.push(pt('c',sk2,.3,1,.3,s*.68,1.85,0,0,0,s*.14)));
  }else{const sc=0x2f3a4f;sh.push(pt('c',sc,1.06,1.07,.68,0,1.85,0));[-1,1].forEach(s=>sh.push(pt('c',sc,.36,.45,.36,s*.68,2.1,0,0,0,s*.14)))}
  bare.forEach(m=>m.visible=false);g.userData.shirt=sh;g.userData.bare=bare}
 if(k!='Goku'&&k!='Broly'){
  const sh=[],bare=absL.slice(),sk3=O[k].sk,sr2=k=='Piccolo'||k=='Jiren';
  g.children.forEach(m=>{if(!m.isMesh)return;const y=m.position.y,x=Math.abs(m.position.x),c=m.material.color?m.material.color.getHex():0,gm=m.geometry;
   if(gm===U.c&&Math.abs(y-1.85)<.01&&((x<.01&&Math.abs(m.scale.x-1)<.01)||Math.abs(x-.68)<.01))sh.push(m);
   else if(k=='Vegeta'&&((c==0xf5c518&&gm===U.s)||(c==0x2a4fb8&&gm===U.c&&Math.abs(y-1.5)<.01)))sh.push(m);
   else if(k=='Gohan'&&((gm===U.c&&Math.abs(y-2.35)<.01&&c==0xffffff)||(c==0xc9302c&&gm===U.b&&m.scale.y<.6&&y<1.2)))sh.push(m);
   else if(k=='Piccolo'&&c==0xf2f2f2&&gm===U.b&&(m.scale.x>1.5||x>.5))sh.push(m);
   else if(k=='Jiren'&&c==0x111111&&gm===U.b&&(Math.abs(m.scale.x-.08)<.001||Math.abs(m.scale.x-.5)<.001))sh.push(m)});
  bare.push(pt('c',sk3,1,1.05,.62,0,1.85,0,sr2));[-1,1].forEach(s=>bare.push(pt('c',sk3,.3,1,.3,s*.68,1.85,0,sr2,0,s*.14)));
  bare.forEach(m=>m.visible=false);g.userData.shirt=sh;g.userData.bare=bare}}
function mkBase(ch,tag){
 const g=new THREE.Group(),hair=[],o=O[ch.n],k=ch.n,H=ch.h,sr=k=='Piccolo'||k=='Jiren',L=toonMaterial;
 const pt=(t,c,sx,sy,sz,x,y,z,rec,rx,rz)=>{const m=new THREE.Mesh(U[t],L(c));m.scale.set(sx,sy,sz);m.position.set(x,y,z);m.rotation.set(rx||0,0,rz||0);g.add(m);if(rec)hair.push(m);return m};
 const sp=(x,y,z,w,h,rx,rz)=>pt('k',H,w,h,w,x,y,z,true,rx,rz);
 for(const s of[-1,1]){
  const leg=s*.22,arm=s*.68;
  pt('c',o.pants,.39,.72,.4,leg,.94,0);pt('s',o.pants,.31,.3,.32,leg,.65,0);pt('c',o.pants,.3,.68,.32,leg,.48,0);
  pt('b',o.boot,.46,.5,.62,leg,.25,.05);
  pt('s',o.arm,.4,.35,.37,s*.54,2.17,0);
  pt('s',o.arm,.4,.4,.38,arm,2.14,0);pt('c',o.arm,.32,.6,.31,arm,1.98,0);
  pt('s',o.arm,.3,.29,.29,arm,1.68,0);pt('c',o.arm,.28,.58,.28,arm,1.45,0);
  pt('s',o.gl,.27,.25,.26,arm,1.14,.02,sr);pt('c',o.wr,.34,.2,.34,arm,1.42,0,0,0,s*.14);
  pt('s',o.gl,.29,.21,.31,arm,1.02,.04,sr);
  for(let finger=0;finger<4;finger++)pt('s',o.gl,.055,.14,.055,arm+s*(finger-1.5)*.08,.91,.22,sr);
  pt('s',o.gl,.07,.15,.07,arm-s*.12,1.02,.11,sr,0,0,s*.75);
  pt('s',0xffffff,.2,.24,.08,s*.18,2.8,.42);pt('s',0x111111,.1,.17,.08,s*.18,2.79,.46);
 }
 pt('s',o.top,.95,1.04,.62,0,1.85,0);pt('s',o.top,.53,.34,.36,0,2.12,.02);pt('c',o.belt,1.04,.2,.66,0,1.3,0);
 pt('c',o.sk,.3,.32,.3,0,2.42,0,sr);pt('s',o.sk,1,1.05,.92,0,2.75,0,sr);
 if(k=='Goku'){pt('b',0x1f4fa8,.36,.7,.06,0,1.95,.32);sp(0,3.5,0,.5,1.1);for(const s of[-1,1]){sp(s*.3,3.4,0,.45,1,0,-s*.4);sp(s*.5,3.15,0,.4,.85,0,-s*.9);sp(s*.15,3.1,.4,.28,.7,.9,-s*.1)}sp(0,3.3,-.35,.45,.9,-.6,0)}
 if(k=='Vegeta'){pt('c',0x2a4fb8,.7,.4,.5,0,1.5,0);for(const s of[-1,1]){pt('s',0xf5c518,.5,.38,.5,s*.58,2.3,0);sp(s*.3,3.55,0,.45,1.2,0,-s*.25);sp(s*.5,3.3,0,.4,.9,0,-s*.7)}sp(0,3.65,0,.5,1.4);sp(0,3.15,.42,.3,.6,.7,0)}
 if(k=='Gohan'){for(const s of[-1,1]){sp(s*.3,3.3,0,.4,.8,0,-s*.5);sp(s*.5,3.1,0,.35,.6,0,-s*.9)}sp(0,3.4,0,.45,.9);sp(0,3.1,.42,.3,.8,1,0)}
 if(k=='Broly'){pt('c',0xeeeeee,1.1,.14,.74,0,1.45,0);for(const s of[-1,1]){sp(s*.3,3.55,0,.5,1.3,0,-s*.3);sp(s*.5,3.35,0,.45,1.1,0,-s*.7);sp(s*.65,3.1,0,.4,.8,0,-s*1.1)}sp(0,3.7,0,.55,1.5);sp(0,3.3,-.35,.5,1,-.6,0);sp(0,3.1,.4,.3,.7,.9,0)}
 if(k=='Piccolo'){pt('b',0xf2f2f2,1.6,1.3,.12,0,1.75,-.42);pt('s',0xf2f2f2,1.04,.55,.96,0,3.12,-.02);for(const s of[-1,1]){pt('b',0xf2f2f2,.55,.2,.7,s*.62,2.4,0,0,0,-s*.1);pt('k',H,.1,.7,.1,s*.15,3.55,.1,true,0,-s*.3);pt('k',H,.18,.5,.18,s*.52,2.8,0,true,0,-s*1.5)}}
 if(k=='Freeza'){pt('s',H,.98,.55,.92,0,3,-.02,true);pt('c',H,1,.6,.66,0,1.95,0,true);pt('k',0xf2eef8,.3,1.4,.3,0,.5,-.55,0,-1.2,0);for(const s of[-1,1]){pt('k',0xf2eef8,.2,.8,.2,s*.38,3.35,.05,0,0,-s*.35);pt('s',H,.5,.4,.5,s*.6,2.3,0,true);pt('c',H,.32,.5,.32,s*.76,1.55,0,true,0,s*.14)}}
 if(k=='Jiren'){for(const s of[-1,1])pt('b',0x111111,.26,.07,.1,s*.2,3.0,.43,0,0,s*.35)}
 const au=new THREE.Mesh(gA,new THREE.MeshBasicMaterial({color:ch.fc,transparent:true,opacity:.3,depthWrite:false}));au.position.y=1.8;au.visible=false;g.add(au);
 const r=new THREE.Mesh(gR,new THREE.MeshBasicMaterial({color:tag,side:THREE.DoubleSide}));r.rotation.x=-Math.PI/2;r.position.y=.05;r.visible=false;g.add(r);
 g.userData={hair,au,ring:r};return g}
function mkOld(ch,tag){
 const g=new THREE.Group(),L=toonMaterial,o=O[ch.n]||O[(AL[ch.n]||[])[1]]||{},part=(geo,c,sx,sy,sz,x,y,z)=>{const m=new THREE.Mesh(geo,L(c));m.scale.set(sx,sy,sz);m.position.set(x,y,z);g.add(m);return m};
 const b=part(gB,o.top||ch.c,1,1,1,0,1.1,0);
 const skin=o.sk||0xf1c27d;
 [-1,1].forEach(s=>{part(U.c,o.pants||ch.c,.38,.9,.38,s*.23,.57,0);part(U.b,o.boot||ch.c,.48,.32,.62,s*.23,.22,.08);
  part(U.s,o.arm||o.top||ch.c,.34,.36,.34,s*.62,1.65,0);part(U.c,o.arm||o.top||ch.c,.28,.8,.28,s*.68,1.3,0);
  part(U.s,o.gl||skin,.3,.28,.3,s*.7,.82,.02);part(U.c,o.wr||o.belt||ch.fc,.3,.13,.3,s*.68,1.02,0);
  part(U.s,o.pants||ch.c,.23,.22,.06,s*.23,.62,.2)});
  part(U.c,o.belt||ch.fc,1.02,.12,.68,0,.53,0);
 const h=part(gH,skin,1,1,1,0,2.1,0);
 const hair=[];for(let i=0;i<5;i++){const c=new THREE.Mesh(gC,L(ch.h));const a=i/5*6.28;c.position.set(Math.cos(a)*.22,2.55,Math.sin(a)*.22);c.rotation.set(Math.sin(a)*.5,0,-Math.cos(a)*.5);g.add(c);hair.push(c)}
 const au=new THREE.Mesh(gA,new THREE.MeshBasicMaterial({color:ch.fc,transparent:true,opacity:.3,depthWrite:false}));au.position.y=1.4;au.visible=false;g.add(au);
 const r=new THREE.Mesh(gR,new THREE.MeshBasicMaterial({color:tag,side:THREE.DoubleSide}));r.rotation.x=-Math.PI/2;r.position.y=.05;r.visible=false;g.add(r);
 g.userData={hair,au,b,h};addModelDetails(g,ch,true);attachPlayerAura(g,ch);return g}
function clear(){if(P)P.forEach(p=>scene.remove(p.m));if(items)items.forEach(i=>scene.remove(i.m));if(pr)pr.forEach(b=>scene.remove(b.m))}
function start(matchData=null){
 netMatch=matchData;netPlayerId=matchData&&matchData.playerId;netQueued=false;netPending=false;updateMatchmaking('',false);
 setScene(scn);clearTerrainDebris();endFus();clear();P=[];items=[];pr=[];feed=[];zc=Z[0];zi=0;zph='w';zt=0;T=0;cdn=5;cut=null;if(spcut&&spcut.orb)scene.remove(spcut.orb);spcut=null;beams.forEach(b=>b.m.forEach(m=>scene.remove(m)));beams.length=0;doms.forEach(removeDomain);doms.length=0;dcut=null;$('cut').style.display='none';parts.length=0;waves.forEach(w=>scene.remove(w.m));waves.length=0;
 const roster=matchData?matchData.players:[],localEntry=roster.find(p=>p.id===netPlayerId),localTeam=mode=='solo'||mode=='x1'?(localEntry?localEntry.slot:0):Math.floor((localEntry?localEntry.slot:0)/5);
 let seed=(matchData&&matchData.seed||Date.now())>>>0;
 const randomForSlot=(slot,salt)=>{let n=(seed^Math.imul(slot+1,0x9e3779b1)^salt)>>>0;return()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296}};
 const total=TRAIN?1:matchData?Math.max(matchData.totalPlayers,roster.length):50;
 for(let i=0;i<total;i++){const entry=roster.find(p=>p.slot===i),isLocal=(!!entry&&entry.id===netPlayerId)||(!matchData&&i===0),isBot=!entry&&!isLocal,rng=randomForSlot(i,0x7f4a7c15),ch=entry?CH[entry.character]:i==0&&!matchData?CH[sel]:CH[Math.floor(rng()*CH.length)],form=isLocal?formSel:entry?entry.form:((seed+Math.imul(i+1,0x9e3779b1))>>>0)%FORM_COUNT,team=mode=='solo'||mode=='x1'?i:Math.floor(i/5);
  let x=entry?entry.x:(rng()*AH*1.6-AH*.8),z=entry?entry.z:(rng()*AH*1.6-AH*.8);while(inMt(x,z,0,3)){x=rng()*AH*1.6-AH*.8;z=rng()*AH*1.6-AH*.8}
  const p={x,y:entry?entry.y:0,z,vy:0,kx:0,kz:0,ky:0,hp:100,ki:30,team,ch,form,slot:i,bot:isBot,remoteBot:!!matchData&&!entry&&!netIsHost,botTarget:{x,y:0,z,yaw:0,tf:false,hp:100,alive:true},remote:!!entry&&!isLocal,netId:entry&&entry.id,netTarget:entry?{x,y:entry.y,z,yaw:0,pitch:0,tf:false}:null,alive:true,tf:false,cd:0,mc:0,sc:0,dc:0,kills:0,at:0,wx:0,wz:0,td:1e9,ix:0,iz:0,ad:[0,0,-1],name:isLocal?'VOCÊ':entry?entry.name:ch.n+' '+(i+1)};
  const tag=isLocal?0xffd23a:team==localTeam?0x5cff5c:0xff4040;p.m=mk(ch,tag);applyFormStyle(p.m,form,ch);scene.add(p.m);P.push(p)}
 me=localEntry?P[localEntry.slot]:P[0];yaw=cyw=0;pitch=cpt=.3;P.forEach(p=>{while(inMt(p.x,p.z,0,3)){p.x=R(-AH*.8,AH*.8);p.z=R(-AH*.8,AH*.8)}});
 for(let i=0;i<110;i++){const t=Math.random()<.45?0:1,m=new THREE.Mesh(gS,new THREE.MeshBasicMaterial({color:t?0x3ac8ff:0x5cff5c}));m.scale.setScalar(.55);let x=R(-190,190),z=R(-190,190);while(inMt(x,z,1,2)){x=R(-190,190);z=R(-190,190)}m.position.set(x,1.2,z);scene.add(m);items.push({x,z,t,m})}
 $('cfg').style.display='none';$('lobby').style.display='none';$('end').style.display='none';$('gl').style.display='block';$('hud').style.display='block';state='play';last=performance.now();
}
$('go').onclick=enqueueMatch;$('mm-cancel').onclick=cancelMatchmaking;
function returnToLobby(){if(netSocket&&netMatch)netSocket.emit('room:leave');netMatch=null;netPlayerId=null;netQueued=false;state='lobby';clear();P=items=pr=null;$('cfg').style.display='none';$('hud').style.display='none';$('end').style.display='none';$('lobby').style.display='flex';try{document.exitPointerLock()}catch(e){};ui();prev()}
$('back').onclick=returnToLobby;
addEventListener('keydown',e=>{if(waitK){KB[waitK]=e.code;waitK=null;saveCfg();renderCfg();e.preventDefault();return}if(state==='play'&&KB.settings&&e.code===KB.settings&&!e.repeat){if($('cfg').style.display==='flex')closeSettings();else openMatchSettings();e.preventDefault();return}if($('cfg').style.display==='flex'){e.preventDefault();return}if(e.code=='Backspace'&&TRAIN&&state=='play')$('back').onclick();K[e.code]=1;if(e.code=='Space')e.preventDefault();
 if(e.code==KB.lock&&!e.repeat&&state=='play'){slk=!slk;if(slk)try{$('gl').requestPointerLock()}catch(x){}}
 if(e.code==KB.cam&&!e.repeat&&state=='play')fp=!fp});addEventListener('keyup',e=>K[e.code]=0);
$('gl').addEventListener('click',()=>{try{$('gl').requestPointerLock()}catch(e){}});
document.addEventListener('pointerlockchange',()=>locked=!!document.pointerLockElement);
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(locked||md||(slk&&state=='play')){yaw-=e.movementX*.0025*CFG.sens;pitch=Math.max(-.9,Math.min(1,pitch+e.movementY*.0025*CFG.sens))}});
addEventListener('mousedown',e=>{if(e.button==0)md=true});addEventListener('mouseup',()=>md=false);
const mul=p=>p.ch.dm*(p.tf?1.7:1);
function shootOld(p,big){p.sh=big?.8:.3;if(p===me)sfx(big?180:420,big?.5:.12,'sawtooth');
 const [a,b,c]=p.ad,v=big?40:50,m=new THREE.Mesh(gS,new THREE.MeshBasicMaterial({color:p.tf?p.ch.fc:p.ch.c}));
 m.scale.setScalar(big?2:.5);m.position.set(p.x+a*1.5,p.y+2.1+b*1.5,p.z+c*1.5);const col=p.tf?p.ch.fc:p.ch.c,core=new THREE.Mesh(gS,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.82,blending:THREE.AdditiveBlending,depthWrite:false}));core.scale.setScalar(.48);m.add(core);
 const glow=energyGlow(col,big?8:3.5);glow.position.copy(m.position);scene.add(m,glow);
 const shot={x:m.position.x,y:m.position.y,z:m.position.z,vx:a*v,vy:b*v,vz:c*v,style:'orb',scale:m.scale.toArray(),color:col,lifetime:big?1.5:1.2};
 if(p===me&&netSocket&&netMatch)netSocket.emit('combat:shot',shot);
 pr.push({m,glow,...shot,d:(big?40:7)*mul(p),o:p,r:big?2:.5,l:big?1.5:1.2,kn:big?40:10})}
function hit(p,d,by,kx,kz,ky,why){if(!p.alive)return;
 if(p.remoteBot){if(by===me&&netSocket&&netMatch)netSocket.emit('bot:hit',{slot:p.slot,damage:d});return}
 if(p.remote){if(netSocket&&netMatch){if(by===me)netSocket.emit('combat:hit',{targetId:p.netId,damage:d});else if(netIsHost&&by&&by.bot)netSocket.emit('bot:playerHit',{targetId:p.netId,sourceBotSlot:by.slot,damage:d})}return}
 if(p.gd&&by&&by!==p){const n=p.ch.n;if(n=='Naruto'&&(p.kw||0)<=0){p.kw=2.5;kawa(p);return}d*=GD[n]!=null?GD[n]:.25;kx*=.3;kz*=.3;p.ki=Math.max(0,p.ki-d*.8-1)}
 if(netSocket&&netMatch&&netIsHost&&p.bot&&by&&by!==p&&!by.remote)netSocket.emit('bot:hit',{slot:p.slot,sourceBotSlot:by.bot?by.slot:null,damage:d});
 if(netSocket&&netMatch&&netIsHost&&p===me&&by&&by.bot)netSocket.emit('bot:playerHit',{targetId:netPlayerId,sourceBotSlot:by.slot,damage:d});
 if(d>1){p.fl=.15;p.cc=0;if(p===me){sfx(120,.15,'square',.2);shake=Math.max(shake,.25)}}if(by&&by!==p&&by.team!==p.team)by.dd=(by.dd||0)+d;p.hp-=d;if(d>1)showBar(p);p.kx+=kx;p.kz+=kz;p.ky+=ky||0;if(p.hp<=0)die(p,by,why||'')}
function die(p,by,why){if(TRAIN&&p===me){p.x=p.z=0;p.y=0;p.vy=0;p.hp=100;p.kx=p.kz=p.ky=p.vx=p.vz=0;return}
 p.alive=false;p.hp=0;p.m.visible=false;if(by&&by!==p)by.kills++;
 if(p===me&&netSocket&&netMatch)netSocket.emit('player:eliminated');
 if(p.bot&&netSocket&&netMatch&&netIsHost)netSocket.emit('bot:eliminated',{slot:p.slot,attackerId:by===me?netPlayerId:null});
 feed.push({t:6,s:(by&&by!==p?by.name+' eliminou ':'')+p.name+(why?' ('+why+')':'')});
 const ex=new Set(P.filter(q=>q.alive&&q.team!=me.team).map(q=>q.team)).size;
 if(p===me)endGame(false,ex+1);else if(me.alive&&ex==0)endGame(true,1)}
function endGame(win,place){
 if(state!='play')return;state='end';try{document.exitPointerLock()}catch(e){}
 const sv=Math.floor(T/10),bonus=place==1?150:place<=3?80:place<=10?40:place<=25?15:0,pts=me.kills*25+bonus+sv;
 save.pts+=pts;let up='';
 if(save.pts>=300){if(save.rank<RANKS.length-1){save.rank++;up='🔥 PROMOÇÃO! Nova patente: '+RANKS[save.rank];save.pts-=300}else save.pts=299}
 persist();$('et').textContent=win?'VITÓRIA! 🏆':'ELIMINADO';
 $('ed').innerHTML='Posição: <b>#'+place+'</b><br>Eliminações: '+me.kills+' (+'+me.kills*25+')<br>Bônus de posição: +'+bonus+'<br>Sobrevivência: +'+sv+'<br><b>Total: +'+pts+' pts</b>';
 const st=Math.min(3,Math.floor(save.pts/75));$('eb').style.width=save.pts/3+'%';
 $('er').innerHTML=(up?up+'<br>':'')+RANKS[save.rank]+' '+'★'.repeat(st)+'☆'.repeat(4-st)+' · '+save.pts+'/300';
 setTimeout(()=>{if(state=='end')$('end').style.display='flex'},win?600:1200)}
function meleeHit(p){
 for(const q of P){if(!q.alive||q.team==p.team)continue;const dx=q.x-p.x,dy=q.y-p.y,dz=q.z-p.z,d=Math.hypot(dx,dy,dz)||.01;
  if(d<(p.ch.n=='Asta'?8.5:6)&&(dx*p.ad[0]+dz*p.ad[2])>-1){hit(q,11*mul(p)*(MB[p.ch.n]||1),p,dx/d*24,dz/d*24,dy/d*8);wave(q.x,q.y,q.z,p.ch.fc,1.8);for(let i=0;i<5;i++){const a=Math.random()*6.283,s=2+Math.random()*4;spawnP(q.x,q.y+1.5,q.z,Math.cos(a)*s,1+Math.random()*3,Math.sin(a)*s,.3)}}}}
function ai(p,dt){
 p.at-=dt;
 if(p.at<=0){p.at=R(.3,.6);let bd=1e9,b=null;for(const q of P)if(q.alive&&q.team!=p.team){const d=Math.hypot(q.x-p.x,q.z-p.z);if(d<bd){bd=d;b=q}}p.tg=b;p.td=bd;p.it=null;
  if(p.hp<60||p.ki<40){let bi=45;for(const it of items){const d=Math.hypot(it.x-p.x,it.z-p.z);if(d<bi&&(p.hp<60?it.t==0:it.t==1)){bi=d;p.it=it}}}
  p.wx=R(-zc*.7,zc*.7);p.wz=R(-zc*.7,zc*.7)}
 let dx=0,dz=0;p.fire=p.melee=p.spec=p.charge=p.dash=false;p.tr=p.ki>=99.5;p.up=false;p.down=false;p.gt=(p.gt||0)-dt;if(p.gt<=0&&p.hp<50&&p.td<30&&Math.random()<.01)p.gt=1.5;p.guard=p.gt>0;p.spec2=!!(DOM[p.ch.n]&&p.ki>70&&p.td<30&&Math.random()<.004);
 const t=p.tg,bd=p.td,edge=Math.max(Math.abs(p.x),Math.abs(p.z));let aimed=false;
 if(edge>zc-8){dx=-p.x;dz=-p.z}
 else if(p.it){dx=p.it.x-p.x;dz=p.it.z-p.z}
 else if(p.ki<20&&(!t||bd>50))p.charge=true;
 else if(t&&bd<65){
  const v=[t.x-p.x+R(-1,1),t.y-p.y+R(-.5,.5),t.z-p.z+R(-1,1)],l=Math.hypot(...v)||1;p.ad=v.map(c=>c/l);aimed=true;
  const hz=Math.hypot(v[0],v[2])||1,s=p.team%2?1:-1;
  if(bd>(CLOSE[p.ch.n]&&!(p.ch.n=='Asta'&&p.tf)?6.5:25)){dx=v[0]/hz;dz=v[2]/hz}else{dx=(-v[2]/hz*s)*.8+(v[0]/hz)*(bd<7?-.3:.5);dz=(v[0]/hz*s)*.8+(v[2]/hz)*(bd<7?-.3:.5)}
  p.up=t.y>p.y+2;
  if(bd<6)p.melee=true;else if(bd<55&&Math.random()<.5)p.fire=true;
  if(p.ki>55&&bd<45&&Math.random()<.02)p.spec=true;
 }else{
  if(mode=='squad'&&me.alive&&p.team==0&&Math.hypot(me.x-p.x,me.z-p.z)>35){dx=me.x-p.x;dz=me.z-p.z}else{dx=p.wx-p.x;dz=p.wz-p.z}}
 if(!p.up&&p.y>.4)p.down=true;const l=Math.hypot(dx,dz)||1;p.ix=dx/l;p.iz=dz/l;
 if(!aimed)p.ad=[p.ix,0,p.iz]}
function upd(dt){
 if(dcut){domUpd(dt);return}
 if(spcut){spUpd(dt);return}
 if(cut){cutUpd(dt);return}
 if(cdn>0){cdn-=dt;introCam();if(cdn<=0)introEnd();return}
 T+=dt;zt+=dt;if(TRAIN){zt=0;zc=Z[0]}
 if(zph=='w'&&zt>18){zph='s';zt=0;zfrom=zc;zto=Z[Math.min(zi+1,5)]}
 else if(zph=='s'){zc=zfrom+(zto-zfrom)*Math.min(1,zt/14);if(zt>=14){zi=Math.min(zi+1,5);zph='w';zt=0;zc=zto}}
 
 for(const p of P){if(!p.alive)continue;
  if(p.remoteBot){
   const s=p.botTarget;if(s){const ox=p.x,oy=p.y,oz=p.z,k=Math.min(1,dt*12);p.x+=(s.x-p.x)*k;p.y+=(s.y-p.y)*k;p.z+=(s.z-p.z)*k;p.vx=(p.x-ox)/dt;p.vz=(p.z-oz)/dt;p.ix=p.vx/14;p.iz=p.vz/14;p.tf=s.tf;p.ad=[Math.sin(s.yaw),0,Math.cos(s.yaw)];p.m.rotation.y=s.yaw;p.m.position.set(p.x,p.y,p.z);p.m.visible=Math.hypot(p.x-me.x,p.z-me.z)<170;if(p.m.visible)anim(p,dt);updatePlayerAura(p,dt);p.m.userData.hair.forEach(h=>h.material.color.setHex(p.tf?p.ch.fc:p.ch.h))}
   continue
  }
  if(p.remote){
   const s=p.netTarget;if(s){const ox=p.x,oy=p.y,oz=p.z,k=Math.min(1,dt*12);p.x+=(s.x-p.x)*k;p.y+=(s.y-p.y)*k;p.z+=(s.z-p.z)*k;p.vx=(p.x-ox)/dt;p.vz=(p.z-oz)/dt;p.ix=p.vx/14;p.iz=p.vz/14;p.tf=s.tf;p.ad=[Math.sin(s.yaw),0,Math.cos(s.yaw)];p.m.rotation.y=s.yaw;p.m.position.set(p.x,p.y,p.z);p.m.visible=Math.hypot(p.x-me.x,p.z-me.z)<170;if(p.m.visible)anim(p,dt);updatePlayerAura(p,dt);p.m.userData.hair.forEach(h=>h.material.color.setHex(p.tf?p.ch.fc:p.ch.h))}
   continue
  }
  if(!p.bot){
   const settingsOpen=$('cfg').style.display==='flex',f=settingsOpen?0:Math.max(-1,Math.min(1,(act('fwd')?1:0)-(act('back')?1:0)+gpd.f+tch.f)),r=settingsOpen?0:Math.max(-1,Math.min(1,(act('right')?1:0)-(act('left')?1:0)+gpd.r+tch.r));
   p.fv=f;p.ix=-Math.sin(yaw)*f+Math.cos(yaw)*r;p.iz=-Math.cos(yaw)*f-Math.sin(yaw)*r;const l=Math.hypot(p.ix,p.iz);if(l>1){p.ix/=l;p.iz/=l}
   {const fx=-Math.sin(cyw)*Math.cos(cpt),fy=-Math.sin(cpt),fz=-Math.cos(cyw)*Math.cos(cpt),tx=cam.position.x+fx*45-p.x,ty=cam.position.y+fy*45-(p.y+2.2),tz=cam.position.z+fz*45-p.z,l=Math.hypot(tx,ty,tz)||1;p.ad=fp?[fx,fy,fz]:[tx/l,ty/l,tz/l]}
   p.fire=(md&&(locked||slk))||act('fire');p.melee=act('melee');p.spec=act('spec');p.guard=act('guard');p.spec2=act('spec2');p.charge=act('charge');p.dash=act('dash');p.tr=act('tr');p.up=act('up');p.down=act('down');
   if(settingsOpen)p.fire=p.melee=p.spec=p.guard=p.spec2=p.charge=p.dash=p.tr=p.up=p.down=false;
  }else ai(p,dt);
  p.cd-=dt;p.mc-=dt;p.sc-=dt;p.dc-=dt;p.s2c=(p.s2c||0)-dt;p.kw=(p.kw||0)-dt;
  if(CLOSE[p.ch.n]&&!(p.ch.n=='Asta'&&p.tf)){p.melee=p.melee||p.fire;p.fire=false}
  p.meleeBuffer=p.melee ? .12 : Math.max(0,(p.meleeBuffer||0)-dt);
  p.gd=!!(p.guard&&p.ki>2);if(p.gd)p.ki=Math.max(0,p.ki-6*dt);
  const chg=p.charge&&!p.tf&&p.ki<100,moveBoost=p===me&&CFG.fastMove?1.3:1,spd=14*p.ch.sp*(p.tf?1.3:1)*(chg?0:1)*(p.gd?.4:1)*(p.dsl?.5:1)*moveBoost;
  {const ac=1-Math.exp(-(p.y>.4?5.5:(ICE?5.5:10))*dt);p.vx=(p.vx||0)+(p.ix*spd-(p.vx||0))*ac;p.vz=(p.vz||0)+(p.iz*spd-(p.vz||0))*ac;p.x+=(p.vx+p.kx)*dt;p.z+=(p.vz+p.kz)*dt;mtCol(p)}
  const inside=Math.abs(p.x)<=AH&&Math.abs(p.z)<=AH,floorY=groundHeight(p.x,p.z),prevFloor=p.groundY==null?floorY:p.groundY;
  if(p.y<=prevFloor+.12&&floorY<prevFloor-.1)p.fallingOff=true;if(p.up&&!chg)p.fallingOff=false;
  if(!inside||p.y<=floorY+.04||p.fallingOff)p.vy-=30*dt;if(p.up&&!chg)p.vy+=(11-p.vy)*Math.min(1,dt*5);if(p.down)p.vy+=(-11-p.vy)*Math.min(1,dt*5);if(inside&&p.y>floorY+.4&&!p.up&&!p.down&&!p.fallingOff){const tv=(p.fv||0)*p.ad[1]*14;p.vy+=(tv-p.vy)*Math.min(1,dt*6)}p.vy=Math.max(p.vy,-30);
  p.y+=(p.vy+p.ky)*dt;if(p.y>85){p.y=85;p.vy=0}
  if(inside&&p.y<=floorY){if(p.vy<-13){p.land=.25;for(let i=0;i<8;i++){const a=Math.random()*6.283;spawnP(p.x,floorY+.3,p.z,Math.cos(a)*5,1.5,Math.sin(a)*5,.5)}if(p===me)shake=Math.max(shake,.35)}p.y=floorY;p.vy=0;p.fallingOff=false}
  p.groundY=floorY;
  const f=Math.pow(ICE&&p.y<.4?.3:.02,dt);p.kx*=f;p.kz*=f;p.ky*=f;
  if(chg){p.cc=(p.cc||0)+dt;p.ki=Math.min(100,p.ki+(14+Math.min(p.cc,2.5)*20)*dt);
   if(Math.hypot(p.x-me.x,p.z-me.z)<90)for(let i=0;i<1+(p.cc>1.2?2:0);i++){const a=Math.random()*6.283,rr=3.5+Math.random()*2.5,x0=Math.cos(a)*rr,z0=Math.sin(a)*rr,y0=Math.random()*3.5;spawnP(p.x+x0,p.y+y0,p.z+z0,-x0/.55,(1.6-y0)/.55,-z0/.55,.55)}
   if(p===me&&Math.floor(p.cc*8)!=Math.floor((p.cc-dt)*8))sfx(140+p.cc*110,.16,'sine',.1);
   if(p.ki>=100)burst(p)}else{p.cc=0;if(!p.tf)p.ki=Math.min(100,p.ki+(TRAIN?12:2)*dt)}
  if(p.tf){p.ki-=4*dt;p.hp=Math.min(100,p.hp+3*dt);if(p.ki<=0){p.ki=0;p.tf=false}}
  if(p.tr&&!p.tf&&p.ki>=99.5&&(TRAIN||(p.dd||0)>=20)){if(p===me){if(!cut)cut={t:0}}else{p.tf=true;p.dd=0;burst(p);feed.push({t:5,s:p.name+' virou '+p.ch.f+'!'})}}
  if(p.dash&&p.dc<=0&&p.ki>=6){p.dc=1.2;p.ki-=6;const d=(p.ix||p.iz)?[p.ix,p.iz]:[p.ad[0],p.ad[2]],dashBoost=p===me&&CFG.fastMove?1.3:1;p.kx+=d[0]*45*dashBoost;p.kz+=d[1]*45*dashBoost}
  if(p.fire&&p.cd<=0&&p.ki>=4&&!chg){const fireCd=(BL[p.ch.n]||{}).cd||.22;p.cd=p===me&&CFG.fastFire?Math.max(.08,fireCd*.5):fireCd;p.ki-=4;shoot(p,false)}
  if(p.spec&&p.sc<=0&&p.ki>=40&&!chg){p.sc=3;p.ki-=40;if(p===me)spcut={t:0};else shoot(p,true)}
  if(p.spec2&&(p.s2c||0)<=0&&p.ki>=60&&DOM[p.ch.n]&&!chg){p.s2c=25;p.ki-=60;if(p===me)dcut={t:0};else castDomain(p)}
  if(p.meleeBuffer>0&&p.mc<=0){p.mc=.4;p.attackSide=1-(p.attackSide||0);p.attackPending=.1;p.meleeBuffer=0}
  if(p.attackPending!=null){p.attackPending-=dt;if(p.attackPending<=0){p.attackPending=null;meleeHit(p)}}
  if(Math.max(Math.abs(p.x),Math.abs(p.z))>zc)hit(p,(3+zi*2.5)*dt,null,0,0,0,'zona');
  if(p.y<-25)die(p,null,'caiu da arena');
  if(p.alive)for(let i=items.length-1;i>=0;i--){const it=items[i];if(Math.hypot(it.x-p.x,it.z-p.z)<2.4&&p.y<3){if(it.t==0)p.hp=Math.min(100,p.hp+35);else p.ki=Math.min(100,p.ki+30);scene.remove(it.m);items.splice(i,1)}}
  p.m.position.set(p.x,p.y,p.z);p.m.rotation.y=(()=>{let t=Math.atan2(p.ad[0],p.ad[2]);if(p===me&&!slk&&(p.ix||p.iz))t=Math.atan2(p.ix,p.iz);let d=t-p.m.rotation.y;d=Math.atan2(Math.sin(d),Math.cos(d));return p.m.rotation.y+d*(1-Math.exp(-14*dt))})();p.m.visible=(p===me&&!fp)||(p!==me&&Math.hypot(p.x-me.x,p.z-me.z)<170);if(p.m.visible)anim(p,dt);
  const u=p.m.userData;updatePlayerAura(p,dt);
  u.hair.forEach(h=>h.material.color.setHex(p.tf?p.ch.fc:p.ch.h))}
 for(let i=pr.length-1;i>=0;i--){const b=pr[i];if(b.hm&&b.hm.alive){const dx=b.hm.x-b.x,dy=b.hm.y+1.5-b.y,dz=b.hm.z-b.z,l=Math.hypot(dx,dy,dz)||1,sp2=b.sp||40,k2=Math.min(1,dt*3);b.vx+=(dx/l*sp2-b.vx)*k2;b.vy+=(dy/l*sp2-b.vy)*k2;b.vz+=(dz/l*sp2-b.vz)*k2}
  if(b.spin)b.m.rotation.y+=dt*22;if(b.bolt)b.m.rotation.z=Math.random()*6;
  b.x+=b.vx*dt;b.y+=b.vy*dt;b.z+=b.vz*dt;b.l-=dt;b.m.position.set(b.x,b.y,b.z);if(b.glow){b.glow.position.set(b.x,b.y,b.z);const pulse=1+.12*Math.sin(T*18+b.x);b.glow.scale.set((b.glow.userData.base||3.5)*pulse,(b.glow.userData.base||3.5)*pulse,1)}let rm=b.l<=0||b.y<-5||inMt(b.x,b.z,b.y,0);
  if(!rm&&!b.visualOnly)for(const q of P){if(!q.alive||q.team==b.o.team)continue;if(Math.hypot(q.x-b.x,q.y+1.8-b.y,q.z-b.z)<b.r+1.5){const l=Math.hypot(b.vx,b.vz)||1;hit(q,b.d,b.o,b.vx/l*b.kn,b.vz/l*b.kn,2);rm=true;break}}
  if(rm){scene.remove(b.m);b.m.traverse(o=>{if(o.isMesh&&o.material)o.material.dispose()});if(b.glow){scene.remove(b.glow);b.glow.material.dispose()}pr.splice(i,1)}}
 for(const it of items)it.m.position.y=1.2+Math.sin(T*3+it.x)*.3;
 for(const f of feed)f.t-=dt;feed=feed.filter(f=>f.t>0);
 zone.scale.set(zc*2,1,zc*2);camUpd(dt)}
function updTail(){
 const D=9;cam.position.set(me.x+Math.sin(yaw)*Math.cos(pitch)*D,Math.max(.8,me.y+2.6+Math.sin(pitch)*D),me.z+Math.cos(yaw)*Math.cos(pitch)*D);cam.lookAt(me.x,me.y+2.8,me.z)}
const mmc=$('mm').getContext('2d');
function hud(){
 const alive=P.filter(p=>p.alive).length;
 $('h1').textContent=TRAIN?'MODO TREINO':'VIVOS: '+alive;$('h2').textContent='KILLS: '+me.kills+(me.tf?'':' · TRANSF.: '+Math.min(20,Math.floor(me.dd||0))+'/20 dano');
 $('h3').textContent=zph=='w'?'Zona fecha em '+Math.ceil(18-zt)+'s':'Zona fechando: '+Math.ceil(14-zt)+'s';
 $('hp').style.width=me.hp+'%';$('ki').style.width=me.ki+'%';
 const full=me.ki>=99.5&&!me.tf&&(TRAIN||(me.dd||0)>=20),need=me.ki>=99.5&&!me.tf&&!full,edge=Math.max(Math.abs(me.x),Math.abs(me.z));
 $('ki').style.background=full&&Math.floor(T*6)%2?'#fff':me.tf?hx(me.ch.fc):'#35a7ff';
 $('msg').style.color=edge>zc?'#ff6060':'#ffd23a';
 $('msg').textContent=need?'KI CHEIO! Cause 20 de dano em inimigos ('+Math.floor(me.dd||0)+'/20)':full?'KI CHEIO! APERTE T: '+me.ch.f.toUpperCase():me.tf?me.ch.f.toUpperCase():edge>AH-10?'⚠ BORDA DA ARENA! VOLTE!':edge>zc?'Fora da zona segura! Vá para o centro':'';
 if(cdn>0)$('msg').textContent='A PARTIDA COMEÇA EM '+Math.ceil(cdn)+'...';if(me.charge&&!me.tf&&me.ki<100&&cdn<=0)$('msg').textContent='⚡ CARREGANDO KI... '+(me.cc>1.2?'(FORÇA MÁXIMA)':'');
 $('msg').style.fontSize=cdn>0?'44px':'22px';
 if(TRAIN)$('h3').textContent='Sem inimigos · Backspace sai do treino';$('exitb').style.display=TRAIN?'block':'none';$('touch').style.display=showTouch()?'block':'none';$('gl').style.cursor=slk?'none':'default';$('camb').textContent=(fp?'1ª PESSOA':'3ª PESSOA')+' · SHIFT LOCK: '+(slk?'ON':'OFF')+' (Shift) · V: câmera';
 $('feed').innerHTML=feed.slice(-5).map(f=>'<div>'+f.s+'</div><br>').join('');
 const k=130/(AH*2);mmc.fillStyle='#8a8478';mmc.fillRect(0,0,130,130);mmc.strokeStyle='#f33';mmc.lineWidth=2;mmc.strokeRect((AH-zc)*k,(AH-zc)*k,zc*2*k,zc*2*k);
 for(const p of P){if(!p.alive)continue;const a=p.team==me.team;if(!a&&Math.hypot(p.x-me.x,p.z-me.z)>70)continue;mmc.fillStyle=p===me?'#ffd23a':a?'#2ecc40':'#f33';mmc.fillRect((p.x+AH)*k-2,(p.z+AH)*k-2,4,4)}}
let vo=0,pv=null,pvp=null,cdn=0,cyw=0,cpt=.3,shake=0,cut=null;
// cutscene de abertura: sobrevoo da arena durante os 5 segundos
const NM=['ARENA DO TORNEIO','CIDADE EM RUÍNAS','FLORESTA','GELO','CAMPO DE TREINO'];let introN=0;
function introCam(){
 const t=5-cdn,o=Math.min(1,t/3.4),b=Math.min(1,Math.max(0,(t-3.4)/1.6)),e=b*b*(3-2*b);scene.fog.far=700;
 const a=t*.5,r=300-40*o,h=150-70*o,cs=Math.cos(cpt),sn=Math.sin(cpt),D=slk?6.5:8,sh=slk?2.4:1.8;
 const px=fp?me.x:me.x+Math.sin(cyw)*cs*D+Math.cos(cyw)*sh,py=fp?me.y+2.85:Math.max(.8,me.y+2.7+sn*D),pz=fp?me.z:me.z+Math.cos(cyw)*cs*D-Math.sin(cyw)*sh;
 const fx=-Math.sin(cyw)*cs,fy=-sn,fz=-Math.cos(cyw)*cs,L=(x,y)=>x+(y-x)*e;
 cam.position.set(L(Math.cos(a)*r,px),L(h,py),L(Math.sin(a)*r,pz));cam.lookAt(L(0,px+fx*20),L(12,py+fy*20),L(0,pz+fz*20));
 cam.fov=60+10*e;cam.updateProjectionMatrix();
 const c=$('cut'),cb=c.children;c.style.display='block';cb[0].style.height=cb[1].style.height=(12*(1-e))*Math.min(1,t*3)+'vh';
 const n=Math.ceil(cdn);if(n!=introN){introN=n;$('ctitle').innerHTML='<b>'+NM[scn]+'</b><br><span style="font-size:.6em;color:#ffd23a">'+(TRAIN?'O TREINO':'A PARTIDA')+' COMEÇA EM '+n+'</span>'}
 $('ctitle').style.opacity=cdn>.4?1:0}
function introEnd(){const c=$('cut');c.style.display='none';c.children[0].style.height=c.children[1].style.height=0;scene.fog.far=(scn==0||scn==4)?450:400;introN=0;cam.fov=70;cam.updateProjectionMatrix()}
// cutscene do golpe especial (estilo Kamehameha)
const SPN={Goku:'KAMEHAMEHA!',Vegeta:'FINAL FLASH!',Gohan:'MASENKO BESTIAL!',Piccolo:'MAKANKOSAPPO!',Freeza:'DEATH BEAM!',Jiren:'POWER IMPACT!','Goku Black':'FOICE DIVINA!',Broly:'ERASER CANNON!',Naruto:'GRITO DA RAPOSA!',Sasuke:'SUSANOO!',Asta:'CORTE NEGRO!',Kefla:'ONDA CRUZADA!',Gogeta:'BIG BANG KAMEHAMEHA!',Gojo:'ROXO: VAZIO!',Itadori:'KOKUSEN!',Megumi:'CÃES DIVINOS!',Saitama:'SOCO SÉRIO!'};let spcut=null,dcut=null;const beams=[];
function fireBeam(p,ad,c){c=c||{};const W=c.w||7;
 const d=new THREE.Vector3(ad[0],ad[1],ad[2]).normalize(),o=new THREE.Vector3(p.x,p.y+2.2,p.z).addScaledVector(d,1.6),col=c.col||(p.tf?p.ch.fc:p.ch.c),LEN=c.len||70;
 if(p===me&&netSocket&&netMatch)netSocket.emit('combat:beam',{x:o.x,y:o.y,z:o.z,dx:d.x,dy:d.y,dz:d.z,length:LEN,width:W,duration:.9,color:col});
 for(const q of P){if(!q.alive||q.team==p.team)continue;const v=new THREE.Vector3(q.x-o.x,q.y+1.8-o.y,q.z-o.z),al=v.dot(d);if(al<0||al>LEN)continue;if(v.clone().addScaledVector(d,-al).length()<2+W*.4)hit(q,(c.dmg||45)*mul(p),p,d.x*45,d.z*45,6)}
 const mk2=(c,op)=>{const m=new THREE.Mesh(U.c,new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:op,blending:THREE.AdditiveBlending,depthWrite:false}));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d);m.position.copy(o).addScaledVector(d,LEN/2);scene.add(m);return m};
 beams.push({m:[mk2(col,.75),mk2(0xffffff,.95)],t:0,d:.9,LEN,W});wave(o.x,o.y-2.1,o.z,col,8)}
function spawnRemoteShot(data){
 const owner=P&&P.find(p=>p.netId===data.playerId);if(!owner||!owner.alive)return;
 const {style,color,scale}=data,mat=new THREE.MeshBasicMaterial({color,transparent:true,opacity:.68,blending:THREE.AdditiveBlending,depthWrite:false});
 let m,spin=0,bolt=0;
 if(style==='beam'){m=new THREE.Mesh(U.c,mat);m.scale.set(.3,3.2,.3)}
 else if(style==='disc'){m=new THREE.Mesh(U.c,mat);m.scale.set(1.6,.1,1.6);spin=1}
 else if(style==='bolt'){m=new THREE.Mesh(U.b,mat);m.scale.set(.2,.2,2.4);bolt=1}
 else if(style==='slash')m=new THREE.Mesh(gSl,mat);
 else if(style==='wolf'){m=new THREE.Mesh(gS,mat);m.scale.set(.7,.7,1.6)}
 else if(style==='fire'){m=new THREE.Mesh(gS,mat);m.scale.setScalar(1.2)}
 else m=new THREE.Mesh(gS,mat);
 m.scale.fromArray(scale);
 const dir=new THREE.Vector3(data.vx,data.vy,data.vz).normalize();
 if(style==='beam')m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir);
 else if(style==='slash'||style==='wolf'||style==='bolt'){m.lookAt(data.x+data.vx,data.y+data.vy,data.z+data.vz);if(style==='slash')m.rotateZ(Math.PI*.5)}
 const core=new THREE.Mesh(m.geometry,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.78,blending:THREE.AdditiveBlending,depthWrite:false}));core.scale.setScalar(.48);m.add(core);
 m.position.set(data.x,data.y,data.z);
 const glow=energyGlow(color,style==='beam'?5:style==='disc'?6:Math.max(2.5,Math.max(...scale)*2.5));glow.position.copy(m.position);scene.add(m,glow);
 pr.push({m,glow,x:data.x,y:data.y,z:data.z,vx:data.vx,vy:data.vy,vz:data.vz,d:0,o:owner,r:0,l:data.lifetime,kn:0,spin,bolt,visualOnly:true})
}
function spawnRemoteBeam(data){
 const owner=P&&P.find(p=>p.netId===data.playerId);if(!owner||!owner.alive)return;
 const d=new THREE.Vector3(data.dx,data.dy,data.dz).normalize(),o=new THREE.Vector3(data.x,data.y,data.z);
 const makeBeam=(color,opacity)=>{const mesh=new THREE.Mesh(U.c,new THREE.MeshBasicMaterial({color,transparent:true,opacity,blending:THREE.AdditiveBlending,depthWrite:false}));mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d);mesh.position.copy(o).addScaledVector(d,data.length/2);scene.add(mesh);return mesh};
 beams.push({m:[makeBeam(data.color,.75),makeBeam(0xffffff,.95)],t:0,d:data.duration,LEN:data.length,W:data.width})
}
// ===== novos personagens, golpes especiais, defesa e domínios =====
function extras2(g,ch){
 const k=ch.n,tfx=g.userData.tfx,L=toonMaterial;
 const pt=(t,c,sx,sy,sz,x,y,z,rx,rz)=>{const m=new THREE.Mesh(U[t],L(c));m.scale.set(sx,sy,sz);m.position.set(x,y,z);m.rotation.set(rx||0,0,rz||0);g.add(m);return m};
 const tf=(t,c,add,sx,sy,sz,x,y,z,rx,rz)=>{const m=new THREE.Mesh(U[t],add?am(c,.8):L(c));m.scale.set(sx,sy,sz);m.position.set(x,y,z);m.rotation.set(rx||0,0,rz||0);m.userData={rz:rz||0,ph:Math.random()*6};tfx.add(m);return m};
 if(k=='Gojo'||k=='Itadori'||k=='Megumi'){g.userData.shirt=[];g.userData.bare=[]}
 if(k=='Saitama'){g.userData.shirt=[];g.userData.bare=[];g.traverse(m=>{if(!m.isMesh||!m.material.color)return;const h=m.material.color.getHex();if((h==0x111111&&m.geometry===U.b)||h==0x0a0a0a||h==0x3a1a1a||(h==0xffffff&&m.geometry===U.b))m.visible=false});pt('b',0xf2f2f2,1.5,2.2,.1,0,1.7,-.45)}
 if(k=='Gojo')g.userData.hideTf=[pt('c',0x0a0a0a,1.07,.2,.98,0,2.82,-.02)];
 if(k=='Itadori'){pt('s',0xc0303a,.9,.55,.6,0,2.6,-.38);const bg=new THREE.Group();bg.visible=false;g.add(bg);g.userData.bolts=bg;for(let i=0;i<5;i++)bg.add(new THREE.Mesh(U.b,new THREE.MeshBasicMaterial({color:0xff2030,blending:THREE.AdditiveBlending,transparent:true})))}
 if(k=='Megumi'){const d=tf('c',0x05050f,0,7,.05,7,0,.06,0);d.userData.st=1;for(let i=0;i<6;i++){const a=i/6*6.283;tf('k',0x1a0f3a,0,.7,3.2,.7,Math.cos(a)*2.6,1.6,Math.sin(a)*2.6)}}}
function attachSword(g){
 const R=g.userData.R,w=new THREE.Group(),part=(c,sx,sy,sz,z)=>{const m=new THREE.Mesh(U.b,toonMaterial(c));m.scale.set(sx,sy,sz);m.position.z=z;w.add(m)};
 part(0x15151a,.13,.13,2.6,1.4);part(0xeeeeee,.22,.22,.55,-.1);part(0x888890,.6,.1,.12,.2);
 w.position.set(.1,-1.05,.1);w.rotation.x=.9;R.a[1].add(w);g.userData.sword=w}
const am=(c,o)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o==null?.8:o,blending:THREE.AdditiveBlending,depthWrite:false});
const gSl=new THREE.TorusGeometry(2,.22,8,28,Math.PI),gBolt=new THREE.BoxGeometry(.2,6,.2),gC2=new THREE.ConeGeometry(3,8,18);
const GD={Goku:.25,Vegeta:.25,Gohan:.2,Piccolo:.2,Freeza:.15,Jiren:.1,'Goku Black':.25,Broly:.1,Naruto:.25,Sasuke:.1,Asta:.15,Kefla:.2,Gogeta:.15,Gojo:0,Itadori:.3,Megumi:.2,Saitama:.05};
const SHD={Sasuke:{c:0x7a4aff,s:[2.6,4.6,2.6]},Asta:{c:0x551122,s:[3.6,3.6,.4],z:1.6},Megumi:{c:0x3a2a7a,s:[3.8,3.8,.4],z:1.6},Gojo:{c:0x6ac8ff,s:[3.6,3.6,3.6]},Itadori:{c:0xff2030,s:[2.4,2.4,2.4]},Naruto:{c:0xff9a1a},Saitama:{c:0xffffff,s:[2.2,2.2,2.2]},Goku:{c:0x4aa8ff}};
const BL={Vegeta:{z:.7,d:1.15},Gohan:{s:'bolt',col:0xffffff,cd:.18},Piccolo:{s:'beam',col:0xffe040,d:1.1},Freeza:{s:'beam',col:0xff40a0,cd:.15,d:.9},Jiren:{z:.9,d:1.1},Broly:{z:1.2,d:1.25,cd:.3,col:0x9dff3a},Naruto:{s:'disc',col:0xffc21a,cd:.2},Sasuke:{s:'fire',col:0xff6a1a,d:1.4,cd:.4},Asta:{s:'slash',n:3,d:.9,col:0xff2a3a,cd:.4},Kefla:{n:2,col:0x9dff3a},Gogeta:{z:.8,d:1.3},Gojo:{col:0x4aa8ff,z:.8,d:1.1},Megumi:{s:'wolf',col:0x4a2a8a,d:1.3,cd:.45}};
const CLOSE={Asta:1,Itadori:1,Saitama:1},MB={Asta:2,Itadori:1.7,Saitama:2.4};
const DOM={Gojo:{n:'DOMÍNIO: PRISMA AZUL',c:0x6ac8ff,c2:0x080818,style:'prism'},Itadori:{n:'DOMÍNIO: RUPTURA ESCARLATE',c:0xff4058,c2:0x16070d,style:'impact'},Megumi:{n:'DOMÍNIO: LABIRINTO UMBRAL',c:0x9b75ff,c2:0x070611,style:'shadow'}};const doms=[];
function shoot(p,big){
 if(big)return shootOld(p,true);
 const B=BL[p.ch.n]||{},s=B.s||'orb',n=B.n||1,col=B.col||(p.tf?p.ch.fc:p.ch.c);p.sh=.3;if(p===me)sfx(420,.12,'sawtooth');
 for(let i=0;i<n;i++){
 const sp2=n>1?(i-(n-1)/2)*.18:0,a0=p.ad[0],c0=p.ad[2],b=p.ad[1],cs=Math.cos(sp2),sn=Math.sin(sp2),a=a0*cs-c0*sn,c=a0*sn+c0*cs,mat=new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.68,blending:THREE.AdditiveBlending,depthWrite:false});
  let m,v=50,l=1.2,r=.5*(B.z||1),spin=0,bolt=0,kn=10;const px=p.x+a*1.5,py=p.y+2.1+b*1.5,pz=p.z+c*1.5,dir=new THREE.Vector3(a,b,c);
  if(s=='beam'){m=new THREE.Mesh(U.c,mat);m.scale.set(.3,3.2,.3);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir);v=75;r=.7}
  else if(s=='disc'){m=new THREE.Mesh(U.c,mat);m.scale.set(1.6,.1,1.6);spin=1;v=60;r=.9}
  else if(s=='bolt'){m=new THREE.Mesh(U.b,mat);m.scale.set(.2,.2,2.4);bolt=1;v=70}
  else if(s=='fire'){m=new THREE.Mesh(gS,mat);m.scale.setScalar(1.2);v=34;l=.8;r=1.3;kn=22}
  else if(s=='slash'){m=new THREE.Mesh(gSl,mat);v=55;l=1;r=1.6;kn=18}
  else if(s=='wolf'){m=new THREE.Mesh(gS,mat);m.scale.set(.7,.7,1.6);v=32;l=2;r=1.1}
  else{m=new THREE.Mesh(gS,mat);m.scale.setScalar(.5*(B.z||1))}
  m.position.set(px,py,pz);if(s=='slash'||s=='wolf'||s=='bolt'){m.lookAt(px+a,py+b,pz+c);if(s=='slash')m.rotateZ(Math.PI*.5)}
  const core=new THREE.Mesh(m.geometry,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.78,blending:THREE.AdditiveBlending,depthWrite:false}));core.scale.setScalar(.48);m.add(core);
  const glowSize=s=='beam'?5:s=='disc'?6:Math.max(2.5,r*5),glow=energyGlow(col,glowSize);glow.position.set(px,py,pz);scene.add(m,glow);
  if(p===me&&netSocket&&netMatch)netSocket.emit('combat:shot',{x:px,y:py,z:pz,vx:a*v,vy:b*v,vz:c*v,style:s,scale:m.scale.toArray(),color:col,lifetime:l});
  pr.push({m,glow,x:px,y:py,z:pz,vx:a*v,vy:b*v,vz:c*v,d:7*mul(p)*(B.d||1),o:p,r,l,big:false,kn,spin,bolt,hm:s=='wolf'?nearEn(p,60):null,sp:v})}}
function nearEn(p,r){let b=null,bd=r;for(const q of P)if(q.alive&&q.team!=p.team){const d=Math.hypot(q.x-p.x,q.z-p.z);if(d<bd){bd=d;b=q}}return b}
function dmgCone(p,fx,fz,range,ang,dmg,kb){for(const q of P){if(!q.alive||q.team==p.team)continue;const dx=q.x-p.x,dz=q.z-p.z,d=Math.hypot(dx,dz)||.01;if(d<range&&(dx*fx+dz*fz)/d>Math.cos(ang))hit(q,dmg*mul(p),p,dx/d*kb,dz/d*kb,6)}}
function dmgRad(p,x,z,r,dmg,kb,fx,fz){for(const q of P){if(!q.alive||q.team==p.team)continue;const dx=q.x-x,dz=q.z-z,d=Math.hypot(dx,dz)||.01;if(d<r&&(fx==null||(dx*fx+dz*fz)/d>-.2))hit(q,dmg*mul(p),p,dx/d*kb,dz/d*kb,6)}}
function flashScreen(c){const f=$('flash');f.style.background=c;f.style.transition='none';f.style.opacity=.8;requestAnimationFrame(()=>{f.style.transition='opacity .6s';f.style.opacity=0;setTimeout(()=>{f.style.background='#fff'},700)})}
function kawa(p){
 const m=new THREE.Mesh(U.c,new THREE.MeshLambertMaterial({color:0x6b4a2b}));m.scale.set(1.2,3.2,1.2);m.position.set(p.x,p.y+1.6,p.z);m.rotation.z=.3;scene.add(m);setTimeout(()=>scene.remove(m),900);
 for(let i=0;i<14;i++)spawnP(p.x,p.y+1.5,p.z,(Math.random()-.5)*14,Math.random()*6,(Math.random()-.5)*14,.6);
 p.x=Math.max(-AH+4,Math.min(AH-4,p.x+(Math.random()-.5)*18));p.z=Math.max(-AH+4,Math.min(AH-4,p.z+(Math.random()-.5)*18));mtCol(p);if(p===me)sfx(600,.2,'sine',.2)}
function domainPrelude(p,D){
 const g=new THREE.Group(),rings=[];
 [3.2,5.1,7.2].forEach((r,i)=>{
  const m=new THREE.Mesh(new THREE.TorusGeometry(1,.035-i*.006,6,48),new THREE.MeshBasicMaterial({color:i===1?D.c2:D.c,transparent:true,opacity:.72,blending:THREE.AdditiveBlending,depthWrite:false}));
  m.rotation.x=Math.PI/2;m.position.y=.12+i*.045;m.scale.setScalar(r);g.add(m);rings.push(m)
 });
 [0,1,2,3].forEach(i=>{
  const m=new THREE.Mesh(new THREE.TorusGeometry(1,.025,5,40),new THREE.MeshBasicMaterial({color:i%2?D.c2:D.c,transparent:true,opacity:.58,blending:THREE.AdditiveBlending,depthWrite:false}));
  m.scale.set(3.2+i*.55,5.2+i*.3,1);m.rotation.y=i*Math.PI/4;m.position.y=2.2;g.add(m);rings.push(m)
 });
 g.position.set(p.x,p.y,p.z);g.scale.setScalar(.04);scene.add(g);
 return {g,rings}
}
function castDomain(p){
 const D=DOM[p.ch.n],R=45,g=new THREE.Group(),rings=[];
 const shell=new THREE.Mesh(new THREE.SphereGeometry(1,36,26),new THREE.MeshBasicMaterial({color:D.c2,transparent:true,opacity:.38,side:THREE.DoubleSide,depthWrite:false}));
 const lattice=new THREE.Mesh(new THREE.SphereGeometry(1.003,28,20),new THREE.MeshBasicMaterial({color:D.c,wireframe:true,transparent:true,opacity:.38,blending:THREE.AdditiveBlending,depthWrite:false}));
 g.add(shell,lattice);
 const makeRing=(radius,y,color,speed,vertical=false)=>{
  const m=new THREE.Mesh(new THREE.TorusGeometry(1,.0045,5,88),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false}));
  if(vertical){m.scale.set(radius,radius,1);m.rotation.y=y}else{m.rotation.x=Math.PI/2;m.scale.set(radius,radius,1);m.position.y=y}
  g.add(m);rings.push({m,speed,vertical})
 };
 const latitudes=D.style==='prism'?[[-.44,.9],[-.12,.62],[.2,.7],[.48,.88]]:D.style==='impact'?[[-.28,.96],[.34,.96]]:[[-.38,.92],[0,.78],[.38,.92]];
 latitudes.forEach(([y,r],i)=>makeRing(r,y,D.style==='shadow'&&i===1?D.c2:D.c,.18+i*.06));
 const meridians=D.style==='prism'?6:D.style==='impact'?9:5;
 for(let i=0;i<meridians;i++)makeRing(.88,i*Math.PI/meridians,D.c,(i%2?-.22:.16)*(1+i%3)*.65,true);
 const floor=new THREE.Mesh(new THREE.CircleGeometry(.96,64),new THREE.MeshBasicMaterial({color:D.c2,transparent:true,opacity:.18,side:THREE.DoubleSide,depthWrite:false}));
 floor.rotation.x=-Math.PI/2;floor.position.y=.012;g.add(floor);
 const floorRing=new THREE.Mesh(new THREE.TorusGeometry(.94,.008,5,96),new THREE.MeshBasicMaterial({color:D.c,transparent:true,opacity:.78,blending:THREE.AdditiveBlending,depthWrite:false}));
 floorRing.rotation.x=Math.PI/2;floorRing.position.y=.025;g.add(floorRing);
 const pointPositions=[];
 for(let i=0;i<72;i++){const y=1-2*(i+.5)/72,a=i*2.399963,r=Math.sqrt(1-y*y);pointPositions.push(Math.cos(a)*r,y,Math.sin(a)*r)}
 const pointGeometry=new THREE.BufferGeometry();pointGeometry.setAttribute('position',new THREE.Float32BufferAttribute(pointPositions,3));
 const motes=new THREE.Points(pointGeometry,new THREE.PointsMaterial({color:D.c,size:.12,transparent:true,opacity:.82,blending:THREE.AdditiveBlending,depthWrite:false}));
 g.add(motes);g.position.set(p.x,0,p.z);g.scale.setScalar(.1);scene.add(g);
 const domain={g,shell,lattice,floor,floorRing,motes,rings,x:p.x,z:p.z,o:p,t:0,R,accent:D.c};doms.push(domain);return domain;
}
function removeDomain(d){
 scene.remove(d.g);
 d.g.traverse(m=>{if(m.geometry)m.geometry.dispose();if(m.material){if(Array.isArray(m.material))m.material.forEach(x=>x.dispose());else m.material.dispose()}});
}
function domUpd(dt){
 const p=me,s=dcut,D=DOM[p.ch.n];
 if(!s.init){s.init=true;s.th=Math.atan2(p.ad[0],p.ad[2]);s.prelude=domainPrelude(p,D);p.charge=false;p.sh=3;p.m.visible=true;$('cut').style.display='block';$('ctitle').innerHTML='<b style="color:'+hx(D.c)+';font-size:.55em">'+D.n+'</b>'}
 s.t+=dt;T+=dt;const t=s.t,th=s.th;p.m.rotation.y=th;anim(p,dt);
 if(s.prelude){const k=Math.min(1,t/.65),fade=t>1.05?Math.max(0,1-(t-1.05)/.35):1;s.prelude.g.scale.setScalar(.04+k*.96);s.prelude.g.rotation.y=t*.38;s.prelude.rings.forEach((m,i)=>{m.rotation.z+=dt*(i%2?.9:-.7);m.material.opacity=(i<3?.72:.58)*fade*(.75+.25*Math.sin(t*7+i))})}
 if(t<1.2)for(let i=0;i<3;i++){const a=Math.random()*6.28,r=3+Math.random()*5;spawnP(p.x+Math.cos(a)*r,p.y+Math.random()*4,p.z+Math.sin(a)*r,-Math.cos(a)*12,2,-Math.sin(a)*12,.5)}
 if(!s.fired&&t>=1.2){s.fired=true;s.domain=castDomain(p);wave(p.x,p.y,p.z,D.c,30);shake=.8;sfx(80,1,'sawtooth',.3);flashScreen('#000')}
 if(s.domain){const d=s.domain,fade=d.t>5?Math.max(0,1-(d.t-5)/.4):1,pulse=.94+.06*Math.sin(T*3.2);d.shell.material.opacity=.38*fade;d.lattice.material.opacity=.28*fade;d.floor.material.opacity=.16*fade;d.floorRing.material.opacity=.68*fade;d.motes.material.opacity=.72*fade;d.g.scale.setScalar(d.R*pulse)}
 const a=th+Math.PI+t*.8,r=7-1.5*Math.min(1,t/1.2);cam.position.set(p.x+Math.sin(a)*r,p.y+3,p.z+Math.cos(a)*r);cam.lookAt(p.x,p.y+2.6,p.z);cam.fov=60;cam.updateProjectionMatrix();
 const cb=$('cut').children;cb[0].style.height=cb[1].style.height=Math.min(11,t*30)+'vh';$('ctitle').style.opacity=t>.15&&t<2.2?1:0;
 if(t>=2.4){if(s.prelude){scene.remove(s.prelude.g);s.prelude.g.traverse(m=>{if(m.geometry)m.geometry.dispose();if(m.material)m.material.dispose()})}dcut=null;$('cut').style.display='none';cb[0].style.height=cb[1].style.height=0;cam.fov=70}}
function spRun(dt,E,cfg){
 const p=me,s=spcut,col=p.tf?p.ch.fc:p.ch.c;
 if(!s.init){s.init=true;s.ad=p.ad.slice();s.th=Math.atan2(p.ad[0],p.ad[2]);p.charge=false;p.sh=2;p.m.visible=true;s.rm=[];$('cut').style.display='block';$('ctitle').innerHTML='<b style="color:'+hx(col)+'">'+(SPN[p.ch.n]||'ESPECIAL!')+'</b>';if(cfg.init)cfg.init(s,p,col)}
 s.t+=dt;T+=dt;const t=s.t,th=s.th,fx=Math.sin(th),fz=Math.cos(th),x={p,s,t,th,fx,fz,rx:Math.cos(th),rz:-Math.sin(th),col,dt};
 p.m.rotation.y=th;anim(p,dt);
 if(cfg.fireAt!=null&&!s.fired&&t>=cfg.fireAt){s.fired=true;damageTerrainRay(p.x,p.y+2.2,p.z,s.ad,90,Math.max(1,cfg.terrainWidth||2.5));cfg.fire(x)}
 if(cfg.tick)cfg.tick(x);cfg.cam(x);cam.updateProjectionMatrix();
 const cb=$('cut').children;cb[0].style.height=cb[1].style.height=Math.min(11,t*30)+'vh';$('ctitle').style.opacity=t>.15&&t<E-.2?1:0;
 if(t>=E){s.rm.forEach(m=>scene.remove(m));spcut=null;$('cut').style.display='none';cb[0].style.height=cb[1].style.height=0;cam.fov=70}}
function spRoar(dt){spRun(dt,2.4,{
 init(s,p){const g=new THREE.Group(),M=c=>am(c,.75),h=new THREE.Mesh(gS,M(0xff8a1a));h.scale.set(7,6,7);g.add(h);
  const sn=new THREE.Mesh(U.k,M(0xff8a1a));sn.scale.set(4.5,7,4.5);sn.position.set(0,-1.2,6);sn.rotation.x=Math.PI/2;g.add(sn);
  [-1,1].forEach(q=>{const e=new THREE.Mesh(U.k,M(0xffb040));e.scale.set(2.5,5,2.5);e.position.set(q*4,6,-1);e.rotation.z=-q*.3;g.add(e);const ey=new THREE.Mesh(U.b,M(0xff2020));ey.scale.set(2,.5,.5);ey.position.set(q*2.6,1.4,5);ey.rotation.z=q*.4;g.add(ey)});
  g.visible=false;scene.add(g);s.rm.push(g);s.fox=g},
 fireAt:.9,
 fire(x){const{p,s,fx,fz}=x;s.fox.visible=true;dmgCone(p,fx,fz,75,.6,55,55);flashScreen('#fff');shake=.9;sfx(70,1.2,'sawtooth',.35);
  for(let i=0;i<3;i++){const m=new THREE.Mesh(gC2,am(0xffc21a,.6));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(-fx,0,-fz));m.position.set(p.x+fx*(8+i*6),p.y+3,p.z+fz*(8+i*6));scene.add(m);waves.push({m,t:0,size:9})}},
 tick(x){const{p,s,t,fx,fz,th}=x,g=s.fox,k=Math.min(1,Math.max(0,(t-.4)/.5));g.position.set(p.x-fx*11,p.y+8,p.z-fz*11);g.rotation.y=th;g.scale.setScalar(.2+k*1.3);g.visible=t>.4;
  if(t<.9)for(let i=0;i<2;i++){const a=Math.random()*6.28;spawnP(p.x+Math.cos(a)*5,p.y+Math.random()*3,p.z+Math.sin(a)*5,-Math.cos(a)*8,3,-Math.sin(a)*8,.5)}},
 cam(x){const{p,fx,fz,rx,rz}=x;cam.position.set(p.x+fx*17+rx*5,p.y+2.5,p.z+fz*17+rz*5);cam.lookAt(p.x-fx*6,p.y+6,p.z-fz*6);cam.fov=64}})}
function spSus(dt){spRun(dt,2.8,{
 init(s,p){const g=new THREE.Group(),M=()=>am(0x8a5aff,.55);
  for(let i=0;i<4;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(2.4-i*.15,.2,6,20),M());r.rotation.x=Math.PI/2;r.position.y=3+i*.9;g.add(r)}
  const sk=new THREE.Mesh(gS,M());sk.scale.set(1.8,2.1,1.8);sk.position.y=8.6;g.add(sk);
  [-1,1].forEach(q=>{const sh=new THREE.Mesh(gS,M());sh.scale.setScalar(1.6);sh.position.set(q*3.2,7,0);g.add(sh);const ar=new THREE.Mesh(U.c,M());ar.scale.set(1,5.5,1);ar.position.set(q*3.6,4.2,.8);g.add(ar);const hn=new THREE.Mesh(U.k,M());hn.scale.set(.6,2.6,.6);hn.position.set(q*1.2,10.6,0);g.add(hn)});
  const sw=new THREE.Mesh(U.b,M());sw.scale.set(.7,.7,14);sw.position.set(3.8,4,7);g.add(sw);g.scale.setScalar(.01);scene.add(g);s.rm.push(g);s.sus=g},
 fireAt:1.5,
 fire(x){const{p,fx,fz}=x;dmgCone(p,fx,fz,50,.8,65,55);flashScreen('#a070ff');shake=.8;sfx(110,.8,'sawtooth',.3);
  const m=new THREE.Mesh(new THREE.TorusGeometry(3,.4,8,28,Math.PI),am(0xb08aff,.85));m.lookAt(p.x+fx,p.y+6,p.z+fz);m.position.set(p.x+fx*10,p.y+6,p.z+fz*10);m.rotateZ(Math.PI*.1);scene.add(m);waves.push({m,t:0,size:12})},
 tick(x){const{p,s,t,th}=x,k=Math.min(1,t/.8);s.sus.scale.setScalar(.01+k*.9);s.sus.position.set(p.x,p.y-(1-k)*6,p.z);s.sus.rotation.y=th},
 cam(x){const{p,fx,fz,rx,rz}=x;cam.position.set(p.x+fx*18-rx*8,p.y+2,p.z+fz*18-rz*8);cam.lookAt(p.x,p.y+7,p.z);cam.fov=66}})}
function spDash(dt){spRun(dt,2,{
 fireAt:.9,
 fire(x){const{p,fx,fz}=x,L2=26,x0=p.x,z0=p.z,dem=p.tf;let nx=Math.max(-AH+4,Math.min(AH-4,p.x+fx*L2)),nz=Math.max(-AH+4,Math.min(AH-4,p.z+fz*L2));
  for(const q of P){if(!q.alive||q.team==p.team)continue;const dx=q.x-x0,dz=q.z-z0,al=dx*fx+dz*fz,pe=Math.abs(dx*fz-dz*fx);if(al>-2&&al<L2+3&&pe<6)hit(q,(dem?75:60)*mul(p),p,fx*50,fz*50,8)}
  for(let i=0;i<18;i++){const k=i/17;spawnP(x0+(nx-x0)*k,p.y+1.8,z0+(nz-z0)*k,0,2,0,.7)}
  p.x=nx;p.z=nz;mtCol(p);const m=new THREE.Mesh(new THREE.TorusGeometry(2.6,.3,8,28,Math.PI),am(dem?0xff2a3a:0x333344,.9));m.lookAt(p.x+fx,p.y+2,p.z+fz);m.position.set(p.x,p.y+2.4,p.z);m.rotateZ(.9);scene.add(m);waves.push({m,t:0,size:dem?9:6});flashScreen('#000');shake=.7;sfx(200,.4,'sawtooth',.3)},
 cam(x){const{p,t,fx,fz,rx,rz}=x;if(t<.9){cam.position.set(p.x+fx*5+rx*2.5,p.y+2.4,p.z+fz*5+rz*2.5);cam.lookAt(p.x,p.y+2.4,p.z);cam.fov=60}else{const k=Math.min(1,(t-.9)/.3);cam.position.set(p.x-fx*7+rx*2,p.y+3,p.z-fz*7+rz*2);cam.lookAt(p.x+fx*10,p.y+2,p.z+fz*10);cam.fov=62+10*k}}})}
function spPurple(dt){spRun(dt,3.3,{
 init(s){const mk3=c=>{const m=new THREE.Mesh(gS,am(c,.9));m.visible=false;scene.add(m);s.rm.push(m);return m};s.bl=mk3(0x2a8cff);s.rd=mk3(0xff2a2a);s.pu=mk3(0xa03cff)},
 fireAt:2.1,
 fire(x){const{p,s}=x;s.bl.visible=s.rd.visible=false;fireBeam(p,s.ad,{w:15,dmg:85,col:0xb040ff,len:90});flashScreen('#c070ff');shake=1;sfx(120,1,'sawtooth',.35)},
 tick(x){const{p,s,t,fx,fz,rx,rz}=x,cx=p.x+fx*2.4,cy=p.y+2.4,cz=p.z+fz*2.4;
  if(t<2.1){const k=Math.min(1,Math.max(0,(t-1.5)/.6)),bs=Math.min(1,t/.9)*1.6*(1-k*.6),rs=Math.min(1,Math.max(0,(t-.5)/.9))*1.6*(1-k*.6);
   s.bl.visible=t>.2;s.rd.visible=t>.7;s.bl.scale.setScalar(bs+.01);s.rd.scale.setScalar(rs+.01);
   s.bl.position.set(cx-rx*2.2*(1-k),cy,cz-rz*2.2*(1-k));s.rd.position.set(cx+rx*2.2*(1-k),cy,cz+rz*2.2*(1-k));
   s.pu.visible=k>.5;s.pu.scale.setScalar(.2+k*2.2);s.pu.position.set(cx,cy,cz)}
  else{s.pu.visible=t<2.7;s.pu.position.set(cx,cy,cz);s.pu.scale.setScalar(Math.max(.01,3.4-(t-2.1)*4))}},
 cam(x){const{p,t,fx,fz,rx,rz}=x;if(t<2.1){cam.position.set(p.x+fx*5.5-rx,p.y+2.6,p.z+fz*5.5-rz);cam.lookAt(p.x+fx*2.4,p.y+2.4,p.z+fz*2.4);cam.fov=58}else{const k=Math.min(1,(t-2.1)/.3);cam.position.set(p.x-fx*7+rx*2.5,p.y+3.2,p.z-fz*7+rz*2.5);cam.lookAt(p.x+fx*25,p.y+2.2,p.z+fz*25);cam.fov=62+14*k}}})}
function spFlash(dt){spRun(dt,2,{
 fireAt:.8,
 fire(x){const{p,s,fx,fz}=x,en=nearEn(p,30);let nx,nz,dx=fx,dz=fz;
  if(en){const d=Math.hypot(en.x-p.x,en.z-p.z)||1;dx=(en.x-p.x)/d;dz=(en.z-p.z)/d;nx=en.x-dx*2;nz=en.z-dz*2}else{nx=p.x+fx*12;nz=p.z+fz*12}
  nx=Math.max(-AH+4,Math.min(AH-4,nx));nz=Math.max(-AH+4,Math.min(AH-4,nz));
  for(let i=0;i<10;i++){const k=i/9;spawnP(p.x+(nx-p.x)*k,p.y+1.8,p.z+(nz-p.z)*k,0,2,0,.5)}
  p.x=nx;p.z=nz;mtCol(p);dmgRad(p,p.x+dx*2,p.z+dz*2,7,75,45);wave(p.x+dx*2,p.y,p.z+dz*2,0xff2030,14);
  for(let i=0;i<10;i++){const m=new THREE.Mesh(gBolt,am(i%2?0xff2030:0x222230,.95));m.position.set(p.x+dx*2+(Math.random()-.5)*5,p.y+1.5+Math.random()*3,p.z+dz*2+(Math.random()-.5)*5);m.rotation.set(Math.random()*3,0,Math.random()*3);scene.add(m);waves.push({m,t:0,size:1.5})}
  flashScreen('#000');shake=1;sfx(90,.5,'square',.4);s.fdx=dx;s.fdz=dz},
 tick(x){if(x.t<.8){const{p,fx,fz}=x;for(let i=0;i<2;i++)spawnP(p.x+fx*1.5+(Math.random()-.5)*2,p.y+2+(Math.random()-.5)*2,p.z+fz*1.5+(Math.random()-.5)*2,0,1,0,.3)}},
 cam(x){const{p,s,t,fx,fz,rx,rz}=x;if(t<.8){cam.position.set(p.x+fx*5+rx*3,p.y+2.2,p.z+fz*5+rz*3);cam.lookAt(p.x+fx,p.y+2.2,p.z+fz);cam.fov=58}else{const dx=s.fdx!=null?s.fdx:fx,dz=s.fdz!=null?s.fdz:fz;cam.position.set(p.x-dz*6-dx*2,p.y+2.6,p.z+dx*6-dz*2);cam.lookAt(p.x+dx*2,p.y+2.4,p.z+dz*2);cam.fov=62}}})}
function spDogs(dt){spRun(dt,2.2,{
 init(s,p){const c=new THREE.Mesh(U.c,new THREE.MeshBasicMaterial({color:0x0a0a18,transparent:true,opacity:.9}));c.scale.set(.1,.06,.1);c.position.set(p.x,p.y+.08,p.z);scene.add(c);s.rm.push(c);s.pool=c},
 fireAt:.9,
 fire(x){const{p,fx,fz,rx,rz}=x,en=nearEn(p,90);
  [-1,1].forEach(q=>{const m=new THREE.Mesh(gS,am(0x2a1a5a,.95));m.scale.set(1.1,1.1,2.6);m.position.set(p.x+rx*q*2+fx*2,p.y+1.2,p.z+rz*q*2+fz*2);m.lookAt(m.position.x+fx,m.position.y,m.position.z+fz);scene.add(m);
   pr.push({m,x:m.position.x,y:m.position.y,z:m.position.z,vx:fx*30,vy:0,vz:fz*30,d:38*mul(p),o:p,r:1.6,l:2.6,kn:30,hm:en,sp:30,big:false})});sfx(180,.5,'sawtooth',.3);shake=.4},
 tick(x){const{p,s,t}=x,k=Math.min(1,t/.8);s.pool.scale.set(.1+k*7,.06,.1+k*7);s.pool.position.set(p.x,p.y+.08,p.z)},
 cam(x){const{p,fx,fz,rx,rz}=x;cam.position.set(p.x+fx*9+rx*4,p.y+2,p.z+fz*9+rz*4);cam.lookAt(p.x,p.y+2,p.z);cam.fov=62}})}
function spShock(dt){spRun(dt,2.6,{
 fireAt:1.4,
 fire(x){const{p,fx,fz,th}=x;dmgRad(p,p.x,p.z,55,90,75,fx,fz);flashScreen('#fff');shake=1.2;sfx(60,1.2,'square',.45);
  for(let i=0;i<3;i++)wave(p.x+fx*i*8,p.y,p.z+fz*i*8,0xffffff,50+i*10);
  for(let i=0;i<40;i++){const a=(Math.random()-.5)*2.2,s2=20+Math.random()*30;spawnP(p.x,p.y+2,p.z,Math.sin(th+a)*s2,Math.random()*8,Math.cos(th+a)*s2,.9)}},
 cam(x){const{p,t,fx,fz,rx,rz}=x;if(t<1.4){const k=t/1.4;cam.position.set(p.x+rx*(7-3*k)+fx*(4-k),p.y+2.2,p.z+rz*(7-3*k)+fz*(4-k));cam.lookAt(p.x+fx,p.y+2.3,p.z+fz);cam.fov=60-8*k}else{cam.position.set(p.x-fx*9+rx*3,p.y+3.5,p.z-fz*9+rz*3);cam.lookAt(p.x+fx*20,p.y+2,p.z+fz*20);cam.fov=75}}})}
const SPC={default:{t:'beam',w:7,orb:'front'},Goku:{t:'beam',w:7,orb:'side'},Vegeta:{t:'beam',w:8,orb:'front'},Gohan:{t:'beam',w:6,orb:'up'},Piccolo:{t:'beam',w:2.2,orb:'finger',dmg:55},Freeza:{t:'beam',w:2.6,orb:'finger',dmg:50},Jiren:{t:'beam',w:9,orb:'front'},'Goku Black':{t:'beam',w:6,orb:'side'},Broly:{t:'beam',w:11,orb:'front',dmg:55},Kefla:{t:'beam',w:8,orb:'front'},Gogeta:{t:'beam',w:10,orb:'front',dmg:60},Naruto:{t:'roar'},Sasuke:{t:'sus'},Asta:{t:'dash'},Gojo:{t:'purple'},Itadori:{t:'flash'},Megumi:{t:'dogs'},Saitama:{t:'shock'}};
function ringAt(px,py,pz,d,col,size){const m=new THREE.Mesh(gW,am(col,.8));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),d);m.position.set(px,py,pz);scene.add(m);waves.push({m,t:0,size})}
function orbM(s,c){const m=new THREE.Mesh(gS,am(c,.9));m.visible=false;scene.add(m);s.rm.push(m);return m}
function sparkB(x,y,z,c,sz){const m=new THREE.Mesh(gBolt,am(c,.9));m.position.set(x,y,z);m.rotation.set(Math.random()*3,0,Math.random()*3);scene.add(m);waves.push({m,t:0,size:sz})}
function spVeg(dt){spRun(dt,2.6,{
 init(s){s.orb=orbM(s,0xffe14a)},fireAt:1.7,
 fire(x){const{p,s}=x;s.orb.visible=false;fireBeam(p,s.ad,{w:13,dmg:62,col:0xffe14a,len:85});flashScreen('#fff3a0');shake=1;sfx(140,.9,'sawtooth',.35)},
 tick(x){const{p,s,t,fx,fz}=x;if(t>=.5&&t<1.7){const g=(t-.5)/1.2;s.orb.visible=true;s.orb.position.set(p.x+fx*1.8,p.y+2.2,p.z+fz*1.8);s.orb.scale.setScalar(.3+2.6*g+Math.sin(T*50)*.12);if(Math.random()<.8)sparkB(p.x+fx*1.8+(Math.random()-.5)*5,p.y+2.2+(Math.random()-.5)*4,p.z+fz*1.8+(Math.random()-.5)*5,0xffe14a,.6)}},
 cam(x){const{p,t,fx,fz,rx,rz}=x;if(t<.5){cam.position.set(p.x+fx*2.2,p.y+2.9,p.z+fz*2.2);cam.lookAt(p.x,p.y+2.85,p.z);cam.fov=38}else if(t<1.7){const k=(t-.5)/1.2;cam.position.set(p.x+fx*(3+4*k)+rx*(1+2*k),p.y+2.4,p.z+fz*(3+4*k)+rz*(1+2*k));cam.lookAt(p.x+fx*1.8,p.y+2.2,p.z+fz*1.8);cam.fov=55}else{cam.position.set(p.x-fx*8+rx*3,p.y+3,p.z-fz*8+rz*3);cam.lookAt(p.x+fx*25,p.y+2.2,p.z+fz*25);cam.fov=70}}})}
function spGoh(dt){spRun(dt,2.6,{
 init(s){s.orb=orbM(s,0xffffff)},fireAt:1.6,
 fire(x){const{p,s}=x;s.orb.visible=false;fireBeam(p,s.ad,{w:9,dmg:62,col:0xff4a4a,len:80});flashScreen('#ffffff');shake=1;sfx(150,.8,'sawtooth',.35)},
 tick(x){const{p,s,t,fx,fz}=x;if(t<1.6){const g=Math.min(1,t/1.4);s.orb.visible=true;s.orb.position.set(p.x,p.y+5.2,p.z);s.orb.scale.setScalar(.3+2.4*g+Math.sin(T*45)*.1);if(Math.random()<.9)sparkB(p.x+(Math.random()-.5)*6,p.y+1+Math.random()*5,p.z+(Math.random()-.5)*6,Math.random()<.5?0xffffff:0xff4a4a,.5)}else{s.orb.visible=t<1.9;s.orb.position.set(p.x+fx*2,p.y+2.4,p.z+fz*2)}},
 cam(x){const{p,t,th,fx,fz,rx,rz}=x;if(t<1.6){const a=th+Math.PI*.6+t*.7;cam.position.set(p.x+Math.sin(a)*7,p.y+.6,p.z+Math.cos(a)*7);cam.lookAt(p.x,p.y+4.2,p.z);cam.fov=66}else{cam.position.set(p.x-fx*7+rx*2.5,p.y+3,p.z-fz*7+rz*2.5);cam.lookAt(p.x+fx*25,p.y+2.2,p.z+fz*25);cam.fov=72}}})}
function spPic(dt){spRun(dt,2.6,{
 init(s){s.orb=orbM(s,0xffe040)},fireAt:1.6,
 fire(x){const{p,s}=x,d=new THREE.Vector3(s.ad[0],s.ad[1],s.ad[2]).normalize();s.orb.visible=false;fireBeam(p,s.ad,{w:2.4,dmg:75,col:0xffe040,len:95});
  for(let i=1;i<=10;i++)ringAt(p.x+d.x*i*8,p.y+2.2+d.y*i*8,p.z+d.z*i*8,d,0xffe040,2.5);flashScreen('#fff7b0');shake=.6;sfx(220,.7,'sawtooth',.3)},
 tick(x){const{p,s,t,fx,fz}=x;if(t<1.6){const g=Math.min(1,t/1.5);s.orb.visible=true;s.orb.position.set(p.x+fx*.6,p.y+3.4,p.z+fz*.6);s.orb.scale.setScalar(.15+.5*g+Math.sin(T*60)*.05);for(let i=0;i<2;i++){const a=Math.random()*6.28;spawnP(p.x+fx*.6+Math.cos(a)*3,p.y+3.4+Math.sin(a)*3,p.z+fz*.6,-Math.cos(a)*6,-Math.sin(a)*6,0,.5)}}else s.orb.visible=t<1.75},
 cam(x){const{p,t,th,fx,fz,rx,rz}=x;if(t<1.6){const a=th+Math.PI+t*(Math.PI*2/1.6),r=6-1.5*(t/1.6);cam.position.set(p.x+Math.sin(a)*r,p.y+3,p.z+Math.cos(a)*r);cam.lookAt(p.x,p.y+3,p.z);cam.fov=54}else{cam.position.set(p.x-fx*6+rx*2,p.y+3.2,p.z-fz*6+rz*2);cam.lookAt(p.x+fx*30,p.y+2.4,p.z+fz*30);cam.fov=68}}})}
function spFrz(dt){spRun(dt,2.2,{
 fireAt:.7,
 fire(x){const{p,s}=x,s3=i=>{const th2=Math.atan2(s.ad[0],s.ad[2])+(i-1)*.14,cp=Math.sqrt(1-s.ad[1]*s.ad[1]);fireBeam(p,[Math.sin(th2)*cp,s.ad[1],Math.cos(th2)*cp],{w:2.2,dmg:32,col:0xff40a0,len:85})};s3(1);s.s3=s3;sfx(500,.3,'sawtooth',.3)},
 tick(x){const{p,s,t,fx,fz}=x;if(s.fired){if(t>.9&&!s.b2){s.b2=1;s.s3(0)}if(t>1.1&&!s.b3){s.b3=1;s.s3(2)}}else spawnP(p.x+fx*1.6,p.y+2.2,p.z+fz*1.6,0,0,0,.2)},
 cam(x){const{p,t,fx,fz,rx,rz}=x;if(t<.7){cam.position.set(p.x+fx*3+rx*1.6,p.y+2.4,p.z+fz*3+rz*1.6);cam.lookAt(p.x+fx*1.6,p.y+2.3,p.z+fz*1.6);cam.fov=50}else{cam.position.set(p.x-fx*6+rx*3,p.y+3,p.z-fz*6+rz*3);cam.lookAt(p.x+fx*25,p.y+2.3,p.z+fz*25);cam.fov=66}}})}
function spJir(dt){spRun(dt,2.4,{
 fireAt:1.3,
 fire(x){const{p,fx,fz}=x,cx=p.x+fx*8,cz=p.z+fz*8;dmgRad(p,cx,cz,20,88,65);wave(cx,p.y+2,cz,0xff3b3b,22);wave(cx,p.y+2,cz,0xffffff,14);flashScreen('#ff5050');shake=1.1;sfx(70,1,'square',.4);for(let i=0;i<30;i++){const a=Math.random()*6.28,s2=15+Math.random()*20;spawnP(cx,p.y+2,cz,Math.cos(a)*s2,Math.random()*10,Math.sin(a)*s2,.8)}},
 tick(x){const{p,t,fx,fz}=x;if(t<1.3){const a=Math.random()*6.28,r=3+Math.random()*2;spawnP(p.x+fx*2+Math.cos(a)*r,p.y+2.2+Math.sin(a)*r*.6,p.z+fz*2+Math.sin(a)*r*.2,-Math.cos(a)*8,0,-Math.sin(a)*3,.4)}},
 cam(x){const{p,t,fx,fz,rx,rz}=x;if(t<1.3){const k=t/1.3;cam.position.set(p.x+fx*(7-3*k)+rx*(2-k),p.y+2.2,p.z+fz*(7-3*k)+rz*(2-k));cam.lookAt(p.x+fx*1.5,p.y+2.3,p.z+fz*1.5);cam.fov=60-10*k}else{cam.position.set(p.x-fx*10+rx*4,p.y+4,p.z-fz*10+rz*4);cam.lookAt(p.x+fx*8,p.y+2,p.z+fz*8);cam.fov=76}}})}
function spBlk(dt){spRun(dt,2.4,{
 init(s){const m=new THREE.Mesh(gSl,am(0xff6fa6,.9));m.scale.setScalar(1.6);m.visible=false;scene.add(m);s.rm.push(m);s.bl=m},fireAt:1.3,
 fire(x){const{p,s,fx,fz}=x;s.bl.visible=false;dmgCone(p,fx,fz,62,.55,62,50);
  [.9,-.9].forEach(z=>{const m=new THREE.Mesh(new THREE.TorusGeometry(3,.4,8,28,Math.PI),am(0xff6fa6,.9));m.lookAt(p.x+fx,p.y+3,p.z+fz);m.position.set(p.x+fx*10,p.y+3,p.z+fz*10);m.rotateZ(z);scene.add(m);waves.push({m,t:0,size:14})});flashScreen('#ff9fc8');shake=.9;sfx(240,.5,'sawtooth',.35)},
 tick(x){const{p,s,t,fx,fz,rx,rz}=x;if(t<1.3){s.bl.visible=true;s.bl.position.set(p.x+rx*1.4+fx*.5,p.y+2.8,p.z+rz*1.4+fz*.5);s.bl.lookAt(s.bl.position.x+fx,s.bl.position.y,s.bl.position.z+fz);s.bl.rotateZ(t*10)}},
 cam(x){const{p,t,th,fx,fz,rx,rz}=x;if(t<1.3){const a=th+Math.PI*.5+t*.9;cam.position.set(p.x+Math.sin(a)*6,p.y+2.6,p.z+Math.cos(a)*6);cam.lookAt(p.x,p.y+2.6,p.z);cam.fov=56}else{cam.position.set(p.x-fx*7+rx*2,p.y+3,p.z-fz*7+rz*2);cam.lookAt(p.x+fx*18,p.y+3,p.z+fz*18);cam.fov=70}}})}
function spBro(dt){spRun(dt,2.8,{
 init(s){s.orb=orbM(s,0x9dff3a)},fireAt:1.7,
 fire(x){const{p,s}=x;s.orb.visible=false;fireBeam(p,s.ad,{w:13,dmg:68,col:0x9dff3a,len:90});flashScreen('#b6ff6a');shake=1.3;sfx(60,1.2,'sawtooth',.4)},
 tick(x){const{p,s,t,fx,fz}=x;if(t<1.7){const g=Math.min(1,t/1.6);s.orb.visible=true;s.orb.position.set(p.x+fx*2,p.y+2.2,p.z+fz*2);s.orb.scale.setScalar(.3+3*g+Math.sin(T*35)*.15);shake=Math.max(shake,.15+g*.25);
   if(Math.floor(t*6)!=Math.floor((t-x.dt)*6))wave(p.x,p.y,p.z,0x9dff3a,10+g*8);
   if(Math.random()<.5){const a=Math.random()*6.28,r=2+Math.random()*7,m=new THREE.Mesh(gBolt,am(0x9dff3a,.9));m.position.set(p.x+Math.cos(a)*r,.2,p.z+Math.sin(a)*r);m.rotation.set(Math.PI/2,0,Math.random()*3);scene.add(m);waves.push({m,t:0,size:1.2})}}},
 cam(x){const{p,t,fx,fz,rx,rz}=x;if(t<1.7){const k=t/1.7;cam.position.set(p.x-fx*3-rx*5,p.y+.8+k,p.z-fz*3-rz*5);cam.lookAt(p.x+fx*2,p.y+2.4,p.z+fz*2);cam.fov=64}else{cam.position.set(p.x-fx*8+rx*3,p.y+3.5,p.z-fz*8+rz*3);cam.lookAt(p.x+fx*28,p.y+2.2,p.z+fz*28);cam.fov=74}}})}
function spKef(dt){spRun(dt,2.6,{
 init(s){s.a=orbM(s,0x9dff3a);s.b=orbM(s,0xb050ff)},fireAt:1.5,
 fire(x){const{p,s}=x;s.a.visible=s.b.visible=false;const th=Math.atan2(s.ad[0],s.ad[2]),cp=Math.sqrt(1-s.ad[1]*s.ad[1]);
  [.13,-.13].forEach((o,i)=>fireBeam(p,[Math.sin(th+o)*cp,s.ad[1],Math.cos(th+o)*cp],{w:7,dmg:42,col:i?0xb050ff:0x9dff3a,len:85}));flashScreen('#d0ffa0');shake=1;sfx(130,.9,'sawtooth',.35)},
 tick(x){const{p,s,t,fx,fz,rx,rz}=x;if(t<1.5){const g=Math.min(1,t/1.3);[[s.a,1],[s.b,-1]].forEach(([m,q])=>{m.visible=true;m.position.set(p.x+rx*q*1.6+fx*1.4,p.y+2.2,p.z+rz*q*1.6+fz*1.4);m.scale.setScalar(.2+1.6*g+Math.sin(T*40+q)*.08)})}else{s.a.visible=s.b.visible=t<1.65}},
 cam(x){const{p,t,fx,fz,rx,rz}=x;if(t<1.5){cam.position.set(p.x+fx*6,p.y+2.4,p.z+fz*6);cam.lookAt(p.x+fx*1.4,p.y+2.3,p.z+fz*1.4);cam.fov=58}else{cam.position.set(p.x-fx*7+rx*3,p.y+3,p.z-fz*7+rz*3);cam.lookAt(p.x+fx*25,p.y+2.3,p.z+fz*25);cam.fov=70}}})}
function spGog(dt){spRun(dt,3,{
 init(s){s.orb=orbM(s,0x35a7ff);s.core=orbM(s,0xffffff)},fireAt:2,
 fire(x){const{p,s}=x;s.orb.visible=s.core.visible=false;const a=s.ad[0],b=s.ad[1],c=s.ad[2],m=new THREE.Mesh(gS,am(0x35a7ff,.9));m.scale.setScalar(6);m.position.set(p.x+a*4,p.y+3+b*4,p.z+c*4);scene.add(m);
  pr.push({m,x:m.position.x,y:m.position.y,z:m.position.z,vx:a*38,vy:b*38,vz:c*38,d:85*mul(p),o:p,r:6,l:2.2,kn:80,big:true});flashScreen('#9fd0ff');shake=1.2;sfx(100,1,'sawtooth',.4)},
 tick(x){const{p,s,t,fx,fz}=x;if(t<2){const g=Math.min(1,t/1.8),px=p.x+fx*2,py=p.y+4.2,pz=p.z+fz*2;s.orb.visible=s.core.visible=true;s.orb.position.set(px,py,pz);s.core.position.set(px,py,pz);s.orb.scale.setScalar(.4+4.2*g+Math.sin(T*30)*.2);s.core.scale.setScalar((.4+4.2*g)*.55);if(Math.random()<.9){const a=Math.random()*6.28,r=6+Math.random()*3;spawnP(px+Math.cos(a)*r,py+(Math.random()-.5)*5,pz+Math.sin(a)*r,-Math.cos(a)*r*2,0,-Math.sin(a)*r*2,.5)}}},
 cam(x){const{p,t,fx,fz,rx,rz}=x;if(t<2){const k=t/2;cam.position.set(p.x+fx*(6+5*k)+rx*2,p.y+3-k,p.z+fz*(6+5*k)+rz*2);cam.lookAt(p.x+fx*2,p.y+4,p.z+fz*2);cam.fov=62}else{cam.position.set(p.x-fx*8+rx*3,p.y+4,p.z-fz*8+rz*3);cam.lookAt(p.x+fx*25,p.y+3,p.z+fz*25);cam.fov=72}}})}
Object.assign(SPC,{Vegeta:{t:'veg'},Gohan:{t:'goh'},Piccolo:{t:'pic'},Freeza:{t:'frz'},Jiren:{t:'jir'},'Goku Black':{t:'blk'},Broly:{t:'bro'},Kefla:{t:'kef'},Gogeta:{t:'gog'}});
const SPF={veg:spVeg,goh:spGoh,pic:spPic,frz:spFrz,jir:spJir,blk:spBlk,bro:spBro,kef:spKef,gog:spGog,beam:spBeam,roar:spRoar,sus:spSus,dash:spDash,purple:spPurple,flash:spFlash,dogs:spDogs,shock:spShock};
function spUpd(dt){(SPF[(SPC[me.ch.n]||SPC.default).t]||spBeam)(dt)}
function spBeam(dt){
 const p=me,s=spcut,col=p.tf?p.ch.fc:p.ch.c;
 if(!s.init){s.init=true;s.ad=p.ad.slice();s.th=Math.atan2(p.ad[0],p.ad[2]);p.charge=false;p.sh=2;p.m.visible=true;$('cut').style.display='block';$('ctitle').innerHTML='<b style="color:'+hx(col)+'">'+(SPN[p.ch.n]||'ESPECIAL!')+'</b>';
  s.orb=new THREE.Mesh(gS,new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(s.orb)}
 s.t+=dt;T+=dt;const t=s.t,th=s.th,fx=Math.sin(th),fz=Math.cos(th),rx=Math.cos(th),rz=-Math.sin(th),c=SPC[p.ch.n]||SPC.default,ov=c.orb,ox=ov=='up'?p.x:ov=='side'?p.x+rx*1.5:p.x+fx*1.6,oy=ov=='up'?p.y+4.6:ov=='side'?p.y+1.8:p.y+2.2,oz=ov=='up'?p.z:ov=='side'?p.z+rz*1.5:p.z+fz*1.6;
 p.m.rotation.y=th;anim(p,dt);
 if(t<.8){const g=t/.8;s.orb.position.set(ox,oy,oz);s.orb.scale.setScalar((.2+2.2*g+Math.sin(T*40)*.1)*(ov=='finger'?.3:1));
  for(let i=0;i<3;i++){const a=Math.random()*6.283,b=Math.random()*3.14,rr=4+Math.random()*2,cx=Math.cos(a)*Math.sin(b),cy=Math.cos(b),cz=Math.sin(a)*Math.sin(b);spawnP(ox+cx*rr,oy+cy*rr,oz+cz*rr,-cx*rr/.45,-cy*rr/.45,-cz*rr/.45,.45)}
  if(Math.floor(t*10)!=Math.floor((t-dt)*10))sfx(120+t*250,.12,'sine',.12);
  const r=6-2*g;cam.position.set(p.x+fx*r+rx*3,p.y+2.4,p.z+fz*r+rz*3);cam.lookAt(ox-fx*.5,oy,oz-fz*.5);cam.fov=62}
 else{
  if(!s.fired){s.fired=true;s.orb.visible=false;fireBeam(p,s.ad,c);sfx(160,.7,'sawtooth',.28)}
  const k=Math.min(1,(t-.8)/.25),e=k*k*(3-2*k),j=(Math.random()-.5)*.25*(1-k*.5),x0=p.x+fx*2+rx*3,z0=p.z+fz*2+rz*3,x1=p.x-fx*7+rx*2.5,z1=p.z-fz*7+rz*2.5;
  cam.position.set(x0+(x1-x0)*e+j,p.y+2.4+.8*e+j,z0+(z1-z0)*e+j);cam.lookAt(p.x+fx*20+j,p.y+2.2+s.ad[1]*20,p.z+fz*20+j);cam.fov=62+14*e}
 cam.updateProjectionMatrix();
 const cb=$('cut').children;cb[0].style.height=cb[1].style.height=Math.min(11,t*30)+'vh';$('ctitle').style.opacity=t>.15&&t<1.3?1:0;
 if(t>=1.5){scene.remove(s.orb);spcut=null;$('cut').style.display='none';cb[0].style.height=cb[1].style.height=0;cam.fov=70}}
function cutUpd(dt){
 const p=me,D=2.6;
 if(!cut.init){cut.init=true;cut.a0=cyw;p.charge=true;p.ki=Math.min(p.ki,90);$('cut').style.display='block';$('ctitle').innerHTML='<b>'+p.ch.n.toUpperCase()+'</b><br><span style="color:'+hx(p.ch.fc)+'">'+p.ch.f.toUpperCase()+'</span>'}
 cut.t+=dt;T+=dt;const t=cut.t;p.m.visible=true;
 if(t<1.3){p.cc=2;for(let i=0;i<3;i++){const a=Math.random()*6.283,rr=3.5+Math.random()*2.5,x0=Math.cos(a)*rr,z0=Math.sin(a)*rr,y0=Math.random()*3.5;spawnP(p.x+x0,p.y+y0,p.z+z0,-x0/.55,(1.6-y0)/.55,-z0/.55,.55)}}
 if(!cut.did&&t>=1.3){cut.did=true;p.ki=100;p.charge=false;p.tf=true;p.dd=0;burst(p);feed.push({t:5,s:p.name+' virou '+p.ch.f+'!'})}
 anim(p,dt);
 const k=Math.min(1,t/D),a=cut.a0+t*1.25,r=11-6*k+Math.sin(t*3)*.3,c=[p.x,p.y+2.6,p.z];
 cam.position.set(c[0]+Math.sin(a)*r,Math.max(.8,c[1]-.6+2.2*k),c[2]+Math.cos(a)*r);cam.lookAt(c[0],c[1]+.2,c[2]);
 cam.fov=70-16*Math.sin(k*Math.PI*.5);cam.updateProjectionMatrix();
 const cb=$('cut').children;cb[0].style.height=cb[1].style.height=Math.min(12,t*40)+'vh';
 $('ctitle').style.opacity=t>.5&&t<D-.4?1:0;
 if(t>=D){cut=null;$('cut').style.display='none';cam.fov=70}}
function camUpd(dt){
 dt=dt||.016;const k=1-Math.exp(-22*dt),kk=1-Math.exp(-16*dt);cyw+=(yaw-cyw)*k;cpt+=(pitch-cpt)*k;
 const cs=Math.cos(cpt),sn=Math.sin(cpt),fx=-Math.sin(cyw)*cs,fy=-sn,fz=-Math.cos(cyw)*cs,cp=cam.position;
 if(fp){cp.set(me.x,me.y+2.85,me.z)}
 else{const D=slk?6.5:8,sh=slk?2.4:1.8,tx=me.x-fx*D+Math.cos(cyw)*sh,ty=Math.max(.8,me.y+2.7-fy*D),tz=me.z-fz*D-Math.sin(cyw)*sh;cp.x+=(tx-cp.x)*kk;cp.y+=(ty-cp.y)*kk;cp.z+=(tz-cp.z)*kk}
 if(shake>0){cp.x+=(Math.random()-.5)*shake;cp.y+=(Math.random()-.5)*shake;shake=Math.max(0,shake-dt*1.2)}
 cam.lookAt(cp.x+fx*20,cp.y+fy*20,cp.z+fz*20);
 const tf=fp?80:me.tf?76:70;if(Math.abs(cam.fov-tf)>.05){cam.fov+=(tf-cam.fov)*kk;cam.updateProjectionMatrix()}}
function camOld(){const D=9;cam.position.set(me.x+Math.sin(yaw)*Math.cos(pitch)*D,Math.max(.8,me.y+2.6+Math.sin(pitch)*D),me.z+Math.cos(yaw)*Math.cos(pitch)*D);cam.lookAt(me.x,me.y+2.8,me.z)}
// aura de seleção (estilo Ultra Instinto: brilho, raios e faíscas)
const gTex=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d'),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.4,'rgba(255,255,255,.45)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)})();
ptsM.material.map=gTex;ptsM.material.alphaTest=.02;ptsM.material.needsUpdate=true;
const AU={Goku:[0xa78bff,0x4fa8ff],Vegeta:[0x8a3dff,0xc7a0ff],Gohan:[0xffffff,0xff4a4a],Naruto:[0xffc21a,0xff7a1a],Sasuke:[0x7a4aff,0x2a1a5a],Asta:[0xd01030,0x2a0a20],Kefla:[0x9dff3a,0xe0ffa0],Gogeta:[0x35a7ff,0x9fe0ff],Saitama:[0xffffff,0xfff4a0],Gojo:[0x6ac8ff,0xa03cff],Itadori:[0xff2a3a,0x6a0a14],Megumi:[0x4a2a8a,0x111122],Piccolo:[0xff9d2e,0xffd27a],Freeza:[0xffd700,0xfff2a0],Jiren:[0xff3b3b,0xffa0a0],'Goku Black':[0xff6fa6,0xffc0dc],Broly:[0x9dff3a,0xe0ffa0]};
function attachPlayerAura(g,ch){
 const u=g.userData;if(!u.au)return;
 u.au.material.blending=THREE.AdditiveBlending;u.au.material.depthWrite=false;
 const aura=new THREE.Group(),colors=AU[ch.n]||[ch.fc,0xffffff];
 [[6.2,7.2,colors[0],.24,0],[5.2,6.2,colors[1],.2,.08],[4.1,5.2,0xffffff,.15,-.06],[6.8,7.8,colors[0],.11,.12],[3.1,4.4,colors[1],.18,-.1]].forEach(([w,h,c,op,x])=>{
  const m=new THREE.Sprite(new THREE.SpriteMaterial({map:gTex,color:c,transparent:true,opacity:op,blending:THREE.AdditiveBlending,depthWrite:false}));
  m.position.set(x,1.8,0);m.scale.set(w,h,1);aura.add(m)
 });
 aura.visible=false;g.add(aura);u.playerAura=aura;u.auraSprites=aura.children;u.auraAlpha=0
}
function updatePlayerAura(p,dt){
 const u=p.m.userData;if(!u.playerAura)return;
 const charging=!!(p.charge&&!p.tf&&p.ki<100),target=p.tf||charging?1:0,k=1-Math.exp(-7*dt);
 u.auraAlpha+=(target-u.auraAlpha)*k;
 const alpha=u.auraAlpha,colors=p.tf?(AU[p.ch.n]||[p.ch.fc,0xffffff]):[0x9feaff,0xffffff];
 u.playerAura.visible=alpha>.015;
 const pulse=1+.075*Math.sin(T*3.1+(p.slot||0));
 u.playerAura.position.x=Math.sin(T*1.4+(p.slot||0))*.08;
 u.playerAura.position.z=Math.cos(T*1.1+(p.slot||0))*.06;
 u.auraSprites.forEach((s,i)=>{
  const base=[[6.2,7.2,.24],[5.2,6.2,.2],[4.1,5.2,.15],[6.8,7.8,.11],[3.1,4.4,.18]][i],phase=i*1.4+(p.slot||0),breathe=1+.055*Math.sin(T*2.7+phase);
  s.material.color.setHex(i===2?0xffffff:i%2?colors[1]:colors[0]);s.material.opacity=alpha*base[2]*(.88+.12*Math.sin(T*2.2+i+(p.slot||0)));
  s.position.set(Math.sin(T*1.4+phase)*(.08+i*.018),1.9+Math.sin(T*1.7+phase)*.14,Math.cos(T*1.1+phase)*.08);
  s.rotation=Math.sin(T*1.2+phase)*.035;s.scale.set(base[0]*pulse*breathe,base[1]*pulse*breathe,1)
 });
 u.au.visible=false;
}
function applyFormStyle(model,id,character){
 const form=formsFor(character)[id]||BASE_FORM,u=model.userData;
 u.formId=id;
 u.formStyle=u.formStyle||new THREE.Group();
 if(!u.formStyle.parent)model.add(u.formStyle);
 u.formStyle.clear();
 u.formRing=null;u.formSprites=[];
 if(!u.formId)return;
 addFormTrait(u.formStyle,character,u.formId);
 const color=form.glow;
 const ring=new THREE.Mesh(new THREE.TorusGeometry(1.05,.035,6,40),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}));
 ring.rotation.x=Math.PI/2;ring.position.y=.1;u.formStyle.add(ring);u.formRing=ring;
 for(let i=0;i<2;i++){
  const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:gTex,color,transparent:true,opacity:i?.16:.13,blending:THREE.AdditiveBlending,depthWrite:false}));
  sprite.position.set(0,i?2.05:1.75,0);sprite.scale.set(i?2.2:3.2,i?2.8:3.8,1);u.formStyle.add(sprite);u.formSprites.push(sprite)
 }
}
function updateFormStyle(model){
 const u=model.userData;if(!u.formId||!u.formRing)return;
 const pulse=1+.09*Math.sin(T*4+(model.userData.formId||0));
 u.formRing.rotation.z=T*.35;u.formRing.scale.setScalar(pulse);
 u.formSprites.forEach((sprite,i)=>{
  const wave=1+.08*Math.sin(T*3+i*1.7);
  sprite.scale.set((i?2.2:3.2)*wave,(i?2.8:3.8)*wave,1);
  sprite.material.opacity=(i?.14:.12)+.035*Math.sin(T*4+i)
 })
}
const lob=new THREE.Group(),lv=new THREE.Vector3();lob.visible=false;scene.add(lob);
const lGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:gTex,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false,opacity:.9}));lGlow.scale.set(14,14,1);lob.add(lGlow);
const lField=new THREE.Sprite(new THREE.SpriteMaterial({map:gTex,color:0xffffff,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false,opacity:.32}));lField.position.set(0,2,0);lField.scale.set(8,9,1);lob.add(lField);
const lCore=new THREE.Sprite(new THREE.SpriteMaterial({map:gTex,color:0xffffff,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false,opacity:.28}));lCore.position.set(0,2,0);lCore.scale.set(4.5,6,1);lob.add(lCore);
const lRays=new THREE.Group();lob.add(lRays);const rgeo=new THREE.PlaneGeometry(.5,14);rgeo.translate(0,7,0);
for(let i=0;i<18;i++){const m=new THREE.Mesh(rgeo,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.11+.05*(i%3),blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.rotation.z=i/18*6.283;m.scale.x=.6+Math.random()*1.4;lRays.add(m)}
const auraRings=[new THREE.Mesh(new THREE.RingGeometry(1.05,1.14,64),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide})),new THREE.Mesh(new THREE.RingGeometry(1.45,1.52,64),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.32,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}))];
auraRings.forEach((ring,i)=>{ring.rotation.x=-Math.PI/2;ring.position.y=.08+i*.02;lob.add(ring)});
const LN=140,lpos=new Float32Array(LN*3),lgeo=new THREE.BufferGeometry();lgeo.setAttribute('position',new THREE.BufferAttribute(lpos,3));
const lPts=new THREE.Points(lgeo,new THREE.PointsMaterial({color:0xcfe4ff,size:.55,map:gTex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));lPts.frustumCulled=false;lob.add(lPts);
const lph=Array.from({length:LN},()=>[Math.random()*6.283,1.5+Math.random()*3,Math.random()*8,.3+Math.random()*.7]);
function lobAura(t,c){
 const [c1,c2]=AU[c.n]||[c.fc,0xffffff];lob.visible=true;cam.getWorldDirection(lv);
 lRays.position.set(lv.x*3,2.6+lv.y*3,lv.z*3);lGlow.position.copy(lRays.position);lRays.quaternion.copy(cam.quaternion);
 lGlow.material.color.setHex(c1);lField.material.color.setHex(c1);lCore.material.color.setHex(c2);lRays.children.forEach((m,i)=>{m.material.color.setHex(i%2?c1:c2);m.material.opacity=(.13+.06*(i%3))*(.8+.2*Math.sin(t*3+i))});lRays.rotation.z=t*.06;
 auraRings.forEach((ring,i)=>{ring.material.color.setHex(i?c2:c1);ring.material.opacity=(i?.24:.38)+.1*Math.sin(t*4+i);ring.rotation.z=t*(i?-.22:.16);const s=1+.08*Math.sin(t*3+i*1.7);ring.scale.setScalar(s)});
 lField.material.opacity=.24+.05*Math.sin(t*2.5);lCore.material.opacity=.2+.06*Math.sin(t*4+1);lField.scale.set(7.5+.35*Math.sin(t*2),8.5+.45*Math.sin(t*2),1);lCore.scale.set(4.2+.22*Math.sin(t*3),5.6+.3*Math.sin(t*3),1);
 lph.forEach((q,i)=>{const a=q[0]+t*q[3],r=q[1]+Math.sin(t*2+q[0])* .18;lpos[i*3]=Math.cos(a)*r;lpos[i*3+1]=(q[2]+t*1.6*q[3])%8;lpos[i*3+2]=Math.sin(a)*r});lgeo.attributes.position.needsUpdate=true;
 const fl=pv&&pv.userData.flames;if(fl){fl.visible=true;fl.children.forEach((m,i)=>{const d=m.userData,sy=d.h*(1+.07*Math.sin(t*5+d.ph)),a=d.a+t*.12;m.scale.set(d.w,sy,1);m.position.set(Math.cos(a)*d.r,.65+sy*.46,Math.sin(a)*d.r);m.rotation.z=Math.cos(a)*.08;m.material.color.setHex(i%2?c1:c2);m.material.opacity=.1+.07*(.5+.5*Math.sin(t*7+d.ph+i))})}}
// articulação: separa pernas, braços e tronco em pivots para animar
// músculos ressaltados e rosto de raiva
function deco2(g,ch){
 const k=ch.n,o=O[k],sk=o.sk,sr=k=='Piccolo'||k=='Jiren',hr=g.userData.hair,L=toonMaterial,
  dk=(((sk>>16&255)*.78|0)<<16)|(((sk>>8&255)*.78|0)<<8)|((sk&255)*.78|0);
 const pt=(t,c,sx,sy,sz,x,y,z,rec,rx,rz)=>{const m=new THREE.Mesh(U[t],L(c));m.scale.set(sx,sy,sz);m.position.set(x,y,z);m.rotation.set(rx||0,0,rz||0);g.add(m);if(rec)hr.push(m);return m};
 const mus=[];
 [-1,1].forEach(s=>{
  mus.push(pt('s',sk,.5,.35,.4,s*.3,2.5,-.05,sr),pt('s',sk,.5,.5,.5,s*.7,2.3,0,sr),pt('s',sk,.34,.45,.34,s*.72,1.95,.1,sr),pt('s',sk,.3,.4,.3,s*.72,1.95,-.1,sr),pt('s',sk,.3,.5,.3,s*.75,1.6,.04,sr),pt('s',sk,.35,.7,.3,s*.45,1.95,-.15,sr),pt('s',sk,.25,.35,.3,s*.38,1.55,.1,sr));
  pt('s',o.pants,.58,.75,.5,s*.22,.95,.08);pt('s',o.pants,.42,.5,.4,s*.22,.55,-.1);
  pt('b',sk,.28,.1,.1,s*.19,2.9,.45,sr,0,s*.5);pt('b',0x0a0a0a,.26,.065,.08,s*.17,2.96,.46,0,0,s*.55);pt('b',0x3a1a1a,.09,.03,.05,s*.09,2.53,.45,0,0,-s*.5)});
 pt('b',dk,.03,.1,.03,0,2.93,.46);pt('b',0xffffff,.16,.05,.04,0,2.56,.455);
 mus.push(pt('b',dk,.03,.5,.03,0,2.1,.4),pt('b',dk,.5,.025,.03,0,2,.39));
 mus.forEach(m=>m.visible=false);g.userData.bare=(g.userData.bare||[]).concat(mus);
 if(ch.ts){const l=[];g.traverse(m=>{if(m.isMesh&&m.material.color&&m.material.color.getHex()==sk)l.push(m)});g.userData.sk2=l;g.userData.sk0=sk}}
function addModelDetails(g,ch,legacy=false){
 const o=O[ch.n]||O[(AL[ch.n]||[])[1]]||(ch.n=='Goku Black'?O.GokuB:null)||{},shirt=g.userData.shirt||[];
 const pt=(t,c,sx,sy,sz,x,y,z,clothing=false)=>{const m=new THREE.Mesh(U[t],toonMaterial(c));m.scale.set(sx,sy,sz);m.position.set(x,y,z);g.add(m);if(clothing&&Array.isArray(g.userData.shirt))shirt.push(m);return m};
 const tone=(c,f)=>{const v=n=>Math.min(255,Math.max(0,Math.round(n*f)));return(v(c>>16&255)<<16)|(v(c>>8&255)<<8)|v(c&255)};
 const skin=o.sk||0xf1c27d,trim=o.belt||ch.fc||0xffffff,iris=tone(ch.fc||ch.c,.62);
 const eyeY=legacy?2.13:2.79,eyeZ=legacy?.355:.43,eyeX=legacy?.12:.18;
 [-1,1].forEach(s=>{
  if(!legacy)pt('s',skin,.12,.17,.1,s*.46,2.72,0);
  pt('s',0xfafafa,legacy?.14:.09,legacy?.13:.09,legacy?.05:.035,s*eyeX,eyeY,eyeZ);
  pt('s',iris,legacy?.07:.065,legacy?.09:.11,legacy?.03:.026,s*eyeX,eyeY,eyeZ+.018);
  pt('s',0x111111,legacy?.027:.025,legacy?.055:.064,legacy?.014:.014,s*eyeX,eyeY,eyeZ+.039);
  pt('s',0xffffff,.018,.024,.012,s*eyeX-.012,eyeY+.025,eyeZ+.055);
 });
 pt('s',tone(skin,.82),legacy?.045:.04,legacy?.04:.035,legacy?.04:.035,0,legacy?2.02:2.66,legacy?.39:.45);
 pt('b',0x542d32,.09,.018,.018,0,legacy?1.94:2.54,legacy?.375:.43);
 const cy=legacy?1.4:2.02,cz=legacy?.49:.49;
 pt('s',trim,legacy?.17:.16,legacy?.17:.15,legacy?.07:.055,0,cy,cz,true);
 pt('b',tone(trim,.62),legacy?.055:.045,legacy?.11:.095,.025,0,cy,cz+.045,true);
 [-1,1].forEach(s=>{
  pt('b',tone(o.top||ch.c,1.25),.025,.36,.025,s*.31,legacy?1.35:1.9,legacy?.49:.47,true);
  if(!legacy)pt('s',tone(trim,.78),.15,.12,.045,s*.45,2.28,.39,true);
  pt('b',tone(o.boot||o.pants||ch.c,1.22),.28,.035,.025,s*.23,legacy?.28:.28,legacy?.4:.37,true);
  if(!legacy)pt('c',tone(o.wr||trim,.82),.32,.055,.32,s*.68,1.43,0,true);
  if(!legacy){
   pt('s',tone(trim,.84),.31,.18,.31,s*.56,2.4,.12,true);
   pt('b',tone(trim,1.12),.18,.045,.035,s*.56,2.4,.405,true);
   pt('s',tone(o.boot||trim,.82),.18,.13,.075,s*.23,.78,.27,true);
   pt('b',trim,.2,.025,.025,s*.23,.31,.405,true);
   pt('c',tone(trim,.9),.34,.07,.34,s*.68,1.58,0,true);
  }
 });
 if(!legacy){
  const crest=pt('k',ch.fc,.15,.22,.055,0,2.27,.49,true);
  crest.rotation.z=Math.PI;
  pt('s',tone(trim,1.2),.055,.055,.035,0,1.32,.42,true);
  if(ch.n==='Goku Black'){
   pt('c',0xe8c65a,.065,.17,.065,-.49,2.52,.04);
   pt('s',0xe8c65a,.09,.09,.075,-.49,2.41,.08);
  }
 }
 if(!legacy)g.userData.shirt=shirt;
}
function rigify(g){
 const L=[[],[]],A=[[],[]],UP=[],ex=[g.userData.au,g.userData.ring],AX=g.userData.armX||.68;
 g.children.slice().forEach(m=>{if(!m.isMesh||ex.includes(m))return;const x=m.position.x,y=m.position.y,ax=Math.abs(x),s=x<0?0:1;
  if(y<1.2&&Math.abs(ax-.22)<.021)L[s].push(m);else if(ax>.5&&ax<AX+.18&&y>.75&&y<2.5)A[s].push(m);else if(y>=1.25)UP.push(m)});
 const mkP=(list,px,py)=>{const q=new THREE.Group();q.position.set(px,py,0);g.add(q);list.forEach(m=>{m.position.x-=px;m.position.y-=py;q.add(m)});return q};
 const up=mkP(UP,0,1.3);g.userData.R={l:[mkP(L[0],-.22,1.3),mkP(L[1],.22,1.3)],a:[mkP(A[0],-AX,2.35),mkP(A[1],AX,2.35)],up}}
function limbs(p,dt){
 const R=p.m.userData.R;if(!R)return;
 const mv=Math.min(1,Math.hypot(p.vx||0,p.vz||0)/14),air=p.y>.4,chg=p.charge&&!p.tf&&p.ki<100,s=Math.sin(p.ph||0),A=.95*mv;
 const t={l:[0,0],lz:[0,0],a:[-.25,-.25],az:[-.09,.09],ux:0,uy:0,sy:1+Math.sin(T*2.2)*.012};
 if(air){const f=Math.min(1,mv*1.5);t.l=[.1+.45*f,.1+.25*f];t.a=[-.2+.55*f,-.2+.55*f];t.az=[-.2,.2];t.ux=.05+.4*mv}
 else   if(mv>.05){const lift=Math.max(0,Math.cos(p.ph||0))*.16*mv;t.l=[-s*A,s*A];t.lz=[-lift,lift];t.a=[s*A*.62-.25,-s*A*.62-.25];t.uy=-s*.12*mv;t.ux=.08*mv;t.sy+=lift*.08;
  const step=Math.floor((p.ph||0)/Math.PI);if(!air&&mv>.25&&step!==p.stepIndex){p.stepIndex=step;const side=step%2?1:-1;spawnP(p.x+(p.ad[2]||0)*side*.28,p.y+.08,p.z-(p.ad[0]||0)*side*.28,-p.vx*.08,1,-p.vz*.08,.22)}}
 if(chg){t.az=[-.75,.75];t.a=[.1,.1];t.lz=[-.25,.25];t.ux=.25;t.l=[-.2,-.2]}
 if(p.sh>0){t.a=[-1.5,-1.5];t.az=[.12,-.12];t.ux=-.05}
 if(p.mc>0){const phase=Math.max(0,Math.min(1,1-p.mc/.4)),ease=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v)},wind=ease(phase/.22)*(1-ease((phase-.14)/.13)),extend=ease((phase-.13)/.13)*(1-ease((phase-.25)/.2)),side=p.attackSide||0,other=1-side;
  t.a[side]=-.25-.1*wind-1.35*extend;t.a[other]=-.25-.32*wind+.12*extend;t.az[side]=(side?-.09:.09)- (side?-.12:.12)*extend;t.l[side]+=.12*extend;t.lz[side]=-.1*extend;t.ux=.08*wind+.14*extend;t.uy=(side?1:-1)*(.12*wind-.24*extend)}
 if(p.fl>0)t.ux=-.3;
 const z=p.lm||(p.lm=JSON.parse(JSON.stringify(t))),k=1-Math.exp(-18*dt);
 for(const q in t){if(Array.isArray(t[q]))for(let i=0;i<2;i++)z[q][i]+=(t[q][i]-z[q][i])*k;else z[q]+=(t[q]-z[q])*k}
 for(let i=0;i<2;i++){R.l[i].rotation.x=z.l[i];R.l[i].rotation.z=z.lz[i];R.a[i].rotation.x=z.a[i];R.a[i].rotation.z=z.az[i]}
 R.up.rotation.x=z.ux;R.up.rotation.y=z.uy;R.up.scale.y=z.sy;
 if(p.ch.n=='Kefla'){p.kb=(p.kb||1)+((p.tf?1.6:1)-(p.kb||1))*Math.min(1,dt*6);R.a.forEach(a=>{a.scale.x=a.scale.z=p.kb});R.l.forEach(a=>{a.scale.x=a.scale.z=1+(p.kb-1)*.7});R.up.scale.x=R.up.scale.z=1+(p.kb-1)*.5}}
// seta do controle no lobby e cutscene de fusão do Gogeta
const gpc=document.createElement('div');gpc.textContent='\u27a4';gpc.style.cssText='position:fixed;left:0;top:0;z-index:99;font-size:34px;color:#ffd23a;text-shadow:0 0 6px #000,0 0 12px #ff8a1e;pointer-events:none;display:none';document.body.appendChild(gpc);
let gx=innerWidth/2,gy=innerHeight/2,gb={},gT=0;
function gpLobby(){
 const now=performance.now(),dt=Math.min(.05,(now-gT)/1000);gT=now;
 const p=(navigator.getGamepads?[...navigator.getGamepads()]:[]).find(x=>x);
 if(!p||state=='play'){gpc.style.display='none';return}
 gpc.style.display='block';const dz=v=>Math.abs(v)<.15?0:v;
 gx=Math.max(0,Math.min(innerWidth-4,gx+dz(p.axes[0])*dt*750));gy=Math.max(0,Math.min(innerHeight-4,gy+dz(p.axes[1])*dt*750));gpc.style.left=gx+'px';gpc.style.top=gy+'px';
 const edge=i=>{const b=p.buttons[i],on=!!(b&&b.pressed),was=gb[i];gb[i]=on;return on&&!was};
 if(edge(0)){const el=document.elementFromPoint(gx,gy);if(el)el.click()}
 if(edge(4)&&state=='lobby')$('pl').click();if(edge(5)&&state=='lobby')$('pr').click();if(edge(9)&&state=='lobby')$('go').click()}
let fus=null;const fGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:gTex,color:0xffffff,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false}));fGlow.visible=false;scene.add(fGlow);
function startFus(){const A=mk(CH[0],0),B=mk(CH[1],0);[[A,CH[0]],[B,CH[1]]].forEach(([m,c])=>{m.userData.ring.visible=false;applyFormStyle(m,formSel,c);scene.add(m)});fus={t:0,A,B,info:$('info').innerHTML};$('info').innerHTML='<div class="nm">FUSÃO!</div>'}
function endFus(){if(!fus)return;scene.remove(fus.A);scene.remove(fus.B);if(fus.info)$('info').innerHTML=fus.info;fGlow.visible=false;fus=null}
function fusUpd(){
 const s=fus;s.t+=.016;const t=s.t,k=Math.min(1,Math.max(0,(t-1.4)/.8)),xo=6-4.6*k;lob.visible=false;
 if(t<2.2){
  s.A.position.set(-xo,0,0);s.A.rotation.y=Math.PI/2;s.B.position.set(xo,0,0);s.B.rotation.y=-Math.PI/2;
  [s.A,s.B].forEach((m,i)=>{const R=m.userData.R,d=i?-1:1;
   if(t<1.4){const w=Math.sin(t*6);R.a[0].rotation.z=-1.3;R.a[1].rotation.z=1.3;R.a[0].rotation.x=w*.7;R.a[1].rotation.x=-w*.7;R.up.rotation.z=w*.3*d;R.l[0].rotation.x=w*.5;R.l[1].rotation.x=-w*.5;m.position.y=Math.abs(w)*.15}
   else{R.a[0].rotation.z=0;R.a[1].rotation.z=0;R.a[0].rotation.x=-1.55;R.a[1].rotation.x=-1.55;R.up.rotation.z=0;R.up.rotation.x=.15;R.l[0].rotation.x=-.2;R.l[1].rotation.x=-.2;m.position.y=0}})
 }else{
  s.A.visible=s.B.visible=false;const q=t-2.2;fGlow.visible=true;fGlow.position.set(0,3,2);fGlow.scale.setScalar(4+q*70);fGlow.material.opacity=Math.max(0,1-q/.6);
  if(!s.fl){s.fl=true;sfx(300,.6,'triangle',.3)}
  if(q>.65)endFus()}}
function prev(){endFus();const c=CH[sel],forms=formsFor(c);if(pv)scene.remove(pv);pv=mk(c,0);applyFormStyle(pv,formSel,c);pv.userData.ring.visible=false;pv.userData.au.visible=false;pv.scale.setScalar(1.45*(BASE[c.n]||1));pvp={m:pv,ix:0,iz:0,y:0,x:0,ch:c,form:formSel,tf:false,charge:false,ki:0,sh:0,mc:0};scene.add(pv);
 $('info').innerHTML='<div class="nm">'+c.n.toUpperCase()+'</div><div class="form-picker">'+forms.map((form,i)=>'<button type="button" class="form-choice'+(formSel===i?' on':'')+'" style="--form-color:'+hx(form.glow||c.fc)+'" data-form="'+i+'">'+form.n+'</button>').join('')+'</div><div class="fm">Estilo: <b style="color:'+hx(forms[formSel].glow||c.fc)+'">'+forms[formSel].n.toUpperCase()+'</b></div>';
 $('info').querySelectorAll('[data-form]').forEach(button=>button.onclick=()=>{formSel=Number(button.dataset.form);prev()});
 if(c.n=='Gogeta')startFus()}
function loop(t){requestAnimationFrame(loop);gpLobby();
 if(state=='lobby'){const a=Math.PI/2+Math.sin(t*.0005)*.3;cam.position.set(Math.cos(a)*13.5,4.2,Math.sin(a)*13.5);if(!vo){cam.setViewOffset(innerWidth,innerHeight,0,0,innerWidth,innerHeight);vo=1}if(cam.fov!=70){cam.fov=70;cam.updateProjectionMatrix()}cam.lookAt(0,2,0);zone.visible=false;
  if(waitG)pollGp(.016);if(pv){T=t/1000;if(pvp)anim(pvp,.016);pv.visible=!fus;if(fus)fusUpd();else lobAura(T,CH[sel]);pv.userData.au.scale.setScalar(1+Math.sin(t*.006)*.06)}
  ren.render(scene,cam);return}
 if(vo){cam.clearViewOffset();vo=0}zone.visible=true;if(pv)pv.visible=false;lob.visible=false;
 const dt=Math.max(.001,Math.min(.05,(t-last)/1000));last=t;if(state=='play'){pollGp(dt);upd(dt);updP(dt);hud();if(netSocket&&netMatch&&me&&t-lastNetSend>=50){lastNetSend=t;netSocket.emit('player:state',{x:me.x,y:me.y,z:me.z,yaw:me.m.rotation.y,pitch,tf:me.tf})}if(netSocket&&netMatch&&netIsHost&&t-lastBotSend>=100){lastBotSend=t;netSocket.emit('bots:state',{bots:P.filter(p=>p.bot).map(p=>({slot:p.slot,x:p.x,y:p.y,z:p.z,yaw:p.m.rotation.y,tf:p.tf}))})}}ren.render(scene,cam)}
prev();
requestAnimationFrame(loop);
