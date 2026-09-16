
const path = require('path');
const gulp = require('gulp');
const exec = require('child_process').exec;

const fs = require("fs");
const fsp = fs.promises;
const connect = require('gulp-connect');
const {watch} = gulp;

let shaders = [
	"src/materials/shaders/pointcloud.vs",
	"src/materials/shaders/pointcloud.fs",
	"src/materials/shaders/pointcloud_sm.vs",
	"src/materials/shaders/pointcloud_sm.fs",
	"src/materials/shaders/normalize.vs",
	"src/materials/shaders/normalize.fs",
	"src/materials/shaders/normalize_and_edl.fs",
	"src/materials/shaders/edl.vs",
	"src/materials/shaders/edl.fs",
	"src/materials/shaders/blur.vs",
	"src/materials/shaders/blur.fs",
];

// For development, it is now possible to use 'gulp webserver'
// from the command line to start the server (default port is 8080)
gulp.task('webserver', gulp.series(async function() {
	server = connect.server({
		port: 1234,
		https: false,
	});
}));

gulp.task('test', async function() {

	console.log("asdfiae8ofh");

});

gulp.task("shaders", async function(){

	const components = [
		"let Shaders = {};"
	];

	for(let file of shaders){
		const filename = path.basename(file);

		const content = await fsp.readFile(file);

		const prep = `Shaders["${filename}"] = \`${content}\``;

		components.push(prep);
	}

	components.push("export {Shaders};");

	const content = components.join("\n\n");

	const targetPath = `./build/shaders/shaders.js`;

	if(!fs.existsSync("build/shaders")){
		fs.mkdirSync("build/shaders");
	}
	fs.writeFileSync(targetPath, content, {flag: "w"});
});

gulp.task("clean-runtime", async function(){
	await fsp.rm("build/potree", {recursive: true, force: true});
});

gulp.task('build', 
	gulp.series(
		"clean-runtime",
		"shaders",
		function(){
			return gulp.src(["LICENSE"]).pipe(gulp.dest('build/potree'));
		}
	)
);

gulp.task("pack", async function(){
	await new Promise((resolve, reject) => {
		exec('rollup -c', function (err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	});
});

gulp.task("release", gulp.series("build", "pack"));

gulp.task('watch', gulp.parallel("release", "webserver", async function() {

	let watchlist = [
		'src/**/*.js',
		'src/**/**/*.js',
		'src/**/*.vs',
		'src/**/*.fs',
	];

	watch(watchlist, gulp.series("release"));

}));


