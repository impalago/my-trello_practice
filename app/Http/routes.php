<?php


Route::get('/', function () {
    return view('welcome');
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => 'web'], function () {
    Route::auth();
});

Route::group(['middleware' => ['web', 'auth']], function () {
    Route::get('/', 'HomeController@index');
});

Route::group(['middleware' => ['web', 'auth'], 'prefix' => 'api'], function () {
    Route::resource('boards', 'BoardsController', ['except' => [
        'create'
    ]]);

    // Templates

    // Boards
    Route::get('boards-main', function() {
        return view('app_blocks/boards.index');
    });
    Route::get('boards-create-form', function() {
        return view('app_blocks/boards.board-create-form');
    });

    // Board item
    Route::get('boards-item', function() {
        return view('app_blocks/board-item.index');
    });

});
