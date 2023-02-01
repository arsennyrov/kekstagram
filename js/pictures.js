'use strict';

var url0 = 'https://raw.githubusercontent.com/MuratN/muratn.github.io/main/kekstagram/source.json';

(function () {
    /***************** Запрос на сервер к файлу source.json *******************/
    window.onLoad = [];
    fetch(url0).then(function (response) {
        return response.json();
    }).then(function (json) {
        onLoad = json;
        creatFragment(onLoad);
    }).catch(function (err) {
        console.log('Ошибка загрузки: ' + err.message);
    });

})();

(function () {
    /********************************  Отрисовка загрузки на главном экране  **********************************/
    let galleryOverlay = document.querySelector('.gallery-overlay');
    let galleryOverlagyImage = document.querySelector('.gallery-overlagy-image');
    let galleryOverlayClose = document.querySelector('.gallery-overlay-close');
    let pictures = document.querySelector('.pictures');

    window.getRandomInt = function (max) {
        return Math.floor(Math.random() * max);
    };

    window.creatFragment = function (arr) {
        let pictures = document.querySelector('.pictures');
        let fragment = document.createDocumentFragment();
        let pictureTemp = document.querySelector('#picture-template')
            .content
            .querySelector('.picture');
        let pictur = pictures.querySelectorAll('.picture');
        for (var i = 0; i < pictur.length; i++) {
            pictur[i].remove();
        }
        for (var i = 0; i < arr.length; i++) {
            var element = pictureTemp.cloneNode(true);
            fragment.append(element);
            element.querySelector('img').src = arr[i].url;
            element.querySelector('.picture-likes').textContent = arr[i].likes;
            element.querySelector('.picture-comments').textContent = arr[i].comments.length;
        };
        document.querySelector('.pictures').appendChild(fragment);
    };

    // **********************  Показ фото на весь экран  ************************
    function showPhoto(arr, num) {
        galleryOverlay.classList.remove('hidden');
        galleryOverlagyImage.src = arr[num].url;

        let socialComment = document.querySelectorAll('.social__comment');
        let socialText = document.querySelectorAll('.social__text');
        let socialPicture = document.querySelectorAll('.social__picture');

        for (let i = 0; i < 5; i++) {
            socialComment[i].classList.add('visually-hidden');
        }

        document.querySelector('.likes-count').textContent = arr[num].likes;
        document.querySelector('.comments-count').textContent = arr[num].comments.length;
        for (let i = 0; i < arr[num].comments.length; i++) {
            socialComment[i].classList.remove('visually-hidden');
            socialPicture[i].src = 'img/' + arr[num].comments[i].avatar.substr(11, 1) + '.png';
            socialText[i].textContent = arr[num].comments[i].message;
        }

        document.querySelector('.social__caption').textContent = arr[num].description;
        document.addEventListener('keydown', function (evt) {
            if (evt.keyCode === 27) {
                galleryOverlay.classList.add('hidden');
            }
        });
    };

    galleryOverlayClose.addEventListener('click', function (evt) {
        if (evt.target != 'img') {
            galleryOverlay.classList.add('hidden');
        }
    });

    pictures.addEventListener('click', function (evt) {
        evt.preventDefault();
        let numPhoto = +evt.target.src.substr(evt.target.src.length-6, 2) ? 
            +evt.target.src.substr(evt.target.src.length-6, 2)-1 : 
            +evt.target.src.substr(evt.target.src.length-5, 1)-1;
        showPhoto(onLoad, numPhoto);
    });

})();

