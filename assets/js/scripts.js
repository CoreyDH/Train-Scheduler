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

     var childData = snapshot.val();

     var nextArrival = getNextArrival(childData.startTime, childData.frequency);
     var timeRemaining = moment(nextArrival, 'MM/DD - hh:mm A').diff(moment(), 'minutes');

     console.log(timeRemaining);

     var $table = $('#schedule');

     var htmlData = '<tr>';
     htmlData += '<td>'+childData.name+'</td>';
     htmlData += '<td>'+childData.destination+'</td>';
     htmlData += '<td>'+childData.frequency+'</td>';
     htmlData += '<td>'+nextArrival+'</td>';
     htmlData += '<td>'+timeRemaining+'</td>';
     htmlData += '<td><span class="glyphicon glyphicon-remove removeSchedule" data-key="'+snapshot.key+'"></span></td>';
     htmlData += '</tr>';

     $table.append(htmlData);

   });

   function getNextArrival(startTime, frequency) {

     var currentTime = moment().format('HH:mm');

     var currentArr = currentTime.split(':').map(function(val) {
       return parseInt(val);
     });

     var startArr = startTime.split(':').map(function(val) {
       return parseInt(val);
     });

      var startTotalMin = startArr[0]*60 + startArr[1];
      var currentTotalMin = currentArr[0]*60 + currentArr[1];
      var minDiff =  currentTotalMin > startTotalMin ? currentTotalMin - startTotalMin : startTotalMin - currentTotalMin;

      return moment(startTime, 'HH:mm').add(frequency > minDiff ? frequency : frequency*Math.ceil(minDiff / frequency), 'minutes').format('MM/DD - hh:mm A');

   }

   $('#submitData').on('click', function() {

     // pull data
     var name = $('#name').val().trim();
     var destination = $('#destination').val().trim();
     var startTime = $('#startTime').val().trim();
     var frequency = parseInt($('#frequency').val());

     // validate form
     if(name && destination && startTime && frequency) {

       console.log(startTime);

       if(startTime.match(/^([01]\d|2[0-3]):?([0-5]\d)$/)) {

         var train = {
           name: name,
           destination: destination,
           startTime: startTime,
           frequency: frequency
         };

         fb.push(train);
         // clear forms

         $('#name').val('');
         $('#destination').val('');
         $('#startTime').val('');
         $('#frequency').val('');

       } else {

         alert('Please use military time, example format: 03:11');
       }

     } else {

       alert('Please complete all form fields');

     }

   });

   $('#schedule').on('click', '.removeSchedule', function(event) {

     $this = $(event.target);
     var key = $this.data('key');
     fb.child(key).remove();

     $this.closest('tr').remove();

   });

  });
})(jQuery);
