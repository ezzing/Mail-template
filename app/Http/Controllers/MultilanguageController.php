<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Language;
use App\Models\LanguageKey;
use App\Models\LanguageText;
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
        $id_language = DB::table('languages')->where('code', '=', $code)->pluck('id_language');
        // Create json withs keys and text associated to selected language
        $languages = DB::table('languages_text')
            ->where('languages_text.id_language', '=', $id_language)
            ->join('languages', 'languages_text.id_language', '=', 'languages.id_language')
            ->join('languages_keys', 'languages_text.id_key', '=', 'languages_keys.id_key')
            ->pluck('text', 'key');
        return $languages;
    }
}
