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

function saveTextAsFile() {
	$('.name').replaceWith(function() {
		return $("<name>", {
			html: $(this).html()
		});
	})
	$('.location').replaceWith(function() {
		return $("<location>", {
			html: $(this).html()
		});
	})
	$('.date').replaceWith(function() {
		return $("<date>", {
			html: $(this).html()
		});
	})
	$('.official').replaceWith(function() {
		return $("<official>", {
			html: $(this).html()
		});
	})

	var textToWrite = document.getElementById("inputTextToSave").innerHTML;
	var textFileAsBlob = new Blob([textToWrite], {
		type: 'text/plain'
	});
	var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value + ".txt";

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.URL != null) {
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
	} else {
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

function replaceAlltag(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

function loadFileAsText() {
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		$("#inputTextToSave").text(textFromFileLoaded.toString());
		var replace = document.getElementById('inputTextToSave');

		replace.innerHTML = replaceAlltag(replace.innerHTML, '&lt;name&gt;', '<span class="name" data-jmhighlight="true">');
		replace.innerHTML = replaceAlltag(replace.innerHTML, '&lt;/name&gt;', '</span>');
		replace.innerHTML = replaceAlltag(replace.innerHTML, '&lt;location&gt;', '<span class="location" data-jmhighlight="true">');
		replace.innerHTML = replaceAlltag(replace.innerHTML, '&lt;/location&gt;', '</span>');
		replace.innerHTML = replaceAlltag(replace.innerHTML, '&lt;date&gt;', '<span class="date" data-jmhighlight="true">');
		replace.innerHTML = replaceAlltag(replace.innerHTML, '&lt;/date&gt;', '</span>');
		replace.innerHTML = replaceAlltag(replace.innerHTML, '&lt;official&gt;', '<span class="official" data-jmhighlight="true">');
		replace.innerHTML = replaceAlltag(replace.innerHTML, '&lt;/official&gt;', '</span>');

		$('.name').each(function() {
			var temp = $(this).text();
			if (lines.name.indexOf(temp) === -1) {
				lines.name.push(temp);
				lastcommit.name.push(temp);
				var str = document.getElementById('name');
				str.value += temp + '\n';
			}
		})
		$('.date').each(function() {
			var temp = $(this).text();
			if (lines.date.indexOf(temp) === -1) {
				lines.date.push(temp);
				lastcommit.date.push(temp);
				var str = document.getElementById('date');
				str.value += temp + '\n';
			}
		})
		$('.location').each(function() {
			var temp = $(this).text();
			if (lines.location.indexOf(temp) === -1) {
				lines.location.push(temp);
				lastcommit.location.push(temp);
				var str = document.getElementById('location');
				str.value += temp + '\n';
			}
		})
		$('.official').each(function() {
			var temp = $(this).text();
			if (lines.official.indexOf(temp) === -1) {
				lines.official.push(temp);
				lastcommit.official.push(temp);
				var str = document.getElementById('official');
				str.value += temp + '\n';
			}
		})
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

function clearAll() {
	location.reload();
}

function Highlight(compareAdd, compareRemove, type) {
	for (var i = 0; i < compareRemove.length; i++) {
		if (compareRemove.length == 0) {

		} else {
			var findIndex2 = compareAdd.indexOf(compareRemove[i]);
			compareAdd.splice(findIndex2, 1);
		}
	}
	var strAdd = compareAdd[0];

	$('#inputTextToSave').jmHighlight(strAdd, {
		"className": type,
	});
}

function removeHighlight(compareAdd, compareRemove, type) {
	for (var i = 0; i < compareAdd.length; i++) {
		var findIndex1 = compareRemove.indexOf(compareAdd[i]);
		compareRemove.splice(findIndex1, 1);
	}

	var strRemove = compareRemove[0];
	console.log(strRemove);

	$("#inputTextToSave").jmRemoveHighlight({
		"className": type
	}, strRemove);
}

$('#name').bind('input propertychange', function() {
	var str = document.getElementById('name');
	var compareRemove = lastcommit.name.slice();

	while (str.value[str.value.length - 1] === "\n") {
		str.value = str.value.substring(0, str.value.length - 1);
	}
	if (str.value[0] === '\n') {
		str.value = str.value.substring(1);
	}
	str.value = str.value.replace(/(\r\n|\r|\n){2}/g, '$1').replace(/(\r\n|\r|\n){3,}/g, '$1\n');

	str.value += '\n';
	lines.name = $('#name').val().split(/\n/);

	while (lines.name.indexOf("") > -1) {
		var index = lines.name.indexOf("");
		lines.name.splice(index, 1);
	}

	var compareAdd = lines.name.slice();


	if (compareRemove.length > compareAdd.length) {
		removeHighlight(compareAdd, compareRemove, "name");
		compareRemove = lastcommit.name.slice();
	}

	lastcommit.name = lines.name.slice();

	if (compareRemove.length < compareAdd.length) {
		Highlight(compareAdd, compareRemove, "name");
	}

	$('#name').scrollTop($('#name').height() + 2000);
});

$('#location').bind('input propertychange', function() {
	var str = document.getElementById('location');
	var compareRemove = lastcommit.location.slice();

	while (str.value[str.value.length - 1] === "\n") {
		str.value = str.value.substring(0, str.value.length - 1);
	}
	if (str.value[0] === '\n') {
		str.value = str.value.substring(1);
	}
	str.value = str.value.replace(/(\r\n|\r|\n){2}/g, '$1').replace(/(\r\n|\r|\n){3,}/g, '$1\n');

	str.value += '\n';
	lines.location = $('#location').val().split(/\n/);

	while (lines.location.indexOf("") > -1) {
		var index = lines.location.indexOf("");
		lines.location.splice(index, 1);
	}

	var compareAdd = lines.location.slice();

	if (lastcommit.location.length > lines.location.length) {
		removeHighlight(compareAdd, compareRemove, "location");
		compareRemove = lastcommit.location.slice();
	}

	lastcommit.location = lines.location.slice();

	if (compareRemove.length < compareAdd.length) {
		Highlight(compareAdd, compareRemove, "location");
	}
	$('#location').scrollTop($('#location').height() + 2000);

});

$('#date').bind('input propertychange', function() {
	var str = document.getElementById('date');
	var compareRemove = lastcommit.date.slice();

	while (str.value[str.value.length - 1] === "\n") {
		str.value = str.value.substring(0, str.value.length - 1);
	}
	if (str.value[0] === '\n') {
		str.value = str.value.substring(1);
	}
	str.value = str.value.replace(/(\r\n|\r|\n){2}/g, '$1').replace(/(\r\n|\r|\n){3,}/g, '$1\n');

	str.value += '\n';
	lines.date = $('#date').val().split(/\n/);

	while (lines.date.indexOf("") > -1) {
		var index = lines.date.indexOf("");
		lines.date.splice(index, 1);
	}

	var compareAdd = lines.date.slice();

	if (lastcommit.date.length > lines.date.length) {
		removeHighlight(compareAdd, compareRemove, "date");
		compareRemove = lastcommit.date.slice();
	}

	lastcommit.date = lines.date.slice();

	if (compareRemove.length < compareAdd.length) {
		Highlight(compareAdd, compareRemove, "date");
	}
	$('#date').scrollTop($('#date').height() + 2000);
});

$('#official').bind('input propertychange', function() {
	var str = document.getElementById('official');
	var compareRemove = lastcommit.official.slice();

	while (str.value[str.value.length - 1] === "\n") {
		str.value = str.value.substring(0, str.value.length - 1);
	}
	if (str.value[0] === '\n') {
		str.value = str.value.substring(1);
	}
	str.value = str.value.replace(/(\r\n|\r|\n){2}/g, '$1').replace(/(\r\n|\r|\n){3,}/g, '$1\n');

	str.value += '\n';
	lines.official = $('#official').val().split(/\n/);

	while (lines.official.indexOf("") > -1) {
		var index = lines.official.indexOf("");
		lines.official.splice(index, 1);
	}

	var compareAdd = lines.official.slice();

	if (lastcommit.official.length > lines.official.length) {
		removeHighlight(compareAdd, compareRemove, "official");
		compareRemove = lastcommit.official.slice();
	}

	lastcommit.official = lines.official.slice();

	if (compareRemove.length < compareAdd.length) {
		Highlight(compareAdd, compareRemove, "official");
	}
	$('#official').scrollTop($('#official').height() + 2000);
});
