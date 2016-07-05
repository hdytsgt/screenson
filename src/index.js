'use strict';

/**
 * Define Required Vars
 */
const electron = require( 'electron' );
const { 
	app,
	BrowserWindow,
	ipcMain,
	dialog
} = electron;

let win;

/**
 * Run Auto Reload
 */
require( 'electron-reload' )( __dirname );

/**
 * Dialogs
 */
ipcMain.on( 'open-file-dialog', function (event) {
	
	dialog.showOpenDialog( { properties: [ 'openDirectory' ] }, function( files ) {
		if (files) event.sender.send( 'selected-directory', files );
	});
});

ipcMain.on( 'no-device-selected', function (event) {
	dialog.showErrorBox( 'Whoops!', 'You have to select one or more devices.');
});

ipcMain.on( 'pageres-error', function (event) {
	dialog.showErrorBox( 'Whoops!', 'Something wrong when capturing screenshot. Check your url.');
});

/**
 * Setup Window
 */
const createWindow = function() {
	
	win = new BrowserWindow({ 
		width: 1024,
		height: 768,
		frame: false
	});

	win.loadURL( 'file://'+ __dirname +'/index.html' );

	win.on( 'closed', () => {
		win = null;
	});
};

/**
 * Fire up app
 */
app
	.on( 'ready', createWindow )
	.on( 'window-all-closed', () => {
		if( process.platform !== 'darwin' ) {
			app.quit();
		}
	})
	.on( 'activate', () => {
		if( win === null ) {
			createWindow();
		}
	});