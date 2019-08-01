var spotify = require("node-spotify-api");
var axios = require("axios");

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

}
else if(apiType == "bands"){

}

