var carousel = document.querySelector('.carousel');
var prevButton = document.getElementById('prev-btn');
var nextButton = document.getElementById('next-btn');
var images = carousel.querySelectorAll('img');
var currentIndex = 0;

function showImage(index) {
    for (var i = 0; i < images.length; i++) {
        if (i === index) {
            images[i].style.display = 'block';
        } else {
            images[i].style.display = 'none';
        }
    }
}

function prevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    showImage(currentIndex);
}

function nextImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    showImage(currentIndex);
}

prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

