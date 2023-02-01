"use strict";

var photos = [];
var pictureNum = 1;

var photosClickHandler = function photosClickHandler() {
  nnn = 12;
  alert(nnn);
  return nnn;
};

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayImage = document.querySelector('.gallery-overlay-image');
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
var pictures = document.querySelector('.pictures');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function creatPhotos() {
  var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var descriptions = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка'];

  for (var i = 1; i < 26; i++) {
    photos[i] = {
      url: '../photos/' + i + '.jpg',
      likes: 14 + getRandomInt(185),
      comment: comments[getRandomInt(6)],
      description: descriptions[getRandomInt(6)]
    };
  }
}

creatPhotos();
var fragment = document.createDocumentFragment();

function creatFragment() {
  var pictureTemp = document.querySelector('#picture-template').content.querySelector('.picture');

  for (var i = 1; i < 26; i++) {
    var element = pictureTemp.cloneNode(true);
    fragment.append(element);
    element.querySelector('img').src = photos[i].url;
    element.querySelector('.picture-likes').textContent = photos[i].likes;
    element.querySelector('.picture-comments').textContent = photos[i].comment;
  }

  ;
  var pictures = document.querySelector('.pictures');
  document.querySelector('.pictures').appendChild(fragment);
}

;
creatFragment();

function showPhoto(num) {
  document.querySelector('.gallery-overlay').classList.remove('hidden');
  document.querySelector('.gallery-overlagy-image').src = photos[num].url;
  document.querySelector('.likes-count').textContent = photos[num].likes;
  /*     document.querySelector('.comments-count').textContent = getRandomInt(200);
      document.querySelector('.social__text').textContent = photos[num].comment;
      document.querySelector('.social__caption').textContent = photos[num].description; */
}

;
showPhoto(pictureNum);
galleryOverlayClose.addEventListener('click', function () {
  galleryOverlay.classList.add('hidden');
});
pictures.addEventListener('click', photosClickHandler);