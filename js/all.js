"use strict";var config={apiKey:"AIzaSyABM_jhhuYOR1LTYl2vO_PlVaSv76vcnk0",authDomain:"project-fb4ac.firebaseapp.com",databaseURL:"https://project-fb4ac-default-rtdb.firebaseio.com",projectId:"project-fb4ac",storageBucket:"project-fb4ac.appspot.com",messagingSenderId:"132534835636",appId:"1:132534835636:web:51b9521c9a0f299c457ae1"};firebase.initializeApp(config);var bmiRef=firebase.database().ref("bmi"),heightInput=document.querySelector("#height"),weightInput=document.querySelector("#weight"),sendButton=document.querySelector(".result-btn"),resultArea=document.querySelector("#result-area"),resultCircle=document.querySelector(".result"),resultList=document.querySelector(".list");function countBmi(t,e){return(t/Math.pow(e/100,2)).toFixed(2)}function setDataToFirebase(t){bmiRef.push(t)}function bmiStatus(t){return t<18.5?{status:"underWeight",text:"過輕"}:18.5<=t&&t<24?{status:"normal",text:"體重正常"}:24<=t&&t<27?{status:"overWeight",text:"過重"}:27<=t&&t<30?{status:"mildObesity",text:"輕度肥胖"}:30<=t&&t<35?{status:"obesity",text:"中度肥胖"}:35<=t?{status:"severeObesity",text:"重度肥胖"}:void 0}function renderList(t){var c="";t.forEach(function(t){var e=t.val(),a=e.height,n=e.weight,s=e.bmi,i=e.date,r=bmiStatus(s),e=r.text,r=r.status;c+='<li class="list-item">\n      <h2 class="status">'.concat(e,'</h2>\n      <div class="status-bar ').concat(r,'"></div>\n      <div class="number">\n        <p>BMI</p>\n        <p>').concat(s,'</p>\n      </div>\n      <div class="number">\n        <p>weight</p>\n        <p>').concat(n,'kg</p>\n      </div>\n      <div class="number">\n        <p>height</p>\n        <p>').concat(a,'cm</p>\n      </div>\n      <p class="date">').concat(i,'</p>\n      <a href="#" class="delete-button" data-key="').concat(t.key,'">\n        <i class="fas fa-trash-alt"></i>\n      </a>\n    </li>')}),resultList.innerHTML=c}function renderResultCircle(t){var e=bmiStatus(t),a=e.text,e=e.status;resultCircle.innerHTML=' <div class="result-circle '.concat(e,'">\n      <p class="result-number">').concat(t,'</p>\n      <span>BMI</span>\n      <a href="#" class="loop-icon">\n        <img src="./images/icons_loop.png" alt="icons_loop">\n      </a>\n    </div>\n    <p class="result-text ').concat(e,'">\n      ').concat(a,"\n    </p>")}resultCircle.addEventListener("click",function(t){t.preventDefault(),t.target.parentElement.matches(".loop-icon")&&(heightInput.value="",weightInput.value="",resultArea.classList.remove("active"))}),sendButton.addEventListener("click",function(t){if(!heightInput.value||!weightInput.value)return alert("欄位未填寫完畢");var e=parseInt(heightInput.value.trim()),a=parseInt(weightInput.value.trim()),n=countBmi(a,e);setDataToFirebase({height:e,weight:a,bmi:n,date:(new Date).toLocaleDateString()}),resultArea.classList.add("active"),renderResultCircle(n)}),resultList.addEventListener("click",function(t){t.target.parentElement.matches(".delete-button")&&(t.preventDefault(),t=t.target.parentElement.dataset.key,bmiRef.child(t).remove())}),bmiRef.on("value",function(t){renderList(t)});
//# sourceMappingURL=all.js.map