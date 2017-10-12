function loadpage() {
   var search = document.createElement("div");
   var sBar = document.createElement("input");
   var submitBtn = document.createElement("button");
   var poster = document.createElement("img")

   search.classList.add('search');

   sBar.classList.add('sBar');
   sBar.setAttribute("id", "movie");

   submitBtn.classList.add('submitBtn');
   submitBtn.setAttribute("id", "submit");
   submitBtn.setAttribute("onclick", "submitBtn()");

   poster.classList.add("poster");
   poster.setAttribute("id", "dispPoster");

   search.appendChild(submitBtn);
   search.appendChild(sBar);
   search.appendChild(poster);
   document.getElementById("container").appendChild(search)

}

function submitBtn() {
   var movie = document.getElementById("movie").value;
   //var students = document.getElementById("students");
   var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.themoviedb.org/3/movie/550?api_key=45b19b4b50f27078c87fd53b39383140&query=" + movie + "&callback=?", true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			//var text = xhr.responseText;
			var poster = JSON.results[0].poster_path;
         var overview = JSON.results[0].overview;
         var releaseDate = JSON.results[0].release_date;
         var popRating = JSON.results[0].popularity;
         document.getElementById("dispPoster").setAttribute("src", "http://image.tmdb.org/t/p/w500/" + poster);

		}
	}
	xhr.send(null);

}

function dispOverview() {
   var info = document.createElement("div");
   info.classList.add("appear")
}
