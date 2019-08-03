require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");

var spotifyAPI = new Spotify(keys.spotify);

// console.log(spotifyAPI);

var divider = "\n------------------------------------------------------------\n\n";

var apiType = process.argv[2];
var searchTerm = process.argv.slice(3).join(" ");


if (apiType == "movie-this") {
    axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
        function (response) {

            var movie = response.data;

            var movieDisplay = "Title: " + movie.Title + "\nGenre: " + movie.Genre + "\nDirector: " + movie.Director + "\nRating: " + movie.Rated + "\nRelease Date: " + movie.Released;

            fs.appendFile("log.txt", movieDisplay + divider, function(err) {
                if (err) throw err;
                console.log(movieDisplay);
              });
        }
    );
}
else if (apiType == "spotify-this-song") {
    spotifyAPI.search({ type: "track", query: searchTerm, limit: 20 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var resultArray = data.tracks.items;

        for (var i = 0; i < resultArray.length; i++) {
            var band = resultArray[i].album.artists[0].name;
            var song = resultArray[i].name;
            var album = resultArray[i].album.name;
            var songLink = resultArray[i].external_urls.spotify;

            var spotifyData = "Song Name: " + song + "\nBand: " + band + "\nAlbum: " + album + "\nSpotify Link: " + songLink;

            fs.appendFile("log.txt", spotifyData + divider, function(err) {
                if (err) throw err;
                console.log(spotifyData + "\n");
              });
        }
    });
}
else if (apiType == "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(function (response) {
        // console.log(response);

        var resultData = response.data;
        for (var i = 0; i < resultData.length; i++) {
            var date = resultData[i].datetime;
            var venueName = resultData[i].venue.name;
            var venueCity = resultData[i].venue.city;
            var venueState = resultData[i].venue.region;

            concertDisplay = "Date: " + date + "\nVenue: " + venueName + "\nLocation: " + venueCity + ", " + venueState;

            fs.appendFile("log.txt", concertDisplay + divider, function(err) {
                if (err) throw err;
                console.log(concertDisplay + "\n");
              });
        }
    })
}

