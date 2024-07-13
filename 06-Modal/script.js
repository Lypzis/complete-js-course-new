'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

// Array(NodeList) of three buttons with the same class
const btnsOpenModal = document.querySelectorAll('.show-modal');

// toggle with true will add class hidden.
// toggle with false will remove class hidden.
// So, if we want it visible(isVisible = true),
// it will assign 'isVisible' to the opposite value,
// which is false, thus removing 'hidden' class and
// showing the element
function toggleVisibility(elements, isVisible) {
  elements.forEach(element => {
    element.classList.toggle('hidden', !isVisible);
  });
}

// Open modal
btnsOpenModal.forEach(button => {
  button.addEventListener('click', () => {
    toggleVisibility([modal, overlay], true);
  });
});

// Close Modal on button or overlay click
[btnCloseModal, overlay].forEach(element => {
  element.addEventListener('click', () => {
    toggleVisibility([modal, overlay], false);
  });
});

// Close Modal on ESC press key
document.addEventListener('keydown', e => {
  const isModalHidden = modal.classList.contains('hidden');
  if (e.key === 'Escape' && !isModalHidden)
    toggleVisibility([modal, overlay], false);
});
