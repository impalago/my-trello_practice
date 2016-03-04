var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir.config.sourcemaps = true;

elixir(function(mix) {

    mix.scripts([
        "/jquery/dist/jquery.min.js",
        "/bootstrap/dist/js/bootstrap.min.js",
        "/bootstrap-material-design/dist/js/material.min.js",
        "/bootstrap-material-design/dist/js/ripples.min.js",
        "/lodash/lodash.min.js",
        "/angular/angular.min.js",
        "/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
        "/jquery-confirm/js/jquery-confirm.min.js"
    ], "public/js/dependencies.js", "node_modules")
    .scriptsIn("resources/assets/js", "public/js/app.js")

    .styles([
        "/bootstrap/dist/css/bootstrap.min.css",
        "/bootstrap-material-design/dist/css/bootstrap-material-design.min.css",
        "/bootstrap-material-design/dist/css/ripples.min.css",
        "/angular-ui-bootstrap/dist/ui-bootstrap-csp.css",
        "/jquery-confirm/css/jquery-confirm.css"
    ], 'public/css/dependencies.css', 'node_modules')
    .sass('app.scss')
    .browserSync({
        proxy: 'trello.dev'
    });
});
