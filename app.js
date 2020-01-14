const calendar = document.querySelector("calendar");
const calBody = document.querySelector(".cal-body");

const btnNext = document.querySelector(".btn-cal.next");
const btnPrev = document.querySelector(".btn-cal.prev");

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

function init(){
    loadCalendar(calInit.today);
    btnNext.addEventListener('click', ()=>loadCalendar(calInit.nextMonth()));
    btnPrev.addEventListener('click', ()=>loadCalendar(calInit.prevMonth()));
}

init();