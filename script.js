const $imgContainer = document.getElementById("img-container");
const $loader = document.getElementById("loader");

const count = 3;
const apiKey = "YmggsHm3l8TWW2DKDq-tojwM553EMuhQjGNzXz-p8NA";
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    $loader.hidden = true;
  }
};

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    totalImages = photosArray.length;
    showPhotos();
  } catch (error) {
    console.log(error);
  }
}

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const showPhotos = () => {
  photosArray.forEach((photo) => {
    let aTag = document.createElement("a");
    setAttributes(aTag, {
      href: photo.links.html,
      target: "_blank",
    });

    let imgTag = document.createElement("img");

    setAttributes(imgTag, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    imgTag.addEventListener("load", imageLoaded);
    aTag.appendChild(imgTag);
    $imgContainer.appendChild(aTag);
  });
};

window.addEventListener("scroll", (e) => {
  if (
    window.scrollY + window.innerHeight > document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    imagesLoaded = 0;
    getPhotos();
  }
});

getPhotos();
