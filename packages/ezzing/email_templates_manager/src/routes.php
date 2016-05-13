<?php

Route::get('timezones/{timezone?}', 
  'ezzing\email_templates_manager\EmailTemplatesManagerController@index');
