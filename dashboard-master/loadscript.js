"use strict";
// ****** SETTINGS ******
const PATH = {
    cardItem: ".containigcard",
    loadMore: {
        btn: ".load-more",
        counter: ".load-more__counter"
    },
    animationsSelect: ".animations__select"
};
const ELEMS = PATH.cardItem;
const NUM_INIT_VISIBLE_ELEMS = 4;
const NUM_ELEMS_TO_REVEAL = 6;
const ADD_COUNTER_TO_LOAD_MORE_BTN = true;
// pass here an animation type from animate.css in 'fadeIn' or 'slideDown' way
// !!! CHANGE IT TO CONST IN YOUR CODE
let ANIMATE_CSS_ANIMATION_TYPE = "";
// here you could pass any utility classes from animate.css (like delays etc) in animate_className way
// DON'T PASS animate_animated here, it's added by default
const ANIMATE_CSS_ADDITIONAL_CLASSES = [];
// ****** MAIN CODE ******
window.addEventListener("load", () => {
    showElemsInitially(ELEMS, NUM_INIT_VISIBLE_ELEMS);
    ADD_COUNTER_TO_LOAD_MORE_BTN && loadMoreCounter(ELEMS);
});
// !!!YOU DON'T NEED IT IN YOUR CODE - it's for dropdown only
const animationsSelectList = document.querySelector(PATH.animationsSelect);
// !!!YOU DON'T NEED IT IN YOUR CODE - it's for dropdown only
animationsSelectList.addEventListener("change", (e) => {
    const target = e.target;
    const pickedAnimation = target.value;
    animationSelectHandler(ELEMS, NUM_INIT_VISIBLE_ELEMS, ADD_COUNTER_TO_LOAD_MORE_BTN);
    ANIMATE_CSS_ANIMATION_TYPE = pickedAnimation;
});
document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(PATH.loadMore.btn)) {
        loadMore(ELEMS, NUM_ELEMS_TO_REVEAL, {
            animationType: ANIMATE_CSS_ANIMATION_TYPE,
            additionalAnimationClasses: ANIMATE_CSS_ADDITIONAL_CLASSES
        });
        ADD_COUNTER_TO_LOAD_MORE_BTN && loadMoreCounter(ELEMS);
    }
});
// ****** MODULES ******
function showElemsInitially(elemsClassname, numToShowInitially) {
    const elems = getElemsArray(elemsClassname);
    if (elems) {
        const elemsToShow = elems.splice(0, numToShowInitially);
        revealElems(elemsToShow);
    }
}
function hideLoadMoreBtn() {
    const loadMoreBtn = document.querySelector(PATH.loadMore.btn);
    loadMoreBtn && hideElem(loadMoreBtn);
}
function applyAnimateCSS(elems, animationType, additionalAnimationClasses) {
    if (animationType) {
        elems.forEach((elem) => elem.classList.add(`animate__animated`, `animate__${animationType}`));
    }
    if (additionalAnimationClasses && additionalAnimationClasses.length > 0) {
        elems.forEach((elem) => {
            additionalAnimationClasses.forEach((classname) => {
                elem.classList.add(classname);
            });
        });
    }
}
function revealHiddenElems(elems) {
    revealElems(elems);
    const elemToScrollTo = elems[0];
    initScrollingTop(elemToScrollTo);
}
function loadMore(elemsClassname, numToShow, animationParams) {
    let animationType;
    let additionalAnimationClasses;
    if (animationParams) {
        animationType = animationParams.animationType;
        additionalAnimationClasses = animationParams.additionalAnimationClasses;
    }
    const elems = getElemsArray(elemsClassname);
    if (elems) {
        const hiddenElems = elems.filter((elem) => elem.hidden);
        const elemsToShow = hiddenElems.splice(0, numToShow);
        animationType &&
            applyAnimateCSS(elemsToShow, animationType, additionalAnimationClasses);
        revealHiddenElems(elemsToShow);
        !hiddenElems.length && hideLoadMoreBtn();
    }
}
const counter = document.querySelector(PATH.loadMore.counter);
function showCounterElem() {
    counter && revealElem(counter);
}
function getCounterValue(elemsClassname) {
    const elems = getElemsArray(elemsClassname);
    const hiddenElems = elems && elems.filter((elem) => elem.hidden);
    return hiddenElems ? hiddenElems.length : null;
}
function setCounterValue(countVal) {
    counter && (counter.textContent = countVal.toString());
}
function loadMoreCounter(elemsClassname) {
    if (counter) {
        counter.hidden && showCounterElem();
        const counterValue = getCounterValue(elemsClassname);
        counterValue !== null && setCounterValue(counterValue);
    }
}
//!!! YOU DON'T NEED IT IN YOUR CODE - handling animations select list
function hideOpenedCards(elems) {
    hideElems(elems);
}
function removeAnimationClasses(elems) {
    const animationClassRegex = /animate/gi;
    elems.forEach((elem) => {
        const classList = Array.from(elem.classList);
        const animatedClasses = classList.filter((className) => className.match(animationClassRegex));
        animatedClasses.forEach((className) => elem.classList.remove(className));
    });
}
function returnToInitState(elemsClassname, numToShowInitially) {
    const elems = getElemsArray(elemsClassname);
    if (elems) {
        hideOpenedCards(elems);
        showElemsInitially(elemsClassname, numToShowInitially);
        removeAnimationClasses(elems);
    }
}
function animationSelectHandler(elemsClassname, numToShowInitially, isBtnCounter) {
    returnToInitState(elemsClassname, numToShowInitially);
    const loadMoreBtn = document.querySelector(PATH.loadMore.btn);
    loadMoreBtn && revealElem(loadMoreBtn);
    isBtnCounter && loadMoreCounter(elemsClassname);
}
// ****** UTILS ******
function getElemsArray(elemClassname) {
    return Array.from(document.querySelectorAll(elemClassname));
}
function getElemTopOffset(elem) {
    const rect = elem.getBoundingClientRect();
    return rect.top + window.scrollY;
}
function hideElem(elem) {
    elem.hidden = true;
}
function hideElems(elems) {
    elems.forEach((elem) => hideElem(elem));
}
function revealElem(elem) {
    elem.hidden = false;
}
function revealElems(elems) {
    elems.forEach((elem) => revealElem(elem));
}
function initScrollingTop(elemToScrollTo) {
    const offsetTop = getElemTopOffset(elemToScrollTo);
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
}