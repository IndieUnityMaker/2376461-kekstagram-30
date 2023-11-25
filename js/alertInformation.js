import { isEscapeKey } from './utils';

const ERROR_SHOWN_TIME = 5000;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorUpluadTemplate = document.querySelector('#error').content.querySelector('.error');
const errorLoadTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

//вывод сообщения об ошибке загрузки данных, удаляется через ERROR_SHOWN_TIME (5 сек.)
const errorLoadAlert = (textAlert = 'Упс... Произошла ошибка!') => {
  const errorFragment = document.createDocumentFragment();
  const errorNode = errorLoadTemplate.cloneNode(true);

  errorNode.querySelector('.data-error__title').textContent = textAlert;
  errorFragment.append(errorNode);

  document.body.append(errorFragment);
  setTimeout(() => {
    errorNode.remove();
  }, ERROR_SHOWN_TIME);
};

const hideAlert = () => {
  const existsElement = document.querySelector('.success') || document.querySelector('.error');
  if(!existsElement){
    return;
  }

  existsElement.remove();

  document.removeEventListener('keydown',onEscapeDown);
  document.removeEventListener('click',handleClickOutside);
  document.removeEventListener('click',handleCloseAlert);
};

function onEscapeDown (evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideAlert();
  }
}

function handleClickOutside (evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideAlert();
}

function handleCloseAlert () {
  hideAlert();
}

//вывод сообщения об успешной отправке данных
const successUploadAlert = (textAlert = 'Изображение успешно загружено') => {
  const fragment = document.createDocumentFragment();

  const successNode = successTemplate.cloneNode(true);
  successNode.querySelector('.success__title').textContent = textAlert;

  fragment.append(successNode);

  const successButton = successNode.querySelector('.success__button');

  successButton.addEventListener('click',handleCloseAlert);
  document.addEventListener('keydown',onEscapeDown);
  document.addEventListener('click',handleClickOutside);

  document.body.append(fragment);
};
//вывод сообщения об ошибке отправки данных
const errorUploadAlert = (textAlert = 'Ошибка загрузки файла') => {
  const fragment = document.createDocumentFragment();

  const errorNode = errorUpluadTemplate.cloneNode(true);
  errorNode.querySelector('.error__title').textContent = textAlert;

  fragment.append(errorNode);

  const errorButton = errorNode.querySelector('.error__button');

  errorButton.addEventListener('click',handleCloseAlert);
  document.addEventListener('keydown',onEscapeDown);
  document.addEventListener('click',handleClickOutside);

  document.body.append(fragment);
};

export {
  errorLoadAlert,
  successUploadAlert,
  errorUploadAlert,
};
