'use strict';

(function () {
  /***************** Запрос на сервер к файлу source.json *******************/
  var request = new XMLHttpRequest();
  request.addEventListener('readystatechange', function () {
    window.aaa = 15;

    if (request.readyState === 4 && request.status == 200) {
      window.onLoad = JSON.parse(request.response);
    } else {
      window.onError = "Что-то пошло не так!";
    }

    ;
  });
  request.open('GET', 'js/source.json', false);
  request.setRequestHeader('Content-type', 'application/json', 'charset=utf-8');
  request.send();
})();

(function () {
  /********************************  Отрисовка загрузки на главном экране  **********************************/
  var photos = [];
  var pictureNum = 1;
  var sizeControlsValue = 100;
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlagyImage = document.querySelector('.gallery-overlagy-image');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  var pictures = document.querySelector('.pictures');
  var uploadEffectPreview = document.querySelectorAll('.upload-effect-preview');

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function creatPhotos() {
    for (var i = 1; i < 26; i++) {
      photos[i] = {
        url: 'photos/' + i + '.jpg',
        likes: window.onLoad[i - 1].likes,
        comment: window.onLoad[i - 1].comments[0],
        description: window.onLoad[i - 1].description
      };
    }
  }

  function creatFragment() {
    var fragment = document.createDocumentFragment();
    var pictureTemp = document.querySelector('#picture-template').content.querySelector('.picture');
    creatPhotos();

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
  creatFragment(); // **********************  Показ фото на весь экран  ************************

  function showPhoto(num) {
    galleryOverlay.classList.remove('hidden');
    galleryOverlagyImage.src = photos[num].url;
    document.querySelector('.likes-count').textContent = photos[num].likes;
    document.querySelector('.comments-count').textContent = getRandomInt(200);
    document.querySelector('.social__text').textContent = photos[num].comment;
    document.querySelector('.social__caption').textContent = photos[num].description;
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        galleryOverlay.classList.add('hidden');
      }
    });
  }

  ;
  galleryOverlayClose.addEventListener('click', function (evt) {
    if (evt.target != 'img') {
      galleryOverlay.classList.add('hidden');
    }
  });
  pictures.addEventListener('click', function (evt) {
    evt.preventDefault();
    pictureNum = +evt.target.src.substr(29, 2);
    showPhoto(pictureNum);
  });
})();

