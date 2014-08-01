function painLocationsWindow(){
	
	var locationsTableData = [];
	var fontFamilyVar = 'Source Sans Pro';
	var fontSizeVar ='16';
	
	var self = Ti.UI.createWindow(ef.combine($$.tabWindow,{
		titleControl:Ti.UI.createLabel({
			text:'Location of Pain',
			color:'#FFF',
			font:{
				fontSize:18,
				fontFamily:fontFamilyVar
			}
		}),
		fullscreen:false,
		navBarHidden:false,
		layout:'vertical',
		backgroundColor:'#FFF'
	}));
	
	var painArray = new Array();
	painArray.push('Left side of head');
	painArray.push('Middle of head');
	painArray.push('Right side of head');
	painArray.push('Behind the eyes');
	painArray.push('Left side of face');
	painArray.push('Right side of face');
	painArray.push('Upper jaw');
	painArray.push('Lower jaw');
	painArray.push('Back of head');
	painArray.push('Back of neck');
	painArray.push('Left ear');
	painArray.push('Right ear');
	painArray.push('Left Eye');
	painArray.push('Right Eye');
	painArray.push('Nose');
	painArray.push('Behind forehead');
	
	for(i=0;i<painArray.length;i++){
		
		var row = Ti.UI.createTableViewRow({
			title:'',
			hasChild:false,
			hasCheck:true
		});
		
		var fieldLabel = Titanium.UI.createLabel(ef.combine($$.settingsLabel,{
		    text: painArray[i],
		    left: 15,
		    height:54,
		    value:painArray[i]
		}));
		
		row.add(fieldLabel);
	
		locationsTableData.push(row);
	}
	
	var locationsTable = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		data:locationsTableData,
   		rowHeight:54,
		selectionStyle:'NONE',
		backgroundColor: 'transparent'
	});
	
	locationsTable.footerView = Ti.UI.createView({
    	height: 1,
   		backgroundColor: 'transparent'
	});
	
	self.add(locationsTable);
	
	return self;
	
};

module.exports = painLocationsWindow;
	