const app = {
  initConst () {
    this.cardList = document.querySelector('.app');
    this.fontDatalist = document.getElementById('fonts');
    this.informationScore = document.querySelector('.information__score');
    this.informationTime = document.querySelector('.information__time');
    this.score = 0;
    this.time = 20;
    this.form = document.getElementById('play');
    this.fontInput = document.getElementById('font');
    this.familyInput = document.getElementById('family');
    this.wrongCards = document.querySelector('.wrong-cards');
    this.playAgainForm = document.getElementById('play-again');
  },

  generatedCard () {
    fonts.forEach((font) => {
      this.cardList.insertAdjacentHTML('beforeend', `
  <li data-font-name="${font.name}" data-family="${font.family}" class="app__item">
  <div class="app__item__info"><span class="app__item__info__name">${font.name}</span>
    <span class="app__item__info__info">${font.family} - ${font.author}</span>
  </div>
  <img class="app__item__font" src="./assets/fonts/${font.file}.svg" alt="Aa, abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ">
</li>
  `);
    });
  },

  fillDatalist () {
    fonts.forEach((font) => {
      this.fontDatalist.insertAdjacentHTML('beforeend', `<option value="${font.name}"></option>`);
    });
  },

  displayScore () {
    this.informationScore.innerHTML = `${this.informationScore.dataset.text}  <span>${this.score}/20</span>`;
  },

  zero (number) {
    if (number < 10) {
      return `0${number}`;
    }
    return number;
  },

  displayTime () {
    if (this.zero(this.time) === `00`) {
      const currentCardClone1 = this.currentCardClone();
      this.afterPlay(this.currentCard(), currentCardClone1);
      this.cardError(this.currentCard());
    }
    this.informationTime.innerHTML = `${this.informationTime.dataset.text}  <time datetime="00:10">00:${this.zero(this.time)}</time>`;
    this.time--;
  },

  currentCard () {
    return document.querySelector('.app__item:last-child');
  },

  currentCardClone () {
    return this.currentCard().cloneNode(true);
  },

  formEventListener(){
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.currentCard();
      const currentCardClone1 = this.currentCardClone();
      if (this.currentCard().dataset.fontName === this.fontInput.value && this.currentCard().dataset.family === this.familyInput.value) {
        this.score++;
        this.cardSuccess(this.currentCard());
      } else if (this.currentCard().dataset.fontName === this.fontInput.value || this.currentCard().dataset.family === this.familyInput.value) {
        this.score += 0.5;
        this.cardError(this.currentCard());
      } else {
        this.cardError(this.currentCard());
      }

      this.afterPlay(this.currentCard(), currentCardClone1);
    });
  },

  afterPlay(currentCard, currentCardClone) {
    this.displayScore();
    this.time = 21;
    this.displayTime();
    currentCard.addEventListener('transitionend', () => {
      currentCard.remove();
      this.wrongCards.insertAdjacentElement('beforeend', currentCardClone);
      if (this.cardList.childElementCount === 0) {
        clearInterval(setInterval(this.displayTime, 1000));
        this.playAgainForm.classList.toggle('play--again--hidden');
      }
    });
  },

  cardSuccess (card) {
    card.classList.add('app__item--move');
    card.classList.add('app__item--move--success');
  },

  cardError (card) {
    card.classList.add('app__item--move');
    card.classList.add('app__item--move--error');
  },

  playAgain(){
    this.playAgainForm.addEventListener('submit', () => {
      this.playAgainForm.classList.toggle('play--again--hidden');
      setInterval(this.displayTime, 1000);
      this.time = 20;
      this.score = 0;
      this.generatedCard();
      this.displayTime();
      this.displayScore();
    });
  },

  init () {
    this.initConst();
    this.generatedCard();
    this.fillDatalist();
    this.displayScore();
    this.displayTime();
    setInterval(() => this.displayTime(), 1000);
    this.formEventListener();
    this.playAgain();
  }
};

app.init();


// In the init method, where you set the interval for displayTime, you need to bind this to the function to ensure that the correct this context is maintained. You can achieve this using the bind method or by using an arrow function:
//
//   javascript
// Copy code
// setInterval(this.displayTime.bind(this), 1000);
//
// // OR
//
// setInterval(() => this.displayTime(), 1000);
// By binding this, you ensure that the displayTime method is called with the correct context, and the app object properties will be available, preventing the "Cannot read properties of undefined" error.














