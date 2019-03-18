var config = {
  apiKey: "AIzaSyDmQwufQF1FPGeaoAH8-2ySrdBhwm4-jM8",
  authDomain: "test-d3503.firebaseapp.com",
  databaseURL: "https://test-d3503.firebaseio.com",
  projectId: "test-d3503",
  storageBucket: "test-d3503.appspot.com",
  messagingSenderId: "255381909084"
};
firebase.initializeApp(config);

var database = firebase.database();
// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  console.log("clicking");
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input")
    .val()
    .trim();
  var destination = $("#destination-input")
    .val()
    .trim();
  var firstTime = moment($("#first-time-input").val(), "HH:mm").format("hh:mm");
  var frequency = $("#frequency-input")
    .val()
    .trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.firstTime);
  console.log(newTrain.frequency);

  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().firstTime;
  var frequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTime);
  console.log(frequency);

  // Prettify the train's first time
  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Create the new row
  //   var newRow = $("<tr>").append(
  //     $("<td>").text(trainName),
  //     $("<td>").text(destination),
  //     $("<td>").text(frequency),
  //     $("<td>").text(nextTrain),
  //     $("<td>").text(tMinutesTillTrain),
  //   );

  // Append the new row to the table
  //   $("#train-table > tbody").append(newRow);
  // });

  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016

  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
});
