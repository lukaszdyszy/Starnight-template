class Slider
{
  changeSlide(){
    this.handler.style.transform='translateX(-'+ this.slide_width*this.slide_nr +'px)';
    if(this.peg == true){this.changePeg();}
  }

  slideNext(){
    if(this.slide_nr < this.slide_number-1){
      this.slide_nr++;
      this.changeSlide();
    }
  }
  slidePrev(){
    if(this.slide_nr > 0){
      this.slide_nr--;
      this.changeSlide();
    }
  }

  changePeg(){
    for(let i=0; i<this.slide_number; i++){
      this.pegCnt.querySelectorAll('ul.slide-peg > li')[i].style.opacity=0.4;
    }
    this.pegCnt.querySelectorAll('ul.slide-peg > li')[this.slide_nr].style.opacity=1;
  }


  constructor(args = {}){
    this.alias = args['alias'];
    this.handler = document.querySelector(args['alias'] + '> .slider-wrap > .slides');
    this.slide_nr = args['start'] || 0;
    this.slide_number = this.handler.querySelectorAll('.slide').length;
    this.slide_width = this.handler.querySelector('.slide').getBoundingClientRect().width;
    this.draggable = args['draggable'] || false;
    this.transition = args['transition'] + 's' || '0.5s';
    this.nav = args['nav'] || false;
    this.peg = args['peg'] || false;
    this.pegStyle = args['pegStyle'] || 'dotted';
    this.pegClickable = args['pegClickable'] || false;
    this.loop = args['loop'] || false;
    this.loopDelay = args['loopDelay'] || 3000;
    this.pegCnt = document.querySelector(this.alias + '> .slide-pegination');

    document.querySelector(args['alias'] + '> .slider-wrap > .slides').style.width = (this.slide_number * this.slide_width) + 'px';
    document.querySelector(this.alias + '> .slider-wrap').style.width = this.slide_width + 'px';
    this.handler.style.transition=this.transition;

    if(this.draggable){

      let mouseStart;
      let mouseEnd;
      let pressed = false;
      let obj = this;
      let cur_trnsl = this.slide_width*this.slide_nr;

      this.handler.addEventListener('click', function(){obj.loop=false;})

      this.handler.addEventListener('pointerdown', function(){
        obj.handler.style.transition='0s';
        mouseStart = event.clientX;
        pressed = true;
      });
      this.handler.addEventListener('pointerup', function(){
        obj.handler.style.transition=obj.transition;
        pressed = false;
        mouseEnd = event.clientX;
        if(mouseEnd > mouseStart && mouseEnd-mouseStart > 125 && obj.slide_nr > 0){obj.slidePrev();}
        else if(mouseEnd < mouseStart && mouseStart-mouseEnd > 125 && obj.slide_nr < obj.slide_number-1){obj.slideNext();}
        else{obj.changeSlide();}
        cur_trnsl = obj.slide_width*obj.slide_nr;
      });
      this.handler.addEventListener('pointermove', function(){
        if(pressed){
          let hndl = event.clientX - mouseStart;
          cur_trnsl = (obj.slide_width*obj.slide_nr) - hndl;
          if(cur_trnsl > 0 && cur_trnsl < obj.slide_width*(obj.slide_number-1)){
            obj.handler.style.transform='translateX(-'+ cur_trnsl +'px)';
          }
        }
      });

    }

    if(this.nav){
      let obj = this;
      obj.navPrev = document.querySelector(obj.alias + '> .slider-nav > .prev');
      obj.navNext = document.querySelector(obj.alias + '> .slider-nav > .next');

      obj.navPrev.addEventListener('click', function(){obj.loop=false;obj.slidePrev();});
      obj.navNext.addEventListener('click', function(){obj.loop=false;obj.slideNext();});
    }

    if(this.peg){
      let obj = this;
      let pegs = '<ul class="slide-peg">';

      for(let i=0; i<obj.slide_number; i++){
        if(obj.pegStyle == 'dotted'){pegs += '<li>&bull;</li>';}
        else if(obj.pegStyle == 'num'){pegs += '<li>'+(i+1)+'</li>';}
        else{pegs += '<li>'+obj.pegStyle+'</li>';}
      }
      pegs += '</ul>';

      obj.pegCnt.innerHTML = pegs;

      if(obj.pegClickable){
        let lis = obj.pegCnt.querySelectorAll('li');
        for(let i=0; i<lis.length; i++){
          lis[i].addEventListener('click', function(){obj.loop = false;obj.slide_nr = i; obj.changeSlide();});
        }
      }
    }

    this.changeSlide();

    if(this.loop){
      let obj = this;
      function slideLoop(){
        if(obj.loop){
          if(obj.slide_nr==obj.slide_number-1){obj.slide_nr=-1;}
          obj.slideNext();
          setTimeout(function(){slideLoop();}, obj.loopDelay);
        }
      }
      setTimeout(function(){slideLoop();}, obj.loopDelay);
    }

  }

}
