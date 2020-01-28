const calendar = document.querySelector("calendar");
const calBody = document.querySelector(".cal-body");

const btnNext = document.querySelector(".btn-cal.next");
const btnPrev = document.querySelector(".btn-cal.prev");
const btnAdd = document.querySelector(".btn-menu.add");
const btnOk = document.querySelector(".btn-menu.ok");
const btnResult = document.querySelector(".result");
const showResult = document.querySelector(".show-result");

const inputUserNum = document.querySelector(".input.user-number");
const messageBox = document.querySelector(".message-box");
const showUserList = document.querySelector(".user-list");

/*Array about selected Days*/
var dayArr = [[],[]];

var afterPressOkFlag = false;
var days = null;
var users = null;
var currYear = null;
var currMonth = null;

var activeFlag1 = null;
var activeFlag2 = null;

var currMonthId = null;
//for handleDayClick

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

function monthIntoDay(month){
    parseInt(month);
    switch(month){
        case 0:
            month = 0;
            break;
        case 1:
            month = 31;
            break;
        case 2:
            month = 31 + 28;
            break;
        case 3:
            month = 31 + 28 + 31;
            break;
       case 4:
            month = 31 + 28 + 31 + 30;
            break;
        case 5:
            month = 31 + 28 + 31 + 30 + 31;
            break;
        case 6:
            month = 31 + 28 + 31 + 30 + 31 + 30;
            break;
        case 7:
            month = 31 + 28 + 31 + 30 + 31 + 30 + 31;
            break;
        case 8:
            month = 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31;
            break;
        case 9:
            month = 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30;
            break;
        case 10:
            month = 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31;
            break;
        case 11:
            month = 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30;
            break;
    }
    return month;
}

function simplifyDay(user){
    /* Make selected Date into day (ex. 2020 Feb 5 equals (2020 - 2020) + 31 + 5 = 36)*/
    var resultDay = parseInt(user.fY);
    resultDay = 365*(resultDay - 2020);
    resultDay += monthIntoDay(user.fM);
    resultDay += parseInt(user.fD);
    user.fSimpleDay = resultDay;
    dayArr[0].push(resultDay);

    var resultDay2 = parseInt(user.sY);
    resultDay2  = 365*(resultDay2 - 2020);
    resultDay2 += monthIntoDay(user.sM);
    resultDay2 += parseInt(user.sD);
    user.sSimpleDay = resultDay2;
    dayArr[1].push(resultDay2);
}

function createUserInfo(){
    this.id = 0;
    this.fY = 0;
    this.fM = 0;
    this.fD = 0;
    this.sY = 0;
    this.sM = 0;
    this.sD = 0;
    this.ifSelected = false;
    this.fSimpleDay = 0;
    this.sSimpleDay = 0;

    this.firstActiveFlag = null;
    this.secondActiveFlag = null;
}

var userList= [];
var userListForMatching = [];
var userNumber = 0;

var selectedUserNumberFlag = -1;
var ifFirstDaySelected = false;

function loadYearAndMonth(day){
    currMonthId = day.getMonth();
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

    /*refresh */
    if(selectedUserNumberFlag != -1){
        Array.from(days).forEach(day =>{
            refreshDayColor(day);
        });

        if(userList[selectedUserNumberFlag].firstActiveFlag){
            userList[selectedUserNumberFlag].firstActiveFlag.classList.add('clicked');
        }
        if(userList[selectedUserNumberFlag].secondActiveFlag){
            userList[selectedUserNumberFlag].secondActiveFlag.classList.add('clicked');
        }

        Array.from(days).forEach(day =>{
            day.addEventListener("click", handleDayClick);
        });
    }

}

function showUsers(){
    var str = '<tr class="0">';
    for(var i = 0; i <userNumber;i++){
        
        if(i != 0 && i%5 === 0){
            str += `</tr>`;
            str += `<tr class="${i/5}">`;
        }
        str += `<td class="userNum num${i+1} ${i+1}">User${i+1}</td>`;
    }
    str += `</tr>`
    showUserList.innerHTML = str;
}

function showUserNumber(){
    inputUserNum.value = userNumber;
}

function addUsers(){
    var user = new createUserInfo();
    user.id = ++userNumber;
    userList.push(user);

    btnOk.disabled = false;
    showUserNumber();
}

function userBgColorRefresh(){
    for(var i = 0; i <userNumber ; i++){
        users[i].style.backgroundColor = 'floralwhite';
    }
}

function refreshDayColor(day){
    if(day.className === 'day clicked'){
        day.className = 'day';
        console.log(day);
    }
}

function handleUserClick(event){
    userBgColorRefresh();
    const userNumber = parseInt(event.target.classList[2]) - 1;

    selectedUserNumberFlag = userNumber;
    //console.log(event);
    event.target.style.backgroundColor = 'skyblue';
    messageBox.innerHTML = `User${userNumber+1} selected. Click the possible days!`;

    if(selectedUserNumberFlag != -1){
        Array.from(days).forEach(day =>{
            refreshDayColor(day);
        });

        if(userList[selectedUserNumberFlag].firstActiveFlag){
            userList[selectedUserNumberFlag].firstActiveFlag.classList.add('clicked');
        }
        if(userList[selectedUserNumberFlag].secondActiveFlag){
            userList[selectedUserNumberFlag].secondActiveFlag.classList.add('clicked');
        }

        Array.from(days).forEach(day =>{
            day.addEventListener("click", handleDayClick);
        });
    }
}

function checkIfAllSelected(){
    for(var i = 0;i<userNumber;i++){
        if(userList[i].ifSelected === false){
            return false;
        }
    }
    return true;
}

