var exec = require('child_process').exec;
var fs = require('fs');

var moduleExport = {
	setup: function (watchFolder, extension, output) {
		var execCommand = 'handlebars';
		// Add the watch this.watchDir to the command
		if ( watchFolder ) {
			execCommand += ' ' + watchFolder;
		} else {
			throw Error('Provide a folder to watch');
		}

		// Add the extension to the command, this is optional
		if ( extension) {
			execCommand += ' -e ' + extension;
		} else {
			console.log('Using the default .handlebars extension');
		}

		if ( output ) {
			execCommand += ' -f ' + output;
		} else {
			throw Error('Provide a destination file!');
		}
		
		var app =  {
			execCommand: execCommand,
			run: function (callback) {
				if ( callback ) {
					exec(this.execCommand, callback);
				} else {
					exec(this.execCommand, function (err, stdout, stderr) {
						if (stderr) {
							console.log('Error occurred:', stderr);
						} else {
							console.log('Templates updated');
						}
					});
				}
			},
			watch: function (callback) {
				var callCount = 0;
				
				// Setup the callback function
				var execCallback = callback || null;

				fs.watch(watchFolder, function () {
					if ( callCount == 0 ) {
						app.run(execCallback);
						callCount = 0;
					} else {
						callCount ++;
					}
				});
			}
		};
		return app;
	},
};

module.exports = moduleExport;
