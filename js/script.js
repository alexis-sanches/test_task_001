'use strict';

(function () {
  /*
   ** CHANGE NUMBERS HERE
   */
  var NUMBERS = {
    FIRST: 6,
    SECOND: 7
  };

  var STYLE_CONSTS = {
    MAX_NUMBER: 20,
    MAX_LENGTH: 783,
    MAX_HEIGHT: 200,
    LEFT_PADDING: 35,
    INPUT_HALF_WIDTH: 12,
    INPUT_HEIGHT: 30
  };

  init();

  function init() {
    var first = new Iteration(NUMBERS.FIRST, 'first');
    var second = new Iteration(NUMBERS.SECOND, 'second');

    first.left = 0;
    second.left = NUMBERS.FIRST;

    if (areNumbersCorrect()) {
      renderExpression(first.digit, second.digit, first.card, second.card);

      first.renderArrow(
        first.renderInput.bind(
          first, second.renderArrow.bind(
            second, second.renderInput.bind(second, getFinalResult)
          )
        )
      );
    } else {
      alert('Значения находятся за пределами допустимого диапазона');
    }
  }

  function Iteration(digit, order) {
    this.digit = digit;

    this.card = document.querySelector('.card__' + order + 'Number');

    this.arrow = document.querySelector('.card__' + order + 'Arrow');

    this.left = null;

    this.renderArrow = function (callback) {
      this.arrow.classList.remove('invisible');

      this.arrow.style.left = (this.left * STYLE_CONSTS.MAX_LENGTH / STYLE_CONSTS.MAX_NUMBER + STYLE_CONSTS.LEFT_PADDING) + 'px';
      this.arrow.style.width = (this.digit * STYLE_CONSTS.MAX_LENGTH / STYLE_CONSTS.MAX_NUMBER) + 'px';
      this.arrow.style.height = (this.digit * STYLE_CONSTS.MAX_HEIGHT / STYLE_CONSTS.MAX_NUMBER) + 'px';

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
          changeInputToAnswer(digitInput, answer, digit);
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

  function areNumbersCorrect() {
    return NUMBERS.FIRST >= 6 && NUMBERS.FIRST <= 9 && NUMBERS.FIRST + NUMBERS.SECOND >= 11 && NUMBERS.FIRST + NUMBERS.SECOND <= 14;
  }

  function renderExpression(firstNumber, secondNumber, firstContainer, secondContainer) {
    firstContainer.innerText = firstNumber;
    secondContainer.innerText = secondNumber;
  }

  function stylize(obj, num) {
    var left = (num * STYLE_CONSTS.MAX_LENGTH / STYLE_CONSTS.MAX_NUMBER) / 2 - STYLE_CONSTS.INPUT_HALF_WIDTH;
    var bottom = num * STYLE_CONSTS.MAX_HEIGHT / STYLE_CONSTS.MAX_NUMBER + STYLE_CONSTS.INPUT_HEIGHT;

    obj.classList.add('card__input');
    obj.style.left = left + 'px';
    obj.style.bottom = bottom + 'px';
  }

  function getFinalResult() {
    var expression = document.querySelector('.card__expression');
    var answer = document.querySelector('.card__answer');
    var result = NUMBERS.FIRST + NUMBERS.SECOND;
    var digitInput = document.createElement('input');

    digitInput.classList.add('card__answer');
    answer.classList.add('invisible');

    digitInput.addEventListener('change', function (evt) {
      if (+evt.target.value === result) {
        changeInputToAnswer(digitInput, answer, result);
      } else {
        digitInput.classList.add('invalid');
      }
    });

    expression.appendChild(digitInput);
  }

  function changeInputToAnswer(input, answer, num) {
    input.classList.add('invisible');
    answer.classList.remove('invisible');
    answer.innerText = num;
  }
})();
