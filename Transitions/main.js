function onload() {
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
   submitBtn.value = "Search";

   poster.classList.add("poster");
   poster.setAttribute("id", "dispPoster");

   search.appendChild(sBar);
   search.appendChild(poster);
   search.appendChild(submitBtn);

   document.getElementById("container").appendChild(search);

}

function submitBtn() {
   // var movie =
   alert(document.getElementById("movie").value);

   //var students = document.getElementById("students");
   // var xhr = new XMLHttpRequest();
	// xhr.open("GET", "https://api.themoviedb.org/3/movie/550?api_key=45b19b4b50f27078c87fd53b39383140&query=" + movie + "&callback=?", true);
	// xhr.onreadystatechange = function () {
	// 	if (xhr.readyState == 4 && xhr.status == 200) {
	// 		var results = xhr.responseText;
   //       var obj = JSON.parse(results);
	// 		var poster = JSON.obj[0].poster_path;
   //       var overview = JSON.obj[0].overview;
   //       var releaseDate = JSON.obj[0].release_date;
   //       var popRating = JSON.obj[0].popularity;
   //       document.getElementById("dispPoster").setAttribute("src", "http://image.tmdb.org/t/p/w500/" + poster);
   //
	// 	}
	// }
	// xhr.send();


   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         document.getElementById("dispPoster").innerHTML = this.responseText;
         alert(this.responseText);
         var obj = JSON.parse(this.responseText);
         alert(obj.results[0].title);
      }
   };
  xhttp.open("GET", "https://api.themoviedb.org/3/movie/550?api_key=45b19b4b50f27078c87fd53b39383140&query=" + movie + "&callback=test", true);
  xhttp.send();
}

function dispOverview() {
   var info = document.createElement("div");
   info.classList.add("appear")
}
