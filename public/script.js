// const monthNumber = 0;

//NB: The month is this context is create relatively to the needs of problem. So in on month you can see some weeks containing only (Wedenesday, Friday and Sunday) and Others containing(everyDay of the week excepted Monday & Tuesday ) 

// import {Month, MonthDay, MonthWeek,daysNumbersCorrespondance,} from "./data.js"
const daysNumbersCorrespondance = {
  1: "Lundi",
  2: "Mardi",
  3: "Mercredi",
  4: "Jeudi",
  5: "Vendredi",
  6: "Samedi",
  0: "Dimanche",
};

const monthNumbersCorrespondance = {
  0: "Janvier",
  1: "Février",
  2: "Mars",
  3: "Avril",
  4: "Mai",
  5: "Juin",
  6: "Juillet",
  7: "Aout",
  8: "Semptembre",
  9: "Octobre",
  10: "Novembre",
  11: "Décembre",
};


//Format the search quey params
const queryEntries = Array.from(
  new URLSearchParams(window.location.search).entries()
);
console.log(queryEntries);
const query = { spiritualAwakeningWeeks: [] };


for (let i = 0; i < queryEntries.length; i++) {
  if (queryEntries[i][0] == "spiritualAwakeningWeeks") {
    query[queryEntries[i][0]] = [
      ...query[queryEntries[i][0]],
      parseInt(queryEntries[i][1]),
    ];
  } else {
    // if(!query[queryEntries[i][0]]){
    //   query[queryEntries[i][0]]=0
    // }else{
    query[queryEntries[i][0]] = parseInt(queryEntries[i][1]);

    // }
  }
}

console.log(query);

// const monthNumbers=[0,1,2,3,,4,5,6,7,8,9,10,11]
const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysEntriesCorrespondance = Array.from(numberOfDays.entries());
const monthNumberOfDaysCorrespondance = Object.fromEntries(
  daysEntriesCorrespondance
);

console.log(monthNumberOfDaysCorrespondance);

class MonthDay {
  constructor(date) {
    // console.log(date);
    //The count starts with 0
    this.month = date.getMonth();
    console.log(date.getMonth());
    this.day = date.getDate();
    this.year = date.getFullYear();
    this.weekDay = date.getDay();
    this.dayString = daysNumbersCorrespondance[this.weekDay];
    // this.month = monthNumber;
  }

  getDayType() {
    switch (this.weekDay) {
      case 3:
        return "Etude Biblique";
      case 5:
        return "Prière";
      case 0:
        return "Culte";
      default:
        return "";
    }
  }

  formatDay() {
    // console.log('month: ',this.month);
    return `${this.day.toString().padStart(2, "0")}/${(this.month + 1).toString().padStart(2, "0")}/${
      this.year
    }`;
  }

  getMonthString() {
    return daysNumbersCorrespondance[this.month];
  }
}

class Month {
  constructor(monthNumber, year) {
    this.spiritualAwakeningWeeks = [4];
    this.monthNumber = monthNumber;
    this.year = year;
    this.days = [];
    this.weeks = [];
    this.numberOfWeeks = 4;
  }
  generateDays() {
    console.log("number", this.monthNumber);
    this.days = [];
    for (
      let i = 0;
      i < monthNumberOfDaysCorrespondance[this.monthNumber];
      i++
    ) {
      this.days.push(
        new MonthDay(
          new Date(
            `${this.getNextMonthNumber()}/${i + 1}/${this.getNextMonthYear()}`
          )
        )
      );
    }
    console.log(this.days);
  }

  generateFirstWeek() {
    // this:.days=this.generateDays();
    const firstWeekDays = [];
    for (let i = 0; i < 7; i++) {
      console.log(
        new Date(
          `${this.getNextMonthNumber()}/${i + 1}/${this.getNextMonthYear()}`
        )
      );
      firstWeekDays.push(
        new MonthDay(
          new Date(
            `${this.getNextMonthNumber()}/${i + 1}/${this.getNextMonthYear()}`
          )
        )
      );
      // this.days.push()
    }

    return firstWeekDays;
  }

  getNextMonthYear() {
    return this.monthNumber > 11 ? this.year + 1 : this.year;
  }

