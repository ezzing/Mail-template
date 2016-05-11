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
Route::post('/email', 'MailController@sendEmail');

Route::post('/saveTemplate', 'TemplateController@SaveTemplate');

Route::get('/getCreatedTemplates', 'TemplateController@getCreatedTemplates');

Route::get('/getTemplate/{id}', 'TemplateController@getTemplate');

Route::get('/getTemplateToEdit/{id}', 'TemplateController@getTemplateToEdit');

Route::get('/getLanguage/', 'MultilanguageController@getLanguage');

Route::post('/updateTemplate', 'TemplateController@updateTemplate');

Route::post('/deleteTemplate','TemplateController@deleteTemplate');
