// Function to create a single employee record
function createEmployeeRecord(arr) {
    return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
    };
    }
    
    // Function to create multiple employee records
    function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
    }
    
    // Function to create a time in event
    function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    
    return this;
    }
    
    // Function to create a time out event
    function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    
    return this;
    }
    
    // Function to calculate hours worked on a specific date
    function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(event => event.date === date);
    let timeOut = this.timeOutEvents.find(event => event.date === date);
    
    return (timeOut.hour - timeIn.hour) / 100;
    }
    
    // Function to calculate wages earned on a specific date
    function wagesEarnedOnDate(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
    }
    
    // Provided function to calculate total wages for an employee
    const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
    });
    
    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0); // bind(this) ensures the correct 'this' context
    
    return payable;
    };
    
    // Function to find an employee by their first name
    function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
    }
    
    // Function to calculate total payroll for all employees
    function calculatePayroll(employees) {
    return employees.reduce((total, employee) => {
    return total + allWagesFor.call(employee);
    }, 0);
    }