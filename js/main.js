var ToLabel = {
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

function highlight_name() {
	// $('#inputTextToSave').highlight('8');
	$('#inputTextToSave').jmHighlight("8", {
		"className": "highlight2",
		"separateWordSearch": true,
	});
}

$('#name').bind('input propertychange', function() {
	var str = document.getElementById('name');
	str.value = str.value + '\n';
	//console.log(str.value);
	$('#name').scrollTop($('#name').height());
	var lines = $('#name').val().split(/\n/);
	//console.log(lines);
	if (/\S/.test(lines[lines.length - 2])) {
		ToLabel.name.push(lines[lines.length - 2]);
		$('#inputTextToSave').jmHighlight(lines[lines.length - 2], {
			"className": "name",
		});
	}
	console.log(ToLabel.name)
});

$('#location').bind('input propertychange', function() {
	var str = document.getElementById('location');
	str.value = str.value + '\n';
	//console.log(str.value);
	$('#name').scrollTop($('#location').height());
	var lines = $('#location').val().split(/\n/);
	//console.log(lines);
	if (/\S/.test(lines[lines.length - 2])) {
		ToLabel.location.push(lines[lines.length - 2]);
		$('#inputTextToSave').jmHighlight(lines[lines.length - 2], {
			"className": "location",
		});
	}
	console.log(ToLabel.location);
});

$('#date').bind('input propertychange', function() {
	var str = document.getElementById('date');
	str.value = str.value + '\n';
	//console.log(str.value);
	$('#date').scrollTop($('#date').height());
	var lines = $('#date').val().split(/\n/);
	//console.log(lines);
	if (/\S/.test(lines[lines.length - 2])) {
		ToLabel.date.push(lines[lines.length - 2]);
		$('#inputTextToSave').jmHighlight(lines[lines.length - 2], {
			"className": "date",
		});
	}
	console.log(ToLabel.date);
});

$('#official').bind('input propertychange', function() {
	var str = document.getElementById('official');
	str.value = str.value + '\n';
	//console.log(str.value);
	$('#official').scrollTop($('#official').height());
	var lines = $('#official').val().split(/\n/);
	//console.log(lines);
	if (/\S/.test(lines[lines.length - 2])) {
		ToLabel.official.push(lines[lines.length - 2]);
		$('#inputTextToSave').jmHighlight(lines[lines.length - 2], {
			"className": "official",
		});
	}
	console.log(ToLabel.official);
});
