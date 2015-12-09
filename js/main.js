var lastcommit = {
	name: [],
	location: [],
	date: [],
	official: []
}

var lines = {
	name: [],
	location: [],
	date: [],
	official: []
}

function ShowSelection() {
	var textComponent = document.getElementById('inputTextToSave');
	var selectedText;
	var startPos = textComponent.selectionStart;
	var endPos = textComponent.selectionEnd;
	selectedText = textComponent.value.substring(startPos, endPos)

	console.log(selectedText);
	//alert("You selected: " + selectedText);
}

function saveTextAsFile() {
	var restore = document.getElementById("inputTextToSave").innerHTML;
	//console.log(restore);
	$('.name').replaceWith("<name>" + $('.name').html() + "</name>");
	$('.location').replaceWith("<location>" + $('.location').html() + "</location>");
	$('.date').replaceWith("<date>" + $('.date').html() + "</date>");
	$('.official').replaceWith("<official>" + $('.official').html() + "</official>");

	var textToWrite = document.getElementById("inputTextToSave").innerHTML;
	var textFileAsBlob = new Blob([textToWrite], {
		type: 'text/plain'
	});
	var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null) {
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	} else {
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();

	$('name').replaceWith("<span class=\"name\">" + $('name').html() + "</span>");
	$('location').replaceWith("<span class=\"location\">" + $('location').html() + "</span>");
	$('date').replaceWith("<span class=\"date\">" + $('date').html() + "</span>");
	$('official').replaceWith("<span class=\"official\">" + $('official').html() + "</span>");
}

function destroyClickedElement(event) {
	document.body.removeChild(event.target);
}

