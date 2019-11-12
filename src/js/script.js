window.onload = function () {

    dateCalculator(moment(), "", "cal");
};

function dateCalculator(startMomentDate, referredBy, calendarId) {

    // let startMomentDate = moment();

    // let month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // let month = startMomentDate.months(); //0-11 7
    // let year = startMomentDate.year(); //2014

    // let first_date = month_name[month] + " " + 1 + " " + year;

    // let tmp = new Date(first_date).toDateString(); //Mon Sep 01 2014 ...
    // let first_day = tmp.substring(0, 3); //Mon
    // let day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // let days = new Date(year, month + 1, 0).getDate(); //30

    startMomentDate = moment().set('date', 1);
    let firstDateDay = startMomentDate.day();
    let totalDays = startMomentDate.endOf('month').date();

    let fareCalendar = renderCalendar(firstDateDay, totalDays, "", null);
    document.getElementById(calendarId).appendChild(fareCalendar);
}

function renderCalendar(firstDateDay, totalDays, referredBy, toCompareDate) {

    let table = document.createElement("table");
    let tr = document.createElement("tr");

    let dateDisabled = " date-disabled";
    let allowedDate = " date-allowed";

    //row for the day letters
    for (let c = 0; c <= 6; c++) {
        let td = document.createElement("td");
        td.className = "day-header";

        let weekday = "SuMoTuWeThFrSa";
        td.innerHTML = weekday[2 * c] + weekday[2 * c + 1];

        if (td.innerHTML === "Su" || td.innerHTML === "Sa") {
            td.className = "weekends";
        }

        tr.appendChild(td);
    }

    table.appendChild(tr);

    //create 2nd row
    tr = document.createElement('tr');
    let c;
    for (c = 0; c <= 6; c++) {
        if (c === firstDateDay) {
            break;
        }
        let td = document.createElement('td');
        td.innerHTML = "";
        td.className = "table-top-border"; // todo
        tr.appendChild(td);
    }

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

        // isDateLessThanSomeDate(count, iterativeDate)

        // if (isDateLessThanSomeDate(count, toCompareDate, referredBy)) {
        //
        //     td.className += dateDisabled;
        //
        // } else {
        //
        //     td.className += allowedDate;
        //
        //     let onlyDate = count;
        //
        //     let zeroedCount = "";
        //     if (count < 10) {
        //         zeroedCount = "0";
        //     }
        //
        //     td.onclick = function () {
        //         dateSelected(zeroedCount + onlyDate, referredBy, zangStatus);
        //     }
        // }

        count++;

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

            // isDateLessThanSomeDate(count, iterativeDate)

            count++;
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    return table;
}