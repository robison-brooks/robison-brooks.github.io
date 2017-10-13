function onload() {
   document.getElementById("reloadBtn").style.display = "initial";
   document.getElementById("new").style.display = "none";
   var search = document.createElement("div");

   var sBar = document.createElement("input");
   sBar.classList.add('sBar');
   sBar.setAttribute("id", "input");
   search.appendChild(sBar);

   var res = document.createElement("div");
   res.classList.add('results');
   res.setAttribute("id", "results");

   var vidWrapper = document.createElement("div");
   vidWrapper.setAttribute("id", "vidWrapper");
   vidWrapper.style.display = "none";

   var video = document.createElement("video");
   video.classList.add("vid");
   video.setAttribute("id", "vids");
   video.setAttribute("width", "640");
   video.setAttribute("height", "360");
   video.setAttribute("type", "video/youtube");
   video.setAttribute("autoplay", "autoplay");
   vidWrapper.appendChild(video);

   var overview = document.createElement("p");
   overview.classList.add("overview");
   overview.setAttribute("id", "overview");
   overview.style.display = "none";

   var poster = document.createElement("img")
   poster.setAttribute("id", "dispPoster");
   poster.style.display = "none";

   var mInfo = document.createElement("div");
   mInfo.classList.add("info");
   mInfo.setAttribute("id", "mInfo");

   res.appendChild(poster);
   res.appendChild(vidWrapper);
   res.appendChild(overview);

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
         var posterPath = obj.results[0].poster_path;
         var movieID = obj.results[0].id;
         //alert(movieID);
         document.getElementById("mInfo").setAttribute("mID", movieID);

         var poster = document.getElementById("dispPoster");
         poster.setAttribute("src", "http://image.tmdb.org/t/p/w342/" + posterPath);
         poster.style.display = "initial";
         document.getElementById("results").appendChild(poster);
      }
   };
   xhttp.open("GET", "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" + input + "&language=en-US&api_key=45b19b4b50f27078c87fd53b39383140", true);
   xhttp.send();

   document.getElementById("reloadBtn").style.display = "none";
   document.getElementById("new").style.display = "initial";
}

function display_poster() {
   if (document.getElementById("vidWrapper").style.display == "initial") {
      document.getElementById("vidWrapper").style.display = "none";
   }
   if (document.getElementById("overview").style.display == "initial") {
      document.getElementById("overview").style.display = "none";
   }
   document.getElementById("dispPoster").style.display = "initial";
}

function display_overview() {
   document.getElementById("overview").style.display = "initial";
   var input = document.getElementById("input").value;

   if (document.getElementById("dispPoster").style.display == "initial") {
      document.getElementById("dispPoster").style.display = "none";
   }
   if (document.getElementById("vidWrapper").style.display == "initial") {
      document.getElementById("vidWrapper").style.display = "none";
   }

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var obj = JSON.parse(this.responseText);
         var overviewTxt = obj.results[0].overview;

         var overview = document.getElementById("overview");
         overview.innerHTML = overviewTxt;
         overview.style.display = "initial";

         document.getElementById("results").appendChild(overview);
      }
   };
   xhttp.open("GET", "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" + input + "&language=en-US&api_key=45b19b4b50f27078c87fd53b39383140", true);
   xhttp.send();
}

function display_cast() {

}

function video_check() {
   var movieID = document.getElementById("mInfo").getAttribute("mID");
   document.getElementById("dispPoster").style.display = "none";

   if (document.getElementById("dispPoster").style.display == "initial") {
      document.getElementById("dispPoster").style.display = "none";
   }
   if (document.getElementById("overview").style.display == "initial") {
      document.getElementById("overview").style.display = "none";
   }

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var obj = JSON.parse(this.responseText);
         var key = obj.results[0].key;

         var vidWrapper = document.getElementById("vidWrapper");
         vidWrapper.style.display = "initial";

         // var video = document.createElement("video");

         // video.classList.add("vid");
         // video.setAttribute("id", "vids");
         // video.setAttribute("width", "640");
         // video.setAttribute("height", "360");
         // video.setAttribute("type", "video/youtube");
         // video.setAttribute("autoplay", "autoplay");
         var video = document.getElementById("vids");
         var vSource = document.createElement("Source");
         vSource.setAttribute("id", "vSrc");
         vSource.setAttribute("src", "https://www.youtube.com/watch?v=" + key)
         video.appendChild(vSource);

         vidWrapper.appendChild(video);
         document.getElementById("results").appendChild(vidWrapper);

         var player = new MediaElementPlayer('vids', {
            pluginPath: vSource.getAttribute("src"),
            success: function(mediaElement, originalNode, instance) {
               mediaElement.load();
            }
         });
      }
   };
   xhttp.open("GET", "https://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=45b19b4b50f27078c87fd53b39383140", true);
   xhttp.send();
}
