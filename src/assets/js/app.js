'use strict';

/**
 * Define Required Vars
 */
const $          = require( 'jquery' );
const screenshot = require( '../lib/screenshot' );
const titlebar   = require( 'titlebar' );
const { remote } = require( 'electron' );
const validUrl   = require( 'valid-url' );

/**
 * Window bar
 */
var bar       = titlebar(),
    curWindow = remote.getCurrentWindow();

bar.appendTo( document.body );

bar
	.on( 'close', () => {
		curWindow.close();
	})
	.on( 'fullscreen', () => {
		if( ! curWindow.isMaximized() ) {
			curWindow.maximize();
		} else {
			curWindow.unmaximize();
		}
	})
	.on( 'minimize', () => {
		curWindow.minimize();
	});

$( document ).ready( () => {

	/**
	 * Animation
	 */
	window.setTimeout( () => {
			
		$( 'h1' ).removeClass( 'hidden' ).addClass( 'fadeInUp animated' );

		window.setTimeout( () => {
			$( '.panel.hidden:first' ).removeClass( 'hidden' ).addClass( 'fadeInUp animated' );
			$( 'h1' ).hide();
			$( '#site' ).focus();
		}, 1500);

	}, 500);

	/**
	 * Process
	 */
	$( '#site' ).on( 'keyup', function( e ) {

		var _key = e.keyCode || e.which;

		if( _key === 13 ) {
			$( '.next' ).click();
		}
	});

	$( '.next' ).on( 'click', function() {

		if( ! validUrl.isUri( $( '#site' ).val() )  ) {

			$( '#site' ).addClass( 'shake animated' ).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$( this ).removeClass( 'shake animated' );
			});
			return false;
		}

		$( '.panel:first' ).hide();
		$( '.panel:last' ).addClass( 'hidden' ).show().removeClass( 'hidden' ).addClass( 'fadeInUpSmall animated' );
	});

	$( '.go-back-first' ).on( 'click', function() {
		$( '.panel:last' ).hide();
		$( '.panel:first' ).addClass( 'hidden' ).show().addClass( 'fadeInUpSmall animated' );
	});

	$( '.next-process' ).on( 'click', function() {
		screenshot.process();
	});

});
