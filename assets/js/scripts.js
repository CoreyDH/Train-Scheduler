(function($) {
  $(function() {

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyC95eu23uSHAB9plJoafPZZW37CGEFyPME",
      authDomain: "train-schedule-3faaa.firebaseapp.com",
      databaseURL: "https://train-schedule-3faaa.firebaseio.com",
      storageBucket: "",
    };
    firebase.initializeApp(config);

    var fb = firebase.database().ref('train');

   fb.on('child_added', function(snapshot) {

     console.log(snapshot.val());
     var childData = snapshot.val();

     var $table = $('#schedule');

     var htmlData = '<tr>';

     htmlData += '<td>'+childData.name+'</td>';
     htmlData += '<td>'+childData.destination+'</td>';
     htmlData += '<td>'+childData.startTime+'</td>';
     htmlData += '<td>'+childData.frequency+'</td>';
     htmlData += '<td></td>';
     htmlData += '<td></td>';
     htmlData += '</tr>';

     $table.append(htmlData);

   });

   $('#submitData').on('click', function() {

     // pull data
     var name = $('#name').val().trim();
     var destination = $('#destination').val().trim();
     var startTime = $('#startTime').val().trim();
     var frequency = parseInt($('#frequency').val());

     // validate form
     if(name && destination && startTime && frequency) {

       var train = {
         name: name,
         destination: destination,
         startTime: startTime,
         frequency: frequency
       };

       fb.push(train);

     } else {

       alert('Please complete all form fields');

     }

     // clear forms
     $('#name').val('');
     $('#destination').val('');
     $('#startTime').val('');
     $('#frequency').val('');

   });

  });
})(jQuery);
