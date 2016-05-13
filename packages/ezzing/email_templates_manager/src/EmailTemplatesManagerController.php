<?php

namespace Ezzing\Email_templates_manager;
 
use App\Http\Controllers\Controller;
use Carbon\Carbon;
 
class EmailTemplatesManagerController extends Controller
{
 
    public function index($timezone = NULL)
    {
        $current_time = ($timezone)
            ? Carbon::now(str_replace('-', '/', $timezone))
            : Carbon::now();
        return view('email_templates_manager::time', compact('current_time'));
    }
 
}
