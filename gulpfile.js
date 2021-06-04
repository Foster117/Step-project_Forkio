let projectFolder = "dist";
let sourceFolder = "src";

let path = {
    build: {
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        js: projectFolder + "/js/",
        img: projectFolder + "/img/",
        fonts: projectFolder + "/fonts/"
    },
    src: {
        html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
        scss: sourceFolder + "/scss/style.scss",
        js: sourceFolder + "/js/script.js",
        img: sourceFolder + "/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
        fonts: sourceFolder + "/fonts/*.ttf"
    },
    watch: {
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/scss/**/*.scss",
        js: sourceFolder + "/js/**/*.js",
        img: sourceFolder + "/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}",
    },
    clean: "./" + projectFolder + "/"
};

const   src = require("gulp").src,
        dest = require("gulp").dest,
        gulp = require("gulp"),
        browserSync = require("browser-sync").create(),
        fileInclude = require("gulp-file-include"),
        del = require("del"),
        scss = require("gulp-sass"),
        autoPrefixer = require("gulp-autoprefixer"),
        groupMedia = require("gulp-group-css-media-queries"),
        cleanCss = require("gulp-clean-css"),
        rename = require("gulp-rename"),
        uglify = require("gulp-uglify-es").default,
        babel = require("gulp-babel"),
        imagemin = require("gulp-imagemin");

/////////Functions
function html() {
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(dest("./"))
        .pipe(browserSync.stream());
}
function js() {
    return src(path.src.js)
        .pipe(fileInclude())
        .pipe(dest(path.build.js))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream());
}
function css() {
    return src(path.src.scss)
        .pipe(scss({
            outputStyle: "expanded"
        })
        )
        .pipe(groupMedia())
        .pipe(autoPrefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        })
        )
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: ".min.css"
        })
        )
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream());
}
function images() {
    return src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream());
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.stream());
}
function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}
function clean() {
    return del(path.clean);
}
function browserSyncRefresh() {
    browserSync.init({
        server: { baseDir: "./"},
        port: 3000,
        notify: false
    });
}
/////////////////////

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let dev = gulp.parallel(build, watchFiles, browserSyncRefresh);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.dev = dev;
exports.default = dev;
