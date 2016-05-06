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

class MultilanguageController extends Controller
{
    
    /*
     * This function receives code data from front, and returns language keys and language text from the
     * recieved code
     */
    /**
     * @param $code
     * @return mixed
     */
    public function getLanguage($code)
    {
        // Extract the id of the selected language
        $id_language = DB::table('languages')->where('code', '=', $code)->pluck('id_language');

        // Extract the id of the selected language
        $languages = DB::table('languages_text')
            ->where('languages_text.id_language', '=', $id_language)
            ->join('languages', 'languages_text.id_language', '=', 'languages.id_language')
            ->join('languages_keys', 'languages_text.id_key', '=', 'languages_keys.id_key')
            ->pluck('text', 'key');

        return $languages;
    }
}
