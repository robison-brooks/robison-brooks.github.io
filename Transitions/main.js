function onload() {
   // document.getElementById("search").style.display = "initial";
   document.getElementById("new").style.display = "none";
   document.getElementById("btn-group").style.display = "none";
   // var search = document.createElement("div");

   // var sBar = document.createElement("input");
   // sBar.classList.add('sBar');
   // sBar.setAttribute("id", "input");
   // search.appendChild(sBar);

   var res = document.getElementById("results");
   res.classList.add('results');
   res.setAttribute("id", "results");

   var vidWrapper = document.createElement("div");
   vidWrapper.setAttribute("id", "vidWrapper");
   vidWrapper.style.display = "none";

   var overview = document.createElement("p");
   overview.classList.add("overview");
   overview.setAttribute("id", "overview");
   overview.style.display = "none";

   var poster = document.createElement("img")
   poster.setAttribute("id", "dispPoster");
   poster.style.display = "none";

   var castTable = document.createElement("table");
   castTable.setAttribute("id", "cTable");
   castTable.classList.add("cTable");
   castTable.style.display = "none";

   var mInfo = document.createElement("div");
   mInfo.classList.add("info");
   mInfo.setAttribute("id", "mInfo");

   res.appendChild(poster);
   document.body.appendChild(vidWrapper);
   res.appendChild(overview);
   res.appendChild(castTable);

   // document.getElementById("container").appendChild(search);
   // document.getElementById("results").appendChild(res);
   document.getElementById("btn-group").appendChild(mInfo);


}

function submitBtn() {
   var input = document.getElementById("input").value;
   document.getElementById("movieTitle").innerHTML = input.charAt(0).toUpperCase() + input.slice(1);

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var obj = JSON.parse(this.responseText);
         var posterPath = obj.results[0].poster_path;
         var movieID = obj.results[0].id;
         var backdrop = "http://image.tmdb.org/t/p/w1280" + obj.results[0].backdrop_path;

         document.getElementById("mInfo").setAttribute("mID", movieID);

         var poster = document.getElementById("dispPoster");
         poster.setAttribute("src", "http://image.tmdb.org/t/p/w342/" + posterPath);
         poster.style.display = "block";
         poster.style.margin = "auto";
         document.getElementById("results").appendChild(poster);

         document.body.style.backgroundImage = "url(" + backdrop + ")";
      }
   };
   xhttp.open("GET", "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" + input + "&language=en-US&api_key=45b19b4b50f27078c87fd53b39383140", true);
   xhttp.send();

   document.getElementById("search").style.display = "none";
   document.getElementById("input").style.display = "none";
   document.getElementById("new").style.display = "initial";
   document.getElementById("btn-group").style.display = "";
}

function display_poster() {
   if (document.getElementById("vidWrapper")) {
      document.getElementById("vidWrapper").style.display = "none";
   }
   if (document.getElementById("overview")) {
      document.getElementById("overview").style.display = "none";
   }
   if (document.getElementById("cTable")) {
      document.getElementById("cTable").style.display = "none";
   }
   if (document.getElementById("vids")) {
      var video = document.getElementById("vids");
      var vWrap = document.getElementById("vidWrapper");
      video.pause();
      while (vWrap.firstChild) {
         vWrap.removeChild(vWrap.firstChild);
      }
   }

   document.getElementById("dispPoster").style.display = "block";
}

