const calendar = document.querySelector("calendar");
const calBody = document.querySelector(".cal-body");

const btnNext = document.querySelector(".btn-cal.next");
const btnPrev = document.querySelector(".btn-cal.prev");
const btnAdd = document.querySelector(".btn-menu.add");
const btnOk = document.querySelector(".btn-menu.ok");

const inputUserNum = document.querySelector(".input.user-number");

const showUserList = document.querySelector(".show-user-list");


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
    document.querySelector('.cal-month').textContent = calInit.monList[day.getMonth()];
    document.querySelector('.cal-year').textContent = day.getFullYear();
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
}

function showUsers(){
    var str = '';
    for(var i = 0; i <userNumber;i++){
        str += `<td class="user num${i+1}">User${i+1}</td>`;
    }
    showUserList.innerHTML = str;
}

function showUserNumber(){
    console.log(inputUserNum);
    inputUserNum.value = userNumber;
}

function addUsers(){
    var user = new createUserInfo();
    user.id = ++userNumber;
    userList.push(user)

    btnOk.disabled = false;
    showUserNumber();
    //showUsers();
    //console.log(userList);
}

function a(){
    console.log("hi");
}

function afterPressOk(){
    showUsers();
    for(var i=0;i<userNumber;i++){
    
    }
    //console.log(userList);
    
}

function a(){
    console.log("HI");
}

function init(){
    loadCalendar(calInit.today);
    btnNext.addEventListener('click', ()=>loadCalendar(calInit.nextMonth()));
    btnPrev.addEventListener('click', ()=>loadCalendar(calInit.prevMonth()));
    btnAdd.addEventListener('click', addUsers);
    btnOk.addEventListener('click', afterPressOk);
}

init();