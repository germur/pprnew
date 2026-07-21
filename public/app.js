/* Paramount — shared interactions */
(function(){
  // sticky header shadow
  const head=document.querySelector('.head');
  const onScroll=()=>{ if(head) head.classList.toggle('scrolled', window.scrollY>8); };
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  // mobile menu
  const burger=document.querySelector('.burger');
  const mnav=document.querySelector('.mnav');
  if(burger&&mnav){
    burger.addEventListener('click',()=>{
      const open=mnav.classList.toggle('open');
      burger.classList.toggle('open',open);
      document.body.style.overflow=open?'hidden':'';
    });
    mnav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      mnav.classList.remove('open');burger.classList.remove('open');document.body.style.overflow='';
    }));
  }

  // reveal on scroll
  const io=new IntersectionObserver((es)=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach((el,i)=>{
    el.style.transitionDelay=(Math.min(i%4,3)*70)+'ms';
    io.observe(el);
  });

  // before / after sliders
  document.querySelectorAll('[data-ba]').forEach(ba=>{
    const handle=ba.querySelector('.ba-handle');
    const after=ba.querySelector('.ba-after');
    let drag=false;
    const set=(x)=>{
      const r=ba.getBoundingClientRect();
      let pct=((x-r.left)/r.width)*100; pct=Math.max(2,Math.min(98,pct));
      after.style.clipPath=`inset(0 0 0 ${pct}%)`;
      handle.style.left=pct+'%';
    };
    const start=()=>drag=true; const end=()=>drag=false;
    ba.addEventListener('pointerdown',e=>{drag=true;set(e.clientX);});
    window.addEventListener('pointermove',e=>{if(drag)set(e.clientX);});
    window.addEventListener('pointerup',end);
    set(ba.getBoundingClientRect().left+ba.getBoundingClientRect().width*0.5);
  });

  // emergency form validation (works on any .ef form)
  document.querySelectorAll('form[data-emergency]').forEach(form=>{
    form.addEventListener('submit',e=>{
      e.preventDefault();
      let ok=true;
      form.querySelectorAll('[required]').forEach(inp=>{
        const wrap=inp.closest('.field');
        const valid=inp.type==='tel'? /[0-9]{7,}/.test(inp.value.replace(/\D/g,'')) : inp.value.trim().length>1;
        wrap.classList.toggle('err',!valid);
        if(!valid)ok=false;
      });
      if(ok){
        try{
          const data=new FormData(form);
          fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(data).toString()});
        }catch(err){}
        try{
          if(typeof gtag==='function'){
            gtag('event','generate_lead',{form_name:(form.getAttribute('name')||'unknown'),page_path:location.pathname});
          }
        }catch(err){}
        const done=form.querySelector('[data-success]');
        form.querySelectorAll('.field,.ef-actions,.ef-grid').forEach(el=>el.style.display='none');
        if(done){done.style.display='block';}
      }
    });
    form.querySelectorAll('input,select,textarea').forEach(inp=>{
      inp.addEventListener('input',()=>inp.closest('.field')&&inp.closest('.field').classList.remove('err'));
    });
  });
})();

  // GA4: clics en telefono como conversion
  document.addEventListener('click', function(e){
    const a = e.target.closest && e.target.closest('a[href^="tel:"]');
    if(!a) return;
    try{
      if(typeof gtag==='function'){
        gtag('event','phone_call',{link_url:a.getAttribute('href'),page_path:location.pathname});
      }
    }catch(err){}
  });
