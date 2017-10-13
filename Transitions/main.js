function onload() {
   var search = document.createElement("div");

   var sBar = document.createElement("input");
   sBar.classList.add('sBar');
   sBar.setAttribute("id", "input");

   var res = document.createElement("div");
   res.classList.add('results');
   res.setAttribute("id", "results");

   var poster = document.createElement("img")
   poster.setAttribute("id", "dispPoster");


   var mInfo = document.createElement("div");
   mInfo.classList.add("info");
   mInfo.setAttribute("id", "mInfo");

   search.appendChild(sBar);
   res.appendChild(poster);

   document.getElementById("container").appendChild(search);
   document.getElementById("container").appendChild(res);
   document.getElementById("infoCont").appendChild(mInfo);


}

function submitBtn() {
   var input = document.getElementById("input").value;

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var obj = JSON.parse(this.responseText);
         var poster = obj.results[0].poster_path;
         var movieID = obj.results[0].id;
         //alert(movieID);
         document.getElementById("mInfo").setAttribute("mID", movieID);
         document.getElementById("dispPoster").setAttribute("src", "http://image.tmdb.org/t/p/w342/" + poster);

      }
   };
   xhttp.open("GET", "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" + input + "&language=en-US&api_key=45b19b4b50f27078c87fd53b39383140", true);
   xhttp.send();
}

function display_overview() {
   var input = document.getElementById("input").value;

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

      }
   };
   xhttp.open("GET", "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" + input + "&language=en-US&api_key=45b19b4b50f27078c87fd53b39383140", true);
   xhttp.send();
}

function display_cast() {

}

function video_check() {
   var movieID = document.getElementById("mInfo").getAttribute("mID");

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var obj = JSON.parse(this.responseText);
         var key = obj.results[0].key;

         var video = document.createElement("video");

         video.classList.add("vid")
         video.setAttribute("id", "vids");
         video.setAttribute("width", "640");
         video.setAttribute("height", "360");
         video.setAttribute("type", "video/youtube");
         video.setAttribute("preload", "none");
         
         var vSource = document.createElement("Source");
         vSource.setAttribute("id", "vSrc");
         vSource.setAttribute("src", "https://www.youtube.com/watch?v=" + key)
         video.appendChild(vSource);
         document.getElementById("mInfo").appendChild(video);

         var player = new MediaElementPlayer('vids', {
		   pluginPath: "https://www.youtube.com/watch?v=" + key,
		   success: function(mediaElement, originalNode, instance) {
			      mediaElement.load();
		}
	});



      }
   };
   xhttp.open("GET", "http://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=45b19b4b50f27078c87fd53b39383140", true);
   xhttp.send();
}
