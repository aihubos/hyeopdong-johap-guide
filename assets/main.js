(function(){
var els=document.querySelectorAll('.reveal');
if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});}
else{
 var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}})},{threshold:.08,rootMargin:'0px 0px -40px 0px'});
 els.forEach(function(e,i){io.observe(e)});
}
// stagger siblings in grids
document.querySelectorAll('.grid,.steps,.stats,.todos').forEach(function(g){Array.prototype.forEach.call(g.children,function(c,i){c.style.transitionDelay=(i*70)+'ms'})});
// active nav link
var links=[].slice.call(document.querySelectorAll('.navin a'));
var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
function onScroll(){
 var y=window.scrollY+120,cur=-1;
 secs.forEach(function(s,i){if(s&&s.offsetTop<=y)cur=i});
 links.forEach(function(a,i){a.classList.toggle('on',i===cur)});
 if(cur>=0){var a=links[cur],n=a.parentNode;var l=a.offsetLeft-n.clientWidth/2+a.clientWidth/2;if(n.scrollTo)n.scrollTo({left:l,behavior:'smooth'});}
}
var t;window.addEventListener('scroll',function(){clearTimeout(t);t=setTimeout(onScroll,60)},{passive:true});onScroll();
})();

// checklist
(function(){
var btns=[].slice.call(document.querySelectorAll('.chklist button'));
var bar=document.getElementById('progbar'),txt=document.getElementById('progtxt');
var KEY='gaein-chk-v1',saved={};
try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
function upd(){
 var n=btns.filter(function(b){return b.getAttribute('aria-pressed')==='true'}).length;
 if(bar)bar.style.width=(n/btns.length*100)+'%';
 if(txt)txt.textContent=n+' / '+btns.length+' 완료';
}
btns.forEach(function(b,i){
 if(saved[i])b.setAttribute('aria-pressed','true');
 b.addEventListener('click',function(){
  var on=b.getAttribute('aria-pressed')!=='true';
  b.setAttribute('aria-pressed',on?'true':'false');
  saved[i]=on;try{localStorage.setItem(KEY,JSON.stringify(saved))}catch(e){}
  upd();
 });
});
upd();
})();
