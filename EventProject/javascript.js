let eventTitle ="New Jersey Devils vs. Chicago Blackhawks";
let city = "Newark";
let venue = "Prudential Center"
let date = "";


let currency = "";
let stubMin = 0;
let stubMax = 0;
let stubAvg = 0;
let stubLink = "";

let seatMin = 0;
let seatMax = 0;
let seatAvg = 0;
let seatLink = "";


//stubhub Territory
let stubToken = "Bearer 3a694bd9-46d5-3f1a-9589-053adb778c0f";
let stubhubURL= "https://api.stubhub.com/search/catalog/events/v3?fieldlist=ticketinfo,venue,name&parking=false&q="+eventTitle+"&city="+city;

//stubhub AJAX GET request
$.ajax({
	url: stubhubURL,
  method: "GET",
  headers: {"Authorization": stubToken}
}).done(function(response) {

	//sets response to stubData and makes sure something is returned
	let stubData = response.events;
	console.log(stubData);

	//sets currency
	currency =" " +stubData[0].ticketInfo.minPriceWithCurrencyCode.currency;
	
	//sets min value
	stubMin = stubData[0].ticketInfo.minPriceWithCurrencyCode.amount;
	console.log("Stub Min: "+stubMin+currency);

	//sets max value
	stubMax = stubData[0].ticketInfo.maxPriceWithCurrencyCode.amount;
	console.log("Stub Max: "+stubMax+currency);


});





//SeatGeeek Territory


let seatgeekURL = "https://api.seatgeek.com/2/venues?client_id=NzUzODA4OXwxNTEzODc4OTMwLjk3&city="+city+"&q="+venue;



//seatgeek AJAX GET request
$.ajax({
	url: seatgeekURL,
  method: "GET"
}).done(function(response) {
	let seatData = response.venues;
	console.log(seatData);
});
