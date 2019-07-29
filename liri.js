require("dotenv").config();
var keys = require("./key.js");
var axios = require("axios");
var fs = require('fs');
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify)
var moment = require('moment')

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
    spotify.search({
        type: 'track',
        query: val
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0]);
    });
}
// val === search === query
function movieOMDB(val) {
    let queryUrl = "http://www.omdbapi.com/?t=" + val + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl)
        .then(function (response) {
            console.log(response.data)
        })
}

function getConcert(val) {
    console.log("Running Concert " + val)
    let query = "https://rest.bandsintown.com/artists/" + val + "/events?app_id=codingbootcamp"

    axios({
        method: "GET",
        url: query
    }).then(function (apiResponse) {
        for (var i = 0; i < apiResponse.data.length; i++) {
            var location = apiResponse.data[i].venue.city + ", ";
            location += apiResponse.data[i].venue.region;
            location += " (" + apiResponse.data[i].venue.country + ")";
            var showData = [
                "Venue:\t\t" + apiResponse.data[i].venue.name,
                "Location:\t" + location,
                // format date with moment
                "Date:\t\t" + apiResponse.data[i].datetime,moment().format('MMMM Do YYYY, h:mm:ss a'),
                "==========================================="
            ].join("\n");
            console.log(showData);
        }
        // outputConcertInfo(response);
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
    fs.readFile("./random.txt", "utf8", function (err, data) {
        if (err) throw err;
        const dataArr = data.split(",")
        for (var i = 0; i < dataArr.length; i++) {
            if (i % 2 === 0) {
                RunLiri(dataArr[i], dataArr[i + 1])
            }
        }
    })
}