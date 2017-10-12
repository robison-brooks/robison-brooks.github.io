function getCities() {
	var countries = document.getElementById("countries");
	var list = document.getElementById("cities");
	var file = countries.options[countries.selectedIndex].value;
	var cityArray = []

	var xhr = new XMLHttpRequest();
	xhr.open("GET", file, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var result = xhr.responseText;
			var data = result.split(/\r?\n/);

			// list.innerHTML = "";
			for (var i = 0; i < 4; i++) {
				data[i] = data[i].replace(/\s{2,}/, "*");
				var tr = document.createElement("tr")
				var td = document.createElement("td");
				var td1 = document.createElement("td");
				var d = data[i].split("*");
				td.innerHTML = d[0]
				td1.innerHTML = d[1];
				tr.appendChild(td);
				tr.appendChild(td1);
				list.appendChild(tr);
			}
		}
	}
	xhr.send(null);
}

function onLoadJSON() {

	var file = document.getElementById("fileName").value;
	var students = document.getElementById("students");

	var xhr = new XMLHttpRequest();
	xhr.open("GET", file, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var text = xhr.responseText;
			var data = JSON.parse(text).students;


			for (var i = 0; i < data.length; i++) {
				var s = data[i];
				var tr = document.createElement("tr");
				var td1 = document.createElement("td");
				var td2 = document.createElement("td");
				var td3 = document.createElement("td");
				var td4 = document.createElement("td");
				var td5 = document.createElement("td");

				td1.innerHTML = s.first;
				td2.innerHTML = s.last;
				td3.innerHTML = s.address.city + ", " +
									 s.address.state + " " + s.address.zip;
				td4.innerHTML = s.major;
				td5.innerHTML = s.gpa;

				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.appendChild(td5);

				students.appendChild(tr);

			}
		}
	}
	xhr.send(null);
}

function clearRowsStudents() {
	var table = document.getElementById("students");
	var rowCount = table.rows.length;
	if (rowCount > 0){
      for (var i = rowCount - 1; i > 0; i--) {
         table.deleteRow(i);
      }
	}
}

function clearRowsCities() {
	var table = document.getElementById("cities");
	var rowCount = table.rows.length;
	if (rowCount > 0){
      for (var i = rowCount - 1; i > 0; i--) {
         table.deleteRow(i);
      }
	}
}

function onLoadClick() {
	clearRowsStudents();
	onLoadJSON();
}

function onCityClick() {
	clearRowsCities();
	getCities();
}
