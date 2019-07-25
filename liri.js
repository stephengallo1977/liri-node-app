require("dotenv").config();
var keys = require("./key.js");
var axios = require("axios");

var command = process.argv[2];
var query = process.argv.slice(3).join(" ");

RunLiri(command, query);

// RunLiri(comand, query)
function RunLiri(service, search) {
    // switch (command)
    switch (service) {
        case 'movie-this':
            // return movieOMDB(query)
            return movieOMDB(search)
        case 'spotify-this-song':
            return spotifySong(search)
        case 'concert-this-band':
            return getConcert(search)
        case 'do-what-it-says':
            return doWhatItSays();
    }
}
// val === search === query
function spotifySong(val) {
    console.log("Running Spotify " + val)

}
// val === search === query
function movieOMDB(val) {
    let queryUrl = "http://www.omdbapi.com/?t=" + val + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl)
        .then(function(response){
            console.log(response.data)
        })
}

function getConcert(val) {
    console.log("Running Concert " + val)
    let query = "https://rest.bandsintown.com/artists/" + val + "/events?app_id=codingbootcamp"

    axios({
        method: "GET",
        url: query
    }).then(function (response) {
        outputConcertInfo(response);
    })
}
function outputConcertInfo(apiResponse) {
    for (var i = 0; i < apiResponse.data.length; i++) {
        var location = apiResponse.data[i].venue.city + ", ";
        location += apiResponse.data[i].venue.region;
        location += " (" + apiResponse.data[i].venue.country + ")";
        var showData = [
            "Venue:\t\t" + apiResponse.data[i].venue.name,
            "Location:\t" + location,
            "Date:\t\t" + shortDate(apiResponse.data[i].datetime),
            "==========================================="
        ].join("\n");
        console.log(showData);
    }
}

function doWhatItSays() {
    console.log("Running DoWhatItSays")

}


// switch (command) {
//     case "concert-this":
//         var apiURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"
//         axiosGet(apiURL);
//         break;
//     default:
//         console.log("")
// }

// function axiosGet(url) {
//     axios
//         .get(url)
//         .then(function (response) {
//             displayEventInfo(response);
//         });
// }

// function displayEventInfo(resp) {
//     console.log(resp)
// }



// function shortDate(datetime) {
//     var sDate = datetime
//         .split("T", 1)
//         .toString()
//         .split("-");
//     return sDate[1] + "/" + sDate[2] + "/" + sDate[0];
// }
// switch (command){
// //bands in town
//     case "concert-this":  
//         searchForBandsInTown(searchTerm);
//         break;
// //spotify
//     case "spotify-this-song":  
//         spotifyThisSong(searchTerm);
//         break;
// // OMDB for movies

//     case "movie-this":  
//         movieThis(searchTerm);
//         break;
// //  read commands from a file and excute the commands above
//     case "do-what-it-says":  
//         doRandom();
//     break;
// }

// 


//   function searchForBandsInTown(artist) {
// var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
// axios.get(queryUrl).then(
//     function(response) {
//         if(response.data[0].venue !=  undefined) {
//             console.log("Event Veunue: " + response.data[0].venue.name);
//             console.log("Event Location: " + response.data[0].venue.city);
//             var eventDateTime = moment(response.data[0].datetime);
//             console.log("Event Date & Time: " + eventDateTime.format("dddd, MMMM Do YYYY"));
//         }




// function movieThis(movie) {
//     axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
//         function(response) {
//             //console.log(response.data);
//             if (response.data.Title != undefined) {
//                 console.log("Title: " + response.data.Title);
//                 console.log("Year: " + response.data.Year);
//                 console.log("imdbRating:: " + response.data.imdbRating);
//                 console.log("Title: " + response.data.Title);
//                 console.log("Country:: " + response.data.Country);
//                 console.log("Language:: " + response.data.Language);
//                 console.log("Plot: " + response.data.Plot);
//                 console.log("Actors: " + response.data.Actors);
//                 console.log("RottenTomatoes: " + response.data.tomatoRating);
//             } 
//             else {
//                 movieThis("Mr. Nobody");
//             }
//         }
//         // if response is empty call the api again with the "default" movie 
//     ).catch(function (error) {  
//         console.log(error);
//         console.log("No Results found. ");

// });
// }

// function doRandom() {
//     fs.readFile("random.txt", "utf8", function(error, data) {
//         var dataArr = data.split(",");
//         spotifyThisSong(dataArr[1])
//         // If the code experiences any errors it will log the error to the console.
//         if (error) {
//           return console.log(error);
//         }
//     });