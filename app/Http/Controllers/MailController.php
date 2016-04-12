<?php

namespace App\Http\Controllers;

use App\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Validator;

class MailController extends Controller 
{      
        /*
     * This function receives email data from fromt,
     * validates the data, and if it is correct it
     * sends the email.
     */
    public function sendEmail ()
    {
        // Recovering mail data object
        $mailData= json_decode(Input::get('mailData'));
        
        //Defining custom validator to work with $mailData  JSON object and not a Request object
        $validator = Validator::make((array)$mailData, [
            'email' => array('required', 'regex:/^[\.a-zA-ZáéíóúÁÉÍÓÚñÑ_1-9]+@[a-zA-ZáéíóúÁÉÍÓÚñÑ_-]+\\.[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,12}$/'),
            'name' => array('required', 'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,25}$/'),
            'subject' => array('required', 'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ1-9][a-zA-ZáéíóúÁÉÍÓÚñÑ1-9 ]{5,50}$/')
        ]);
        
        // Returning 'invalidData' string to front if validation fails
        if ($validator -> fails ()) {
            echo 'invalidData';
        }
        
        // Sending email if validation success
        else {
            Mail::send([], [], function($message)  use ($mailData){
            $message->to($mailData->email, $mailData->name);
            $message->subject($mailData->subject);
            $message->setBody($mailData->htmlContent, 'text/html');
             });
         }
    }     
}

