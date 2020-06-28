function getData(event, paramName) {
	var baseSector = {};
	var id = '';

	csInterface.evalScript('getSelectedGroupData()', function(result) {
		id = result.split('|')[1];
		model.sectors.forEach(function(sector) {
			if (sector.id === id) {
				baseSector = sector;
			}
		});

		if (paramName) {
			baseSector[paramName] = event.target.value;
		}
		el.sectorName.value = baseSector.name;
		el.sectorSeats.value = baseSector.seats;
		el.sectorRows.value = baseSector.rows;

		el.curveCircleAngle.value = baseSector.angle;
		el.curveDistortion.value = baseSector.distortion;
		el.curveDistortionValue.value = baseSector.distortion;

		if (paramName) {
			csInterface.evalScript('curveSeats("' + baseSector.angle + ',' + baseSector.distortion + ',' + baseSector.x0 + ',' + baseSector.y0 + '")');
		}
	});
}
