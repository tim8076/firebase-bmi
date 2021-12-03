// firebase config
const config = {
  apiKey: "AIzaSyABM_jhhuYOR1LTYl2vO_PlVaSv76vcnk0",
  authDomain: "project-fb4ac.firebaseapp.com",
  databaseURL: "https://project-fb4ac-default-rtdb.firebaseio.com",
  projectId: "project-fb4ac",
  storageBucket: "project-fb4ac.appspot.com",
  messagingSenderId: "132534835636",
  appId: "1:132534835636:web:51b9521c9a0f299c457ae1"
};
firebase.initializeApp(config);

const bmiRef = firebase.database().ref('bmi');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const sendButton = document.querySelector('.result-btn');
const resultArea = document.querySelector('#result-area');
const resultCircle = document.querySelector('.result');
const resultList = document.querySelector('.list');


function countBmi(weight, height) {
  const bmi = weight / Math.pow(height / 100, 2);
  return bmi.toFixed(2);
}

function setDataToFirebase(data) {
  bmiRef.push(data);
}

function bmiStatus(bmi) {
  if (bmi < 18.5) {
    return { status: 'underWeight', text: '過輕' }
  } else if (bmi >= 18.5 && bmi < 24) {
    return { status: 'normal', text: '體重正常' }
  } else if (bmi >= 24 && bmi < 27) {
    return { status: 'overWeight', text: '過重' }
  } else if (bmi >= 27 && bmi < 30) {
    return { status: 'mildObesity', text: '輕度肥胖' }
  } else if (bmi >= 30 && bmi < 35) {
    return { status: 'obesity', text: '中度肥胖' }
  } else if (bmi >= 35 ) {
    return { status: 'severeObesity', text: '重度肥胖' }
  }
}

function renderList(snapshot) {
  let str = '';
  snapshot.forEach((item) => {
    const { height, weight, bmi, date } = item.val();
    const { text, status } = bmiStatus(bmi);
    str += 
    `<li class="list-item">
      <h2 class="status">${text}</h2>
      <div class="status-bar ${status}"></div>
      <div class="number">
        <p>BMI</p>
        <p>${bmi}</p>
      </div>
      <div class="number">
        <p>weight</p>
        <p>${weight}kg</p>
      </div>
      <div class="number">
        <p>height</p>
        <p>${height}cm</p>
      </div>
      <p class="date">${date}</p>
      <a href="#" class="delete-button" data-key="${item.key}">
        <i class="fas fa-trash-alt"></i>
      </a>
    </li>`
  })
  resultList.innerHTML = str;
}

function renderResultCircle(bmi) {
  const { text, status } = bmiStatus(bmi);
  resultCircle.innerHTML = 
  ` <div class="result-circle ${status}">
      <p class="result-number">${bmi}</p>
      <span>BMI</span>
      <a href="#" class="loop-icon">
        <img src="./images/icons_loop.png" alt="icons_loop">
      </a>
    </div>
    <p class="result-text ${status}">
      ${ text }
    </p>`
}

// 重置按鈕
resultCircle.addEventListener('click', function(e) {
  e.preventDefault();
  if (e.target.parentElement.matches('.loop-icon')) {
    heightInput.value = '';
    weightInput.value = '';
    resultArea.classList.remove('active');
  }
})
// 送出按鈕
sendButton.addEventListener('click', function(e) {
  if (!heightInput.value || !weightInput.value) return alert('欄位未填寫完畢');
  const height = parseInt(heightInput.value.trim());
  const weight = parseInt(weightInput.value.trim());
  const bmi = countBmi(weight, height);
  const date = new Date().toLocaleDateString();
  const data = {
    height,
    weight,
    bmi,
    date
  }
  setDataToFirebase(data);
  resultArea.classList.add('active');
  renderResultCircle(bmi);
});

// 刪除單筆資料
resultList.addEventListener('click', function(e) {
  if (e.target.parentElement.matches('.delete-button')) {
    e.preventDefault();
    const key = e.target.parentElement.dataset.key;
    bmiRef.child(key).remove();
  }
})

bmiRef.on('value', function(snapshot) {
  renderList(snapshot);
})



