function contains(target, className) {
  return target.classList.contains(className);
}
function closest(target, className) {
  return target.closest(`.${className}`);
}

function addClass(target, className) {
  target.classList.add(className);
}
function removeClass(target, className) {
  target.classList.remove(className);
}

function replaceClass(target, class1, class2) {
  target.classList.replace(class1, class2);
}

function removeArrAllElClass(arr, className) {
  arr.forEach((mov) => mov.classList.remove(className));
}
function addClassToArrAllEl(arr, className) {
  arr.forEach((mov) => mov.classList.add(className));
}

function toggleClass(target, className) {
  target.classList.toggle(className);
}

function setActiveElInArr(elementArr, target, className) {
  elementArr.forEach((mov) => mov.classList.remove(className));
  target.classList.add(className);
}

function findActiveElInArr(arr, activeClass) {
  return arr.find((mov) => contains(mov, activeClass));
}

function removeAllActiveElClassInArr(elementArr, activeClass) {
  elementArr.forEach((mov) => mov.classList.remove(activeClass));
}

function findEl(className) {
  return document.querySelector(`.${className}`);
}

export {
  contains,
  closest,
  setActiveElInArr,
  findEl,
  addClass,
  removeClass,
  replaceClass,
  toggleClass,
  removeArrAllElClass,
  addClassToArrAllEl,
  removeAllActiveElClassInArr,
  findActiveElInArr,
};
