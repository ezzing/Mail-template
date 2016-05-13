<?php
namespace Ezzing\EmailTemplateManager;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Validator;


/**
 * This class manages email sending
 */
class MailController extends Controller 
{      
    
/**
 * sendEmail  : Sends received email to target
 *
 * @return array : asociative array with the final status of request
 */
    public function sendEmail ()
    {
        // Recovers mail data object
        $mailData= json_decode(Input::get('emailData'));
        //Defines validator object
        $validator = Validator::make((array)$mailData, [
           'email' => array('required', 'regex:/^((<[a-z]+>)?[\.a-zA-ZáéíóúÁÉÍÓÚñÑ_1-9]+@[a-zA-ZáéíóúÁÉÍÓÚñÑ_-]+\.[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,12})(,((<[a-z]+>)?[\.a-zA-ZáéíóúÁÉÍÓÚñÑ_1-9]+@[a-zA-ZáéíóúÁÉÍÓÚñÑ_-]+\.[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,12}))*$/'),
           'subject' => array('required', 'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ1-9][a-zA-ZáéíóúÁÉÍÓÚñÑ1-9 ]{3,50}$/')
        ]);
        // Returns fail message if validation fails
        if ($validator -> fails ()) {
            return response() -> json ([
                'status' => 'fail'
            ], 200);
        }
        // Sends email if validation success
        else {
            // Split string of emails into an array of emails
            $allMails = explode (',', $mailData->email);
            // For each mail in $allMails, actual name and target of each mail are getted, and then the email is sent
            foreach ($allMails as $mail) {
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
                    $message->to($target, $name);
                    $message->subject($mailData->subject);
                    $message->setBody($mailData->htmlContent, 'text/html');
                 });
            }
            return response() -> json ([
                'status' => 'success'
            ], 200);
         }
    }
}


