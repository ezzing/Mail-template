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

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;

Route::get('/', function () {
    return view('welcome');
});
/*
 * This route is used to send emails. It recovers the json object with all the data needed
 * to configure the mail sending, and then it sends it using Mail facade.
 */
Route::post('/mail', function() {
    
    // Recovering mail data object
    $mailData= json_decode(Input::get('mailData'));
    
    // Sending email using info received
   Mail::send([], [], function($message)  use ($mailData){
       $message->to($mailData->email, $mailData->name);
        $message->subject($mailData->subject);
        $message->setBody($mailData->htmlContent, 'text/html');
   });
   
});
 