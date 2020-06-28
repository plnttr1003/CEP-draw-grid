var csInterface;

var model = {
	gridType: '',
	gridProperty: '',
	gridAmount: 0,
	sectors: [],
};

var el = {
};

function onLoaded() {
	csInterface = new CSInterface();
	if (csInterface.THEME_COLOR_CHANGED_EVENT) {
		csInterface.addEventListener(CSInterface.THEME_COLOR_CHANGED_EVENT, setAppTheme);
	}
	el.inputGridAmount = document.getElementById('gridAmount');
	el.toolButton = document.getElementById('tool-button');

	el.duplicateCircles = document.getElementById('duplicateCircles');
	el.sectorName = document.getElementById('sectorName');
	el.sectorRows = document.getElementById('sectorRows');
	el.sectorSeats = document.getElementById('sectorSeats');
	el.generateCircles = document.getElementById('generateCircles');

	el.curveCircleAngle = document.getElementById('curveCircleAngle');
	el.curveDistortion = document.getElementById('curveDistortion');
	el.curveDistortionValue = document.getElementById('curveDistortionValue');

	addListeners();
}

function setAppTheme(e) {
	var hostEnv = window.__adobe_cep__.getHostEnvironment();
	var skinInfo = JSON.parse(hostEnv).appSkinInfo;
	var color = skinInfo.panelBackgroundColor.color;
	var avg = (color.red+color.blue+color.green) / 3;
	var type = (avg > 128) ? "light" : "dark";
	document.getElementById("topcoat-style").href = "css/topcoat-desktop-" + type + ".css";
	document.getElementById("main-style").href = "css/main-" + type + ".css";
	var rgb = "rgb(" +
		Math.round(color.red) 	+ "," +
		Math.round(color.green)	+ "," +
		Math.round(color.blue)	+ ")";
	document.body.style.backgroundColor = rgb;
}

function addRadioListeners(name) {
	var radios = document.getElementsByName(name);
	for (var i = 0; i < radios.length; i++) {
		radios[i].addEventListener('change', function() {
			model[name] = this.value;

			if (model.gridType && model.gridProperty) {
				enableInputFields();
			}
		})
	}
}

function enableInputFields() {
	if (model.gridType && model.gridProperty) {
		el.inputGridAmount.removeAttribute('disabled');
	}
	if (model.gridType && model.gridProperty && model.gridAmount) {
		el.toolButton.removeAttribute('disabled');
	}
}

function addInputListeners() {
	el.inputGridAmount.addEventListener('keyup', function() {
		model.gridAmount = this.value;
		enableInputFields();
	});
}

function addButtonListener() {
	el.toolButton.addEventListener('click', function() {

		alert('----');

		if (model.gridAmount && model.gridProperty && model.gridType) {
			// type, property, amount

			alert('....');

			var param = [model.gridType, model.gridProperty, model.gridAmount].join(',');
			csInterface.evalScript('startGridScript("'+ param + '")');
		}
	});
}

function addListeners() {
	addRadioListeners('gridType');
	addRadioListeners('gridProperty');
	addInputListeners();
	addButtonListener();
}
