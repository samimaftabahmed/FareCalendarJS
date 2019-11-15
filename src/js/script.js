$(document).on('click', '.fare-calendar > div > .dropdown-menu', function (e) {
    e.stopPropagation();
});

window.onload = function () {

    dateCalculator(moment(), "", "cal");
};


function dateCalculator(startMomentDate, referredBy, calendarId) {

    startMomentDate = moment().set('date', 1);
    document.getElementById("current-month").innerText = startMomentDate.format("MMMM");
    document.getElementById("current-year").innerText = startMomentDate.format("YYYY");

    let fareCalendar = renderCalendar(startMomentDate, "", moment());
    document.getElementById(calendarId).appendChild(fareCalendar);
}


function renderCalendar(startMomentDate, referredBy, toCompareMomentDate) {

    let temporaryMoment = moment(startMomentDate);
    zeroTimedMoment(temporaryMoment);
    zeroTimedMoment(startMomentDate);
    zeroTimedMoment(toCompareMomentDate);

    let firstDateDay = startMomentDate.day();
    let totalDays = startMomentDate.endOf('month').date();

    let table = document.createElement("table");
    let tr = document.createElement("tr");

    let dateDisabled = " date-disabled";
    let allowedDate = " date-allowed";
    let todayDate = " today-date";

    //row for the day letters
    for (let c = 0; c <= 6; c++) {
        let td = document.createElement("td");
        td.className = "day-header";

        let weekday = "SuMoTuWeThFrSa";
        td.innerHTML = weekday[2 * c] + weekday[2 * c + 1];

        if (td.innerHTML === "Su" || td.innerHTML === "Sa") {
            td.className = "weekends";
        } else {
            td.className = "day";
        }

        tr.appendChild(td);
    }

    table.appendChild(tr);

    //create 2nd row with previous month dates
    let prevMonthMoment = moment(startMomentDate);
    prevMonthMoment.subtract(1, "month");
    let lastMonthLastWeekStartDate = prevMonthMoment.endOf("month").date() - firstDateDay + 1;

    tr = document.createElement('tr');
    let c;
    for (c = 0; c <= 6; c++) {
        if (c === firstDateDay) {
            break;
        }

        let td = document.createElement('td');
        let spanDate = document.createElement('span');
        let spanPrice = document.createElement('span');
        let br = document.createElement('br');

        spanDate.innerHTML = "" + lastMonthLastWeekStartDate;
        spanPrice.innerHTML = "&nbsp;";

        td.appendChild(spanDate);
        td.appendChild(br);
        td.appendChild(spanPrice);

        lastMonthLastWeekStartDate++;
        td.className = "table-top-border date-disabled";
        tr.appendChild(td);
    }

    // staring dates on 2nd row
    let count = 1;
    for (; c <= 6; c++) {
        let td = document.createElement('td');
        let spanDate = document.createElement('span');
        let spanPrice = document.createElement('span');
        let br = document.createElement('br');

        spanDate.innerHTML = "" + count;
        spanPrice.className = "fare-sty";
        spanPrice.id = "fare" + referredBy + "-" + count;
        spanPrice.innerHTML = "&nbsp;";

        td.appendChild(spanDate);
        td.appendChild(br);
        td.appendChild(spanPrice);

        td.className = "table-top-border";

        if (count === toCompareMomentDate.date()) {
            td.className += todayDate;

        } else if (isDateLessThanSomeDate(temporaryMoment, toCompareMomentDate)) {
            td.className += dateDisabled;

        } else {

            td.className += allowedDate;

            td.onclick = function () {

            }
        }

        count++;
        temporaryMoment.add(1, 'day');
        tr.appendChild(td);
    }

    table.appendChild(tr);

    //rest of the date rows
    for (let r = 3; r <= 7; r++) {

        tr = document.createElement('tr');

        for (let c = 0; c <= 6; c++) {

            if (count > totalDays) {
                table.appendChild(tr);
                return table;
            }

            let td = document.createElement('td');
            let spanDate = document.createElement('span');
            let spanPrice = document.createElement('span');
            let br = document.createElement('br');

            spanDate.innerHTML = "" + count;
            spanPrice.className = "fare-sty";
            spanPrice.id = "fare" + referredBy + "-" + count;
            spanPrice.innerHTML = "&nbsp;";

            td.appendChild(spanDate);
            td.appendChild(br);
            td.appendChild(spanPrice);

            td.className = "table-top-border";

            if (count === toCompareMomentDate.date()) {
                td.className += todayDate;

            } else if (isDateLessThanSomeDate(temporaryMoment, toCompareMomentDate)) {
                td.className += dateDisabled;

            } else {

                td.className += allowedDate;

                td.onclick = function () {

                }
            }

            count++;
            temporaryMoment.add(1, 'day');
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    return table;
}


function isDateLessThanSomeDate(currentMoment, toCompareMomentDate) {

    return currentMoment.isBefore(toCompareMomentDate);
}


function nextMonth(currentMonthMoment) {
    let nextMoment = moment(currentMonthMoment).add(1, "month");
    // call  calendar renderer
}


function previousMonth(currentMonthMoment) {
    let previousMoment = moment(currentMonthMoment).subtract(1, "month");
    // call  calendar renderer
}


function zeroTimedMoment(currentMoment) {

    currentMoment.set("hour", 0);
    currentMoment.set("minute", 0);
    currentMoment.set("second", 0);
    currentMoment.set("millisecond", 0);
}