window.addEventListener("load", e => {
  const images = document.getElementsByClassName("carouselImage");
  const imagesContainer = images[0].parentNode;
  const containerWidthWithUnit = getComputedStyle(imagesContainer).getPropertyValue('width');
  const containerWidth = Number(containerWidthWithUnit.slice(0, -2));
  for (i = 0; i < images.length; i++) {
    images[i].style.left = ((containerWidth) * i) + "px";
  }
});
let currentIndex = 0;
function swipeLeft(e) {
  e.stopPropagation();
  const images = document.getElementsByClassName("carouselImage");
  const imagesContainer = images[0].parentNode;
  const containerWidthWithUnit = getComputedStyle(imagesContainer).getPropertyValue('width');
  const containerWidth = Number(containerWidthWithUnit.slice(0, -2));
  if (currentIndex === 0) {
    for (i = 0; i < images.length; i++) {
      images[i].style.transform = `translateX(${-containerWidth * (images.length - 1)}px)`;
    }
  }
  else {
    for (i = 0; i < images.length; i++) {
      images[i].style.transform = `translateX(${-containerWidth * (currentIndex - 1)}px)`;
    }
  }
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
}
function swipeRight(e) {
  e.stopPropagation();
  const images = document.getElementsByClassName("carouselImage");
  const imagesContainer = images[0].parentNode;
  const containerWidthWithUnit = getComputedStyle(imagesContainer).getPropertyValue('width');
  const containerWidth = Number(containerWidthWithUnit.slice(0, -2));
  if (currentIndex === images.length - 1) {
    for (i = 0; i < images.length; i++) {
      images[i].style.transform = `translateX(${0}px)`;
    }
  }
  else {
    for (i = 0; i < images.length; i++) {
      images[i].style.transform = `translateX(${-containerWidth * (currentIndex + 1)}px)`
    }
  }
  currentIndex += 1;
  if (currentIndex > images.length - 1) {
    currentIndex = 0;
  }
}