function display_overview() {
   document.getElementById("overview").style.display = "initial";

   if (document.getElementById("vidWrapper")) {
      document.getElementById("vidWrapper").style.display = "none";
   }
   if (document.getElementById("dispPoster")) {
      document.getElementById("dispPoster").style.display = "none";
   }
   if (document.getElementById("cTable")) {
      document.getElementById("cTable").style.display = "none";
   }
   if (document.getElementById("vids")) {
      var video = document.getElementById("vids");
      var vWrap = document.getElementById("vidWrapper");
      video.pause();
      while (vWrap.firstChild) {
         vWrap.removeChild(vWrap.firstChild);
      }
   }

   var input = document.getElementById("input").value;

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var obj = JSON.parse(this.responseText);
         var overviewTxt = obj.results[0].overview;

         var overview = document.getElementById("overview");
         overview.innerHTML = overviewTxt;
         overview.style.display = "initial";
         overview.style.color = "white";

         document.getElementById("results").appendChild(overview);
      }
   };
   xhttp.open("GET", "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=" + input + "&language=en-US&api_key=45b19b4b50f27078c87fd53b39383140", true);
   xhttp.send();
}

function display_cast() {
   var movieID = document.getElementById("mInfo").getAttribute("mID");

   if (document.getElementById("vidWrapper")) {
      document.getElementById("vidWrapper").style.display = "none";
   }
   if (document.getElementById("dispPoster")) {
      document.getElementById("dispPoster").style.display = "none";
   }
   if (document.getElementById("overview")) {
      document.getElementById("overview").style.display = "none";
   }
   if (document.getElementById("vids")) {
      var video = document.getElementById("vids");
      var vWrap = document.getElementById("vidWrapper");
      video.pause();
      while (vWrap.firstChild) {
         vWrap.removeChild(vWrap.firstChild);
      }
   }

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var obj = JSON.parse(this.responseText);
         var castTable = document.getElementById("cTable");
         castTable.style.display = "initial";

         var headerBlank = document.createElement("th");
         headerBlank.innerHTML = "";
         castTable.appendChild(headerBlank);

         var headerActor = document.createElement("th");
         headerActor.innerHTML = "Actor Name";
         castTable.appendChild(headerActor);

         var headerRole = document.createElement("th");
         headerRole.innerHTML = "Character";
         castTable.appendChild(headerRole);

         for(i = 0; i < obj.cast.length; i++) {
            var tRow = document.createElement("tr");

            var role = "\"" + obj.cast[i].character + "\"";
            var actorName = obj.cast[i].name;

            var picData = document.createElement("td");
            var picImg = document.createElement("img");
            var nameData = document.createElement("td");
            var roleData = document.createElement("td");

            if(obj.cast[i].profile_path != null) {
               var picturePath = "http://image.tmdb.org/t/p/w45" + obj.cast[i].profile_path;
               picImg.setAttribute("src", picturePath);
               picData.appendChild(picImg);
               tRow.appendChild(picData);
            } else {
               picData.innerHTML = "No Picture";
               tRow.appendChild(picData);
            }

            nameData.innerHTML = actorName;
            roleData.innerHTML = role;

            tRow.appendChild(nameData);
            tRow.appendChild(roleData);

            castTable.appendChild(tRow);
         }

         document.getElementById("results").appendChild(castTable);
      }
   };
   xhttp.open("GET", "https://api.themoviedb.org/3/movie/" + movieID + "/credits?api_key=45b19b4b50f27078c87fd53b39383140", true);
   xhttp.send();
}

function video_check() {
   var movieID = document.getElementById("mInfo").getAttribute("mID");
   //document.getElementById("dispPoster").style.display = "none";

   if (document.getElementById("dispPoster")) {
      document.getElementById("dispPoster").style.display = "none";
   }
   if (document.getElementById("overview")) {
      document.getElementById("overview").style.display = "none";
   }
   if (document.getElementById("cTable")) {
      document.getElementById("cTable").style.display = "none";
   }

   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var obj = JSON.parse(this.responseText);
         var key = obj.results[0].key;

         var vidWrapper = document.getElementById("vidWrapper");
         vidWrapper.style.display = "";

         var video = document.createElement("video");

         video.classList.add("vid");
         video.setAttribute("id", "vids");
         video.setAttribute("width", "640");
         video.setAttribute("height", "360");
         video.setAttribute("type", "video/youtube");
         video.setAttribute("autoplay", "autoplay");

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
