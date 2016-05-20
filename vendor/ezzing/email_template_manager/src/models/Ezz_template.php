<?php
/**
 * Created by PhpStorm.
 * User: Rubén Rodríguez Fernández
 * Date: 11/04/16
 * Time: 13:40
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ezz_template extends Model
{

// MASS ASSIGNMENT -------------------------------------------------------
// define which attributes are mass assignable (for security)
// we only want these 3 attributes able to be filled
protected $fillable = array('name_template', 'html', 'icon', 'html_edit', 'gridster');
    
    protected $table = 'ezz_templates';

}

?>