(function () {
  // ************************** Показ фото в окне редактирования ************************
  var iMove = 0;
  var wLine = 450; // длина линии слайдера

  var uploadFile = document.getElementById('upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var targetFileName = '';
  var uploadEffectPreview = document.querySelectorAll('.upload-effect-preview');
  var uploadEffectLevel = document.querySelector('.upload-effect-level');
  var uploadEffectNone = document.querySelector('#upload-effect-none');
  var uploadEffectChrome = document.querySelector('#upload-effect-chrome');
  var uploadEffectSepia = document.querySelector('#upload-effect-sepia');
  var uploadEffectMarvin = document.querySelector('#upload-effect-marvin');
  var uploadEffectPhobos = document.querySelector('#upload-effect-phobos');
  var uploadEffectHeat = document.querySelector('#upload-effect-heat');
  var dialogHandle = document.querySelector('.upload-effect-level-pin');
  uploadFile.addEventListener('change', function (evt) {
    effectNone();
    uploadOverlay.classList.remove('hidden');
    targetFileName = 'photos/' + evt.target.files[0].name;
    effectImagePreview.src = targetFileName;
    resizeControlsValue.value = '100%';
    effectImagePreview.style.transform = 'scale(' + 1 + ')';
    targetFileName = '../' + targetFileName;

    for (var i = 0; i < uploadEffectPreview.length; i++) {
      uploadEffectPreview[i].style.backgroundImage = "url('" + targetFileName + "')";
    }

    ; //document.body.style.backgroundImage = "url('img_tree.png')";
  });
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  uploadFormCancel.addEventListener('click', function () {
    uploadOverlay.classList.add('hidden');
  });
  var resizeControlsButtonDec = document.querySelector('.upload-resize-controls-button-dec');
  var resizeControlsButtonInc = document.querySelector('.upload-resize-controls-button-inc');
  var resizeControlsValue = document.querySelector('.upload-resize-controls-value');
  resizeControlsButtonDec.addEventListener('click', function () {
    sizeControlsValue = +resizeControlsValue.value.substr(0, resizeControlsValue.value.length - 1);
    sizeControlsValue = sizeControlsValue - 25;

    if (sizeControlsValue < 25) {
      sizeControlsValue = 25;
    }

    ;
    resizeControlsValue.value = sizeControlsValue + '%';
    var sizeCtlValue = sizeControlsValue * 0.01;
    effectImagePreview.style.transform = 'scale(' + sizeCtlValue + ')';
  });
  resizeControlsButtonInc.addEventListener('click', function () {
    sizeControlsValue = +resizeControlsValue.value.substr(0, resizeControlsValue.value.length - 1);
    sizeControlsValue = sizeControlsValue + 25;

    if (sizeControlsValue > 99) {
      sizeControlsValue = 100;
    }

    ;
    resizeControlsValue.value = sizeControlsValue + '%';
    var sizeCtlValue = sizeControlsValue * 0.01;
    effectImagePreview.style.transform = 'scale(' + sizeCtlValue + ')';
  });

  function effectNone() {
    if (effectImagePreview.classList.length > 1) {
      effectImagePreview.classList.remove(effectImagePreview.classList[1]);
    }

    effectImagePreview.style.filter = '';
    uploadEffectLevel.classList.add('hidden');
  }

  ;
  uploadEffectNone.addEventListener('click', effectNone);
  var uploadEffectEevelVal = document.querySelector('.upload-effect-level-val');
  var flagEffect = '';

  function setClass(clsName) {
    uploadEffectLevel.classList.remove('hidden');

    if (effectImagePreview.classList.length > 1) {
      effectImagePreview.classList.remove(effectImagePreview.classList[1]);
    }

    effectImagePreview.classList.add(clsName);
    dialogHandle.style.left = wLine + 'px';
    uploadEffectEevelVal.style.width = wLine + 'px'; // dialogHandle.style.left = wLine;   // изначально ставим 100% эффекта

    setEffect(wLine);
  }

  uploadEffectChrome.addEventListener('click', function () {
    flagEffect = 'chrome';
    setClass('effect-chrome');
  });
  uploadEffectSepia.addEventListener('click', function () {
    flagEffect = 'sepia';
    setClass('effect-sepia');
  });
  uploadEffectMarvin.addEventListener('click', function () {
    flagEffect = 'marvin';
    setClass('effect-marvin');
  });
  uploadEffectPhobos.addEventListener('click', function () {
    flagEffect = 'phobos';
    setClass('effect-phobos');
  });
  uploadEffectHeat.addEventListener('click', function () {
    flagEffect = 'heat';
    setClass('effect-heat');
  });
  /**************************  Перетаскивание  *****************************/

  var setEffect = function setEffect(ipMove) {
    switch (flagEffect) {
      case 'chrome':
        effectImagePreview.style.filter = 'grayscale(' + ipMove / wLine + ')';
        break;

      case 'sepia':
        effectImagePreview.style.filter = 'sepia(' + ipMove / wLine + ')';
        break;

      case 'marvin':
        effectImagePreview.style.filter = 'invert(' + 100 * ipMove / wLine + "%" + ')';
        break;

      case 'phobos':
        effectImagePreview.style.filter = 'blur(' + 3 * ipMove / wLine + "px" + ')';
        break;

      case 'heat':
        effectImagePreview.style.filter = 'brightness(' + (1 + 2 * ipMove / wLine) + ')';
        break;
    }

    ;
  };

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    dialogHandle.style.offsetLeft = wLine;
    var startCoords = {
      x: evt.clientX //  y: evt.clientY

    };

    var onMouseMove = function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };

      if (dialogHandle.offsetLeft - shift.x > 0 && dialogHandle.offsetLeft - shift.x < 451) {
        dialogHandle.style.left = dialogHandle.offsetLeft - shift.x + 'px';
        iMove = dialogHandle.offsetLeft - shift.x;
        uploadEffectEevelVal.style.width = dialogHandle.style.left;
        setEffect(iMove);
      }
    };

    var onMouseUp = function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      var onClickPreventDefault = function onClickPreventDefault(evt) {
        evt.preventDefault();
        dialogHandler.removeEventListener('click', onClickPreventDefault);
        dialogHandler.addEventListener('click', onClickPreventDefault);
      };
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();