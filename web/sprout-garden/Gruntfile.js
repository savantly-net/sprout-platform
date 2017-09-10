'use strict';
module.exports = function(grunt) {

	// Unified Watch Object
	var watchFiles = {
		serverViews: ['src/test/express/app/views/**/*.*'],
		serverJS: ['Gruntfile.js', 'src/test/express/server.js', 'src/test/express/config/**/*.js', 'src/test/express/app/**/*.js'],
		clientViews: ['src/main/resources/static/modules/**/views/**/*.html'],
		clientJS: ['src/main/resources/static/js/*.js', 'src/main/resources/static/modules/**/*.js'],
		clientCSS: ['src/main/resources/static/modules/**/*.css'],
		mochaTests: ['src/test/express/app/tests/**/*.js'],
		sass: ['src/main/resources/static/sass/*.scss']
	};
	
	grunt.initConfig({
				watch: {
					serverViews: {
						files: watchFiles.serverViews,
						options: {
							livereload: true
						}
					},
					serverJS: {
						files: watchFiles.serverJS,
						tasks: ['jshint'],
						options: {
							livereload: true
						}
					},
					clientViews: {
						files: watchFiles.clientViews,
						options: {
							livereload: true,
						}
					},
					clientJS: {
						files: watchFiles.clientJS,
						tasks: ['jshint'],
						options: {
							livereload: true
						}
					},
					clientCSS: {
						files: watchFiles.clientCSS,
						tasks: ['csslint'],
						options: {
							livereload: true
						}
					},
					sass: {
						files: watchFiles.sass,
						options: {
							livereload: true
						}
					}
				},
				uglify : {
					core : {
						files : [ {
							expand : true,
							cwd : 'src/main/resources',
							src : 'static/modules/**/*.js',
							dest : 'target/classes',
							ext : '.min.js'
						} ]
					}
				},
				json_to_sass : {
					build : {
						files : [ {
							src : [ 'src/main/resources/static/_variables.json' ],
							dest : 'src/main/resources/static/generated/variables.scss'
						} ]
					},
				},
				sass : {
					options : {
						sourceMap : true,
						includePaths : [ 'src/main/resources/static/generated' ]
					},
					dist : {
						files : {
							'src/main/resources/static/generated/theme.css' : 'src/main/resources/static/sass/theme.scss'
						}
					}
				},
				jshint: {
					all: {
						src: watchFiles.clientJS.concat(watchFiles.serverJS),
						options: {
							jshintrc: true
						}
					}
				},
				csslint: {
					options: {
						csslintrc: '.csslintrc',
					},
					all: {
						src: watchFiles.clientCSS
					}
				},
				nodemon: {
					dev: {
						script: 'server.js',
						options: {
							cwd: 'src/test/express',
							nodeArgs: ['--debug'],
							ext: 'js,html',
							watch: watchFiles.serverViews.concat(watchFiles.serverJS)
						}
					}
				},
				'node-inspector': {
					custom: {
						options: {
							'web-port': 1337,
							'web-host': 'localhost',
							'debug-port': 5858,
							'save-live-edit': true,
							'no-preload': true,
							'stack-trace-limit': 50,
							'hidden': []
						}
					}
				},
				concurrent: {
					default: ['nodemon', 'watch'],
					debug: ['nodemon', 'watch', 'node-inspector'],
					options: {
						logConcurrentOutput: true,
						limit: 10
					}
				}
			});

	
	// Load NPM tasks
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);
	
	// Default task.
	grunt.registerTask('default', [ 'json_to_sass:build', 'sass', 'lint']);
	
	// Debug task.
	grunt.registerTask('debug', ['lint', 'concurrent:debug']);
	
	// Lint task(s).
	grunt.registerTask('lint', ['jshint', 'csslint']);
};