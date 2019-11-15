let fareCalendarMoment;

$(document).on('click', '.fare-calendar > div > .dropdown-menu', function (e) {
    e.stopPropagation();
});

window.onload = function () {

    fareCalendarMoment = moment();

    let onloadMoment = moment(fareCalendarMoment);
    let toCompareMomentDate = moment();

    zeroTimedMoment(onloadMoment);
    zeroTimedMoment(toCompareMomentDate);

    dateCalculator(onloadMoment, "", "cal", toCompareMomentDate);
};


function dateCalculator(startMomentDate, referredBy, calendarId, toCompareMomentDate) {

    startMomentDate.set('date', 1);
    console.log(startMomentDate.format());
    document.getElementById("current-month").innerText = startMomentDate.format("MMMM");
    document.getElementById("current-year").innerText = startMomentDate.format("YYYY");

    let fareCalendar = renderCalendar(startMomentDate, "", toCompareMomentDate);
    document.getElementById(calendarId).innerHTML = "";
    document.getElementById(calendarId).appendChild(fareCalendar);
}


function renderCalendar(startMomentDate, referredBy, toCompareMomentDate) {

    let temporaryMoment = moment(startMomentDate);
    zeroTimedMoment(temporaryMoment);

    let firstDateDay = startMomentDate.day();
    let totalDays = startMomentDate.endOf('month').date();

    let table = document.createElement("table");
    let tr = document.createElement("tr");

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

        let td = getTableTd(referredBy, count);
        td.className = "table-top-border";

        tdClassAdder(count, toCompareMomentDate, td, temporaryMoment);

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

            let td = getTableTd(referredBy, count);
            td.className = "table-top-border";

            tdClassAdder(count, toCompareMomentDate, td, temporaryMoment);

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


function nextMonth() {
    fareCalendarMoment.add(1, "month");
    let nextMoment = moment(fareCalendarMoment);
    dateCalculator(nextMoment, "", "cal", moment());
}


function previousMonth() {
    fareCalendarMoment.subtract(1, "month");
    let previousMoment = moment(fareCalendarMoment);
    dateCalculator(previousMoment, "", "cal", moment());
}


function zeroTimedMoment(currentMoment) {

    currentMoment.set("hour", 0);
    currentMoment.set("minute", 0);
    currentMoment.set("second", 0);
    currentMoment.set("millisecond", 0);
}


function getTableTd(referredBy, count) {

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

    return td;
}


function tdClassAdder(count, toCompareMomentDate, td, temporaryMoment) {

    let dateDisabled = " date-disabled";
    let allowedDate = " date-allowed";
    let todayDate = " today-date";

    if (temporaryMoment.month() === toCompareMomentDate.month() &&
        temporaryMoment.year() === toCompareMomentDate.year() &&
        count === toCompareMomentDate.date()) {

        td.className += todayDate;

    } else if (isDateLessThanSomeDate(temporaryMoment, toCompareMomentDate)) {
        td.className += dateDisabled;

    } else {

        td.className += allowedDate;

        td.onclick = function () {

        }
    }
}