require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");

var spotifyAPI = new Spotify(keys.spotify);

// console.log(spotifyAPI);

var apiType = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");


if(apiType == "omdb"){
    axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
        function(response){

            var movie = response.data;

            console.log("\nTitle: " + movie.Title + "\nGenre: " + movie.Genre + "\nDirector: " + movie.Director + "\nRating: " + movie.Rated + "\nRelease Date: " + movie.Released);
        }
    );
}
else if(apiType == "spotify"){
    spotifyAPI.search({type: "track", query: searchTerm, limit: 20}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var resultArray = data.tracks.items;

        for(var i = 0; i < resultArray.length; i++){
            var band = resultArray[i].album.artists[0].name;
            var song = resultArray[i].name;
            var album = resultArray[i].album.name;
            var songLink = resultArray[i].external_urls.spotify;

            console.log("\nSong Name: " + song + "\nBand: " + band + "\nAlbum: " + album + "\nSpotify Link: " + songLink);
        }
      });
}
else if(apiType == "bands"){
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "?app_id=codingbootcamp").then(function(response){
        console.log(response);
    })
}