function loadFileAsText() {
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		$("#inputTextToSave").text(textFromFileLoaded.toString());

	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

$('#name').bind('input propertychange', function() {
	var str = document.getElementById('name');
	var compareRemove = lastcommit.name.slice();

	if (str.value[str.value.length - 1] === "\n") {
		str.value = str.value.substring(0, str.value.length - 1);
	} else {

	}

	str.value = str.value + '\n';
	lines.name = $('#name').val().split(/\n/);

	while (lines.name.indexOf("") > -1) {
		var index = lines.name.indexOf("");
		lines.name.splice(index, 1);
	}

	var compareAdd = lines.name.slice();

	if (lastcommit.name.length > lines.name.length) {
		console.log("remove!");
		for (var i = 0; i < lines.name.length; i++) {
			var findIndex1 = compareRemove.indexOf(lines.name[i]);
			compareRemove.splice(findIndex1, 1);
		}

		var strRemove = compareRemove[0];

		$("#inputTextToSave").jmRemoveHighlight({
			"element": "span",
			"className": "name"
		}, strRemove);
	}

	lastcommit.name = lines.name.slice();

	if (compareRemove.length < compareAdd.length) {
		console.log("add!");
		for (var i = 0; i < compareRemove.length; i++) {
			console.log(compareAdd);
			if (compareRemove.length == 0) {

			} else {
				var findIndex2 = compareAdd.indexOf(compareRemove[i]);
				compareAdd.splice(findIndex2, 1);
			}
		}
		console.log(compareAdd);
		var strAdd = compareAdd[0];

		$('#inputTextToSave').jmHighlight(strAdd, {
			"className": "name",
		});
	}
	$('#name').scrollTop($('#name').height());
});

$('#location').bind('input propertychange', function() {
	var str = document.getElementById('location');
	var compareRemove = lastcommit.location.slice();

	if (str.value[str.value.length - 1] === "\n") {
		str.value = str.value.substring(0, str.value.length - 1);
	} else {

	}

	str.value = str.value + '\n';
	lines.location = $('#location').val().split(/\n/);

	while (lines.location.indexOf("") > -1) {
		var index = lines.location.indexOf("");
		lines.location.splice(index, 1);
	}

	var compareAdd = lines.location.slice();

	if (lastcommit.location.length > lines.location.length) {
		console.log("remove!");
		for (var i = 0; i < lines.location.length; i++) {
			var findIndex1 = compareRemove.indexOf(lines.location[i]);
			compareRemove.splice(findIndex1, 1);
		}

		var strRemove = compareRemove[0];

		$("#inputTextToSave").jmRemoveHighlight({
			"element": "span",
			"className": "location"
		}, strRemove);
	}

	lastcommit.location = lines.location.slice();

	if (compareRemove.length < compareAdd.length) {
		console.log("add!");
		for (var i = 0; i < compareRemove.length; i++) {
			console.log(compareAdd);
			if (compareRemove.length == 0) {

			} else {
				var findIndex2 = compareAdd.indexOf(compareRemove[i]);
				compareAdd.splice(findIndex2, 1);
			}
		}
		console.log(compareAdd);
		var strAdd = compareAdd[0];

		$('#inputTextToSave').jmHighlight(strAdd, {
			"className": "location",
		});
	}
	$('#location').scrollTop($('#location').height());
	// console.log(ToLabel.location);
});

$('#date').bind('input propertychange', function() {
	var str = document.getElementById('date');
	var compareRemove = lastcommit.date.slice();

	if (str.value[str.value.length - 1] === "\n") {
		str.value = str.value.substring(0, str.value.length - 1);
	} else {

	}

	str.value = str.value + '\n';
	lines.date = $('#date').val().split(/\n/);

	while (lines.date.indexOf("") > -1) {
		var index = lines.date.indexOf("");
		lines.date.splice(index, 1);
	}

	var compareAdd = lines.date.slice();

	if (lastcommit.date.length > lines.date.length) {
		console.log("remove!");
		for (var i = 0; i < lines.date.length; i++) {
			var findIndex1 = compareRemove.indexOf(lines.date[i]);
			compareRemove.splice(findIndex1, 1);
		}

		var strRemove = compareRemove[0];

		$("#inputTextToSave").jmRemoveHighlight({
			"element": "span",
			"className": "date"
		}, strRemove);
	}

	lastcommit.date = lines.date.slice();

	if (compareRemove.length < compareAdd.length) {
		console.log("add!");
		for (var i = 0; i < compareRemove.length; i++) {
			console.log(compareAdd);
			if (compareRemove.length == 0) {

			} else {
				var findIndex2 = compareAdd.indexOf(compareRemove[i]);
				compareAdd.splice(findIndex2, 1);
			}
		}
		console.log(compareAdd);
		var strAdd = compareAdd[0];

		$('#inputTextToSave').jmHighlight(strAdd, {
			"className": "date",
		});
	}
	$('#date').scrollTop($('#date').height());
});

$('#official').bind('input propertychange', function() {
	var str = document.getElementById('official');
	var compareRemove = lastcommit.official.slice();

	if (str.value[str.value.length - 1] === "\n") {
		str.value = str.value.substring(0, str.value.length - 1);
	} else {

	}

	str.value = str.value + '\n';
	lines.official = $('#official').val().split(/\n/);

	while (lines.official.indexOf("") > -1) {
		var index = lines.official.indexOf("");
		lines.official.splice(index, 1);
	}

	var compareAdd = lines.official.slice();

	if (lastcommit.official.length > lines.official.length) {
		console.log("remove!");
		for (var i = 0; i < lines.official.length; i++) {
			var findIndex1 = compareRemove.indexOf(lines.official[i]);
			compareRemove.splice(findIndex1, 1);
		}

		var strRemove = compareRemove[0];

		$("#inputTextToSave").jmRemoveHighlight({
			"element": "span",
			"className": "official"
		}, strRemove);
	}

	lastcommit.official = lines.official.slice();

	if (compareRemove.length < compareAdd.length) {
		console.log("add!");
		for (var i = 0; i < compareRemove.length; i++) {
			console.log(compareAdd);
			if (compareRemove.length == 0) {

			} else {
				var findIndex2 = compareAdd.indexOf(compareRemove[i]);
				compareAdd.splice(findIndex2, 1);
			}
		}
		console.log(compareAdd);
		var strAdd = compareAdd[0];

		$('#inputTextToSave').jmHighlight(strAdd, {
			"className": "official",
		});
	}
	$('#official').scrollTop($('#official').height());
});
