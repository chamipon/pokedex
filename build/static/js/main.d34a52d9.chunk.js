(this.webpackJsonpPokedex=this.webpackJsonpPokedex||[]).push([[0],{28:function(e,t,s){},30:function(e,t,s){},31:function(e,t,s){},52:function(e,t,s){},53:function(e,t,s){},54:function(e,t,s){},55:function(e,t,s){},63:function(e,t,s){},64:function(e,t,s){"use strict";s.r(t);var n=s(1),a=s.n(n),c=s(19),i=s.n(c),r=(s(28),s(2)),l=s(3),o=s.n(l),d=s(5),j=(s(30),s(6)),u=s.n(j);function f(e){return e.name.includes("nidoran")?e.name.replace("-m"," \u2642").replace("-f"," \u2640"):e.name}function b(e,t,s,n,a,c){return t=Math.floor(t/4),c?Math.floor((2*e+s+t)*(n/100)+n+10):Math.floor(Math.floor((2*e+s+t)*n/100+5)*a)}function h(e,t){var s=e.genera.find((function(e){return e.language.name===t}));return s?s.genus:e.genera[7].genus}function m(e){return e.charAt(0).toUpperCase()+e.slice(1)}s(31);var p=s(0);var v=function(e){var t=Object(n.useState)(),s=Object(r.a)(t,2),a=s[0],c=s[1];return Object(n.useEffect)((function(){!function(e){var t={};for(var s in e){var n=e[s];if(n)switch(s){case"min_level":t.min_level=n;break;case"location":t.location=m(n.name.replaceAll("-"," "));break;case"item":t.item=m(n.name.replaceAll("-"," "));break;case"min_happiness":t.min_happiness=n;break;case"min_affection":t.min_affection=n;break;case"time_of_day":t.time_of_day=m(n);break;case"trigger":t.trigger=m(n.name.replaceAll("-"," "));break;case"known_move":t.known_move=m(n.name.replaceAll("-"," "));break;case"gender":1==n?t.gender="Female":2==n&&(t.gender="Male");break;case"known_move_type":t.known_move_type=m(n.name.replaceAll("-"," "));break;case"needs_overworld_rain":t.needs_overworld_rain=n;break;case"held_item":t.held_item=m(n.name.replaceAll("-"," "));break;case"trade_species":t.trade_species=m(n.name.replaceAll("-"," "));break;default:console.log("NOT HANDLED: "+s),console.log(n)}}c(t)}(e.evoDetails)}),[]),Object(p.jsxs)("span",{className:"text-center EvoChainArrow",children:[a&&a.trigger&&Object(p.jsxs)("span",{children:[Object(p.jsx)("i",{title:"Trigger: "+a.trigger,className:"d-none d-md-inline-block fas fa-2x fa-long-arrow-alt-right"}),Object(p.jsx)("i",{title:"Trigger: "+a.trigger,className:"d-inline-block d-md-none fas fa-2x fa-long-arrow-alt-down"})]}),a&&a.min_level&&Object(p.jsxs)("div",{children:["Lv. ",a.min_level]}),a&&"Trade"==a.trigger&&!a.trade_species&&Object(p.jsx)("i",{title:"Trade",className:"fas fa-lg d-block fa-people-arrows"}),a&&"Trade"==a.trigger&&a.trade_species&&Object(p.jsxs)("div",{children:[Object(p.jsx)("i",{title:"Trade for "+a.trade_species,className:"fas fa-lg d-block fa-people-arrows"})," ",a.trade_species]}),a&&a.item&&Object(p.jsx)("div",{children:a.item}),a&&a.held_item&&Object(p.jsx)("div",{children:a.held_item}),a&&a.location&&Object(p.jsxs)("div",{title:"Location: "+a.location,children:[Object(p.jsx)("i",{class:"fas fa-map-marker-alt"})," ",a.location]}),a&&a.min_happiness&&Object(p.jsxs)("div",{title:"Minimum Happiness: "+a.min_happiness,children:[Object(p.jsx)("i",{class:"fas fa-heart"})," ",a.min_happiness]}),a&&a.min_affection&&Object(p.jsxs)("div",{title:"Minimum Pokemon-Amie Affection Level: "+a.min_affection,children:[Object(p.jsx)("i",{class:"fas fa-heart"})," Level"," ",a.min_affection]}),a&&a.time_of_day&&Object(p.jsxs)("div",{title:"Time of Day: "+a.time_of_day,children:[Object(p.jsx)("i",{class:"far fa-clock"})," ",a.time_of_day]}),a&&a.known_move&&Object(p.jsxs)("div",{title:"Known Move: "+a.known_move,children:[Object(p.jsx)("i",{class:"fas fa-compact-disc"})," ",a.known_move]}),a&&a.known_move_type&&Object(p.jsxs)("div",{title:"Known Move Type: "+a.known_move_type,children:[Object(p.jsx)("i",{class:"fas fa-compact-disc"})," ",a.known_move_type]}),a&&a.needs_overworld_rain&&Object(p.jsx)("div",{title:"Overworld Rain or Fog",children:Object(p.jsx)("i",{class:"fas fa-tint"})}),a&&"Male"==a.gender&&Object(p.jsx)("div",{title:"Male",children:Object(p.jsx)("i",{class:"fas fa-lg fa-mars"})}),a&&"Female"==a.gender&&Object(p.jsx)("div",{title:"Female",children:Object(p.jsx)("i",{class:"fas fa-lg fa-venus"})})]})};var O=function(e){return Object(p.jsx)("div",{className:"evoChainCol",children:e.chain&&e.chain.map((function(t,s){return Object(p.jsxs)("div",{className:"d-flex flex-md-row flex-column",children:[Object(p.jsx)("div",{className:"d-flex m-auto",children:t.poke[0][t.poke[0].length-1]&&Object(p.jsx)(v,{evoDetails:t.poke[0][t.poke[0].length-1]})}),Object(p.jsx)("div",{className:"evoColImg",children:t.poke[1].sprites&&Object(p.jsx)("img",{title:m(t.poke[1].name),alt:m(t.poke[1].name),src:e.isShiny?t.poke[1].sprites.front_shiny:t.poke[1].sprites.front_default,className:"d-flex"})},"sprite"+s)]})}))})};var x=function(e){var t=Object(n.useState)(),a=Object(r.a)(t,2),c=a[0],i=a[1];return Object(n.useEffect)((function(){function t(){return(t=Object(d.a)(o.a.mark((function t(){var n,a,c,r,j,u;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=s(8),a=new n.Pokedex({cacheImages:!0,timeout:5e3}),t.next=4,a.resource(e.speciesUrl);case 4:return c=t.sent,r=c.evolution_chain.url.split("/")[6],t.next=8,a.getEvolutionChainById(r);case 8:return j=t.sent,l(u=[],j.chain,0),t.next=13,Promise.all(u.map(function(){var e=Object(d.a)(o.a.mark((function e(t,s){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(t.map(function(){var e=Object(d.a)(o.a.mark((function e(t,n){var c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.getPokemonByName(t.poke.name);case 2:c=e.sent,u[s][n].poke=[t.evoDetails,c];case 4:case"end":return e.stop()}}),e)})));return function(t,s){return e.apply(this,arguments)}}()));case 2:case"end":return e.stop()}}),e)})));return function(t,s){return e.apply(this,arguments)}}()));case 13:i({id:r,chain:u});case 14:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[]),Object(p.jsx)("div",{className:"evoChain",children:c&&c.chain.map((function(t,s){return Object(p.jsx)(O,{isShiny:e.isShiny,chain:t},"col"+s)}))});function l(e,t,s){s++;for(var n=0;n<t.evolves_to.length;n++)l(e,t.evolves_to[n],s);e[s-1]||(e[s-1]=[]),e[s-1].push({poke:t.species,evoDetails:t.evolution_details})}};s(52);var g=function(e){var t=Object(n.useState)(),s=Object(r.a)(t,2),a=s[0],c=s[1];return Object(n.useEffect)((function(){c(function(e,t){var s,n=e.stats,a={};for(s=0;s<n.length;s++)a[n[s].stat.name]=n[s].base_stat;return a.length=++s,t?a[t]:a}(e.poke))}),[e.poke]),Object(p.jsx)(p.Fragment,{children:a&&Object(p.jsxs)("div",{className:"stats d-flex flex-column",children:[Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("div",{className:"statsCell"}),Object(p.jsx)("div",{className:"statsCell",children:"HP"}),Object(p.jsx)("div",{className:"statsCell",children:"Atk"}),Object(p.jsx)("div",{className:"statsCell",children:"Def"}),Object(p.jsx)("div",{className:"statsCell",children:"Sp. Def"}),Object(p.jsx)("div",{className:"statsCell",children:"Sp. Atk"}),Object(p.jsx)("div",{className:"statsCell",children:"Spd"})]}),Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("div",{className:"statsCell w-100 w-sm-auto",children:"Base"}),Object(p.jsx)("div",{className:"statsCell",children:a.hp}),Object(p.jsx)("div",{className:"statsCell",children:a.attack}),Object(p.jsx)("div",{className:"statsCell",children:a.defense}),Object(p.jsx)("div",{className:"statsCell",children:a["special-attack"]}),Object(p.jsx)("div",{className:"statsCell",children:a["special-defense"]}),Object(p.jsx)("div",{className:"statsCell",children:a.speed})]}),Object(p.jsxs)("div",{className:"row",children:[Object(p.jsx)("div",{className:"statsCell",children:"Max"}),Object(p.jsx)("div",{className:"statsCell",children:b(a.hp,255,31,100,1.1,!0)}),Object(p.jsx)("div",{className:"statsCell",children:b(a.attack,255,31,100,1.1,!1)}),Object(p.jsx)("div",{className:"statsCell",children:b(a.defense,255,31,100,1.1,!1)}),Object(p.jsx)("div",{className:"statsCell",children:b(a["special-attack"],255,31,100,1.1,!1)}),Object(p.jsx)("div",{className:"statsCell",children:b(a["special-defense"],255,31,100,1.1,!1)}),Object(p.jsx)("div",{className:"statsCell",children:b(a.speed,255,31,100,1.1,!1)})]})]})})};s(53);var k=function(e){var t=Object(n.useState)(),s=Object(r.a)(t,2),a=s[0],c=s[1];return Object(n.useEffect)((function(){e.poke&&c(function(e){var t=[];return e.types.forEach((function(e){t[e.slot-1]=e.type.name})),t}(e.poke))}),[e.poke]),Object(p.jsx)(p.Fragment,{children:a&&Object(p.jsxs)("div",{className:"types",children:[Object(p.jsx)("span",{className:"badge "+a[0],children:m(a[0])}),a[1]&&Object(p.jsx)("span",{className:"badge ms-1 "+a[1],children:m(a[1])})]})})};s(54);var w=function(e){var t=Object(n.useState)(),s=Object(r.a)(t,2),a=s[0],c=s[1];return Object(n.useEffect)((function(){e.species&&c(function(e){if(-1===e.gender_rate)return-1;var t=100*e.gender_rate/8;return{mChance:100-t,fChance:t}}(e.species))}),[e.species]),Object(p.jsx)(p.Fragment,{children:a&&(-1!==a?Object(p.jsxs)("div",{className:"gender",children:["Male: "+a.mChance+"%",Object(p.jsx)("br",{}),"Female: "+a.fChance+"%"]}):Object(p.jsx)("div",{children:"Genderless"}))})};var N=function(e){return Object(p.jsx)(p.Fragment,{children:e.species&&Object(p.jsx)("div",{className:"eggSteps",children:"Base Egg Steps: "+(t=e.species,255*(t.hatch_counter+1))})});var t};var _=function(e){return Object(p.jsx)(p.Fragment,{children:e.species&&Object(p.jsx)("div",{className:"genus",children:h(e.species)})})};var C=function(e){var t=Object(n.useState)(),a=Object(r.a)(t,2),c=a[0],i=a[1],l=Object(n.useState)(!1),j=Object(r.a)(l,2),u=j[0],b=j[1];return Object(n.useEffect)((function(){function t(){return(t=Object(d.a)(o.a.mark((function t(){var n,a,c;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.render){t.next=8;break}return n=s(8),a=new n.Pokedex({cacheImages:!0,timeout:5e3}),t.next=5,a.resource(e.speciesUrl);case 5:c=t.sent,i(c),b(!0);case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e.render,e.speciesUrl]),Object(p.jsx)("div",{className:"card-body",style:{width:e.width,right:e.offset},children:u&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)("h2",{className:"pokeTitle",children:["#",e.number," ",e.poke&&m(f(e.poke))]}),Object(p.jsx)(_,{species:c}),Object(p.jsx)(k,{poke:e.poke}),Object(p.jsx)(x,{speciesUrl:e.speciesUrl,poke:e.poke,pokeList:e.pokeList,pokeListUpdater:e.pokeListUpdater,evoChainList:e.evoChainList,evoChainListUpdater:e.evoChainListUpdater,isShiny:e.isShiny},e.key),Object(p.jsx)(g,{poke:e.poke}),Object(p.jsx)(w,{species:c}),Object(p.jsx)(N,{species:c})]})})};var S,y=function(e){var t=Object(n.useState)(""),a=Object(r.a)(t,2),c=a[0],i=a[1],l=Object(n.useState)(!1),j=Object(r.a)(l,2),b=j[0],h=j[1],v=Object(n.useState)(0),O=Object(r.a)(v,2),x=O[0],g=O[1],k=Object(n.useState)(0),w=Object(r.a)(k,2),N=w[0],_=w[1],S=Object(n.useRef)(null),y=new(s(8).Pokedex)({cacheImages:!0,timeout:5e3});return Object(n.useEffect)((function(){function t(){return(t=Object(d.a)(o.a.mark((function t(){var s;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.getPokemonByName(e.poke.name);case 2:s=t.sent,i(s);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[]),Object(n.useEffect)((function(){e.selected!==e.number&&h(!1)}),[e.number,e.selected]),window.window.addEventListener("resize",(function(){b&&L()})),Object(p.jsxs)("div",{ref:S,className:"card pokeCard w-100 ".concat(b&&"expanded"),children:[c&&Object(p.jsxs)("div",{onClick:function(){e.selected===e.number?(h(!1),e.setSelected("")):(h(!0),e.setSelected(e.number),L())},role:"button",className:"card-header",children:[Object(p.jsx)("div",{className:"pokeSprite",children:Object(p.jsx)("img",{className:"h-100",src:c&&e.isShiny?c.sprites.front_shiny:c.sprites.front_default,alt:c&&m(f(c))+"Sprite"})}),Object(p.jsxs)("span",{className:"pokeName m-auto",children:["#",e.number," ",c&&m(f(c))]})]}),c&&Object(p.jsx)(C,{width:x,offset:N,render:b,number:e.number,speciesUrl:e.poke.url,poke:c,pokeList:e.pokeList,pokeListUpdater:e.pokeListUpdater,evoChainList:e.evoChainList,evoChainListUpdater:e.evoChainListUpdater,isShiny:e.isShiny},c&&m(f(c))+"_evoChain")]});function L(){var t=u()(S.current).parents(".cardlazy")[0],s=Array.from(t.parentNode.children).indexOf(t)%e.colCount;g(u()("#PokeGrid").width()-24),_(s*(u()(t).width()+24))}};s(55);function L(){return(L=Object(d.a)(o.a.mark((function e(){var t,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return S.prompt(),e.next=3,S.userChoice;case 3:t=e.sent,s=t.outcome,console.log("User response to the install prompt: ".concat(s)),S=null;case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var E=function(e){var t=e.isDark,s=e.setIsDark,a=e.isShiny,c=e.setIsShiny,i=e.setSearchParams,l=e.showInstall,o=e.setShowInstall,d=Object(n.useState)(!1),j=Object(r.a)(d,2),f=j[0],b=j[1];return Object(n.useEffect)((function(){var e;e=o,window.addEventListener("beforeinstallprompt",(function(t){t.preventDefault(),S=t,console.log(S),e(!0),console.log("'beforeinstallprompt' event was fired.")})),window.addEventListener("appinstalled",(function(){e(!1),S=null,console.log("PWA was installed")}))}),[o]),Object(p.jsx)("nav",{className:"navbar fixed-bottom",children:Object(p.jsxs)("div",{className:"h-100 w-100 d-flex flex-row flex-md-column",children:[Object(p.jsx)("img",{id:"brandLogo",class:"me-auto",alt:"ultraball",src:"./ultraball.png"}),Object(p.jsxs)("div",{class:"d-flex flex-row",children:[Object(p.jsx)("button",{onClick:function(){b(!f),u()("#searchbar").focus()},className:"navbaritem d-flex",children:Object(p.jsx)("span",{className:(f?"fa-times":"fa-search")+" fas fa-lg"})}),Object(p.jsx)("input",{id:"searchbar",onChange:function(){i(u()("#searchbar").val())},className:(f?"":"closed")+" form-control",type:"search",placeholder:"Search","aria-label":"Search"})]}),Object(p.jsx)("button",{className:"navbaritem d-flex",children:Object(p.jsx)("span",{className:"fas fa-filter fa-lg "})}),Object(p.jsxs)("button",{onClick:function(){return c(!a)},className:"navbaritem d-flex mt-0 mt-md-auto",children:[a?Object(p.jsx)("span",{className:"fas fa-dollar-sign fa-lg "}):Object(p.jsx)("span",{className:"fas fa-euro-sign fa-lg "})," "]}),Object(p.jsx)("button",{onClick:function(){return s(!t)},className:"navbaritem d-flex",children:t?Object(p.jsx)("span",{className:"fas fa-sun fa-lg "}):Object(p.jsx)("span",{className:"fas fa-moon fa-lg "})}),l&&Object(p.jsx)("button",{onClick:function(){return function(){return L.apply(this,arguments)}(o)},id:"installButton",className:"navbaritem d-flex",children:Object(p.jsx)("span",{className:"fas fa-download fa-lg"})})]})})},P=s(10),U=s.n(P),A=(s(63),s(23));var I=function(){var e=Object(n.useState)(""),t=Object(r.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)(""),l=Object(r.a)(i,2),o=l[0],d=l[1],j=Object(n.useState)(0),u=Object(r.a)(j,2),f=u[0],b=u[1],h=Object(n.useState)([]),m=Object(r.a)(h,2),v=m[0],O=m[1],x=Object(n.useState)([]),g=Object(r.a)(x,2),k=g[0],w=g[1],N=Object(n.useState)(!0),_=Object(r.a)(N,2),C=_[0],S=_[1],L=Object(n.useState)(!1),I=Object(r.a)(L,2),D=I[0],F=I[1],M=Object(n.useState)(""),T=Object(r.a)(M,2),W=T[0],B=T[1],z=Object(n.useState)(""),G=Object(r.a)(z,2),H=G[0],R=G[1],J=Object(n.useState)(!1),K=Object(r.a)(J,2),$=K[0],q=K[1],Q=Object(n.useState)(1),V=Object(r.a)(Q,2),X=V[0],Y=V[1],Z=Object(n.useState)(!0),ee=Object(r.a)(Z,2),te=ee[0],se=ee[1];return Object(n.useEffect)((function(){var e=new(s(8).Pokedex)({cacheImages:!0,timeout:1e4}),t=1;window.innerWidth>=992?t=3:window.innerWidth>=576&&(t=2),Y(t),e.getPokemonSpeciesList().then((function(e){c(e.results),d(e.results.slice(0,20*t)),b(20*t)})),window.addEventListener("resize",(function(){Y(window.innerWidth>=992?3:window.innerWidth>=576?2:1)}))}),[]),Object(n.useEffect)((function(){Object(P.forceCheck)(),a&&d(a.filter((function(e){return e.name.includes(W)||e.url.split("/")[6].toString().startsWith(W)})).slice(0,f))}),[W,f,a]),Object(p.jsxs)("div",{id:"modeContainer",className:C&&"dark",children:[Object(p.jsxs)("div",{id:"scrollContainer",className:"scrollContainer",children:[Object(p.jsx)("h1",{className:"text-center",children:"Ultradex"}),Object(p.jsx)("div",{id:"PokeGrid",className:"mx-auto container row",children:Object(p.jsxs)(A.a,{className:"row",dataLength:f,next:function(){var e=f+20*X;e>=898&&(e=898,se(!1)),b(e)},hasMore:te,loader:"",scrollableTarget:"scrollContainer",children:[o&&o.map((function(e,t){return(e.name.includes(W)||e.url.split("/")[6].toString().startsWith(W))&&Object(p.jsx)(U.a,{className:"cardlazy col-12 col-sm-6 col-lg-4",scrollContainer:".scrollContainer",offset:150,height:98,once:!0,children:Object(p.jsx)(y,{number:e.url.split("/")[6],poke:e,pokeList:v,pokeListUpdater:O,evoChainList:k,evoChainListUpdater:w,selected:H,setSelected:R,isShiny:D,colCount:X},e.name+t)})})),0===o.length&&a&&Object(p.jsx)("span",{className:"text-center",children:"No matches found!"})]})})]}),Object(p.jsx)(E,{showInstall:$,setShowInstall:q,isDark:C,setIsDark:S,isShiny:D,setIsShiny:F,setSearchParams:B}),Object(p.jsx)("button",{id:"installButton",children:"Install"})]})},D=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function F(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var s=e.installing;null!=s&&(s.onstatechange=function(){"installed"===s.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var M=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,65)).then((function(t){var s=t.getCLS,n=t.getFID,a=t.getFCP,c=t.getLCP,i=t.getTTFB;s(e),n(e),a(e),c(e),i(e)}))};i.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(I,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");D?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(s){var n=s.headers.get("content-type");404===s.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):F(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):F(t,e)}))}}(),M()}},[[64,1,2]]]);
//# sourceMappingURL=main.d34a52d9.chunk.js.map