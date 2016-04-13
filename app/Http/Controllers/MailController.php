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
           'email' => array('required', 'regex:/^((<[a-z]+>)?[\.a-zA-ZáéíóúÁÉÍÓÚñÑ_1-9]+@[a-zA-ZáéíóúÁÉÍÓÚñÑ_-]+\.[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,12})(,((<[a-z]+>)?[\.a-zA-ZáéíóúÁÉÍÓÚñÑ_1-9]+@[a-zA-ZáéíóúÁÉÍÓÚñÑ_-]+\.[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,12}))*$/'),
           'subject' => array('required', 'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ1-9][a-zA-ZáéíóúÁÉÍÓÚñÑ1-9 ]{3,50}$/')
        ]);
        
        // Returning 'invalidData' string to front if validation fails
        if ($validator -> fails ()) {
            echo 'invalidData';
        }
        
        /*
         *         if ($validator -> fails ()) {
            return response()->json(
                    ['status' => 'wrong'] ,  500
                    );
        }
         */
        
        // Sending email if validation success
        else {
            // Split string of emails into an array of emails
            $allMails = explode (',', $mailData->email);

            foreach ($allMails as $mail) {
            // Getting the email and names
            $separatorPosition = strpos($mail, '>');
            if ($separatorPosition) {
                $name = substr($mail, 1, $separatorPosition-1);
                $target = substr($mail,  $separatorPosition+1);
            }
            else {
                $target = $mail;
                $name = '';
            }
            Mail::send([], [], function($message)  use ($mailData, $target, $name) {
                var_dump($target);
                var_dump($name);
            $message->to($target, $name);
            $message->subject($mailData->subject);
            $message->setBody($mailData->htmlContent, 'text/html');
             });
            }
         }
    }     
}

