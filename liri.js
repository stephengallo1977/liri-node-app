const axios = require("axios");

let searchTerm = "";
for (var i = 3; i < process.argv.length; i++) {
    // searchTerm = "" + "Lion" + " ";
    // searchTerm = "Lion " + "King" + " ";
    // searchTerm = "Lion King "
    searchTerm = searchTerm + process.argv[i] + " "
}
// "Lion King ".trim() === "Lion King"
searchTerm.trim();

let command = process.argv[2];
let searchVar = process.argv.slice(3).join(" ")
// if(command === 'movie-this'){
//     movieOMDB()
// } else if (command === 'spotify-this-song'){
//     spotifySong()
// }
RunLiri(command, searchVar)
RunLiri('movie-this', 'Jumanji')

function RunLiri(service, search) {
    switch (service) {
        case 'movie-this':
            return movieOMDB(search)
        case 'spotify-this-song':
            return spotifySong(search)
        case 'concert-this-band':
            return getConcert(search)
    }
}

function spotifySong(val) {
    console.log("Running Spotify " + val)

}

function movieOMDB(val) {
    console.log("Running OMDB " + val)

}

function getConcert(val) {
    console.log("Running Concert " + val)
    let query = "https://rest.bandsintown.com/artists/" + val + "/events?app_id=codingbootcamp"

    axios({
        method: "GET",
        url: query
    }).then(function (response) {
        console.log(response.data[0])
    })
}

function doWhatItSays() {
    console.log("Running DoWhatItSays")

}