// Nom    :
// Prénom :
// Groupe : 2285
const app = document.querySelector('.app');
const nameDatalist = document.getElementById('fonts');
const familyInput = document.getElementById('family');
const fontInput = document.getElementById('font');
const informationScore = document.querySelector('.information__score');
const informationTime = document.querySelector('.information__time');
const form = document.querySelector('#play');
const playAgainForm = document.querySelector('#play-again');
const wrongCards = document.querySelector('.wrong-cards');
let counter = 20;
let score = 0;

function generateCard(){
  for (const font of fonts) {
    app.insertAdjacentHTML('beforeend', `<li data-font-name="${font.name}" data-family="${font.family}" class='app__item'>
  <div class="app__item__info"><span class="app__item__info__name">${font.name}</span>
    <span class="app__item__info__info">${font.family} - ${font.author}</span>
  </div>
  <img class='app__item__font' src='./assets/fonts/${font.file}.svg' alt='Aa, abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ'>
</li>`);

    nameDatalist.insertAdjacentHTML('beforeend', `<option value="${font.name}">`);
  }
}
generateCard();

informationScore.insertAdjacentHTML('beforeend', `<span>${informationScore.dataset.text}  ${score}/20</span>`);
informationTime.insertAdjacentHTML('beforeend', `<span> ${informationTime.dataset.text} ${counter}</span> `);

function decrementTime(){
  counter--;
  informationTime.firstChild.textContent = `${informationTime.dataset.text} ${zeros(counter)}`;
  //on peut aussi ecrire
  //informationTime.textContent = `<span> ${informationTime.dataset.text} ${zeros(second)}</span> `;
}

setInterval(decrementTime,1000)

function zeros(number) {
  if (number <= 9) {
    return "0" + number;
  }
  return number;
}

function displayScore (){
  informationScore.firstChild.textContent = `${informationScore.dataset.text}  ${score}/20`
}


form.addEventListener('submit', (e)=>{
  e.preventDefault();
  let currentCard = app.querySelector('.app__item:last-child');

  if (fontInput.value === currentCard.dataset.fontName && familyInput.value === currentCard.dataset.family){
    score++
    counter = 20;
    displayScore();
     currentCard.classList.add('app__item--move');
     currentCard.classList.add('app__item--move--success');
  } else if (fontInput.value === currentCard.dataset.fontName || familyInput.value === currentCard.dataset.family){
    wrongCards.insertAdjacentElement('afterbegin', currentCard.cloneNode(true));
    currentCard.classList.add('app__item--move');
    currentCard.classList.add('app__item--move--error');
    score+=0.5
    counter = 21;
    displayScore();
  } else {
    wrongCards.insertAdjacentElement('afterbegin', currentCard.cloneNode(true));
    currentCard.classList.add('app__item--move');
    currentCard.classList.add('app__item--move--error');
    counter = 21;
  }

  currentCard.addEventListener('transitionend', (e)=>{
    e.currentTarget.remove();
    if (app.childElementCount === 0){
      playAgainForm.classList.toggle('play--again--hidden');
    }
  })


});


playAgainForm.addEventListener('submit', (e)=>{
  e.currentTarget.classList.toggle('play--again--hidden');
  generateCard();
  counter = 20;
  score = 0;
})