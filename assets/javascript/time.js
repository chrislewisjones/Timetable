$(document).ready();
{
  // firebase hook up to a train-timetable db
  var config = {
    apiKey: "AIzaSyDmQwufQF1FPGeaoAH8-2ySrdBhwm4-jM8",
    authDomain: "train-timetable-3b33e.firebaseapp.com",
    databaseURL: "https://train-timetable-3b33e.firebaseio.com/",
    projectId: "train-timetable-3b33e",
    storageBucket: "train-timetable-3b33e.appspot.com",
    messagingSenderId: "255381909084"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // timesheet and train time activities used heavily
  // turn on the button for adding a train
  $("#add-train-btn").on("click", function(event) {
    console.log("clicking");
    event.preventDefault();

    // Grabs the user's input from ids in the form
    var trainName = $("#train-name-input")
      .val()
      .trim();
    var destination = $("#destination-input")
      .val()
      .trim();
    var firstTime = moment($("#first-time-input").val(), "HH:mm").format(
      "hh:mm"
    );
    var frequency = $("#frequency-input")
      .val()
      .trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency
    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);

    // alert that the train has been added
    alert("Train successfully added");

    // Clears all of the text-boxes ready for next entry
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
  });

  // Create Firebase event for adding the new trains to the database and a row in the html when a user adds an entry
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

    // Set the current time using moment
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder) used for minutes away
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minutes until next train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //   Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain.format("hh:mm A")),
      $("<td>").text(tMinutesTillTrain)
    );

    //   Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
}
