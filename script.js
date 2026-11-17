(function(){
  // Тонкая линия прогресса прокрутки под шапкой
  var bar=document.getElementById('progress');
  function progress(){
    var max=document.documentElement.scrollHeight-window.innerHeight;
    bar.style.transform='scaleX('+(max>0?Math.min(1,window.scrollY/max):0)+')';
  }
  window.addEventListener('scroll',progress,{passive:true});
  window.addEventListener('resize',progress);
  progress();
  // Меню на телефоне
  var burger=document.querySelector('.burger'),menu=document.getElementById('menu');
  function setMenu(open){
    menu.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',open?'true':'false');
    burger.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');
  }
  burger.addEventListener('click',function(){setMenu(!menu.classList.contains('open'));});
  menu.addEventListener('click',function(e){if(e.target.closest('a')){setMenu(false);}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){setMenu(false);}});
  // Плавное появление блоков при прокрутке: прячем только то, что ниже экрана
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window&&!reduce){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('wait');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.rv').forEach(function(el){
      if(el.getBoundingClientRect().top>window.innerHeight*0.92){el.classList.add('wait');io.observe(el);}
    });
  }
  // Форма заявки: пока без отправки; Telegram и почта подключаются отдельно
  var form=document.getElementById('request-form'),note=document.getElementById('f-note');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var digits=document.getElementById('f-phone').value.replace(/\D/g,'');
      note.hidden=false;
      if(digits.length<9){note.textContent='Укажите номер телефона полностью, чтобы мы могли перезвонить.';document.getElementById('f-phone').focus();return;}
      note.textContent='Демо-режим: форма заполнена верно, но заявка пока никуда не отправляется. Отправка в Telegram и на почту подключается отдельно.';
    });
  }
})();
