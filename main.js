const app = {
  initConst () {
    this.appList = document.querySelector('.app');
    this.fontDatalist = document.getElementById('fonts');
    this.informationScore = document.querySelector('.information__score');
    this.informationTime = document.querySelector('.information__time');
    this.time = 20;
    this.score = 0;
    this.form = document.getElementById('play');
    this.fontInput = document.getElementById('font');
    this.familyInput = document.getElementById('family');
    this.wrongCards = document.querySelector('.wrong-cards');
    this.playAgainForm = document.getElementById('play-again');
  },

  generateCard () {
    fonts.forEach((font) => {
      this.appList.insertAdjacentHTML('beforeend', `<li data-font-name="${font.name}" data-family="${font.family}" class="app__item">
  <div class="app__item__info"><span class="app__item__info__name">${font.name}</span>
    <span class="app__item__info__info">${font.family} - ${font.author}</span>
  </div>
  <img class="app__item__font" src="./assets/fonts/${font.file}.svg" alt="Aa, abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ">
</li>`);
    });
  },

  fillDatalist () {
    fonts.forEach((font) => {
      this.fontDatalist.insertAdjacentHTML('beforeend', `<option value="${font.name}"> </option>`);
    });
  },

  displayScore () {
    this.informationScore.innerHTML = `${this.informationScore.dataset.text} <span>${this.score}/20</span>`;
  },

  displayTime () {
    this.informationTime.innerHTML = `${this.informationTime.dataset.text} <span><time datetime="00:10">00:${this.zero(this.time)}</time></span>`;
    this.time--;
  },

  zero (number) {
    if (number < 10) {
      return `0${number}`;
    }
    return number;
  },

  FormEventListener(){
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentCard = document.querySelector('.app__item:last-child');
      if (this.fontInput.value === currentCard.dataset.fontName && this.familyInput.value === currentCard.dataset.family) {
        this.time = 20;
        this.score++;
        currentCard.classList.add('app__item--move');
        currentCard.classList.add('app__item--move--success');
      } else if (this.fontInput.value === currentCard.dataset.fontName || this.familyInput.value === currentCard.dataset.family) {
        this.wrongCards.insertAdjacentElement('beforeend', currentCard.cloneNode(true));
        this.time = 20;
        this.score += 0.5;
        currentCard.classList.add('app__item--move');
        currentCard.classList.add('app__item--move--error');
      } else {
        this.wrongCards.insertAdjacentElement('beforeend', currentCard.cloneNode(true));
        this.time = 20;
        currentCard.classList.add('app__item--move');
        currentCard.classList.add('app__item--move--error');
      }
      this.displayScore();
      this.displayTime();

      currentCard.addEventListener('transitionend', (e) => {
        e.currentTarget.remove();
        if (this.appList.childElementCount === 0) {
          this.playAgainForm.classList.toggle('play--again--hidden');
        }
      });

      this.familyInput.value = '';
      this.fontInput.value = '';
      this.familyInput.focus();
    });
  },



  playAgainForm(){
    this.playAgainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.playAgainForm.classList.toggle('play--again--hidden');
      this.generateCard();
      this.score = 0;
      this.time = 20;
    });
  },

  init () {
    this.initConst();
    this.generateCard();
    this.fillDatalist();
    this.displayScore();
    this.displayTime();
    this.FormEventListener();
    this.playAgainForm()
  }
};

app.init();






//apres le transitionnend on doit cloner la carte fausse et l'envoyer dans la liste du bas (.wrong-cards)




