var monthNames = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var weekNames = ['Sun', 'Mon', 'Tue', 'Wed','Thu', 'Fri', 'Sat'];
var jsDays;
var user1SelectFlag1 = false;
var user2SelectFlag1 = false;
var user3SelectFlag1 = false;
var resultFlag = false;

var selectedDaysList = [0, 0, 0, 0, 0, 0];

const weekCalendar = document.querySelector(".weekCalendar");
const userList = document.querySelector(".userList");
const newTr2 = document.createElement("TR");

const user1 = userList.querySelector(".user1");
const user2 = userList.querySelector(".user2");
const user3 = userList.querySelector(".user3");


function calendar(){
    /* That's how creatElement() works!
    const newTd = document.createElement("TD");
    newTd.innerHTML = "HI";

    const newTr = document.createElement("TR");
    newTr.appendChild(newTd);

    const newTable = document.createElement("TABLE");
    newTable.appendChild(newTr);

    weekCalendar.appendChild(newTable);
    */
   /*
    const newTr = document.createElement("TR");
    
    for(var i = 1; i <= 7 ; i++){
        const newTd = document.createElement("TD");
        newTd.id = i;
        newTd.innerText = `${weekNames[i-1]}`;
        newTd.style.border = "1px solid";
        newTd.style.borderColor = "#874f1e";
        newTd.style.padding = "3px";
        newTd.style.width = "50px";
        newTd.style.height = "30px";
        newTr.appendChild(newTd);
    }

    for(var i = 1; i <= 7 ; i++){
        const newTd = document.createElement("TD");
        newTd.id = i;
        newTd.style.border = "1px solid";
        newTd.style.borderColor = "#874f1e";
        newTd.style.padding = "3px";
        newTd.style.width = "50px";
        newTd.style.height = "150px";
        newTr2.appendChild(newTd);
    }

    const newTable = document.createElement("TABLE");
    newTable.appendChild(newTr);
    newTable.appendChild(newTr2);

    weekCalendar.appendChild(newTable);
    */
   for(var i = 1; i <= 7; i++){
       const newCell = document.createElement("DIV");
       newCell.id = i;
       newCell.className = `jsDay`;
       newCell.innerText = `${weekNames[i-1]}`;
       newCell.style.border = "1px solid";
       newCell.style.borderColor = "#874f1e";
       newCell.style.padding = "3px";
       newCell.style.width = "50px";
       newCell.style.height = "30px";
       newCell.style.display = "flex";
       weekCalendar.appendChild(newCell);
   }
   weekCalendar.style.display = "flex";
   jsDays = document.getElementsByClassName("jsDay");
}

function makeDaysToArray(userSelected){
    console.log(userSelected.target.value);
    /*
    Array.from(jsDays).forEach(date =>
        date.addEventListener("click", selectDate)
   );
   */
  switch(userSelected.target.value){
      case 'user1':
          user1SelectFlag1 = true;
          break;
      case 'user2':
          user2SelectFlag1 = true;
          break;
      case 'user3':
          user3SelectFlag1 = true;
          break;
  }
   const daysArray = Array.from(jsDays);
   //console.log(daysArray);
   daysArray.forEach(date =>
    date.addEventListener("click", selectDate)
    );
}

function checkIfAllSelected(){
    console.log(selectedDaysList);
    for(var i = 0;i<6;i++){
        if(selectedDaysList[i] === 0){
            return false;
        }
    }
    return true;
}

function swap(a, b){

}

