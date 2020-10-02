const date_picker_element = $(".date-picker");
// const selected_date_element = $(".date-picker .selected-date");
const dates_element = $(".date-picker .dates");
const mth_element = $(".date-picker .dates .month .mth");
const next_mth_element = $(".date-picker .dates .month .next-mth ");
const prev_mth_element = $(".date-picker .dates .month .prev-mth");
const days_element = $(".date-picker .dates .days");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month] + " " + year;
// selected_date_element.textContent = formatDate(date);

// date_picker_element.addEventListener("click", toggleDatePicker);
next_mth_element.addEventListener("click", goToNextMonth);
prev_mth_element.addEventListener("click", goToPreviousMonth);

populateDays();
// console.log(date.getDay());

// function toggleDatePicker(e) {
//   if (!checkEventPathForClass(e.path, "dates")) {
//     dates_element.classList.toggle("active");
//   }
// }

function customizeDatePickerEvent(callback) {
  $$(".day_element").forEach((day) => {
    day.addEventListener("click", callback);
    console.log("click");
  });
}

function goToNextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  mth_element.textContent = months[month] + " " + year;
  populateDays();
}

function goToPreviousMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  mth_element.textContent = months[month] + " " + year;
  populateDays();
}

function appendEmptyDays(firstDayOfMonth) {
  for (let i = 1; i < firstDayOfMonth; i++) {
    const empty_day_element = document.createElement("div");
    empty_day_element.classList.add("day");

    days_element.appendChild(empty_day_element);
  }
}

function isLeapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

function populateDays() {
  days_element.innerHTML = `                
  <div class="day-week">M</div>
  <div class="day-week">T</div>
  <div class="day-week">W</div>
  <div class="day-week">T</div>
  <div class="day-week">F</div>
  <div class="day-week">S</div>
  <div class="day-week">S</div>
  `;

  let firstDayOfMonth = new Date(year, month, 1).getDay() || 7;
  appendEmptyDays(firstDayOfMonth);

  let amount_days;
  switch (months[month]) {
    case "January":
      amount_days = 31;
      break;
    case "February":
      if (isLeapYear(year)) {
        amount_days = 29;
      } else {
        amount_days = 28;
      }
      break;
    case "March":
      amount_days = 31;
      break;
    case "April":
      amount_days = 30;
      break;
    case "May":
      amount_days = 31;
      break;
    case "June":
      amount_days = 30;
      break;
    case "July":
      amount_days = 31;
      break;
    case "August":
      amount_days = 31;
      break;
    case "September":
      amount_days = 30;
      break;
    case "October":
      amount_days = 31;
      break;
    case "November":
      amount_days = 30;
      break;
    case "December":
      amount_days = 31;
      break;
  }

  for (let i = 0; i < amount_days; i++) {
    const day_element = document.createElement("div");
    day_element.classList.add("day");
    day_element.textContent = i + 1;
    let day_element_date_value = new Date(year, month, i + 1);
    day_element.dataset.value = day_element_date_value;

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    // console.log(yesterday);
    if (day_element_date_value < yesterday) {
      day_element.classList.add("unavailable");
    }

    if (!day_element.classList.contains("unavailable")) {
      day_element.addEventListener("click", () => {
        selectedDate = new Date(year, month, i + 1);
        selectedDay = i + 1;
        selectedMonth = month;
        selectedYear = year;

        // selected_date_element.textContent = formatDate(selectedDate);
        date_picker_element.dataset.value = selectedDate;

        if (date_picker_element.dataset.type == "checkout") {
          dropdownTime.classList.remove("hidden");
          date_picker_element.classList.remove("invalid");
          dropdownTime.parentElement
            .querySelector("label[for=dropdownTime]")
            .classList.remove("hidden");
        }

        populateDays();
      });
    }

    if (
      selectedDay == i + 1 &&
      selectedMonth == month &&
      selectedYear == year
    ) {
      day_element.classList.add("selected");
    }

    days_element.appendChild(day_element);
  }
}

// function checkEventPathForClass(path, selector) {
//   for (let i = 0; i < path.length; i++) {
//     if (path[i].classList && path[i].classList.contains(selector)) {
//       return true;
//     }
//   }
//   return false;
// }

function formatDate(date) {
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let year = date.getFullYear();
  return day + " / " + month + " / " + year;
}
