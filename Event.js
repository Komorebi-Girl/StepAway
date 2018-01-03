
    var positions=[];


    var apikey = "nnfhgT4zJPgWPtTG";
    var radius = 5;
    var pagenum = 1;
    var totalEvents = 0;
    var modal = document.getElementById('myModal');
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    $(document).ready(function() {
      var Latitude = sessionStorage.getItem("Latitude");
      var Longitude = sessionStorage.getItem("Longitude");
      $("#idEventsList").empty(); 
      $("#idButtons").empty();
      var eventdate = "Today";
      var queryURL = "http://api.eventful.com/json/events/search?app_key=" + apikey + "&date=" + eventdate + 
       "&where=" + Latitude + "," + Longitude + "&within=" + radius;
      sessionStorage.clear();
      updateEventsObj(queryURL);
    });  
    $("#submitButton").on("click", function() { 
      
      pagenum = 1;
      $("#idEventsList").empty(); 
      $("#idButtons").empty();
      var eventdate = $("#date-input").val().trim();
      var location = $("#location-input").val().trim();
      var queryURL = "http://api.eventful.com/json/events/search?app_key=" + apikey + "&date=" + eventdate + 
       "&location=" + location + "&within=" + radius;
       console.log(queryURL);
      updateEventsObj(queryURL);
    });
    $(document).on("click", "#NextButton", function(event) { 
    
     pagenum += 1;
      $("#idEventsList").empty(); 
      $("#idButtons").empty();
      var eventdate = $("#date-input").val().trim();
      var location = $("#location-input").val().trim();
      var queryURL = "http://api.eventful.com/json/events/search?app_key=" + apikey + "&date=" + eventdate + 
      "&location=" + location + "&page_number=" + pagenum + "&within=" + radius;
      updateEventsObj(queryURL);
    });
    $(document).on("click", "#PreviousButton", function(event) { 
    
      pagenum -= 1;
      $("#idEventsList").empty(); 
      $("#idButtons").empty();
      var eventdate = $("#date-input").val().trim();
      var location = $("#location-input").val().trim();
      var queryURL = "http://api.eventful.com/json/events/search?app_key=" + apikey + "&date=" + eventdate + 
      "&location=" + location + "&page_number=" + pagenum + "&within=" + radius;
      updateEventsObj(queryURL);
    }); 
    $(document).on("click", ".infoClick", function(event) { 
      $(".modal-content").empty();
    
      var eventClicked = $(this).attr("data-value");
      var eventClickedArr = eventClicked.split("~");
      modal.style.display = "block";

      var eventsDivModal = $("<div class='itemModal'>");
      var titleModal = $("<h4>").text(eventClickedArr[0]);
      eventsDivModal.append(titleModal);

      var venuenameModal = $("<p>").text("Venue: " + eventClickedArr[1]);
      eventsDivModal.append(venuenameModal);

      var venueaddressModal = $("<p>").text("Address: " + eventClickedArr[2]);
      eventsDivModal.append(venueaddressModal);

      var cityModal = $("<p>").text(eventClickedArr[3] + ", " + eventClickedArr[4]);
      eventsDivModal.append(cityModal);
      eventsDivModal.prepend("<span class='close'>&times;</span>")

    $(".modal-content").append(eventsDivModal);
    
  
    }); 
    $(document).on("click", ".close", function(event) {
    modal.style.display = "none";
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


          // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
    var labels = '123456789';
    var labelIndex = 0;

    var map, infoWindow, Geocoder;
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 10, 
      });
        //var circle= Circle({radius:8050,center:{lat: -34.397, lng: 150.644}})
       // map.fitBounds(circle.getBounds())
      infoWindow = new google.maps.InfoWindow;

           // infoWindow.setPosition(pos);
           // infoWindow.setContent('Location found.');
      infoWindow.open(map);
            //var center=positions[0][0],positions[0][1];
 /*     $("#submitButton").on("click", function() {
        Geocoder= google.maps.Geocoder,{
        

        //Geocoder.geocode()
        }
 
        
      });*/

      if(Number(positions[0]!==undefined)){
        map.setCenter({lat: Number(positions[0][0]), lng: Number(positions[0][1])});
          
        map
        console.log(positions);
        var search = "=";
        var marker, i;
            
        for(i=0;i < positions.length;i++){
          queried = positions[i][0]+","+positions[i][1]+"|";
          search=search+queried;

          marker= new google.maps.Marker({
            position: new google.maps.LatLng(positions[i][0],positions[i][1]),
            label: labels[labelIndex++ % labels.length],
            map:map
          })
              //var infowindow = new google.maps.InfoWindow({
              //content: i
              //});

          console.log(marker);
          
        }

        console.log(search);
      };
