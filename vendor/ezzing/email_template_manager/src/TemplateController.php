<?php
namespace Ezzing\EmailTemplateManager;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Ezz_template;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Validator;

/**
 * This class manages template requests
 */
class TemplateController extends Controller
{
    /**
     * getCreatedTemplates : returns all the created templates
     *
     * @return array : stringified array with id template, name template and created at
     */
    public function getCreatedTemplates ()
    {
        // Get all the templates
        $table = DB::select('select id_template, name_template, created_at, icon from ezz_templates');
        return response()->json([
                    'templates' => $table
                        ], 200);
    }

    
    /**
     * getTemplate: receives id template from front and returns the html of the selected template
     *
     * @param $id : template id sended by front
     * @return array : stringified array with html
     */
    public function getTemplate ($id)
    {
        // Extract html of the selected id
        $selectedHtml = DB::table('ezz_templates')->where('id_template', '=', $id)->pluck('html');
        return response()->json([
                    'templates' => $selectedHtml[0]
                        ], 200);
    }
    
    
    /**
     * getTemplateToEdit: receives id template from front and returns the html_edit and gridster
     * of the selected template to edit it
     *
     * @param $id  : template id sended by front
     * @return array  : stringified array with html_edit and gridster
     */
    public function getTemplateToEdit($id)
    {
        // Extract html_edit and gridster of the selected template to edit
        $selectedHtml = DB::table('ezz_templates')->where('id_template', '=', $id)->select('html_edit', 'gridster')->get();
        return $selectedHtml;
    }
    
    
    /**
     * saveTemplate: receives template data from front, validates the data, and if it is correct, store in the database.
     *
     * @param $template : template data sended by front
     * @return array  : stringified array with status (fail or success)
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
            'gridster' => array('required')
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
            Ezz_template::create(array(
                'name_template' => $template -> name_template,
                'html'          => $html,
                'html_edit'     => $template -> html_edit,
                'icon'          => $template -> icon,
                'gridster'      => $template -> gridster
            ));

            // Returning success message
            return response()->json([
                        'status' => 'success'
                            ], 200);
        }
    }
    
    
    /**
     * updateTemplate: receives data template from front and update it at database
     * 
     * @param $template  : template data sended by front
     * @return array  : stringified array with status (fail or success)
     */
    public function updateTemplate ()
    {
        // Recovering template data object
        $template = json_decode(Input::get('template'));

        //Defining custom validator to work with $template JSON object and not a Request object
        $validator = Validator::make((array)$template, [
            'id' => array('required', 'regex:/^[0-9]+$/'),
            'html' => array('required'),
            'icon' => array('required'),
            'html_edit' => array('required'),
            'gridster' => array('required')
        ]);

        // Returning fail message if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => 'fail'
            ], 200);
        }
        // Replacing template if validation success
        else {
            // If the html have any script tag, delete it
            $html = $template->html;
            if ($html . contains("&lt;script&gt;")) {
                $html = preg_replace('/((&lt;script&gt;){1}.*(&lt;\/script&gt;){1})/', "", $html);
            }

            // Replace the template
            DB::table('ezz_templates')
                ->where('id_template', $template -> id)
                ->update(array(
                    'html'          => $html,
                    'html_edit'     => $template -> html_edit,
                    'icon'          => $template -> icon,
                    'gridster'      => $template -> gridster
                ));

            // Returning success message
            return response()->json([
                'status' => 'success'
            ], 200);
        }
    }
    
    /**
     * deleteTemplate: receives id template from front and delete it from database
     *
     * @param $id  : id data sended by front
     * @return array  : stringified array with status
     */
    public function deleteTemplate ()
    {
        // Recovering template id
        $target =Input::get('data');        
              
        // Removing template
        $num = DB::update("DELETE FROM ezz_templates where id_template = $target");
        return response () -> json ([
            'borradas' => $num,
            'status' => 'success'
        ],200);
    }
}