function sortUpperCase(){
    for(var i=0;i<userNumber;i++){
        var tmp = i;
        for(var j = i;j<userNumber;j++){
            if(dayArr[0][tmp]>=dayArr[0][j]){
                tmp = j;
            }
        }
        var tmpVar = dayArr[0][i];
            dayArr[0][i] = dayArr[0][tmp];
            dayArr[0][tmp] = tmpVar;

            tmpVar = dayArr[1][i];
            dayArr[1][i] = dayArr[1][tmp];
            dayArr[1][tmp] = tmpVar;
    }
}

function swap(){
    for(var i = 0 ; i < userNumber ; i++){
        if(dayArr[0][i]>dayArr[1][i]){
            var temp = dayArr[0][i];
            dayArr[0][i] = dayArr[1][i];
            dayArr[1][i] = temp;

            temp = userList[i].fY;
            userList[i].fY = userList[i].sY;
            userList[i].sY = temp;

            temp = userList[i].fM;
            userList[i].fM = userList[i].sM;
            userList[i].sM = temp;

            temp = userList[i].fD;
            userList[i].fD = userList[i].sD;
            userList[i].sD = temp;

            temp = userList[i].fSimpleDay;
            userList[i].fSimpleDay = userList[i].sSimpleDay;
            userList[i].sSimpleDay = temp;
        }
    }
}

function calculateResult(){
    Array.from(userList).forEach(user =>
        simplifyDay(user)
    );
     /* Swap checked two days if two days are not in correct order*/
    swap();

    /*Sort with Upper Case and Calculate the Result */
    sortUpperCase();

    var impossible = false;
    var tmp;
    var start = dayArr[0][0];
    var finish = dayArr[1][0];
    for(var i = 0 ; i < userNumber ; i++){
        if(dayArr[0][i] > finish){
            impossible = true;
            break;
        }
        else{
            if(finish>dayArr[1][i]){
                finish = dayArr[1][i];
            }
            start = dayArr[0][i];
        }
    }
    if(!impossible){
        /* Show the Result*/
        var startIndex = 0;
        var finishIndex = 0;
        for(var i = 0 ; i < userNumber ; i++){
            if(userList[i].fSimpleDay === start){
                startIndex = i;
            }
        }
        for(var i = 0 ; i < userNumber ; i++){
            if(userList[i].sSimpleDay === finish){
                finishIndex = i;
            }
        }
        showResult.innerHTML = `<span class='from'>From</span> <span class='mainText'>${calInit.monList[userList[startIndex].fM]} ${userList[startIndex].fD}, ${userList[startIndex].fY}</span>
         <span class='to'>To</span> <span class='mainText'>${calInit.monList[userList[finishIndex].sM]} ${userList[finishIndex].sD}, ${userList[finishIndex].sY}</span>`;
    }
    else{
        showResult.innerHTML = `No Matching Day!`;
    }
}


function handleDayClick(day){
    if(afterPressOkFlag){
        if(day.target.classList.contains('clicked')){
            
        }
        else{
            if(!userList[selectedUserNumberFlag].firstActiveFlag && !userList[selectedUserNumberFlag].secondActiveFlag){
                day.target.classList.add('clicked');
                activeFlag1 = day.target;
                userList[selectedUserNumberFlag].firstActiveFlag = activeFlag1;
            }
            else if(!userList[selectedUserNumberFlag].secondActiveFlag){
                day.target.classList.add('clicked');
                activeFlag2 = day.target;
                userList[selectedUserNumberFlag].secondActiveFlag = activeFlag2;
            }
            else{
                day.target.classList.add('clicked');
                var del = userList[selectedUserNumberFlag].firstActiveFlag;
                activeFlag1 = userList[selectedUserNumberFlag].secondActiveFlag;
                activeFlag2 = day.target;
                del.classList.remove('clicked');

                userList[selectedUserNumberFlag].firstActiveFlag = activeFlag1;
                userList[selectedUserNumberFlag].secondActiveFlag = activeFlag2;
            }
        }
    }

    //day.target.className += ' clicked';
    var str = "";
    str += `${currYear} ${currMonth} ${day.target.innerText}`;
    console.log(str);
    //console.log(day.target.innerText);
    if(selectedUserNumberFlag != -1 && ifFirstDaySelected === false){
        userList[selectedUserNumberFlag].fY = currYear;
        userList[selectedUserNumberFlag].fM = currMonthId;
        userList[selectedUserNumberFlag].fD = day.target.innerText;
        ifFirstDaySelected = true;
    }
    else if(ifFirstDaySelected === true){
        userList[selectedUserNumberFlag].sY = currYear;
        userList[selectedUserNumberFlag].sM = currMonthId;
        userList[selectedUserNumberFlag].sD = day.target.innerText;
        ifFirstDaySelected = false;
        userList[selectedUserNumberFlag].ifSelected = true;

        var ifAllSelected = checkIfAllSelected();
        if(ifAllSelected === true){
            btnResult.disabled = false;
            btnResult.addEventListener('click', calculateResult);
            /*Calculate the possible days and finish the process*/ 
        }
    }
}

function afterPressOk(){
    showUsers();
    afterPressOkFlag = true;
    users = document.getElementsByClassName("userNum");
    console.log(users);
    //console.log(users);

    /*
    Array.from(users).forEach(user =>
        user.style.backgroundColor = 'darksalmon'  
      );
        */
    Array.from(users).forEach(user =>
      user.addEventListener("click", handleUserClick)  
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
