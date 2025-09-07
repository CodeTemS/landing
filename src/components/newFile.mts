document.addEventListener('DOMContentLoaded', function () {
const slider = document.querySelector('.slider2');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
const dots = document.querySelectorAll('.slider-dot');

let currentSlide = 0;
const totalSlides = slides.length;

function updateSlider() {
slider.style.transform = `translateX(-${currentSlide * 100}%)`;

// Update dots
dots.forEach((dot, index) => {
if (index === currentSlide) {
dot.classList.add('bg-opacity-80');
dot.classList.remove('bg-opacity-50');
} else {
dot.classList.add('bg-opacity-50');
dot.classList.remove('bg-opacity-80');
}
});
}

function nextSlide() {
currentSlide = (currentSlide + 1) % totalSlides;
updateSlider();
}

function prevSlide() {
currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
updateSlider();
}


dots.forEach((dot, index) => {
dot.addEventListener('click', () => {
currentSlide = index;
updateSlider();
});
});

// Auto slide
setInterval(nextSlide, 5000);

// Initialize
updateSlider();
});
