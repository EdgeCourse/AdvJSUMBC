let slideIndex = 0;
const slides = [...document.querySelectorAll('.mySlides')];
const dots = [...document.querySelectorAll('.dot')];

const showSlides = n => {
  slideIndex = (n + slides.length) % slides.length;

  slides.map((s, i) => s.style.display = i === slideIndex ? 'block' : 'none');
  dots.map((d, i) => d.classList.toggle('active', i === slideIndex));
};

const plusSlides = n => showSlides(slideIndex + n);
const currentSlide = n => showSlides(n);

// Navigation buttons
document.querySelector('.prev')?.addEventListener('click', () => plusSlides(-1));
document.querySelector('.next')?.addEventListener('click', () => plusSlides(1));

// Dot click navigation
dots.forEach((dot, i) => dot.addEventListener('click', () => currentSlide(i)));

// Fun: if all dots are inactive, reset to first slide
const ensureOneActiveDot = () => {
  if (dots.every(d => !d.classList.contains('active'))) {
    dots[0].classList.add('active');
    slides[0].style.display = 'block';
  }
};

showSlides(slideIndex);

// Auto-advance
setInterval(() => {
  plusSlides(1);
  ensureOneActiveDot();
}, 2000);

/*
//more concise
let slideIndex = 0;
const slides = [...document.querySelectorAll('.mySlides')];
const dots = [...document.querySelectorAll('.dot')];

const showSlides = (n) => {
  slideIndex = (n + slides.length) % slides.length;
  slides.forEach((s, i) => s.style.display = i === slideIndex ? 'block' : 'none');
  dots.forEach((d, i) => d.classList.toggle('active', i === slideIndex));
};

const plusSlides = n => showSlides(slideIndex + n);
const currentSlide = n => showSlides(n);

document.querySelector('.prev')?.addEventListener('click', () => plusSlides(-1));
document.querySelector('.next')?.addEventListener('click', () => plusSlides(1));
dots.forEach((dot, i) => dot.addEventListener('click', () => currentSlide(i)));

showSlides(slideIndex);
setInterval(() => plusSlides(1), 2000);
*/
/*
//longer es6
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
document.querySelector('.prev').addEventListener('click', () => plusSlides(-1));
document.querySelector('.next').addEventListener('click',   
() => plusSlides(1));

// Dot image navigation
document.querySelectorAll('.dot').forEach((dot, index) => {
  dot.addEventListener('click', () => currentSlide(index + 1));
});

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function   
showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");   

  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

// Automatic slideshow every 2 seconds
setInterval(function() {
  plusSlides(1);
}, 2000);
*/
//ES5 version:
/*
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
var prevButton = document.querySelector('.prev');
var nextButton = document.querySelector('.next');
prevButton.addEventListener('click', function() { plusSlides(-1); });
nextButton.addEventListener('click', function() { plusSlides(1); });

// Thumbnail image controls
var dots = document.querySelectorAll('.dot');
for (var i = 0; i < dots.length; i++) {
  dots[i].addEventListener('click', function(index) {
    return function() { currentSlide(index + 1); };
  }(i)); 
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

// Automatic slideshow every 2 seconds
setInterval(function() {
  plusSlides(1);
}, 2000);
*/