'use strict';

(function () {
  var FIRST_NUMBER = 9;
  var SECOND_NUMBER = 3;
  var MAX_NUMBER = 20;
  var MAX_LENGTH = 783;
  var MAX_HEIGHT = 200;
  var LEFT_PADDING = 34;
  var INPUT_HALF_WIDTH = 12;
  var INPUT_HEIGHT = 30;

  init();

  function init() {
    var first = new Iteration(FIRST_NUMBER, 'first');
    var second = new Iteration(SECOND_NUMBER, 'second');

    first.left = 0;
    second.left = FIRST_NUMBER;

    if (isCorrect()) {
      renderExpression(first.digit, second.digit, first.card, second.card);

      first.renderArrow(
        first.renderInput.bind(
          first, second.renderArrow.bind(
            second, second.renderInput.bind(second, getFinalResult)
          )
        )
      );
    } else {
      console.log('Значения находятся за пределами допустимого диапазона');
    }
  }

  function Iteration(digit, order) {
    this.digit = digit;

    this.card = document.querySelector('.card__' + order + 'Number');

    this.arrow = document.querySelector('.card__' + order + 'Arrow');

    this.left = null;

    this.renderArrow = function (callback) {
      this.arrow.classList.remove('invisible');

      this.arrow.style.left = (this.left * MAX_LENGTH / MAX_NUMBER + LEFT_PADDING) + 'px';
      this.arrow.style.width = (this.digit * MAX_LENGTH / MAX_NUMBER) + 'px';
      this.arrow.style.height = (this.digit * MAX_HEIGHT / MAX_NUMBER) + 'px';

      callback();
    }

    this.renderInput = function (callback) {
      var digitInput = document.createElement('input');
      var answer = document.createElement('span');
      var digit = this.digit;
      var card = this.card;

      stylize(digitInput, digit);
      stylize(answer, digit);

      answer.classList.add('invisible');

      digitInput.addEventListener('change', function (evt) {
        if (+evt.target.value === digit) {
          digitInput.classList.add('invisible');

          answer.classList.remove('invisible');
          answer.innerText = digit;

          card.classList.remove('card__number--highlight');

          callback();
        } else {
          digitInput.classList.add('invalid');
          card.classList.add('card__number--highlight');
        }
      });

      this.arrow.appendChild(digitInput);
      this.arrow.appendChild(answer);
    }
  }

  function isCorrect() {
    return FIRST_NUMBER >= 6 && FIRST_NUMBER <= 9 && FIRST_NUMBER + SECOND_NUMBER >= 11 && FIRST_NUMBER + SECOND_NUMBER <= 14;
  }

  function renderExpression(firstNumber, secondNumber, firstContainer, secondContainer) {
    firstContainer.innerText = firstNumber;
    secondContainer.innerText = secondNumber;
  }

  function stylize(obj, num) {
    var left = (num * MAX_LENGTH / MAX_NUMBER) / 2 - INPUT_HALF_WIDTH;
    var bottom = num * MAX_HEIGHT / MAX_NUMBER + INPUT_HEIGHT;

    obj.classList.add('card__input');
    obj.style.left = left + 'px';
    obj.style.bottom = bottom + 'px';
  }

  function getFinalResult() {
    var expression = document.querySelector('.card__expression');
    var answer = document.querySelector('.card__answer');
    var result = FIRST_NUMBER + SECOND_NUMBER;
    var digitInput = document.createElement('input');

    digitInput.classList.add('card__answer');
    answer.classList.add('invisible');

    digitInput.addEventListener('change', function (evt) {
      if (+evt.target.value === result) {
        digitInput.classList.add('invisible');

        answer.classList.remove('invisible');
        answer.innerText = result;
      } else {
        digitInput.classList.add('invalid');
      }
    });

    expression.appendChild(digitInput);
  }
})();
