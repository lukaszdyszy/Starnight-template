var comments = new Slider({
  alias: '#cmt-slider',
  transition: 0.6,
  peg: true,
  pegStyle: '<i class="fas fa-circle"></i>',
  pegClickable: true,
  draggable: true
});
var ftrs = new Slider({
  alias: '#ftr-slider',
  transition: 0.6,
  nav: true
});

let bttn = document.querySelector('a.get');
let el = bttn.getAttribute('href');
let target = document.querySelector(el);
let offs = target.offsetTop;
bttn.addEventListener('click', function(ev){
  ev.preventDefault();
  window.scroll({
    top: offs,
    behavior: 'smooth'
  });
});

document.getElementById('toup').addEventListener('click', function(ev){
  ev.preventDefault();
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
  console.log('scrol');
});

document.getElementById('play').addEventListener('click', function(){
  let video = document.getElementById('intro-bg');
  if(video.paused){
    video.play();
    this.src = 'img/pause.png';
  } else {
    video.pause();
    this.src = 'img/play.png';
  }
});

window.onresize = function(){
  comments = new Slider({
    alias: '#cmt-slider',
    transition: 0.6,
    peg: true,
    pegStyle: '<i class="fas fa-circle"></i>',
    pegClickable: true,
    draggable: true
  });
  ftrs = new Slider({
    alias: '#ftr-slider',
    transition: 0.6,
    nav: true
  });
}
