const calendar = document.querySelector("calendar");
const calBody = document.querySelector(".cal-body");

const btnNext = document.querySelector(".btn-cal.next");
const btnPrev = document.querySelector(".btn-cal.prev");
const btnAdd = document.querySelector(".btn-menu.add");
const btnOk = document.querySelector(".btn-menu.ok");

const inputUserNum = document.querySelector(".input.user-number");
const messageBox = document.querySelector(".message-box");
const showUserList = document.querySelector(".show-user-list");

var days = null;
var users = null;
var currYear = null;
var currMonth = null;

const calInit = {
    monList: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayList: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    today: new Date(),
    monthForChange: new Date().getMonth(),
    newDate: new Date(),
    getFirstDay: (yy, mm) => new Date(yy, mm, 1),
    getLastDay: (yy, mm) => new Date(yy, mm+1, 0),
    nextMonth: function(){
        let date = new Date();
        date.setDate(1);
        date.setMonth(++this.monthForChange);
        this.newDate = date;
        return date;
    },
    prevMonth: function(){
        let date = new Date();
        date.setDate(1);
        date.setMonth(--this.monthForChange);
        this.newDate = date;
        return date;
    },
};
function createUserInfo(){
    this.id = 0;
    this.selectedFirstDay = new Date();
    this.selectedSecondDay = new Date();
}

var userList= [];
var userListForMatching = [];
var userNumber = 0;

function loadYearAndMonth(day){
    currMonth = document.querySelector('.cal-month').textContent = calInit.monList[day.getMonth()];
    currYear = document.querySelector('.cal-year').textContent = day.getFullYear();
}

function loadDays(date){
    console.log(date);
    var str='';
    var index=0;
    var dayCountIndex=0;
    var start=1;

    let currYear = date.getFullYear();
    let currMonth = date.getMonth();
    let firstDay = calInit.getFirstDay(currYear, currMonth);
    let LastDay = calInit.getLastDay(currYear, currMonth);

 
    for(var i = 0 ; i < 7 ; i++){
        str += '<tr>';
        for(var j = 0; j < 7 ; j++){
            if(dayCountIndex<firstDay.getDay()){
                dayCountIndex++;
                str +='<td>';
            }
            else if(start <= LastDay.getDate()){
                str += '<td class="day">';
                str += `${start++}`;
            }
            else{
                str +='<td>';
            }
            str += '</td>';
            
        }
    }

    calBody.innerHTML = str;

}

function loadCalendar(date){
    loadYearAndMonth(date);
    loadDays(date);
    days = document.getElementsByClassName("day");
}

function showUsers(){
    var str = '';
    for(var i = 0; i <userNumber;i++){
        str += `<td class="userNum num${i+1}">User${i+1}</td>`;
    }
    showUserList.innerHTML = str;
}

function showUserNumber(){
    //console.log(inputUserNum);
    inputUserNum.value = userNumber;
}

function addUsers(){
    var user = new createUserInfo();
    user.id = ++userNumber;
    userList.push(user)

    btnOk.disabled = false;
    showUserNumber();
}

function userBgColorRefresh(){
    for(var i = 0; i <userNumber ; i++){
        users[i].style.backgroundColor = 'darksalmon';
    }
}

function handleUserClick(event){
    userBgColorRefresh();
    const userNumber = event.target.cellIndex;
    //console.log(event);
    event.target.style.backgroundColor = 'dodgerblue';
    messageBox.innerHTML = `User${userNumber+1} selected. Click the possible days!`;


}

function handleDayClick(day){
    var str = "";
    str += `${currYear} ${currMonth} ${day.target.innerText}`;
    console.log(str);
    //console.log(day.target.innerText);
}

function afterPressOk(){
    showUsers();
    users = document.getElementsByClassName("userNum");
    //console.log(users);

    Array.from(users).forEach(user =>
        user.style.backgroundColor = 'darksalmon'  
      );

    Array.from(users).forEach(user =>
      user.addEventListener("click", handleUserClick)  
    );

    Array.from(days).forEach(day =>
      day.addEventListener("click", handleDayClick)  
    );
}


function init(){
    loadCalendar(calInit.today);
    btnNext.addEventListener('click', ()=>loadCalendar(calInit.nextMonth()));
    btnPrev.addEventListener('click', ()=>loadCalendar(calInit.prevMonth()));
    btnAdd.addEventListener('click', addUsers);
    btnOk.addEventListener('click', afterPressOk);
}

init();