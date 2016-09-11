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
     var currentTime = moment().format('HH:mm');

     var htmlData = '<tr>';

     htmlData += '<td>'+childData.name+'</td>';
     htmlData += '<td>'+childData.destination+'</td>';
     htmlData += '<td>'+childData.startTime+'</td>';
     htmlData += '<td>'+childData.frequency+'</td>';
     htmlData += '<td></td>';
     htmlData += '<td></td>';
     htmlData += '<td><span class="glyphicon glyphicon-remove removeSchedule"></span></td>';
     htmlData += '</tr>';

     $table.append(htmlData);

   });

   $('#submitData').on('click', function() {

     // pull data
     var name = $('#name').val().trim();
     var destination = $('#destination').val().trim();
     var startTime = $('#startTime').val().trim();
     var frequency = $('#frequency').val();

     // validate form
     if(name && destination && startTime && frequency) {

      //  console.log(moment(frequency, 'HH:mm'));
       //
      //  if(frequency.match(/^\d?\d:\d\d$/)) {

         var train = {
           name: name,
           destination: destination,
           startTime: startTime,
           frequency: frequency
         };

         fb.push(train);

      //  } else {
       //
      //    alert('Please use militar time, example format: 22:11');
      //  }





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