function sortLowercase(){
    var temp = 0;
    if(selectedDaysList[0]>selectedDaysList[2]){
        temp = selectedDaysList[0];
        selectedDaysList[0] = selectedDaysList[2];
        selectedDaysList[2] = temp;

        temp = selectedDaysList[1];
        selectedDaysList[1] = selectedDaysList[3];
        selectedDaysList[3] = temp;

        if(selectedDaysList[0]>selectedDaysList[4]){
            temp = selectedDaysList[0];
            selectedDaysList[0] = selectedDaysList[4];
            selectedDaysList[4] = temp;

            temp = selectedDaysList[1];
            selectedDaysList[1] = selectedDaysList[5];
            selectedDaysList[5] = temp;
        }
        if(selectedDaysList[2]>selectedDaysList[4]){
            temp = selectedDaysList[2];
            selectedDaysList[2] = selectedDaysList[4];
            selectedDaysList[4] = temp;

            temp = selectedDaysList[3];
            selectedDaysList[3] = selectedDaysList[5];
            selectedDaysList[5] = temp;
        }
    }
    else{
        if(selectedDaysList[0]>selectedDaysList[4]){
            temp = selectedDaysList[0];
            selectedDaysList[0] = selectedDaysList[4];
            selectedDaysList[4] = temp;

            temp = selectedDaysList[1];
            selectedDaysList[1] = selectedDaysList[5];
            selectedDaysList[5] = temp;
        }
        if(selectedDaysList[2]>selectedDaysList[4]){
            temp = selectedDaysList[2];
            selectedDaysList[2] = selectedDaysList[4];
            selectedDaysList[4] = temp;

            temp = selectedDaysList[3];
            selectedDaysList[3] = selectedDaysList[5];
            selectedDaysList[5] = temp;
        }
    }
}

function calculateResult(){
    sortLowercase();
    var start = 0;
    var finish = 0;
    console.log(selectedDaysList);
    if(selectedDaysList[1]<selectedDaysList[3]){
        start = selectedDaysList[2];
        finish = selectedDaysList[1];
    }
    else{
        start = selectedDaysList[2];
        finish = selectedDaysList[3];
    }

    if(finish<selectedDaysList[5]){
        start = selectedDaysList[4];
    }
    else{
        start = selectedDaysList[4];
        finish = selectedDaysList[5];
    }

    if(start<=finish){
        for(var i = start-1; i<finish; i++){
            console.log(weekNames[i]);
        }
    }
    else{
        console.log(`We cannot meet!`);
    }
}

function selectDate(event){
    //console.log(event.target.id);

    /*
    if(user1SelectFlag1 === 0){
        user1SelectedDay1 = event.target.id;
    }
    else{
        user1SelectedDay2 = event.target.id;
    }
    */
    if(user1SelectFlag1 === true){
        if(selectedDaysList[0] != 0){
            selectedDaysList[1] = event.target.id;
            user1SelectFlag1 = false;
        }
        else{
            selectedDaysList[0] = event.target.id;
        }
    }
    if(user2SelectFlag1 === true){
        if(selectedDaysList[2] != 0){
            selectedDaysList[3] = event.target.id;
            user2SelectFlag1 = false;
        }
        else{
            selectedDaysList[2] = event.target.id;
        }
    }
    if(user3SelectFlag1 === true){
        if(selectedDaysList[4] != 0){
            selectedDaysList[5] = event.target.id;
            user3SelectFlag1 = false;
        }
        else{
            selectedDaysList[4] = event.target.id;
        }
    }
    //console.log(user1SelectedDay1);
    //console.log(selectedDay2);
    
    resultFlag = checkIfAllSelected();
    console.log(resultFlag);
    if(resultFlag === true){
        calculateResult();
    }
}

function selectUser(){
    //console.log(userList);
    
    user1.addEventListener("click", makeDaysToArray);
    user2.addEventListener("click", makeDaysToArray);
    user3.addEventListener("click", makeDaysToArray);

    
    /*
    user1.addEventListener("click", selectDate)
    if(user1.checked){
        //console.log(weekCalendar);
        Array.from(jsDays).forEach(date =>
             date.addEventListener("click", selectDate)
        );
        //addEventListener("clock", selectDate);
    }
    else if(user2.checked){
        console.log("user2 checked");
    }
    else{
        console.log("user3 checked");
    }
    */
}

function init(){
    calendar();
    selectUser();
}

init();