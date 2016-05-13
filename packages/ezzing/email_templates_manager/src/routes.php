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

Route::get ('/ezzing', function () {
return view ('EmailTemplateManagerViews::index');
}
);

Route::post('/email', 'ezzing\email_templates_manager\MailController@sendEmail');

Route::post('/saveTemplate', 'ezzing\email_templates_manager\TemplateController@SaveTemplate');

Route::get('/getCreatedTemplates', 'ezzing\email_templates_manager\TemplateController@getCreatedTemplates');

Route::get('/getTemplate/{id}', 'ezzing\email_templates_manager\TemplateController@getTemplate');

Route::get('/getTemplateToEdit/{id}', 'ezzing\email_templates_manager\TemplateController@getTemplateToEdit');

Route::get('/getLanguage/', 'ezzing\email_templates_manager\MultilanguageController@getLanguage');

Route::post('/updateTemplate', 'ezzing\email_templates_manager\TemplateController@updateTemplate');

Route::post('/deleteTemplate','ezzing\email_templates_manager\TemplateController@deleteTemplate');
