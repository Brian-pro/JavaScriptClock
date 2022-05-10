// Grabbing the html
const militaryBtn = document.querySelector('.military-btn');
const standardBtn = document.querySelector('.standard-btn');
const clock = document.getElementById('clock-wrapper-standard');

// loading standard time as the default
standardTime();

// Variable to keep track of what 1 second interval is running
let interval = setInterval(standardTime, 1000);

// Button event listeners
standardBtn.addEventListener("click", () => {
    // Clearing the interval if the military time interval was running, loading the page with the standard time, and setting the interval 
    clearInterval(interval);
    standardTime();
    interval = setInterval(standardTime, 1000);
});

militaryBtn.addEventListener("click", () => {
    // Clearing the interval if the military time interval was running, loading the page with the military time, and setting the interval
    clearInterval(interval);
    militaryTime();
    interval = setInterval(militaryTime, 1000);
});

function standardTime() {
    // Since we are appending at the end of the fucntion we need to delete the divs created by clearing out the parent div
    clock.innerHTML = '';

    // Creating the date object
    const date = new Date();
    const hours = date.getHours();
    
    // Creating the divs needed to be appended to our standard time zone format that includes AM and PM in its own div
    const amPM = document.createElement('div');
    amPM.setAttribute("id", "am-pm");
    const time = document.createElement('div');
    time.setAttribute("id", "time");

    // If the page is currently using military time we want to switch the element Id so that the style switches 
    if(document.getElementById('clock-wrapper')) {
        document.getElementById('clock-wrapper').setAttribute('id', 'clock-wrapper-standard');
    }

    // Checking the current time to recognize whether or not it is AM or PM
    // Doing it this way looks better than adding "hour12: true" since we can put AM or PM in its own div
    var checkHours = (hours >= 12 && hours < 24) ? 'PM' : "AM";

    // Variable used to get the hours converted from (1-24 hour range) to (1-12 hour range) 
    // Done so by grabbing the remainder of (current hour + 24 / 12)
    var convertHours = (hours + 24) % 12;
    if(convertHours < 10) { // adding a leading zero to hours if the hours are single digits (looks better)
        convertHours = '0' + convertHours;
    }

    // Adding the data into the html file so the time can be displayed in standard time
    time.innerHTML = `${convertHours + ':' + date.toLocaleString('en-US', {minute: '2-digit', second: '2-digit'})}`;
    amPM.innerHTML = `${checkHours}`;

    // Adding the newly created divs into the "clock-wrapper-standard" div
    clock.appendChild(time);
    clock.appendChild(amPM);

    console.log('Standard time is running...');
}

function militaryTime() {
    // Creating the date object
    const date = new Date();

    // If the page is currently using standard time we want to switch the element Id so that the style switches 
    if(document.getElementById('clock-wrapper-standard')) {
        document.getElementById('clock-wrapper-standard').setAttribute('id', 'clock-wrapper');
    }

    // Adding the data into the html file so the time can be displayed in military time
    clock.innerHTML = `${date.toLocaleTimeString("en-US", {hour12: false})}`;

    console.log('Military time is running...');
}