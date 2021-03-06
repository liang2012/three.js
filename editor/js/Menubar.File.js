Menubar.File = function ( editor ) {

	var container = new UI.Panel();
	container.setClass( 'menu' );
	container.onMouseOver( function () { options.setDisplay( 'block' ) } );
	container.onMouseOut( function () { options.setDisplay( 'none' ) } );
	container.onClick( function () { options.setDisplay( 'block' ) } );

	var title = new UI.Panel();
	title.setTextContent( 'File' ).setColor( '#666' );
	title.setMargin( '0px' );
	title.setPadding( '8px' );
	container.add( title );

	//

	var options = new UI.Panel();
	options.setClass( 'options' );
	options.setDisplay( 'none' );
	container.add( options );

	/*
	// open

	var option = new UI.Panel();
	option.setClass( 'option' );
	option.setTextContent( 'Open' );
	option.onClick( function () { alert( 'Open' ) } );
	options.add( option );
	*/

	// reset

	var option = new UI.Panel();
	option.setClass( 'option' );
	option.setTextContent( 'Reset' );
	option.onClick( function () {

		if ( confirm( 'Are you sure?' ) ) {

			if ( localStorage.threejsEditor !== undefined ) {

				delete localStorage.threejsEditor;

			}

			location.href = location.pathname;

		}

	} );
	options.add( option );

	options.add( new UI.HorizontalRule() );


	// share

	var option = new UI.Panel();
	option.setClass( 'option' );
	option.setTextContent( 'Share' );
	option.onClick( function () {

		var exporter = new THREE.ObjectExporter();
		var string = JSON.stringify( exporter.parse( editor.scene ) );
		window.location.hash = 'A/' + window.btoa( RawDeflate.deflate( string ) );

	} );
	options.add( option );

	options.add( new UI.HorizontalRule() );


	// export geometry

	var option = new UI.Panel();
	option.setClass( 'option' );
	option.setTextContent( 'Export Geometry' );
	option.onClick( function () {

		exportGeometry( THREE.GeometryExporter );

	} );
	options.add( option );

	/*

	// export scene

	var option = new UI.Panel();
	option.setClass( 'option' );
	option.setTextContent( 'Export Scene' );
	option.onClick( function () {

		exportScene( THREE.SceneExporter );

	} );
	options.add( option );

	*/

	// export object

	var option = new UI.Panel();
	option.setClass( 'option' );
	option.setTextContent( 'Export Object' );
	option.onClick( function () {

		exportObject( THREE.ObjectExporter );

	} );
	options.add( option );

	// export scene

	var option = new UI.Panel();
	option.setClass( 'option' );
	option.setTextContent( 'Export Scene' );
	option.onClick( function () {

		exportScene( THREE.ObjectExporter );

	} );
	options.add( option );

	// export OBJ

	var option = new UI.Panel();
	option.setClass( 'option' );
	option.setTextContent( 'Export OBJ' );
	option.onClick( function () {

		exportGeometry( THREE.OBJExporter );

	} );
	options.add( option );

	var exportGeometry = function ( exporterClass ) {

		var object = editor.selected;

		if ( object.geometry === undefined ) {

			alert( "Selected object doesn't have any geometry" );
			return;

		}

		var exporter = new exporterClass();

		var output;

		if ( exporter instanceof THREE.GeometryExporter ) {

			output = JSON.stringify( exporter.parse( object.geometry ), null, '\t' );
			output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		} else {

			output = exporter.parse( object.geometry );

		}

		var blob = new Blob( [ output ], { type: 'text/plain' } );
		var objectURL = URL.createObjectURL( blob );

		window.open( objectURL, '_blank' );
		window.focus();

	};

	var exportObject = function ( exporterClass ) {

		var exporter = new exporterClass();

		var object = editor.selected;

		var output = JSON.stringify( exporter.parse( object ), null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		var blob = new Blob( [ output ], { type: 'text/plain' } );
		var objectURL = URL.createObjectURL( blob );

		window.open( objectURL, '_blank' );
		window.focus();

	};

	var exportScene = function ( exporterClass ) {

		var exporter = new exporterClass();

		var output = JSON.stringify( exporter.parse( editor.scene ), null, '\t' );
		output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );

		var blob = new Blob( [ output ], { type: 'text/plain' } );
		var objectURL = URL.createObjectURL( blob );

		window.open( objectURL, '_blank' );
		window.focus();

	};

	return container;

}
