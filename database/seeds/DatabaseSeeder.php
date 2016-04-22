<?php

use App\Models\Template;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

        Eloquent::unguard();

        // call our class and run our seeds
        $this->call('TemplateAppSeeder');

        // show information in the command line after everything is run
        $this->command->info('');
        $this->command->info('*********************************************');
        $this->command->info('******        App seeds finished       ******');
        $this->command->info('*********************************************');
        $this->command->info('');

    }
}

// our own seeder class
// usually this would be its own file
class TemplateAppSeeder extends Seeder {

        public function run() {

            // clear our database ------------------------------------------
            DB::table('templates')->delete();

            // seed our templates table -----------------------
            // we'll create three different templates

            // template 1 is named Template 1 EXAMPLE
            Template::create(array(
                'name_template' => 'Template 1',
                'html'          => '<h1>Template nº1</h1><h2>I am the first template</h2><p>This are my variables:<br>Name: {{name1}}<br>Surname: {{surname1}}<br>Email: {{email1}}</p>',
                'icon'          => '/app/img/plantilla.png'
            ));

            // template 2 is named Template 2 EXAMPLE
            Template::create(array(
                'name_template' => 'Template 2',
                'html'          => '<h1>Template nº2</h1><h2>I am the first template</h2><p>This are my variables:<br>Name: {{name2}}<br>Surname: {{surname2}}<br>Email: {{email2}}</p>',
                'icon'          => '/app/img/plantilla.png'
            ));

            // template 3 is named Template 3 EXAMPLE
            Template::create(array(
                'name_template' => 'Template 3',
                'html'          => '<h1>Template nº3</h1><h2>I am the first template</h2><p>This are my variables:<br>Name: {{name3}}<br>Surname: {{surname3}}<br>Email: {{email3}}</p>',
                'icon'          => '/app/img/template.png'
            ));

            // show information in the command line after templates are created
            $this->command->info('');
            $this->command->info('*********************************************');
            $this->command->info('******   Template app seeds finished   ******');
            $this->command->info('*********************************************');
            $this->command->info('');

    }

}