/*            var loc = pos.lat+","+pos.lng;
            // Slice off the last unnecessary pipe 
            var final = search.slice(0,-1);
            // Build the query
            var queryUrL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+loc+"&destinations"+final+"&key=AIzaSyDjlTzVQx8XWIbdCeoNtgeGH0WCWMuigXs";
            $.ajax({
               url: proxy+queryUrL,
               method: 'GET'
            }).done(function(response) {
             console.log(response.rows[0].elements);

              }); */
      }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////











  function updateEventsObj(queryURL) {
    $.ajax({
      url: "https://cors-anywhere.herokuapp.com/" + queryURL,
      method: 'GET'
    }).done(function(response) {
      var results = JSON.parse(response);
      totalEvents = parseInt(results.total_items);
      // alert("totalEvents: " + totalEvents);
      if (pagenum == 1) {
          if (totalEvents >= 10)
            index = 10;
          else
            index = totalEvents;
      }
      if (pagenum > 1) {
          if ((totalEvents / (pagenum * 10)) >= 1)
              index = 10;
          else 
              index = totalEvents % 10;
      }  





      for (var i = 0; i < index; i++) {
          var places=[results.events.event[i].latitude,results.events.event[i].longitude];
          positions.push(places);

          console.log(places);

          var eventsDiv = $("<ul class='collection'>");
          var litag = $("<li class='collection-item avatar'>");
          litag.append($("<img src='' alt='' class='circle'>"));
          var spantag = $("<span class='title'>");
          EventNum = (pagenum * 10) + i + 1 - 10;
          var title = EventNum + ". " + results.events.event[i].title;
          spantag.append(title);
          litag.append(spantag);
          var venuetag = $("<p>");
          var venuename = "Venue: " + results.events.event[i].venue_name;
          venuetag.append(venuename);
          venuetag.append($("<br>"));
          var venueaddress = "Address: " + results.events.event[i].venue_address;
          venuetag.append(venueaddress);
          venuetag.append($("<br>"));
          var city = results.events.event[i].city_name + ", " + results.events.event[i].region_abbr;
          venuetag.append(city); 
          litag.append(venuetag);
          var atag = $("<a href='#!' class='secondary-content'>");
          var itag = $("<i class='material-icons infoClick'>info</i>");
          itag.attr("data-value", results.events.event[i].title + "~" +
                                       results.events.event[i].venue_name + "~" +
                                       results.events.event[i].venue_address + "~" +
                                       results.events.event[i].city_name + "~" +
                                       results.events.event[i].region_abbr) ;  
          atag.append(itag);
          var atagclose = $("</a>");
          atag.append(atagclose);
          var litagclose = $("</li>");
          atag.append(litagclose);
          litag.append(atag);
          
          eventsDiv.append(litag);
          
          $("#idEventsList").append(eventsDiv);
      }
      if (pagenum > 1) {
           var buttonsDiv = $("<br><div class='buttonsDiv'>");
           var prevbutton = $("<button name='previous' id='PreviousButton'>< Previous</button>");
           buttonsDiv.append(prevbutton);
           
           if ((totalEvents / (pagenum * 10)) >= 1) {
               var nextbutton = $("<button name='next' id='NextButton'>Next ></button>");
               buttonsDiv.append(nextbutton);
           } 
           $("#idButtons").append(buttonsDiv);
       } 
       else {
           if (totalEvents > 10)  {
               var buttonsDiv = $("<br><div class='buttonsDiv'>");
               var nextbutton = $("<button name='next' id='NextButton'>Next ></button>");
               buttonsDiv.append(nextbutton);
               $("#idButtons").append(buttonsDiv);
           } 
       }
         initMap();  
   }); 
  }





           


  
  