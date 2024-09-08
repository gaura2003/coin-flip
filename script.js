function toggleMode() {
  const div = document.getElementById('mode');
  let btntext = document.getElementById('btntext');
  if (div.classList.contains('dark-mode')) {
    div.classList.remove('dark-mode');
    div.classList.add('light-mode');
    btntext.innerText = 'Dark';
  }
  else {
    div.classList.remove('light-mode');
    div.classList.add('dark-mode');
    btntext.innerText = 'Light';
  }
}
let coin = document.getElementById('coin');
let head = document.getElementById('head');
let tail = document.getElementById('tail');
let headcount = document.getElementById('hc');
let tailcount = document.getElementById('tc');
let tailval = 0;
let headval = 0;
let currentTheme = 1;

const themes = [
  { headColor: '#2980b9', tailColor: 'yellow', headTextColor: 'white', tailTextColor: 'black' },
  { headColor: 'red', tailColor: 'green', headTextColor: 'white', tailTextColor: 'white' },
  { headColor: 'purple', tailColor: 'orange', headTextColor: 'white', tailTextColor: 'black' },
  { headColor: '#3498db', tailColor: '#720e9e', headTextColor: 'white', tailTextColor: 'white' },
  { headColor: 'black', tailColor: 'red', headTextColor: 'yellow', tailTextColor: 'black' }
];

function result() {
  const result = ['Head', 'Tail'];
  let val = Math.floor(Math.random() * 2);
  return result[val];
}

const play = () => {
  let result1 = result();
  coin.style.animation = 'none';
  setTimeout(() => {
    coin.style.animation = 'flip 3s forwards 1';
    updatePseudoContent(result1);
  }, 10);
  setTimeout(() => {
    if (result1 !== 'Head') {
      setTimeout(() => { headcount.innerText = `Head ${++headval}`; }, 10);
    } else {
      setTimeout(() => { tailcount.innerText = `Tail ${++tailval}`; }, 10);
    }
  }, 3100);
}

head.addEventListener("click", play);
tail.addEventListener("click", play);

function updatePseudoContent(result) {
  const styleElement = document.createElement('style');
  const selectedTheme = themes[currentTheme - 1];

  styleElement.innerHTML = `
    #coin::before {
      content: '${result === "Head" ? "Tail" : "Head"}';
      background-color: ${result === "Head" ? selectedTheme.tailColor : selectedTheme.headColor};
      color: ${result === "Head" ? selectedTheme.tailTextColor : selectedTheme.headTextColor};
    }
    #coin::after {
      content: '${result === "Head" ? "Head" : "Tail"}';
      background-color: ${result === "Head" ? selectedTheme.headColor : selectedTheme.tailColor};
      color: ${result === "Head" ? selectedTheme.headTextColor : selectedTheme.tailTextColor};
    }
  `;
  document.head.appendChild(styleElement);

  coin.style.backgroundColor = result === "Head" ? selectedTheme.headColor : selectedTheme.tailColor;
}

function setTheme(themeNumber) {
  currentTheme = themeNumber;
  applyTheme();
}

function applyTheme() {
  const selectedTheme = themes[currentTheme - 1];
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    #coin::before {
      content: 'Tail';
      background-color: ${selectedTheme.tailColor};
      color: ${selectedTheme.tailTextColor};
    }
    #coin::after {
      content: 'Head';
      background-color: ${selectedTheme.headColor};
      color: ${selectedTheme.headTextColor};
    }
  `;
  document.head.appendChild(styleElement);

  coin.style.backgroundColor = selectedTheme.headColor;
}