  getNextMonthNumber() {
    return this.monthNumber > 11 ? 1 : this.monthNumber + 1;
  }

  getNumberOfWeeks() {
    return this.numberOfWeeks;
  }

  //Generer les semaines du mois
  generateWeeks() {
    this.generateDays();
    let monthDays = this.days; //Getting month days
    //I consider in the context of my project that every month
    //must be ended by a sunday; so the last mass'day  of my month is not a sunday,
    //i continue in the next month till i see the first sunday;
    if (monthDays.at(-1).weekDay != 0) {
      const nextMonth = new Month(
        this.getNextMonthNumber(),
        this.getNextMonthYear()
      );
      const firstWeekDays = nextMonth.generateFirstWeek();

      // console.log(firstWeekDays);
      monthDays.push(...firstWeekDays);
      console.log(monthDays);
    }

    // console.log(mon);

    //As specified bellow , a sunday are synonym week
    const monthSundays = monthDays
      .filter((ele) => ele.weekDay == 0)
      .map((ele, idx) => {
        return [ele.day, ele]; //I need the day for sake of optimization
      });

    this.monthSundays = monthSundays;

    console.log(monthSundays);

    this.numberOfWeeks = monthSundays.length;

    let lastStartIndex = 0;
    for (let i = 0; i < monthSundays.length; i++) {
      const monthWeek = new MonthWeek();

      //To get the index of the current sunday
      let endIndex = monthSundays[i][1].day;

      if (lastStartIndex > endIndex) {
        const currentMonthNumberOfDays =
          monthNumberOfDaysCorrespondance[this.monthNumber];

          const restOfDaysBeforeMonthEnd =
          currentMonthNumberOfDays - lastStartIndex;
          console.log("rest: ", restOfDaysBeforeMonthEnd);
          console.log("end: ", endIndex);
        const totalNumberOfDays = restOfDaysBeforeMonthEnd + endIndex;
        for (let j = 0; j < totalNumberOfDays + 1; j++) {
          //I use i because at any moment i didn't perform a liked-sort(operation de tri ou qqchose du genre) operation on my array
          if (month.spiritualAwakeningWeeks.includes(i)) {
            if (
              [0, 3, 4, 5, 6].includes(monthDays[j + lastStartIndex].weekDay)
            ) {
              console.log("concernés", monthDays[lastStartIndex + j]);
              monthWeek.days.push(monthDays[lastStartIndex + j]);
            }
          } else {
            if ([0, 3, 5].includes(monthDays[j + lastStartIndex].weekDay)) {
              monthWeek.days.push(monthDays[lastStartIndex + j]);
            }
          }
        }
      } else {
        // for (let j = lastStartIndex; j < endIndex; j++) {
        if (month.spiritualAwakeningWeeks.includes(i)) {
          console.log("yes1");
          for (let j = lastStartIndex; j < endIndex; j++) {
            if (monthDays[j].weekDay > 2 || monthDays[j].weekDay == 0) {
              monthWeek.days.push(monthDays[j]);
            }
            // monthWeek.days.push(monthDays[j]);
          }
        } else {
          for (let j = lastStartIndex; j < endIndex; j++) {
            if ([0, 3, 5].includes(monthDays[j].weekDay)) {
              monthWeek.days.push(monthDays[j]);
            }
            // }
          }
        }
      }

      lastStartIndex = monthSundays[i][1].day;
      console.log("monthweek: ", monthWeek);

      this.weeks.push(monthWeek);
    }
  }
}

class MonthWeek {
  constructor() {
    this.days = [];
  }

  setIsAwekening() {
    this.isAwekening = true;
  }
}

const spritualsAwekenings = query["spiritualAwakeningWeeks"];
const monthNumber = query.month;
const yearNumber = query.year;
let title = document.querySelector(".document-title");
title.innerHTML = `Programme du mois de ${monthNumbersCorrespondance[monthNumber]}`;

const tBody = document.querySelector("tbody");
const month = new Month(monthNumber, yearNumber);
const monthDays = month.days;
const monthWeeks = month.weeks;

month.spiritualAwakeningWeeks = spritualsAwekenings;
month.generateWeeks();

console.log(month.weeks);