(function () {
    // ************************** Показ фото в окне редактирования ************************
    let iMove = 0;
    let wLine = 450; // длина линии слайдера

    let uploadFile = document.getElementById('upload-file');
    let uploadOverlay = document.querySelector('.upload-overlay');
    let effectImagePreview = document.querySelector('.effect-image-preview');
    let targetFileName = '';
    let uploadEffectPreview = document.querySelectorAll('.upload-effect-preview');
    let uploadEffectLevel = document.querySelector('.upload-effect-level');

    let uploadEffectNone = document.querySelector('#upload-effect-none');
    let uploadEffectChrome = document.querySelector('#upload-effect-chrome');
    let uploadEffectSepia = document.querySelector('#upload-effect-sepia');
    let uploadEffectMarvin = document.querySelector('#upload-effect-marvin');
    let uploadEffectPhobos = document.querySelector('#upload-effect-phobos');
    let uploadEffectHeat = document.querySelector('#upload-effect-heat');
    var dialogHandle = document.querySelector('.upload-effect-level-pin');

    uploadFile.addEventListener('change', function (evt) {
        effectNone();
        uploadOverlay.classList.remove('hidden');
        targetFileName = 'photos/' + evt.target.files[0].name;
        effectImagePreview.src = targetFileName;
        resizeControlsValue.value = '100%';
        effectImagePreview.style.transform = 'scale(' + 1 + ')';
        for (let i = 0; i < uploadEffectPreview.length; i++) {
            uploadEffectPreview[i].style.backgroundImage = "url('" + targetFileName + "')";
        };
    });

    let uploadFormCancel = document.querySelector('.upload-form-cancel');
    
    document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
            uploadOverlay.classList.add('hidden');
        };
    });

    uploadFormCancel.addEventListener('click', function () {
        uploadOverlay.classList.add('hidden');
    });

    let resizeControlsButtonDec = document.querySelector('.upload-resize-controls-button-dec');
    let resizeControlsButtonInc = document.querySelector('.upload-resize-controls-button-inc');
    let resizeControlsValue = document.querySelector('.upload-resize-controls-value');
    let sizeControlsValue = 100;

    resizeControlsButtonDec.addEventListener('click', function () {
        sizeControlsValue = +resizeControlsValue.value.substr(0, resizeControlsValue.value.length - 1);
        sizeControlsValue = sizeControlsValue - 25;
        if (sizeControlsValue < 25) {
            sizeControlsValue = 25;
        };
        resizeControlsValue.value = sizeControlsValue + '%';
        let sizeCtlValue = sizeControlsValue * 0.01;
        effectImagePreview.style.transform = 'scale(' + sizeCtlValue + ')';
    });

    resizeControlsButtonInc.addEventListener('click', function () {
        sizeControlsValue = +resizeControlsValue.value.substr(0, resizeControlsValue.value.length - 1);
        sizeControlsValue = sizeControlsValue + 25;
        if (sizeControlsValue > 99) {
            sizeControlsValue = 100;
        };
        resizeControlsValue.value = sizeControlsValue + '%';
        let sizeCtlValue = sizeControlsValue * 0.01;
        effectImagePreview.style.transform = 'scale(' + sizeCtlValue + ')';
    });

    function effectNone() {
        if (effectImagePreview.classList.length > 1) {
            effectImagePreview.classList.remove(effectImagePreview.classList[1]);
        }
        effectImagePreview.style.filter = '';
        uploadEffectLevel.classList.add('hidden');
    };

    uploadEffectNone.addEventListener('click', effectNone);

    let uploadEffectEevelVal = document.querySelector('.upload-effect-level-val');
    let flagEffect = '';

    function setClass(clsName) {
        uploadEffectLevel.classList.remove('hidden');
        if (effectImagePreview.classList.length > 1) {
            effectImagePreview.classList.remove(effectImagePreview.classList[1]);
        }
        effectImagePreview.classList.add(clsName);
        dialogHandle.style.left = wLine + 'px';
        uploadEffectEevelVal.style.width = wLine + 'px';
        // dialogHandle.style.left = wLine;   // изначально ставим 100% эффекта
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

    /**************************  Перетаскивание ползунка  *****************************/
    let setEffect = function (ipMove) {
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
        };
    }

    dialogHandle.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        dialogHandle.style.offsetLeft = wLine;

        var startCoords = {
            x: evt.clientX,
            //  y: evt.clientY
        };

        var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();

            var shift = {
                x: startCoords.x - moveEvt.clientX,
            };

            startCoords = {
                x: moveEvt.clientX,
            };

            if ((dialogHandle.offsetLeft - shift.x > 0) && (dialogHandle.offsetLeft - shift.x < 451)) {
                dialogHandle.style.left = (dialogHandle.offsetLeft - shift.x) + 'px';
                iMove = dialogHandle.offsetLeft - shift.x;
                uploadEffectEevelVal.style.width = dialogHandle.style.left;
                setEffect(iMove);
            }
        };

        var onMouseUp = function (upEvt) {
            upEvt.preventDefault();

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            var onClickPreventDefault = function (evt) {
                evt.preventDefault();
                dialogHandler.removeEventListener('click',
                    onClickPreventDefault)
                dialogHandler.addEventListener('click',
                    onClickPreventDefault);
            };
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

})();

/**********************  Работа с массивами обьектов  ************************/

(function () {
    let filterRecommend = document.getElementById('filter-recommend');
    let filterPopular = document.getElementById('filter-popular');
    let filterDiscussed = document.getElementById('filter-discussed');
    let filterRandom = document.getElementById('filter-random');

    let cloneOnLoad = onLoad.slice();

    filterRecommend.addEventListener('click', function () {
        window.creatFragment(onLoad);
    })

    filterPopular.addEventListener('click', function () {
        let cloneOnLoad = onLoad.slice();
        cloneOnLoad.sort((a, b) => a.likes > b.likes ? -1 : 1);
        window.creatFragment(cloneOnLoad);
    })

    filterDiscussed.addEventListener('click', function () {
        let cloneOnLoad = onLoad.slice();
        cloneOnLoad.sort((a, b) => b.comments.length - a.comments.length);
        window.creatFragment(cloneOnLoad);
    })

    filterRandom.addEventListener('click', function () {
        /*    перетасовка массив arrRand случайным образом     */
        var arrRand = [];
        let a1;
        let b1;
        let onLoad1 = [];
        for (let i = 0; i < 25; i++) {
            arrRand[i] = i;
        };

        for (let i = 0; i < 25; i++) {
            a1 = window.getRandomInt(24);
            b1 = arrRand[a1];
            arrRand[a1] = arrRand[i];
            arrRand[i] = b1;
        };

        for (let i = 0; i < 25; i++) {
            onLoad1[i] = onLoad[arrRand[i]];
        };

        for (let i = 0; i < 10; i++) {
            cloneOnLoad[i] = onLoad1[i];
        };
        let cloneOnLoad1 = cloneOnLoad.slice(0, 10);

        window.creatFragment(cloneOnLoad1);
    });

})();