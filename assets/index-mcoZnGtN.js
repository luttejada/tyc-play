(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=Object.freeze,t=115792089237316195423570985008687907853269984665640564039457584007908834671663n,n=115792089237316195423570985008687907852837564279074904382605163141518161494337n,r=55066263022277343669578718895168534326250603453777594175500187360389116729240n,i=32670510020758816978083085130507043184471273380659243275938904335757337482424n,a=e({p:t,n,h:1n,a:0n,b:7n,Gx:r,Gy:i}),o=32,s=e=>e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name===`Uint8Array`&&e.BYTES_PER_ELEMENT===1,c=(e,t,n=``)=>{if(s(e)&&(t===void 0||e.length===t))return e;let r=s(e),i=t===void 0?``:` of length ${t}`,a=r?`length=${e.length}`:`type=${typeof e}`,o=(n?`"${n}" `:``)+`expected Uint8Array`+i+`, got `+a;throw r?RangeError(o):TypeError(o)},l=e=>Uint8Array.from(e),u=(e,t,n)=>l(c(e,n,t)),d=(e,t)=>e.toString(16).padStart(t,`0`),f=e=>{let t=``;for(let n of c(e))t+=d(n,2);return t},p=e=>{let t=`hex invalid`;if(typeof e!=`string`)throw TypeError(t);if(e.length%2||!/^[\da-f]*$/i.test(e))throw RangeError(t);let n=new Uint8Array(e.length/2);for(let t=0,r=0;t<n.length;t++,r+=2){let i=e.charCodeAt(r),a=e.charCodeAt(r+1);n[t]=((i&15)+(i>>6)*9)*16+(a&15)+(a>>6)*9}return n},m=()=>{let e=globalThis?.crypto?.subtle;if(e)return e;throw Error(`crypto.subtle must be defined, consider polyfill`)},h=(...e)=>{let t=0;for(let n of e)t+=c(n).length;let n=new Uint8Array(t),r=0;for(let t of e)n.set(t,r),r+=t.length;return n},g=(e=o)=>{let t=globalThis?.crypto;if(typeof t?.getRandomValues!=`function`)throw Error(`crypto.getRandomValues must be defined, consider polyfill`);return t.getRandomValues(new Uint8Array(e))},_=BigInt,v=(e,t,n,r=`bad number: out of range`)=>{if(typeof e!=`bigint`)throw TypeError(r);if(t<=e&&e<n)return e;throw RangeError(r)},y=(e,n=t)=>(e%=n)>=0n?e:n+e,b=e=>y(e,n),x=(e,t)=>{if(e===0n)throw Error(`invert: expected non-zero number`);if(t<=1n)throw Error(`invert: expected modulus > 1, got `+t);let n=y(e,t),r=t,i=0n,a=1n;for(;n!==0n;){let e=r/n,t=r-n*e,o=i-a*e;r=n,n=t,i=a,a=o}if(r!==1n)throw Error(`invert: does not exist`);return y(i,t)},S=e=>{let t=ae[e];if(typeof t!=`function`)throw Error(`hashes.`+e+` not set`);return t},C=(e,t,n)=>c(S(e)(t,n),o,`digest`),w=async(e,t,n)=>c(await S(e)(t,n),o,`digest`),T=e=>{if(e instanceof N)return e;throw TypeError(`Point expected`)},E=`bad point: not on curve`,D=e=>y(y(e*e)*e+7n),O=e=>v(e,0n,t),k=e=>v(e,1n,t),A=e=>v(e,1n,n),j=e=>!(e&1n),ee=e=>Uint8Array.of(j(e)?2:3),M=e=>{let n=D(k(e)),r=1n;for(let e=n,i=115792089237316195423570985008687907853269984665640564039457584007908834671664n/4n;i>0n;i>>=1n)i&1n&&(r=r*e%t),e=e*e%t;if(y(r*r)!==n)throw Error(`sqrt invalid`);return new N(e,j(r)?r:y(-r),1n)},N=class n{static BASE;static ZERO;X;Y;Z;constructor(t,n,r){this.X=O(t),this.Y=k(n),this.Z=O(r),e(this)}static CURVE(){return a}static fromAffine(e){let{x:t,y:r}=e;return t===0n&&r===0n?F:new n(t,r,1n)}static fromBytes(e){c(e);let t=e.length,r=e[0],i=re(e,1,33);try{if(t===33&&(r===2||r===3)){let e=M(i);return r===3?e.negate():e}if(t===65&&r===4)return new n(i,re(e,33,65),1n).assertValidity()}catch{throw Error(E)}throw Error(E)}static fromHex(e){return n.fromBytes(p(e))}get x(){return this.toAffine().x}get y(){return this.toAffine().y}equals(e){let{X:t,Y:n,Z:r}=this,{X:i,Y:a,Z:o}=T(e);return y(t*o)===y(i*r)&&y(n*o)===y(a*r)}is0(){return this.Z===0n}negate(){return new n(this.X,y(-this.Y),this.Z)}double(){return this.add(this)}add(e){let{X:t,Y:r,Z:i}=this,{X:a,Y:o,Z:s}=T(e),c=0n,l=0n,u=0n,d=0n,f=y(7n*3n),p=y(t*a),m=y(r*o),h=y(i*s),g=y(t+r),_=y(a+o);g=y(g*_),_=y(p+m),g=y(g-_),_=y(t+i);let v=y(a+s);return _=y(_*v),v=y(p+h),_=y(_-v),v=y(r+i),l=y(o+s),v=y(v*l),l=y(m+h),v=y(v-l),d=y(c*_),l=y(f*h),d=y(l+d),l=y(m-d),d=y(m+d),u=y(l*d),m=y(p+p),m=y(m+p),h=y(c*h),_=y(f*_),m=y(m+h),h=y(p-h),h=y(c*h),_=y(_+h),p=y(m*_),u=y(u+p),p=y(v*_),l=y(g*l),l=y(l-p),p=y(g*m),d=y(v*d),d=y(d+p),new n(l,u,d)}subtract(e){return this.add(T(e).negate())}multiply(e,t=!0){if(!t&&e===0n)return F;if(A(e),e===1n)return this;if(this.equals(P))return De(e).p;let n=F,r=P,i=this;for(let a=0;t?a<256:e>0n;a++)e&1n?n=n.add(i):t&&(r=r.add(i)),i=i.double(),e>>=1n;return n}multiplyUnsafe(e){return this.multiply(e,!1)}toAffine(){let{X:e,Y:n,Z:r}=this;if(r===0n)return{x:0n,y:0n};if(r===1n)return{x:e,y:n};let i=x(r,t);if(y(r*i)!==1n)throw Error(`inverse invalid`);return{x:y(e*i),y:y(n*i)}}assertValidity(){let{x:e,y:t}=this.toAffine();if(k(e),k(t),y(t*t)!==D(e))throw Error(E);return this}toBytes(e=!0){let{x:t,y:n}=this.assertValidity().toAffine(),r=I(t);return e?h(ee(n),r):h(Uint8Array.of(4),r,I(n))}toHex(e){return f(this.toBytes(e))}},P=new N(r,i,1n),F=new N(0n,1n,0n);N.BASE=P,N.ZERO=F;var te=(e,t,n)=>P.multiply(t,!1).add(e.multiply(n,!1)).assertValidity(),ne=e=>_(`0x`+(f(e)||`0`)),re=(e,t,n)=>ne(e.subarray(t,n)),I=e=>p(d(v(e,0n,2n**256n),64)),L=e=>v(ne(c(e,o,`secret key`)),1n,n,`invalid secret key: outside of range`),ie=`SHA-256`,ae={hmacSha256Async:async(e,t)=>{let n=m(),r=await n.importKey(`raw`,e,{name:`HMAC`,hash:ie},!1,[`sign`]);return new Uint8Array(await n.sign(`HMAC`,r,t))},hmacSha256:void 0,sha256Async:async e=>new Uint8Array(await m().digest(ie,e)),sha256:void 0},oe=e=>{if(e=e===void 0?g(48):e,c(e),e.length<48||e.length>1024)throw RangeError(`expected 48-1024b`);return I(y(ne(e),n-1n)+1n)},se=e=>t=>{let n=oe(t);return{secretKey:n,publicKey:e(n)}},ce=e=>Uint8Array.from(`BIP0340/`+e,e=>e.charCodeAt(0)),le=(e,...t)=>{let n=C(`sha256`,ce(e));return C(`sha256`,h(n,n,...t))},ue=(e,...t)=>w(`sha256Async`,ce(e)).then(e=>w(`sha256Async`,h(e,e,...t))),de=e=>{let t=L(e),{x:n,y:r}=P.multiply(t).assertValidity().toAffine();return{d:j(r)?t:b(-t),px:I(n)}},fe=e=>b(ne(e)),pe=(...e)=>fe(le(`challenge`,...e)),me=async(...e)=>fe(await ue(`challenge`,...e)),he=e=>de(e).px,ge=se(he),_e=(e,t,n)=>{let r=u(e,`message`),{px:i,d:a}=de(t);return{m:r,px:i,d:a,a:c(n,o)}},ve=e=>{let t=fe(e);if(t===0n)throw Error(`sign failed: k is zero`);let{px:n,d:r}=de(I(t));return{rx:n,k:r}},ye=(e,t,n,r)=>h(t,I(b(e+n*r))),R=`invalid signature produced`,be=(e,t,n=g(o))=>{let{m:r,px:i,d:a,a:s}=_e(e,t,n),{rx:c,k:l}=ve(le(`nonce`,I(a^ne(le(`aux`,s))),i,r)),u=ye(l,c,pe(c,i,r),a);if(!Ce(u,r,i))throw Error(R);return u},xe=async(e,t,n=g(o))=>{let{m:r,px:i,d:a,a:s}=_e(e,t,n),{rx:c,k:l}=ve(await ue(`nonce`,I(a^ne(await ue(`aux`,s))),i,r)),u=ye(l,c,await me(c,i,r),a);if(!await B(u,r,i))throw Error(R);return u},Se=(e,t)=>e instanceof Promise?e.then(t):t(e),z=(e,t,n,r)=>{let i=c(e,64,`signature`),a=c(t,void 0,`message`),s=c(n,o,`publicKey`),l,u,d,f;try{l=M(ne(s)),u=k(re(i,0,o)),d=A(re(i,o,64)),f=h(I(u),s,a)}catch{return!1}return Se(r(f),e=>{try{let{x:t,y:n}=te(l,d,b(-e)).toAffine();return!(!j(n)||t!==u)}catch{return!1}})},Ce=(e,t,n)=>z(e,t,n,pe),B=async(e,t,n)=>z(e,t,n,me),V=e({keygen:ge,getPublicKey:he,sign:be,verify:Ce,signAsync:xe,verifyAsync:B}),we=()=>{let e=[],t=P,n=t;for(let r=0;r<33;r++){n=t,e.push(n);for(let r=1;r<128;r++)n=n.add(t),e.push(n);t=n.double()}return e},Te=void 0,Ee=(e,t)=>{let n=t.negate();return e?n:t},De=e=>{let t=Te||=we(),n=F,r=P;for(let i=0;i<33;i++){let a=Number(e&255n);e>>=8n,a>128&&(a-=256,e+=1n);let o=i*128,s=o+Math.abs(a)-1,c=i%2!=0,l=a<0;a===0?r=r.add(Ee(c,t[o])):n=n.add(Ee(l,t[s]))}if(e!==0n)throw Error(`invalid wnaf`);return{p:n,f:r}},{floor:Oe,min:ke,sin:Ae}=Math,je=`Trystero`,Me=(e,t)=>Array(e).fill(void 0).map(t),Ne=`0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`,Pe=e=>Me(e,()=>Ne[Oe(Math.random()*62)]??``).join(``),Fe=Pe(20),Ie=Promise.all.bind(Promise),Le=typeof window<`u`,{entries:Re,fromEntries:ze,keys:Be,values:Ve}=Object,He=()=>{},Ue=`candidate`,H=e=>(e!==null&&clearTimeout(e),null),U=e=>Error(`${je}: ${e}`),We=(e,t)=>e instanceof Error&&e.message?e.message:typeof e==`string`&&e?e:et(e??t),Ge=(e,t)=>e instanceof Error?e:U(We(e,t)),Ke=new TextEncoder,qe=new TextDecoder,Je=e=>Ke.encode(e),Ye=e=>qe.decode(e),Xe=e=>e.reduce((e,t)=>e+t.toString(16).padStart(2,`0`),``),Ze=(...e)=>e.join(`@`),Qe=(e,t)=>{let n=[...e],r=()=>{let e=Ae(t++)*1e4;return e-Oe(e)},i=n.length;for(;i;){let e=Oe(r()*i--),t=n[i];n[i]=n[e],n[e]=t}return n},$e=(e,t,n,r=!1)=>e.relayConfig?.urls||(r?Qe(t,nt(e.appId)):t).slice(0,e.relayConfig?.redundancy??n),et=JSON.stringify,tt=e=>{try{return JSON.parse(e)}catch{throw U(`failed to parse JSON: ${e}`)}},nt=(e,t=2**53-1)=>e.split(``).reduce((e,t)=>e+t.charCodeAt(0),0)%t,rt=3333,it=6e4,at={},ot=null,st=null,ct=()=>{ot||=new Promise(e=>{st=e}).finally(()=>{st=null,ot=null})},lt=()=>{st?.()},ut=(e,t,n)=>{let r={},i=!1,a=!1,o,s=He;r.isClosed=!1,r.ready=new Promise(e=>s=e);let c=()=>{if(r.isClosed)return;o=void 0,a=!1;let l=new WebSocket(e);l.onclose=()=>{if(r.isClosed||a)return;if(a=!0,ot){ot.then(c);return}let t=at[e]??=rt;o=setTimeout(c,Math.random()*t),at[e]=ke(t*2,it)},l.onmessage=e=>t(String(e.data)),r.socket=l,r.url=l.url,l.onopen=()=>{let t=i;i=!0,s(r),at[e]=rt,t&&n?.()},r.send=e=>{l.readyState===1&&l.send(e)}};return r.close=()=>{r.isClosed=!0,o!==void 0&&(clearTimeout(o),o=void 0),r.socket.close()},c(),r},dt=e=>{let t={},n=new WeakMap,r=e=>{let t=n.get(e);if(!t)throw U(`relay bookkeeping missing registration for relay client`);return t},i=()=>{let e={},t=t=>e[t]??={};return{forKey:t,forRelay:e=>t(r(e))}},a=(e,r)=>(t[e]=r,n.set(r,e),r);return{register:(e,n)=>t[e]||a(e,n()),keyOf:r,scoped:i,getSockets:()=>ze(Re(t).flatMap(([t,n])=>{let r=e(n);return r?[[t,r]]:[]}))}},ft=()=>{if(Le){let e=new AbortController;return addEventListener(`online`,lt,{signal:e.signal}),addEventListener(`offline`,ct,{signal:e.signal}),()=>e.abort()}return He},pt=`AES-GCM`,mt={},ht=e=>btoa(String.fromCharCode.apply(null,Array.from(new Uint8Array(e)))),gt=e=>{let t=atob(e);return new Uint8Array(t.length).map((e,n)=>t.charCodeAt(n)).buffer},_t=async(e,t)=>new Uint8Array(await crypto.subtle.digest(e,Je(t))),vt=async e=>mt[e]??=Array.from(await _t(`SHA-1`,e)).map(e=>e.toString(36)).join(``),yt=async(e,t,n)=>crypto.subtle.importKey(`raw`,await crypto.subtle.digest({name:`SHA-256`},Je(`${e}:${t}:${n}`)),{name:pt},!1,[`encrypt`,`decrypt`]),bt=async(e,t)=>Xe(await _t(`SHA-256`,`${je}:${e}:${t}`)),xt=`$`,St=`,`,Ct=async(e,t)=>{let n=crypto.getRandomValues(new Uint8Array(16));return n.join(St)+xt+ht(await crypto.subtle.encrypt({name:pt,iv:n},await e,Je(t)))},wt=async(e,t)=>{let[n,r]=t.split(xt);return Ye(await crypto.subtle.decrypt({name:pt,iv:new Uint8Array(n?.split(St).map(Number)??[])},await e,gt(r??``)))},Tt=18e4,Et=class{makeOffer;leased=new Map;destroyed=!1;constructor(e){this.makeOffer=e}claimLeased(e){let t=this.leased.get(e);t&&(H(t),this.leased.delete(e))}reclaimLeased(e){this.leased.has(e)&&(this.claimLeased(e),e.destroy())}checkout(e,t,n){let r=async(e=!1)=>{if(this.destroyed)throw U(`room left while preparing offer`);let i=this.makeOffer();try{let e=await n(i);if(this.destroyed)throw U(`room left while preparing offer`);return t?(this.leased.set(i,setTimeout(()=>{this.leased.delete(i),i.destroy()},Tt)),{peer:i,offer:e,claim:()=>this.claimLeased(i),reclaim:()=>this.reclaimLeased(i)}):{peer:i,offer:e}}catch(t){if(i.destroy(),!e&&!this.destroyed)return r(!0);throw t}};return Ie(Me(e,()=>r()))}getOffers(e,t){return this.checkout(e,!0,t)}destroy(){this.destroyed=!0,this.leased.forEach((e,t)=>{H(e),t.destroy()}),this.leased.clear()}},Dt=U(`incorrect password for overlapping room`),Ot=(e,t,n)=>{let r=r=>_t(`SHA-256`,`${r}:${e}:${t}:${n}`).then(Xe),i=async(t,n,i)=>{if(!e)return;if(i){let e=Pe(36);await t({__trystero_pw:`challenge`,c:e});let{data:i}=await n();if(!i||typeof i!=`object`||i.__trystero_pw!==`response`||typeof i.h!=`string`)throw Dt;let a=await r(e);if(i.h!==a)throw Dt;return}let{data:a}=await n();if(!a||typeof a!=`object`||a.__trystero_pw!==`challenge`||typeof a.c!=`string`)throw Dt;await t({__trystero_pw:`response`,h:await r(a.c)})};return{run:i,compose:t=>e||t?async(e,n,r,a)=>{await i(n,r,a),await t?.(e,n,r,a)}:void 0}},kt=e=>{let t=We(e,`unknown error`);return t.startsWith(`handshake `)?t:`handshake failed: ${t}`},At=({onPeerHandshake:e,onHandshakeError:t,handshakeTimeoutMs:n,sendHandshakeData:r,sendHandshakeReady:i,onActivate:a,onFailure:o})=>{let s={},c=(e,t)=>{let n=s[e];!n||t&&n.peer!==t||n.isActive||n.didLocalHandshakePass&&n.didReceiveRemoteReady&&(n.isActive=!0,n.handshakeTimer=H(n.handshakeTimer),a(e,n.peer))},l=(e,n,r)=>{let i=s[e];if(!i||i.peer!==n)return;let a=kt(r);t?.(e,a),o(e,n,U(a))},u=(e,t)=>{let n=s[e];n&&n.peer===t&&!n.isActive&&(n.didLocalHandshakePass=!0,i(``,e).catch(n=>l(e,t,U(`failed sending handshake readiness: ${We(n,`unknown send failure`)}`))),c(e,t))};return{addPeer:(e,t)=>{s[e]={peer:t,isActive:!1,didLocalHandshakePass:!1,didReceiveRemoteReady:!1,handshakeTimer:null,pendingHandshakePayloads:[],handshakeWaiters:[]}},clearPeer:(e,t)=>{let n=s[e];n&&(n.handshakeTimer=H(n.handshakeTimer),n.pendingHandshakePayloads.length=0,n.handshakeWaiters.splice(0).forEach(e=>e.reject(t)),delete s[e])},canReceiveFromPeer:(e,t)=>{let n=s[e];return!!(n&&(n.isActive||t))},start:(t,i)=>{let a=s[t];if(!a||a.peer!==i)return;a.handshakeTimer=setTimeout(()=>l(t,i,U(`handshake timed out after ${n}ms`)),n);let o=async(e,n)=>{await r(e,t,n)},c=()=>new Promise((e,n)=>{let r=s[t];if(!r||r.peer!==i){n(U(`peer disconnected during handshake`));return}let a=r.pendingHandshakePayloads.shift();a?e(a):r.handshakeWaiters.push({resolve:e,reject:e=>n(e)})}),d=Fe<t;Promise.resolve(e?.(t,o,c,d)).then(()=>u(t,i)).catch(e=>l(t,i,Ge(e,`handshake failed`)))},receiveHandshakeData:(e,t,n)=>{let r=s[t];if(!r||r.isActive)return;let i=n===void 0?{data:e}:{data:e,metadata:n},a=r.handshakeWaiters.shift();a?a.resolve(i):r.pendingHandshakePayloads.length>=16?l(t,r.peer,U(`too many pending handshake messages`)):r.pendingHandshakePayloads.push(i)},receiveHandshakeReady:e=>{let t=s[e];t&&!t.isActive&&(t.didReceiveRemoteReady=!0,c(e))}}},jt=16384,Mt=1e4,Nt=12e4,Pt=15e3,Ft=150,It=5e3,Lt=`icecandidate`,Rt=`icegatheringstatechange`,zt=`iceconnectionstatechange`,Bt=`offer`,Vt=`answer`,Ht=/out of range/i,Ut=128,Wt=8192,Gt=e=>e.replace(/ (\S+\.local) (\d+) typ host/g,` 127.0.0.1 $2 typ host`),Kt=(e,{trickleIce:t,rtcConfig:n,rtcPolyfill:r,turnConfig:i,_test_only_mdnsHostFallbackToLoopback:a})=>{let o=new(r??RTCPeerConnection)({iceServers:qt.concat(i??[]),...n}),s={},c=new Set,l=[],u=[],d=null,f=t!==!1,p=[],m=[],h,g=!1,_=!1,v=null,y=null,b=!1,x=e=>{h&&=(h(e),void 0)},S=()=>y=H(y),C=()=>{b||(b=!0,c.forEach(e=>e()),d=H(d),u.length=0,S(),s.close?.())},w=e=>{e.type===Bt&&(x(e),!s.signal&&!o.remoteDescription)||(s.signal?s.signal(e):l.push(e))},T=e=>{let t=s.signal;s.signal=n=>{t?.(n),e(n)},l.length>0&&l.splice(0).forEach(e=>s.signal?.(e))},E=e=>a?Gt(e):e,D=e=>{if(!a||typeof e.candidate!=`string`)return e;let t=Gt(e.candidate);return t===e.candidate?e:{...e,candidate:t}},O=e=>({type:e.localDescription?.type??Bt,sdp:E(e.localDescription?.sdp??``)}),k=()=>{let e=o.remoteDescription?.sdp;return e?e.match(/a=ice-ufrag:([^\s]+)/)?.[1]??null:null},A=()=>(o.remoteDescription?.sdp?.match(/^m=/gm)??[]).length,j=e=>{if(!o.remoteDescription)return!1;let t=A();if(typeof e.sdpMLineIndex==`number`&&t>0&&e.sdpMLineIndex>=t)return!1;let n=k();return!(n&&e.usernameFragment&&e.usernameFragment!==n)},ee=async e=>{try{return await o.addIceCandidate(e),!0}catch(t){if(t instanceof Error&&Ht.test(t.message)&&typeof e.sdpMLineIndex==`number`)return!1;throw t}},M=e=>{p.length>=Ut&&p.shift(),p.push(e)},N=async()=>{if(!o.remoteDescription||p.length===0)return;let e=k(),t=p.splice(0),n=[];for(let r of t)e&&r.usernameFragment&&r.usernameFragment!==e||j(r)&&await ee(r)||n.push(r);n.forEach(M)},P=async e=>{j(e)&&await ee(e)||M(e)},F=e=>{e.binaryType=`arraybuffer`,e.bufferedAmountLowThreshold=65535;let t=()=>{console.warn(`${je}: invalid or excessive data before handler registration; disconnecting peer`),e.close(),o.close(),C()};e.onmessage=e=>{let n=e.data;if(!b){if(!(n instanceof ArrayBuffer)&&!ArrayBuffer.isView(n)||n.byteLength>16515)t();else if(s.data)s.data(n);else{if(u.length>=64){t();return}d||=setTimeout(t,Mt),u.push(n)}}},e.onopen=()=>s.connect?.(),e.onclose=C,e.onerror=({error:e})=>{b||e?.errorDetail===`sctp-failure`&&(e.sctpCauseCode===12||/^User-Initiated Abort\b/.test(e.message))||s.error?.(Ge(e,`data channel error`))}},te=n?.iceServers??qt.concat(i??[]),ne=e=>te.some(({urls:t})=>(Array.isArray(t)?t:[t]).some(t=>e.test(t))),re=ne(/^turns?:/i),I=!re&&ne(/^stuns?:/i),L=re?/\btyp relay\b/:I?/\btyp (?:srflx|relay|prflx)\b/:/\btyp (?:host|srflx|relay|prflx)\b/,ie=async e=>(await new Promise(t=>{let n=null,r=null,i=()=>{H(n),H(r),e.removeEventListener(Rt,o),e.removeEventListener(Lt,s),c.delete(i),t()},a=(t=``)=>{let n=`${e.localDescription?.sdp??``}\n${t}`;L.test(n)&&(H(r),r=setTimeout(i,Ft))},o=()=>{e.iceGatheringState===`complete`||b?i():a()},s=e=>{let{candidate:t}=e;t?a(t.candidate):i()};c.add(i),n=setTimeout(i,Pt),e.addEventListener(Rt,o),e.addEventListener(Lt,s),o()}),O(e)),ae=async()=>{let e=f?O(o):await ie(o);return b||w(e),e};e?(v=o.createDataChannel(`data`),F(v)):o.ondatachannel=({channel:e})=>{v=e,F(e)};let oe=async(e=!1)=>{if(o.connectionState===`closed`||!e&&(g||o.signalingState!==`stable`))o.connectionState===`closed`&&x();else try{return g=!0,e&&(o.remoteDescription&&o.signalingState!==`stable`&&o.signalingState!==`closed`&&o.localDescription?.type===Bt&&await o.setLocalDescription({type:`rollback`}),typeof o.restartIce==`function`&&o.restartIce()),await o.setLocalDescription(e?await o.createOffer({iceRestart:!0}):void 0),await ae()}catch(t){e||x(),s.error?.(Ge(t,`failed to create local offer`))}finally{g=!1}};o.onnegotiationneeded=async()=>oe(!1),o.onicecandidate=({candidate:e})=>{if(!f||!e)return;let t=D(typeof e.toJSON==`function`?e.toJSON():{candidate:e.candidate,sdpMid:e.sdpMid,sdpMLineIndex:e.sdpMLineIndex,usernameFragment:e.usernameFragment});w({type:Ue,sdp:JSON.stringify(t)})};let se=()=>{o.connectionState===`failed`||o.connectionState===`closed`||o.iceConnectionState===`failed`||o.iceConnectionState===`closed`?C():o.connectionState===`connected`||o.connectionState===`connecting`||o.iceConnectionState===`connected`||o.iceConnectionState===`completed`||o.iceConnectionState===`checking`?S():(o.connectionState===`disconnected`||o.iceConnectionState===`disconnected`)&&(y||=setTimeout(()=>{y=null,(o.connectionState===`disconnected`||o.iceConnectionState===`disconnected`)&&C()},It))};o.onconnectionstatechange=se,o.addEventListener(zt,se),o.ontrack=e=>{let t=e.streams[0];if(t){if(!s.track&&!s.stream){m.push({track:e.track,stream:t});return}s.track?.(e.track,t),s.stream?.(t)}};let ce=e?new Promise(e=>{h=e}):Promise.resolve();return e&&queueMicrotask(()=>{!g&&o.signalingState===`stable`&&!o.localDescription&&o.connectionState!==`closed`&&o.onnegotiationneeded?.(new Event(`negotiationneeded`))}),{connection:o,get channel(){return v},get isDead(){return o.connectionState===`closed`},getOffer:async(t=!1)=>{if(e)return t?oe(!0):h?ce:o.localDescription?.type===Bt?f?O(o):ie(o):ce},async signal(t){if(t.type===`candidate`){if(t.sdp.length>Wt)return;try{let e=JSON.parse(t.sdp);e&&typeof e==`object`&&await P(D(e))}catch(e){s.error?.(Ge(e,`failed to parse remote candidate`))}}else if(v?.readyState!==`open`||t.sdp?.includes(`a=rtpmap`))try{let n={...t,sdp:E(t.sdp)};if(t.type===Bt){let t=g||o.signalingState!==`stable`&&!_;return t&&e?void 0:(t&&o.signalingState!==`stable`?await Ie([o.setLocalDescription({type:`rollback`}),o.setRemoteDescription(n)]):await o.setRemoteDescription(n),await N(),await o.setLocalDescription(),await ae())}if(t.type===Vt){_=!0;try{await o.setRemoteDescription(n),await N()}finally{_=!1}}}catch(e){s.error?.(Ge(e,`failed to apply remote signal`))}},sendData:e=>v?.send(e),destroy:()=>{S(),x(),v?.close(),o.close(),g=!1,_=!1,C()},setHandlers:e=>{let{signal:t,...n}=e;Object.assign(s,n),s.data&&u.length>0&&(d=H(d),u.splice(0).forEach(e=>s.data?.(e))),t&&T(t),(s.track||s.stream)&&m.length>0&&m.splice(0).forEach(({track:e,stream:t})=>{s.track?.(e,t),s.stream?.(t)})},addStream:e=>e.getTracks().forEach(t=>o.addTrack(t,e)),removeStream:e=>o.getSenders().filter(t=>t.track&&e.getTracks().includes(t.track)).forEach(e=>o.removeTrack(e)),addTrack:(e,t)=>o.addTrack(e,t),removeTrack:e=>{let t=o.getSenders().find(t=>t.track===e);t&&o.removeTrack(t)},replaceTrack:(e,t)=>{let n=o.getSenders().find(t=>t.track===e);if(n)return n.replaceTrack(t)}}},qt=[...Me(3,(e,t)=>`stun:stun${t||``}.l.google.com:19302`),`stun:stun.cloudflare.com:3478`].map(e=>({urls:e})),Jt=1024,Yt=64,Xt=128,Zt=8,Qt=new Uint8Array,$t=(e,t)=>{let n;try{n=e()}catch{return t(!1)}return typeof n==`boolean`?t(n):Promise.resolve(n).then(e=>t(e===!0),()=>t(!1))},en=(e,t,n)=>t===2?n?e.slice():e:t===1?tt(Ye(e)):Ye(e),tn=(e,t,n,r)=>{try{e.progress(t,n,r)}catch(e){console.error(`${je} progress handler error:`,e)}},nn=(e,t,n,r)=>{tn(e,1,n,r);try{e.receiver?.(t,n,r)}catch(e){console.error(`${je} action handler error:`,e)}},rn=({fail:e,accept:t,refuse:n,maxReceiveBytes:r,chunkSize:i})=>{let a=new Map,o=new Map,s=new Set,c=new Map,l=0,u=0,d=0,f=!1,p=!1,m=e=>e.phase!==`released`,h=e=>Math.min(r,e?.maxPayloadBytes??r),g=(e,t,r,i)=>{r?.reject(t),a.get(e.type)?.reject?.(e.peerId,e.metadata,t),i!==void 0&&n(e.peerId,i,t)},_=e=>{for(let t of Array.from(s))t.peerId===e&&(s.delete(t),s.add(t))},v=e=>{if(!m(e))return;e.phase=`released`,e.removeAbortListener?.(),e.timer=H(e.timer);let t=o.get(e.peerId);if(e.kind===`inline`){let n=t.inline.get(e.key);n.splice(n.indexOf(e),1),n.length||t.inline.delete(e.key),e.data=Qt}else t.bulk.delete(e.id),s.delete(e),e.data=null,e.transfer===`receiving`&&(d-=e.size,t.active===e&&(t.active=null,_(e.peerId)),p=!0);t.count--,l--,t.count||o.delete(e.peerId),e.controller?.abort()},y=(e,t)=>{m(e)&&(v(e),g(e,t,e.scope,e.kind===`bulk`?e.id:void 0))},b=(e,t)=>{if(e.phase!==`pending`)return e.phase===`ready`;if(e.size>h(t))return y(e,`payload exceeds receiver size limit`),!1;let n=e.scope?e.scope.receive:t.receive;if(!n)return t.receiver?(e.phase=`ready`,!0):!1;if(u>=Xt||(c.get(e.peerId)??0)>=Zt)return y(e,`too many pending receive decisions`),!1;e.phase=`deciding`;let r=new AbortController;e.controller=r,u++,c.set(e.peerId,(c.get(e.peerId)??0)+1);let i=$t(()=>n({byteLength:e.size,peerId:e.peerId,signal:r.signal,...e.metadata===void 0?{}:{metadata:e.metadata}}),t=>{u--;let n=c.get(e.peerId)-1;return n?c.set(e.peerId,n):c.delete(e.peerId),m(e)?(t?e.phase=`ready`:y(e,`payload rejected by receiver`),t):!1});return typeof i==`boolean`?i:(i.then(()=>T()),!1)},x=(t,n,r)=>{let i;try{i=en(r,t.format,t.kind===`inline`)}catch{v(t),e(t.peerId,`invalid action payload`);return}v(t),nn(n,i,t.peerId,t.metadata)},S=e=>{let t=a.get(e.type);m(e)&&t&&b(e,t)&&t.receiver&&x(e,t,e.data)},C=e=>{let n=a.get(e.type);if(!m(e)||!n||!b(e,n)||!n.receiver)return;if(e.transfer===`receiving`){e.offset===e.size&&x(e,n,e.data);return}let i=o.get(e.peerId);!i.active&&d+e.size<=r&&(i.active=e,e.transfer=`receiving`,d+=e.size,e.lastSeen=Date.now(),s.delete(e),t(e.peerId,e.id))},w=(e,t)=>{let n=o.get(e)?.inline.get(t);for(;n?.[0];){let e=n[0];if(S(e),m(e))break}},T=()=>{if(f)p=!0;else{f=!0;try{do{p=!1;for(let e of s)C(e);for(let[e,t]of o){for(let e of t.bulk.values())e.offset===e.size&&C(e);for(let n of t.inline.keys())w(e,n)}}while(p)}finally{f=!1}}},E=e=>{let t=o.get(e.peerId);if(l>=Jt||(t?.count??0)>=Yt)return g(e,`too many pending transfers`,e.scope,e.kind===`bulk`?e.id:void 0),!1;if(t||(t={bulk:new Map,inline:new Map,active:null,count:0},o.set(e.peerId,t)),t.count++,l++,e.kind===`inline`){let n=t.inline.get(e.key)??[];n.push(e),t.inline.set(e.key,n)}else t.bulk.set(e.id,e),s.add(e);let n=()=>{let t=Nt-(Date.now()-e.lastSeen);t>0?e.timer=setTimeout(n,t):(y(e,`action transfer timed out`),T())};if(e.timer=setTimeout(n,Nt),e.scope){let{signal:t}=e.scope,n=()=>{y(e,`receive cancelled`),T()};if(t.addEventListener(`abort`,n,{once:!0}),e.removeAbortListener=()=>t.removeEventListener(`abort`,n),t.aborted)return n(),!1}return!0},D=(e,t)=>{let r=a.get(e.type),i=r?.receiveScope?.(e.peerId,e.metadata);return i===null||i?.signal.aborted?(t!==void 0&&n(e.peerId,t,`unexpected response`),null):e.size>h(r)?(g(e,`payload exceeds receiver size limit`,i,t),null):{action:r,scope:i}},O=(e,t)=>({...e,...t?{scope:t}:{},phase:`pending`,controller:null,lastSeen:Date.now(),timer:null});return{register:(e,t={})=>{let n={...t,receiver:null,receive:null,reject:null,progress:He};return a.set(e,n),{onMessage:e=>{n.receiver=e,T()},onReceive:e=>{n.receive=e,T()},onReject:e=>{n.reject=e},onProgress:e=>{n.progress=e}}},receiveInline:(t,n)=>{let r=D(t);if(!r)return;let{action:i,scope:a}=r,s=a?`${t.type}\0${a.key}`:t.type;if(i?.receiver&&!(a?a.receive:i.receive)&&!o.get(t.peerId)?.inline.has(s)){let r;try{r=en(n,t.format,!0)}catch{e(t.peerId,`invalid action payload`);return}nn(i,r,t.peerId,t.metadata);return}let c={...O(t,a),kind:`inline`,key:s,data:n};E(c)&&w(t.peerId,s)},receiveOffer:(t,n)=>{if(o.get(t.peerId)?.bulk.has(n)){e(t.peerId,`duplicate action offer`);return}let r=D(t,n);if(!r)return;let i={...O(t,r.scope),kind:`bulk`,id:n,transfer:`waiting`,offset:0,data:null};E(i)&&T()},receiveChunk:(t,n,r,c)=>{let l=o.get(t),u=l?.bulk.get(n);if(!u)return;if(u.transfer!==`receiving`||r!==u.offset||!c.length||c.length!==Math.min(i,u.size-u.offset)){e(t,`invalid action chunk offset or length`);return}try{u.data??=new Uint8Array(u.size)}catch{y(u,`unable to allocate receive buffer`),T();return}u.data.set(c,u.offset),u.offset+=c.length;let d=Date.now();u.lastSeen=d;for(let e of s)e.phase===`ready`&&a.get(e.type)?.receiver&&(e.lastSeen=d);u.offset===u.size?(C(u),m(u)&&l?.active===u&&(l.active=null,_(t)),T()):tn(a.get(u.type),u.offset/u.size,t,u.metadata)},cancel:(e,t)=>{let n=o.get(e)?.bulk.get(t);n&&(v(n),n.scope?.reject(`response cancelled by sender`)),T()},clearPeer:e=>{let t=o.get(e);if(t){for(let e of t.bulk.values())v(e);for(let e of t.inline.values()){let t=[...e];for(let e of t)v(e)}}T()}}},an=2,on=0,sn=1,cn=2,ln=3,un=4,dn=5,fn=36,pn=48,mn=6,hn=14,gn=jt-hn,_n=256*1024**2,vn=1024**2,yn=`bufferedamountlow`,bn=`close`,xn=`error`,Sn=1e4,Cn=(e,t)=>{let n=U(t);return n.kind=e,n.name=e===`aborted`?`AbortError`:n.name,n},wn=e=>{if(e?.aborted)throw Cn(`aborted`,`operation aborted`)},Tn=(e,t,n=mn)=>{let r=new Uint8Array(n);return r[0]=an,r[1]=e,new DataView(r.buffer).setUint32(2,t),r},En=Cn,Dn=(e,t,n=Sn)=>e.readyState!==`open`||e.bufferedAmount<=e.bufferedAmountLowThreshold?Promise.resolve(e.readyState===`open`):new Promise(r=>{let i=!1,a=null,o=n=>{i||(i=!0,e.removeEventListener(yn,s),e.removeEventListener(bn,c),e.removeEventListener(xn,c),t?.removeEventListener(`abort`,c),H(a),r(n))},s=()=>o(!0),c=()=>o(!1);e.addEventListener(yn,s),e.addEventListener(bn,c),e.addEventListener(xn,c),t?.addEventListener(`abort`,c,{once:!0}),a=setTimeout(()=>o(!1),n),e.readyState!==`open`||t?.aborted?o(!1):e.bufferedAmount<=e.bufferedAmountLowThreshold&&o(!0)}),On=({getPeer:e,getPeerIds:t,canReceiveFromPeer:n,onPeerError:r,throwIfAborted:i=wn,maxReceiveBytes:a=_n})=>{if(!Number.isSafeInteger(a)||a<=0)throw U(`maxReceiveBytes must be a positive safe integer`);let o=new Map,s=new Map,c=new WeakSet,l=0,u=rn({fail:(e,t)=>f(e,t),accept:(e,t)=>p(e,t,ln),refuse:(e,t,n)=>p(e,t,un,n),maxReceiveBytes:a,chunkSize:gn}),d=e=>{for(let t of s.get(e)?.values()??[])t.fail(En(`disconnected`,`peer disconnected`));s.delete(e),u.clearPeer(e)},f=(t,n)=>{let i=e(t,!0);i&&!c.has(i)&&(c.add(i),console.warn(`${je}: ${n}; disconnecting peer ${t}`),r(t,U(n)))},p=(t,n,r,i=``)=>{let a=e(t,!0);if(!a)return;let o=Je(i).subarray(0,200),s=Tn(r,n,mn+o.length);s.set(o,mn);try{if((a.channel?.bufferedAmount??0)>vn)throw U(`control send buffer is full`);a.sendData(s)}catch{f(t,`unable to send action control`)}};return{makeInternalAction:(n,r={})=>{let a={sendToPending:!!r.sendToPending,receiveWhilePending:!!r.receiveWhilePending,...r.maxPayloadBytes===void 0?{}:{maxPayloadBytes:r.maxPayloadBytes},...r.receiveScope?{receiveScope:r.receiveScope}:{}},c=o.get(n);if(c){if(c.options.sendToPending!==a.sendToPending||c.options.receiveWhilePending!==a.receiveWhilePending||c.options.receiveScope!==a.receiveScope||c.options.maxPayloadBytes!==a.maxPayloadBytes)throw U(`action type "${n}" cannot be redefined`);return c.action}let d=Je(n);if(!n||n.includes(`\0`)||d.length>32)throw U(`action type must contain 1–32 UTF-8 bytes and no null characters`);let f={options:a,action:{...u.register(n,a),send:async(n,r,o,c,u)=>{if(i(u),n===void 0)throw U(`action data cannot be undefined`);let f=n instanceof Blob,m=f||n instanceof ArrayBuffer||ArrayBuffer.isView(n),h=m?2:typeof n==`string`?0:1,g=f?n:n instanceof ArrayBuffer?new Uint8Array(n):ArrayBuffer.isView(n)?new Uint8Array(n.buffer,n.byteOffset,n.byteLength):Je(h===0?n:et(n)),_=g instanceof Blob?g.size:g.byteLength,v=o===void 0?new Uint8Array:Je(et(o));if(v.length>16336)throw U(`action metadata is too large`);let y=fn+v.length+_<=jt;!y&&m&&!(g instanceof Blob)&&(g=g.slice());let b=y?0:l++>>>0,x=y?fn:pn,S=new Uint8Array(x+v.length+(y?_:0));S[0]=an,S[1]=(y?on:sn)|h<<4,S.set(d,2);let C=new DataView(S.buffer);C.setUint16(34,v.length),y||(C.setUint32(36,b),C.setFloat64(40,_)),S.set(v,x),y&&S.set(g instanceof Blob?new Uint8Array(await g.arrayBuffer()):g,x+v.length);let w=r?Array.isArray(r)?r:[r]:t(a.sendToPending);await Ie([...new Set(w)].map(async t=>{let n=e(t,a.sendToPending);if(!n){console.warn(`${je}: no peer with id ${t} found`);return}let r=null,l=()=>{if(r)throw r;if(i(u),e(t,a.sendToPending)!==n||n.channel?.readyState===`closed`)throw En(`disconnected`,`peer disconnected`)},d=async e=>{l();let t=n.channel;if(t&&(t.readyState!==`open`||t.bufferedAmount>t.bufferedAmountLowThreshold)){if(!await Dn(t,u))throw i(u),En(`disconnected`,`data channel stopped draining`);l()}try{n.sendData(e)}catch{throw En(`disconnected`,`peer disconnected`)}};if(y){await d(S),c?.(1,t,o);return}let f=!1,m=!1,h=Date.now(),v,x,C=new Promise((e,t)=>{v=e,x=t});C.catch(He);let w=s.get(t)??new Map;if(w.has(b))throw U(`action transmission id is still in use`);s.set(t,w);let T=null,E={accept:()=>!T||r?!1:(T=H(T),v(),!0),fail:(e,t=!1)=>{t&&(m=!0),r=e,x(e)},touch:()=>{T&&(h=Date.now())}};w.set(b,E);let D=()=>{let e=Nt-(Date.now()-h);e>0?T=setTimeout(D,e):E.fail(En(`timeout`,`action offer timed out`))};T=setTimeout(D,Nt);let O=()=>{try{i(u)}catch(e){E.fail(e)}};u?.addEventListener(`abort`,O,{once:!0});try{await d(S),f=!0,await C;for(let e=0;e<_;e+=gn){l();let n=Math.min(gn,_-e),r=Tn(cn,b,hn+n);new DataView(r.buffer).setFloat64(mn,e),r.set(g instanceof Blob?new Uint8Array(await g.slice(e,e+n).arrayBuffer()):g.subarray(e,e+n),hn),await d(r);for(let e of w.values())e.touch();c?.((e+n)/_,t,o)}l()}catch(r){throw f&&!m&&e(t,!0)===n&&(!n.channel||n.channel.readyState===`open`&&(n.channel.bufferedAmount??0)<=vn)&&p(t,b,dn),r}finally{T=H(T),u?.removeEventListener(`abort`,O),w.delete(b),!w.size&&s.get(t)===w&&s.delete(t)}}))}}};return o.set(n,f),f.action},handleData:(e,t)=>{if(t.byteLength<2||t.byteLength>16384){f(e,`invalid action frame`);return}let r=new Uint8Array(t);if(r[0]!==an){f(e,`incompatible action protocol version`);return}let i=r[1]&15,a=r[1]>>>4,c=new DataView(r.buffer,r.byteOffset,r.byteLength);if(i>dn||a>2||i>sn&&a!==0){f(e,`invalid action frame`);return}if(i>=cn){if(r.length<mn||(i===ln||i===dn)&&r.length!==mn||i===un&&r.length>206){f(e,`invalid action control`);return}let t=c.getUint32(2);if(i===ln){let n=s.get(e);if(n?.get(t)?.accept())for(let e of n.values())e.touch();return}if(i===un){s.get(e)?.get(t)?.fail(En(`rejected`,Ye(r.subarray(mn))),!0);return}i===dn?u.cancel(e,t):u.receiveChunk(e,t,r.length>=hn?c.getFloat64(mn):NaN,r.subarray(hn));return}let l=i===on?fn:pn;if(r.length<l){f(e,`invalid action header`);return}let d=Ye(r.subarray(2,34)).replaceAll(`\0`,``);if(!n(e,!!o.get(d)?.options.receiveWhilePending))return;let p=c.getUint16(34),m=l+p,h=i===on?r.length-m:c.getFloat64(40),g=i===sn?c.getUint32(36):0;if(!d||m>r.length||!Number.isSafeInteger(h)||h<0||i===sn&&(h===0||m!==r.length)){f(e,`invalid action proposal`);return}let _;try{p&&(_=tt(Ye(r.subarray(l,m))))}catch{f(e,`invalid action metadata`);return}let v={peerId:e,type:d,format:a,size:h,..._===void 0?{}:{metadata:_}};i===on?u.receiveInline(v,r.subarray(m)):u.receiveOffer(v,g)},clearPeer:d}},kn=e=>e&&typeof e==`object`&&!Array.isArray(e)&&typeof e.r==`string`?e:null,An=e=>{let t=kn(e);return t?{r:t.r,...Object.hasOwn(t,`m`)?{m:t.m}:{}}:null},jn=e=>{let t=kn(e);return t?{r:t.r,...typeof t.e==`string`?{e:t.e}:{}}:null},Mn=(e,t)=>t===void 0?e:{...e,metadata:t},Nn=({getPeer:e,getPeerIds:t,canReceiveFromPeer:n,onPeerError:r,maxReceiveBytes:i})=>{let a=Object.create(null),o={},s=new Map,c=On({getPeer:e,getPeerIds:t,canReceiveFromPeer:n,onPeerError:r,...i===void 0?{}:{maxReceiveBytes:i}}),l=c.makeInternalAction,u=c.handleData,d=e=>{let t=o[e];t&&(H(t.timer),t.signal&&t.abortHandler&&t.signal.removeEventListener(`abort`,t.abortHandler),delete o[e],t.controller.abort())},f=(e,t)=>{Re(o).forEach(([n,r])=>{r.peerId===e&&(d(n),r.reject(t))})},p=(e,t)=>{c.clearPeer(e);let n=s.get(e);n&&(s.delete(e),n.forEach(e=>e.abort())),f(e,Cn(`disconnected`,We(t,`peer disconnected`)))},m=l(`@_response`,{receiveScope:(e,t)=>{let n=jn(t),r=n&&o[n.r];if(!n||!r||r.peerId!==e)return null;let i=n.e===void 0?r.getReceive():null;return{key:n.r,signal:r.controller.signal,receive:i?e=>i({byteLength:e.byteLength,peerId:e.peerId,kind:`response`,signal:e.signal}):null,reject:e=>{o[n.r]===r&&(d(n.r),r.reject(Cn(`rejected`,e)))}}}});return m.onProgress((e,t,n)=>{let r=jn(n),i=r&&o[r.r];i&&i.peerId===t&&r?.e===void 0&&i.getReceiveProgress()?.(e,{peerId:t})}),m.onMessage((e,t,n)=>{let r=jn(n);if(!r)return;let i=o[r.r];i&&i.peerId===t&&(d(r.r),r.e===void 0?i.resolve(e):i.reject(Cn(`rejected`,r.e)))}),{makeAction:(t,n)=>{if(n&&`onRequest`in n&&n.kind!==`request`)throw U(`request actions must use kind: "request"`);let r=n?.kind??`message`,i=l(t),c=a[t];if(c){if(c.kind!==r)throw U(`action type "${t}" cannot be redefined`);return c.action}let u={kind:r,action:null,onReceive:n?.onReceive??null,onReceiveProgress:n?.onReceiveProgress??null},f=(e,t)=>e?(n,r)=>e(n,Mn({peerId:r},t)):void 0,p=(e,t,n)=>{let r=u.kind===`request`?An(n):null;u.onReceiveProgress?.(e,Mn({peerId:t},r?r.m:n))},h=e=>{u.onReceive=e,i.onReceive(e?t=>{let n=r===`request`?An(t.metadata):null;return e(Mn({byteLength:t.byteLength,peerId:t.peerId,signal:t.signal,kind:r},n?n.m:t.metadata))}:null)};if(h(u.onReceive),i.onProgress(p),r===`message`){let e=n?.onMessage??null,r=(t,n,r)=>{let i=e;Promise.resolve().then(()=>i(t,Mn({peerId:n},r))).catch(e=>console.error(`${je} action handler error:`,e))},o={send:async(e,t={})=>{await i.send(e,t.target,t.metadata,f(t.onProgress,t.metadata),t.signal)},get onMessage(){return e},set onMessage(t){e=t,i.onMessage(t?r:null)},get onReceive(){return u.onReceive},set onReceive(e){h(e)},get onReceiveProgress(){return u.onReceiveProgress},set onReceiveProgress(e){u.onReceiveProgress=e}};return u.action=o,a[t]=u,i.onMessage(e?r:null),o}i.onReject((e,t,n)=>{let r=An(t);r&&m.send(null,e,{r:r.r,e:n}).catch(He)});let g=n?.onRequest??null,_=(e,t,n)=>{let r=An(n);if(!r)return;let i=g,a=new AbortController,o=s.get(t);o||(o=new Set,s.set(t,o)),o.add(a),Promise.resolve().then(async()=>{let n=await i(e,{...Mn({peerId:t},r.m),signal:a.signal});if(n===void 0)throw U(`request handler returned undefined`);return n}).then(e=>m.send(e,t,{r:r.r}),e=>m.send(null,t,{r:r.r,e:We(e,`request failed`).slice(0,512)})).catch(He).finally(()=>{let e=s.get(t);e?.delete(a),e&&!e.size&&s.delete(t),a.abort()})},v=async(t,n)=>{let{target:r,metadata:a,onProgress:s,signal:c,timeoutMs:l}=n;if(wn(c),!e(r,!1))throw Cn(`disconnected`,`no active peer with id ${r}`);let p=Pe(20),m=new AbortController,h=new Promise((e,t)=>{let n={controller:m,getReceive:()=>u.onReceive,getReceiveProgress:()=>u.onReceiveProgress,peerId:r,resolve:e,reject:t,timer:null,...c===void 0?{}:{signal:c}},i=()=>{d(p),t(Cn(`aborted`,`operation aborted`))};c&&(n.abortHandler=i,c.addEventListener(`abort`,i,{once:!0})),o[p]=n,l!==void 0&&(n.timer=setTimeout(()=>{d(p),n.reject(Cn(`timeout`,`request timed out`))},l))});try{let e=i.send(t,r,a===void 0?{r:p}:{r:p,m:a},f(s,a),m.signal);return await Promise.race([h,e.then(()=>h)])}finally{d(p)}},y={request:v,requestMany:async(e,t)=>{let{targets:n,onResult:r,...i}=t;return wn(i.signal),await Ie(n.map(async t=>{try{let n={peerId:t,status:`fulfilled`,value:await v(e,{...i,target:t})};return r?.(n),n}catch(e){let n=Ge(e,`request failed`);if(n.kind===`aborted`||!n.kind)throw n;let i=n.kind===`timeout`?{peerId:t,status:`timeout`}:n.kind===`disconnected`?{peerId:t,status:`disconnected`}:{peerId:t,status:`rejected`,error:n};return r?.(i),i}}))},get onRequest(){return g},set onRequest(e){g=e,i.onMessage(e?_:null)},get onReceive(){return u.onReceive},set onReceive(e){h(e)},get onReceiveProgress(){return u.onReceiveProgress},set onReceiveProgress(e){u.onReceiveProgress=e}};return u.action=y,a[t]=u,i.onMessage(g?_:null),y},makeInternalAction:l,handleData:u,clearPeer:p}},Pn=e=>e&&typeof e==`object`&&!Array.isArray(e)&&typeof e.k==`string`?{key:e.k,...typeof e.s==`string`?{streamId:e.s}:{},...typeof e.t==`string`?{trackId:e.t}:{},...Object.hasOwn(e,`m`)?{metadata:e.m}:{}}:null,Fn=e=>t=>{let n=e.get(t);return n||(n=Pe(20),e.set(t,n)),n},In=()=>{let e=new WeakMap,t=new WeakMap,n=new Map,r=new Map,i=new Map,a=new Map,o=new WeakMap,s=new WeakMap;return{getStreamKey:Fn(e),getTrackKey:Fn(t),rememberRemoteStream:(e,t,i)=>{let s=o.get(t);s!==void 0&&n.get(s)===t&&n.delete(s),o.set(t,e),n.set(e,t),i&&r.set(i,t),t.getTracks?.().forEach(e=>{typeof e.id==`string`&&a.set(e.id,{track:e,stream:t})})},getRemoteStream:(e,t)=>n.get(e)??(t?r.get(t):void 0),rememberRemoteTrack:(e,t,n,o,c)=>{let l={track:t,stream:n},u=s.get(t);u!==void 0&&i.get(u)?.track===t&&i.delete(u),s.set(t,e),i.set(e,l),o&&a.set(o,l),c&&r.set(c,n)},getRemoteTrack:(e,t)=>i.get(e)??(t?a.get(t):void 0),hasRemoteMedia:()=>n.size>0||i.size>0,clearRemote:()=>{n.clear(),r.clear(),i.clear(),a.clear()}}},Ln=({iterate:e,isActive:t,getSharedMediaPeer:n,onPeerError:r})=>{let i={},a={},o={},s=In(),c=e=>n(e)?.__trysteroMedia??(o[e]??=In()),l=(e,t,n,i)=>{let a=e[t]??=[];a.length>=64?(console.warn(`${je}: too many pending ${i} metadata messages`),r(t,U(`too many pending media metadata messages`))):a.push(n)},u=(e,t,n)=>{if(!e?.length)return;let r=t?e.findIndex(e=>{let r=n(e);return!r||r===t}):0;return r>=0?e.splice(r,1)[0]:void 0},d=(e,n,r,i)=>{t(e)&&(c(e).rememberRemoteStream(n,r,typeof r.id==`string`?r.id:void 0),m.onPeerStream?.(r,e,i))},f=(e,n,r,i,a)=>{t(e)&&(c(e).rememberRemoteTrack(n,r,i,typeof r.id==`string`?r.id:void 0,typeof i.id==`string`?i.id:void 0),m.onPeerTrack?.(r,i,e,a))},p=(t,n,r,i,a,o={})=>{let s={k:n,...o,...r===void 0?{}:{m:r}};return e(t,async(e,t)=>{await i(s,e),await a(t)})},m={addStream:(e,t,n)=>p(t.target,s.getStreamKey(e),t.metadata,n,t=>t.addStream(e),{s:e.id}),removeStream:(t,n)=>{e(n,(e,n)=>n.removeStream(t))},addTrack:(e,t,n,r)=>p(n.target,s.getTrackKey(e),n.metadata,r,n=>n.addTrack(e,t),{s:t.id,t:e.id}),removeTrack:(t,n)=>{e(n,(e,n)=>n.removeTrack(t))},replaceTrack:(e,t,n,r)=>p(n.target,s.getTrackKey(t),n.metadata,r,n=>n.replaceTrack(e,t),{t:e.id}),receiveStreamMeta:(e,n)=>{if(!t(n))return;let r=Pn(e);if(!r)return;let a=c(n).getRemoteStream(r.key,r.streamId);a?.getTracks().length?d(n,r.key,a,r.metadata):l(i,n,r,`stream`)},receiveTrackMeta:(e,n)=>{if(!t(n))return;let r=Pn(e);if(!r)return;let i=c(n).getRemoteTrack(r.key,r.trackId);i&&i.track.readyState!==`ended`&&(!i.stream.getTracks||i.stream.getTracks().includes(i.track))?f(n,r.key,i.track,i.stream,r.metadata):l(a,n,r,`track`)},receiveRemoteStream:(e,n)=>{if(!t(e))return;let r=u(i[e],typeof n.id==`string`?n.id:void 0,e=>e.streamId);r&&d(e,r.key,n,r.metadata)},receiveRemoteTrack:(e,n,r)=>{if(!t(e))return;let i=a[e],o=typeof n.id==`string`?n.id:void 0,s=typeof r.id==`string`?r.id:void 0,c=i&&o?i.findIndex(e=>e.trackId===o):-1,l=c>=0?i?.splice(c,1)[0]:u(i,s,e=>e.streamId);l&&f(e,l.key,n,r,l.metadata)},clearPeer:e=>{delete i[e],delete a[e],delete o[e]},onPeerStream:null,onPeerTrack:null};return m},Rn=`beforeunload`,zn=1e4,Bn=e=>`@_`+e,Vn=new Set,Hn=()=>Vn.forEach(e=>e()),Un=e=>(Vn.add(e),Vn.size===1&&addEventListener(Rn,Hn),()=>{Vn.delete(e),Vn.size||removeEventListener(Rn,Hn)}),Wn=(e,t,n,{onPeerHandshake:r,onHandshakeError:i,handshakeTimeoutMs:a=zn,maxReceiveBytes:o,isPassive:s=!1,onBeforeLeave:c}={})=>{let l={},u={},d={},f={onPeerJoin:null,onPeerLeave:null},p=He,m=null,h=(e,t)=>(e?Array.isArray(e)?e:[e]:Be(u)).flatMap(e=>{let n=u[e];return n?[Promise.resolve(t(e,n))]:(console.warn(`${je}: no peer with id ${e} found`),[])}),g=(e,t,n)=>{let r=l[e];!r||t&&r!==t||(j.send(``,e).catch(He),w(e,r,n))},_=(e,t)=>g(e,void 0,t),v=Ln({onPeerError:_,iterate:(e,t)=>h(e,(e,n)=>t(e,n)),isActive:e=>!!u[e],getSharedMediaPeer:e=>l[e]??null}),y=Nn({onPeerError:_,...o===void 0?{}:{maxReceiveBytes:o},getPeer:(e,t)=>(t?l:u)[e],getPeerIds:e=>Be(e?l:u),canReceiveFromPeer:(e,t)=>N.canReceiveFromPeer(e,t)}),b=y.makeInternalAction,x=y.handleData,S=y.makeAction,C=(e,t=U(`peer disconnected`))=>{let n=Ge(t,`peer disconnected`);N.clearPeer(e,n),delete l[e],delete u[e],y.clearPeer(e,n),d[e]?.splice(0).forEach(e=>e.reject(n)),delete d[e],v.clearPeer(e)},w=(e,n,r)=>{let i=l[e];if(!i||n&&i!==n)return;let a=!!u[e];C(e,r),i.destroy(),a&&f.onPeerLeave?.(e),t(e)},T=()=>m??=(async()=>{c?.();let e=new AbortController;j.send(``,void 0,void 0,void 0,e.signal).catch(He),await new Promise(e=>setTimeout(e,99)),e.abort();try{Re(l).forEach(([e,t])=>{t.destroy(),C(e,U(`room left`))})}finally{try{p()}finally{n()}}})(),E=b(Bn(`ping`)),D=b(Bn(`pong`)),O=b(Bn(`signal`)),k=b(Bn(`stream`),{maxPayloadBytes:65536}),A=b(Bn(`track`),{maxPayloadBytes:65536}),j=b(Bn(`leave`),{sendToPending:!0,receiveWhilePending:!0}),ee=b(Bn(`hsdata`),{sendToPending:!0,receiveWhilePending:!0,maxPayloadBytes:65536}),M=b(Bn(`hsready`),{sendToPending:!0,receiveWhilePending:!0}),N=At({...r===void 0?{}:{onPeerHandshake:r},...i===void 0?{}:{onHandshakeError:i},handshakeTimeoutMs:a,sendHandshakeData:ee.send,sendHandshakeReady:M.send,onActivate:(e,t)=>{u[e]=t,t.setHandlers({signal:n=>{u[e]===t&&O.send(n,e).catch(He)}}),f.onPeerJoin?.(e)},onFailure:(e,t,n)=>g(e,t,n)});return E.onMessage((e,t)=>{D.send(``,t).catch(He)}),D.onMessage((e,t)=>{let n=d[t];(n?.shift())?.resolve(),n&&!n.length&&delete d[t]}),O.onMessage((e,t)=>{u[t]?.signal(e)}),k.onMessage((e,t)=>v.receiveStreamMeta(e,t)),A.onMessage((e,t)=>v.receiveTrackMeta(e,t)),j.onMessage((e,t)=>w(t,void 0,U(`peer left room`))),ee.onMessage((e,t,n)=>N.receiveHandshakeData(e,t,n)),M.onMessage((e,t)=>N.receiveHandshakeReady(t)),e((e,t)=>{let n=l[t];if(n){if(n===e)return;n.destroy(),C(t,U(`peer replaced`))}l[t]=e,N.addPeer(t,e),e.setHandlers({data:n=>{l[t]===e&&x(t,n)},stream:e=>v.receiveRemoteStream(t,e),track:(e,n)=>v.receiveRemoteTrack(t,e,n),close:()=>w(t,e,U(`peer disconnected`)),error:n=>{console.error(`${je} peer error:`,n),w(t,e,n)}}),N.start(t,e)}),Le&&(p=Un(()=>T().catch(He))),{makeAction:S,leave:T,ping:async e=>{if(!u[e])throw U(`no active peer with id ${e}`);let t=Date.now();return await new Promise((t,n)=>{let r=d[e]??=[],i=()=>{let t=d[e];if(!t)return;let n=t.indexOf(a);n>-1&&t.splice(n,1),t.length||delete d[e]},a={resolve:()=>{i(),t()},reject:e=>{i(),n(e)}};r.push(a),E.send(``,e).catch(e=>a.reject(Ge(e,`peer disconnected`)))}),Date.now()-t},isPassive:()=>s,getPeers:()=>ze(Re(u).map(([e,t])=>[e,t.connection])),addStream:(e,t={})=>v.addStream(e,t,k.send),removeStream:(e,t={})=>{v.removeStream(e,t.target)},addTrack:(e,t,n={})=>v.addTrack(e,t,n,A.send),removeTrack:(e,t={})=>{v.removeTrack(e,t.target)},replaceTrack:(e,t,n={})=>v.replaceTrack(e,t,n,A.send),get onPeerJoin(){return f.onPeerJoin},set onPeerJoin(e){f.onPeerJoin=e,e&&Be(u).forEach(t=>e(t))},get onPeerLeave(){return f.onPeerLeave},set onPeerLeave(e){f.onPeerLeave=e},get onPeerStream(){return v.onPeerStream},set onPeerStream(e){v.onPeerStream=e},get onPeerTrack(){return v.onPeerTrack},set onPeerTrack(e){v.onPeerTrack=e}}},Gn=1,Kn=2,qn=(e,t)=>{let n=Je(e),r=new Uint8Array(3+n.byteLength+t.byteLength);return r[0]=Gn,r[1]=n.byteLength>>>8&255,r[2]=n.byteLength&255,r.set(n,3),r.set(t,3+n.byteLength),r},Jn=(e,t)=>{let n=Je(e),r=new Uint8Array(4+n.byteLength);return r[0]=Kn,r[1]=Number(t),r[2]=n.byteLength>>>8&255,r[3]=n.byteLength&255,r.set(n,4),r},Yn=(e,t)=>{if(e.byteLength<t+2)return null;let n=(e[t]??0)<<8|(e[t+1]??0),r=t+2+n;return n<=0||n>128||e.byteLength<r?null:{roomToken:Ye(e.subarray(t+2,r)),headerSize:r}},Xn=e=>{let t=new Uint8Array(e);if(t.byteLength<3||t.byteLength>16515)return null;if(t[0]===Gn){let e=Yn(t,1);return e?{type:`room`,roomToken:e.roomToken,payload:t.subarray(e.headerSize).slice().buffer}:null}if(t[0]===Kn){let e=Yn(t,2);return e?{type:`presence`,roomToken:e.roomToken,isPresent:t[1]===1}:null}return null},Zn=e=>{let{connection:t,channel:n}=e;return e.isDead||t.connectionState===`closed`||t.connectionState===`failed`||t.iceConnectionState===`closed`||t.iceConnectionState===`failed`||n?.readyState===`closing`||n?.readyState===`closed`},Qn=e=>{if(Zn(e))return`stale`;let{channel:t}=e;return!t||t.readyState!==`open`?`transient`:`live`},$n=class{rooms=new Map;unclaimedDataTimers=new WeakMap;pendingDataTimers=new WeakMap;byApp={};registerRoom(e,t,n,r){let i=this.rooms.get(e)??new Map;if(i.has(t))throw U(`room membership already registered`);let a={token:null,tokenPromise:n,...r};i.set(t,a),this.rooms.set(e,i);let o=()=>this.rooms.get(e)?.get(t)===a,s=t=>{if(a.token)for(let n of Ve(this.byApp[e]??{}))try{this.sendRoomPresence(n,a.token,t)}catch{}};return n.then(n=>{if(o()){a.token=n;for(let r of Ve(this.byApp[e]??{}))r.remoteRoomTokens.has(n)&&this.attachRoom(e,t,a,r),this.discardUnboundData(r);o()&&a.active&&s(!0)}}),{connect:(n,r,s)=>{if(!o()){r.destroy();return}let c=this.reusable(e,n);c&&c.peer!==r&&r.destroy();let l=c??this.register(e,n,r,s);if(this.attachRoom(e,t,a,l),!c)for(let e of i.values())e.active&&e.token&&this.sendRoomPresence(l,e.token,!0)},reuse:n=>{if(!o())return!1;let r=this.reusable(e,n);return r?(this.attachRoom(e,t,a,r),!0):!1},setActive:e=>{o()&&a.active!==e&&(a.active=e,s(e))},leave:()=>{if(o()){i.delete(t),i.size||this.rooms.delete(e),s(!1);for(let n of Ve(this.byApp[e]??{})){let e=n.bindings[t];e?.handlers.close?.(),e?.detach(),this.discardUnboundData(n)}}}}}owns(e,t,n){return this.byApp[e]?.[t]?.peer===n}reusable(e,t){let n=this.byApp[e]?.[t];if(n&&Zn(n.peer))this.clear(e,t,{destroyPeer:!0});else return n}attachRoom(e,t,n,r){if(this.rooms.get(e)?.get(t)!==n||r.isClosing||this.get(e,r.peerId)!==r)return;let{proxy:i,isNew:a}=this.bind(t,n.tokenPromise,r,{onDetach:()=>n.onDetach(r.peerId,r.peer)});a&&n.onPeer(i,r.peerId,r.peer)}get(e,t){return this.byApp[e]?.[t]}sendRoomPresence(e,t,n){e.isClosing||Zn(e.peer)||e.peer.sendData(Jn(t,n))}clear(e,t,{destroyPeer:n}){let r=this.byApp[e],i=r?.[t];if(!i||i.isClosing)return;i.idleTimer=H(i.idleTimer),this.clearDataTimers(i),i.isClosing=!0,n&&!i.peer.isDead&&i.peer.destroy();let a=Ve(i.bindings);i.bindings={},i.bindingsByToken={},i.controlRoomId=null,delete r[t],a.forEach(e=>{e.handlers.close?.(),e.pendingData.length=0,e.pendingSendData.length=0,e.pendingTracks.length=0}),i.media.clearRemote(),i.pendingDataByToken.clear(),i.remoteRoomTokens.clear(),Be(r).length===0&&delete this.byApp[e]}register(e,t,n,r){let i=this.byApp[e]?.[t];if(i){if(i.idleTimer=H(i.idleTimer),i.peer===n)return i;this.clear(e,t,{destroyPeer:!0})}let a={appId:e,peerId:t,peer:n,bindings:{},bindingsByToken:{},pendingDataByToken:new Map,remoteRoomTokens:new Set,idleTimer:null,controlRoomId:null,streamOwners:new Map,trackOwners:new Map,media:In(),idleMs:r,isClosing:!1};(this.byApp[e]??={})[t]=a;let o=()=>{this.owns(e,t,n)&&this.clear(e,t,{destroyPeer:!0})};return n.setHandlers({data:e=>this.dispatchData(a,e),signal:e=>this.dispatchSignal(a,e),close:o,error:e=>{console.error(`${je} peer error:`,e),o()},track:(e,t)=>this.dispatchTrack(a,e,t)}),a}bind(e,t,n,{onDetach:r}){let i=n.bindings[e];if(i)return n.idleTimer=H(n.idleTimer),{proxy:i.proxy,isNew:!1};let a={roomId:e,roomToken:null,roomTokenPromise:t,handlers:{},pendingData:[],pendingSendData:[],pendingTracks:[],detach:He,proxy:{}},o=()=>{if(n.bindings[e]!==a)return;let t=Be(n.bindings).length===1&&(n.streamOwners.size>0||n.trackOwners.size>0||n.media.hasRemoteMedia());t||this.pruneRoomOwnership(n,e),delete n.bindings[e],a.roomToken&&n.bindingsByToken[a.roomToken]===a&&delete n.bindingsByToken[a.roomToken],n.controlRoomId===e&&(n.controlRoomId=Be(n.bindings)[0]??null),this.discardUnboundData(n),r(),t?this.clear(n.appId,n.peerId,{destroyPeer:!0}):this.scheduleIdleTimer(n)},s={get connection(){return n.peer.connection},get channel(){return n.peer.channel},get isDead(){return n.peer.isDead},getOffer:e=>n.peer.getOffer(e),signal:e=>n.peer.signal(e),sendData:e=>{a.roomToken?n.peer.sendData(qn(a.roomToken,e)):a.pendingSendData.push(e)},destroy:()=>o(),setHandlers:e=>{Object.assign(a.handlers,e),this.flushBindingQueues(n,a)},addStream:t=>{let r=n.streamOwners.get(t)??new Set,i=r.size===0;r.add(e),n.streamOwners.set(t,r),i&&n.peer.addStream(t)},removeStream:t=>this.releaseStreamOwner(n,t,e),addTrack:(t,r)=>{let i=n.trackOwners.get(t)??{stream:r,rooms:new Set},a=i.rooms.size===0;return i.stream=r,i.rooms.add(e),n.trackOwners.set(t,i),a?n.peer.addTrack(t,r):n.peer.connection.getSenders().find(e=>e.track===t)??n.peer.addTrack(t,r)},removeTrack:t=>this.releaseTrackOwner(n,t,e),replaceTrack:async(e,t)=>{let r=n.trackOwners.get(e);if(await n.peer.replaceTrack(e,t),r&&n.trackOwners.get(e)===r){n.trackOwners.delete(e);let i=n.trackOwners.get(t)??{stream:r.stream,rooms:new Set};r.rooms.forEach(e=>i.rooms.add(e)),n.trackOwners.set(t,i)}},__trysteroMedia:n.media};return a.proxy=s,a.detach=o,n.bindings[e]=a,n.controlRoomId??=e,n.idleTimer=H(n.idleTimer),t.then(t=>{if(n.isClosing||n.bindings[e]!==a)return;a.roomToken=t,n.bindingsByToken[t]=a;let r=n.pendingDataByToken.get(t);r?.length&&(a.pendingData.push(...r),n.pendingDataByToken.delete(t));let i=a.pendingSendData.splice(0);Zn(n.peer)||i.forEach(e=>{try{n.peer.sendData(qn(t,e))}catch{}}),this.flushBindingQueues(n,a),this.discardUnboundData(n)}),{proxy:s,isNew:!0}}releaseStreamOwner(e,t,n){let r=e.streamOwners.get(t);r&&(r.delete(n),r.size===0&&(e.streamOwners.delete(t),e.peer.removeStream(t)))}releaseTrackOwner(e,t,n){let r=e.trackOwners.get(t);r&&(r.rooms.delete(n),r.rooms.size===0&&(e.trackOwners.delete(t),e.peer.removeTrack(t)))}pruneRoomOwnership(e,t){e.streamOwners.forEach((n,r)=>this.releaseStreamOwner(e,r,t)),e.trackOwners.forEach((n,r)=>this.releaseTrackOwner(e,r,t))}scheduleIdleTimer(e){e.isClosing||Be(e.bindings).length>0||(e.idleTimer=H(e.idleTimer),e.idleTimer=setTimeout(()=>{let t=this.byApp[e.appId]?.[e.peerId];!t||Be(t.bindings).length>0||this.clear(e.appId,e.peerId,{destroyPeer:!0})},e.idleMs))}getSignalBinding(e){if(e.controlRoomId){let t=e.bindings[e.controlRoomId];if(t?.handlers.signal)return t}let t=Ve(e.bindings).find(e=>!!e.handlers.signal);return t?(e.controlRoomId=t.roomId,t):null}flushBindingQueues(e,t){let{handlers:n}=t;if(n.data&&t.pendingData.length>0){let r=t.pendingData.splice(0);this.syncDataTimers(e),r.forEach(e=>n.data?.(e))}else this.syncDataTimers(e);(n.track||n.stream)&&t.pendingTracks.length&&t.pendingTracks.splice(0).forEach(({track:e,stream:t})=>{n.track?.(e,t),n.stream?.(t)})}unclaimedBufferedFrameCount(e){let t=0;for(let n of e.pendingDataByToken.values())t+=n.length;return t}boundBufferedFrameCount(e){let t=0;for(let n of Ve(e.bindings))t+=n.pendingData.length;return t}bufferedFrameCount(e){return this.unclaimedBufferedFrameCount(e)+this.boundBufferedFrameCount(e)}clearDataTimers(e){H(this.unclaimedDataTimers.get(e)),this.unclaimedDataTimers.delete(e),H(this.pendingDataTimers.get(e)),this.pendingDataTimers.delete(e)}syncDataTimers(e){e.isClosing?this.clearDataTimers(e):(this.unclaimedBufferedFrameCount(e)===0?(H(this.unclaimedDataTimers.get(e)),this.unclaimedDataTimers.delete(e)):this.unclaimedDataTimers.has(e)||this.unclaimedDataTimers.set(e,setTimeout(()=>{this.unclaimedDataTimers.delete(e),e.pendingDataByToken.clear()},Mt)),this.boundBufferedFrameCount(e)===0?(H(this.pendingDataTimers.get(e)),this.pendingDataTimers.delete(e)):this.pendingDataTimers.has(e)||this.pendingDataTimers.set(e,setTimeout(()=>{this.pendingDataTimers.delete(e),this.boundBufferedFrameCount(e)>0&&this.failData(e,`room data handler timed out`)},Mt)))}canBindRoomToken(e,t){return Ve(e.bindings).some(e=>!e.roomToken)||[...this.rooms.get(e.appId)?.values()??[]].some(e=>!e.token||e.token===t)}discardUnboundData(e){for(let t of e.pendingDataByToken.keys())this.canBindRoomToken(e,t)||e.pendingDataByToken.delete(t);this.syncDataTimers(e)}failData(e,t){console.warn(`${je}: ${t}; disconnecting peer ${e.peerId}`),this.clear(e.appId,e.peerId,{destroyPeer:!0})}dispatchData(e,t){if(e.isClosing)return;let n=Xn(t);if(!n){this.failData(e,`invalid or incompatible room frame`);return}if(n.type===`presence`){if(n.isPresent){if(!e.remoteRoomTokens.has(n.roomToken)&&e.remoteRoomTokens.size>=64){this.failData(e,`too many advertised rooms`);return}e.remoteRoomTokens.add(n.roomToken);for(let[t,r]of this.rooms.get(e.appId)??[])r.token===n.roomToken&&this.attachRoom(e.appId,t,r,e)}else{e.remoteRoomTokens.delete(n.roomToken),e.pendingDataByToken.delete(n.roomToken);let t=e.bindingsByToken[n.roomToken];t?.handlers.close?.(),t?.detach(),this.syncDataTimers(e)}return}let r=e.bindingsByToken[n.roomToken];if(!r){if(!this.canBindRoomToken(e,n.roomToken)||this.bufferedFrameCount(e)>=64)return;let t=e.pendingDataByToken.get(n.roomToken)??[];t.push(n.payload),e.pendingDataByToken.set(n.roomToken,t),this.syncDataTimers(e)}else if(r.handlers.data)r.handlers.data(n.payload);else{if(this.bufferedFrameCount(e)>=64){this.failData(e,`too much data waiting for a room handler`);return}r.pendingData.push(n.payload),this.syncDataTimers(e)}}dispatchSignal(e,t){let n=this.getSignalBinding(e);n?n.handlers.signal?.(t):t.type===`offer`&&this.clear(e.appId,e.peerId,{destroyPeer:!0})}dispatchTrack(e,t,n){Ve(e.bindings).forEach(e=>{e.handlers.track||e.handlers.stream?(e.handlers.track?.(t,n),e.handlers.stream?.(n)):e.pendingTracks.push({track:t,stream:n})})}},er=23333,tr=57333,nr=12,rr=7533,ir=23333,ar=`offer-placeholder`,or=[`offer`,`answer`,`candidate`],sr=e=>{if(typeof e==`string`)try{let t=tt(e);return t&&typeof t==`object`&&!Array.isArray(t)?t:null}catch{return null}return e&&typeof e==`object`&&!Array.isArray(e)?e:null},cr=(e,t)=>typeof e[t]==`string`&&e[t]?e[t]:void 0,lr=e=>!!(e&&typeof e==`object`&&typeof e.signal==`function`&&typeof e.destroy==`function`&&typeof e.setHandlers==`function`),ur=(e,t=!1)=>or.some(t=>t in e&&(typeof e[t]!=`string`||e[t]===``))||`peer`in e&&(t||e.peer!==void 0&&!lr(e.peer)),dr=e=>{let t=sr(e);if(!t||ur(t,typeof e==`string`))return!1;let n=cr(t,`peerId`);return!(!n||n===Fe||t.passive===!0||cr(t,`answer`)||cr(t,`candidate`))},fr=(e,t,n,r,i,a)=>{e.toCipher(t).then(t=>{!e.isLeaving()&&a()&&r(n,et(i(t.sdp)))})},pr=()=>({offerPeer:null,offerId:null,offerSdp:null,offerInitPromise:null,offerAnswered:!1,offerRelays:[],offerSignalRelays:[],offerSignalBacklog:[],offerRelayTimers:[],offerExpiryTimer:null,connectedPeer:null,connectedPeerUnhealthySinceMs:null,answeringExpiryTimer:null,answeringPeer:null,answerSent:!1,answerReplay:null,connectionErrorReported:!1}),mr=e=>[...e.turnConfig??[],...e.rtcConfig?.iceServers??[]].some(({urls:e})=>(Array.isArray(e)?e:[e]).some(e=>/^turns?:/i.test(e))),hr=(e,t)=>`could not connect to peer ${e} after exchanging SDP; ${mr(t)?`check that your TURN server URLs and credentials are reachable by both peers`:`configure TURN servers with turnConfig or rtcConfig.iceServers`}`,gr=(e,t,n)=>{e.isLeaving()||t.connectedPeer||t.connectionErrorReported||(t.connectionErrorReported=!0,e.onJoinError?.({error:hr(n,e.config),appId:e.appId,peerId:n,roomId:e.roomId}))},_r=(e,t)=>e[t]??=pr(),vr=new WeakMap,yr=e=>{vr.delete(e),e.answeringExpiryTimer=H(e.answeringExpiryTimer),e.answeringPeer=null,e.answerSent=!1,e.answerReplay=null},br=(e,t)=>{e.answeringPeer===t&&(yr(e),e.connectedPeer!==t&&!t.isDead&&t.destroy())},xr=(e,t)=>{e.answeringPeer&&e.answeringPeer!==t&&!e.answeringPeer.isDead&&e.answeringPeer.destroy(),yr(e),e.connectedPeer=t,e.connectedPeerUnhealthySinceMs=null},Sr=(e,t)=>{e?.connectedPeer===t&&(e.connectedPeer=null,e.connectedPeerUnhealthySinceMs=null)},Cr=(e,t,n)=>{e.connectedPeer&&(e.connectedPeer.isDead||e.connectedPeer.destroy(),e.connectedPeer=null,e.connectedPeerUnhealthySinceMs=null)},wr=(e,t)=>{e.offerRelayTimers[t]=H(e.offerRelayTimers[t]),e.offerRelays[t]&&(e.offerRelays[t]=void 0)},Tr=(e,t)=>{e?.offerRelays[t]===ar&&wr(e,t)},Er=e=>{vr.delete(e),e.offerExpiryTimer=H(e.offerExpiryTimer),e.offerInitPromise=null,e.offerRelays.forEach((t,n)=>wr(e,n)),e.offerRelays=[],e.offerSignalRelays=[],e.offerRelayTimers=[],e.offerSignalBacklog=[],e.offerPeer&&e.offerPeer!==e.connectedPeer&&(e.offerPeer.isDead||e.offerPeer.destroy()),e.offerPeer=null,e.offerId=null,e.offerSdp=null,e.offerAnswered=!1,e.connectionErrorReported=!1},Dr=(e,t,n,r)=>{H(t.answeringExpiryTimer),t.answeringExpiryTimer=setTimeout(()=>{let t=e.peerStates[n];t&&!t.connectedPeer&&t.answeringPeer===r&&(t.answerSent&&gr(e,t,n),br(t,r),e.checkDeactivate())},ir)},Or=(e,t,n,r=tr)=>{H(t.offerExpiryTimer);let i=t.offerId;t.offerExpiryTimer=setTimeout(()=>{let t=e.peerStates[n];t&&!t.connectedPeer&&t.offerId===i&&(t.offerAnswered&&gr(e,t,n),Er(t),e.checkDeactivate())},r)},kr=(e,t,n,r,i)=>{let a=()=>{t.offerPeer===r&&!t.connectedPeer&&(t.offerAnswered&&gr(e,t,n),Er(t)),e.disconnectPeer(r,n),e.checkDeactivate()};r.setHandlers({connect:()=>e.connectPeer(r,n),...i?{signal:i}:{},close:a,error:a})},Ar=(e,t,n)=>{if(t.offerPeer&&t.offerId&&t.offerSdp)return Promise.resolve({peer:t.offerPeer,offer:t.offerSdp,offerId:t.offerId});if(t.offerInitPromise)return t.offerInitPromise;let r=(async()=>{let i;try{i=(await e.offerManager.checkout(1,!1,e.encryptOffer))[0]}catch(n){if(e.isLeaving()||t.offerInitPromise!==r)return null;throw n}if(!i)throw U(`failed to allocate offer peer`);let{peer:a,offer:o}=i;return e.isLeaving()||t.offerInitPromise!==r?(a.destroy(),null):(t.offerPeer=a,t.offerId=Pe(nr),t.offerSdp=o,t.offerAnswered=!1,t.connectionErrorReported=!1,t.offerSignalBacklog=[],kr(e,t,n,a,e=>{t.offerPeer===a&&(t.offerSignalBacklog.push(e),t.offerSignalRelays.forEach(t=>t?.(e)))}),Or(e,t,n),{peer:a,offer:o,offerId:t.offerId})})().finally(()=>{t.offerInitPromise===r&&(t.offerInitPromise=null)});return t.offerInitPromise=r},jr=async(e,t,n,r,i=0)=>{let a=e.peerStates[n];if(!a||a.connectedPeer||a.answeringPeer||a.offerAnswered){Tr(a,t);return}if(a.offerRelays[t]!==ar)return;let[o,s]=await Ie([vt(Ze(e.rootTopicPlaintext,n)),Ar(e,a,n)]);if(!s){Tr(a,t);return}if(e.isLeaving()){Er(a);return}if(a.connectedPeer||a.answeringPeer||a.offerAnswered||a.offerRelays[t]!==ar){Tr(a,t);return}a.offerRelayTimers[t]=H(a.offerRelayTimers[t]),a.offerRelays[t]=!0,a.offerRelayTimers[t]=setTimeout(()=>{i>=2||e.isLeaving()||a.connectedPeer||a.answeringPeer||a.offerAnswered||a.offerPeer!==s.peer||a.offerId!==s.offerId?Fr(e,n,t):(a.offerRelays[t]=ar,jr(e,t,n,r,i+1))},i===0&&e.announceIntervals[t]===void 0?2e3:(e.announceIntervals[t]??e.announceIntervalMs)*.9);let c=!1;a.offerSignalRelays[t]=t=>{c&&(e.isLeaving()||a.connectedPeer||a.offerPeer!==s.peer||a.offerId!==s.offerId||t.type!==`candidate`||fr(e,t,o,r,t=>({peerId:Fe,offerId:s.offerId,candidate:t,...e.isPassive?{passive:!0}:{}}),()=>!a.connectedPeer&&a.offerPeer===s.peer&&a.offerId===s.offerId))},r(o,et({peerId:Fe,offerId:s.offerId,offer:s.offer,...e.isPassive?{passive:!0}:{}})),c=!0,a.offerSignalBacklog.forEach(e=>a.offerSignalRelays[t]?.(e))},Mr=async(e,t,n,r,i,a)=>{let o=_r(e.peerStates,n);if(o.answeringPeer||o.offerAnswered){let s=o.answerReplay,c=s?.lastSentAt[t];if(o.answeringPeer&&!o.answeringPeer.isDead&&s&&s.offer===r&&s.offerId===i&&(c===void 0||Date.now()-c>=1e3)){s.lastSentAt[t]=Date.now();let r=await vt(Ze(e.rootTopicPlaintext,n));if(!e.isLeaving()&&o.answerReplay===s&&!o.connectedPeer){let e=e=>a(r,e);s.relays[t]=e,s.messages.forEach(e)}}return}let s=!!(o.offerPeer||o.offerRelays.some(Boolean));if(s&&Fe<n)return;s&&Er(o);let c=e.initPeer(!1,e.config),l={offer:r,offerId:i,messages:[],lastSentAt:[],relays:[]};l.lastSentAt[t]=Date.now(),o.answeringPeer=c,o.answerSent=!1,o.answerReplay=l,o.connectionErrorReported=!1,Dr(e,o,n,c);let u=()=>{o.answeringPeer===c&&!o.connectedPeer&&o.answerSent&&gr(e,o,n),br(o,c),e.disconnectPeer(c,n),e.checkDeactivate()};c.setHandlers({connect:()=>e.connectPeer(c,n),close:u,error:u});let d;try{d=await e.toPlain({type:`offer`,sdp:r})}catch{br(o,c),e.onJoinError?.({error:`incorrect room password when decrypting offer`,appId:e.appId,peerId:n,roomId:e.roomId});return}if(c.isDead){br(o,c);return}let f=await vt(Ze(e.rootTopicPlaintext,n));if(e.isLeaving()||o.answerReplay!==l)return;l.relays[t]=e=>a(f,e);let p=[],m=!1,h=t=>{e.toCipher(t).then(n=>{if(e.isLeaving()||o.answeringPeer!==c||c.isDead)return;let r={peerId:Fe};t.type===`answer`?(o.answerSent=!0,r.answer=n.sdp):r.candidate=n.sdp,i&&(r.offerId=i),e.isPassive&&(r.passive=!0);let a=et(r),s=Date.now();l.messages.push(a),l.relays.forEach((e,t)=>{e&&(l.lastSentAt[t]=s,e(a))}),t.type===`answer`&&!m&&(m=!0,p.splice(0).forEach(h))})};c.setHandlers({signal:t=>{e.isLeaving()||o.answeringPeer!==c||c.isDead||(t.type===`answer`||t.type===`candidate`)&&(t.type===`candidate`&&!m?p.push(t):h(t))}}),await c.signal(d)},Nr=async(e,t,n,r,i)=>{let a;try{a=await e.toPlain({type:Ue,sdp:n})}catch{return}let o=e.peerStates[t],s=r&&o?.offerPeer&&o.offerId===r?o.offerPeer:null,c=!r||o?.answerReplay?.offerId===r?o?.answeringPeer:null,l=!r&&o?.offerPeer?o.offerPeer:null,u=i&&!i.isDead?i:s??c??l;u&&!u.isDead&&u.signal(a)},Pr=async(e,t,n,r,i)=>{let a;try{a=await e.toPlain({type:`answer`,sdp:n})}catch{i&&(e.offerManager.reclaimLeased(i),i.isDead||i.destroy()),e.onJoinError?.({error:`incorrect room password when decrypting answer`,appId:e.appId,peerId:t,roomId:e.roomId});return}if(i){let n=_r(e.peerStates,t);if(e.offerManager.claimLeased(i),n.connectedPeer||n.offerAnswered||n.answeringPeer&&!n.answeringPeer.isDead&&Fe>t){i.destroy();return}if(n.answeringPeer){let e=n.answeringPeer;br(n,e)}Er(n),n.offerPeer=i,n.offerId=r??null,n.offerAnswered=!0,Or(e,n,t,er),kr(e,n,t,i),i.signal(a)}else{let n=e.peerStates[t];if(!n||!n.offerPeer||n.offerAnswered||r&&n.offerId&&r!==n.offerId||n.offerPeer.isDead)return;n.offerAnswered=!0,Or(e,n,t,er),n.offerPeer.signal(a)}},Fr=(e,t,n)=>{let r=e.peerStates[t];r&&!r.connectedPeer&&r.offerRelays[n]&&(wr(r,n),e.checkDeactivate())},Ir=e=>t=>async(n,r,i)=>{if(e.isLeaving())return;let a=sr(r);if(!a||ur(a,typeof r==`string`))return;let o=cr(a,`peerId`)??``,s=cr(a,`offer`),c=cr(a,`answer`),l=cr(a,`candidate`),u=cr(a,`offerId`),d=lr(a.peer)?a.peer:void 0,f=a.passive===!0;if(!o||o===Fe)return;let[p,m]=await Ie([e.rootTopicP,e.selfTopicP]);if(e.isLeaving()||n!==p&&n!==m||e.isPassive&&f||(e.isPassive&&!e.isActive&&!c&&!l&&(e.isActive=!0,e.requeueAnnounce?.()),e.isPassive&&!e.isActive))return;let h=e.peerStates[o],g=h?.connectedPeer;if(g&&h){let e=Qn(g);if(e===`live`){h.connectedPeerUnhealthySinceMs=null;return}if(e===`stale`)Cr(h,o,`message-from-stale-peer`);else{let e=Date.now(),t=h.connectedPeerUnhealthySinceMs??e;if(h.connectedPeerUnhealthySinceMs=t,e-t<rr)return;Cr(h,o,`message-from-prolonged-disconnect`)}}if(!e.reusePeer(o)){if(o&&!s&&!c&&!l){let n=_r(e.peerStates,o),r=Fe<o;if(n.answeringPeer||n.connectedPeer||n.offerAnswered)return;if(!r&&!n.offerPeer){let r=vr.get(n);r||(r=[],vr.set(n,r));let a=r[t];if(a!==void 0&&Date.now()-a<1e3)return;r[t]=Date.now();let s=await vt(Ze(e.rootTopicPlaintext,o));e.isLeaving()||n.connectedPeer||n.answeringPeer||n.offerAnswered||i(s,et({peerId:Fe}));return}return n.offerRelays[t]?void 0:(n.offerRelays[t]=ar,jr(e,t,o,i))}if(s)return Mr(e,t,o,s,u,i);if(l)return Nr(e,o,l,u,d);if(c)return Pr(e,o,c,u,d)}},Lr=5333,Rr=[233,533,1333],zr=7533,Br=123333,Vr=({init:e,subscribe:t,announce:n,deactivate:r})=>{let i={},a={},o=new $n,s=()=>Ve(i).some(e=>Be(e).length>0),c=!1,l=[],u=He;return(d,f,p)=>{if(!d)throw U(`requires a config map as the first argument`);if(p&&typeof p!=`object`)throw U(`third argument must be a callbacks object`);let{appId:m}=d,h=p?.onJoinError,g=p?.onPeerHandshake,_=p?.handshakeTimeoutMs;if(!m)throw U(`config map is missing appId field`);if(!f)throw U(`roomId argument required`);if(d.maxReceiveBytes!==void 0&&(!Number.isSafeInteger(d.maxReceiveBytes)||d.maxReceiveBytes<=0))throw U(`maxReceiveBytes must be a positive safe integer`);if(_!==void 0&&(!Number.isFinite(_)||_<=0))throw U(`handshakeTimeoutMs must be a positive number`);if(i[m]?.[f])return i[m][f];a[m]?.[f]?.(!0);let v=Ze(je,m,f),y=vt(v),b=vt(Ze(v,Fe)),x=yt(d.password??``,m,f),S=bt(m,f),C=d._test_only_sharedPeerIdleMs??Br,w=!1,T=e=>async t=>({type:t.type,sdp:await e(x,t.sdp)}),E=T(wt),D=T(Ct),O=()=>Kt(!0,d),k=!1,A=new Et(O),j=async e=>{let t=await e.getOffer();if(!t||t.type!==`offer`)throw U(`failed to get offer for peer`);return(await D(t)).sdp},ee=(e,t)=>{ve.connect(t,e,C)},M=!1,N=()=>{F||!k||M||(M=!0,queueMicrotask(()=>{M=!1,w||I.requeueAnnounce?.()}))},P=(e,t)=>{if(w)return;let n=I.peerStates[t];n?.connectedPeer===e&&(Cr(n,t,`close-event`),re(),N())},F=!!d.passive,te,ne=He,re=()=>{if(!F||!I.isActive)return;let e=!1;Re(I.peerStates).forEach(([t,n])=>{n.connectedPeer||n.answeringPeer||n.offerInitPromise||n.offerPeer||n.offerRelays.some(Boolean)?e=!0:delete I.peerStates[t]}),e||(I.isActive=!1,te=H(te),ce.forEach(H),ce.length=0,ne(),ve.setActive(!1))},I={appId:m,roomId:f,config:d,peerStates:{},rootTopicPlaintext:v,rootTopicP:y,selfTopicP:b,toPlain:E,toCipher:D,isLeaving:()=>w,isPassive:F,isActive:!F,onJoinError:h,offerManager:A,encryptOffer:j,initPeer:Kt,connectPeer:ee,disconnectPeer:P,reusePeer:e=>ve.reuse(e),checkDeactivate:re,announceIntervals:[],announceIntervalMs:Lr},L={config:d,appId:m,roomId:f,isPassive:F},ie=Ir(I);if(!c){let t=e(d);l=(Array.isArray(t)?t:[t]).map(e=>Promise.resolve(e)),c=!0,u=d.relayConfig?.manualReconnection?He:ft()}let ae=l.map(()=>Lr),oe=l.map(()=>0),se=l.map(()=>0),ce=[],le=l.map(async(e,n)=>t(await e,await y,await b,ie(n),e=>A.getOffers(e,j),L));Ie([y,b]).then(([e,t])=>{if(w)return;let i=async(r,a)=>{if(w||F&&!I.isActive)return;let o=F?{passive:!0}:void 0,s;try{s=await n(r,e,t,o,L),se[a]=0}catch(e){if(w)return;let t=se[a]??0;t===0&&d.relayConfig?.warnOnRelayFailure!==!1&&console.warn(`${je}: announce failed - ${We(e,``)}`),se[a]=t+1}if(w||F&&!I.isActive||s&&typeof s!=`number`&&`stopAnnouncing`in s)return;typeof s==`number`?(I.announceIntervals[a]=s,ae[a]=s):s&&(ae[a]=s.nextAnnounceMs,k||=s.reannounceOnDisconnect===!0);let c=oe[a]??0;oe[a]=c+1;let l=ae[a]??Lr,u=Rr[c]??(c===3&&typeof s==`object`?Lr:void 0);ce[a]=setTimeout(()=>{i(r,a)},typeof u==`number`?Math.min(l,u):l)};ne=()=>{r&&l.forEach(async n=>{let i=await n;w||r(i,e,t,L)})},I.requeueAnnounce=()=>{ce.forEach(H),ce.length=0,te=H(te),ve.setActive(!0),te=setTimeout(re,zr),l.forEach(async(e,t)=>{let n=await e;n&&!w&&(oe[t]=0,i(n,t))})},le.forEach(async(e,t)=>{if(await e,w)return;let n=await l[t];n&&!w&&(!F||I.isActive)&&i(n,t)})});let ue=He,{compose:de}=Ot(d.password??``,m,f),fe=de(g),pe=()=>{i[m]?.[f]===_e&&(delete i[m][f],Be(i[m]).length===0&&delete i[m])},me=()=>{a[m]?.[f]===he&&(delete a[m][f],Be(a[m]).length===0&&delete a[m])},he=(e=!1)=>{w||(w=!0,ue=He,pe(),me(),ve.leave(),Re(I.peerStates).forEach(([e,t])=>{t.connectedPeer&&!t.connectedPeer.isDead&&(o.owns(m,e,t.connectedPeer)||t.connectedPeer.destroy()),t.answeringPeer&&!t.answeringPeer.isDead&&t.answeringPeer.destroy(),Er(t),yr(t),t.connectedPeer=null,t.connectedPeerUnhealthySinceMs=null}),ce.forEach(H),te=H(te),le.forEach(async e=>{(await e)()}),A.destroy(),e||s()||(c=!1,u()))},ge={...d.maxReceiveBytes===void 0?{}:{maxReceiveBytes:d.maxReceiveBytes},...fe?{onPeerHandshake:fe}:{},..._===void 0?{}:{handshakeTimeoutMs:_},isPassive:F,onBeforeLeave:()=>{pe(),(a[m]??={})[f]=he},onHandshakeError:(e,t)=>h?.({error:t.replace(/^handshake failed: /,``),appId:m,peerId:e,roomId:f})};i[m]??={};let _e=Wn(e=>ue=e,e=>{if(w)return;let t=I.peerStates[e];t?.connectedPeer&&Sr(t,t.connectedPeer),re(),N()},()=>he(!1),ge),ve=o.registerRoom(m,f,S,{active:!F||I.isActive,onPeer:(e,t,n)=>{let r=_r(I.peerStates,t);xr(r,n),F&&!I.isActive&&(I.isActive=!0,ve.setActive(!0),I.requeueAnnounce?I.requeueAnnounce():(te=H(te),te=setTimeout(re,zr))),ue(e,t),Er(r)},onDetach:(e,t)=>{Sr(I.peerStates[e],t),re()}});return i[m][f]=_e}},Hr=6e4,Ur=e=>{if(!e)throw U(`topic strategy missing room context`);return e},Wr=(e,t,n,r)=>({kind:t,appId:e.appId,roomId:e.roomId,rootTopic:n,selfTopic:r}),Gr=({steadyAnnounceIntervalMs:e=Hr,reannounceOnDisconnect:t=!0,init:n,subscribeTopic:r,publishTopic:i,unpublishTopic:a})=>Vr({init:n,subscribe:async(e,t,n,a,o,s)=>{let c=Ur(s),l=(r,a)=>void i(e,r,a,Wr(c,`signal`,t,n)),u=null,d=!1,f=null,p=!1,m=e=>{d||(d=!0,e())},h=()=>(f||=Promise.resolve(r(e,n,(e,t)=>{p||a(e,t,l)},Wr(c,`self`,t,n))).then(e=>{u=e,p&&m(e)}),f);c.isPassive||await h();let g=await r(e,t,async(e,t)=>{p||(c.isPassive&&dr(t)&&await h(),p||await a(e,t,l))},Wr(c,`root`,t,n));return()=>{p=!0,u&&m(u),g()}},announce:async(n,r,a,o,s)=>{let c=Ur(s),l=await i(n,r,et({peerId:Fe,...o}),Wr(c,`announce`,r,a));return typeof l==`number`||l!==void 0&&`stopAnnouncing`in l?l:{nextAnnounceMs:l?.nextAnnounceMs??e,reannounceOnDisconnect:l?.reannounceOnDisconnect??t}},...a?{deactivate:(e,t,n,r)=>a(e,t,Wr(Ur(r),`announce`,t,n))}:{}}),Kr=dt(e=>e.socket),qr=5,Jr=`x`,Yr=`EVENT`,{secretKey:Xr,publicKey:Zr}=V.keygen(),Qr=Xe(Zr),$r={},ei=250,ti=6e4,ni=9e5,ri=5333,ii=new WeakMap,ai=Kr.scoped(),oi=new WeakSet,si=e=>{let t=ii.get(e),n=Math.min(t?.delayMs?Math.max(ti,t.delayMs*2):ti,ni);return ii.set(e,{delayMs:n,untilMs:Date.now()+n}),n},ci=e=>{let t=ii.get(e);if(!t)return 0;let n=t.untilMs-Date.now();return n>0?n:0},li=e=>({nextAnnounceMs:e}),ui={stopAnnouncing:!0},di=e=>!oi.has(e)&&(oi.add(e),ii.delete(e),e.close?.(),!0),fi=()=>Math.floor(Date.now()/1e3),pi=e=>$r[e]??=nt(e,1e4)+2e4,mi=async(e,t)=>{let n={kind:pi(e),tags:[[Jr,e]],created_at:fi(),content:t,pubkey:Qr},r=await _t(`SHA-256`,et([0,n.pubkey,n.created_at,n.kind,n.tags,n.content]));return et([Yr,{...n,id:Xe(r),sig:Xe(await V.signAsync(r,Xr))}])},hi={},gi=e=>{e.flushWaiters.forEach(e=>e()),e.flushWaiters.clear()},_i=(e,t,n)=>{let r=hi[e.url]??={subIds:[],topics:new Map,updateTimer:null,flushWaiters:new Set,retryTimer:null,retryMs:ri,pendingEose:new Set,requestedAt:0};r.topics.set(t,n),yi(e,r)},vi=(e,t)=>{let n=hi[e.url];n&&(n.topics.delete(t),delete ai.forRelay(e)[t],n.topics.size===0?(n.retryTimer!==null&&clearTimeout(n.retryTimer),n.updateTimer!==null&&(clearTimeout(n.updateTimer),n.updateTimer=null),gi(n),n.subIds.forEach(t=>e.send(et([`CLOSE`,t]))),delete hi[e.url]):yi(e,n))},yi=(e,t)=>{t.updateTimer===null&&(t.updateTimer=setTimeout(()=>{t.updateTimer=null;try{xi(e)}finally{gi(t)}},0))},bi=e=>{let t=hi[e.url];return!t||t.updateTimer===null?Promise.resolve():new Promise(e=>t.flushWaiters.add(e))},xi=e=>{let t=hi[e.url];if(!t||t.topics.size===0)return;let n=[...t.topics.keys()],r=[],i=fi();for(let e=0;e<n.length;e+=ei)r.push(n.slice(e,e+ei));for(;t.subIds.length>r.length;){let n=t.subIds.pop();n&&e.send(et([`CLOSE`,n]))}t.pendingEose.clear(),t.requestedAt=Date.now(),r.forEach((n,r)=>{let a=t.subIds[r]??=Pe(64);t.pendingEose.add(a),e.send(et([`REQ`,a,{kinds:[...new Set(n.map(pi))],since:i,"#x":n}]))})},Si=e=>{let t=hi[e.url];if(t&&t.topics.size>0&&!e.isClosed){if(ci(e)>0){Ti(e,!0);return}t.retryTimer!==null&&(clearTimeout(t.retryTimer),t.retryTimer=null),xi(e),Ci(e)}},Ci=e=>{Object.entries(ai.forRelay(e)).forEach(([t,n])=>{wi(e,t,n,!0)})},wi=async(e,t,n,r)=>{if(oi.has(e)||e.isClosed)return r?ui:void 0;let i=ci(e);if(i>0||e.socket.readyState!==1)return r?li(Math.max(ti,i)):void 0;let a=await mi(t,r?et({...tt(n),nonce:Pe(8)}):n);if(r&&!hi[e.url]?.topics.has(t))return li(ti);if(ci(e)>0||e.isClosed||e.socket.readyState!==1)return r?li(ti):void 0;if(e.send(a),r)return li(ti)},Ti=(e,t)=>{let n=hi[e.url];if(!n||n.retryTimer!==null&&!t)return;n.retryTimer!==null&&clearTimeout(n.retryTimer);let r=t?ci(e):n.retryMs;n.retryMs=Math.min(n.retryMs*2,ti),n.retryTimer=setTimeout(()=>{n.retryTimer=null,Si(e)},Math.max(r,ri))},Ei=Gr({init:e=>$e(e,Di,qr,!0).map(t=>{let n=Kr.register(t,()=>ut(t,t=>{let[r,i,a,o]=tt(t);if(r!==Yr){let t=`${je}: relay failure from ${n.url} - `,s=r===`CLOSED`&&typeof a==`string`?a:o,c=r===`OK`&&a===!1,l=(c||r===`CLOSED`)&&s?.startsWith(`rate-limited:`),u=c&&s?.startsWith(`duplicate:`),d=s&&/^(blocked|restricted|auth-required|pow):/.test(s);if(r===`OK`&&a===!0&&ci(n)===0&&ii.delete(n),(c||r===`CLOSED`)&&d&&!di(n))return;if(l)si(n);else if(r===`EOSE`){let e=hi[n.url];e?.pendingEose.delete(i)&&e.pendingEose.size===0&&(e.retryMs=ri,e.retryTimer!==null&&(clearTimeout(e.retryTimer),e.retryTimer=null),Date.now()-e.requestedAt>=1e3&&Ci(n))}r===`CLOSED`&&!d&&Ti(n,!!l),!u&&e.relayConfig?.warnOnRelayFailure!==!1&&(r===`NOTICE`?console.warn(t+i):(c||r===`CLOSED`)&&console.warn(t+s))}else if(a&&typeof a==`object`&&`content`in a){let e=hi[n.url];if(e?.subIds.includes(i)&&a.tags){let t=a.tags.find(e=>e[0]===Jr);t?.[1]&&e.topics.get(t[1])?.(t[1],a.content)}}},()=>Si(n)));return n.ready}),subscribeTopic:(e,t,n,r)=>{let i=(e,t)=>void n(e,t);_i(e,t,i);let a=()=>{hi[e.url]?.topics.get(t)===i&&vi(e,t)};return r.kind===`root`?bi(e).then(()=>a):a},publishTopic:(e,t,n,{kind:r})=>{let i=typeof n==`string`?n:et(n);return r===`announce`&&(ai.forRelay(e)[t]=i),wi(e,t,i,r===`announce`)},unpublishTopic:(e,t)=>{delete ai.forRelay(e)[t]}});Kr.getSockets;var Di=`0x-nostr-relay.fly.dev,bendernostur.duckdns.org:8443,cdn.satellite.earth,nos.lol,nostr.chaima.info,nostr.christiansass.de,nostr.rblb.it,nostr.red5d.dev,nostr.robosats.org,nostr.stakey.net,nostrcity-club.fly.dev,relay-dev.gulugulu.moe,relay.aarpia.com,relay.agentry.com,relay.bitmacro.cloud,relay.bullishbounty.com,relay.degmods.com,relay.flashapp.me,relay.grigic.org,relay.hackshed.dev,relay.kaleidoswap.com,relay.layer.systems,relay.nostr.blockhenge.com,relay.nostr.dev.br,relay.nostrmap.net,relay.novospes.com,relay.piazza.today,relay.routstr.com,testr.nymble.world`.split(`,`).map(e=>`wss://`+e),Oi=`tyc-prototype-d076`,ki=`ABCDEFGHJKLMNPQRSTUVWXYZ`,Ai=class e{code;role;selfId=Fe;players=[];hostId=``;picks=new Map;onLobby=()=>{};onStart=()=>{};onSnap=()=>{};onOver=()=>{};onMenu=()=>{};onInput=()=>{};onHostLeft=()=>{};_room;_lobby;_start;_snap;_over;_menu;_input;_pick;constructor(e,t){this.code=e,this.role=t,this._room=Ei({appId:Oi},e),this._lobby=this._room.makeAction(`lobby`),this._start=this._room.makeAction(`start`),this._snap=this._room.makeAction(`snap`),this._over=this._room.makeAction(`over`),this._menu=this._room.makeAction(`menu`),this._input=this._room.makeAction(`input`),this._pick=this._room.makeAction(`pick`),t===`host`?(this.hostId=Fe,this.players=[Fe],this._room.onPeerJoin=e=>{this.players.length>3||(this.players.push(e),this._sendLobby())},this._room.onPeerLeave=e=>{this.players=this.players.filter(t=>t!==e),this._sendLobby()},this._input.onMessage=(e,{peerId:t})=>this.onInput(t,Mi(e)),this._pick.onMessage=(e,{peerId:t})=>{try{this.picks.set(t,JSON.parse(e))}catch{}}):(this._lobby.onMessage=(e,{peerId:t})=>{this.hostId=t,this.players=e.players,this.onLobby(e.players)},this._start.onMessage=e=>this.onStart(e),this._snap.onMessage=e=>this.onSnap(JSON.parse(e)),this._over.onMessage=e=>this.onOver(JSON.parse(e)),this._menu.onMessage=()=>this.onMenu(),this._room.onPeerLeave=e=>{e===this.hostId&&this.onHostLeft()})}static host(){let t=``;for(let e=0;e<4;e++)t+=ki[Math.floor(Math.random()*24)];return new e(t,`host`)}static join(t){return new e(t.trim().toUpperCase(),`guest`)}sendStart(e){this._start.send(e)}sendSnap(e){this._snap.send(JSON.stringify(e))}sendOver(e){this._over.send(JSON.stringify(e))}sendMenu(){this._menu.send(1)}sendInput(e){this.hostId&&this._input.send(ji(e),{target:this.hostId})}sendPick(e){this.hostId&&this._pick.send(JSON.stringify(e),{target:this.hostId})}leave(){this._room.leave()}_sendLobby(){this._lobby.send({host:Fe,players:this.players}),this.onLobby(this.players)}},ji=e=>[Math.round(e.steer*100)/100,e.throttle,e.brake,e.cardPick??-1];function Mi([e,t,n,r]){return{steer:e,throttle:t,brake:n,cardPick:r>=0?r:void 0}}var Ni=1e3,Pi=1001,Fi=1002,Ii=1003,Li=1004,Ri=1005,zi=1006,Bi=1007,Vi=1008,Hi=1009,Ui=1010,Wi=1011,Gi=1012,Ki=1013,qi=1014,Ji=1015,Yi=1016,Xi=1017,Zi=1018,Qi=1020,$i=35902,ea=35899,ta=1021,na=1022,ra=1023,ia=1026,aa=1027,oa=1028,sa=1029,ca=1030,la=1031,ua=1033,da=33776,fa=33777,pa=33778,ma=33779,ha=35840,ga=35841,_a=35842,va=35843,ya=36196,ba=37492,xa=37496,Sa=37488,Ca=37489,wa=37490,Ta=37491,Ea=37808,Da=37809,Oa=37810,ka=37811,Aa=37812,ja=37813,Ma=37814,Na=37815,Pa=37816,Fa=37817,Ia=37818,La=37819,Ra=37820,za=37821,Ba=36492,Va=36494,Ha=36495,Ua=36283,Wa=36284,Ga=36285,Ka=36286,qa=2300,Ja=2301,Ya=2302,Xa=2303,Za=2400,Qa=2401,$a=2402,eo=3200,to=`srgb`,no=`srgb-linear`,ro=`linear`,io=`srgb`,ao=7680,oo=35044,so=2e3;function co(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function lo(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function uo(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function fo(){let e=uo(`canvas`);return e.style.display=`block`,e}var po={};function mo(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function ho(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function W(...e){e=ho(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function G(...e){e=ho(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function go(...e){let t=e.join(` `);t in po||(po[t]=!0,W(...e))}function _o(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var vo={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},yo=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},bo=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),xo=Math.PI/180,So=180/Math.PI;function Co(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(bo[e&255]+bo[e>>8&255]+bo[e>>16&255]+bo[e>>24&255]+`-`+bo[t&255]+bo[t>>8&255]+`-`+bo[t>>16&15|64]+bo[t>>24&255]+`-`+bo[n&63|128]+bo[n>>8&255]+`-`+bo[n>>16&255]+bo[n>>24&255]+bo[r&255]+bo[r>>8&255]+bo[r>>16&255]+bo[r>>24&255]).toLowerCase()}function wo(e,t,n){return Math.max(t,Math.min(n,e))}function To(e,t){return(e%t+t)%t}function Eo(e,t,n){return(1-n)*e+n*t}function Do(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Oo(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var K=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=wo(this.x,e.x,t.x),this.y=wo(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=wo(this.x,e,t),this.y=wo(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(wo(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(wo(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ko=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:W(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wo(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},q=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(jo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(jo.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=wo(this.x,e.x,t.x),this.y=wo(this.y,e.y,t.y),this.z=wo(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=wo(this.x,e,t),this.y=wo(this.y,e,t),this.z=wo(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(wo(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ao.copy(this).projectOnVector(e),this.sub(Ao)}reflect(e){return this.sub(Ao.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(wo(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ao=new q,jo=new ko,J=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return go(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Mo.makeScale(e,t)),this}rotate(e){return go(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Mo.makeRotation(-e)),this}translate(e,t){return go(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Mo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Mo=new J,No=new J().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Po=new J().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Fo(){let e={enabled:!0,workingColorSpace:no,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Lo(e.r),e.g=Lo(e.g),e.b=Lo(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Ro(e.r),e.g=Ro(e.g),e.b=Ro(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?ro:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return go(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return go(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[no]:{primaries:t,whitePoint:r,transfer:ro,toXYZ:No,fromXYZ:Po,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:to},outputColorSpaceConfig:{drawingBufferColorSpace:to}},[to]:{primaries:t,whitePoint:r,transfer:io,toXYZ:No,fromXYZ:Po,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:to}}}),e}var Io=Fo();function Lo(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Ro(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var zo,Bo=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{zo===void 0&&(zo=uo(`canvas`)),zo.width=e.width,zo.height=e.height;let t=zo.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=zo}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=uo(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Lo(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Lo(t[e]/255)*255):t[e]=Lo(t[e]);return{data:t,width:e.width,height:e.height}}return W(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Vo=0,Ho=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Vo++}),this.uuid=Co(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Uo(r[t].image)):e.push(Uo(r[t]))}else e=Uo(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Uo(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Bo.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(W(`Texture: Unable to serialize Texture.`),{})}var Wo=0,Go=new q,Ko=class e extends yo{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=Pi,i=Pi,a=zi,o=Vi,s=ra,c=Hi,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wo++}),this.uuid=Co(),this.name=``,this.source=new Ho(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new J,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Go).x}get height(){return this.source.getSize(Go).y}get depth(){return this.source.getSize(Go).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){W(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?W(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ni:e.x-=Math.floor(e.x);break;case Pi:e.x=e.x<0?0:1;break;case Fi:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Ni:e.y-=Math.floor(e.y);break;case Pi:e.y=e.y<0?0:1;break;case Fi:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ko.DEFAULT_IMAGE=null,Ko.DEFAULT_MAPPING=300,Ko.DEFAULT_ANISOTROPY=1;var qo=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=wo(this.x,e.x,t.x),this.y=wo(this.y,e.y,t.y),this.z=wo(this.z,e.z,t.z),this.w=wo(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=wo(this.x,e,t),this.y=wo(this.y,e,t),this.z=wo(this.z,e,t),this.w=wo(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(wo(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Jo=class extends yo{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zi,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new qo(0,0,e,t),this.scissorTest=!1,this.viewport=new qo(0,0,e,t),this.textures=[];let r=new Ko({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:zi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ho(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Yo=class extends Jo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Xo=class extends Ko{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ii,this.minFilter=Ii,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Zo=class extends Ko{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ii,this.minFilter=Ii,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Qo=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/$o.setFromMatrixColumn(e,0).length(),i=1/$o.setFromMatrixColumn(e,1).length(),a=1/$o.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ts,e,ns)}lookAt(e,t,n){let r=this.elements;return as.subVectors(e,t),as.lengthSq()===0&&(as.z=1),as.normalize(),rs.crossVectors(n,as),rs.lengthSq()===0&&(Math.abs(n.z)===1?as.x+=1e-4:as.z+=1e-4,as.normalize(),rs.crossVectors(n,as)),rs.normalize(),is.crossVectors(as,rs),r[0]=rs.x,r[4]=is.x,r[8]=as.x,r[1]=rs.y,r[5]=is.y,r[9]=as.y,r[2]=rs.z,r[6]=is.z,r[10]=as.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],N=r[7],P=r[11],F=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*N,i[8]=a*C+o*D+s*j+c*P,i[12]=a*w+o*O+s*ee+c*F,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*N,i[9]=l*C+u*D+d*j+f*P,i[13]=l*w+u*O+d*ee+f*F,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*N,i[10]=p*C+m*D+h*j+g*P,i[14]=p*w+m*O+h*ee+g*F,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*N,i[11]=_*C+v*D+y*j+b*P,i[15]=_*w+v*O+y*ee+b*F,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=$o.set(r[0],r[1],r[2]).length(),o=$o.set(r[4],r[5],r[6]).length(),s=$o.set(r[8],r[9],r[10]).length();i<0&&(a=-a),es.copy(this);let c=1/a,l=1/o,u=1/s;return es.elements[0]*=c,es.elements[1]*=c,es.elements[2]*=c,es.elements[4]*=l,es.elements[5]*=l,es.elements[6]*=l,es.elements[8]*=u,es.elements[9]*=u,es.elements[10]*=u,t.setFromRotationMatrix(es),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=so,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=so,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},$o=new q,es=new Qo,ts=new q(0,0,0),ns=new q(1,1,1),rs=new q,is=new q,as=new q,os=new Qo,ss=new ko,cs=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(wo(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-wo(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(wo(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-wo(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(wo(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-wo(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:W(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return os.makeRotationFromQuaternion(e),this.setFromRotationMatrix(os,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ss.setFromEuler(this),this.setFromQuaternion(ss,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};cs.DEFAULT_ORDER=`XYZ`;var ls=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},us=0,ds=new q,fs=new ko,ps=new Qo,ms=new q,hs=new q,gs=new q,_s=new ko,vs=new q(1,0,0),ys=new q(0,1,0),bs=new q(0,0,1),xs={type:`added`},Ss={type:`removed`},Cs={type:`childadded`,child:null},ws={type:`childremoved`,child:null},Ts=class e extends yo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:us++}),this.uuid=Co(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new q,n=new cs,r=new ko,i=new q(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qo},normalMatrix:{value:new J}}),this.matrix=new Qo,this.matrixWorld=new Qo,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ls,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.multiply(fs),this}rotateOnWorldAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.premultiply(fs),this}rotateX(e){return this.rotateOnAxis(vs,e)}rotateY(e){return this.rotateOnAxis(ys,e)}rotateZ(e){return this.rotateOnAxis(bs,e)}translateOnAxis(e,t){return ds.copy(e).applyQuaternion(this.quaternion),this.position.add(ds.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vs,e)}translateY(e){return this.translateOnAxis(ys,e)}translateZ(e){return this.translateOnAxis(bs,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ps.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ms.copy(e):ms.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),hs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ps.lookAt(hs,ms,this.up):ps.lookAt(ms,hs,this.up),this.quaternion.setFromRotationMatrix(ps),r&&(ps.extractRotation(r.matrixWorld),fs.setFromRotationMatrix(ps),this.quaternion.premultiply(fs.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(G(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xs),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null):G(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ss),ws.child=e,this.dispatchEvent(ws),ws.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ps.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ps.multiply(e.parent.matrixWorld)),e.applyMatrix4(ps),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xs),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hs,e,gs),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hs,_s,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Ts.DEFAULT_UP=new q(0,1,0),Ts.DEFAULT_MATRIX_AUTO_UPDATE=!0,Ts.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Es=class extends Ts{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Ds={type:`move`},Os=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Es,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Es,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Es,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ds)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Es;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},ks={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},As={h:0,s:0,l:0},js={h:0,s:0,l:0};function Ms(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Y=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=to){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Io.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Io.workingColorSpace){return this.r=e,this.g=t,this.b=n,Io.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Io.workingColorSpace){if(e=To(e,1),t=wo(t,0,1),n=wo(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Ms(i,r,e+1/3),this.g=Ms(i,r,e),this.b=Ms(i,r,e-1/3)}return Io.colorSpaceToWorking(this,r),this}setStyle(e,t=to){function n(t){t!==void 0&&parseFloat(t)<1&&W(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:W(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);W(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=to){let n=ks[e.toLowerCase()];return n===void 0?W(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Lo(e.r),this.g=Lo(e.g),this.b=Lo(e.b),this}copyLinearToSRGB(e){return this.r=Ro(e.r),this.g=Ro(e.g),this.b=Ro(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=to){return Io.workingToColorSpace(Ns.copy(this),e),Math.round(wo(Ns.r*255,0,255))*65536+Math.round(wo(Ns.g*255,0,255))*256+Math.round(wo(Ns.b*255,0,255))}getHexString(e=to){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Io.workingColorSpace){Io.workingToColorSpace(Ns.copy(this),t);let n=Ns.r,r=Ns.g,i=Ns.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Io.workingColorSpace){return Io.workingToColorSpace(Ns.copy(this),t),e.r=Ns.r,e.g=Ns.g,e.b=Ns.b,e}getStyle(e=to){Io.workingToColorSpace(Ns.copy(this),e);let t=Ns.r,n=Ns.g,r=Ns.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(As),this.setHSL(As.h+e,As.s+t,As.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(As),e.getHSL(js);let n=Eo(As.h,js.h,t),r=Eo(As.s,js.s,t),i=Eo(As.l,js.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ns=new Y;Y.NAMES=ks;var Ps=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new Y(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Fs=class extends Ts{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cs,this.environmentIntensity=1,this.environmentRotation=new cs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Is=new q,Ls=new q,Rs=new q,zs=new q,Bs=new q,Vs=new q,Hs=new q,Us=new q,Ws=new q,Gs=new q,Ks=new qo,qs=new qo,Js=new qo,Ys=class e{constructor(e=new q,t=new q,n=new q){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Is.subVectors(e,t),r.cross(Is);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Is.subVectors(r,t),Ls.subVectors(n,t),Rs.subVectors(e,t);let a=Is.dot(Is),o=Is.dot(Ls),s=Is.dot(Rs),c=Ls.dot(Ls),l=Ls.dot(Rs),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,zs)!==null&&zs.x>=0&&zs.y>=0&&zs.x+zs.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,zs)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,zs.x),s.addScaledVector(a,zs.y),s.addScaledVector(o,zs.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Ks.setScalar(0),qs.setScalar(0),Js.setScalar(0),Ks.fromBufferAttribute(e,t),qs.fromBufferAttribute(e,n),Js.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ks,i.x),a.addScaledVector(qs,i.y),a.addScaledVector(Js,i.z),a}static isFrontFacing(e,t,n,r){return Is.subVectors(n,t),Ls.subVectors(e,t),Is.cross(Ls).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Is.subVectors(this.c,this.b),Ls.subVectors(this.a,this.b),Is.cross(Ls).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Bs.subVectors(r,n),Vs.subVectors(i,n),Us.subVectors(e,n);let s=Bs.dot(Us),c=Vs.dot(Us);if(s<=0&&c<=0)return t.copy(n);Ws.subVectors(e,r);let l=Bs.dot(Ws),u=Vs.dot(Ws);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Bs,a);Gs.subVectors(e,i);let f=Bs.dot(Gs),p=Vs.dot(Gs);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Vs,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Hs.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Hs,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Bs,a).addScaledVector(Vs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Xs=class{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Qs.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Qs.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Qs.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Qs):Qs.fromBufferAttribute(r,t),Qs.applyMatrix4(e.matrixWorld),this.expandByPoint(Qs);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),$s.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),$s.copy(e.boundingBox)),$s.applyMatrix4(e.matrixWorld),this.union($s)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qs),Qs.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(oc),sc.subVectors(this.max,oc),ec.subVectors(e.a,oc),tc.subVectors(e.b,oc),nc.subVectors(e.c,oc),rc.subVectors(tc,ec),ic.subVectors(nc,tc),ac.subVectors(ec,nc);let t=[0,-rc.z,rc.y,0,-ic.z,ic.y,0,-ac.z,ac.y,rc.z,0,-rc.x,ic.z,0,-ic.x,ac.z,0,-ac.x,-rc.y,rc.x,0,-ic.y,ic.x,0,-ac.y,ac.x,0];return!uc(t,ec,tc,nc,sc)||(t=[1,0,0,0,1,0,0,0,1],!uc(t,ec,tc,nc,sc))?!1:(cc.crossVectors(rc,ic),t=[cc.x,cc.y,cc.z],uc(t,ec,tc,nc,sc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qs).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qs).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Zs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zs)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Zs=[new q,new q,new q,new q,new q,new q,new q,new q],Qs=new q,$s=new Xs,ec=new q,tc=new q,nc=new q,rc=new q,ic=new q,ac=new q,oc=new q,sc=new q,cc=new q,lc=new q;function uc(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){lc.fromArray(e,a);let o=i.x*Math.abs(lc.x)+i.y*Math.abs(lc.y)+i.z*Math.abs(lc.z),s=t.dot(lc),c=n.dot(lc),l=r.dot(lc);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var dc=new q,fc=new K,pc=0,mc=class extends yo{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:pc++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=oo,this.updateRanges=[],this.gpuType=Ji,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fc.fromBufferAttribute(this,t),fc.applyMatrix3(e),this.setXY(t,fc.x,fc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)dc.fromBufferAttribute(this,t),dc.applyMatrix3(e),this.setXYZ(t,dc.x,dc.y,dc.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)dc.fromBufferAttribute(this,t),dc.applyMatrix4(e),this.setXYZ(t,dc.x,dc.y,dc.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)dc.fromBufferAttribute(this,t),dc.applyNormalMatrix(e),this.setXYZ(t,dc.x,dc.y,dc.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)dc.fromBufferAttribute(this,t),dc.transformDirection(e),this.setXYZ(t,dc.x,dc.y,dc.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Do(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Oo(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Do(t,this.array)),t}setX(e,t){return this.normalized&&(t=Oo(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Do(t,this.array)),t}setY(e,t){return this.normalized&&(t=Oo(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Do(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Oo(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Do(t,this.array)),t}setW(e,t){return this.normalized&&(t=Oo(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Oo(t,this.array),n=Oo(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Oo(t,this.array),n=Oo(n,this.array),r=Oo(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Oo(t,this.array),n=Oo(n,this.array),r=Oo(r,this.array),i=Oo(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},hc=class extends mc{constructor(e,t,n){super(new Uint16Array(e),t,n)}},gc=class extends mc{constructor(e,t,n){super(new Uint32Array(e),t,n)}},_c=class extends mc{constructor(e,t,n){super(new Float32Array(e),t,n)}},vc=new Xs,yc=new q,bc=new q,xc=class{constructor(e=new q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?vc.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;yc.subVectors(e,this.center);let t=yc.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(yc,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(bc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(yc.copy(e.center).add(bc)),this.expandByPoint(yc.copy(e.center).sub(bc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Sc=0,Cc=new Qo,wc=new Ts,Tc=new q,Ec=new Xs,Dc=new Xs,Oc=new q,kc=class e extends yo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sc++}),this.uuid=Co(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(co(e)?gc:hc)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new J().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Cc.makeRotationFromQuaternion(e),this.applyMatrix4(Cc),this}rotateX(e){return Cc.makeRotationX(e),this.applyMatrix4(Cc),this}rotateY(e){return Cc.makeRotationY(e),this.applyMatrix4(Cc),this}rotateZ(e){return Cc.makeRotationZ(e),this.applyMatrix4(Cc),this}translate(e,t,n){return Cc.makeTranslation(e,t,n),this.applyMatrix4(Cc),this}scale(e,t,n){return Cc.makeScale(e,t,n),this.applyMatrix4(Cc),this}lookAt(e){return wc.lookAt(e),wc.updateMatrix(),this.applyMatrix4(wc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Tc).negate(),this.translate(Tc.x,Tc.y,Tc.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new _c(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&W(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xs);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)G(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ec.setFromBufferAttribute(n),this.morphTargetsRelative?(Oc.addVectors(this.boundingBox.min,Ec.min),this.boundingBox.expandByPoint(Oc),Oc.addVectors(this.boundingBox.max,Ec.max),this.boundingBox.expandByPoint(Oc)):(this.boundingBox.expandByPoint(Ec.min),this.boundingBox.expandByPoint(Ec.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&G(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xc);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)G(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new q,1/0);else if(e){let n=this.boundingSphere.center;if(Ec.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Dc.setFromBufferAttribute(n),this.morphTargetsRelative?(Oc.addVectors(Ec.min,Dc.min),Ec.expandByPoint(Oc),Oc.addVectors(Ec.max,Dc.max),Ec.expandByPoint(Oc)):(Ec.expandByPoint(Dc.min),Ec.expandByPoint(Dc.max))}Ec.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Oc.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Oc));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Oc.fromBufferAttribute(a,t),o&&(Tc.fromBufferAttribute(e,t),Oc.add(Tc)),r=Math.max(r,n.distanceToSquared(Oc))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&G(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){G(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new mc(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new q,s[e]=new q;let c=new q,l=new q,u=new q,d=new K,f=new K,p=new K,m=new q,h=new q;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new q,y=new q,b=new q,x=new q;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new mc(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new q,i=new q,a=new q,o=new q,s=new q,c=new q,l=new q,u=new q;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Oc.fromBufferAttribute(e,t),Oc.normalize(),e.setXYZ(t,Oc.x,Oc.y,Oc.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new mc(a,r,i)}if(this.index===null)return W(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ac=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=oo,this.updateRanges=[],this.version=0,this.uuid=Co()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Co()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Co()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},jc=new q,Mc=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)jc.fromBufferAttribute(this,t),jc.applyMatrix4(e),this.setXYZ(t,jc.x,jc.y,jc.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jc.fromBufferAttribute(this,t),jc.applyNormalMatrix(e),this.setXYZ(t,jc.x,jc.y,jc.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jc.fromBufferAttribute(this,t),jc.transformDirection(e),this.setXYZ(t,jc.x,jc.y,jc.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Do(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Oo(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Oo(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Oo(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Oo(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Oo(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Do(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Do(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Do(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Do(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Oo(t,this.array),n=Oo(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Oo(t,this.array),n=Oo(n,this.array),r=Oo(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Oo(t,this.array),n=Oo(n,this.array),r=Oo(r,this.array),i=Oo(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){mo(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new mc(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){mo(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Nc=new q,Pc=new q,Fc=new J,Ic=class{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Nc.subVectors(n,t).cross(Pc.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Nc),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Fc.getNormalMatrix(e),r=this.coplanarPoint(Nc).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Lc=0,Rc=class extends yo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lc++}),this.uuid=Co(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Y(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ao,this.stencilZFail=ao,this.stencilZPass=ao,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){W(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?W(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Y().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Ic().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new K().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new K().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},zc=class extends Rc{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new Y(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Bc,Vc=new q,Hc=new q,Uc=new q,Wc=new K,Gc=new K,Kc=new Qo,qc=new q,Jc=new q,Yc=new q,Xc=new K,Zc=new K,Qc=new K,$c=class extends Ts{constructor(e=new zc){if(super(),this.isSprite=!0,this.type=`Sprite`,Bc===void 0){Bc=new kc;let e=new Ac(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Bc.setIndex([0,1,2,0,2,3]),Bc.setAttribute(`position`,new Mc(e,3,0,!1)),Bc.setAttribute(`uv`,new Mc(e,2,3,!1))}this.geometry=Bc,this.material=e,this.center=new K(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&G(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Hc.setFromMatrixScale(this.matrixWorld),Kc.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Uc.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Hc.multiplyScalar(-Uc.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;el(qc.set(-.5,-.5,0),Uc,a,Hc,r,i),el(Jc.set(.5,-.5,0),Uc,a,Hc,r,i),el(Yc.set(.5,.5,0),Uc,a,Hc,r,i),Xc.set(0,0),Zc.set(1,0),Qc.set(1,1);let o=e.ray.intersectTriangle(qc,Jc,Yc,!1,Vc);if(o===null&&(el(Jc.set(-.5,.5,0),Uc,a,Hc,r,i),Zc.set(0,1),o=e.ray.intersectTriangle(qc,Yc,Jc,!1,Vc),o===null))return;let s=e.ray.origin.distanceTo(Vc);s<e.near||s>e.far||t.push({distance:s,point:Vc.clone(),uv:Ys.getInterpolation(Vc,qc,Jc,Yc,Xc,Zc,Qc,new K),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function el(e,t,n,r,i,a){Wc.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Gc.copy(Wc):(Gc.x=a*Wc.x-i*Wc.y,Gc.y=i*Wc.x+a*Wc.y),e.copy(t),e.x+=Gc.x,e.y+=Gc.y,e.applyMatrix4(Kc)}var tl=new q,nl=new q,rl=new q,il=new q,al=class{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,tl)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=tl.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(tl.copy(this.origin).addScaledVector(this.direction,t),tl.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){nl.copy(e).add(t).multiplyScalar(.5),rl.copy(t).sub(e).normalize(),il.copy(this.origin).sub(nl);let i=e.distanceTo(t)*.5,a=-this.direction.dot(rl),o=il.dot(this.direction),s=-il.dot(rl),c=il.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(nl).addScaledVector(rl,d),f}intersectSphere(e,t){if(e.radius<0)return null;tl.subVectors(e.center,this.origin);let n=tl.dot(this.direction),r=tl.dot(tl)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,tl)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,ee,M;if(y>=b&&y>=x?(w=s,D=u,A=p,M=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,ee=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,ee=_)):b>=x?(w=c,D=d,A=m,M=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,ee=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,ee=v)):(w=l,D=f,A=h,M=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,ee=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,ee=g)),w===0)return null;let N=S/w,P=C/w,F=1/w,te=T-N*D,ne=E-P*D,re=O-N*A,I=k-P*A,L=j-N*M,ie=ee-P*M,ae=L*I-ie*re,oe=te*ie-ne*L,se=re*ne-I*te;if(r){if(ae<0||oe<0||se<0)return null}else if((ae<0||oe<0||se<0)&&(ae>0||oe>0||se>0))return null;let ce=ae+oe+se;if(ce===0)return null;let le=F*(ae*D+oe*A+se*M);return(ce>0?le<0:le>0)?null:this.at(le/ce,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ol=class extends Rc{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cs,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},sl=new Qo,cl=new al,ll=new xc,ul=new q,dl=new q,fl=new q,pl=new q,ml=new q,hl=new q,gl=new q,_l=new q,vl=class extends Ts{constructor(e=new kc,t=new ol){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){hl.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(ml.fromBufferAttribute(s,e),a?hl.addScaledVector(ml,r):hl.addScaledVector(ml.sub(t),r))}t.add(hl)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ll.copy(n.boundingSphere),ll.applyMatrix4(i),cl.copy(e.ray).recast(e.near),ll.containsPoint(cl.origin)===!1&&(cl.intersectSphere(ll,ul)===null||cl.origin.distanceToSquared(ul)>(e.far-e.near)**2)||(sl.copy(i).invert(),cl.copy(e.ray).applyMatrix4(sl),(n.boundingBox===null||cl.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,cl)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=bl(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=bl(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=bl(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=bl(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function yl(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;_l.copy(s),_l.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(_l);return l<n.near||l>n.far?null:{distance:l,point:_l.clone(),object:e}}function bl(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,dl),e.getVertexPosition(c,fl),e.getVertexPosition(l,pl);let u=yl(e,t,n,r,dl,fl,pl,gl);if(u){let e=new q;Ys.getBarycoord(gl,dl,fl,pl,e),i&&(u.uv=Ys.getInterpolatedAttribute(i,s,c,l,e,new K)),a&&(u.uv1=Ys.getInterpolatedAttribute(a,s,c,l,e,new K)),o&&(u.normal=Ys.getInterpolatedAttribute(o,s,c,l,e,new q),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new q,materialIndex:0};Ys.getNormal(dl,fl,pl,t.normal),u.face=t,u.barycoord=e}return u}var xl=class extends Ko{constructor(e=null,t=1,n=1,r,i,a,o,s,c=Ii,l=Ii,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Sl=new xc,Cl=new K(.5,.5),wl=new q,Tl=class{constructor(e=new Ic,t=new Ic,n=new Ic,r=new Ic,i=new Ic,a=new Ic){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=so,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Sl.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Sl.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Sl)}intersectsSprite(e){return Sl.center.set(0,0,0),Sl.radius=.7071067811865476+Cl.distanceTo(e.center),Sl.applyMatrix4(e.matrixWorld),this.intersectsSphere(Sl)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(wl.x=r.normal.x>0?e.max.x:e.min.x,wl.y=r.normal.y>0?e.max.y:e.min.y,wl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(wl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},El=class extends Ko{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Dl=class extends Ko{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ol=class extends Ko{constructor(e,t,n=qi,r,i,a,o=Ii,s=Ii,c,l=ia,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ho(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},kl=class extends Ol{constructor(e,t=qi,n=301,r,i,a=Ii,o=Ii,s,c=ia){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Al=class extends Ko{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},jl=class e extends kc{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new _c(c,3)),this.setAttribute(`normal`,new _c(l,3)),this.setAttribute(`uv`,new _c(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new q;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ml=class e extends kc{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new q,l=new K;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new _c(a,3)),this.setAttribute(`normal`,new _c(o,3)),this.setAttribute(`uv`,new _c(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Nl=class e extends kc{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new _c(u,3)),this.setAttribute(`normal`,new _c(d,3)),this.setAttribute(`uv`,new _c(f,2));function _(){let a=new q,_=new q,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new K,m=new q,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Pl=class e extends Nl{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Fl=class e extends kc{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new _c(i,3)),this.setAttribute(`normal`,new _c(i.slice(),3)),this.setAttribute(`uv`,new _c(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new q,r=new q,i=new q;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new q;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new q;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new q,t=new q,n=new q,r=new q,o=new K,s=new K,c=new K;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Il=class e extends Fl{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ll=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){W(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new K:new q);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new q,r=[],i=[],a=[],o=new q,s=new Qo;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new q)}i[0]=new q,a[0]=new q;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(wo(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(wo(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Rl=class extends Ll{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new K){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},zl=class extends Rl{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Bl(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Vl=new q,Hl=new q,Ul=new Bl,Wl=new Bl,Gl=new Bl,Kl=class extends Ll{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new q){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Hl.subVectors(r[0],r[1]).add(r[0]),c=Hl);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Vl.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Vl),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Ul.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Wl.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Gl.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Ul.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Wl.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Gl.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Ul.calc(s),Wl.calc(s),Gl.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new q().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ql(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Jl(e,t){let n=1-e;return n*n*t}function Yl(e,t){return 2*(1-e)*e*t}function Xl(e,t){return e*e*t}function Zl(e,t,n,r){return Jl(e,t)+Yl(e,n)+Xl(e,r)}function Ql(e,t){let n=1-e;return n*n*n*t}function $l(e,t){let n=1-e;return 3*n*n*e*t}function eu(e,t){return 3*(1-e)*e*e*t}function tu(e,t){return e*e*e*t}function nu(e,t,n,r,i){return Ql(e,t)+$l(e,n)+eu(e,r)+tu(e,i)}var ru=class extends Ll{constructor(e=new K,t=new K,n=new K,r=new K){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(nu(e,r.x,i.x,a.x,o.x),nu(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},iu=class extends Ll{constructor(e=new q,t=new q,n=new q,r=new q){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new q){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(nu(e,r.x,i.x,a.x,o.x),nu(e,r.y,i.y,a.y,o.y),nu(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},au=class extends Ll{constructor(e=new K,t=new K){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new K){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ou=class extends Ll{constructor(e=new q,t=new q){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new q){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new q){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},su=class extends Ll{constructor(e=new K,t=new K,n=new K){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Zl(e,r.x,i.x,a.x),Zl(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},cu=class extends Ll{constructor(e=new q,t=new q,n=new q){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new q){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Zl(e,r.x,i.x,a.x),Zl(e,r.y,i.y,a.y),Zl(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},lu=class extends Ll{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new K){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(ql(o,s.x,c.x,l.x,u.x),ql(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new K().fromArray(n))}return this}},uu=Object.freeze({__proto__:null,ArcCurve:zl,CatmullRomCurve3:Kl,CubicBezierCurve:ru,CubicBezierCurve3:iu,EllipseCurve:Rl,LineCurve:au,LineCurve3:ou,QuadraticBezierCurve:su,QuadraticBezierCurve3:cu,SplineCurve:lu}),du=class extends Ll{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new uu[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new uu[n.type]().fromJSON(n))}return this}},fu=class extends du{constructor(e){super(),this.type=`Path`,this.currentPoint=new K,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new au(this.currentPoint.clone(),new K(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new su(this.currentPoint.clone(),new K(e,t),new K(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new ru(this.currentPoint.clone(),new K(e,t),new K(n,r),new K(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new lu([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Rl(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},pu=class extends fu{constructor(e){super(e),this.uuid=Co(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new fu().fromJSON(n))}return this}};function mu(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=hu(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=Su(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return _u(a,o,n,s,c,l,0),o}function hu(e,t,n,r,i){let a;if(i===Ku(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=Uu(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=Uu(i/r|0,e[i],e[i+1],a);return a&&Fu(a,a.next)&&(Wu(a),a=a.next),a}function gu(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Fu(n,n.next)||Pu(n.prev,n,n.next)===0)){if(Wu(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function _u(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Du(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?yu(e,r,i,a):vu(e))t.push(c.i,e.i,l.i),Wu(e),e=l.next,s=l.next;else if(e=l,e===s){o?o===1?(e=bu(gu(e),t),_u(e,t,n,r,i,a,2)):o===2&&xu(e,t,n,r,i,a):_u(gu(e),t,n,r,i,a,1);break}}}function vu(e){let t=e.prev,n=e,r=e.next;if(Pu(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Mu(i,s,a,c,o,l,m.x,m.y)&&Pu(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function yu(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Pu(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=ku(p,m,t,n,r),v=ku(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Mu(s,u,c,d,l,f,y.x,y.y)&&Pu(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Mu(s,u,c,d,l,f,b.x,b.y)&&Pu(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Mu(s,u,c,d,l,f,y.x,y.y)&&Pu(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Mu(s,u,c,d,l,f,b.x,b.y)&&Pu(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function bu(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Fu(r,i)&&Iu(r,n,n.next,i)&&Bu(r,i)&&Bu(i,r)&&(t.push(r.i,n.i,i.i),Wu(n),Wu(n.next),n=e=i),n=n.next}while(n!==e);return gu(n)}function xu(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Nu(o,e)){let s=Hu(o,e);o=gu(o,o.next),s=gu(s,s.next),_u(o,t,n,r,i,a,0),_u(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function Su(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=hu(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(Au(o))}i.sort(Cu);for(let e=0;e<i.length;e++)n=wu(i[e],n);return n}function Cu(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function wu(e,t){let n=Tu(e,t);if(!n)return t;let r=Hu(n,e);return gu(r,r.next),gu(n,n.next)}function Tu(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Fu(e,n))return n;do{if(Fu(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&ju(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Bu(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&Eu(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function Eu(e,t){return Pu(e.prev,e,t.prev)<0&&Pu(t.next,e,e.next)<0}function Du(e,t,n,r){let i=e;do i.z===0&&(i.z=ku(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,Ou(i)}function Ou(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function ku(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Au(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function ju(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Mu(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&ju(e,t,n,r,i,a,o,s)}function Nu(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!zu(e,t)&&(Bu(e,t)&&Bu(t,e)&&Vu(e,t)&&(Pu(e.prev,e,t.prev)||Pu(e,t.prev,t))||Fu(e,t)&&Pu(e.prev,e,e.next)>0&&Pu(t.prev,t,t.next)>0)}function Pu(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Fu(e,t){return e.x===t.x&&e.y===t.y}function Iu(e,t,n,r){let i=Ru(Pu(e,t,n)),a=Ru(Pu(e,t,r)),o=Ru(Pu(n,r,e)),s=Ru(Pu(n,r,t));return!!(i!==a&&o!==s||i===0&&Lu(e,n,t)||a===0&&Lu(e,r,t)||o===0&&Lu(n,e,r)||s===0&&Lu(n,t,r))}function Lu(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Ru(e){return e>0?1:e<0?-1:0}function zu(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&Iu(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Bu(e,t){return Pu(e.prev,e,e.next)<0?Pu(e,t,e.next)>=0&&Pu(e,e.prev,t)>=0:Pu(e,t,e.prev)<0||Pu(e,e.next,t)<0}function Vu(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Hu(e,t){let n=Gu(e.i,e.x,e.y),r=Gu(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Uu(e,t,n,r){let i=Gu(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Wu(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Gu(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ku(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var qu=class{static triangulate(e,t,n=2){return mu(e,t,n)}},Ju=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Yu(e),Xu(n,e);let a=e.length;t.forEach(Yu);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,Xu(n,t[e]);let o=qu.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Yu(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Xu(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var Zu=class e extends kc{constructor(e=new pu([new K(.5,.5),new K(-.5,.5),new K(-.5,-.5),new K(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new _c(r,3)),this.setAttribute(`uv`,new _c(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?Qu:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new q,b=new q,x=new q}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!Ju.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];Ju.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));s<=10000000000000001e-36*c*c?(e.splice(r,1),n--):t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||G(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new K(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new K(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let ee=[],M,N=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];M=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),M[e]=A(t[e],t[r],t[i]);ee.push(M),N=N.concat(M)}let P;if(p===0)P=Ju.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);L(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];M=ee[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],M[e],a);L(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}P=Ju.triangulateShape(e,t)}let F=P.length,te=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],N[e],te):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),L(x.x,x.y,x.z)):L(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],N[t],te):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),L(x.x,x.y,x.z)):L(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);L(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];M=ee[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],M[e],r);_?L(i.x,i.y+g[s-1].y,g[s-1].x+n):L(i.x,i.y,c+n)}}}ne(),re();function ne(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<F;e++){let n=P[e];ie(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<F;e++){let n=P[e];ie(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<F;e++){let t=P[e];ie(t[2],t[1],t[0])}for(let e=0;e<F;e++){let t=P[e];ie(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function re(){let e=r.length/3,t=0;I(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];I(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function I(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);ae(t+r+n,t+i+n,t+i+a,t+r+a)}}}function L(e,t,n){a.push(e),a.push(t),a.push(n)}function ie(e,t,i){oe(e),oe(t),oe(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);se(o[0]),se(o[1]),se(o[2])}function ae(e,t,i,a){oe(e),oe(t),oe(a),oe(t),oe(i),oe(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);se(s[0]),se(s[1]),se(s[3]),se(s[1]),se(s[2]),se(s[3])}function oe(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function se(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return $u(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new uu[i.type]().fromJSON(i)),new e(r,t.options)}},Qu={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new K(a,o),new K(s,c),new K(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new K(o,1-c),new K(l,1-d),new K(f,1-m),new K(h,1-_)]:[new K(s,1-c),new K(u,1-d),new K(p,1-m),new K(g,1-_)]}};function $u(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var ed=class e extends Fl{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},td=class e extends Fl{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},nd=class e extends kc{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new _c(p,3)),this.setAttribute(`normal`,new _c(m,3)),this.setAttribute(`uv`,new _c(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},rd=class e extends kc{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new q,d=new q,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new _c(p,3)),this.setAttribute(`normal`,new _c(m,3)),this.setAttribute(`uv`,new _c(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function id(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(od(i))i.isRenderTargetTexture?(W(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(od(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function ad(e){let t={};for(let n=0;n<e.length;n++){let r=id(e[n]);for(let e in r)t[e]=r[e]}return t}function od(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function sd(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function cd(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Io.workingColorSpace}var ld={clone:id,merge:ad},ud=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,dd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,fd=class extends Rc{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ud,this.fragmentShader=dd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=id(e.uniforms),this.uniformsGroups=sd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Y().setHex(r.value);break;case`v2`:this.uniforms[n].value=new K().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new q().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new qo().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new J().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Qo().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},pd=class extends fd{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},md=class extends Rc{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cs,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},hd=class extends Rc{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=eo,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},gd=class extends Rc{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function _d(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function vd(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var yd=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},bd=class extends yd{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Za,endingEnd:Za}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Qa:i=e,o=2*t-n;break;case $a:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Qa:a=e,s=2*n-t;break;case $a:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},xd=class extends yd{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Sd=class extends yd{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Cd=class extends yd{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Ed(n,t,g,y,r);i[p]=wd(x,o,_,b,m)}return i}};function wd(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Td(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Ed(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=wd(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Td(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Dd=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=_d(t,this.TimeBufferType),this.values=_d(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:_d(e.times,Array),values:_d(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),vd(e.settings)&&(n.settings={inTangents:_d(e.settings.inTangents,Array),outTangents:_d(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Sd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new xd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new bd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Cd(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case qa:t=this.InterpolantFactoryMethodDiscrete;break;case Ja:t=this.InterpolantFactoryMethodLinear;break;case Ya:t=this.InterpolantFactoryMethodSmooth;break;case Xa:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return W(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return qa;case this.InterpolantFactoryMethodLinear:return Ja;case this.InterpolantFactoryMethodSmooth:return Ya;case this.InterpolantFactoryMethodBezier:return Xa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;vd(this.settings)&&(Od(this.settings.inTangents,e),Od(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(G(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(G(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){G(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){G(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&lo(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){G(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ya,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,vd(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Od(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Dd.prototype.ValueTypeName=``,Dd.prototype.TimeBufferType=Float32Array,Dd.prototype.ValueBufferType=Float32Array,Dd.prototype.DefaultInterpolation=Ja;var kd=class extends Dd{constructor(e,t,n){super(e,t,n)}};kd.prototype.ValueTypeName=`bool`,kd.prototype.ValueBufferType=Array,kd.prototype.DefaultInterpolation=qa,kd.prototype.InterpolantFactoryMethodLinear=void 0,kd.prototype.InterpolantFactoryMethodSmooth=void 0;var Ad=class extends Dd{constructor(e,t,n,r){super(e,t,n,r)}};Ad.prototype.ValueTypeName=`color`;var jd=class extends Dd{constructor(e,t,n,r){super(e,t,n,r)}};jd.prototype.ValueTypeName=`number`;var Md=class extends yd{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)ko.slerpFlat(i,0,a,c-o,a,c,s);return i}},Nd=class extends Dd{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Md(this.times,this.values,this.getValueSize(),e)}};Nd.prototype.ValueTypeName=`quaternion`,Nd.prototype.InterpolantFactoryMethodSmooth=void 0;var Pd=class extends Dd{constructor(e,t,n){super(e,t,n)}};Pd.prototype.ValueTypeName=`string`,Pd.prototype.ValueBufferType=Array,Pd.prototype.DefaultInterpolation=qa,Pd.prototype.InterpolantFactoryMethodLinear=void 0,Pd.prototype.InterpolantFactoryMethodSmooth=void 0;var Fd=class extends Dd{constructor(e,t,n,r){super(e,t,n,r)}};Fd.prototype.ValueTypeName=`vector`;var Id=class extends Ts{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Y(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ld=class extends Id{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Ts.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Y(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Rd=new Qo,zd=new q,Bd=new q,Vd=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new K(512,512),this.mapType=Hi,this.map=null,this.mapPass=null,this.matrix=new Qo,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Tl,this._frameExtents=new K(1,1),this._viewportCount=1,this._viewports=[new qo(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;zd.setFromMatrixPosition(e.matrixWorld),t.position.copy(zd),Bd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Bd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Rd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Rd,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Rd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Hd=new q,Ud=new ko,Wd=new q,Gd=class extends Ts{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Qo,this.projectionMatrix=new Qo,this.projectionMatrixInverse=new Qo,this.coordinateSystem=so,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Hd,Ud,Wd),Wd.x===1&&Wd.y===1&&Wd.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hd,Ud,Wd.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Hd,Ud,Wd),Wd.x===1&&Wd.y===1&&Wd.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hd,Ud,Wd.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Kd=new q,qd=new K,Jd=new K,Yd=class extends Gd{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=So*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(xo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return So*2*Math.atan(Math.tan(xo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Kd.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Kd.x,Kd.y).multiplyScalar(-e/Kd.z),Kd.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Kd.x,Kd.y).multiplyScalar(-e/Kd.z)}getViewSize(e,t){return this.getViewBounds(e,qd,Jd),t.subVectors(Jd,qd)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(xo*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Xd=class extends Gd{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Zd=class extends Vd{constructor(){super(new Xd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Qd=class extends Id{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Ts.DEFAULT_UP),this.updateMatrix(),this.target=new Ts,this.shadow=new Zd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},$d=-90,ef=1,tf=class extends Ts{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Yd($d,ef,e,t);r.layers=this.layers,this.add(r);let i=new Yd($d,ef,e,t);i.layers=this.layers,this.add(i);let a=new Yd($d,ef,e,t);a.layers=this.layers,this.add(a);let o=new Yd($d,ef,e,t);o.layers=this.layers,this.add(o);let s=new Yd($d,ef,e,t);s.layers=this.layers,this.add(s);let c=new Yd($d,ef,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},nf=class extends Yd{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},rf=`\\[\\]\\.:\\/`,af=RegExp(`[\\[\\]\\.:\\/]`,`g`),of=`[^\\[\\]\\.:\\/]`,sf=`[^`+rf.replace(`\\.`,``)+`]`,cf=`((?:WC+[\\/:])*)`.replace(`WC`,of),lf=`(WCOD+)?`.replace(`WCOD`,sf),uf=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,of),df=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,of),ff=RegExp(`^`+cf+lf+uf+df+`$`),pf=[`material`,`materials`,`bones`,`map`],mf=class{constructor(e,t,n){let r=n||hf.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},hf=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(af,``)}static parseTrackName(e){let t=ff.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);pf.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){W(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){G(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){G(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){G(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){G(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){G(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){G(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){G(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;G(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){G(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){G(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};hf.Composite=mf,hf.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},hf.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},hf.prototype.GetterByBindingType=[hf.prototype._getValue_direct,hf.prototype._getValue_array,hf.prototype._getValue_arrayElement,hf.prototype._getValue_toArray],hf.prototype.SetterByBindingTypeAndVersioning=[[hf.prototype._setValue_direct,hf.prototype._setValue_direct_setNeedsUpdate,hf.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[hf.prototype._setValue_array,hf.prototype._setValue_array_setNeedsUpdate,hf.prototype._setValue_array_setMatrixWorldNeedsUpdate],[hf.prototype._setValue_arrayElement,hf.prototype._setValue_arrayElement_setNeedsUpdate,hf.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[hf.prototype._setValue_fromArray,hf.prototype._setValue_fromArray_setNeedsUpdate,hf.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function gf(e,t,n,r){let i=_f(r);switch(n){case ta:return e*t;case oa:return e*t/i.components*i.byteLength;case sa:return e*t/i.components*i.byteLength;case ca:return e*t*2/i.components*i.byteLength;case la:return e*t*2/i.components*i.byteLength;case na:return e*t*3/i.components*i.byteLength;case ra:return e*t*4/i.components*i.byteLength;case ua:return e*t*4/i.components*i.byteLength;case da:case fa:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case pa:case ma:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ga:case va:return Math.max(e,16)*Math.max(t,8)/4;case ha:case _a:return Math.max(e,8)*Math.max(t,8)/2;case ya:case ba:case Sa:case Ca:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case xa:case wa:case Ta:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ea:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Da:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Oa:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ka:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Aa:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ja:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Ma:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Na:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Pa:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Ia:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case La:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ra:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case za:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ba:case Va:case Ha:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ua:case Wa:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ga:case Ka:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function _f(e){switch(e){case Hi:case Ui:return{byteLength:1,components:1};case Gi:case Wi:case Yi:return{byteLength:2,components:1};case Xi:case Zi:return{byteLength:2,components:4};case qi:case Ki:case Ji:return{byteLength:4,components:1};case $i:case ea:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?W(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function vf(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function yf(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var X={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Z={common:{diffuse:{value:new Y(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new J},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new J}},envmap:{envMap:{value:null},envMapRotation:{value:new J},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new J}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new J}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new J},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new J},normalScale:{value:new K(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new J},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new J}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new J}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new J}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Y(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new q},probesMax:{value:new q},probesResolution:{value:new q}},points:{diffuse:{value:new Y(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0},uvTransform:{value:new J}},sprite:{diffuse:{value:new Y(16777215)},opacity:{value:1},center:{value:new K(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new J},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0}}},bf={basic:{uniforms:ad([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:X.meshbasic_vert,fragmentShader:X.meshbasic_frag},lambert:{uniforms:ad([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},envMapIntensity:{value:1}}]),vertexShader:X.meshlambert_vert,fragmentShader:X.meshlambert_frag},phong:{uniforms:ad([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},specular:{value:new Y(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:X.meshphong_vert,fragmentShader:X.meshphong_frag},standard:{uniforms:ad([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag},toon:{uniforms:ad([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new Y(0)}}]),vertexShader:X.meshtoon_vert,fragmentShader:X.meshtoon_frag},matcap:{uniforms:ad([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:X.meshmatcap_vert,fragmentShader:X.meshmatcap_frag},points:{uniforms:ad([Z.points,Z.fog]),vertexShader:X.points_vert,fragmentShader:X.points_frag},dashed:{uniforms:ad([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:X.linedashed_vert,fragmentShader:X.linedashed_frag},depth:{uniforms:ad([Z.common,Z.displacementmap]),vertexShader:X.depth_vert,fragmentShader:X.depth_frag},normal:{uniforms:ad([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:X.meshnormal_vert,fragmentShader:X.meshnormal_frag},sprite:{uniforms:ad([Z.sprite,Z.fog]),vertexShader:X.sprite_vert,fragmentShader:X.sprite_frag},background:{uniforms:{uvTransform:{value:new J},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:X.background_vert,fragmentShader:X.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new J}},vertexShader:X.backgroundCube_vert,fragmentShader:X.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:X.cube_vert,fragmentShader:X.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:X.equirect_vert,fragmentShader:X.equirect_frag},distance:{uniforms:ad([Z.common,Z.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:X.distance_vert,fragmentShader:X.distance_frag},shadow:{uniforms:ad([Z.lights,Z.fog,{color:{value:new Y(0)},opacity:{value:1}}]),vertexShader:X.shadow_vert,fragmentShader:X.shadow_frag}};bf.physical={uniforms:ad([bf.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new J},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new J},clearcoatNormalScale:{value:new K(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new J},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new J},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new J},sheen:{value:0},sheenColor:{value:new Y(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new J},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new J},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new J},transmissionSamplerSize:{value:new K},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new J},attenuationDistance:{value:0},attenuationColor:{value:new Y(0)},specularColor:{value:new Y(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new J},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new J},anisotropyVector:{value:new K},anisotropyMap:{value:null},anisotropyMapTransform:{value:new J}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag};var xf={r:0,b:0,g:0},Sf=new Qo,Cf=new J;Cf.set(-1,0,0,0,1,0,0,0,1);function wf(e,t,n,r,i,a){let o=new Y(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new vl(new jl(1,1,1),new fd({name:`BackgroundCubeMaterial`,uniforms:id(bf.backgroundCube.uniforms),vertexShader:bf.backgroundCube.vertexShader,fragmentShader:bf.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Sf.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Cf),l.material.toneMapped=Io.getTransfer(i.colorSpace)!==io,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new vl(new nd(2,2),new fd({name:`BackgroundMaterial`,uniforms:id(bf.background.uniforms),vertexShader:bf.background.vertexShader,fragmentShader:bf.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Io.getTransfer(i.colorSpace)!==io,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(xf,cd(e)),n.buffers.color.setClear(xf.r,xf.g,xf.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Tf(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Ef(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Df(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(W(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&W(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Of(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Ic,s=new J,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var kf=4,Af=6,jf=20,Mf=256,Nf=new Xd,Pf=new Y,Ff=null,If=0,Lf=0,Rf=!1,zf=new q,Bf=new q,Vf=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=zf}=i;Ff=this._renderer.getRenderTarget(),If=this._renderer.getActiveCubeFace(),Lf=this._renderer.getActiveMipmapLevel(),Rf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ff,If,Lf),this._renderer.xr.enabled=Rf,e.scissorTest=!1,Wf(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ff=this._renderer.getRenderTarget(),If=this._renderer.getActiveCubeFace(),Lf=this._renderer.getActiveMipmapLevel(),Rf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:zi,minFilter:zi,generateMipmaps:!1,type:Yi,format:ra,colorSpace:no,depthBuffer:!1},r=Uf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uf(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Hf(r)),this._blurMaterial=Kf(r,e,t),this._ggxMaterial=Gf(r,e,t)}return r}_compileMaterial(e){let t=new vl(new kc,e);this._renderer.compile(t,Nf)}_sceneToCubeUV(e,t,n,r,i){let a=new Yd(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Pf),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new vl(new jl,new ol({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Pf),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Wf(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qf());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Wf(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Nf)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-kf?n-d+kf:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Wf(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Nf),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Wf(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Nf)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Wf(t,3*l*(r>this._lodMax-kf?r-this._lodMax+kf:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Nf)}};function Hf(e){let t=[],n=[],r=e,i=e-kf+1+Af;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Bf.set(1,r,n):e===1?Bf.set(-n,1,-r):e===2?Bf.set(-n,r,1):e===3?Bf.set(-1,r,-n):e===4?Bf.set(-n,-1,r):Bf.set(n,r,-1),Bf.toArray(l,(e*6+t)*3)}}let u=new kc;u.setAttribute(`position`,new mc(c,3)),u.setAttribute(`outputDirection`,new mc(l,3)),n.push(new vl(u,null)),r>kf&&r--}return{lodMeshes:n,sizeLods:t}}function Uf(e,t,n){let r=new Yo(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Wf(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Gf(e,t,n){return new fd({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Mf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Yf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Kf(e,t,n){return new fd({name:`SphericalGaussianBlur`,defines:{SAMPLES:jf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Yf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function qf(){return new fd({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Yf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Jf(){return new fd({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Yf(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Xf=class extends Yo{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new El(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new jl(5,5,5),i=new fd({name:`CubemapFromEquirect`,uniforms:id(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new vl(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=zi),new tf(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Zf(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Xf(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Vf(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Vf(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Qf(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&go(`WebGLRenderer: `+e+` extension not supported.`),t}}}function $f(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?gc:hc)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function ep(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function tp(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:G(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function np(e,t,n){let r=new WeakMap,i=new qo;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Xo(h,p,m,u);g.type=Ji,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new K(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function rp(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var ip={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function ap(e,t,n,r,i,a){let o=new Yo(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new kc;l.setAttribute(`position`,new _c([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new _c([0,2,0,0,2,0],2));let u=new pd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new vl(l,u),f=new Xd(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Yo(t,n,{type:Yi,depthBuffer:!1,stencilBuffer:!1}),c=new Yo(t,n,{type:Yi,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Io.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=ip[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var op=new Ko,sp=new Ol(1,1),cp=new Xo,lp=new Zo,up=new El,dp=[],fp=[],pp=new Float32Array(16),mp=new Float32Array(9),hp=new Float32Array(4);function gp(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=dp[i];if(a===void 0&&(a=new Float32Array(i),dp[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function _p(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function vp(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function yp(e,t){let n=fp[t];n===void 0&&(n=new Int32Array(t),fp[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function bp(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function xp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(_p(n,t))return;e.uniform2fv(this.addr,t),vp(n,t)}}function Sp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(_p(n,t))return;e.uniform3fv(this.addr,t),vp(n,t)}}function Cp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(_p(n,t))return;e.uniform4fv(this.addr,t),vp(n,t)}}function wp(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(_p(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),vp(n,t)}else{if(_p(n,r))return;hp.set(r),e.uniformMatrix2fv(this.addr,!1,hp),vp(n,r)}}function Tp(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(_p(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),vp(n,t)}else{if(_p(n,r))return;mp.set(r),e.uniformMatrix3fv(this.addr,!1,mp),vp(n,r)}}function Ep(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(_p(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),vp(n,t)}else{if(_p(n,r))return;pp.set(r),e.uniformMatrix4fv(this.addr,!1,pp),vp(n,r)}}function Dp(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Op(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(_p(n,t))return;e.uniform2iv(this.addr,t),vp(n,t)}}function kp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(_p(n,t))return;e.uniform3iv(this.addr,t),vp(n,t)}}function Ap(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(_p(n,t))return;e.uniform4iv(this.addr,t),vp(n,t)}}function jp(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Mp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(_p(n,t))return;e.uniform2uiv(this.addr,t),vp(n,t)}}function Np(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(_p(n,t))return;e.uniform3uiv(this.addr,t),vp(n,t)}}function Pp(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(_p(n,t))return;e.uniform4uiv(this.addr,t),vp(n,t)}}function Fp(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(sp.compareFunction=n.isReversedDepthBuffer()?518:515,a=sp):a=op,n.setTexture2D(t||a,i)}function Ip(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||lp,i)}function Lp(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||up,i)}function Rp(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||cp,i)}function zp(e){switch(e){case 5126:return bp;case 35664:return xp;case 35665:return Sp;case 35666:return Cp;case 35674:return wp;case 35675:return Tp;case 35676:return Ep;case 5124:case 35670:return Dp;case 35667:case 35671:return Op;case 35668:case 35672:return kp;case 35669:case 35673:return Ap;case 5125:return jp;case 36294:return Mp;case 36295:return Np;case 36296:return Pp;case 35678:case 36198:case 36298:case 36306:case 35682:return Fp;case 35679:case 36299:case 36307:return Ip;case 35680:case 36300:case 36308:case 36293:return Lp;case 36289:case 36303:case 36311:case 36292:return Rp}}function Bp(e,t){e.uniform1fv(this.addr,t)}function Vp(e,t){let n=gp(t,this.size,2);e.uniform2fv(this.addr,n)}function Hp(e,t){let n=gp(t,this.size,3);e.uniform3fv(this.addr,n)}function Up(e,t){let n=gp(t,this.size,4);e.uniform4fv(this.addr,n)}function Wp(e,t){let n=gp(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Gp(e,t){let n=gp(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Kp(e,t){let n=gp(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function qp(e,t){e.uniform1iv(this.addr,t)}function Jp(e,t){e.uniform2iv(this.addr,t)}function Yp(e,t){e.uniform3iv(this.addr,t)}function Xp(e,t){e.uniform4iv(this.addr,t)}function Zp(e,t){e.uniform1uiv(this.addr,t)}function Qp(e,t){e.uniform2uiv(this.addr,t)}function $p(e,t){e.uniform3uiv(this.addr,t)}function em(e,t){e.uniform4uiv(this.addr,t)}function tm(e,t,n){let r=this.cache,i=t.length,a=yp(n,i);_p(r,a)||(e.uniform1iv(this.addr,a),vp(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?sp:op;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function nm(e,t,n){let r=this.cache,i=t.length,a=yp(n,i);_p(r,a)||(e.uniform1iv(this.addr,a),vp(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||lp,a[e])}function rm(e,t,n){let r=this.cache,i=t.length,a=yp(n,i);_p(r,a)||(e.uniform1iv(this.addr,a),vp(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||up,a[e])}function im(e,t,n){let r=this.cache,i=t.length,a=yp(n,i);_p(r,a)||(e.uniform1iv(this.addr,a),vp(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||cp,a[e])}function am(e){switch(e){case 5126:return Bp;case 35664:return Vp;case 35665:return Hp;case 35666:return Up;case 35674:return Wp;case 35675:return Gp;case 35676:return Kp;case 5124:case 35670:return qp;case 35667:case 35671:return Jp;case 35668:case 35672:return Yp;case 35669:case 35673:return Xp;case 5125:return Zp;case 36294:return Qp;case 36295:return $p;case 36296:return em;case 35678:case 36198:case 36298:case 36306:case 35682:return tm;case 35679:case 36299:case 36307:return nm;case 35680:case 36300:case 36308:case 36293:return rm;case 36289:case 36303:case 36311:case 36292:return im}}var om=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=zp(t.type)}},sm=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=am(t.type)}},cm=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},lm=/(\w+)(\])?(\[|\.)?/g;function um(e,t){e.seq.push(t),e.map[t.id]=t}function dm(e,t,n){let r=e.name,i=r.length;for(lm.lastIndex=0;;){let a=lm.exec(r),o=lm.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){um(n,l===void 0?new om(s,e,t):new sm(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new cm(s),um(n,e)),n=e}}}var fm=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);dm(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function pm(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var mm=37297,hm=0;function gm(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var _m=new J;function vm(e){Io._getMatrix(_m,Io.workingColorSpace,e);let t=`mat3( ${_m.elements.map(e=>e.toFixed(4))} )`;switch(Io.getTransfer(e)){case ro:return[t,`LinearTransferOETF`];case io:return[t,`sRGBTransferOETF`];default:return W(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function ym(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+gm(e.getShaderSource(t),r)}return i}function bm(e,t){let n=vm(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var xm={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Sm(e,t){let n=xm[t];return n===void 0?(W(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Cm=new q;function wm(){return Io.getLuminanceCoefficients(Cm),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Cm.x.toFixed(4)}, ${Cm.y.toFixed(4)}, ${Cm.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Tm(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Om).join(`
`)}function Em(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Dm(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Om(e){return e!==``}function km(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Am(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var jm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mm(e){return e.replace(jm,Pm)}var Nm=new Map;function Pm(e,t){let n=X[t];if(n===void 0){let e=Nm.get(t);if(e!==void 0)n=X[e],W(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Mm(n)}var Fm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Im(e){return e.replace(Fm,Lm)}function Lm(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Rm(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var zm={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Bm(e){return zm[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Vm={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Hm(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Vm[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Um={302:`ENVMAP_MODE_REFRACTION`};function Wm(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Um[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Gm={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Km(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Gm[e.combine]||`ENVMAP_BLENDING_NONE`}function qm(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Jm(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Bm(n),l=Hm(n),u=Wm(n),d=Km(n),f=qm(n),p=Tm(n),m=Em(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Om).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Om).join(`
`),_.length>0&&(_+=`
`)):(g=[Rm(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Om).join(`
`),_=[Rm(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:X.tonemapping_pars_fragment,n.toneMapping===0?``:Sm(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,X.colorspace_pars_fragment,bm(`linearToOutputTexel`,n.outputColorSpace),wm(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Om).join(`
`)),o=Mm(o),o=km(o,n),o=Am(o,n),s=Mm(s),s=km(s,n),s=Am(s,n),o=Im(o),s=Im(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=pm(i,i.VERTEX_SHADER,y),S=pm(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=ym(i,x,`vertex`),n=ym(i,S,`fragment`);G(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):W(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new fm(i,h),T=Dm(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,mm)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=hm++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Ym=0,Xm=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Zm(e),t.set(e,n)),n}},Zm=class{constructor(e){this.id=Ym++,this.code=e,this.usedTimes=0}};function Qm(e){return e===1030||e===37490||e===36285}function $m(e,t,n,r,i,a){let o=new ls,s=new Xm,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&W(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=bf[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),ee=e.state.buffers.depth.getReversed(),M=h.isInstancedMesh===!0,N=h.isBatchedMesh===!0,P=!!i.map,F=!!i.matcap,te=!!x,ne=!!i.aoMap,re=!!i.lightMap,I=!!i.bumpMap&&i.wireframe===!1,L=!!i.normalMap,ie=!!i.displacementMap,ae=!!i.emissiveMap,oe=!!i.metalnessMap,se=!!i.roughnessMap,ce=i.anisotropy>0,le=i.clearcoat>0,ue=i.dispersion>0,de=i.retroreflectivity>0,fe=i.iridescence>0,pe=i.sheen>0,me=i.transmission>0,he=ce&&!!i.anisotropyMap,ge=le&&!!i.clearcoatMap,_e=le&&!!i.clearcoatNormalMap,ve=le&&!!i.clearcoatRoughnessMap,ye=fe&&!!i.iridescenceMap,R=fe&&!!i.iridescenceThicknessMap,be=pe&&!!i.sheenColorMap,xe=pe&&!!i.sheenRoughnessMap,Se=!!i.specularMap,z=!!i.specularColorMap,Ce=!!i.specularIntensityMap,B=me&&!!i.transmissionMap,V=me&&!!i.thicknessMap,we=!!i.gradientMap,Te=!!i.alphaMap,Ee=i.alphaTest>0,De=!!i.alphaHash,Oe=!!i.extensions,ke=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(ke=e.toneMapping);let Ae={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:N,batchingColor:N&&h._colorsTexture!==null,instancing:M,instancingColor:M&&h.instanceColor!==null,instancingMorph:M&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Io.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:P,matcap:F,envMap:te,envMapMode:te&&x.mapping,envMapCubeUVHeight:S,aoMap:ne,lightMap:re,bumpMap:I,normalMap:L,displacementMap:ie,emissiveMap:ae,normalMapObjectSpace:L&&i.normalMapType===1,normalMapTangentSpace:L&&i.normalMapType===0,packedNormalMap:L&&i.normalMapType===0&&Qm(i.normalMap.format),metalnessMap:oe,roughnessMap:se,anisotropy:ce,anisotropyMap:he,clearcoat:le,clearcoatMap:ge,clearcoatNormalMap:_e,clearcoatRoughnessMap:ve,dispersion:ue,retroreflection:de,iridescence:fe,iridescenceMap:ye,iridescenceThicknessMap:R,sheen:pe,sheenColorMap:be,sheenRoughnessMap:xe,specularMap:Se,specularColorMap:z,specularIntensityMap:Ce,transmission:me,transmissionMap:B,thicknessMap:V,gradientMap:we,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Te,alphaTest:Ee,alphaHash:De,combine:i.combine,mapUv:P&&m(i.map.channel),aoMapUv:ne&&m(i.aoMap.channel),lightMapUv:re&&m(i.lightMap.channel),bumpMapUv:I&&m(i.bumpMap.channel),normalMapUv:L&&m(i.normalMap.channel),displacementMapUv:ie&&m(i.displacementMap.channel),emissiveMapUv:ae&&m(i.emissiveMap.channel),metalnessMapUv:oe&&m(i.metalnessMap.channel),roughnessMapUv:se&&m(i.roughnessMap.channel),anisotropyMapUv:he&&m(i.anisotropyMap.channel),clearcoatMapUv:ge&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:_e&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:R&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:be&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:xe&&m(i.sheenRoughnessMap.channel),specularMapUv:Se&&m(i.specularMap.channel),specularColorMapUv:z&&m(i.specularColorMap.channel),specularIntensityMapUv:Ce&&m(i.specularIntensityMap.channel),transmissionMapUv:B&&m(i.transmissionMap.channel),thicknessMapUv:V&&m(i.thicknessMap.channel),alphaMapUv:Te&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(L||ce),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(P||Te),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&L===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:ke,decodeVideoTexture:P&&i.map.isVideoTexture===!0&&Io.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ae&&i.emissiveMap.isVideoTexture===!0&&Io.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Oe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Oe&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ae.vertexUv1s=c.has(1),Ae.vertexUv2s=c.has(2),Ae.vertexUv3s=c.has(3),c.clear(),Ae}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=bf[t];n=ld.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Jm(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function eh(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function th(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function nh(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function rh(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||th),r.length>1&&r.sort(t||nh),i.length>1&&i.sort(t||nh)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function ih(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new rh,e.set(t,[i])):n>=r.length?(i=new rh,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function ah(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new q,color:new Y};break;case`SpotLight`:n={position:new q,direction:new q,color:new Y,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new q,color:new Y,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new q,skyColor:new Y,groundColor:new Y};break;case`RectAreaLight`:n={color:new Y,position:new q,halfWidth:new q,halfHeight:new q}}return e[t.id]=n,n}}}function oh(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var sh=0;function ch(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function lh(e){let t=new ah,n=oh(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new q);let i=new q,a=new Qo,o=new Qo;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(ch);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=sh++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function uh(e){let t=new lh(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function dh(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new uh(e),t.set(n,[a])):r>=i.length?(a=new uh(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var fh=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ph=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,mh=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],hh=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],gh=new Qo,_h=new q,vh=new q;function yh(e,t,n){let r=new Tl,i=new K,a=new K,o=new qo,s=new hd,c=new gd,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new fd({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new K},radius:{value:4}},vertexShader:fh,fragmentShader:ph}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new kc;m.setAttribute(`position`,new mc(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new vl(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(W(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){W(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){W(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Yo(i.x,i.y,{format:ca,type:Yi,minFilter:zi,magFilter:zi,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Ol(i.x,i.y,Ji),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=ia,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Ii,d.map.depthTexture.magFilter=Ii}else l.isPointLight?(d.map=new Xf(i.x),d.map.depthTexture=new kl(i.x,qi)):(d.map=new Yo(i.x,i.y),d.map.depthTexture=new Ol(i.x,i.y,qi)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=ia,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=zi,d.map.depthTexture.magFilter=zi):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Ii,d.map.depthTexture.magFilter=Ii);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),_h.setFromMatrixPosition(l.matrixWorld),e.position.copy(_h),vh.copy(e.position),vh.add(mh[t]),e.up.copy(hh[t]),e.lookAt(vh),e.updateMatrixWorld(),n.makeTranslation(-_h.x,-_h.y,-_h.z),gh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(gh,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Yo(i.x,i.y,{format:ca,type:Yi}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function bh(e,t){function n(){let t=!1,n=new qo,r=null,i=new qo(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?oe(e.DEPTH_TEST):se(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=vo[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?oe(e.STENCIL_TEST):se(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,N=0,P=e.getParameter(e.VERSION);P.indexOf(`WebGL`)===-1?P.indexOf(`OpenGL ES`)!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),M=N>=2):(N=parseFloat(/^WebGL (\d)/.exec(P)[1]),M=N>=1);let F=null,te={},ne=e.getParameter(e.SCISSOR_BOX),re=e.getParameter(e.VIEWPORT),I=new qo().fromArray(ne),L=new qo().fromArray(re);function ie(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ae={};ae[e.TEXTURE_2D]=ie(e.TEXTURE_2D,e.TEXTURE_2D,1),ae[e.TEXTURE_CUBE_MAP]=ie(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[e.TEXTURE_2D_ARRAY]=ie(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ae[e.TEXTURE_3D]=ie(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),oe(e.DEPTH_TEST),o.setFunc(3),he(!1),ge(1),oe(e.CULL_FACE),pe(0);function oe(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function se(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ce(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function le(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ue(t){return h!==t&&(e.useProgram(t),h=t,!0)}let de={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};de[103]=e.MIN,de[104]=e.MAX;let fe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function pe(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(se(e.BLEND),g=!1);else if(g===!1&&(oe(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:G(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:G(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:G(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:G(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(de[n],de[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(fe[r],fe[i],fe[o],fe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function me(t,n){t.side===2?se(e.CULL_FACE):oe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?pe(0):pe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ve(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?oe(e.SAMPLE_ALPHA_TO_COVERAGE):se(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ge(t){t===0?se(e.CULL_FACE):(oe(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function _e(t){t!==k&&(M&&e.lineWidth(t),k=t)}function ve(t,n,r){t?(oe(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):se(e.POLYGON_OFFSET_FILL)}function ye(t){t?oe(e.SCISSOR_TEST):se(e.SCISSOR_TEST)}function R(t){t===void 0&&(t=e.TEXTURE0+ee-1),F!==t&&(e.activeTexture(t),F=t)}function be(t,n,r){r===void 0&&(r=F===null?e.TEXTURE0+ee-1:F);let i=te[r];i===void 0&&(i={type:void 0,texture:void 0},te[r]=i),(i.type!==t||i.texture!==n)&&(F!==r&&(e.activeTexture(r),F=r),e.bindTexture(t,n||ae[t]),i.type=t,i.texture=n)}function xe(){let t=te[F];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Se(){try{e.compressedTexImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function z(){try{e.compressedTexImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Ce(){try{e.texSubImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function B(){try{e.texSubImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function V(){try{e.compressedTexSubImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function we(){try{e.compressedTexSubImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Te(){try{e.texStorage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Ee(){try{e.texStorage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function De(){try{e.texImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Oe(){try{e.texImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function ke(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ae(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function je(t){I.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),I.copy(t))}function Me(t){L.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),L.copy(t))}function Ne(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Pe(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},F=null,te={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,I.set(0,0,e.canvas.width,e.canvas.height),L.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:oe,disable:se,bindFramebuffer:ce,drawBuffers:le,useProgram:ue,setBlending:pe,setMaterial:me,setFlipSided:he,setCullFace:ge,setLineWidth:_e,setPolygonOffset:ve,setScissorTest:ye,activeTexture:R,bindTexture:be,unbindTexture:xe,compressedTexImage2D:Se,compressedTexImage3D:z,texImage2D:De,texImage3D:Oe,pixelStorei:Ae,getParameter:ke,updateUBOMapping:Ne,uniformBlockBinding:Pe,texStorage2D:Te,texStorage3D:Ee,texSubImage2D:Ce,texSubImage3D:B,compressedTexSubImage2D:V,compressedTexSubImage3D:we,scissor:je,viewport:Me,reset:Fe}}function xh(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new K,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):uo(`canvas`)}function g(e,t,n){let r=1,i=Se(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),W(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&W(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];W(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||W(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?ro:Io.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,W(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function ee(){let e=O;return e>=i.maxTextures&&W(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function M(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function N(t,i){let a=r.get(t);if(t.isVideoTexture&&be(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)W(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)W(`WebGLRenderer: Texture marked for update but image is incomplete`);else{se(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function P(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?se(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function F(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?se(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function te(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?ce(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ne={[Ni]:e.REPEAT,[Pi]:e.CLAMP_TO_EDGE,[Fi]:e.MIRRORED_REPEAT},re={[Ii]:e.NEAREST,[Li]:e.NEAREST_MIPMAP_NEAREST,[Ri]:e.NEAREST_MIPMAP_LINEAR,[zi]:e.LINEAR,[Bi]:e.LINEAR_MIPMAP_NEAREST,[Vi]:e.LINEAR_MIPMAP_LINEAR},I={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function L(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&W(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ne[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ne[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ne[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,re[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,re[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,I[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ie(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=M(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ae(e,t,n){return Math.floor(Math.floor(e/n)/t)}function oe(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ae(n.start,r.width,4),c=ae(t.start,r.width,4);n.start<=i+1&&a===c&&ae(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function se(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ie(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Io.getPrimaries(Io.workingColorSpace),r=o.colorSpace===``?null:Io.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=xe(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);L(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===aa,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&oe(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=gf(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else W(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?W(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=gf(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Se(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Se(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ce(t,o,s){if(o.image.length!==6)return;let c=ie(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Io.getPrimaries(Io.workingColorSpace),r=o.colorSpace===``?null:Io.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=xe(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);L(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?W(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Se(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function le(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),R(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,ye(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ue(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;R(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ye(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,ye(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);R(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ye(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,ye(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function de(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,l.__webglTexture&&i.depthTexture.image.width===i.width&&i.depthTexture.image.height===i.height||(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),L(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else N(i.depthTexture,0);let u=l.__webglTexture,d=ye(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)R(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)R(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function fe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)de(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?de(i.__webglFramebuffer[0],t,0):de(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ue(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ue(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function pe(t,n,i){let a=r.get(t);n!==void 0&&le(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&fe(t)}function me(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&R(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=ye(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ue(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),L(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)le(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else le(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),L(c,a),le(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),L(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)le(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else le(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&fe(t)}function he(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let ge=[],_e=[];function ve(t){if(t.samples>0){if(R(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(ge.length=0,_e.length=0,ge.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(ge.push(l),_e.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,_e)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ge))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function ye(e){return Math.min(i.maxSamples,e.samples)}function R(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function be(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function xe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Io.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&W(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):G(`WebGLTextures: Unsupported texture color space:`,n)),t}function Se(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=ee,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=N,this.setTexture2DArray=P,this.setTexture3D=F,this.setTextureCube=te,this.rebindTextures=pe,this.setupRenderTarget=me,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=fe,this.setupFrameBufferTexture=le,this.useMultisampledRTT=R,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Sh(e,t){function n(n,r=``){let i,a=Io.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Ch=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wh=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Th=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Al(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new fd({vertexShader:Ch,fragmentShader:wh,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new vl(new nd(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Eh=class extends yo{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Th,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new K,C=null,w=null,T=new Yd;T.viewport=new qo;let E=new Yd;E.viewport=new qo;let D=[T,E],O=new nf,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Os,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Os,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Os,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,M);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,L.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&W(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&W(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,M),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?aa:ia,a=_.stencil?Qi:qi);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Yo(d.textureWidth,d.textureHeight,{format:ra,type:Hi,depthTexture:new Ol(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Yo(f.framebufferWidth,f.framebufferHeight,{format:ra,type:Hi,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),L.setContext(r),L.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function M(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let N=new q,P=new q;function F(e,t,n){N.setFromMatrixPosition(t.matrixWorld),P.setFromMatrixPosition(n.matrixWorld);let r=N.distanceTo(P),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function te(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;te(O,i);for(let e=0;e<a.length;e++)te(a[e],i);a.length===2?F(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),ne(e,O,i)};function ne(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=So*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let re=null;function I(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Yd,o.layers.enable(n),o.viewport=new qo,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Al,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}re&&re(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let L=new vf;L.setAnimationLoop(I),this.setAnimationLoop=function(e){re=e},this.dispose=function(){}}},Dh=new Qo,Oh=new J;Oh.set(-1,0,0,0,1,0,0,0,1);function kh(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,cd(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Dh.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Oh),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Ah(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return G(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?W(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):W(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var jh=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Mh=null;function Nh(){return Mh===null&&(Mh=new xl(jh,16,16,ca,Yi),Mh.name=`DFG_LUT`,Mh.minFilter=zi,Mh.magFilter=zi,Mh.wrapS=Pi,Mh.wrapT=Pi,Mh.generateMipmaps=!1,Mh.needsUpdate=!0),Mh}var Ph=class{constructor(e={}){let{canvas:t=fo(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Hi}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([ua,la,sa]),g=new Set([Hi,qi,Gi,Qi,Xi,Zi]),_=new Uint32Array(4),v=new Int32Array(4),y=new q,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=to;let j=0,ee=0,M=null,N=-1,P=null,F=new qo,te=new qo,ne=null,re=new Y(0),I=0,L=t.width,ie=t.height,ae=1,oe=null,se=null,ce=new qo(0,0,L,ie),le=new qo(0,0,L,ie),ue=!1,de=new Tl,fe=!1,pe=!1,me=new Qo,he=new q,ge=new qo,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ve=!1;function ye(){return M===null?ae:1}let R=n;function be(e,n){return t.getContext(e,n)}let xe,Se,z,Ce,B,V,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,Ue,!1),t.addEventListener(`webglcontextrestored`,H,!1),t.addEventListener(`webglcontextcreationerror`,U,!1),R===null){let t=`webgl2`;if(R=be(t,e),R===null)throw be(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Ve()}catch(e){throw t.removeEventListener(`webglcontextlost`,Ue,!1),t.removeEventListener(`webglcontextrestored`,H,!1),t.removeEventListener(`webglcontextcreationerror`,U,!1),G(`WebGLRenderer: `+e.message),e}function Ve(){xe=new Qf(R),xe.init(),Re=new Sh(R,xe),Se=new Df(R,xe,e,Re),z=new bh(R,xe),Se.reversedDepthBuffer&&d&&z.buffers.depth.setReversed(!0),O=R.createFramebuffer(),k=R.createFramebuffer(),A=R.createFramebuffer(),Ce=new tp(R),B=new eh,V=new xh(R,xe,z,B,Se,Re,Ce),we=new Zf(T),Te=new yf(R),ze=new Tf(R,Te),Ee=new $f(R,Te,Ce,ze),De=new rp(R,Ee,Te,ze,Ce),Fe=new np(R,Se,V),Me=new Of(B),Oe=new $m(T,we,xe,Se,ze,Me),ke=new kh(T,B),Ae=new ih,je=new dh(xe),Pe=new wf(T,we,z,De,p,s),Ne=new yh(T,De,Se),Be=new Ah(R,Ce,Se,z),Ie=new Ef(R,xe,Ce),Le=new ep(R,xe,Ce),Ce.programs=Oe.programs,T.capabilities=Se,T.extensions=xe,T.properties=B,T.renderLists=Ae,T.shadowMap=Ne,T.state=z,T.info=Ce}m!==1009&&(w=new ap(m,t.width,t.height,o,r,i));let He=new Eh(T,R);this.xr=He,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let e=xe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=xe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(e){e!==void 0&&(ae=e,this.setSize(L,ie,!1))},this.getSize=function(e){return e.set(L,ie)},this.setSize=function(e,n,r=!0){He.isPresenting?W(`WebGLRenderer: Can't change size while VR device is presenting.`):(L=e,ie=n,t.width=Math.floor(e*ae),t.height=Math.floor(n*ae),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(L*ae,ie*ae).floor()},this.setDrawingBufferSize=function(e,n,r){L=e,ie=n,ae=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)G(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){W(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(F)},this.getViewport=function(e){return e.copy(ce)},this.setViewport=function(e,t,n,r){e.isVector4?ce.set(e.x,e.y,e.z,e.w):ce.set(e,t,n,r),z.viewport(F.copy(ce).multiplyScalar(ae).round())},this.getScissor=function(e){return e.copy(le)},this.setScissor=function(e,t,n,r){e.isVector4?le.set(e.x,e.y,e.z,e.w):le.set(e,t,n,r),z.scissor(te.copy(le).multiplyScalar(ae).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(e){z.setScissorTest(ue=e)},this.setOpaqueSort=function(e){oe=e},this.setTransparentSort=function(e){se=e},this.getClearColor=function(e){return e.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=h.has(t)}if(e){let e=M.texture.type,t=g.has(e),n=Pe.getClearColor(),r=Pe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,R.clearBufferuiv(R.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,R.clearBufferiv(R.COLOR,0,v))}else r|=R.COLOR_BUFFER_BIT}t&&(r|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&R.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ue,!1),t.removeEventListener(`webglcontextrestored`,H,!1),t.removeEventListener(`webglcontextcreationerror`,U,!1),Pe.dispose(),Ae.dispose(),je.dispose(),B.dispose(),we.dispose(),De.dispose(),ze.dispose(),Be.dispose(),Oe.dispose(),He.dispose(),He.removeEventListener(`sessionstart`,Xe),He.removeEventListener(`sessionend`,Ze),Qe.stop()};function Ue(e){e.preventDefault(),mo(`WebGLRenderer: Context Lost.`),E=!0}function H(){mo(`WebGLRenderer: Context Restored.`),E=!1;let e=Ce.autoReset,t=Ne.enabled,n=Ne.autoUpdate,r=Ne.needsUpdate,i=Ne.type;Ve(),Ce.autoReset=e,Ne.enabled=t,Ne.autoUpdate=n,Ne.needsUpdate=r,Ne.type=i}function U(e){G(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function We(e){let t=e.target;t.removeEventListener(`dispose`,We),Ge(t)}function Ge(e){Ke(e),B.remove(e)}function Ke(e){let t=B.get(e).programs;t!==void 0&&(t.forEach(function(e){Oe.releaseProgram(e)}),e.isShaderMaterial&&Oe.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=_e);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=ct(e,t,n,r,i);z.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ee.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;ze.setup(i,r,s,n,c);let h,g=Ie;if(c!==null&&(h=Te.get(c),g=Le,g.setIndex(h)),i.isMesh)r.wireframe===!0?(z.setLineWidth(r.wireframeLinewidth*ye()),g.setMode(R.LINES)):g.setMode(R.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),z.setLineWidth(e*ye()),i.isLineSegments?g.setMode(R.LINES):i.isLineLoop?g.setMode(R.LINE_LOOP):g.setMode(R.LINE_STRIP)}else i.isPoints?g.setMode(R.POINTS):i.isSprite&&g.setMode(R.TRIANGLES);if(i.isBatchedMesh){if(xe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Te.get(c).bytesPerElement:1,o=B.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(R,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function qe(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),fe===!0&&Me.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,it(e,t,r),e.side=0,e.needsUpdate=!0,it(e,t,r),e.side=2):it(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=je.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),pe=this.localClippingEnabled,fe=Me.init(this.clippingPlanes,pe),fe===!0&&Me.setGlobalState(this.clippingPlanes,t),D!==null&&Ne.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];qe(o,n,t,e),r.add(o)}else qe(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=B.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}xe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Je=null;function Ye(e){Je&&Je(e)}function Xe(){Qe.stop()}function Ze(){Qe.start()}let Qe=new vf;Qe.setAnimationLoop(Ye),typeof self<`u`&&Qe.setContext(self),this.setAnimationLoop=function(e){Je=e,He.setAnimationLoop(e),e===null?Qe.stop():Qe.start()},He.addEventListener(`sessionstart`,Xe),He.addEventListener(`sessionend`,Ze),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){G(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=He.enabled===!0&&He.isPresenting===!0,r=w!==null&&(M===null||n)&&w.begin(T,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(He.cameraAutoUpdate===!0&&He.updateCamera(t),t=He.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,M),x=je.get(e,C.length),x.init(t),x.state.textureUnits=V.getTextureUnits(),C.push(x),me.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),de.setFromProjectionMatrix(me,so,t.reversedDepth),pe=this.localClippingEnabled,fe=Me.init(this.clippingPlanes,pe),b=Ae.get(e,S.length),b.init(),S.push(b),He.enabled===!0&&He.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&$e(e,t,-1/0,T.sortObjects)}$e(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(oe,se),ve=He.enabled===!1||He.isPresenting===!1||He.hasDepthSensing()===!1,ve&&Pe.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),fe===!0&&Me.beginShadows();let i=x.state.shadowsArray;if(Ne.render(i,e,t),fe===!0&&Me.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];tt(n,r,e,a)}ve&&Pe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];et(b,e,n,n.viewport)}}else r.length>0&&tt(n,r,e,t),ve&&Pe.render(e),et(b,e,t)}M!==null&&ee===0&&(V.updateMultisampleRenderTarget(M),V.updateRenderTargetMipmap(M)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),ze.resetDefaultState(),N=-1,P=null,C.pop(),C.length>0?(x=C[C.length-1],V.setTextureUnits(x.state.textureUnits),fe===!0&&Me.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function $e(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(de)){r&&ge.setFromMatrixPosition(e.matrixWorld).applyMatrix4(me);let i=De.update(e),a=e.material;a.visible&&b.push(e,i,a,n,ge.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(de))){let i=De.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),ge.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ge.copy(e.boundingSphere.center)),ge.applyMatrix4(e.matrixWorld).applyMatrix4(me)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,ge.z,s,t)}}else a.visible&&b.push(e,i,a,n,ge.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)$e(i[e],t,n,r)}function et(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),fe===!0&&Me.setGlobalState(T.clippingPlanes,n),r&&z.viewport(F.copy(r)),i.length>0&&nt(i,t,n),a.length>0&&nt(a,t,n),o.length>0&&nt(o,t,n),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function tt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=xe.has(`EXT_color_buffer_half_float`)||xe.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Yo(1,1,{generateMipmaps:!0,type:e?Yi:Hi,minFilter:Vi,samples:Math.max(4,Se.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Io.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||F;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(re),I=T.getClearAlpha(),I<1&&T.setClearColor(16777215,.5),T.clear(),ve&&Pe.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),fe===!0&&Me.setGlobalState(T.clippingPlanes,r),nt(e,n,r),V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a),xe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,rt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(re,I),d!==void 0&&(r.viewport=d),T.toneMapping=u}function nt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&rt(o,t,n,s,l,c)}}function rt(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function it(e,t,n){t.isScene!==!0&&(t=_e);let r=B.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Oe.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Oe.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=we.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,We),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return ot(e,s),d}else s.uniforms=Oe.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Oe.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Me.uniform),ot(e,s),r.needsLights=ut(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function at(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=fm.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function ot(e,t){let n=B.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function st(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function ct(e,t,n,r,i){t.isScene!==!0&&(t=_e),V.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?T.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Io.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=we.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=B.get(r),y=x.state.lights;if(fe===!0&&(pe===!0||e!==P)){let t=e===P&&r.id===N;Me.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Me.numPlanes||v.numIntersection!==Me.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=it(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(z.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==N&&(N=r.id,w=!0),v.needsLights){let e=st(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||P!==e){z.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(R,`projectionMatrix`,e.projectionMatrix),O.setValue(R,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(R,he.setFromMatrixPosition(e.matrixWorld)),Se.logarithmicDepthBuffer&&O.setValue(R,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(R,`isOrthographic`,e.isOrthographicCamera===!0),P!==e&&(P=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(R,`sunShadowMap`,y.state.sunShadowMap,V),y.state.directionalShadowMap.length>0&&O.setValue(R,`directionalShadowMap`,y.state.directionalShadowMap,V),y.state.spotShadowMap.length>0&&O.setValue(R,`spotShadowMap`,y.state.spotShadowMap,V),y.state.pointShadowMap.length>0&&O.setValue(R,`pointShadowMap`,y.state.pointShadowMap,V)),i.isSkinnedMesh){O.setOptional(R,i,`bindMatrix`),O.setOptional(R,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(R,`boneTexture`,e.boneTexture,V))}i.isBatchedMesh&&(O.setOptional(R,i,`batchingTexture`),O.setValue(R,`batchingTexture`,i._matricesTexture,V),O.setOptional(R,i,`batchingIdTexture`),O.setValue(R,`batchingIdTexture`,i._indirectTexture,V),O.setOptional(R,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(R,`batchingColorTexture`,i._colorsTexture,V));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Fe.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(R,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Nh()),w){if(O.setValue(R,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&lt(k,E),a&&r.fog===!0&&ke.refreshFogUniforms(k,a),ke.refreshMaterialUniforms(k,r,ae,ie,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}fm.upload(R,at(v),k,V)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(fm.upload(R,at(v),k,V),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(R,`center`,i.center),O.setValue(R,`modelViewMatrix`,i.modelViewMatrix),O.setValue(R,`normalMatrix`,i.normalMatrix),O.setValue(R,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Be.update(n,S),Be.bind(n,S)}}return S}function lt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function ut(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=B.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),B.get(e.texture).__webglTexture=t,B.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=B.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,j=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=B.get(e);if(o.__useDefaultFramebuffer!==void 0){z.bindFramebuffer(R.FRAMEBUFFER,o.__webglFramebuffer),F.copy(e.viewport),te.copy(e.scissor),ne=e.scissorTest,z.viewport(F),z.scissor(te),z.setScissorTest(ne),N=-1;return}if(o.__webglFramebuffer===void 0)V.setupRenderTarget(e);else if(o.__hasExternalTextures)V.rebindTextures(e,B.get(e.texture).__webglTexture,B.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&B.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);V.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=B.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&V.useMultisampledRTT(e)===!1?B.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,F.copy(e.viewport),te.copy(e.scissor),ne=e.scissorTest}else F.copy(ce).multiplyScalar(ae).floor(),te.copy(le).multiplyScalar(ae).floor(),ne=ue;if(n!==0&&(r=O),z.bindFramebuffer(R.FRAMEBUFFER,r)&&z.drawBuffers(e,r),z.viewport(F),z.scissor(te),z.setScissorTest(ne),i){let r=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=B.get(e.textures[t]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,t.__webglTexture,n)}N=-1};function dt(e){let t=B.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Se.textureFormatReadable(e.format),t.__typeReadable=Se.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){z.bindFramebuffer(R.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let u=dt(o);if(u.__formatReadable===!1){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&R.readPixels(t,n,r,i,Re.convert(c),Re.convert(l),a)}finally{let e=M===null?null:B.get(M).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){z.bindFramebuffer(R.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let d=dt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.bufferData(R.PIXEL_PACK_BUFFER,a.byteLength,R.STREAM_READ),R.readPixels(t,n,r,i,Re.convert(l),Re.convert(u),0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null);let p=M===null?null:B.get(M).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,p);let m=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await _o(R,m,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,a),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.deleteBuffer(f),R.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;V.setTexture2D(e,0),R.copyTexSubImage2D(R.TEXTURE_2D,n,0,0,o,s,i,a),z.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Re.convert(t.format),_=Re.convert(t.type),v;t.isData3DTexture?(V.setTexture3D(t,0),v=R.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(V.setTexture2DArray(t,0),v=R.TEXTURE_2D_ARRAY):(V.setTexture2D(t,0),v=R.TEXTURE_2D),z.activeTexture(R.TEXTURE0),z.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,t.flipY),z.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),z.pixelStorei(R.UNPACK_ALIGNMENT,t.unpackAlignment);let y=z.getParameter(R.UNPACK_ROW_LENGTH),b=z.getParameter(R.UNPACK_IMAGE_HEIGHT),x=z.getParameter(R.UNPACK_SKIP_PIXELS),S=z.getParameter(R.UNPACK_SKIP_ROWS),C=z.getParameter(R.UNPACK_SKIP_IMAGES);z.pixelStorei(R.UNPACK_ROW_LENGTH,h.width),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,h.height),z.pixelStorei(R.UNPACK_SKIP_PIXELS,l),z.pixelStorei(R.UNPACK_SKIP_ROWS,u),z.pixelStorei(R.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=B.get(e),r=B.get(t),h=B.get(n.__renderTarget),g=B.get(r.__renderTarget);z.bindFramebuffer(R.READ_FRAMEBUFFER,h.__webglFramebuffer),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(e).__webglTexture,i,d+n),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(t).__webglTexture,a,m+n)),R.blitFramebuffer(l,u,o,s,f,p,o,s,R.DEPTH_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||B.has(e)){let n=B.get(e),r=B.get(t);z.bindFramebuffer(R.READ_FRAMEBUFFER,k),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,n.__webglTexture,i),T?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,r.__webglTexture,a),i===0?T?R.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):R.copyTexSubImage2D(v,a,f,p,l,u,o,s):R.blitFramebuffer(l,u,o,s,f,p,o,s,R.COLOR_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?R.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h);z.pixelStorei(R.UNPACK_ROW_LENGTH,y),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,b),z.pixelStorei(R.UNPACK_SKIP_PIXELS,x),z.pixelStorei(R.UNPACK_SKIP_ROWS,S),z.pixelStorei(R.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&R.generateMipmap(v),z.unbindTexture()},this.initRenderTarget=function(e){B.get(e).__webglFramebuffer===void 0&&V.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?V.setTextureCube(e,0):e.isData3DTexture?V.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?V.setTexture2DArray(e,0):V.setTexture2D(e,0),z.unbindTexture()},this.resetState=function(){j=0,ee=0,M=null,z.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return so}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Io._getDrawingBufferColorSpace(e),t.unpackColorSpace=Io._getUnpackColorSpace()}},Fh=(e,t,n)=>e<t?t:e>n?n:e,Ih=(e,t,n)=>e+(t-e)*n,Lh=e=>e*e*(3-2*e);function Rh(e,t,n){return e<t?Math.min(e+n,t):Math.max(e-n,t)}function zh(e){return e=(e+Math.PI)%(Math.PI*2),e<0&&(e+=Math.PI*2),e-Math.PI}function Bh(e,t){let n=Math.imul(e|0,374761393)+Math.imul(t|0,668265263);return n=Math.imul(n^n>>>13,1274126177),n^=n>>>16,(n>>>0)/4294967296}function Vh(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new kc,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Hh(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Hh(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Hh(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new mc(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var Uh={SkyHigh:`#2D2A6E`,SkyMid:`#E4577D`,Horizon:`#FF9F45`,Sun:`#FFE38A`,Asphalt:`#3F4350`,TrackLine:`#F2F2EE`,Gravel:`#B98E62`,Grass:`#7DBE4E`,Wheat:`#E9C46A`,Steppe:`#C2A66B`,RedRock:`#C8553D`,Forest:`#3E7A3A`,Water:`#3FA7C9`,White:`#FFFFFF`,UiBg:`#EAF4FA`,UiGrey:`#C9D3DC`,UiText:`#2E3440`,UiFocus:`#1677B8`,Advantage:`#1FA2E0`,Disadvantage:`#F26B1D`,RouteEvent:`#FFC928`,Elimination:`#B3124E`,CarBody:`#E4577D`,CarAccent:`#F2F2EE`,CarTire:`#2E3440`,CarGlass:`#2D2A6E`,CarLight:`#FFE38A`},Wh=8,Gh=8,Kh=64,qh=Object.keys(Uh);function Jh(e){let t=qh.indexOf(e);return[(t%Wh+.5)/Wh,(Math.floor(t/Wh)+.5)/Wh]}function Yh(e={}){let t=new Uint8Array(16384),n=new Y;qh.forEach((r,i)=>{n.setStyle(e[r]??Uh[r],``);let a=i%Wh*Gh,o=Math.floor(i/Wh)*Gh;for(let e=o;e<o+Gh;e++)for(let r=a;r<a+Gh;r++){let i=(e*Kh+r)*4;t[i]=Math.round(n.r*255),t[i+1]=Math.round(n.g*255),t[i+2]=Math.round(n.b*255),t[i+3]=255}});let r=new xl(t,Kh,Kh,ra);return r.colorSpace=to,r.magFilter=Ii,r.minFilter=Ii,r.generateMipmaps=!1,r.needsUpdate=!0,r}function Xh(e={}){return new md({map:Yh(e),flatShading:!0,name:`Palette`})}var Zh=e=>Uh[e],Qh=(e,t)=>t[e]??Uh[e],$h=new q;function eg(e,t){let n=e.index?e.toNonIndexed():e,[r,i]=Jh(t),a=new Float32Array(n.getAttribute(`position`).count*2);for(let e=0;e<a.length;e+=2)a[e]=r,a[e+1]=i;return n.setAttribute(`uv`,new mc(a,2)),n}function Q(e,t,n,r,i,a,o){return eg(new jl(t,n,r).translate(i,a,o),e)}function tg(e){let t=Vh(e,!1);if(!t)throw Error(`MeshBuilder: piezas con atributos distintos`);return t.computeVertexNormals(),t}var ng=class{_pos=[];_uv=[];tri(e,t,n,r){let i=(t[1]-e[1])*(n[2]-e[2])-(t[2]-e[2])*(n[1]-e[1]),a=(t[2]-e[2])*(n[0]-e[0])-(t[0]-e[0])*(n[2]-e[2]),o=(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0]),[s,c]=Jh(r),l=a>=0||a===0&&i+o>=0?[e,t,n]:[e,n,t];for(let e of l)this._pos.push(e[0],e[1],e[2]),this._uv.push(s,c)}quad(e,t,n,r,i){this.tri(e,t,n,i),this.tri(e,n,r,i)}addGeometry(e,t){let n=e.getAttribute(`position`),r=e.getAttribute(`uv`);for(let e=0;e<n.count;e++)$h.fromBufferAttribute(n,e).applyMatrix4(t),this._pos.push($h.x,$h.y,$h.z),this._uv.push(r.getX(e),r.getY(e))}get empty(){return this._pos.length===0}build(){let e=new kc;return e.setAttribute(`position`,new _c(this._pos,3)),e.setAttribute(`uv`,new _c(this._uv,2)),e.computeVertexNormals(),e}},rg=.46,ig=1.9,ag=1.55;function og(e,t,n){return eg(new Zu(new pu(t.map(([e,t])=>new K(e,t))),{depth:n,bevelEnabled:!1}).rotateY(-Math.PI/2).translate(n/2,0,0),e)}function sg(e,t){let n=new Nl(rg,rg,.38,10).rotateZ(Math.PI/2).translate(e,rg,t),r=new Nl(.26,.26,.4,7).rotateZ(Math.PI/2).translate(e,rg,t),i=new Nl(.08,.08,.42,5).rotateZ(Math.PI/2).translate(e,rg,t);return[eg(n,`CarTire`),eg(r,`TrackLine`),eg(i,`CarTire`)]}var cg=null;function lg(){return cg||(cg=tg([og(`CarBody`,[[-2.05,.35],[2,.35],[2.12,.55],[2.02,.8],[.85,.93],[-1.6,.93],[-2.08,.88]],ig),og(`CarGlass`,[[.85,.92],[.1,1.36],[-.85,1.37],[-1.45,.92]],ag),Q(`CarBody`,1.45,.1,1,0,1.41,-.35),Q(`CarBody`,1.57,.42,.12,0,1.14,-.3),Q(`CarAccent`,1.95,.1,3.9,0,.66,0),Q(`CarBody`,.1,.3,1.15,.97,.6,1.3),Q(`CarBody`,.1,.3,1.15,-.97,.6,1.3),Q(`CarBody`,.1,.3,1.15,.97,.6,-1.3),Q(`CarBody`,.1,.3,1.15,-.97,.6,-1.3),Q(`CarTire`,1.96,.2,.22,0,.42,2.06),Q(`CarTire`,.9,.12,.06,0,.62,2.1),Q(`CarAccent`,1.8,.05,.28,0,.32,2.12),Q(`CarTire`,1.96,.2,.2,0,.42,-2.08),Q(`CarLight`,.42,.15,.08,.6,.7,2.05),Q(`CarLight`,.42,.15,.08,-.6,.7,2.05),Q(`RedRock`,.42,.13,.05,.64,.78,-2.09),Q(`RedRock`,.42,.13,.05,-.64,.78,-2.09),Q(`CarBody`,.18,.1,.14,.86,1.04,.7),Q(`CarBody`,.18,.1,.14,-.86,1.04,.7),Q(`CarAccent`,1.8,.06,.45,0,1.28,-1.88),Q(`CarAccent`,.06,.3,.52,.88,1.18,-1.88),Q(`CarAccent`,.06,.3,.52,-.88,1.18,-1.88),Q(`CarTire`,.08,.34,.1,.5,1.08,-1.84),Q(`CarTire`,.08,.34,.1,-.5,1.08,-1.84),...sg(.95,1.3),...sg(-.95,1.3),...sg(.95,-1.3),...sg(-.95,-1.3)]),cg)}function ug(e){let t=new vl(lg(),Xh(e));return t.name=`Car`,t}var dg=128,fg=96,pg=1.1,mg=.42,hg=.962,gg=.64,_g=-.15,vg=.9,yg=1.475,bg=-.35,xg=.6,Sg=.74,Cg=-2.11;function wg(e){let t=document.createElement(`canvas`);t.width=dg,t.height=fg;let n=t.getContext(`2d`);n.fillStyle=`#F2F2EE`,n.beginPath(),n.roundRect(4,4,120,88,18),n.fill(),n.fillStyle=`#1F2430`,n.font=`900 76px system-ui, sans-serif`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(String(e),dg/2,52);let r=new Dl(t);return r.colorSpace=to,r}var Tg=null;function Eg(){return Tg||(Tg=Vh([new nd(pg,mg).rotateY(-Math.PI/2).translate(-.962,gg,_g),new nd(pg,mg).rotateY(Math.PI/2).translate(hg,gg,_g),new nd(vg,fg/dg*vg).rotateX(-Math.PI/2).rotateY(Math.PI).translate(0,yg,bg),new nd(xg,fg/dg*xg).rotateY(Math.PI).translate(0,Sg,Cg)],!1),Tg)}var Dg=e=>(e*7+3)%99+1;function Og(e){let t=new vl(Eg(),new md({map:wg(e)}));return t.name=`CarNumber`,t}var kg=()=>({index:0,s:0,lateral:0,heading:0,y:0,slope:0}),Ag=12,jg=20,Mg=60,Ng=30,Pg=.005,Fg=.5,Ig=16,Lg=1.2,Rg=[{length:150,curve:0,hill:0},{length:350,curve:.005,hill:0}],zg=class{id;step;roadWidth;shoulder;barrier;widths=[];xs=[];zs=[];ys=[];hs=[];length;raceLength;obstacles;pitLines;pitLaneLength;gravel=[];reliefs=[];reliefAmount=[];racingLine=[];constructor(e){this.id=e.id,this.pitLines=e.pitLines??[],this.pitLaneLength=e.pitLaneLength??0,this.step=e.sampleStep,this.roadWidth=e.roadWidth,this.shoulder=e.shoulder,this.barrier=e.roadWidth/2+e.shoulder;let t=[e.roadWidth],n=0,r=0,i=0,a=0;this._push(n,i,r,a),this.gravel.push(0),this.reliefs.push(null),this.reliefAmount.push(0);let o=e.runoff?[...e.segments,...Rg]:e.segments,s=0;for(let[c,l]of o.entries()){c===e.segments.length&&(s=this.count);let o=Math.max(1,Math.round(l.length/this.step)),u=i;for(let s=1;s<=o;s++)this.gravel.push(+(l.surface===`gravel`)),t.push(l.width??e.roadWidth),this.reliefs.push(l.relief??null),this.reliefAmount.push(l.relief?Lh(Math.min(s,o-s)*this.step/Ng):0),a-=l.curve*this.step,n+=Math.sin(a)*this.step,r+=Math.cos(a)*this.step,i=u+l.hill*Lh(s/o),this._push(n,i,r,a)}this.length=(this.count-1)*this.step,this.raceLength=e.runoff?(s-1)*this.step:this.length,this._buildWidths(t),this._buildRacingLine(),this.obstacles=e.obstacles.map(e=>{let t=Fh(Math.round(e.s/this.step),0,this.count-1);return{...e,x:this.xs[t]-Math.cos(this.hs[t])*e.lateral,z:this.zs[t]+Math.sin(this.hs[t])*e.lateral}}).sort((e,t)=>e.s-t.s)}halfWidth(e){return this.widths[Fh(e,0,this.count-1)]/2}barrierAt(e){return this.halfWidth(e)+this.shoulder}laneScale(e){return this.widths[Fh(e,0,this.count-1)]/this.roadWidth}onRacingLine(e,t){let n=this.racingLine[Fh(e,0,this.count-1)];return Math.abs(t-n)<Lg}get count(){return this.xs.length}curveAt(e){let t=Fh(e,0,this.count-2);return-zh(this.hs[t+1]-this.hs[t])/this.step}poseAt(e,t,n,r){let i=Fh(e/this.step,0,this.count-1.001),a=Math.floor(i),o=i-a,s=this.hs[a]+zh(this.hs[a+1]-this.hs[a])*o;return r.x=this.xs[a]+(this.xs[a+1]-this.xs[a])*o-Math.cos(s)*t,r.z=this.zs[a]+(this.zs[a+1]-this.zs[a])*o+Math.sin(s)*t,r.y=this.ys[a]+(this.ys[a+1]-this.ys[a])*o,r.heading=s-Math.atan(n),r}locate(e,t,n,r){let i=this.count-1,a=n<0?0:Math.max(0,n-Ag),o=n<0?i:Math.min(i,n+Ag),s=a,c=1/0;for(let n=a;n<=o;n++){let r=e-this.xs[n],i=t-this.zs[n],a=r*r+i*i;a<c&&(c=a,s=n)}let l=this.hs[s],u=e-this.xs[s],d=t-this.zs[s],f=u*Math.sin(l)+d*Math.cos(l);r.index=s,r.s=s*this.step+f,r.lateral=-u*Math.cos(l)+d*Math.sin(l),r.heading=l;let p=f>=0?Math.min(s+1,i):Math.max(s-1,0),m=Fh(Math.abs(f)/this.step,0,1);r.y=this.ys[s]+(this.ys[p]-this.ys[s])*m;let h=Math.min(s+1,i);return r.slope=h===s?0:(this.ys[h]-this.ys[s])/this.step,r}_buildWidths(e){for(let t of this.pitLines){let n=Math.max(0,Math.floor((t-Mg)/this.step)),r=Math.min(e.length-1,Math.ceil((t+this.pitLaneLength+Mg)/this.step));for(let t=n;t<=r;t++)e[t]=this.roadWidth,this.reliefs[t]=null,this.reliefAmount[t]=0}let t=Math.round(jg/this.step);for(let n=0;n<e.length;n++){let r=0;for(let i=n-t;i<=n+t;i++)r+=e[Fh(i,0,e.length-1)];this.widths.push(r/(2*t+1))}}_buildRacingLine(){let e=Math.round(Ig/this.step),t=[];for(let e=0;e<this.count;e++){let n=this.curveAt(e);t.push(Math.abs(n)>=Pg?Math.sign(n)*this.halfWidth(e)*Fg:NaN)}for(let n=0;n<this.count;n++){let r=0,i=!1;for(let a=n-e;a<=n+e;a++){let e=t[Fh(a,0,this.count-1)];Number.isNaN(e)||(r+=e,i=!0)}this.racingLine.push(i?r/(2*e+1):NaN)}}_push(e,t,n,r){this.xs.push(e),this.ys.push(t),this.zs.push(n),this.hs.push(r)}},Bg=16,Vg=2.4,Hg=.7,Ug=10,Wg=.14,Gg=10,Kg=3,qg=.005,Jg=.9,Yg=.8,Xg=kg();function Zg(e,t,n,r){let i=()=>({x:0,y:0,z:0,heading:0,pitch:0,roll:0});return{...i(),id:e,player:t,tuningId:n.id,skin:r,homeLane:0,lane:0,pace:1,paceAdjust:0,laneHold:0,vx:0,vy:0,vz:0,yawRate:0,rollRate:0,draft:0,drifting:!1,driftDir:0,onGravel:!1,onDirt:!1,onLine:!1,skidding:!1,draftLead:-1,closeCallWait:0,scrapeTime:0,scrapeSide:0,driftTime:0,slingCharge:0,slingStage:0,boostTime:0,brakeHeld:0,airborne:!1,spinTime:0,spinDir:0,flipTime:0,flipRoll:0,flips:0,spins:0,ghostTime:0,card:null,cardOffer:[],cardSteerHeld:!0,pullSide:1,heat:0,raceSpeed:1,nextPit:0,inPit:!1,pitClock:0,pitS:0,pitSpeed:0,pitFromLat:0,pitOrder:0,eliminated:!1,eliminatedAt:-1,place:0,trackIndex:0,s:0,lateral:0,finished:!1,finishTime:0,prev:i()}}var Qg=e=>Math.hypot(e.vx,e.vz),$g=e=>!e.finished&&!e.eliminated&&!e.inPit;function e_(e,t,n,r,i){let a=Fh(n,0,t.count-1),o=t.hs[a];e.x=t.xs[a]-Math.cos(o)*r,e.z=t.zs[a]+Math.sin(o)*r,e.y=t.ys[a],e.heading=o,e.vx=Math.sin(o)*i,e.vz=Math.cos(o)*i,e.vy=0,e.yawRate=0,e.rollRate=0,e.pitch=0,e.roll=0,e.airborne=!1,e.flipTime=0,e.spinTime=0,h_(e),e.boostTime=0,e.trackIndex=a,e.s=a*t.step,e.lateral=r,b_(e,e.prev)}function t_(e,t,n,r){if(e.flipTime>0)return;let i=t>=0?1:-1,a=n>r.flipImpactSpeed*1.4?2:1;e.flipTime=Vg,e.flipRoll=e.roll+i*a*Math.PI*2,e.flips++,e.rollRate=i*a*Math.PI*2/(Vg*Hg),e.vy=Math.max(e.vy,5.5),e.airborne=!0,e.spinTime=0,h_(e),e.boostTime=0}function n_(e,t,n){e.flipTime>0||e.spinTime>0||(e.spinTime=n.spinTime,e.spinDir=t>=0?1:-1,e.spins++,h_(e),e.boostTime=0)}function r_(e,t,n,r){n>r.flipImpactSpeed?t_(e,t,n,r):n>r.spinImpactSpeed&&n_(e,t,r)}function i_(e,t,n,r,i,a){if(b_(e,e.prev),e.ghostTime=Math.max(0,e.ghostTime-a),e.closeCallWait=Math.max(0,e.closeCallWait-a),e.scrapeTime=Math.max(0,e.scrapeTime-a),e.flipTime>0){y_(e,n,r,a);return}n.locate(e.x,e.z,e.trackIndex,Xg);let o=Math.abs(Xg.lateral)>n.halfWidth(Xg.index);e.onGravel=!o&&n.gravel[Xg.index]===1,e.onDirt=o||e.onGravel,e.onLine=r.racingLine>0&&n.onRacingLine(Xg.index,Xg.lateral),e.draft=Rh(e.draft,+!!i,(i?r.draftBuild:1.2)*a),e.boostTime=Math.max(0,e.boostTime-a);let s=e.spinTime>0;s?t=a_:r.turboSteerLock>0&&e.boostTime>0&&(o_.throttle=t.throttle,o_.brake=t.brake,t=o_),e.brakeHeld=t.brake>.2?e.brakeHeld+a:0,r.overheatTime>0&&(e.heat=Fh(e.heat+(t.throttle>.9?a:-2*a),0,r.overheatTime+1));let c=Xg.heading,l=Math.sin(c),u=Math.cos(c),d=e.vx*l+e.vz*u,f=-e.vx*u+e.vz*l,p=n.curveAt(Xg.index),m=e.heading,h=e.spinTime>0;if(e.skidding=!1,!e.airborne){let n=s?0:Fh(t.steer+r.steerPull*e.pullSide,-1,1);p_(e,t,d,r),d=s?Math.max(0,d-r.spinDrag*a):e.drifting?m_(e,t,d,o,r,a):f_(e,t.throttle,t.brake,d,o,r,a),f=s_(e,n,d,f,p,r,a)}if(e.vx=l*d-u*f,e.vz=u*d+l*f,e.x+=e.vx*a,e.z+=e.vz*a,n.locate(e.x,e.z,Xg.index,Xg),e.trackIndex=Xg.index,e.s=Xg.s,e.lateral=Xg.lateral,e.airborne||l_(e,zh(Xg.heading-c)),u_(e,d,f,r,a),h&&e.spinTime<=0&&r.spinExitBoost>0&&(e.boostTime=Math.max(e.boostTime,r.spinExitBoost)),e.yawRate=zh(e.heading-m)/a,g_(e,n,r),__(e,n,r),v_(e,r,a),e.flipTime<=0){let t=Fh(e.yawRate*d*.0045,-.14,Wg);e.roll=Rh(e.roll,t,1.5*a)}}var a_={steer:0,throttle:0,brake:0},o_={steer:0,throttle:0,brake:0};function s_(e,t,n,r,i,a,o){let s=Fh(Math.abs(n)/Gg,0,1),c=e.boostTime>0?a.boostWobble*Math.sin(e.boostTime*6):0,l=(t*a.strafeSpeed+c)*s;r+=(l-r)*(1-Math.exp(-a.strafeResponse*o));let u=c_(e,i,n,a);return e.skidding=Math.abs(u)>Jg*a.strafeSpeed*a.strafeResponse,r-u*o}function c_(e,t,n,r){let i=e.drifting?Fh(e.driftTime/Math.max(r.driftEaseTime,1e-6),0,1):0,a=e.onLine?1-r.racingLine:1;return r.curvePush*t*n*Math.abs(n)*(1-(1-r.crossPush)*i)*a}function l_(e,t){if(t===0)return;let n=Math.cos(t),r=Math.sin(t),i=e.vx;e.vx=i*n+e.vz*r,e.vz=-i*r+e.vz*n}function u_(e,t,n,r,i){let a=Xg.heading;if(e.airborne){e.heading=zh(e.heading+e.yawRate*i);return}let o=-Math.atan2(n,Math.max(Math.abs(t),5))*r.yawLook;o-=e.pullSide*r.steerPull*Yg,e.drifting&&(o-=e.driftDir*r.driftSlip*Fh(e.driftTime/Math.max(r.driftEaseTime,1e-6),0,1));let s=d_(e,r);e.spinTime>0&&(e.spinTime=Math.max(0,e.spinTime-i)),e.heading=zh(a+Rh(zh(e.heading-a-s),o,r.driftSlipRate*i)+d_(e,r))}function d_(e,t){if(e.spinTime<=0)return 0;let n=1-e.spinTime/t.spinTime;return e.spinDir*Math.PI*2*(1-(1-n)*(1-n))}function f_(e,t,n,r,i,a,o){let s=e.boostTime>0,c=(i?a.offroadMaxSpeed:a.maxSpeed)*(e.onGravel?a.gravelSpeed:1)*(s?a.turboBoost:1)*(1+(a.draftBoost-1)*e.draft)*(a.noDraftSpeed+(1-a.noDraftSpeed)*e.draft)*(a.overheatTime>0&&e.heat>=a.overheatTime?a.overheatSpeed:1)*e.raceSpeed,l=0;return t>0&&r<c&&(l+=a.accel*t*(1-Math.max(r,0)/c)),t<=0&&(l-=r*a.rollDrag),s&&(l+=a.turboAccel),r>c&&(l-=(r-c)*(i?a.offroadDrag*4:2)),n>0&&(l-=r>1?a.brake*n:a.reverseAccel*n),r+=l*o,Math.max(r,-a.reverseMax)}function p_(e,t,n,r){let i=t.brake>.2;e.drifting?(!i||n<r.driftMinSpeed*.6)&&h_(e):i&&e.brakeHeld<=r.driftStartWindow&&Math.abs(t.steer)>.3&&n>r.driftMinSpeed&&(e.drifting=!0,e.driftDir=Math.sign(t.steer),e.driftTime=0)}function m_(e,t,n,r,i,a){return e.driftTime+=a,Math.max(f_(e,t.throttle,0,n,r,i,a)-i.driftDrag*a,0)}function h_(e){e.drifting=!1}function g_(e,t,n){let r=Math.abs(e.lateral)-(t.barrierAt(Xg.index)-n.radius);if(r<=0)return;let i=Math.sign(e.lateral),a=-Math.cos(Xg.heading)*i,o=Math.sin(Xg.heading)*i;e.x-=a*r,e.z-=o*r,e.lateral-=i*r;let s=e.vx*a+e.vz*o;if(s<=0)return;let c=n.barrierBounce;c<1&&r_(e,i,s,n);let l=Qg(e),u=s>Kg?.92:1-qg*s;if(e.vx=(e.vx-a*s*1.4)*u,e.vz=(e.vz-o*s*1.4)*u,c<=0)return;let d=Math.sin(Xg.heading),f=Math.cos(Xg.heading);e.vx+=(d*l-e.vx)*c,e.vz+=(f*l-e.vz)*c,e.heading=zh(e.heading+zh(Xg.heading-e.heading)*c),e.yawRate*=1-c}function __(e,t,n){for(let r of t.obstacles){if(r.s<e.s-10)continue;if(r.s>e.s+10)break;let t=e.x-r.x,i=e.z-r.z,a=r.radius+n.radius,o=t*t+i*i;if(o>=a*a||o<1e-6)continue;let s=Math.sqrt(o),c=t/s,l=i/s;e.x+=c*(a-s),e.z+=l*(a-s);let u=-(e.vx*c+e.vz*l);u<=0||(r_(e,-c*Math.cos(e.heading)+l*Math.sin(e.heading)>0?-1:1,u/.7,n),e.vx+=c*u*1.3,e.vz+=l*u*1.3)}}function v_(e,t,n){let r=Xg.y;if(e.airborne){if(e.vy-=Bg*n,e.y+=e.vy*n,e.flipTime<=0&&(e.pitch=Rh(e.pitch,Math.atan2(e.vy,Math.max(5,Qg(e)))*.6,1.2*n)),e.y<=r){let n=-e.vy;e.y=r,e.vy=0,e.airborne=!1,(n>t.landFlipSpeed||e.spinTime<=0&&Math.abs(zh(e.heading-Xg.heading))>1.2)&&t_(e,e.yawRate>=0?-1:1,t.flipImpactSpeed,t)}return}let i=(r-e.y)/n;i<e.vy-Bg*n?(e.airborne=!0,e.vy-=Bg*n,e.y+=e.vy*n):(e.vy=i,e.y=r,e.pitch=Rh(e.pitch,Math.atan(Xg.slope),3*n))}function y_(e,t,n,r){e.flipTime=Math.max(0,e.flipTime-r),e.vy-=Bg*r,e.y+=e.vy*r,e.x+=e.vx*r,e.z+=e.vz*r,t.locate(e.x,e.z,e.trackIndex,Xg),e.trackIndex=Xg.index,e.s=Xg.s,e.lateral=Xg.lateral,g_(e,t,n);let i=e.flipTime>Vg*.30000000000000004;if(e.y<=Xg.y){e.y=Xg.y,e.vy=i&&e.vy<-2?-e.vy*.45+2.5:0;let t=Math.exp(-2.2*r);e.vx*=t,e.vz*=t}i?e.roll+=e.rollRate*r:(e.roll=Rh(e.roll,e.flipRoll,6*r),e.heading=zh(e.heading+Rh(0,zh(Xg.heading-e.heading),3*r)),e.pitch=Rh(e.pitch,0,2*r)),e.flipTime<=0&&(e.y=Xg.y,e.vy=0,e.heading=Xg.heading,e.vx=Math.sin(Xg.heading)*Ug,e.vz=Math.cos(Xg.heading)*Ug,e.roll=0,e.prev.roll=0,e.pitch=0,e.rollRate=0,e.yawRate=0,e.airborne=!1)}function b_(e,t){t.x=e.x,t.y=e.y,t.z=e.z,t.heading=e.heading,t.pitch=e.pitch,t.roll=e.roll}var x_=[{CarBody:`#E4577D`,CarAccent:`#F2F2EE`},{CarBody:`#F2F2EE`,CarAccent:`#2D2A6E`},{CarBody:`#7DBE4E`,CarAccent:`#2E3440`},{CarBody:`#2D2A6E`,CarAccent:`#FFE38A`},{CarBody:`#C8553D`,CarAccent:`#F2F2EE`},{CarBody:`#E9C46A`,CarAccent:`#3F4350`},{CarBody:`#3FA7C9`,CarAccent:`#F2F2EE`},{CarBody:`#9A6FD0`,CarAccent:`#F2F2EE`}],S_=new Ml(1.6,12).rotateX(-Math.PI/2).scale(.75,1,1.45),C_=new ol({color:Zh(`UiText`),transparent:!0,opacity:.35,depthWrite:!1}),w_=[`Water`,`Horizon`,`SkyMid`].map(e=>new ol({color:Zh(e)})),T_=new td(.28,0),E_=new Pl(.32,1.4,6).rotateX(-Math.PI/2).translate(0,.55,-2.7),D_=new ol({color:Zh(`Sun`)}),O_=new ol({color:Zh(`Disadvantage`)}),k_=new ol({color:Zh(`Sun`)}),A_=4,j_=new ed(.45,0),M_=new ol({color:Zh(`White`),transparent:!0,opacity:.45,depthWrite:!1}),N_=3,P_=new Nl(.17,.17,.36,8).rotateX(Math.PI/2),F_=new md({color:Zh(`TrackLine`)}),I_=2.4,L_=.02,R_=.04,z_=20,B_=class{root=new Es;pose={x:0,y:0,z:0,heading:0,pitch:0,roll:0};shown=!0;_body;_shadow=new vl(S_,C_);_sparks=[new vl(T_,w_[0]),new vl(T_,w_[0])];_flame=new vl(E_,D_);_puffs=[];_cans=[];_scrape=[new vl(T_,k_),new vl(T_,k_),new vl(T_,k_)];_time=0;_fadeMats;_shadowOn=!0;_fade=1;_skin;_number;constructor(e){this._skin=e,this._body=ug(x_[e%x_.length]),this._body.rotation.order=`YXZ`,this._sparks[0].position.set(.95,.2,-1.5),this._sparks[1].position.set(-.95,.2,-1.5);let t=this._number=Og(Dg(e));for(let e=0;e<A_;e++)this._puffs.push(new vl(j_,M_));for(let e=0;e<N_;e++)this._cans.push(new vl(P_,F_));this._body.add(...this._sparks,this._flame,t,...this._puffs,...this._cans,...this._scrape),this.root.add(this._body,this._shadow),this._fadeMats=[this._body.material,t.material];for(let e of this._fadeMats)e.alphaHash=!0}setSkin(e){if(e===this._skin)return;this._skin=e;let t=this._body.material;t.map?.dispose(),t.map=Yh(x_[e%x_.length]);let n=this._number.material;n.map?.dispose(),n.map=wg(Dg(e))}setFade(e){if(e!==this._fade){this._fade=e;for(let t of this._fadeMats)t.opacity=e;this._shadow.visible=this._shadowOn&&e>.6}}update(e,t,n,r,i){let a=this.pose,o=e.prev;a.x=Ih(o.x,e.x,t),a.y=Ih(o.y,e.y,t),a.z=Ih(o.z,e.z,t),a.heading=o.heading+zh(e.heading-o.heading)*t,a.pitch=Ih(o.pitch,e.pitch,t),a.roll=o.roll+(e.roll-o.roll)*t;let s=e.ghostTime>0&&Math.floor(this._time*12)%2==0;this.shown=!e.eliminated&&!(e.finished&&e.player<0)&&!s,this.root.visible=this.shown,this._time+=n,this._body.position.set(a.x,a.y+(e.flipTime>0?.9:0),a.z),this._updateEffects(e,r,i);let c=i.shake*Math.min(1,Qg(e)/z_),l=(e,t)=>c*(Math.sin(this._time*e)+.6*Math.sin(this._time*t));this._body.rotation.set(-a.pitch+L_*l(41,67),a.heading,a.roll+L_*l(53,29)),this._body.position.y+=R_*Math.abs(l(37,59)),this._shadowOn=!e.airborne,this._shadow.visible=this._shadowOn&&this._fade>.6,this._shadow.position.set(a.x,a.y+.06,a.z),this._shadow.rotation.y=a.heading}_updateEffects(e,t,n){let r=t?e.slingStage:0,i=.8+.4*Math.abs(Math.sin(this._time*30));for(let e of this._sparks)e.visible=r>0,r>0&&(e.material=w_[r-1]),e.scale.setScalar(i*(.8+.25*r)),e.rotation.y=this._time*12;this._flame.visible=e.boostTime>0;let a=n.wildFlame?1+.5*Math.sin(this._time*40):1;this._flame.material=n.wildFlame?O_:D_,this._flame.scale.set(a,a,i*(n.longFlame?I_:1)),this._puffs.forEach((e,t)=>{if(e.visible=n.smoke,!n.smoke)return;let r=(this._time*1.8+t/A_)%1;e.position.set((t%2==0?1:-1)*.85,.3+r*.8,-1.4-r*2.6),e.scale.setScalar(.4+r*1.3)}),this._cans.forEach((e,t)=>{e.visible=n.cans,n.cans&&e.position.set((t-1)*.4,.15+Math.abs(Math.sin(this._time*14+t*1.7))*.3,-3.1-t*.45)}),this._scrape.forEach((t,n)=>{t.visible=e.scrapeTime>0,t.visible&&(t.position.set(-e.scrapeSide*1,.35+.2*Math.sin(this._time*50+n),.6-n*.6),t.scale.setScalar(.7+.5*Math.abs(Math.sin(this._time*37+n*2))))})}},V_=.2,H_=new WeakMap;function U_(e,t){let n={};for(let r of e){if(n[r.id])throw Error(`carta repetida: ${r.id}`);K_(t,r),n[r.id]=r}return n}function W_(e,t){if(!t||t.effects.length===0)return e;let n=H_.get(e);n||H_.set(e,n=new Map);let r=n.get(t.id);return r||n.set(t.id,r=K_(e,t)),r}var G_=(e,t,n)=>W_(e[n.tuningId],n.card?t[n.card]:void 0);function K_(e,t){let n={...e};for(let e of t.effects){let r=n[e.stat];if(e.mul===void 0&&e.add===void 0)throw Error(`carta ${t.id}: ${e.stat} sin mul ni add`);let i=t=>t*(e.mul??1)+(e.add??0);if(Array.isArray(r))n[e.stat]=r.map(i);else if(typeof r==`number`)n[e.stat]=i(r);else throw Error(`carta ${t.id}: ${e.stat} no es un número del auto`)}return n}function q_(e,t,n){let r=Object.values(e).filter(e=>t===`advantage`?e.kind!==`disadvantage`:e.kind===`disadvantage`).map(e=>e.id),i=n>>>0||1;for(let e=r.length-1;e>0;e--){i=Math.imul(i,1664525)+1013904223>>>0;let t=i%(e+1);[r[e],r[t]]=[r[t],r[e]]}return r.slice(0,3)}function J_(e,t,n,r,i){let a=Math.imul(i^2654435769,2654435761)^r*7919;for(let t=0;t<e.id.length;t++)a=Math.imul(a^e.id.charCodeAt(t),16777619);if(e.cardOffer=q_(t,n,a),e.pullSide=a>>>7&1?1:-1,e.player<0){let n=e.cardOffer.filter(e=>!t[e].botSkip),r=n.length>0?n:e.cardOffer;e.card=r[(a>>>11)%Math.max(r.length,1)]??null}else e.card=e.cardOffer[0]??null;e.cardSteerHeld=!0}function Y_(e,t,n){n!==void 0&&e.cardOffer[n]&&(e.card=e.cardOffer[n]);let r=t>V_?1:t<-.2?-1:0;if(r===0){e.cardSteerHeld=!1;return}if(e.cardSteerHeld||e.cardOffer.length===0)return;e.cardSteerHeld=!0;let i=Math.max(0,e.card?e.cardOffer.indexOf(e.card):0);e.card=e.cardOffer[Math.min(e.cardOffer.length-1,Math.max(0,i+r))]}var X_=(e,t)=>`${e}+${t}`;function Z_(e,t){let n={};for(let r of e.setups){let i=K_(t,r);for(let t of e.pilots){let e=X_(r.id,t.id);n[e]={...K_(i,t),id:e}}}return n}function Q_(e,t,n){let r=(e,t)=>e.some(e=>e.id===t),i=Number.isInteger(t?.skin)?(t.skin%n+n)%n:0;return{setup:r(e.setups,t?.setup)?t.setup:e.setups[0].id,pilot:r(e.pilots,t?.pilot)?t.pilot:e.pilots[0].id,skin:i}}function $_(e,t,n,r){let i=[],a=new Set;for(let e of t){let t=e.skin;for(;a.has(t);)t=(t+1)%n;a.add(t),i.push({tuningId:X_(e.setup,e.pilot),skin:t})}let o=r>>>0||1,s=0;for(let r=t.length;r<n;r++){o^=o<<13,o^=o>>>17,o^=o<<5,o>>>=0;let t=e.setups[o%e.setups.length].id,n=e.pilots[(o>>>8)%e.pilots.length].id;for(;a.has(s);)s++;a.add(s),i.push({tuningId:X_(t,n),skin:s})}return i}var ev={setups:[{id:`setup_balanced`,nameKey:`setup.setup_balanced.name`,textKey:`setup.setup_balanced.text`,effects:[]},{id:`setup_road`,nameKey:`setup.setup_road.name`,textKey:`setup.setup_road.text`,effects:[{stat:`maxSpeed`,mul:1.05},{stat:`strafeSpeed`,mul:.88}]},{id:`setup_agile`,nameKey:`setup.setup_agile.name`,textKey:`setup.setup_agile.text`,effects:[{stat:`strafeSpeed`,mul:1.15},{stat:`curvePush`,mul:.85},{stat:`maxSpeed`,mul:.97}]},{id:`setup_tank`,nameKey:`setup.setup_tank.name`,textKey:`setup.setup_tank.text`,effects:[{stat:`pushTaken`,mul:.6},{stat:`spinImpactSpeed`,mul:1.4},{stat:`flipImpactSpeed`,mul:1.3},{stat:`accel`,mul:.9}]}],pilots:[{id:`pilot_rain`,nameKey:`pilot.pilot_rain.name`,textKey:`pilot.pilot_rain.text`,effects:[{stat:`curvePush`,mul:.9}]},{id:`pilot_draft`,nameKey:`pilot.pilot_draft.name`,textKey:`pilot.pilot_draft.text`,effects:[{stat:`slingCharge`,mul:.8},{stat:`draftRange`,mul:1.2}]},{id:`pilot_gravel`,nameKey:`pilot.pilot_gravel.name`,textKey:`pilot.pilot_gravel.text`,effects:[{stat:`gravelSpeed`,add:.1},{stat:`dirtShake`,mul:.5}]},{id:`pilot_mechanic`,nameKey:`pilot.pilot_mechanic.name`,textKey:`pilot.pilot_mechanic.text`,effects:[{stat:`pitExitBoost`,add:.6}]},{id:`pilot_starter`,nameKey:`pilot.pilot_starter.name`,textKey:`pilot.pilot_starter.text`,effects:[{stat:`startBoost`,add:1}]},{id:`pilot_fox`,nameKey:`pilot.pilot_fox.name`,textKey:`pilot.pilot_fox.text`,effects:[{stat:`closeCallBoost`,add:.4}]}]},tv={id:`regions-phase3`,regions:[{id:`pampa`,nameKey:`region.pampa`,palette:{}},{id:`cuyo`,nameKey:`region.cuyo`,palette:{Grass:`Steppe`,Wheat:`Wheat`,Forest:`Grass`}},{id:`patagonia`,nameKey:`region.patagonia`,palette:{Grass:`Steppe`,Wheat:`Steppe`,RedRock:`Steppe`,SkyMid:`Water`,Horizon:`UiBg`}},{id:`norte`,nameKey:`region.norte`,palette:{Grass:`RedRock`,Steppe:`RedRock`,Forest:`Steppe`,Wheat:`Wheat`}},{id:`litoral`,nameKey:`region.litoral`,palette:{Wheat:`Grass`,Steppe:`Forest`,SkyMid:`Water`}},{id:`autodromo`,nameKey:`region.autodromo`,palette:{Wheat:`Grass`,Steppe:`Grass`,RedRock:`Grass`}}]},nv={id:`run-default`,podium:3,races:[{track:`race-01`,region:`pampa`},{track:`race-02`,region:`cuyo`},{track:`race-03`,region:`patagonia`},{track:`race-04`,region:`norte`},{track:`race-05`,region:`litoral`},{track:`race-06`,region:`autodromo`}]},rv=[{id:`race-01`,sampleStep:2,roadWidth:12,shoulder:7,segments:[{length:600,curve:0,hill:0},{length:50,curve:.03,hill:0},{length:250,curve:0,hill:0,width:15},{length:160,curve:-.008,hill:0},{length:400,curve:0,hill:0},{length:200,curve:0,hill:10,width:10,relief:{kind:`cut`,side:0}},{length:50,curve:-.032,hill:0},{length:300,curve:0,hill:0,surface:`gravel`,relief:{kind:`mesa`,side:1}},{length:120,curve:.01,hill:0,surface:`gravel`},{length:100,curve:0,hill:-6,surface:`gravel`},{length:600,curve:0,hill:0},{length:50,curve:.032,hill:0},{length:60,curve:-.03,hill:0},{length:200,curve:0,hill:4,width:10,relief:{kind:`ravine`,side:-1}},{length:120,curve:-.012,hill:0},{length:800,curve:0,hill:0,width:16},{length:60,curve:.03,hill:0},{length:120,curve:0,hill:0,width:10,relief:{kind:`cut`,side:1}},{length:50,curve:-.032,hill:0},{length:210,curve:0,hill:0}],pitLines:[1220,2530,3790],pitLaneLength:190,runoff:!0,obstacles:[{s:420,lateral:9,radius:1.5},{s:700,lateral:-9.5,radius:1.6},{s:740,lateral:-8.5,radius:1.3},{s:1060,lateral:9.5,radius:1.8},{s:1560,lateral:-9,radius:1.5},{s:1990,lateral:9,radius:1.4},{s:2100,lateral:-10,radius:1.8},{s:2890,lateral:9.5,radius:1.6},{s:3140,lateral:-9,radius:1.5},{s:3540,lateral:9,radius:1.7},{s:4300,lateral:-9.5,radius:1.5}]},{id:`race-02`,sampleStep:2,roadWidth:12,shoulder:7,segments:[{length:400,curve:0,hill:0},{length:60,curve:-.03,hill:0},{length:200,curve:0,hill:6,width:10,relief:{kind:`cut`,side:0}},{length:150,curve:.01,hill:0},{length:150,curve:-.01,hill:0},{length:260,curve:0,hill:0},{length:240,curve:0,hill:0},{length:60,curve:.028,hill:0},{length:150,curve:0,hill:-6,width:11,relief:{kind:`ravine`,side:1}},{length:120,curve:-.012,hill:0},{length:200,curve:0,hill:0,surface:`gravel`,width:15,relief:{kind:`mesa`,side:-1}},{length:80,curve:.02,hill:0,surface:`gravel`},{length:100,curve:0,hill:0,surface:`gravel`},{length:360,curve:0,hill:0},{length:240,curve:0,hill:0},{length:50,curve:-.032,hill:0},{length:150,curve:0,hill:5,width:10,relief:{kind:`cut`,side:-1}},{length:160,curve:.009,hill:0},{length:100,curve:0,hill:-5},{length:150,curve:0,hill:0,width:16},{length:60,curve:.025,hill:0},{length:350,curve:0,hill:0},{length:240,curve:0,hill:0},{length:200,curve:0,hill:0,width:11,relief:{kind:`ravine`,side:-1}},{length:60,curve:-.025,hill:0},{length:210,curve:0,hill:0}],pitLines:[1220,2530,3790],pitLaneLength:190,runoff:!0,obstacles:[{s:400,lateral:9,radius:1.4},{s:780,lateral:-9.5,radius:1.5},{s:1160,lateral:10,radius:1.5999999999999999},{s:1540,lateral:-9,radius:1.7},{s:1920,lateral:9.5,radius:1.4},{s:2300,lateral:-10,radius:1.5},{s:3060,lateral:-9.5,radius:1.7},{s:3440,lateral:10,radius:1.4},{s:4200,lateral:9.5,radius:1.5999999999999999}]},{id:`race-03`,sampleStep:2,roadWidth:12,shoulder:7,segments:[{length:700,curve:0,hill:0},{length:50,curve:.032,hill:0},{length:200,curve:0,hill:0,width:15},{length:270,curve:0,hill:0},{length:240,curve:0,hill:0},{length:150,curve:0,hill:0},{length:300,curve:0,hill:8,width:10,relief:{kind:`cut`,side:0}},{length:60,curve:-.03,hill:0},{length:200,curve:0,hill:-8,relief:{kind:`ravine`,side:1}},{length:200,curve:.006,hill:0},{length:160,curve:0,hill:0},{length:240,curve:0,hill:0},{length:150,curve:0,hill:0,width:11,relief:{kind:`mesa`,side:1}},{length:50,curve:-.03,hill:0},{length:250,curve:0,hill:0,width:16},{length:140,curve:.01,hill:0},{length:430,curve:0,hill:0},{length:240,curve:0,hill:0},{length:150,curve:0,hill:0,width:10,relief:{kind:`cut`,side:-1}},{length:60,curve:.03,hill:0},{length:260,curve:0,hill:0}],pitLines:[1220,2530,3790],pitLaneLength:190,runoff:!0,obstacles:[{s:400,lateral:9,radius:1.4},{s:780,lateral:-9.5,radius:1.5},{s:1160,lateral:10,radius:1.5999999999999999},{s:1540,lateral:-9,radius:1.7},{s:1920,lateral:9.5,radius:1.4},{s:2300,lateral:-10,radius:1.5},{s:3060,lateral:-9.5,radius:1.7},{s:3440,lateral:10,radius:1.4},{s:4200,lateral:9.5,radius:1.5999999999999999}]},{id:`race-04`,sampleStep:2,roadWidth:12,shoulder:7,segments:[{length:400,curve:0,hill:0},{length:60,curve:.028,hill:0},{length:250,curve:0,hill:8,surface:`gravel`,width:10,relief:{kind:`cut`,side:0}},{length:100,curve:-.014,hill:0,surface:`gravel`},{length:410,curve:0,hill:0},{length:240,curve:0,hill:0},{length:200,curve:0,hill:-6,surface:`gravel`,relief:{kind:`ravine`,side:-1}},{length:60,curve:.026,hill:0,surface:`gravel`},{length:150,curve:0,hill:0,surface:`gravel`,width:15},{length:120,curve:-.012,hill:0},{length:150,curve:0,hill:0,width:11,relief:{kind:`mesa`,side:1}},{length:60,curve:.03,hill:0},{length:330,curve:0,hill:0},{length:240,curve:0,hill:0},{length:250,curve:0,hill:5,surface:`gravel`,width:10,relief:{kind:`cut`,side:1}},{length:90,curve:-.02,hill:0,surface:`gravel`},{length:160,curve:0,hill:-5,surface:`gravel`},{length:150,curve:0,hill:0,width:16,relief:{kind:`mesa`,side:-1}},{length:50,curve:-.032,hill:0},{length:320,curve:0,hill:0},{length:240,curve:0,hill:0},{length:100,curve:0,hill:0,relief:{kind:`ravine`,side:1}},{length:60,curve:.03,hill:0},{length:310,curve:0,hill:0}],pitLines:[1220,2530,3790],pitLaneLength:190,runoff:!0,obstacles:[{s:400,lateral:9,radius:1.4},{s:780,lateral:-9.5,radius:1.5},{s:1160,lateral:10,radius:1.5999999999999999},{s:1540,lateral:-9,radius:1.7},{s:1920,lateral:9.5,radius:1.4},{s:2300,lateral:-10,radius:1.5},{s:3060,lateral:-9.5,radius:1.7},{s:3440,lateral:10,radius:1.4},{s:4200,lateral:9.5,radius:1.5999999999999999}]},{id:`race-05`,sampleStep:2,roadWidth:12,shoulder:7,segments:[{length:500,curve:0,hill:0},{length:50,curve:.032,hill:0},{length:50,curve:-.032,hill:0},{length:150,curve:0,hill:0,width:10,relief:{kind:`cut`,side:0}},{length:200,curve:.007,hill:0},{length:270,curve:0,hill:0,width:15},{length:240,curve:0,hill:0},{length:160,curve:-.009,hill:0},{length:50,curve:.03,hill:0},{length:150,curve:0,hill:0,width:11,relief:{kind:`ravine`,side:1}},{length:120,curve:.012,hill:0},{length:590,curve:0,hill:0,width:16,relief:{kind:`mesa`,side:-1}},{length:240,curve:0,hill:0},{length:50,curve:-.032,hill:0},{length:50,curve:.03,hill:0},{length:200,curve:0,hill:0,width:10,relief:{kind:`cut`,side:0}},{length:150,curve:-.01,hill:0},{length:570,curve:0,hill:0},{length:240,curve:0,hill:0},{length:150,curve:0,hill:0,relief:{kind:`mesa`,side:1}},{length:60,curve:.03,hill:0},{length:260,curve:0,hill:0}],pitLines:[1220,2530,3790],pitLaneLength:190,runoff:!0,obstacles:[{s:400,lateral:9,radius:1.4},{s:780,lateral:-9.5,radius:1.5},{s:1160,lateral:10,radius:1.5999999999999999},{s:1540,lateral:-9,radius:1.7},{s:1920,lateral:9.5,radius:1.4},{s:2300,lateral:-10,radius:1.5},{s:3060,lateral:-9.5,radius:1.7},{s:3440,lateral:10,radius:1.4},{s:4200,lateral:9.5,radius:1.5999999999999999}]},{id:`race-06`,sampleStep:2,roadWidth:14,shoulder:7,segments:[{length:550,curve:0,hill:0},{length:70,curve:.04,hill:0},{length:220,curve:0,hill:0,width:17},{length:110,curve:-.014,hill:0},{length:270,curve:0,hill:0},{length:240,curve:0,hill:0},{length:60,curve:-.04,hill:0},{length:250,curve:0,hill:0,width:11},{length:60,curve:.035,hill:0},{length:200,curve:0,hill:0,width:16,relief:{kind:`mesa`,side:1}},{length:150,curve:.012,hill:0},{length:350,curve:0,hill:0},{length:240,curve:0,hill:0},{length:60,curve:-.04,hill:0},{length:150,curve:0,hill:0,width:11},{length:300,curve:0,hill:0,width:17},{length:70,curve:.04,hill:0},{length:440,curve:0,hill:0},{length:240,curve:0,hill:0},{length:150,curve:0,hill:0,width:12},{length:60,curve:-.035,hill:0},{length:260,curve:0,hill:0}],pitLines:[1220,2530,3790],pitLaneLength:190,runoff:!0,obstacles:[{s:400,lateral:9,radius:1.4},{s:780,lateral:-9.5,radius:1.5},{s:1160,lateral:10,radius:1.5999999999999999},{s:1540,lateral:-9,radius:1.7},{s:1920,lateral:9.5,radius:1.4},{s:2300,lateral:-10,radius:1.5},{s:3060,lateral:-9.5,radius:1.7},{s:3440,lateral:10,radius:1.4},{s:4200,lateral:9.5,radius:1.5999999999999999}]}],iv=tv.regions,av=new Map,ov=nv,sv=ev;function cv(e){let t=av.get(e);if(!t){let n=rv.find(t=>t.id===e);if(!n)throw Error(`Content: no hay pista ${e}`);av.set(e,t=new zg(n))}return t}function lv(e){let t=iv.find(t=>t.id===e);if(!t)throw Error(`Content: no hay región ${e}`);let n={};for(let[e,r]of Object.entries(t.palette))n[e]=Uh[r];return{nameKey:t.nameKey,colors:n}}var uv={es:{"pit.choose.advantage":`Elegí tu ventaja`,"pit.choose.disadvantage":`Elegí tu desventaja`,"pit.hint":`Girá o tocá una carta para cambiar. Al salir queda la marcada.`,"pit.marked":`Marcada`,"card.kind.advantage":`Ventaja`,"card.kind.pact":`Pacto`,"card.kind.disadvantage":`Desventaja`,"card.adv_pinball.name":`Pinball`,"card.adv_pinball.text":`Pegar en el guardarraíl te rebota hacia adelante sin frenarte`,"card.adv_pit_launch.name":`Salida brava`,"card.adv_pit_launch.text":`Salís de boxes con un impulso`,"card.adv_revenge.name":`Revancha`,"card.adv_revenge.text":`Cada vez que te pasan, ganás un turbo corto`,"card.adv_easy_shoulder.name":`Banquina amiga`,"card.adv_easy_shoulder.text":`Salirte a la banquina casi no te frena`,"card.adv_last_breath.name":`Último aliento`,"card.adv_last_breath.text":`En zona de eliminación vas más rápido`,"card.pact_featherweight.name":`Pluma`,"card.pact_featherweight.text":`Aceleración y giro mejores, pero cualquier toque te desplaza mucho`,"card.pact_underdog.name":`Contra la corriente`,"card.pact_underdog.text":`Cuanto más cerca de la eliminación, más rápido; si vas primero, más lento`,"card.pact_draft_addict.name":`Adicto al rebufo`,"card.pact_draft_addict.text":`Rebufo muy fuerte, pero sin rebufo vas más lento`,"card.dis_pulling.name":`Tira de costado`,"card.dis_pulling.text":`El auto tira hacia un lado`,"card.dis_overheat.name":`Recalienta`,"card.dis_overheat.text":`A fondo mucho rato pierde potencia`,"card.dis_wild_turbo.name":`Turbo bravo`,"card.dis_wild_turbo.text":`El turbo empuja fuerte pero te descontrola`,"hud.pull.left":`Tira a la izquierda`,"hud.pull.right":`Tira a la derecha`,"hud.heat":`Calor`,"hud.overheated":`Recalentado`,"pit.pull.left":`Esta tira a la izquierda`,"pit.pull.right":`Esta tira a la derecha`,"hud.cross":`Cruzada`,"hud.sling":`Chupón`,"menu.title":`TYC`,"menu.run":`Correr`,"menu.back":`Volver al menú`,"result.title":`Resultado`,"result.you":`Vos`,"result.car":`Auto {n}`,"result.out":`afuera en boxes {n}`,"menu.run2":`Correr de a 2`,"run.title":`Carrera {n} de {total}: {region}`,"run.next":`Seguir`,"run.passed":`Pasaste a la siguiente carrera`,"run.won":`Ganaste la run`,"run.lost.podium":`Run terminada: había que llegar entre los {goal} primeros`,"run.lost.final":`Run terminada: en la final había que ganar`,"result.player":`Jugador {n}`,"region.pampa":`Pampa`,"region.cuyo":`Cuyo`,"region.patagonia":`Patagonia`,"region.norte":`Norte`,"region.litoral":`Litoral`,"region.autodromo":`Autódromo`,"menu.online":`En línea`,"net.title":`En línea`,"net.create":`Crear sala`,"net.join":`Unirse`,"net.code":`CÓDIGO`,"net.badCode":`El código tiene 4 letras`,"net.hosting":`Sala {code}: {n} de {max} jugadores. Pasales el código y largá cuando estén.`,"net.searching":`Buscando la sala {code}...`,"net.joined":`Estás en la sala {code} ({n} jugadores). Esperando que el host largue.`,"net.waitHost":`Esperando al host`,"menu.prototype":`PROTOTIPO EN DESARROLLO · versión {version}`,"menu.prototypeNote":`Gráficos, sonido y pistas son provisorios: muestran cómo se juega.`,"menu.sound":`Tecla M: sonido sí o no`,"hud.go":`¡Largada!`,"hud.soundTap":`Tocá la pantalla o una tecla para el sonido`,"card.adv_racing_line.name":`Línea ideal`,"card.adv_racing_line.text":`En cada curva aparece una línea; sobre ella la curva no te tira hacia afuera`,"card.adv_spin_master.name":`Trompo maestro`,"card.adv_spin_master.text":`Un trompo da la vuelta entera sin frenarte y salís con un turbo corto`,"card.adv_bowling.name":`Bolos`,"card.adv_bowling.text":`Si tocás de atrás a un rival durante un turbo, le hacés un trompo`,"card.adv_close_call.name":`Al límite`,"card.adv_close_call.text":`Rozar a un rival te da un turbo corto`,"card.pact_rocket.name":`Cohete`,"card.pact_rocket.text":`El turbo del chupón dura el triple, pero durante el turbo no podés doblar`,"card.dis_slick_tires.name":`Gomas lisas`,"card.dis_slick_tires.text":`La curva te tira el doble hacia afuera`,"card.dis_tin_cans.name":`Recién casados`,"card.dis_tin_cans.text":`Llevás latas atadas: quien va en tu rebufo carga el chupón el doble de rápido`,"card.dis_crooked_draft.name":`Chupón torcido`,"card.dis_crooked_draft.text":`El turbo del chupón sale solo si te abrís hacia el lado de la flecha`,"hud.steerLock":`Volante trabado`,"pick.title":`Armá tu auto`,"pick.player":`Jugador {n}`,"pick.model":`Modelo`,"pick.setup":`Setup`,"pick.pilot":`Piloto`,"pick.ready":`Listo`,"pick.waiting":`Listo. Esperando al otro jugador.`,"pick.modelName":`Colores {n}`,"setup.setup_balanced.name":`Equilibrado`,"setup.setup_balanced.text":`Sin puntos fuertes ni débiles`,"setup.setup_road.name":`Ruta`,"setup.setup_road.text":`Más punta en la recta, pero se mueve menos de costado`,"setup.setup_agile.name":`Ágil`,"setup.setup_agile.text":`Se mueve más de costado y la curva lo tira menos, pero tiene menos punta`,"setup.setup_tank.name":`Tanque`,"setup.setup_tank.text":`Cuesta empujarlo, trompearlo y volcarlo, pero acelera menos`,"pilot.pilot_rain.name":`Lluviero`,"pilot.pilot_rain.text":`La curva lo tira menos hacia afuera`,"pilot.pilot_draft.name":`Rebufero`,"pilot.pilot_draft.text":`Carga el chupón más rápido y toma rebufo desde más lejos`,"pilot.pilot_gravel.name":`Ripiero`,"pilot.pilot_gravel.text":`En el ripio pierde menos velocidad y en la tierra tiembla la mitad`,"pilot.pilot_mechanic.name":`Mecánico`,"pilot.pilot_mechanic.text":`Sale de boxes con un turbo corto`,"pilot.pilot_starter.name":`Largador`,"pilot.pilot_starter.text":`Larga con un segundo de turbo`,"pilot.pilot_fox.name":`Zorro`,"pilot.pilot_fox.text":`Rozar a otro de costado le da un turbo corto`},en:{"pit.choose.advantage":`Pick your advantage`,"pit.choose.disadvantage":`Pick your disadvantage`,"pit.hint":`Steer or tap a card to change. The marked card stays when you leave.`,"pit.marked":`Marked`,"card.kind.advantage":`Advantage`,"card.kind.pact":`Pact`,"card.kind.disadvantage":`Disadvantage`,"card.adv_pinball.name":`Pinball`,"card.adv_pinball.text":`Hitting the guardrail bounces you forward without slowing you down`,"card.adv_pit_launch.name":`Pit launch`,"card.adv_pit_launch.text":`You leave the pits with a push`,"card.adv_revenge.name":`Revenge`,"card.adv_revenge.text":`Every time someone passes you, you get a short turbo`,"card.adv_easy_shoulder.name":`Friendly shoulder`,"card.adv_easy_shoulder.text":`Running onto the shoulder barely slows you down`,"card.adv_last_breath.name":`Last breath`,"card.adv_last_breath.text":`You go faster in the elimination zone`,"card.pact_featherweight.name":`Featherweight`,"card.pact_featherweight.text":`Better acceleration and steering, but any bump pushes you far`,"card.pact_underdog.name":`Underdog`,"card.pact_underdog.text":`The closer to elimination, the faster; in first place, slower`,"card.pact_draft_addict.name":`Draft addict`,"card.pact_draft_addict.text":`Very strong slipstream, but without it you go slower`,"card.dis_pulling.name":`Pulling aside`,"card.dis_pulling.text":`The car pulls to one side`,"card.dis_overheat.name":`Overheating`,"card.dis_overheat.text":`Too long at full throttle loses power`,"card.dis_wild_turbo.name":`Wild turbo`,"card.dis_wild_turbo.text":`The turbo pushes hard but throws you off`,"hud.pull.left":`Pulls left`,"hud.pull.right":`Pulls right`,"hud.heat":`Heat`,"hud.overheated":`Overheated`,"pit.pull.left":`This one pulls left`,"pit.pull.right":`This one pulls right`,"hud.cross":`Slide`,"hud.sling":`Slingshot`,"menu.title":`TYC`,"menu.run":`Race`,"menu.back":`Back to menu`,"result.title":`Results`,"result.you":`You`,"result.car":`Car {n}`,"result.out":`out at pit {n}`,"menu.run2":`Race with 2`,"run.title":`Race {n} of {total}: {region}`,"run.next":`Continue`,"run.passed":`You made it to the next race`,"run.won":`You won the run`,"run.lost.podium":`Run over: you had to finish in the top {goal}`,"run.lost.final":`Run over: you had to win the final`,"result.player":`Player {n}`,"region.pampa":`Pampas`,"region.cuyo":`Cuyo`,"region.patagonia":`Patagonia`,"region.norte":`North`,"region.litoral":`Littoral`,"region.autodromo":`Speedway`,"menu.online":`Online`,"net.title":`Online`,"net.create":`Create room`,"net.join":`Join`,"net.code":`CODE`,"net.badCode":`The code has 4 letters`,"net.hosting":`Room {code}: {n} of {max} players. Share the code and start when everyone is in.`,"net.searching":`Looking for room {code}...`,"net.joined":`You are in room {code} ({n} players). Waiting for the host to start.`,"net.waitHost":`Waiting for the host`,"menu.prototype":`PROTOTYPE IN DEVELOPMENT · version {version}`,"menu.prototypeNote":`Graphics, sound and tracks are placeholders: they show how it plays.`,"menu.sound":`M key: sound on or off`,"hud.go":`Go!`,"hud.soundTap":`Tap the screen or press a key for sound`,"card.adv_racing_line.name":`Racing line`,"card.adv_racing_line.text":`A line shows up in every corner; on it, the corner does not push you out`,"card.adv_spin_master.name":`Spin master`,"card.adv_spin_master.text":`A spin goes all the way round without slowing you, and you come out with a short boost`,"card.adv_bowling.name":`Bowling`,"card.adv_bowling.text":`Hit a rival from behind during a boost and you spin them`,"card.adv_close_call.name":`Close call`,"card.adv_close_call.text":`Scraping a rival gives you a short boost`,"card.pact_rocket.name":`Rocket`,"card.pact_rocket.text":`The slingshot boost lasts three times as long, but you cannot steer during a boost`,"card.dis_slick_tires.name":`Slick tires`,"card.dis_slick_tires.text":`Corners push you out twice as hard`,"card.dis_tin_cans.name":`Just married`,"card.dis_tin_cans.text":`Tin cans tied behind you: whoever drafts you charges the slingshot twice as fast`,"card.dis_crooked_draft.name":`Crooked slingshot`,"card.dis_crooked_draft.text":`The slingshot boost only fires if you pull out toward the arrow side`,"hud.steerLock":`Wheel locked`,"pick.title":`Build your car`,"pick.player":`Player {n}`,"pick.model":`Model`,"pick.setup":`Setup`,"pick.pilot":`Driver`,"pick.ready":`Ready`,"pick.waiting":`Ready. Waiting for the other player.`,"pick.modelName":`Colors {n}`,"setup.setup_balanced.name":`Balanced`,"setup.setup_balanced.text":`No strong or weak points`,"setup.setup_road.name":`Road`,"setup.setup_road.text":`Higher top speed, but moves less sideways`,"setup.setup_agile.name":`Agile`,"setup.setup_agile.text":`Moves more sideways and curves push it less, but lower top speed`,"setup.setup_tank.name":`Tank`,"setup.setup_tank.text":`Hard to push, spin or flip, but slower to accelerate`,"pilot.pilot_rain.name":`Rain master`,"pilot.pilot_rain.text":`Curves push it less to the outside`,"pilot.pilot_draft.name":`Drafter`,"pilot.pilot_draft.text":`Charges the slingshot faster and drafts from farther away`,"pilot.pilot_gravel.name":`Gravel ace`,"pilot.pilot_gravel.text":`Loses less speed on gravel and shakes half as much on dirt`,"pilot.pilot_mechanic.name":`Mechanic`,"pilot.pilot_mechanic.text":`Leaves the pits with a short turbo`,"pilot.pilot_starter.name":`Launcher`,"pilot.pilot_starter.text":`Starts the race with one second of turbo`,"pilot.pilot_fox.name":`Fox`,"pilot.pilot_fox.text":`Grazing another car from the side gives a short turbo`}};function dv(){let e=new URLSearchParams(location.search).get(`lang`);return e===`es`||e===`en`?e:navigator.language.toLowerCase().startsWith(`en`)?`en`:`es`}var fv=dv(),$=e=>uv[fv][e]??e,pv=[`skin`,`setup`,`pilot`],mv={arrows:{up:[`ArrowUp`],down:[`ArrowDown`],left:[`ArrowLeft`],right:[`ArrowRight`],ready:[`Enter`]},wasd:{up:[`KeyW`],down:[`KeyS`],left:[`KeyA`],right:[`KeyD`],ready:[`Space`]},both:{up:[`ArrowUp`,`KeyW`],down:[`ArrowDown`,`KeyS`],left:[`ArrowLeft`,`KeyA`],right:[`ArrowRight`,`KeyD`],ready:[`Enter`,`Space`]}},hv={up:12,down:13,left:14,right:15,ready:0},gv=e=>`tyc.pick.${e}`;function _v(e){let t=null;try{t=JSON.parse(localStorage.getItem(gv(e))??`null`)}catch{t=null}return Q_(sv,t??{skin:e},x_.length)}var vv=class{_slot;_keys;_pad;_withReady;el=document.createElement(`div`);value;ready=!1;onChange=()=>{};onReady=()=>{};_row=0;_values=new Map;_texts=new Map;_rowEls=new Map;_swatch=document.createElement(`span`);_readyBtn=document.createElement(`button`);_status=document.createElement(`div`);_padWas=[];constructor(e,t,n,r,i=!0){if(this._slot=e,this._keys=n,this._pad=r,this._withReady=i,this.value=_v(e),this.el.className=`pick-panel panel`,t){let e=document.createElement(`h3`);e.textContent=t,this.el.append(e)}for(let e of pv)this.el.append(this._buildRow(e));this._swatch.className=`pick-swatch`,this._readyBtn.className=`pill pick-ready`,this._readyBtn.textContent=$(`pick.ready`),this._readyBtn.addEventListener(`click`,()=>this._setReady()),this._status.className=`pick-status`,i&&this.el.append(this._readyBtn,this._status),this._show()}key(e){if(!this._keys||this.ready)return!1;let t=mv[this._keys];if(t.up.includes(e))this._move(-1);else if(t.down.includes(e))this._move(1);else if(t.left.includes(e))this._change(pv[this._row],-1);else if(t.right.includes(e))this._change(pv[this._row],1);else if(t.ready.includes(e)&&this._withReady)this._setReady();else return!1;return!0}pollPad(){if(this._pad===null)return;let e=navigator.getGamepads()[this._pad];if(!e)return;let t=t=>e.buttons[t]?.pressed??!1,n=e=>{let n=this._padWas[e]??!0;return this._padWas[e]=t(e),t(e)&&!n};if(this.ready)for(let e of Object.values(hv))n(e);else n(hv.up)&&this._move(-1),n(hv.down)&&this._move(1),n(hv.left)&&this._change(pv[this._row],-1),n(hv.right)&&this._change(pv[this._row],1),n(hv.ready)&&this._withReady&&this._setReady()}_buildRow(e){let t=document.createElement(`div`);t.className=`pick-row`;let n=document.createElement(`div`);n.className=`pick-label`,n.textContent=$(`pick.${e===`skin`?`model`:e}`);let r=document.createElement(`button`),i=document.createElement(`button`);r.className=i.className=`pill pick-arrow`,r.textContent=`◀`,i.textContent=`▶`,r.addEventListener(`click`,()=>this._change(e,-1)),i.addEventListener(`click`,()=>this._change(e,1));let a=document.createElement(`div`);a.className=`pick-value`;let o=document.createElement(`div`);o.className=`pick-text`;let s=document.createElement(`div`);return s.className=`pick-line`,s.append(r,a,i),t.append(n,s,o),t.addEventListener(`pointerdown`,()=>{this._row=pv.indexOf(e),this._show()}),this._values.set(e,a),this._texts.set(e,o),this._rowEls.set(e,t),t}_move(e){this._row=(this._row+e+pv.length)%pv.length,this._show()}_change(e,t){if(this.ready)return;let n=this.value;if(e===`skin`)n.skin=(n.skin+t+x_.length)%x_.length;else{let r=e===`setup`?sv.setups:sv.pilots;n[e]=r[(r.findIndex(t=>t.id===n[e])+t+r.length)%r.length].id}try{localStorage.setItem(gv(this._slot),JSON.stringify(n))}catch{}this._show(),this.onChange()}_setReady(){this.ready||(this.ready=!0,this._show(),this.onReady())}showWaiting(e){this._status.textContent=e}_show(){let e=this.value,t=x_[e.skin];this._swatch.style.background=t.CarBody??``,this._swatch.style.color=t.CarAccent??``,this._swatch.textContent=String(Dg(e.skin)),this._values.get(`skin`).replaceChildren(this._swatch,document.createTextNode($(`pick.modelName`).replace(`{n}`,String(e.skin+1)))),this._texts.get(`skin`).textContent=``;let n=sv.setups.find(t=>t.id===e.setup),r=sv.pilots.find(t=>t.id===e.pilot);this._values.get(`setup`).textContent=$(n.nameKey),this._texts.get(`setup`).textContent=$(n.textKey),this._values.get(`pilot`).textContent=$(r.nameKey),this._texts.get(`pilot`).textContent=$(r.textKey),pv.forEach((e,t)=>this._rowEls.get(e).classList.toggle(`focus`,this._keys!==null&&!this.ready&&t===this._row)),this.el.classList.toggle(`ready`,this.ready),this._readyBtn.hidden=this.ready,this.ready||(this._status.textContent=``)}},yv=class{_onHostRun;_onGuest;_onBack;_root;_panel;_status;_code;_run;_choose;_pickBox;_pick=null;_polling=!1;_room=null;constructor(e,t,n,r){this._onHostRun=t,this._onGuest=n,this._onBack=r;let i=t=>{let n=e.querySelector(t);if(!n)throw Error(`LobbyScreen: falta ${t}`);return n};this._root=e,this._panel=i(`#lobby`),this._status=i(`#lobby-status`),this._code=i(`#lobby-code`),this._run=i(`#lobby-run`),this._choose=i(`#lobby-choose`),this._pickBox=i(`#lobby-pick`),i(`#lobby-title`).textContent=$(`net.title`);let a=i(`#lobby-create`),o=i(`#lobby-join`),s=i(`#lobby-back`);a.textContent=$(`net.create`),o.textContent=$(`net.join`),this._run.textContent=$(`menu.run`),s.textContent=$(`menu.back`),this._code.placeholder=$(`net.code`),a.addEventListener(`click`,()=>this._host()),o.addEventListener(`click`,()=>this._join()),this._run.addEventListener(`click`,()=>this._start()),s.addEventListener(`click`,()=>this._back()),window.addEventListener(`keydown`,e=>{!this._pick||this._panel.hidden||e.repeat||e.target instanceof HTMLInputElement||this._pick.key(e.code)&&e.preventDefault()})}show(){this._panel.hidden=!1,this._choose.hidden=!1,this._run.hidden=!0,this._status.textContent=``,this._pickBox.replaceChildren(),this._pick=null,this._root.classList.add(`in-menu`)}hide(){this._panel.hidden=!0,this._root.classList.remove(`in-menu`)}_host(){let e=Ai.host();this._room=e,this._choose.hidden=!0,this._run.hidden=!1;let t=t=>{this._status.textContent=$(`net.hosting`).replace(`{code}`,e.code).replace(`{n}`,String(t.length)).replace(`{max}`,`4`)};e.onLobby=t,t(e.players),this._showPick()}_join(){let e=this._code.value.trim();if(e.length!==4){this._status.textContent=$(`net.badCode`);return}let t=Ai.join(e);this._room=t,this._choose.hidden=!0,this._status.textContent=$(`net.searching`).replace(`{code}`,t.code);let n=this._showPick();n.onChange=()=>t.sendPick(n.value),t.onLobby=e=>{this._status.textContent=$(`net.joined`).replace(`{code}`,t.code).replace(`{n}`,String(e.length)),t.sendPick(n.value)},this._onGuest(t);let r=t.onStart;t.onStart=e=>{this.hide(),r(e)}}_start(){this._room&&this._pick&&(this.hide(),this._onHostRun(this._room,{...this._pick.value}),this._room=null)}_showPick(){let e=new vv(0,``,`both`,0,!1);return this._pick=e,this._pickBox.replaceChildren(e.el),this._polling||requestAnimationFrame(this._pollPad),this._polling=!0,e}_pollPad=()=>{!this._pick||this._panel.hidden?this._polling=!1:(this._pick.pollPad(),requestAnimationFrame(this._pollPad))};_back(){this._room?.leave(),this._room=null,this.hide(),this._onBack()}},bv=`0.5.3`,xv=class{_onRun;_onOnline;_root;_menu;_open=!1;constructor(e,t,n){this._onRun=t,this._onOnline=n;let r=e.querySelector(`#menu`),i=e.querySelector(`#menu-run`),a=e.querySelector(`#menu-run-2`);if(!r||!i||!a)throw Error(`MenuScreen: faltan #menu, #menu-run o #menu-run-2`);this._root=e,this._menu=r,e.querySelector(`#menu-title`).textContent=$(`menu.title`),e.querySelector(`#menu-proto-tag`).textContent=$(`menu.prototype`).replace(`{version}`,bv),e.querySelector(`#menu-proto-note`).textContent=$(`menu.prototypeNote`),e.querySelector(`#menu-sound`).textContent=$(`menu.sound`),i.textContent=$(`menu.run`),a.textContent=$(`menu.run2`),i.addEventListener(`click`,()=>this._run(1)),a.addEventListener(`click`,()=>this._run(2));let o=e.querySelector(`#menu-online`);if(!o)throw Error(`MenuScreen: falta #menu-online`);o.textContent=$(`menu.online`),o.addEventListener(`click`,()=>{this._open&&(this._open=!1,this._menu.hidden=!0,this._onOnline())}),window.addEventListener(`keydown`,e=>{(e.code===`Enter`||e.code===`Space`)&&this._run(1)}),requestAnimationFrame(this._pollPad)}show(){this._open=!0,this._menu.hidden=!1,this._root.classList.add(`in-menu`)}_run(e){this._open&&(this._open=!1,this._menu.hidden=!0,this._root.classList.remove(`in-menu`),this._onRun(e))}_pollPad=()=>{this._open&&[...navigator.getGamepads()].some(e=>e?.buttons[0]?.pressed)&&this._run(1),requestAnimationFrame(this._pollPad)}},Sv=250,Cv=[[],[`both`],[`wasd`,`arrows`]],wv=class{_root;_el;_list;_panels=[];_done=null;_openAt=0;constructor(e){let t=e.querySelector(`#pick`),n=e.querySelector(`#pick-list`);if(!t||!n)throw Error(`PickScreen: faltan #pick o #pick-list`);this._root=e,this._el=t,this._list=n,e.querySelector(`#pick-title`).textContent=$(`pick.title`),window.addEventListener(`keydown`,e=>{!this._done||e.repeat||performance.now()-this._openAt<Sv||this._panels.some(t=>t.key(e.code))&&e.preventDefault()}),requestAnimationFrame(this._poll)}open(e,t){let n=Cv[e]??Cv[1];this._panels=Array.from({length:e},(t,r)=>{let i=new vv(r,e>1?$(`pick.player`).replace(`{n}`,String(r+1)):``,n[r],r);return i.onReady=()=>this._check(),i}),this._list.replaceChildren(...this._panels.map(e=>e.el)),this._done=t,this._openAt=performance.now(),this._el.hidden=!1,this._root.classList.add(`in-menu`)}hide(){this._done=null,this._el.hidden=!0,this._root.classList.remove(`in-menu`)}_check(){if(!this._done)return;let e=this._panels.filter(e=>!e.ready);for(let t of this._panels)t.ready&&e.length>0&&t.showWaiting($(`pick.waiting`));if(e.length>0)return;let t=this._done,n=this._panels.map(e=>({...e.value}));this.hide(),t(n)}_poll=()=>{if(this._done)for(let e of this._panels)e.pollPad();requestAnimationFrame(this._poll)}},Tv=class{_last={steer:0,throttle:0,brake:0};_pick;receive(e){this._last.steer=e.steer,this._last.throttle=e.throttle,this._last.brake=e.brake,e.cardPick!==void 0&&(this._pick=e.cardPick)}clear(){this._last.steer=0,this._last.throttle=0,this._last.brake=0,this._pick=void 0}read(e){e.steer=this._last.steer,e.throttle=this._last.throttle,e.brake=this._last.brake,e.cardPick=this._pick,this._pick=void 0}},Ev=()=>({race:0,status:`racing`,places:[]});function Dv(e){let t=null;for(let n of e.cars)n.player<0||!n.finished||(t===null||n.place<t)&&(t=n.place);return t}function Ov(e,t,n){e.places[e.race]=n;let r=e.race===t.races.length-1,i=r?1:t.podium;e.status=n===null||n>i?`lost`:r?`won`:`next`}function kv(e){e.status===`next`&&(e.race++,e.status=`racing`)}var Av=1/60,jv=5,Mv=class{_acc=0;alpha=0;advance(e){this._acc+=Math.min(Math.max(e,0),Av*jv);let t=Math.floor(this._acc/Av);return t>jv&&(t=jv),this._acc-=t*Av,this.alpha=this._acc/Av,t}reset(){this._acc=0,this.alpha=0}},Nv=`x.y.z.heading.pitch.roll.vx.vz.place.draft.boostTime.flipTime.ghostTime.slingCharge.slingStage.pitClock.pitOrder.nextPit.pullSide.heat.finishTime.eliminatedAt.s.lateral.spinTime.scrapeTime.scrapeSide.draftLead`.split(`.`),Pv=[`drifting`,`airborne`,`inPit`,`finished`,`eliminated`,`skidding`,`onDirt`],Fv=e=>Math.round(e*1e3)/1e3;function Iv(e){return{tick:e.tick,entered:e.pits.map(e=>e.entered),cars:e.cars.map(e=>{let t=0;return Pv.forEach((n,r)=>{e[n]&&(t|=1<<r)}),[Nv.map(t=>Fv(e[t])),t,e.card,e.cardOffer.join(`,`)]})}}function Lv(e,t){e.tick=t.tick,e.time=t.tick*Av,t.entered.forEach((t,n)=>{e.pits[n]&&(e.pits[n].entered=t)}),t.cars.forEach(([t,n,r,i],a)=>{let o=e.cars[a];o&&(b_(o,o.prev),Nv.forEach((e,n)=>o[e]=t[n]),Pv.forEach((e,t)=>o[e]=!!(n&1<<t)),o.card=r,o.cardOffer=i?i.split(`,`):[])})}var Rv=.7,zv=3,Bv=10,Vv=6,Hv=38,Uv=.05,Wv=90,Gv=`tyc.muted`,Kv=class{out;pan;_main;_sub;_beat;_filter;_lastSpeed=0;_load=0;_car=-1;constructor(e,t,n){this._main=e.createOscillator(),this._main.type=`sawtooth`,this._sub=e.createOscillator(),this._sub.type=`square`,this._beat=e.createOscillator(),this._beat.type=`sawtooth`;let r=e.createWaveShaper();r.curve=n,this._filter=e.createBiquadFilter(),this._filter.type=`lowpass`,this.out=e.createGain(),this.out.gain.value=0,this.pan=e.createStereoPanner();let i=e.createGain();i.gain.value=.35;for(let e of[this._main,this._sub,this._beat])e.connect(i),e.start();i.connect(r).connect(this._filter).connect(this.out).connect(this.pan).connect(t)}set(e,t,n,r,i,a,o){t!==this._car&&(this._car=t,this._lastSpeed=n);let s=o>0?(n-this._lastSpeed)/o:0;this._lastSpeed=n,this._load+=((s>.5?1:.25)-this._load)*Math.min(1,o*6);let c=Fh(r,0,1)*Vv,l=Math.min(5,Math.floor(c)),u=.3+.7*(c-l)*(.75+l/Vv*.25),d=Hv+112*u,f=e.currentTime;this._main.frequency.setTargetAtTime(d,f,Uv),this._sub.frequency.setTargetAtTime(d*.5,f,Uv),this._beat.frequency.setTargetAtTime(d*1.012,f,Uv),this._filter.frequency.setTargetAtTime(260+1500*this._load*(.4+u),f,Uv),this.out.gain.setTargetAtTime(i*(.55+.45*this._load),f,Uv),this.pan.pan.setTargetAtTime(a,f,Uv)}mute(e){this.out.gain.setTargetAtTime(0,e.currentTime,Uv),this._car=-1}},qv=class{gain;constructor(e,t,n,r,i,a){let o=e.createBufferSource();o.buffer=t,o.loop=!0,o.start(0,Math.random()*t.duration);let s=e.createBiquadFilter();s.type=r,s.frequency.value=i,s.Q.value=a,this.gain=e.createGain(),this.gain.gain.value=0,o.connect(s).connect(this.gain).connect(n)}set(e,t){this.gain.gain.setTargetAtTime(t,e.currentTime,Uv*2)}},Jv=class{_graph=null;_muted=Qv();_silent=!0;_boosting=new Map;_crowdTime=0;constructor(){let e=()=>{this._start(),this._graph?.ctx.state===`suspended`&&this._graph.ctx.resume()};window.addEventListener(`pointerdown`,e),window.addEventListener(`keydown`,t=>{e(),t.code===`KeyM`&&this.toggleMute()})}get muted(){return this._muted}get locked(){return!this._graph||this._graph.ctx.state!==`running`}toggleMute(){this._muted=!this._muted;try{localStorage.setItem(Gv,this._muted?`1`:`0`)}catch{}this._applyMaster()}beep(e){let t=this._graph;if(!t)return;let n=t.ctx.createOscillator();n.type=`square`,n.frequency.value=e?1046:523;let r=t.ctx.createGain(),i=t.ctx.currentTime,a=e?.6:.18;r.gain.setValueAtTime(1e-4,i),r.gain.exponentialRampToValueAtTime(.22,i+.01),r.gain.exponentialRampToValueAtTime(1e-4,i+a),n.connect(r).connect(t.master),n.start(i),n.stop(i+a+.05)}update(e,t,n,r,i){let a=this._graph;if(!a)return;this._silent=!1;let o=e.cars,s=r.length>1,c=0,l=0,u=0,d=0;a.own.forEach((e,f)=>{let p=r[f];if(p===void 0)return e.mute(a.ctx);let m=o[p],h=Qg(m),g=h/n[m.tuningId].maxSpeed,_=!m.eliminated&&!m.finished;e.set(a.ctx,p,h,g,_?.5:.2,s?f===0?-.6:.6:0,i),m.drifting&&h>8&&(c=Math.max(c,.22)),m.skidding&&h>8&&(c=Math.max(c,.26)),m.spinTime>0&&h>5&&(c=Math.max(c,.35)),m.onGravel&&h>5&&(l=Math.max(l,.35*Math.min(1,g*1.5))),u=Math.max(u,.1*g*g),d=Math.max(d,Yv(t,m.s)),this._turbo(a,p,m.boostTime>0,s?f===0?-.6:.6:0)});for(let e=r.length;e<a.own.length;e++)a.own[e].mute(a.ctx);this._rivals(a,o,n,r,i),a.tires.set(a.ctx,c),a.gravel.set(a.ctx,l),a.wind.set(a.ctx,u),this._crowdTime+=i,a.crowd.set(a.ctx,d*(.8+.2*Math.sin(this._crowdTime*2.3)))}silence(){let e=this._graph;if(e&&!this._silent){this._silent=!0;for(let t of[...e.own,...e.rivals])t.mute(e.ctx);for(let t of[e.tires,e.gravel,e.wind,e.crowd])t.set(e.ctx,0);this._boosting.clear()}}_rivals(e,t,n,r,i){let a=[];t.forEach((e,n)=>{if(r.includes(n)||e.eliminated||e.finished||e.inPit)return;let i=1/0,o=0;for(let n of r){let r=t[n],a=e.x-r.x,s=e.z-r.z,c=Math.hypot(a,s);c<i&&(i=c,o=Fh((-a*Math.cos(r.heading)+s*Math.sin(r.heading))/12,-.8,.8))}a.push({i:n,d:i,pan:o})}),a.sort((e,t)=>e.d-t.d),e.rivals.forEach((r,o)=>{let s=a[o];if(!s||s.d>120)return r.mute(e.ctx);let c=t[s.i],l=Qg(c),u=.3/(1+s.d/Bv);r.set(e.ctx,s.i,l,l/n[c.tuningId].maxSpeed,u,s.pan,i)})}_turbo(e,t,n,r){let i=this._boosting.get(t)??!1;if(this._boosting.set(t,n),!n||i)return;let a=e.ctx.createBufferSource();a.buffer=e.noise;let o=e.ctx.createBiquadFilter();o.type=`bandpass`,o.Q.value=1.2;let s=e.ctx.createGain(),c=e.ctx.createStereoPanner();c.pan.value=r;let l=e.ctx.currentTime;o.frequency.setValueAtTime(300,l),o.frequency.exponentialRampToValueAtTime(3200,l+.7),s.gain.setValueAtTime(1e-4,l),s.gain.exponentialRampToValueAtTime(.35,l+.08),s.gain.exponentialRampToValueAtTime(1e-4,l+.9),a.connect(o).connect(s).connect(c).connect(e.master),a.start(l,Math.random()*(e.noise.duration-1)),a.stop(l+1)}_start(){if(this._graph)return;let e=new AudioContext,t=e.createGain(),n=e.createDynamicsCompressor();t.connect(n).connect(e.destination);let r=Xv(e),i=Zv();this._graph={ctx:e,master:t,noise:r,own:[new Kv(e,t,i),new Kv(e,t,i)],rivals:Array.from({length:zv},()=>new Kv(e,t,i)),tires:new qv(e,r,t,`bandpass`,2200,5),gravel:new qv(e,r,t,`lowpass`,520,.7),wind:new qv(e,r,t,`bandpass`,450,.6),crowd:new qv(e,r,t,`bandpass`,950,.5)},this._applyMaster()}_applyMaster(){let e=this._graph;e&&e.master.gain.setTargetAtTime(this._muted?0:Rv,e.ctx.currentTime,.02)}};function Yv(e,t){let n=Math.min(Math.abs(t),Math.abs(e.raceLength-t));for(let r of e.pitLines)n=t>=r&&t<=r+e.pitLaneLength?0:Math.min(n,Math.abs(t-r),Math.abs(t-r-e.pitLaneLength));return n>Wv?0:.3*(1-n/Wv)}function Xv(e){let t=e.createBuffer(1,e.sampleRate*2,e.sampleRate),n=t.getChannelData(0);for(let e=0;e<n.length;e++)n[e]=Math.random()*2-1;return t}function Zv(){let e=new Float32Array(256);for(let t=0;t<256;t++){let n=t/255*2-1;e[t]=Math.tanh(n*2.5)}return e}function Qv(){try{return localStorage.getItem(Gv)===`1`}catch{return!1}}var $v={id:`cards-phase2`,cards:[{id:`adv_pinball`,kind:`advantage`,nameKey:`card.adv_pinball.name`,textKey:`card.adv_pinball.text`,effects:[{stat:`barrierBounce`,add:1}]},{id:`adv_pit_launch`,kind:`advantage`,nameKey:`card.adv_pit_launch.name`,textKey:`card.adv_pit_launch.text`,effects:[{stat:`pitExitBoost`,add:1.2}]},{id:`adv_revenge`,kind:`advantage`,nameKey:`card.adv_revenge.name`,textKey:`card.adv_revenge.text`,effects:[{stat:`passedBoost`,add:.5}]},{id:`adv_easy_shoulder`,kind:`advantage`,nameKey:`card.adv_easy_shoulder.name`,textKey:`card.adv_easy_shoulder.text`,effects:[{stat:`offroadMaxSpeed`,mul:1.9},{stat:`offroadDrag`,mul:.3}]},{id:`adv_last_breath`,kind:`advantage`,nameKey:`card.adv_last_breath.name`,textKey:`card.adv_last_breath.text`,effects:[{stat:`zoneSpeed`,mul:1.08}]},{id:`adv_racing_line`,kind:`advantage`,nameKey:`card.adv_racing_line.name`,textKey:`card.adv_racing_line.text`,effects:[{stat:`racingLine`,add:1}]},{id:`adv_spin_master`,kind:`advantage`,nameKey:`card.adv_spin_master.name`,textKey:`card.adv_spin_master.text`,effects:[{stat:`spinDrag`,mul:0},{stat:`spinExitBoost`,add:.8}]},{id:`adv_bowling`,kind:`advantage`,nameKey:`card.adv_bowling.name`,textKey:`card.adv_bowling.text`,effects:[{stat:`bowling`,add:1}]},{id:`adv_close_call`,kind:`advantage`,nameKey:`card.adv_close_call.name`,textKey:`card.adv_close_call.text`,effects:[{stat:`closeCallBoost`,add:.7}]},{id:`pact_featherweight`,kind:`pact`,nameKey:`card.pact_featherweight.name`,textKey:`card.pact_featherweight.text`,effects:[{stat:`accel`,mul:1.2},{stat:`strafeSpeed`,mul:1.15},{stat:`pushTaken`,mul:2.5}]},{id:`pact_underdog`,kind:`pact`,nameKey:`card.pact_underdog.name`,textKey:`card.pact_underdog.text`,effects:[{stat:`underdogSpeed`,add:.08}]},{id:`pact_draft_addict`,kind:`pact`,nameKey:`card.pact_draft_addict.name`,textKey:`card.pact_draft_addict.text`,effects:[{stat:`draftBoost`,add:.1},{stat:`noDraftSpeed`,mul:.96}]},{id:`pact_rocket`,kind:`pact`,nameKey:`card.pact_rocket.name`,textKey:`card.pact_rocket.text`,effects:[{stat:`slingTime`,mul:3},{stat:`turboSteerLock`,add:1}]},{id:`dis_pulling`,kind:`disadvantage`,nameKey:`card.dis_pulling.name`,textKey:`card.dis_pulling.text`,effects:[{stat:`steerPull`,add:.12}]},{id:`dis_overheat`,kind:`disadvantage`,nameKey:`card.dis_overheat.name`,textKey:`card.dis_overheat.text`,effects:[{stat:`overheatTime`,add:4},{stat:`overheatSpeed`,mul:.88}]},{id:`dis_wild_turbo`,kind:`disadvantage`,nameKey:`card.dis_wild_turbo.name`,textKey:`card.dis_wild_turbo.text`,effects:[{stat:`turboAccel`,mul:1.5},{stat:`boostWobble`,add:5}]},{id:`dis_slick_tires`,kind:`disadvantage`,nameKey:`card.dis_slick_tires.name`,textKey:`card.dis_slick_tires.text`,effects:[{stat:`curvePush`,mul:2}]},{id:`dis_tin_cans`,kind:`disadvantage`,nameKey:`card.dis_tin_cans.name`,textKey:`card.dis_tin_cans.text`,effects:[{stat:`draftGift`,mul:2}]},{id:`dis_crooked_draft`,kind:`disadvantage`,nameKey:`card.dis_crooked_draft.name`,textKey:`card.dis_crooked_draft.text`,effects:[{stat:`crookedDraft`,add:1}]}]},ey={id:`car-default`,maxSpeed:52,accel:20,brake:28,reverseAccel:8,reverseMax:8,rollDrag:.08,offroadMaxSpeed:24,offroadDrag:.6,strafeSpeed:10,strafeResponse:6,curvePush:.85,yawLook:.6,driftMinSpeed:18,crossPush:.35,driftSlip:.45,driftSlipRate:2.5,driftStartWindow:.2,driftDrag:14,driftEaseTime:.25,slingCharge:[.8,1.8,3],slingTime:[.6,1.1,1.7],turboBoost:1.18,turboAccel:12,draftRange:30,draftWidth:2.6,draftBoost:1.1,draftBuild:1.6,gravelSpeed:.85,dirtShake:1,spinImpactSpeed:8,flipImpactSpeed:16,spinTime:1,spinDrag:20,landFlipSpeed:20,radius:1.3,barrierBounce:0,pitExitBoost:0,passedBoost:0,startBoost:0,zoneSpeed:1,underdogSpeed:0,noDraftSpeed:1,pushTaken:1,steerPull:0,overheatTime:0,overheatSpeed:1,boostWobble:0,racingLine:0,spinExitBoost:0,bowling:0,closeCallBoost:0,turboSteerLock:0,draftGift:1,crookedDraft:0},ty={id:`race-default`,eliminatePerPit:3,pitKinds:[`advantage`,`disadvantage`,`advantage`],pitStopTime:6,pitLaneSpeed:22,pitBrake:28,pitAccel:8,pitExitSpeed:22,pitExitGhost:1.5,gridRowGap:9,gridLateral:2.6,playerGridSlot:9,botPaceMin:.88,botPaceMax:.97,paceMargin:.04,paceGapRange:150},ny=3,ry=class{_label;_prefix;_windowTime=0;_windowFrames=0;_windows=0;_totalTime=0;_totalFrames=0;_minFps=1/0;_worst=0;_last=0;_windowCost={sim:0,draw:0,hud:0};_totalCost={sim:0,draw:0,hud:0};constructor(e,t=``){this._label=e,this._prefix=t,this._label.textContent=`${this._prefix}-- fps`}frame(e,t){if(this._windowTime+=e,this._windowFrames++,iy(this._windowCost,t),this._windows>=ny&&(this._totalTime+=e,this._totalFrames++,this._worst=Math.max(this._worst,e),iy(this._totalCost,t)),this._windowTime<1)return;this._last=this._windowFrames/this._windowTime;let n=this._windowFrames,r=this._windowCost,i=`sim ${(r.sim/n).toFixed(2)} | dib ${(r.draw/n).toFixed(2)} | hud ${(r.hud/n).toFixed(2)} ms`;ay(r),this._windows>=ny&&(this._minFps=Math.min(this._minFps,this._last)),this._windows++,this._windowTime=0,this._windowFrames=0;let a=this.stats();this._label.textContent=`${this._prefix}${Math.round(this._last)} fps | prom ${a.avgFps.toFixed(1)} | min ${a.minFps.toFixed(0)} | ${i}`}stats(){let e=Math.max(this._totalFrames,1);return{seconds:this._totalTime,avgFps:this._totalTime>0?this._totalFrames/this._totalTime:0,minFps:Number.isFinite(this._minFps)?this._minFps:0,worstFrameMs:this._worst*1e3,frames:this._totalFrames,simMs:this._totalCost.sim/e,drawMs:this._totalCost.draw/e,hudMs:this._totalCost.hud/e}}reset(){this._windows=0,this._windowTime=0,this._windowFrames=0,this._totalTime=0,this._totalFrames=0,this._minFps=1/0,this._worst=0,ay(this._windowCost),ay(this._totalCost)}};function iy(e,t){e.sim+=t.sim,e.draw+=t.draw,e.hud+=t.hud}function ay(e){e.sim=0,e.draw=0,e.hud=0}var oy=class{_pending;constructor(e){e.addEventListener(`pointerdown`,e=>{let t=e.target.closest(`[data-card]`)?.dataset.card;t!==void 0&&(e.preventDefault(),this._pending=Number(t))})}read(e){e.steer=0,e.throttle=0,e.brake=0,e.cardPick=this._pending,this._pending=void 0}},sy=.15,cy=class{_index;constructor(e){this._index=e}read(e){let t=navigator.getGamepads?.()[this._index];if(e.steer=0,e.throttle=0,e.brake=0,!t)return;let n=t.axes[0]??0;e.steer=Math.abs(n)<sy?0:(n-Math.sign(n)*sy)/.85,e.throttle=t.buttons[7]?.value??0,e.brake=t.buttons[6]?.value??0}},ly=class{_sources;_tmp={steer:0,throttle:0,brake:0};constructor(e){this._sources=e}read(e,t){e.steer=0,e.throttle=0,e.brake=0,e.cardPick=void 0;for(let n of this._sources)this._tmp.cardPick=void 0,n.read(this._tmp,t),e.cardPick??=this._tmp.cardPick,Math.abs(this._tmp.steer)>Math.abs(e.steer)&&(e.steer=this._tmp.steer),e.throttle=Math.max(e.throttle,this._tmp.throttle),e.brake=Math.max(e.brake,this._tmp.brake)}},uy=.25,dy=2.2,fy=class{_value=0;update(e,t){return this._value=e===0?0:Math.sign(this._value)===e?Rh(this._value,e,dy*t):e*uy,this._value}},py={left:[`KeyA`],right:[`KeyD`],gas:[`KeyW`],brake:[`KeyS`,`Space`]},my={left:[`ArrowLeft`],right:[`ArrowRight`],gas:[`ArrowUp`],brake:[`ArrowDown`]},hy={both:{left:[...py.left,...my.left],right:[...py.right,...my.right],gas:[...py.gas,...my.gas],brake:[...py.brake,...my.brake]},wasd:py,arrows:my},gy=new Set(Object.values(hy.both).flat()),_y=class{_down=new Set;_steer=new fy;_keys;constructor(e,t=`both`){this._keys=hy[t],e.addEventListener(`keydown`,e=>{gy.has(e.code)&&e.preventDefault(),this._down.add(e.code)}),e.addEventListener(`keyup`,e=>this._down.delete(e.code)),e.addEventListener(`blur`,()=>this._down.clear())}read(e,t){let n=e=>e.some(e=>this._down.has(e)),r=this._keys;e.steer=this._steer.update(+!!n(r.right)-!!n(r.left),t),e.throttle=+!!n(r.gas),e.brake=+!!n(r.brake)}},vy=class{_held=new Map;_active=!1;_steer=new fy;constructor(e){e.addEventListener(`pointerdown`,e=>{let t=e.target.closest(`[data-control]`)?.dataset.control;t&&(e.preventDefault(),this._active=!0,this._held.set(e.pointerId,t))});let t=e=>this._held.delete(e.pointerId);e.addEventListener(`pointerup`,t),e.addEventListener(`pointercancel`,t)}read(e,t){let n=new Set(this._held.values());e.steer=this._steer.update(+!!n.has(`right`)-!!n.has(`left`),t),e.brake=+!!n.has(`brake`),e.throttle=this._active&&!n.has(`brake`)?1:0}},yy=4,by=15,xy=6.5,Sy=2;function Cy(e,t,n){n.length=e.length;for(let r=0;r<e.length;r++){n[r]=!1;let i=e[r];if(i.slingCharge<=0&&(i.draftLead=-1),i.flipTime>0||!$g(i)||Qg(i)<by)continue;let a=t(i),o=a.draftRange;for(let t=0;t<e.length;t++){let s=e[t];if(t===r||s.flipTime>0||!$g(s))continue;let c=s.s-i.s;c<yy||c>o||Math.abs(s.lateral-i.lateral)<a.draftWidth&&(n[r]=!0,o=c,i.draftLead=t)}}}function wy(e,t){let n=Math.imul(e.nextPit+1,2654435761);for(let r of[e.id,t.id])for(let e=0;e<r.length;e++)n=Math.imul(n^r.charCodeAt(e),16777619);return n>>>13&1?1:-1}function Ty(e,t,n){for(let r of t){if(r===e||r.flipTime>0||!$g(r))continue;let t=r.s-e.s,i=Math.abs(r.lateral-e.lateral);if(!(t<=-n.radius||t>=n.draftRange||i<n.draftWidth||i>=xy)&&(n.crookedDraft<=0||Math.sign(e.lateral-r.lateral)===wy(e,r)))return!0}return!1}function Ey(e,t,n,r,i,a=1){r?e.slingCharge+=i*a:e.slingStage>0&&Ty(e,t,n)?(e.boostTime=Math.max(e.boostTime,n.slingTime[e.slingStage-1]),e.slingCharge=0):e.slingCharge=Math.max(0,e.slingCharge-Sy*i),e.slingStage=n.slingCharge.filter(t=>e.slingCharge>=t).length}var Dy=128,Oy=2.5,ky=.8;function Ay(e){let t=document.createElement(`canvas`);t.width=t.height=Dy;let n=t.getContext(`2d`),r=Dy/2;n.lineJoin=`round`,n.lineCap=`round`,n.beginPath(),e===`advantage`?n.arc(r,r,54,0,Math.PI*2):(n.moveTo(r,10),n.lineTo(118,112),n.lineTo(10,112),n.closePath()),n.fillStyle=Zh(e===`advantage`?`Advantage`:`Disadvantage`),n.strokeStyle=`#ffffff`,n.lineWidth=8,n.fill(),n.stroke();let i=e===`advantage`,a=i?34:50,o=i?92:100;n.strokeStyle=`#1F2430`,n.lineWidth=12,n.beginPath(),n.moveTo(r,a),n.lineTo(r,o),i?(n.moveTo(44,a+20),n.lineTo(r,a),n.lineTo(84,a+20)):(n.moveTo(46,o-18),n.lineTo(r,o),n.lineTo(82,o-18)),n.stroke();let s=new Dl(t);return s.colorSpace=to,s}var jy=null,My={advantage:`advantage`,pact:`advantage`,disadvantage:`disadvantage`},Ny=class{sprite=new $c;_shown=!1;constructor(){jy??={advantage:new zc({map:Ay(`advantage`)}),disadvantage:new zc({map:Ay(`disadvantage`)})},this.sprite.scale.setScalar(ky),this.sprite.visible=!1}update(e,t,n,r){this._shown=e!==null,this.sprite.visible=this._shown,e&&(this.sprite.material=jy[My[e]],this.sprite.position.set(t,n+Oy,r))}hideNear(e,t){this.sprite.visible=this._shown&&this.sprite.position.distanceToSquared(e)>t*t}},Py=128,Fy=3.2,Iy=1.6;function Ly(e){let t=document.createElement(`canvas`);t.width=t.height=Py;let n=t.getContext(`2d`);e||(n.translate(Py,0),n.scale(-1,1)),n.lineJoin=`round`,n.beginPath(),n.moveTo(14,46),n.lineTo(70,46),n.lineTo(70,18),n.lineTo(116,64),n.lineTo(70,110),n.lineTo(70,82),n.lineTo(14,82),n.closePath(),n.fillStyle=Zh(`Disadvantage`),n.strokeStyle=`#ffffff`,n.lineWidth=8,n.fill(),n.stroke();let r=new Dl(t);return r.colorSpace=to,r}var Ry=null,zy=class{sprite=new $c;constructor(){Ry??={left:new zc({map:Ly(!1)}),right:new zc({map:Ly(!0)})},this.sprite.scale.setScalar(Iy),this.sprite.visible=!1}update(e,t,n,r){this.sprite.visible=e!==0,e!==0&&(this.sprite.material=e<0?Ry.left:Ry.right,this.sprite.position.set(t,n+Fy,r))}},By=8.5,Vy=3.6,Hy=12,Uy=60,Wy=class{camera=new Yd(Uy,16/9,.5,1200);_heading=0;_ready=!1;_target=new q;_wanted=new q;update(e,t,n,r){this._ready||(this._heading=e.heading),this._heading+=zh(e.heading-this._heading)*(1-Math.exp(-5*r));let i=Math.sin(this._heading),a=Math.cos(this._heading);this._wanted.set(e.x-i*By,e.y+Vy,e.z-a*By),this._ready?this.camera.position.lerp(this._wanted,1-Math.exp(-10*r)):this.camera.position.copy(this._wanted),this._target.set(e.x+i*Hy,e.y+1,e.z+a*Hy),this.camera.lookAt(this._target);let o=Uy+10*Math.min(t,1.3)+(n?6:0);this.camera.fov=Rh(this.camera.fov,o,30*r),this.camera.updateProjectionMatrix(),this._ready=!0}reset(){this._ready=!1}},Gy=900;function Ky(e={}){let t=new rd(Gy,24,12),n=new Y(Qh(`SkyHigh`,e)),r=new Y(Qh(`SkyMid`,e)),i=new Y(Qh(`Horizon`,e)),a=t.getAttribute(`position`),o=new Float32Array(a.count*3),s=new Y;for(let e=0;e<a.count;e++){let t=a.getY(e)/Gy;t<.05?s.copy(i):t<.35?s.copy(i).lerp(r,(t-.05)/.3):s.copy(r).lerp(n,Math.min(1,(t-.35)/.45)),s.toArray(o,e*3)}t.setAttribute(`color`,new mc(o,3));let c=new vl(t,new ol({vertexColors:!0,side:1,fog:!1,depthWrite:!1}));c.renderOrder=-1;let l=new vl(new Ml(45,20),new ol({color:Qh(`Sun`,e),fog:!1,depthWrite:!1}));l.position.set(-300,90,780),l.lookAt(0,0,0),l.renderOrder=-1;let u=new Es;return u.name=`Sky`,u.add(c,l),u}var qy=60,Jy=7,Yy=[-3.5,0,3.5],Xy=2,Zy={x:0,y:0,z:0,heading:0},Qy=e=>-(e.barrier+4);function $y(e,t,n){return e.pitLines.map((e,r)=>({s:e,kind:t.pitKinds[r%t.pitKinds.length],entered:0,cut:Math.max(1,n-(r+1)*t.eliminatePerPit)}))}function eb(e,t){return t.pitStopTime+e.pitLaneLength/t.pitLaneSpeed+Xy}function tb(e,t,n){let r=Math.floor((e.pitLaneLength-qy-40)/Jy)+1;return qy+Math.max(0,Math.min(t.cut,r)-1-n)*Jy}function nb(e,t){let n=e.pitExitSpeed,r=n/e.pitAccel;return t<r?.5*e.pitAccel*t*t:.5*n*r+n*(t-r)}function rb(e,t){let n=e.pitExitSpeed,r=n*n/(2*e.pitAccel);return t<r?Math.sqrt(2*t/e.pitAccel):n/e.pitAccel+(t-r)/n}function ib(e,t,n,r){if(!e.inPit)return 0;let i=tb(n,t.pits[e.nextPit-1],e.pitOrder);return Math.max(0,eb(n,r)-rb(r,n.pitLaneLength-i)-e.pitClock)}function ab(e,t,n,r){let i=e.nextPit,a=t.pits[i];!a||e.finished||e.eliminated||e.s<a.s||(e.nextPit++,e.pitOrder=a.entered++,e.inPit=!0,e.pitClock=0,e.pitS=Math.max(0,e.s-a.s),e.pitSpeed=Qg(e),e.pitFromLat=Fh(e.lateral,-n.roadWidth/2,n.roadWidth/2),e.drifting=!1,e.slingCharge=0,e.slingStage=0,e.boostTime=0,e.flipTime=0,e.spinTime=0,e.roll=0,e.airborne=!1,e.vy=0,e.yawRate=0,e.rollRate=0,J_(e,r,a.kind,i,t.seed),a.entered>=a.cut&&ob(t,i))}function ob(e,t){for(let n of e.cars)n.nextPit!==t||n.eliminated||n.finished||(n.eliminated=!0,n.eliminatedAt=t,n.drifting=!1,n.boostTime=0,n.vx=0,n.vz=0)}function sb(e,t,n,r,i){b_(e,e.prev),e.pitClock+=i;let a=t.pits[e.nextPit-1],o=n.pitLaneLength,s=eb(n,r),c=tb(n,a,e.pitOrder),l=s-rb(r,o-c);if(e.pitClock<l){let t=Math.min(r.pitLaneSpeed,Math.sqrt(2*r.pitBrake*Math.max(0,c-e.pitS)));e.pitSpeed=Rh(e.pitSpeed,t,r.pitBrake*i),e.pitS=Math.min(c,e.pitS+e.pitSpeed*i),e.pitS>=c&&(e.pitSpeed=0)}else{let t=e.pitS;e.pitS=Math.min(o,c+nb(r,e.pitClock-l)),e.pitSpeed=(e.pitS-t)/i}e.pitClock>=s-1e-6?(e.inPit=!1,e_(e,n,Math.round((a.s+o)/n.step),Yy[e.pitOrder%Yy.length],r.pitExitSpeed),e.ghostTime=r.pitExitGhost):cb(e,n,a.s,o)}function cb(e,t,n,r){let i=Qy(t),a=i,o=0;if(e.pitS<40){let t=e.pitS/40;a=e.pitFromLat+(i-e.pitFromLat)*Lh(t),o=(i-e.pitFromLat)*6*t*(1-t)/40}else if(e.pitS>r-40){let t=(e.pitS-(r-40))/40,n=Yy[e.pitOrder%Yy.length];a=i+(n-i)*Lh(t),o=(n-i)*6*t*(1-t)/40}let s=n+e.pitS;t.poseAt(s,a,o,Zy),e.x=Zy.x,e.y=Zy.y,e.z=Zy.z,e.heading=Zy.heading,e.pitch=0,e.roll=0,e.vx=Math.sin(Zy.heading)*e.pitSpeed,e.vz=Math.cos(Zy.heading)*e.pitSpeed,e.s=s,e.lateral=a,e.trackIndex=Fh(Math.round(s/t.step),0,t.count-1)}var lb=200,ub=class{_parts=[];_samples;constructor(e){this._samples=Math.max(1,Math.round(lb/e))}at(e){let t=Math.max(0,Math.floor(e/this._samples));return this._parts[t]??=new ng}add(e,t,n){this.at(e).addGeometry(t,n)}build(e){let t=new Es;return t.name=`Chunks`,this._parts.forEach((n,r)=>{if(n.empty)return;let i=n.build();i.computeBoundingSphere();let a=new vl(i,e);a.name=`Chunk${r}`,t.add(a)}),t}};function db(){return tg([eg(new Nl(.25,.35,1.6,5).translate(0,.8,0),`Gravel`),eg(new Pl(1.8,3.6,6).translate(0,3.2,0),`Forest`),eg(new Pl(1.3,2.6,6).translate(0,4.8,0),`Forest`)])}function fb(){return tg([eg(new Il(1,0).scale(1,.75,1).translate(0,.45,0),`RedRock`)])}function pb(){return tg([Q(`TrackLine`,.18,.9,.18,0,.45,0),Q(`RedRock`,.2,.16,.2,0,.82,0)])}function mb(){let e=new Nl(3.1,3.1,7,3).rotateZ(Math.PI/2).rotateX(-Math.PI/2).scale(1,.55,1).translate(0,3.85,0);return tg([Q(`TrackLine`,6.4,3,4.8,0,1.5,0),eg(e,`RedRock`),Q(`Gravel`,1,1.9,.1,.8,.95,2.43),Q(`Water`,1,.8,.1,-1.6,1.7,2.43),Q(`Water`,1,.8,.1,2.3,1.7,2.43),Q(`Asphalt`,.6,1.6,.6,-2,4.6,-.6),Q(`Gravel`,6.6,.3,5,0,.15,0)])}function hb(){return tg([Q(`Gravel`,.22,4.4,.22,-2.2,2.2,0),Q(`Gravel`,.22,4.4,.22,2.2,2.2,0),Q(`TrackLine`,6.2,2.8,.2,0,4.4,0),Q(`Sun`,6.2,.7,.04,0,5.3,.12),Q(`Water`,3.6,.9,.04,-1.1,4.1,.12),Q(`SkyMid`,1.6,1.6,.04,1.9,4,.12)])}function gb(e){return tg([Q(`Gravel`,.12,1.3,.12,0,.65,0),Q(`Gravel`,.1,1.2,.1,0,.6,e/2),Q(`Asphalt`,.05,.05,e,0,.6,e/2),Q(`Asphalt`,.05,.05,e,0,1.05,e/2)])}var _b=[`Water`,`RedRock`,`Sun`,`Forest`,`TrackLine`,`SkyMid`,`SkyHigh`,`Horizon`];function vb(){let e=[Q(`Asphalt`,6,.5,1.2,0,.25,.6),Q(`Asphalt`,6,1.1,1.2,0,.55,-.6)];for(let t=0;t<9;t++){let n=t%2,r=-2.6+t*.65,i=n?1.1:.5,a=n?-.6:.6;e.push(Q(_b[t%_b.length],.42,.75,.3,r,i+.38,a)),e.push(Q(t%3==0?`Gravel`:`Wheat`,.26,.26,.26,r,i+.92,a)),t%3==1&&e.push(Q(_b[(t+3)%_b.length],.1,.5,.1,r+.24,i+1,a))}return tg(e)}function yb(){return tg([eg(new Nl(.12,.16,7,5).translate(0,3.5,0),`Gravel`),Q(`Gravel`,2.2,.14,.14,0,6.5,0),Q(`TrackLine`,.12,.2,.12,-.9,6.67,0),Q(`TrackLine`,.12,.2,.12,.9,6.67,0)])}var bb=[26,40,60,90,130,190],xb=3+bb.length,Sb=22,Cb=2.5,wb=5,Tb=9,Eb=6;function Db(e,t,n,r){let i=e.hs[t];return[e.xs[t]-Math.cos(i)*n,e.ys[t]+r,e.zs[t]+Math.sin(i)*n]}function Ob(e,t){return e.pitLines.some(n=>t>=n&&t<n+40||t>=n+e.pitLaneLength-40&&t<n+e.pitLaneLength)}var kb=e=>Math.floor((e.count-1)/4),Ab=(e,t)=>Math.min(t*4,e.count-1);function jb(e,t,n){let r=Ab(e,t);return n===0?e.halfWidth(r)+Cb:n===1?e.barrierAt(r)+1.5:n===2?e.barrierAt(r)+4:bb[n-3]}function Mb(e,t,n){let r=Ab(e,t),i=e.reliefs[r];return i&&(i.side===0||i.side===n)&&e.reliefAmount[r]>0?i:null}function Nb(e,t){let n=e/wb,r=Math.floor(n);return Ih(Bh(r,t),Bh(r+1,t),Lh(n-r))}function Pb(e,t,n,r){let i=Ab(e,t),a=jb(e,t,n),o=Nb(t,n*7+ +(r>0)),s=Math.max(0,a-Sb)*(.08+.22*o),c=Mb(e,t,r);if(!c||n<2)return e.ys[i]+s;let l=e.reliefAmount[i];switch(c.kind){case`cut`:return e.ys[i]+s+l*(Tb+(n===2?2:5)*o);case`mesa`:return e.ys[i]+(n<=5?s*(1-l)+l*Eb:s+l*Eb*.4);case`ravine`:return e.ys[i]+(n<=3?s*(1-l)-l*14:s+l*2)}}function Fb(e,t,n,r){let i=Db(e,Ab(e,t),jb(e,t,n)*r,0);return i[1]=Pb(e,t,n,r),i}var Ib=10,Lb=.35,Rb=.04,zb=12,Bb=.45,Vb=30,Hb=6,Ub=48,Wb=3;function Gb(e,t){let n=new Qo,r=new ko,i=new cs,a=new q,o=new q,s=t=>(s,c,l,u)=>{n.compose(a.set(...c),r.setFromEuler(i.set(0,u,0)),o.set(l,l,l)),e.add(s,t,n)},c=kb(t);Zb(t,s(pb())),Qb(t,s(fb())),$b(t,c,s(db())),ex(t,c,s(mb())),tx(t,c,s(hb())),nx(t,c,s(gb(4*t.step))),rx(t,c,s(vb())),ix(t,c,s(yb()))}var Kb=(e,t,n)=>e.hs[t]+n*Math.PI/2;function qb(e,t){let n=Ab(e,t)*e.step;return e.pitLines.some(t=>n>t-24&&n<t+e.pitLaneLength+24)}var Jb=kg();function Yb(e,t,n,r){return e.locate(r[0],r[2],Ab(e,t),Jb),Math.abs(Jb.lateral)<jb(e,t,n)-Wb}function Xb(e,t){let n=Bh(e,t+40);return n<Rb?n<Rb/2?4:5:0}function Zb(e,t){let n=Math.round(Ib/e.step);for(let r=0;r<e.count;r+=n)for(let n of[-1,1])n<0&&Ob(e,r*e.step)||t(r,Db(e,r,e.barrierAt(r)*n,0),1,e.hs[r])}function Qb(e,t){e.obstacles.forEach((n,r)=>{let i=Math.min(Math.round(n.s/e.step),e.count-1);t(i,[n.x,e.ys[i],n.z],n.radius,r*1.7)})}function $b(e,t,n){for(let r=0;r<t;r++)for(let t of[-1,1]){let i=Mb(e,r,t),a=Xb(r,t);for(let o=3;o<=6;o++){let s=Bh(r*3+o,t+5);if(s>Lb||o===a||i?.kind===`ravine`&&o<=3)continue;let c=Fb(e,r,o,t);Yb(e,r,o,c)||n(Ab(e,r),c,.8+s,s*20)}}}function ex(e,t,n){for(let r=0;r<t;r++)for(let t of[-1,1]){let i=Xb(r,t);if(!i||Mb(e,r,t)?.kind===`ravine`)continue;let a=Ab(e,r),o=(Bh(r,t+41)-.5)*.8,s=Fb(e,r,i,t);Yb(e,r,i,s)||n(a,s,.9+Bh(r,42)*.3,Kb(e,a,t)+o)}}function tx(e,t,n){for(let r=Vb/2;r<t;r+=Vb){let t=Math.floor(r/Vb)%2==0?1:-1;if(qb(e,r)||Mb(e,r,t))continue;let i=Ab(e,r),a=Db(e,i,(e.barrierAt(i)+6)*t,0);a[1]=Fb(e,r,2,t)[1],n(i,a,1,Kb(e,i,t)+t*.5)}}function nx(e,t,n){for(let r=0;r<t;r++)for(let t of[-1,1]){if(Bh(Math.floor(r/zb),t+60)>Bb||qb(e,r)||Mb(e,r,t)||Mb(e,r+1,t))continue;let i=Ab(e,r),a=Fb(e,r,2,t);a[0]-=Math.cos(e.hs[i])*2*t,a[2]+=Math.sin(e.hs[i])*2*t,n(i,a,1,e.hs[i])}}function rx(e,t,n){let r=(r,i)=>{if(r<0||r>=t)return;let a=Ab(e,r);n(a,Db(e,a,(jb(e,r,1)+1.5)*i,0),1,Kb(e,a,i))},i=4*e.step,a=Math.round(Ub/i),o=Math.min(t,Math.round(e.raceLength/i)+1);for(let e=0;e<a;e++)for(let t of[-1,1])r(e+1,t),r(o-2-e,t);for(let t of e.pitLines){let n=Math.round((t+e.pitLaneLength)/i);for(let e=Math.round(t/i);e<=n;e+=2)r(e,1)}}function ix(e,t,n){for(let r=0;r<t;r+=Hb){if(Mb(e,r,1))continue;let t=Ab(e,r);n(t,Fb(e,r,3,1),1,e.hs[t]+Math.PI/2)}}function ax(e,t={}){let n=Xh(t),r=new ub(e.step);cx(r,e),fx(r,e),Gb(r,e);let i=new Es;return i.name=`Track`,i.add(r.build(n)),e.pitLines.length>0&&i.add(new vl(ux(e),n)),i.add(px(e,t)),i.add(lx(e,n)),i}function ox(e,t,n,r,i,a,o,s,c){e.quad(Db(t,n,r,s),Db(t,n,i,s),Db(t,n+1,o,s),Db(t,n+1,a,s),c)}function sx(e,t,n,r,i,a,o){ox(e,t,n,r,i,r,i,a,o)}function cx(e,t){let n=.35;for(let r=0;r<t.count-1;r++){let i=e.at(r),a=t.halfWidth(r),o=t.halfWidth(r+1);ox(i,t,r,-a+n,a-n,-o+n,o-n,.04,t.gravel[r+1]?`Gravel`:`Asphalt`),ox(i,t,r,-a,-a+n,-o,-o+n,.05,`TrackLine`),ox(i,t,r,a-n,a,o-n,o,.05,`TrackLine`),Math.floor(r/3)%2==0&&sx(i,t,r,-.15,.15,.05,`TrackLine`),ox(i,t,r,-a-Cb,-a,-o-Cb,-o,.02,`Gravel`),ox(i,t,r,a,a+Cb,o,o+Cb,.02,`Gravel`)}}function lx(e,t){let n=new ng,r=Lg*.7;for(let t=0;t<e.count-1;t++){let i=e.racingLine[t],a=e.racingLine[t+1];Number.isNaN(i)||Number.isNaN(a)||ox(n,e,t,i-r,i+r,a-r,a+r,.06,`Advantage`)}let i=new vl(n.build(),t);return i.name=`RacingLine`,i.visible=!1,i}function ux(e){let t=new ng,n=e.roadWidth/2,r=Qy(e)+3,i=Qy(e)-3;for(let a of e.pitLines){let o=Math.round(a/e.step);sx(t,e,o,-n,n,.07,`TrackLine`);let s=Math.min(o+Math.round(e.pitLaneLength/e.step),e.count-2);for(let a=o;a<s;a++){let s=(a-o)*e.step,c=s<40||s>=e.pitLaneLength-40;sx(t,e,a,i,c?-n:r,.05,`Asphalt`),c||sx(t,e,a,r-.3,r,.06,`TrackLine`)}}return t.build()}function dx(e,t,n,r){let i=Bh(Math.floor(t/3),n*13+r),a=Mb(e,t,r);if(a&&e.reliefAmount[Ab(e,t)]>.3&&n>=1){if(a.kind===`cut`)return n===1||i<.55?`RedRock`:`Steppe`;if(a.kind===`mesa`)return n===1||n===5?`RedRock`:i<.6?`Wheat`:`Steppe`;if(a.kind===`ravine`&&n<=3)return n===2?`Water`:`RedRock`}return n>=6?i<.5?`Steppe`:i<.8?`RedRock`:`Forest`:i<.65?`Grass`:i<.88?`Wheat`:`Steppe`}function fx(e,t){let n=kb(t);for(let r=0;r<n;r++){let n=e.at(Ab(t,r));for(let e of[-1,1])for(let i=0;i<xb-1;i++){let a=Fb(t,r,i,e),o=Fb(t,r,i+1,e),s=Fb(t,r+1,i+1,e),c=Fb(t,r+1,i,e),l=dx(t,r,i,e);n.tri(a,o,s,l),n.tri(a,s,c,l===`Water`||l===`RedRock`||Bh(r,i)>=.15?l:`Grass`)}}}function px(e,t){let n=1/0;for(let t of e.ys)n=Math.min(n,t);let r=new vl(new nd(6e3,6e3).rotateX(-Math.PI/2),new md({color:Qh(`Steppe`,t)}));return r.position.set(e.xs[e.count>>1],n-14-2,e.zs[e.count>>1]),r.name=`Base`,r}var mx=2,hx=12,gx=3.5,_x=new q,vx=class{renderer;_scene=new Fs;_fog=new Ps(Zh(`Horizon`),140,650);_cars=[];_badges=[];_cams=[];_sky=null;_track=null;_chunks=[];_line=null;_arrows=[];_look={smoke:!1,cans:!1,longFlame:!1,wildFlame:!1,shake:0};constructor(e,t){this.renderer=new Ph({canvas:e,antialias:!0,powerPreference:`high-performance`}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,mx)),this.renderer.setScissorTest(!0),this.renderer.info.autoReset=!1,this._scene.fog=this._fog,this._scene.add(new Ld(Zh(`Sun`),Zh(`Grass`),1.6));let n=new Qd(Zh(`Sun`),2.2);n.position.set(-.4,.5,1),this._scene.add(n);for(let e=0;e<t;e++){let t=new B_(e);this._cars.push(t);let n=new Ny;this._badges.push(n),this._scene.add(t.root,n.sprite)}}setRace(e,t,n){for(let e of[this._sky,this._track])e&&(this._scene.remove(e),yx(e));this._sky=Ky(t),this._track=ax(e,t),this._chunks=this._track.getObjectByName(`Chunks`)?.children??[],this._line=this._track.getObjectByName(`RacingLine`)??null,this._scene.add(this._sky,this._track),this._fog.color.set(Qh(`Horizon`,t)),this._cams.length=0;for(let e=0;e<n;e++)this._cams.push(new Wy);for(;this._arrows.length<n;){let e=new zy;this._arrows.push(e),this._scene.add(e.sprite)}}resetCameras(){for(let e of this._cams)e.reset()}render(e,t,n,r,i,a){e.cars.forEach((e,o)=>{let s=this._cars[o];s.setSkin(e.skin);let c=G_(t,n,e),l=this._look;l.smoke=e.skidding||e.spinTime>0&&c.spinExitBoost>0,l.cans=c.draftGift>1,l.shake=e.onDirt&&!e.airborne?c.dirtShake:0,l.longFlame=c.turboSteerLock>0,l.wildFlame=c.boostWobble>0,s.update(e,i,a,r.includes(o),l);let u=e.card!==null&&s.root.visible&&!r.includes(o),d=s.pose;this._badges[o].update(u?n[e.card].kind:null,d.x,d.y,d.z)});let o=this.renderer.domElement,s=o.clientWidth,c=o.clientHeight;(o.width!==Math.floor(s*this.renderer.getPixelRatio())||o.height!==Math.floor(c*this.renderer.getPixelRatio()))&&this.renderer.setSize(s,c,!1),this.renderer.info.reset();let l=s/this._cams.length;this._cams.forEach((i,o)=>{let s=r[o],u=e.cars[s];i.camera.aspect=l/c,i.update(this._cars[s].pose,Qg(u)/t[u.tuningId].maxSpeed,u.boostTime>0,a),this._showOwnSignals(e,t,n,r,o),this._sky?.position.copy(i.camera.position),this._hideFogged(i.camera.position);for(let e of this._badges)e.hideNear(i.camera.position,hx);this._fadeNearCars(i.camera,s);let d=l*o;this.renderer.setViewport(d,0,l,c),this.renderer.setScissor(d,0,l,c),this.renderer.render(this._scene,i.camera)})}_showOwnSignals(e,t,n,r,i){let a=e.cars[r[i]],o=G_(t,n,a);this._line&&(this._line.visible=o.racingLine>0),this._arrows.forEach((t,n)=>{let s=n===i&&o.crookedDraft>0&&a.draftLead>=0?e.cars[a.draftLead]:void 0;if(!s||n>=r.length)return t.update(0,0,0,0);let c=this._cars[a.draftLead].pose;t.update(wy(a,s),c.x,c.y,c.z)})}_fadeNearCars(e,t){let n=e.position;e.getWorldDirection(_x),this._cars.forEach((e,r)=>{let i=e.pose,a=(i.x-n.x)*_x.x+(i.y-n.y)*_x.y+(i.z-n.z)*_x.z,o=r===t?1:Fh((a-gx)/4,0,1);e.setFade(o),e.root.visible=e.shown&&o>.02})}_hideFogged(e){for(let t of this._chunks){let n=t.geometry.boundingSphere;t.visible=n.center.distanceTo(e)-n.radius<this._fog.far}}};function yx(e){e.traverse(e=>{let t=e;if(t.isMesh){t.geometry.dispose();for(let e of Array.isArray(t.material)?t.material:[t.material])e.map?.dispose(),e.dispose()}})}var bx=[-3.5,0,3.5],xx=2.4,Sx=30,Cx=16,wx=10,Tx=5,Ex=1.5,Dx=.8,Ox=1.5,kx=8;function Ax(e,t,n,r,i,a){e.laneHold=Math.max(0,e.laneHold-Av),e.paceAdjust=Nx(e,t,i);let o=Qg(e),s=n.laneScale(e.trackIndex);Px(e,t,o,s),a.steer=jx(e,n,r,o);let c=r.maxSpeed*(e.pace+e.paceAdjust),l=!1,u=Ix(e,t,e.lane*s,Sx);u&&u.s-e.s-2*r.radius<wx+(o-Qg(u))*1.2&&(c=Math.min(c,Qg(u)));let d=Ix(e,t,e.lateral,Sx),f=d?d.s-e.s-2*r.radius:Sx,p=d?o-Qg(d):0;d&&p>2&&f<p*.8+1&&(l=!0);let m=Mx(e,n,r,o);return o>m+1&&(l=!0),c=Math.min(c,m),a.throttle=+(o<c&&!l),a.brake=+!!l,l&&e.brakeHeld<=r.driftStartWindow+.016666666666666666&&(a.steer=Fh(a.steer,-.25,.25)),a}function jx(e,t,n,r){let i=Math.round((4+r*.2)/t.step),a=Math.min(t.count-1,e.trackIndex+i),o=Fh((e.lane*t.laneScale(a)-e.lateral)*Ox,-n.strafeSpeed,n.strafeSpeed),s=c_(e,t.curveAt(e.trackIndex),r,n)/n.strafeResponse,c=Fh(r/10,.1,1);return Fh((o+s)/(n.strafeSpeed*c),-1,1)}function Mx(e,t,n,r){let i=r*r/(2*n.brake)+kx,a=1/0;for(let r=0;r*t.step<=i;r++){let i=Math.abs(t.curveAt(e.trackIndex+r));if(i<1e-4)continue;let o=Math.sqrt(Dx*n.strafeSpeed*n.strafeResponse/(n.curvePush*i)),s=Math.max(0,r*t.step-kx);a=Math.min(a,Math.sqrt(o*o+2*n.brake*s))}return a}function Nx(e,t,n){let r=0,i=1/0;for(let n of t){if(n===e||n.player<0||n.eliminated)continue;let t=n.s-e.s;Math.abs(t)<i&&(i=Math.abs(t),r=t)}return i===1/0?0:Fh(r/n.paceGapRange,-1,1)*n.paceMargin}function Px(e,t,n,r){if(e.laneHold>0)return;let i=Ix(e,t,e.lane*r,Sx),a=i?i.s-e.s:Sx;if(!i||a>Cx+Math.max(0,n-Qg(i))*1.5){let n=e.homeLane*r;e.lane!==e.homeLane&&!Ix(e,t,n,24)&&Fx(e,t,n)&&(e.lane=e.homeLane,e.laneHold=Ex);return}let o=e.lane,s=a;for(let n of bx){if(n===e.lane||!Fx(e,t,n*r))continue;let i=Ix(e,t,n*r,Sx),a=i?i.s-e.s:Sx;a>s+4&&(o=n,s=a)}o!==e.lane&&(e.lane=o,e.laneHold=Ex)}function Fx(e,t,n){let r=Math.min(e.lateral,n)-xx/2,i=Math.max(e.lateral,n)+xx/2;for(let n of t)if(n!==e&&$g(n)&&Math.abs(n.s-e.s)<Tx&&n.lateral>r&&n.lateral<i)return!1;return!0}function Ix(e,t,n,r){let i=null,a=r;for(let r of t){if(r===e||!$g(r))continue;let t=r.s-e.s;t>0&&t<a&&Math.abs(r.lateral-n)<xx&&(a=t,i=r)}return i}var Lx=1.5,Rx=.7,zx=.7,Bx=.5,Vx=2,Hx=.4,Ux=e=>$g(e)&&e.ghostTime<=0;function Wx(e,t){for(let n=0;n<e.length;n++){let r=e[n];if(!Ux(r))continue;let i=t(r);for(let a=n+1;a<e.length;a++){let n=e[a];if(!Ux(n)||Math.abs(r.y-n.y)>Lx)continue;let o=t(n),s=i.radius+o.radius,c=n.x-r.x,l=n.z-r.z,u=c*c+l*l;if(u>=s*s||u<1e-6)continue;let d=Math.sqrt(u),f=c/d,p=l/d,m=i.pushTaken/(i.pushTaken+o.pushTaken),h=s-d;r.x-=f*h*m,r.z-=p*h*m,n.x+=f*h*(1-m),n.z+=p*h*(1-m),Jx(r,f,p,i),Jx(n,-f,-p,o);let g=(n.vx-r.vx)*f+(n.vz-r.vz)*p;if(g>=0)continue;let _=-1.3*g;r.vx-=f*_*m,r.vz-=p*_*m,n.vx+=f*_*(1-m),n.vz+=p*_*(1-m),Gx(r,f,p,-g,i),Gx(n,-f,-p,-g,o),qx(r,n,f,p,i,o),qx(n,r,-f,-p,o,i)}}}function Gx(e,t,n,r,i){if(r<=i.spinImpactSpeed)return;let a=-t*Math.cos(e.heading)+n*Math.sin(e.heading);Math.abs(a)>Rx&&r_(e,-a,r,i)}var Kx=(e,t,n)=>-t*Math.cos(e.heading)+n*Math.sin(e.heading);function qx(e,t,n,r,i,a){i.bowling<=0||e.boostTime<=0||n*Math.sin(e.heading)+r*Math.cos(e.heading)<zx||n_(t,Kx(t,n,r)>=0?1:-1,a)}function Jx(e,t,n,r){let i=Kx(e,t,n);r.closeCallBoost<=0||e.closeCallWait>0||Math.abs(i)<Bx||(e.boostTime=Math.max(e.boostTime,r.closeCallBoost),e.closeCallWait=Vx,e.scrapeTime=Hx,e.scrapeSide=i>0?1:-1)}var Yx=[],Xx=[];function Zx(e,t){return e.finished?1e7-e.finishTime:e.eliminated?-1e7+e.eliminatedAt*1e5+e.s:e.inPit?t.pits[e.nextPit-1].s+.5-e.pitOrder*.001:e.s}function Qx(e){let t=e.cars;Yx.length=t.length,Xx.length=t.length;for(let n=0;n<t.length;n++)Yx[n]=Zx(t[n],e),Xx[n]=n;Xx.sort((e,t)=>Yx[t]-Yx[e]||e-t);for(let e=0;e<Xx.length;e++)t[Xx[e]].place=e+1}function $x(e){let t=0;for(let n of e.cars)n.eliminated||t++;return t}function eS(e,t){let n=t.pits[e.nextPit];return!n||e.eliminated||e.finished?null:Math.max(0,n.cut-e.place+1)}function tS(e){return e.cars.every(e=>e.finished||e.eliminated)}var nS={steer:0,throttle:0,brake:0},rS=30,iS=10,aS={steer:0,throttle:0,brake:1},oS=.6180339887,sS=[-4.2,-2.1,0,2.1,4.2],cS=4,lS=[],uS=[],dS={steer:0,throttle:0,brake:0};function fS(e,t){let{track:n,rules:r}=e,i=n=>e.tunings[t.grid?.[n]?.tuningId??t.tuningId],a=e=>t.grid?.[e]?.skin??e,o=t.players+t.bots,s=iS+(Math.ceil(o/2)-1)*r.gridRowGap,c=Math.max(0,Math.min(r.playerGridSlot,o-t.players)),l=[];for(let e=0;e<o;e++)l.push(e);let u=l.splice(c,t.players),d=[],f=(e,t)=>{let i=t%2==0?-r.gridLateral:r.gridLateral,a=s-Math.floor(t/2)*r.gridRowGap-t%2*3;e.lane=i,e_(e,n,Math.round(a/n.step),i,0),d.push(e)};for(let e=0;e<t.players;e++)f(Zg(`car-${d.length}`,e,i(d.length),a(d.length)),u[e]);for(let e=0;e<t.bots;e++){let t=Zg(`car-${d.length}`,-1,i(d.length),a(d.length)),n=e*oS%1;t.pace=r.botPaceMin+(r.botPaceMax-r.botPaceMin)*n,f(t,l[e]),t.homeLane=sS[e*2%sS.length]}let p={seed:(t.seed??1)>>>0,tick:0,time:0,cars:d,pits:$y(n,r,o)};return Qx(p),p}function pS(e,t,n){let{track:r,rules:i}=t;e.tick++,e.time=e.tick*Av;let a=e=>G_(t.tunings,t.cards,e);if(e.tick===1)for(let t of e.cars)t.boostTime=Math.max(t.boostTime,a(t).startBoost);Cy(e.cars,a,lS);for(let o=0;o<e.cars.length;o++){let s=e.cars[o];if(s.eliminated)continue;if(s.inPit){if(s.player>=0&&ib(s,e,r,i)>0){let e=n[s.player]??nS;Y_(s,e.steer,e.cardPick)}sb(s,e,r,i,Av),s.inPit||(s.boostTime=Math.max(s.boostTime,a(s).pitExitBoost));continue}let c=a(s);if(s.raceSpeed=mS(s,e,c),!s.finished&&s.flipTime<=0){let t=lS[o]?a(e.cars[s.draftLead]).draftGift:1;Ey(s,e.cars,c,lS[o],Av,t)}let l;l=s.finished?aS:s.player<0?Ax(s,e.cars,r,c,i,dS):n[s.player]??nS,i_(s,l,r,c,lS[o],Av),ab(s,e,r,t.cards),!s.finished&&!s.inPit&&s.s>=r.raceLength-rS&&(s.finished=!0,s.finishTime=e.time)}Wx(e.cars,a);for(let t=0;t<e.cars.length;t++)uS[t]=e.cars[t].place;Qx(e);for(let t=0;t<e.cars.length;t++){let n=e.cars[t];$g(n)&&n.place>uS[t]&&(n.boostTime=Math.max(n.boostTime,a(n).passedBoost))}}function mS(e,t,n){let r=eS(e,t),i=r===0?n.zoneSpeed:1;return n.underdogSpeed>0&&(e.place===1?i*=1-n.underdogSpeed/2:r!==null&&(i*=1+n.underdogSpeed*Fh(1-r/cS,0,1))),i}var hS=4,gS={advantage:`ventaja`,disadvantage:`desventaja`},_S={advantage:`▲`,disadvantage:`▼`,pact:`◆`},vS=class{_speed;_place;_zone;_zoneText;_draft;_drift;_sling;_slingStage;_boost;_flip;_pull;_heat;_lock;_card;_cardShown;_pit;_out;_outText;_watching;_own;_finish;_finishPlace;_finishTime;_lights;_lightsText;_lamps;_shownCount=null;constructor(e){let t=t=>{let n=e.querySelector(`.${t}`);if(!n)throw Error(`Hud: falta .${t}`);return n};this._speed=t(`hud-speed`),this._place=t(`hud-place`),this._zone=t(`hud-zone`),this._zoneText=t(`hud-zone-text`),this._draft=t(`hud-draft`),this._drift=t(`hud-drift`),this._sling=t(`hud-sling`),this._slingStage=t(`hud-sling-stage`),this._drift.textContent=$(`hud.cross`),t(`hud-sling-name`).textContent=$(`hud.sling`),this._boost=t(`hud-boost`),this._card=t(`hud-card`),this._flip=t(`hud-flip`),this._lock=t(`hud-lock`),this._lock.textContent=$(`hud.steerLock`),this._pull=t(`hud-pull`),this._heat=t(`hud-heat`),this._pit=t(`hud-pit`),this._out=t(`hud-out`),this._outText=t(`hud-out-text`),this._watching=t(`hud-watching`),this._own=t(`hud-own`),this._finish=t(`hud-finish`),this._finishPlace=t(`hud-finish-place`),this._finishTime=t(`hud-finish-time`),this._lights=t(`hud-lights`),this._lightsText=t(`hud-lights-text`),this._lamps=[...this._lights.querySelectorAll(`.lamp`)]}setCountdown(e){e!==this._shownCount&&(this._shownCount=e,this._lights.hidden=e===null,e!==null&&(this._lights.classList.toggle(`go`,e===0),this._lamps.forEach((t,n)=>t.classList.toggle(`on`,e>0&&n<this._lamps.length+1-e)),this._lightsText.textContent=e>0?String(e):$(`hud.go`)))}update(e,t,n,r){let i=$x(n);if(this._own.hidden=e.eliminated,this._out.hidden=!e.eliminated,e.eliminated){this._outText.textContent=`Quedaste afuera en la entrada a boxes ${e.eliminatedAt+1}, puesto ${e.place} de ${n.cars.length}.`,this._watching.textContent=`Mirando al puesto ${t.place}`;return}let a=Qg(e);if(this._speed.textContent=String(Math.round(a*3.6)),this._place.textContent=`${e.place}/${i}`,this._updateZone(e,n),this._draft.hidden=e.draft<.5,this._drift.hidden=!e.drifting,this._sling.hidden=e.slingCharge<=0,e.slingCharge>0&&(this._slingStage.textContent=`●`.repeat(e.slingStage)+`○`.repeat(3-e.slingStage),this._slingStage.className=`pips s${e.slingStage}`),this._boost.hidden=e.boostTime<=0,this._updateCard(e,r),this._updateCardTags(e,r),this._flip.hidden=e.flipTime<=0,this._pit.hidden=!e.inPit,e.inPit){let t=ib(e,n,r.track,r.rules);this._pit.textContent=`Boxes de ${gS[n.pits[e.nextPit-1].kind]}${t>0?` ${Math.ceil(t)}`:``}`}this._finish.hidden=!e.finished,e.finished&&(this._finishPlace.textContent=`Puesto ${e.place} de ${i}`,this._finishTime.textContent=`${e.finishTime.toFixed(2)} s`)}_updateCard(e,t){if(e.card===this._cardShown)return;this._cardShown=e.card;let n=e.card?t.cards[e.card]:void 0;this._card.hidden=!n,n&&(this._card.className=`hud-card tag pill k-${n.kind}`,this._card.querySelector(`.hud-card-icon`).textContent=_S[n.kind]??``,this._card.querySelector(`.hud-card-kind`).textContent=$(`card.kind.${n.kind}`),this._card.querySelector(`.hud-card-name`).textContent=$(n.nameKey))}_updateCardTags(e,t){let n=G_(t.tunings,t.cards,e);if(this._lock.hidden=!(n.turboSteerLock>0&&e.boostTime>0),this._pull.hidden=n.steerPull<=0,n.steerPull>0&&(this._pull.textContent=$(`hud.pull.${e.pullSide<0?`left`:`right`}`)),this._heat.hidden=n.overheatTime<=0,n.overheatTime>0){let t=e.heat>=n.overheatTime,r=Math.min(hS,Math.floor(e.heat/n.overheatTime*hS));this._heat.textContent=t?$(`hud.overheated`):`${$(`hud.heat`)} ${`●`.repeat(r)}${`○`.repeat(hS-r)}`}}_updateZone(e,t){let n=eS(e,t);if(this._zone.hidden=n===null,n===null)return;let r=n===0;this._zone.classList.toggle(`sig-elim`,r),this._zoneText.textContent=r?`Zona de eliminación`:n===1?`A 1 puesto de la eliminación`:`A ${n} puestos de la eliminación`}},yS=class{_root;_title;_cards;_shown=``;constructor(e){let t=(t,n=e)=>{let r=n.querySelector(t);if(!r)throw Error(`PitCardPanel: falta ${t}`);return r};this._root=t(`.pit-cards`),this._title=t(`.pit-title`,this._root),t(`.pit-hint`,this._root).textContent=$(`pit.hint`),this._cards=[...this._root.querySelectorAll(`.card`)]}update(e,t,n){let r=!e.eliminated&&e.inPit&&e.cardOffer.length>0&&ib(e,t,n.track,n.rules)>0,i=r?`${e.nextPit}|${e.cardOffer.join(`,`)}|${e.card}`:``;i!==this._shown&&(this._shown=i,this._root.hidden=!r,this._root.parentElement?.classList.toggle(`picking`,r),r&&(this._title.textContent=$(`pit.choose.${t.pits[e.nextPit-1].kind}`),this._cards.forEach((t,r)=>{let i=e.cardOffer[r];if(t.hidden=!i,!i)return;let a=n.cards[i],o=i===e.card;t.classList.toggle(`marked`,o),t.querySelector(`.card-kind`).textContent=$(`card.kind.${a.kind}`),t.querySelector(`.card-name`).textContent=$(a.nameKey);let s=W_(n.tunings[e.tuningId],a).steerPull>0?`. ${$(`pit.pull.${e.pullSide<0?`left`:`right`}`)}`:``;t.querySelector(`.card-text`).textContent=$(a.textKey)+s,t.querySelector(`.card-mark`).textContent=o?`✔ ${$(`pit.marked`)}`:``})))}},bS=16,xS=2,SS=[[],[`both`],[`wasd`,`arrows`]],CS=3,wS=class{_onOver;_root;_template;_tunings;_cards;_rules;_tuningId;_stepper=new Mv;_view;_fps;_cost={sim:0,draw:0,hud:0};autopilot;_startCard;onSnapshot=null;onLocalInput=null;_ctx=null;_grid=[];_state=null;_local=[];_remote=new Map;_mirror=!1;_frames=[];_follow=[];_last=0;_overAt=-1;_snapAt=0;_stepsLast=0;_running=!1;_keyboards=new Map;_firstSources;_audio=new Jv;_soundHint;_countdown=0;constructor(e,t){this._onOver=t;let n=ey;this._tunings={[n.id]:n,...Z_(sv,n)},this._cards=U_($v.cards,n),this._rules=ty,this._tuningId=n.id,this.autopilot=new URLSearchParams(location.search).has(`auto`);let r=new URLSearchParams(location.search).get(`card`);this._startCard=r&&this._cards[r]?r:null;let i=e.querySelector(`#game`),a=e.querySelector(`#touch`),o=e.querySelector(`#fps`),s=e.querySelector(`.view[data-player="0"]`);if(!i||!a||!o||!s)throw Error(`DriveScreen: faltan elementos en index.html`);this._root=e,this._template=s,this._view=new vx(i,bS),this._fps=new ry(o,`v${bv} | `),this._soundHint=e.querySelector(`#sound-hint`),this._soundHint.textContent=$(`hud.soundTap`),this._firstSources=[new cy(0),new vy(a),new oy(s)],matchMedia(`(pointer: coarse)`).matches&&(a.hidden=!1),Object.assign(window,{tyc:{stats:()=>this._fps.stats(),resetStats:()=>this._fps.reset(),drawInfo:()=>({...this._view.renderer.info.render}),grid:()=>[...this._grid]}}),requestAnimationFrame(this._frame)}get state(){return this._state}get grid(){return this._grid}start(e){this._setViews(e.local),this._remote=e.remote??new Map,this._mirror=e.mirror??!1,this._frames.length=0;for(let t=0;t<e.players;t++)this._frames.push({steer:0,throttle:0,brake:0});this._ctx={track:e.track,tunings:this._tunings,cards:this._cards,rules:this._rules};let t=Math.floor(Math.random()*2**32);if(this._grid=e.grid??$_(sv,e.picks,bS,t),this._state=fS(this._ctx,{players:e.players,bots:bS-e.players,tuningId:this._tuningId,grid:this._grid,seed:t}),this._startCard&&!this._mirror)for(let e of this._state.cars)e.player>=0&&(e.card=this._startCard);this._view.setRace(e.track,e.colors,e.local.length),this._root.classList.toggle(`split`,e.local.length>1),this._stepper.reset(),this._overAt=-1,this._snapAt=0,this._follow.length=0,this._follow.push(...e.local),this._countdown=CS,this._running=!0}stop(){this._running=!1}applySnapshot(e){this._state&&this._mirror&&(Lv(this._state,e),this._snapAt=performance.now())}_setViews(e){this._root.querySelectorAll(`.view:not([data-player="0"])`).forEach(e=>e.remove());let t=SS[e.length];this._local=e.map((e,n)=>{let r=this._template;return n>0&&(r=this._template.cloneNode(!0),r.dataset.player=String(n),this._template.after(r)),{index:e,input:new ly([...n===0?this._firstSources:[new cy(n),new oy(r)],this._keyboard(t[n])]),hud:new vS(r),pitCards:new yS(r)}})}_keyboard(e){let t=this._keyboards.get(e);return t||this._keyboards.set(e,t=new _y(window,e)),t}_frame=e=>{let t=this._last?(e-this._last)/1e3:1/60;this._last=e;let n=this._state,r=this._ctx;if(!this._running||!n||!r){this._audio.silence(),this._soundHint.hidden=!0,requestAnimationFrame(this._frame);return}let i=performance.now();this._readInputs(n,r,t);let a=this._tickCountdown(t),o;if(a)o=1;else if(this._mirror)o=Math.min(1,(e-this._snapAt)/50),this.onLocalInput?.(this._frames[this._local[0].index]);else{let i=this._stepper.advance(t);this._stepsLast=i;for(let e=0;e<i;e++)pS(n,r,this._frames);o=this._stepper.alpha,this.onSnapshot&&e-this._snapAt>=50&&(this._snapAt=e,this.onSnapshot(n))}this._updateFollow(n);let s=performance.now();this._view.render(n,r.tunings,r.cards,this._follow,o,t),this._audio.update(n,r.track,r.tunings,this._follow,t);let c=this._audio.locked&&!this._audio.muted;this._soundHint.hidden===c&&(this._soundHint.hidden=!c);let l=performance.now(),u=this._countdown>0?Math.ceil(this._countdown):this._countdown>-.9?0:null;this._local.forEach((e,t)=>{let i=n.cars[e.index];e.hud.update(i,n.cars[this._follow[t]],n,r),e.hud.setCountdown(u),e.pitCards.update(i,n,r)});let d=performance.now();this._cost.sim=s-i,this._cost.draw=l-s,this._cost.hud=d-l,this._fps.frame(t,this._cost),this._mirror||(this._overAt<0&&tS(n)&&(this._overAt=n.time),this._overAt>=0&&n.time-this._overAt>xS&&(this._running=!1,this._onOver(n))),requestAnimationFrame(this._frame)};_tickCountdown(e){if(this._countdown<=-.9)return!1;this._countdown===CS&&this._audio.beep(!1);let t=Math.ceil(this._countdown);this._countdown-=e;let n=Math.ceil(this._countdown);return n!==t&&t>0&&this._audio.beep(n<=0),this._countdown>0}_updateFollow(e){let t=e.cars;this._local.forEach((e,n)=>{if(!t[e.index].eliminated)return;let r=t.findIndex(e=>e.place===1);r>=0&&r!==this._follow[n]&&(this._follow[n]=r,this._view.resetCameras())})}_readInputs(e,t,n){for(let r of this._local){let i=this._frames[r.index];if(this.autopilot){let n=e.cars[r.index];Ax(n,e.cars,t.track,G_(t.tunings,t.cards,n),t.rules,i);continue}let a=this._stepsLast===0?i.cardPick:void 0;r.input.read(i,n),i.cardPick??=a}for(let[e,t]of this._remote)t.read(this._frames[e],n)}},TS=class{_root;_title;_outcome;_list;_next;constructor(e){let t=t=>{let n=e.querySelector(t);if(!n)throw Error(`ResultPanel: falta ${t}`);return n};this._root=t(`#result`),this._title=t(`#result-title`),this._outcome=t(`#result-outcome`),this._list=t(`#result-list`),this._next=t(`#result-next`),this._next.textContent=$(`run.next`),e.querySelectorAll(`.menu-back`).forEach(e=>e.textContent=$(`menu.back`))}show(e,t){let n=e.cars.filter(e=>e.player>=0).length,r=[...e.cars].sort((e,t)=>e.place-t.place);this._title.textContent=t.title,this._outcome.textContent=t.outcome,this._next.hidden=!t.canContinue,this._list.replaceChildren(...r.map(e=>{let t=document.createElement(`li`),r=e.player>=0;r&&(t.className=`me`);let i=r?n>1?$(`result.player`).replace(`{n}`,String(e.player+1)):$(`result.you`):$(`result.car`).replace(`{n}`,String(Dg(e.skin))),a=e.finished?`${e.finishTime.toFixed(2)} s`:$(`result.out`).replace(`{n}`,String(e.eliminatedAt+1));return t.textContent=`${e.place}. ${i}: ${a}`,t})),this._root.hidden=!1,this._root.parentElement?.classList.add(`showing-result`)}hide(){this._root.hidden=!0,this._root.parentElement?.classList.remove(`showing-result`)}},ES=class{_onMenu;_drive;_result;_run=Ev();_players=1;_picks=[];_room=null;_remote=new Map;_slots=new Map;constructor(e,t){this._onMenu=t,this._drive=new wS(e,e=>this._raceOver(e)),this._result=new TS(e),e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-action]`)?.dataset.action;t===`menu`?this._toMenu():t===`next`&&this._next()})}begin(e,t){this._leaveRoom(),this._players=e,this._picks=t,this._run=Ev(),this._startRace()}beginHost(e,t){this._room=e,this._players=e.players.length,this._picks=e.players.map((n,r)=>r===0?t:Q_(sv,e.picks.get(n),x_.length)),this._slots=new Map(e.players.map((e,t)=>[e,t])),this._remote=new Map(e.players.slice(1).map((e,t)=>[t+1,new Tv])),e.onInput=(e,t)=>this._remote.get(this._slots.get(e)??-1)?.receive(t),e.onLobby=e=>this._slots.forEach((t,n)=>!e.includes(n)&&this._remote.get(t)?.clear()),this._drive.onSnapshot=t=>e.sendSnap(Iv(t)),this._run=Ev(),this._startRace()}beginGuest(e){this._room=e,this._drive.onLocalInput=t=>e.sendInput(t),e.onStart=t=>{this._result.hide();let n=lv(t.region),r=JSON.parse(t.grid);this._drive.start({track:cv(t.track),colors:n.colors,players:t.players,local:[t.slots[e.selfId]??1],mirror:!0,picks:[],grid:r})},e.onSnap=e=>this._drive.applySnapshot(e),e.onOver=e=>{this._drive.applySnapshot(e.snap),this._drive.stop();let t=this._drive.state;t&&this._result.show(t,{title:e.title,outcome:e.canContinue?`${e.outcome}. ${$(`net.waitHost`)}`:e.outcome,canContinue:!1})},e.onMenu=()=>this._toMenu(),e.onHostLeft=()=>this._toMenu()}_startRace(){let e=ov.races[this._run.race];if(this._result.hide(),this._drive.start({track:cv(e.track),colors:lv(e.region).colors,players:this._players,local:this._room?[0]:Array.from({length:this._players},(e,t)=>t),remote:this._remote,picks:this._picks}),this._room){let t=Object.fromEntries(this._slots);this._room.sendStart({track:e.track,region:e.region,players:this._players,slots:t,grid:JSON.stringify(this._drive.grid)})}}_raceOver(e){if(this._drive.autopilot&&!this._room){this._startRace();return}let t=Dv(e);Ov(this._run,ov,t);let n=ov.races.length,r=this._run.race===n-1,i=$(lv(ov.races[this._run.race].region).nameKey),a=$(`run.title`).replace(`{n}`,String(this._run.race+1)).replace(`{total}`,String(n)).replace(`{region}`,i),o=r?$(`run.lost.final`):$(`run.lost.podium`).replace(`{goal}`,String(ov.podium)),s=this._run.status===`won`?$(`run.won`):this._run.status===`next`?$(`run.passed`):o,c=this._run.status===`next`;this._room?.sendOver({snap:Iv(e),title:a,outcome:s,canContinue:c}),this._result.show(e,{title:a,outcome:s,canContinue:c})}_next(){this._room?.role!==`guest`&&(kv(this._run),this._run.status===`racing`&&this._startRace())}_toMenu(){this._room?.role===`host`&&this._room.sendMenu(),this._leaveRoom(),this._drive.stop(),this._result.hide(),this._onMenu()}_leaveRoom(){this._room?.leave(),this._room=null,this._remote=new Map,this._slots=new Map,this._drive.onSnapshot=null,this._drive.onLocalInput=null}},DS=document.getElementById(`app`);if(!DS)throw Error(`main: falta #app`);var OS=new wv(DS),kS=new xv(DS,e=>OS.open(e,t=>AS.begin(e,t)),()=>jS.show()),AS=new ES(DS,()=>{jS.hide(),kS.show()}),jS=new yv(DS,(e,t)=>AS.beginHost(e,t),e=>AS.beginGuest(e),()=>kS.show());new URLSearchParams(location.search).has(`auto`)?AS.begin(1,[_v(0)]):kS.show();