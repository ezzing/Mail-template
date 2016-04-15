<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Template;
use Illuminate\Support\Facades\DB;

class TemplateController extends Controller
{
    public function getAllTemplates()
    {
        $table = Template::all();
        return response()->json([
            'templates' => $table
        ], 200);
    }

    public function getCreatedTemplates()
    {
        $table = DB::select('select id_template, name_template, created_at, icon from templates');
        return response()->json([
            'templates' => $table
        ], 200);
    }

    public function getTemplate($id)
    {
        $selectedHtml = DB::table('templates')->where('id_template', '=', $id)->pluck('html');

        return response()->json([
            'templates' => $selectedHtml[0]
        ], 200);
    }
}
