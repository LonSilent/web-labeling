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
<<<<<<< HEAD
		$("#inputTextToSave").text(textFromFileLoaded.toString());
=======
		document.getElementById("inputTextToSave").innerHTML = textFromFileLoaded;
>>>>>>> LonSilent/master
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

function highlight() {
	$('#inputTextToSave').highlight('get_user');
}
