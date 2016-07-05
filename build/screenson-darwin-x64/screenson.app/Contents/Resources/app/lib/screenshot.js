'use strict';

/**
 * Define Required Vars
 */
const pageres = require( 'pageres' );
const ipc     = require('electron').ipcRenderer;

/**
 * Screenshot Module
 */
module.exports = {

	process : () => {

		if( $( '[name="devices[]"]:checked' ).length < 1 ) {
			ipc.send( 'no-device-selected' );
			return false;
		}

		ipc.send( 'open-file-dialog' );

		ipc.on( 'selected-directory', function( event, path ) {

			// Elements
			var _loading      = $( '.loading' ),
			    _done         = $( '.done' ),
			    _site         = $( '#site' ).val(),
			    _resolutions  = [];

			$( '[name="devices[]"]:checked' ).each( function() {
				_resolutions.push( $( this ).val() );
			});

			// Display loading
			_loading.fadeIn();

			// Process screenshot
			new pageres({ delay: 2 })
				.src( _site, _resolutions )
				.dest( path[ 0 ] )
				.run( ( err, streams ) => {
					
					if( err ) {

						ipc.send( 'pageres-error' );

						_loading.hide();
						$( '.panel:last' ).hide();
						$( '.panel:first' ).addClass( 'hidden' ).show().addClass( 'fadeInUpSmall animated' );
					}
				})
				.then( () => {

					_loading.hide();
					_done.fadeIn();
					_done.find( '.checkmark' ).addClass( 'active' );

					window.setTimeout( () => {
						
						_done.hide();
						$( '.panel:last' ).hide();
						$( '.panel:first' ).addClass( 'hidden' ).show().addClass( 'fadeInUpSmall animated' );
					}, 2500);

				});
		});		
	}
};