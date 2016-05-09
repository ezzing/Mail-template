<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Template;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Validator;

class TemplateController extends Controller
{
    /*
     * This function returns all the templates save in the database
     */

    public function getCreatedTemplates ()
    {
        $table = DB::select('select id_template, name_template, created_at, icon from templates');
        return response()->json([
                    'templates' => $table
                        ], 200);
    }

    /*
     * This function receives id data from front, and returns html of the id_template
     */

    public function getTemplate ($id)
    {
        $selectedHtml = DB::table('templates')->where('id_template', '=', $id)->pluck('html');

        return response()->json([
                    'templates' => $selectedHtml[0]
                        ], 200);
    }
    
    /*
    * This function receives id data from front, and returns html of the id_template
    */
    public function getTemplate2($id)
    {
        $selectedHtml = DB::table('templates')->where('id_template', '=', $id)->select('html_edit', 'gridster')->get();

        return $selectedHtml;
    }
    
    /*
     * This function receives template data from front, validates the data, and if it is correct, store in the database.
     */
    public function saveTemplate ()
    {
        // Recovering template data object
        $template = json_decode(Input::get('template'));

        //Defining custom validator to work with $template JSON object and not a Request object
        $validator = Validator::make((array)$template, [
            'name_template' => array('required', 'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ1-9][a-zA-ZáéíóúÁÉÍÓÚñÑ1-9 ]{3,50}$/'),
            'html' => array('required'),//,'regex:/((<script>){1}.*(<\/script>){1})/'
            'icon' => array('required'),
            'edit' => array('required'),
        ]);

        // Returning fail message if validation fails
        if ($validator->fails()) {
            return response()->json([
                        'status' => 'fail'
                            ], 200);
        }
        // Saving template if validation success
        else {
            // If the html have any script tag, delete it
            $html = $template->html;
            if ($html . contains("&lt;script&gt;")) {
                $html = preg_replace('/((&lt;script&gt;){1}.*(&lt;\/script&gt;){1})/', "", $html);
            }

            // Save data at database
            Template::create(array(
                'name_template' => $template -> name_template,
                'html'          => $html,
                'html_edit'     => $template -> html_edit,
                'icon'          => $template -> icon,
                'gridster'      => $template -> edit
            ));

            // Returning success message
            return response()->json([
                        'status' => 'success'
                            ], 200);
        }
    }
    
    public function deleteTemplate ()
    {
        // Recovering template id
        $target =Input::get('data');      
        
        
       //  DB::enableQueryLog();        
        // Removing template
        $num = DB::update("DELETE FROM templates where id_template = $target");
       // dd(DB::getQueryLog());

        return response () -> json ([
            'borradas' => $num,
            'status' => 'success'
        ],200);
    }
}
