// Function to create a single employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: []
    };
    }
    
    // Function to create multiple employee records
    function createEmployeeRecords(employeeData) {
    return employeeData.map(data => createEmployeeRecord(data));
    }
    
    // Function to create a time-in event
    function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
    });
    return employeeRecord;
    }
    
    // Function to create a time-out event
    function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
    });
    return employeeRecord;
    }
    
    // Function to calculate hours worked on a specific date
    function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }
    
    // Function to calculate wages earned on a specific date
    function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
    }
    
    // Function to calculate all wages for an employee
    function allWagesFor(employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date), 0);
    }
    
    // Function to calculate payroll for all employees
    function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, record) => totalPayroll + allWagesFor(record), 0);
    }