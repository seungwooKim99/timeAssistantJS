var monthNames = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var weekNames = ['Sun', 'Mon', 'Tue', 'Wed','Thu', 'Fri', 'Sat'];
var jsDays;
var selectedDay1 = 0;
var selectedDay2 = 0;

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
   const daysArray = Array.from(jsDays);
   daysArray.forEach(date =>
    date.addEventListener("click", selectDate)
    ); 
}

function selectDate(event){
    //console.log(event.target.id);
    if(selectedDay1 === 0){
        selectedDay1 = event.target.id;
    }
    else{
        selectedDay2 = event.target.id;
    }
    //console.log(selectedDay1);
    //console.log(selectedDay2);
    
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