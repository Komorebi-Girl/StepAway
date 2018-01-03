let eventTitle ="Detroit Red Wings at New Jersey Devils";
let city = "Newark";
let venue = "Prudential Center"


//name,venue,city - replace

//Detroit Red Wings at New Jersey Devils - use as test for working

//stubhub territory
let stubToken = "Bearer 3a694bd9-46d5-3f1a-9589-053adb778c0f";
let stubhubURL= "https://api.stubhub.com/search/catalog/events/v3?fieldlist=ticketinfo,venue,name&parking=false&q="+name+"&city="+city;

//stubhub AJAX GET request
$.ajax({
	url: stubhubURL,
  method: "GET",
  headers: {"Authorization": stubToken}
}).done(function(response) {

	//stubhub variables
	let stubCurrency = "";
	let stubMin = 0;
	let stubMax = 0;
	let stubLink = "";

	//sets response to stubData and makes sure something is returned
	let stubData = response.events;
	console.log(stubData);

	if (stubData.length >= 1){

		//venue URL
		stubLink = 'https://www.stubhub.com/' + stubData[0].venue.webURI;
		console.log('StubURL:' + stubLink);

		//sets currency
		stubCurrency = stubData[0].ticketInfo.minPriceWithCurrencyCode.currency;
	
		//sets min value
		stubMin = stubData[0].ticketInfo.minPriceWithCurrencyCode.amount;
		console.log('Stub Min: ' + stubMin + stubCurrency);

		//sets max value
		stubMax = stubData[0].ticketInfo.maxPriceWithCurrencyCode.amount;
		console.log('Stub Max: ' + stubMax + stubCurrency);

  	let nf = new Intl.NumberFormat(["en-US"], {  
    	style: "currency",  
    	currency: stubCurrency,  
    	currencyDisplay: "symbol",  
    	maximumFractionDigit: 2,
    	minimumFractionDigits: 2  
    })
    
  	//reformats min price into $ddd.cc format
    let stubMinFormatted = nf.format(stubMin);
  	console.log('Stub Min: ' + stubMinFormatted);

		//appends button to card
		let stubButton = '<a href='+'"'+stubLink+'"'+'> As low as: ' + stubMinFormatted + '</a>';
		$("#stubdump").append(stubButton);

	}else{

		//lets user know that no tickets were found
		console.log("No events found on Stubhub");
		let stubButton = '<a href="https://www.stubhub.com">Sorry, we could not find tickets.</a>'
		$("#stubdump").append(stubButton);

	}
});


//SeatGeeek territory

let seatgeekURL = "https://api.seatgeek.com/2/venues?client_id=NzUzODA4OXwxNTEzODc4OTMwLjk3&city="+city+"&q="+venue;

//seatgeek AJAX GET request
$.ajax({
	url: seatgeekURL,
  method: "GET"
}).done(function(response) {

	//seatgeek variables
	let seatVenueName = "";
	let seatVenueURL = "";

	//sets response to seatData and makes sure something is returned
	let seatData = response.venues;
	console.log(seatData);

	if(seatData.length >= 1){
		//sets venue name
		seatVenueName = seatData[0].name;
		console.log("Venue Name: " + seatVenueName);

		//sets venue ticket url
		seatVenueURL = seatData[0].url;
		console.log("Ticket URL: " + seatVenueURL);

		//appends the button to card
		let seatButton = "<a href="+ seatVenueURL + ">"+seatVenueName+"</a>"
		$("#seatgeekdump").append(seatButton);

	}else{

		//lets user know that no tickets were found
		console.log("No events found on SeatGeek");
		let seatButton = '<a href="https://www.seatgeek.com">Sorry, we could not find tickets</a>'
		$("#seatgeekdump").append(seatButton);

	}
});