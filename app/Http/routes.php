<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/foo/bar', function () {
    return 'Hello World';
});

Route::put('foo/bar', function () {
    //
});

Route::delete('foo/bar', function () {
    //
});
/*
 * This route is used to send emails. It recovers the json object with all the data needed
 * to configure the mail sending, and then it sends it using Mail facade.
 */
Route::post('/email', 'MailController@sendEmail');

Route::post('/saveTemplate', 'TemplateController@SaveTemplate');

Route::get('/getCreatedTemplates', 'TemplateController@getCreatedTemplates');

Route::get('/getTemplate/{id}', 'TemplateController@getTemplate');

Route::get('/getTemplate2/{id}', 'TemplateController@getTemplate2');

Route::get('/getLanguage/', 'MultilanguageController@getLanguage');

Route::post('/deleteTemplate','TemplateController@deleteTemplate');
