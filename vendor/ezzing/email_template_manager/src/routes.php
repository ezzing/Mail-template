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

Route::get ('/template_manager', function () {return view ('EmailTemplateManagerViews::index');});

Route::post('/email', 'Ezzing\EmailTemplateManager\MailController@sendEmail');

Route::post('/saveTemplate', 'Ezzing\EmailTemplateManager\TemplateController@SaveTemplate');

Route::get('/getCreatedTemplates', 'Ezzing\EmailTemplateManager\TemplateController@getCreatedTemplates');

Route::get('/getTemplate/{id}', 'Ezzing\EmailTemplateManager\TemplateController@getTemplate');

Route::get('/getTemplateToEdit/{id}', 'Ezzing\EmailTemplateManager\TemplateController@getTemplateToEdit');

Route::get('/getLanguage/', 'Ezzing\EmailTemplateManager\MultilanguageController@getLanguage');

Route::post('/updateTemplate', 'Ezzing\EmailTemplateManager\TemplateController@updateTemplate');

Route::post('/deleteTemplate','Ezzing\EmailTemplateManager\TemplateController@deleteTemplate');