console.log(monthWeeks);
for (let i = 0; i < monthWeeks.length; i++) {
  for (let j = 0; j < monthWeeks[i].days.length; j++) {
    const tr = document.createElement("tr");

    const date = document.createElement("td");
    date.classList.add("fw-bold");
    date.innerText = monthWeeks[i].days[j].formatDay();
    tr.appendChild(date);

    const massType = document.createElement("td");
    massType.innerText = monthWeeks[i].days[j].getDayType();
    tr.appendChild(massType);

    if (monthWeeks[i].days.length>3){
      massType.innerText = "Réveil";

      if (monthWeeks[i].days[j].weekDay == 0) {
        massType.innerText = "Apothéose reveil";
      }
      
    }
      for (let k = 0; k < 10; k++) {
        const td = document.createElement("td");
        td.innerHTML = '<div contenteditable="true" type="text"/></div>';
        tr.appendChild(td);
      }
    tBody.appendChild(tr);
  }
  const tr2 = document.createElement("tr");
  tr2.classList.add("divider");

  for (let k = 0; k < 12; k++) {
    const td = document.createElement("div");
    tr2.appendChild(td);
  }
  tBody.appendChild(tr2);
}


//The code below is to generate a form for filtering the weeks of spriritual awakening
const spiritualAwakeningWeeks = document.querySelector(
  ".spiritualAwakeningWeeks"
);

//Select  the form
const form = document.forms.spriritualAwakeningFilter;

//Create submit input type
let submit = document.createElement("input");
submit.type = "submit";

//Create an input for the month with is by default the value of the month got by on the form page
let monthInput = document.createElement("input");
monthInput.type = "number";
monthInput.name = "month";
monthInput.value = query.month;
monthInput.classList.add("invisible");

//Create an input for the year with is by default the value of the year got by on the form page
let yearInput = document.createElement("input");
yearInput.name = "year";
yearInput.type = "number";
yearInput.value = query.year;
yearInput.classList.add("invisible");

//Generating the chekbox inputs to choose the sipritual awakenings weeks
for (let i = 0; i < month.monthSundays.length; i++) {
  let div = document.createElement("div");
  let label = document.createElement("label");
  let spritualAwakeningsInput = document.createElement("input");

  spritualAwakeningsInput.type = "checkbox";

  //Check if the value is the current one of the query params
  if(query.spiritualAwakeningWeeks.includes(i)){
    spritualAwakeningsInput.checked=true;
  }
  spritualAwakeningsInput.setAttribute("name", "spiritualAwakeningWeeks");
  spritualAwakeningsInput.setAttribute("id", "spiritualAwakeningWeeks" + i);
  spritualAwakeningsInput.value =i;

  label.innerText = `Semaine du ${month.monthSundays[i][1].formatDay()}`;
  label.setAttribute("for", `spiritualAwakeningWeeks${i}`);

  div.appendChild(spritualAwakeningsInput);
  div.appendChild(label);

  // div.innerText=sunday.

  spiritualAwakeningWeeks.appendChild(div);
}
spiritualAwakeningWeeks.appendChild(submit);
spiritualAwakeningWeeks.appendChild(yearInput);
spiritualAwakeningWeeks.appendChild(monthInput);

console.log(month.monthSundays);


const screenshotTarget = document.querySelector(".program");
const generate = document.getElementById("generate");

generate.onclick = (e) => {
  // spriritualAwakeningFilter.classList.add("invisible");
  html2canvas(screenshotTarget).then((canvas) => {
    const base64image = canvas.toDataURL("image/png");
    // window.location.href = base64image;
  
    const actualPreview = document.querySelector("#preview");
    const download = document.querySelector(".downloadImg");
    
    if(actualPreview){
      document.body.removeChild(actualPreview);
      document.body.removeChild(download);
    }

      

    const a=document.createElement('a');
    a.href=base64image;
    const img=new Image();
    img.src=base64image;
    img.id="preview";
    a.classList.add("btn", "btn-primary", "d-block", "my-5", "m-auto","downloadImg")
    a.download=`programme_${monthNumbersCorrespondance[month.monthNumber]}`.toLocaleLowerCase();

    a.innerText="Télécharger le prgramme"
    
    a.style.width="min-content"

    
    document.body.appendChild(img)
    document.body.appendChild(a);
  });
};