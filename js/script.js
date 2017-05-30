'use strict';

(function () {
  var FIRST_NUMBER = 7;
  var SECOND_NUMBER = 4;
  var firstCard = document.querySelector('.card__firstNumber');
  var secondCard = document.querySelector('.card__secondNumber');
  var finalAnswer = document.querySelector('.card__answer');

  init();

  function init() {
    renderExpression(FIRST_NUMBER, SECOND_NUMBER, firstCard, secondCard);
    renderArrow(FIRST_NUMBER, SECOND_NUMBER);


  }

  function renderExpression(firstNumber, secondNumber, firstContainer, secondContainer) {
    firstContainer.innerText = firstNumber;
    secondContainer.innerText = secondNumber;
  }

  function renderArrow(number1, number2) {
    var container = document.querySelector('.card__container');
    var smallInput = document.createElement('input');

    smallInput.classList.add('card__input');

    smallInput.addEventListener('change', function (evt) {
      smallInput.style.color = 'black';

      if (evt.target.value !== (number2 - number1)) {
        smallInput.style.color = 'red';
      } else {
        smallInput.style.display = 'none';
      }
    });

    container.appendChild(smallInput);
  }

})();
