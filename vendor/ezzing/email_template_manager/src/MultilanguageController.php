<?php
namespace Ezzing\EmailTemplateManager;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Ezz_language;
use App\Models\Ezz_languageKey;
use App\Models\Ezz_languageText;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Validator;


/**
 * This class manages language requests
 */
class MultilanguageController extends Controller
{
    /**getLanguage : receives lang code from front and returns associated language keys and text
     *
     * @param $code --> language coded sended by front
     * @return array --> stringified array with keys and texts
     */
    public function getLanguage()
    {
        // get language selected on front
        $code = Input::get('lang');
        // Extract the id of the selected language
        $id_language = DB::table('ezz_languages')->where('code', '=', $code)->pluck('id_language');

        // Create json withs keys and text associated to selected language
        $languages = DB::table('ezz_languages_text')
            ->where('ezz_languages_text.id_language', '=', $id_language)
            ->join('ezz_languages', 'ezz_languages_text.id_language', '=', 'ezz_languages.id_language')
            ->join('ezz_languages_keys', 'ezz_languages_text.id_key', '=', 'ezz_languages_keys.id_key')
            ->pluck('text', 'key');
        return $languages;
    }
}
