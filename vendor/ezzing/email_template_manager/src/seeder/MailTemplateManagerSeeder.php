<?php

use App\Models\Ezz_template;
use App\Models\Ezz_language;
use App\Models\Ezz_languageKey;
use App\Models\Ezz_languageText;
use Illuminate\Database\Seeder;


class MailTemplateManagerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Eloquent::unguard();

        // call our class and run our seeds
        $this->call('TemplateAppSeeder');
        $this->call('LanguageAppSeeder');
        $this->call('LanguageKeyAppSeeder');
        $this->call('LanguageTextAppSeeder');

        // show information in the command line after everything is run
        $this->command->info('');
        $this->command->info('*********************************************');
        $this->command->info('******        App seeds finished       ******');
        $this->command->info('*********************************************');
        $this->command->info('');

    }
}

// Seed the table language_text
class LanguageTextAppSeeder extends Seeder
{

    public function run()
    {
        // clear our database ------------------------------------------
        DB::table('ezz_languages_text')->delete();

        // seed our templates table -----------------------

        // back key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '1',
            'text' => 'Back'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '1',
            'text' => 'Atras'
        ));
        // big_title key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '2',
            'text' => 'Big title'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '2',
            'text' => 'Título grande'
        ));
        // choose_image key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '3',
            'text' => 'Choose image'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '3',
            'text' => 'Elegir imagen'
        ));
        // close key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '4',
            'text' => 'Close'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '4',
            'text' => 'Cerrar'
        ));
        // date key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '5',
            'text' => 'Date'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '5',
            'text' => 'Fecha'
        ));
        // email key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '6',
            'text' => 'Email'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '6',
            'text' => 'Email'
        ));
        // email_settings key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '7',
            'text' => 'Email settings'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '7',
            'text' => 'Ajustes de Email'
        ));
        // image_settings key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '8',
            'text' => 'Image settings'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '8',
            'text' => 'Ajustes de imagen'
        ));
        // new key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '9',
            'text' => 'New'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '9',
            'text' => 'Nuevo'
        ));
        // new_template key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '10',
            'text' => 'Create a new template'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '10',
            'text' => 'Crear una nueva plantilla'
        ));
        // no_input_files key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '11',
            'text' => 'No selected files'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '11',
            'text' => 'Ningún archivo seleccionado'
        ));
        // middle_title key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '12',
            'text' => 'Middle title'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '12',
            'text' => 'Título medio'
        ));
        // paragraph key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '13',
            'text' => 'Paragraph'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '13',
            'text' => 'Párrafo'
        ));
        // replace_template key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '14',
            'text' => 'Replace the template'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '14',
            'text' => 'Reemplazar la plantilla'
        ));
        // replace_template_question key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '15',
            'text' => 'Do you want to replace the template?'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '15',
            'text' => '¿Quiere reemplazar la plantilla?'
        ));
        // save key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '16',
            'text' => 'Save'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '16',
            'text' => 'Guardar'
        ));
        // save_template key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '17',
            'text' => 'Save template'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '17',
            'text' => 'Guardar plantilla'
        ));
        // send key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '18',
            'text' => 'Send'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '18',
            'text' => 'Enviar'
        ));
        // small_title key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '19',
            'text' => 'Small title'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '19',
            'text' => 'Título pequeño'
        ));
        // subject key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '20',
            'text' => 'Subject'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '20',
            'text' => 'Asunto'
        ));
        // template_name key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '21',
            'text' => 'Template name'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '21',
            'text' => 'Nombre de la plantilla'
        ));
        // title_mail key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '22',
            'text' => 'Mail generator'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '22',
            'text' => 'Generador de E-mails'
        ));
        // title_template key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '23',
            'text' => 'Mail template generator'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '23',
            'text' => 'Generador de plantillas de E-mails'
        ));
        // variable key
        Ezz_languageText::create(array(
            'id_language' => '1',
            'id_key' => '24',
            'text' => 'Variables'
        ));
        Ezz_languageText::create(array(
            'id_language' => '2',
            'id_key' => '24',
            'text' => 'Variables'
        ));

        // show information in the command line after templates are created
        $this->command->info('');
        $this->command->info('*********************************************');
        $this->command->info('****  Languages Text app seeds finished  ****');
        $this->command->info('*********************************************');
        $this->command->info('');

    }
}

// Seed the table Language_keys
class LanguageKeyAppSeeder extends Seeder
{

    public function run()
    {
        // clear our database ------------------------------------------
        DB::table('ezz_languages_keys')->delete();

        // seed our templates table -----------------------

        Ezz_languageKey::create(array(
            'key' => 'back'
        ));
        Ezz_languageKey::create(array(
            'key' => 'big_title'
        ));
        Ezz_languageKey::create(array(
            'key' => 'choose_image'
        ));
        Ezz_languageKey::create(array(
            'key' => 'close'
        ));
        Ezz_languageKey::create(array(
            'key' => 'date'
        ));
        Ezz_languageKey::create(array(
            'key' => 'email'
        ));
        Ezz_languageKey::create(array(
            'key' => 'email_settings'
        ));
        Ezz_languageKey::create(array(
            'key' => 'image_settings'
        ));
        Ezz_languageKey::create(array(
            'key' => 'new'
        ));
        Ezz_languageKey::create(array(
            'key' => 'new_template'
        ));
        Ezz_languageKey::create(array(
            'key' => 'no_input_files'
        ));
        Ezz_languageKey::create(array(
            'key' => 'middle_title'
        ));
        Ezz_languageKey::create(array(
            'key' => 'paragraph'
        ));
        Ezz_languageKey::create(array(
            'key' => 'replace_template'
        ));
        Ezz_languageKey::create(array(
            'key' => 'replace_template_question'
        ));
        Ezz_languageKey::create(array(
            'key' => 'save'
        ));
        Ezz_languageKey::create(array(
            'key' => 'save_template'
        ));
        Ezz_languageKey::create(array(
            'key' => 'send'
        ));
        Ezz_languageKey::create(array(
            'key' => 'small_title'
        ));
        Ezz_languageKey::create(array(
            'key' => 'subject'
        ));
        Ezz_languageKey::create(array(
            'key' => 'template_name'
        ));
        Ezz_languageKey::create(array(
            'key' => 'title_mail'
        ));
        Ezz_languageKey::create(array(
            'key' => 'title_template'
        ));
        Ezz_languageKey::create(array(
            'key' => 'variables'
        ));

        // show information in the command line after templates are created
        $this->command->info('');
        $this->command->info('*********************************************');
        $this->command->info('***   Languages Keys app seeds finished   ***');
        $this->command->info('*********************************************');
        $this->command->info('');

    }
}

// Seed the table Language
class LanguageAppSeeder extends Seeder
{

    public function run()
    {
        // clear our database ------------------------------------------
        DB::table('ezz_languages')->delete();

        // seed our templates table -----------------------

        Ezz_language::create(array(
            'code' => 'en',
            'language' => 'English'
        ));

        Ezz_language::create(array(
            'code' => 'es',
            'language' => 'Spanish'
        ));

        // show information in the command line after templates are created
        $this->command->info('');
        $this->command->info('*********************************************');
        $this->command->info('******  Languages app seeds finished   ******');
        $this->command->info('*********************************************');
        $this->command->info('');

    }
}


// Seed the table Templates
class TemplateAppSeeder extends Seeder {

        public function run() {

            // clear our database ------------------------------------------
            DB::table('ezz_templates')->delete();

            // seed our templates table -----------------------
            // we'll create three different templates

            // template 1 is named Template 1 EXAMPLE
            Ezz_template::create(array(
                'name_template' => 'Template 1',
                'html'          => '<h1>Template nº1</h1><h2>I am the first template</h2><p>This are my variables:<br>Name: {{name1}}<br>Surname: {{surname1}}<br>Email: {{email1}}</p>',
                'icon'          => 'data:image/png;base64,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',
                'gridster' => 'gridster'
            ));

            // template 2 is named Template 2 EXAMPLE
            Ezz_template::create(array(
                'name_template' => 'Template 2',
                'html'          => '<h1>Template nº2</h1><h2>I am the first template</h2><p>This are my variables:<br>Name: {{name2}}<br>Surname: {{surname2}}<br>Email: {{email2}}</p>',
                'icon'          => 'data:image/png;base64,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',
                'gridster' => 'gridster'
            ));

            // template 3 is named Template 3 EXAMPLE
            Ezz_template::create(array(
                'name_template' => 'Template 3',
                'html'          => '<h1>Template nº3</h1><h2>I am the first template</h2><p>This are my variables:<br>Name: {{name3}}<br>Surname: {{surname3}}<br>Email: {{email3}}</p>',
                'icon'          => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA8kAAADFCAYAAABn5rB/AAAgAElEQVR4Xu3dCZRcRdk38Oe53ZMZMyExCSQIAQJGE5ww3bdKeEEWg4qsCgoK7oIosor4iogoCIgosqsfivuGiqCAbCKrCopU3Z6G0YiDBERkcZAEEmbSfe/znWfe23M6zcx0T9Kzkf89x3NI912qflVzjv+uulVMOCAAAQhAAAIQgAAEIAABCEAAAhAYEGA4QAACEIAABCAAAQhAAAIQgAAEIPB/AgjJ6AkQgAAEIAABCEAAAhCAAAQgAIFUACEZXQECEIAABCAAAQhAAAIQgAAEIICQjD4AAQhAAAIQgAAEIAABCEAAAhBYVwAjyePUI6y1mxLR05XH9fX1vaK7u/uJcXo8HgMBCEAAAhCAAAQgAAEIQAACDQgMhGRr7a+I6MAGzm/oFBG5ynt/SEMnbyQnISSPfUMvWbJk7vTp009i5rcQ0UIiahGRJ5j5ziRJLoyiqGukUuTz+ddlMpn3isiuzLwNEbUT0UoReYyIficiP4mi6J6xrwmeAAEIQAACEIAABCAAAQhMlABC8jjJT1RINsZ8UAOjiPw6iqL7xqm64/6YXC4XZjKZm5h5XvrwmIj6iWi6/ltEEiI6xnv/jdrCdXR0bN7W1vZtItqvgYLfUCqVDi8Wi081cC5OgQAEIAABCEAAAhCAAASmmEAlJF9MRG8coextRPTKyvci8ndmXjvc+SLyG+/9SVPMYkyLO4Eh+UkNjkmSHB1F0WVjWskJunlHR8eM1tbWB9LR338mSfK+tWvX3tPd3V3K5XKvymQyX2PmNxFRnCTJztU/FixdunR+a2vrH6r7dzp63MXMz4vIZkSUY+ZpVdV7YOXKlbv29PSsmqAq47EQgAAEIAABCEAAAhCAwBgJNPROcj6fz2cymaiqDNs755aPUZlekrediJAchuE2QRCsUNCXcki21p5ARPpDj9bzTVEU3VrdiXbYYYfZ06ZNe5iIZonIz7z3h1W+N8Zcm07P1o9eSJLkpLVr136nu7t78Eegjo6OOW1tbWcT0dFV9z3XOffpl2RnRaUgAAEIQAACEIAABCCwEQsgJI9T409QSD4kCIIrN4KQfBsR7UlETzjnttDZ1bXNaoy5gpk1HK90zr1cvw/DMBcEQaFybhzHBxUKhWuG6xLW2p8T0Tv0exF52ns/f6hnjVOXwmMgAAEIQAACEIAABCAAgTEQQEgeA9ShbjkRIdkY8yVmPnkjCMm9RDSHiG5xzr15GP/PEtGZ+l25XF7Q1dX1L2PM6cx8Rhp67/Hev26k7pDL5XbKZrN/qgrVry4UCn8fpy6Ex0AAAhCAAAQgAAEIQAAC4yAw5iF5hx122C6bzR7JzHsy86J0yuuzRPRvIrotjuMrurq67h2urmEYbhYEQWWRJB0pfIWem8vlOrLZ7KlE9AYimqsje0Sk70p/0zn3M33/tHLPMAxfy8yfZObXp+c+R0RFIvqe9/4HOku39vn5fF7fZX0w/fw/zjl9N1VXAjciclR6ry1EhJn5cRG5RUS+HkXRXzY0JC9cuLBt9uzZ72TmA5k5R0S6GNV0EXmOmf8pIvcw83ecc4OBrfqZxpjnmVlXZh7u6HXO6ZZULzo2tL0a7bPDtWtnZ+e8lpaW40Xk7cy8rYhk0q2z7hWRy6MourHmGYExpqyNICI/994fOlQZwjA8PgiCS/S7Uqm0Q7FYfCAMw8O0XxKRWtzkvb98pPIvWLDgZfPnz19TOSeO410LhcLdjdYZ50EAAhCAAAQgAAEIQAACk19gLENyxhhzLjN/nIg06Ax7iMj3mPlY59xgAKmcvHjx4k1mzJhRWSDpOefczDAM3xUEwQ+Hu291WDLGnMrMXxju4SLyQ+/9+2u/X7p06Vatra2Ppp+XnHPTjDHHMfNFIzxX32M9YagVlBsdSdZAHwSBhvztGug+33LO6Xuy5epz1zMkN6W9GijzwClDtasxZndmvk5/SBmhvS6sWRSuoZBc/d5yJSQ3WtbKefl8/uWZTOa/lX+v731G+1ycDwEIQAACEIAABCAAAQiMn8CYhWRrrb4LW71Xsiei34iIjgrPJaI9mHn3SlVF5GZdQMk5V6qufkdHx7S2tjbdymdgGx9dnTiTyehetWtF5CYiWsHMej/dvmdwdFREDmXmmUR0uYisZmYdgXxUVytmZj1Xr6kcb3PO6V7Rg4e1VkesH68qn95Pw6uWQ0cPC8xcFpHF6crJAz8EaBlF5IDaEc9GQnJnZ+e2LS0t+o6slluPWERuZ+a/iIiGMy3zG5l5+6qiXuqc04Wrqsv+Ad0jmIg+SUSvTsv1I90vOP3vPu/9j2quaUp7Ndp1a9uVmTuISPvIy0TkPmb+s4j06WgyEe2tn1funSTJgVEUXVv5t7V2YLq1iPzWe7/XUGUwxpzBzKfrd319fa/o7u5+otGyVs4zxhyQhnhtZx2tn1PbX0d7T5wPAQhAAAIQgAAEIAABCEwugTEJydVTW3V2q4gc7r3/cW3VrbX6/qiGs0oo/KRz7is15wXW2sGp0yLimLktjuMDCoXCwMrNeqSjfBqel6Qf6fTcVxHRP0TkrVEUDQbedLViPbcSIK/13h9Y/dx02u+TVZ/9W0SyRPRW7/0fq881xnQS0Y3MrItG6fGgc+411VO+GwnJ1tqfENG79AYi8niSJMuGeufVWnsWEZ2WPiuO43j7oc4zxtyRTgsfcXXrJrdXoz18nXYloj+JyKuTJDm0UCjcUn0TXaWbmf/AzFumn6/z7rG19nYiWqY/wHjvNx9qMS1r7S+J6KD0HF1wa1SH9q8gCO6u/EAhIhd7708c1U1wMgQgAAEIQAACEIAABCAw6QWaHpL1fdo5c+Y8onvzpmHveO/9V4eTMMa8l5l16rQeK3t7ezdfsWJFX/X51trB1YpFREeVl3rve2rvGYbh+4Ig0HeMBw4dQS6Xy0uKxeJjtecaYw7X93rT8zRcrROcakNtet4+3vubh6qLMWZvZtaR7cqz1zm3Xki21urIr76rPT191keHmrad3p6ttX/VWcvpuSd7788boo51Q/JYtFejvb6mXbWN3+S915WqX3QYY45l5ko/WuOc26TyLrkx5kRmvjC12Nd7P9gO+ln6g4duAaXvdV/uvf/IKMo4S0eumfnzzLwwfYbr7+9f1t3d/Xyj98F5EIAABCAAAQhAAAIQgMDUEGh6SE7fF9YRUT3+6ZzTYPGihbGqePSd0ocqAWSobXhqwtSPvffvHYpXF52aNm3aQ1Xf6Tu7Hx7q3Fwu9+psNvu3qu/aq9+Jrg21OoLtvX/tSM1qrdX7VUan13l3tl5I1vecjTEdIjIvCIJ5SZLcEkWRLkY25GGt/XrVvr3fd859sPbERkaSx6K9Gu36Ne2qC2ftO0J9dYaA/jAwcJRKpa0qP34sWrRo5qxZs7qJaAERPZYkyXuiKNIp8Ukul9s+m81eRkS76T7IcRznRlqRurOzc3FLS8tVIhKkP/QMTstPf6C5vL+//9MIyI22Ms6DAAQgAAEIQAACEIDA1BJoekg2xnyDmSsjdf/POXdMPZLqwDfUNNaaMPW+2vdpK/evXX2YiN7pnBvYJ7j2qFk4SkPX/GKxWFlFW1ex1vebB0OqiJzmvR92ATC9v7VWV0c+Mn3W7c45XXl74GggJNdjWuf7mu2LXjRdXE9uJCSPRXs1WpGadj3Ke//N4a7t7Oxsb2lpGRy5TZKko3ol8Xw+v2Mmk9H3zgdCrYjoImq69Hhr5d8iouH5FyOVL5/P5zOZTFR7jojcJiJnRlE08F43DghAAAIQgAAEIAABCEDgpSkwFiFZF12yypUkySeiKLqgHp21VoP019Iw86LFl6rDVBzHOxUKhT8Pc0+dhjw4ah3HcVgoFHQhrBcd6fRmDVIDR/XIpP57iOnWBzjnrh+pLsYY3Wbqy+k5jzrntqmcvz4hWYN8e3u7boM0W9/DJqLB9mJmfXe5sir39c65A2rL1mBIbnp71WvvKpPBafQNbKdUt22XLl06f9q0af9LRPszs9qrl27PdWscx+d3dXVVtvQatojDheSqC3wcx58oFAp3NFpPnAcBCEAAAhCAAAQgAAEITB2Bpodka+0jRLT1+hKIyF+997ro1eBRHZLL5fLikcJO9blr16595f333/+PYcqStdYOrqRdLyQ3st1P9TvR+j60937GaENyOsJ9rIi8i5l1QbBGjvUOyWPRXo0UWM+pbqvakeGh7lHzY8mwP4A0+vw652ko1/23dS/s1zHzR9M9qwdWMCeiD3nvv9ekZ+E2EIAABCAAAQhAAAIQgMAkERiLkLyyarXq9anmY865rYYLybpi9VCLdlWF0erRyW2rV8CuKcyoQnIcxyPda+DWYRgeEgTBwPRuERHvvW4LNVCeRkaSc7lcRyaT+XXl/exR4G1ISG56ezVa7urQS0TbO+eWj3TtOIfk2qLoO+PnM/PH0vbtL5fLuWKxWP1ee6NVx3kQgAAEIAABCEAAAhCAwCQVaHpINsb8l5lfntb3VyLSNcq66wjsOis117y7OiEhuVwuL+jq6vpXnRD3DiL6eXpO7JzTLaMGjnohOd1iSPderkzRfkFEvsrM1/b39z/S2traW72wWBiGpwVBoFtB6bHeIXks2qvR9p5iIVmrxcaYP1deJxCRr3vvj220vjgPAhCAAAQgAAEIQAACEJj8AmMRkldUgl6SJEdHUaQrC2/QMRlCchzHrx5pVWStYM0WVM855yr7P9cNycaYU5l5YGEwXUVZ9zd2zv1pODhr7WeJ6MwmhOSmt1ejjT0FQ7IuhnYyM38pbae/eO87Gq0vzoMABCAAAQhAAAIQgAAEJr/AWITku5l5lzREfMF7f9qGMkyGkExEuzvnfj9SXaoX7hKRHu/9qyrn1xtJNsbcy8w7pufXXRXcGPM1Zq6sHL4hI8lNb69G23sShORsLpebHwTBK+I4/muxWFxdr+xhGL4/CILvp/37ae/9wH7gOCAAAQhAAAIQgAAEIACBl4bAWIRknSI8MAVVRG703u+3oVSTISSLyIhbFGkdq7dTEpGbvff7NBqSrbVPENF8PT9JkndHUXRFnUDezcyVBc42JCQ3vb0abe+JDMnpllL6Pra+N96QedrGH2fmgRXba38IabTeOA8CEIAABCAAAQhAAAIQmLwCTQ/JYRgeHATBwF60Om14zZo1Wy5fvrx3JALd41ZEuKurS7d2Glx4qypgDn42UQt3EdE1zrmDRhFcz3LOfW4UIXlwAa0kSQ6Jouiq4Z6Vz+f3ymQyv6n6fr1D8li0V6PdfSJDspbRWns/ES1N++pPvfe6rdaIhzHmWmZ+S3pNU34EqvdMfA8BCEAAAhCAAAQgAAEIjJ9A00NyR0fHtNbW1seYebO0GiNOHbbWTieiIhG9UkSeIqK9vPf678FjMowkE1GZiHYYbgVma+1uRPS7SqHjON6tUCj8YRQhWVd2XqznJ0ny2SiKzh6qG6TTtu9Nt9kaGAUVkbu896+vPd9aexsR7Zne85Qoigbepa0+xqK9Gu2+kyAkV7/XHYvInt77wTasrUcYhq9n5tuZeeDvRkSO894P7O+NAwIQgAAEIAABCEAAAhB4aQg0PSQri7X2aCL6eoVIRD7vvdeVmONqtjAMt2HmKyrvMBPR/c65XO1o8iQJyb0i8mS5XN67WCw+Vl0Pa+3WInIrMy9Kw5Pz3r+25pxNiejpymd9fX2v6O7u1inWA4e19nIiOjL955OlUqmzWCzqjwaDhzGmk5l/QkTbicjZVQt96Yri851zg/s+p/f8JRENjH7XTv+uKVtT26vRP41JEJJnEVEPEWnb6PFckiQnP/fcc9/t6enpr9Qj/SHhg8z8FSLapKqNXtnIe8yNeuA8CEAAAhCAAAQgAAEIQGDiBcYkJOtWOdZa3QrpkEoVReQRIvo1ET3OzHOIaAkR6Tu7A6OhRPRCuVxe1tXVpaOk6xyTISSLyBHM/B0R0cWdNHzqaLeOLm/PzIdW7Q1diuN4WaFQuLsmiI4YksMwzAVB4Ko8/iMi+ryHgyCYLSJ7MPNe6ffHxnF8SyaTebDK90adEp4kyQOVEeyaFbD11HtFpJuINovj+HNdXV1Ren1T26vRbj3RIVnLmc/nlwVBcBMzt1aVe42IaPtWpsDrjxPtVd+XkiTZN4qiWxutK86DAAQgAAEIQAACEIAABKaGwFiFZK19xlr7ZSI6gYgG9wseikVE/k5E7/fe/3Go7ydDSO7r65s7bdq0DwdBoNs0VYJ9bXHXJEnyoSiKfjpE0B8xJOv5xpjjiOiSynTeISzKSZIcX9lWy1qr7yVrcB48RGRwRfEwDLcIguAvRKQjprVH7WrdTWuvRrv+ZAjJWtYwDF8bBMGPKtPdRyq/iKwQkQ9EUXRXo/XEeRCAAAQgAAEIQAACEIDA1BEYy5A8oJDP518VBIFOVX2TiCxkZh0V1X2AdSqxS5Lkl2vXrr2qu7t77XBskyEkl0ql+Tr92Vpr0mnR+q7vlrrgGDM/ptOZkyT52nB7KdfbAqpS9zAMd2HmE4loV2bW7YV0tFpH4W8gooudc49Wzs3lcltmMhmd1v4GZg50tWVmPt0596vKOVpeEflyOqVdR0ufFpEuXYHcOfdQrXkz2qvR7j9ZQnJa3sBaezARHUBE/yMi85hZp1brzIEnRUQXlbuOma+undbeaH1xHgQgAAEIQAACEIAABCAw+QUaCsmTvxrNL2Gjobb5T8YdIQABCEAAAhCAAAQgAAEIQGCiBBCSh5FHSJ6oLonnQgACEIAABCAAAQhAAAIQmDgBhGSE5InrfXgyBCAAAQhAAAIQgAAEIACBSSaAkIyQPMm6JIoDAQhAAAIQgAAEIAABCEBg4gQQkhGSJ6734ckQgAAEIAABCEAAAhCAAAQmmQBCMkLyJOuSKA4EIAABCEAAAhCAAAQgAIGJE0BIRkieuN6HJ0MAAhCAAAQgAAEIQAACEJhkAgjJCMmTrEuiOBCAAAQgAAEIQAACEIAABCZOACF54uzxZAhAAAIQgAAEIAABCEAAAhCYZAIIyZOsQVAcCEAAAhCAAAQgAAEIQAACEJg4AYTkibPHkyEAAQhAAAIQgAAEIAABCEBgkgkgJE+yBkFxIAABCEAAAhCAAAQgAAEIQGDiBBCSJ84eT4YABCAAAQhAAAIQgAAEIACBSSaAkDzJGgTFgQAEIAABCEAAAhCAAAQgAIGJE0BInjh7PBkCEIAABCAAAQhAAAIQgAAEJpkAQvIkaxAUBwIQgAAEIAABCEAAAhCAAAQmTgAheeLs8WQIQAACEIAABCAAAQhAAAIQmGQCCMmTrEFQHAhAAAIQgAAEIAABCEAAAhCYOAGE5Imzx5MhAAEIQAACEIAABCAAAQhAYJIJICRPsgZBcSAAAQhAAAIQgAAEIAABCEBg4gQQkifOHk+GAAQgAAEIQAACEIAABCAAgUkmgJA8yRoExYEABCAAAQhAAAIQgAAEIACBiRNASJ44ezwZAhCAAAQgAAEIQAACEIAABCaZAELyJGsQFAcCEIAABCAAAQhAAAIQgAAEJk4AIXni7PFkCEAAAhCAAAQgAAEIQAACEJhkAgjJk6xBUBwIQAACEIAABCAAAQhAAAIQmDgBhOSJs8eTIQABCEAAAhCAAAQgAAEIQGCSCSAkT7IGQXEgAAEIQAACEIAABCAAAQhAYOIEEJInzh5PhgAEIAABCEAAAhCAAAQgAIFJJoCQPMkaBMWBAAQgAAEIQAACEIAABCAAgYkTQEieOHs8GQIQgAAEIAABCEAAAhCAAAQmmQBC8iRrEBQHAhCAAAQgAAEIQAACEIAABCZOACF5PeyNMccx86V6qYjs4r3/43rcZtwusdYeJCKnMnOHiGSJyHvvdzHGnMHMp6f1eJX3vmfcCoUHNVUgDMPTgiA4K73p9s655U19AG4GAQhAAAIQgAAEIACBjUQAIXk9GnoqheQwDN/IzLcw82Bbi8gj3vuFCMnr0fiT9BKE5EnaMCgWBCAAAQhAAAIQgMCUE1gnJBtjfsvMb9RaxHE8u1AoPDvlatSkAudyuTCTyRwYx/ENXV1d91bfdiqFZGPMFcx8WFr+T/b19f2ora2NnXP/zufzy4IgWKbf9ff3X9Ld3f1Mk/gavs1Izo3cZEOvb+QZU+GcsQ7JcJ4KvQBlhAAEIAABCEAAAhBohgBC8jCK1trziegkETnee//VqRqSrbU6Ffx/iOgx59xWzeg0zbzHSM6NPGdDr2/kGVPhnLEOyXCeCr0AZYQABCAAAQhAAAIQaIYAQvIwisaYu5l5l5dASP4rES0RkT9773dqRqdp5j1Gcm7kORt6fSPPmArnjHVIhvNU6AUoIwQgAAEIQAACEIBAMwQQkodQ7OjomNba2rqKmVvrhWQi2tk596dmNMZY3MNaqws4LSaiPznndh6LZ6zvPes517vvhl5f7/5T6fuxDMlwnko9AWWFAAQgAAEIQAACENhQgTEJydbaTZMk+WgQBHvrKCYRzSKikog8zsx/KJfLX699z1crYoz5DDOfrf/tnGvp6OhomzZt2olBEBwqItsS0RpmfkBELvDe/1rPW7hwYducOXOOZub3EtEiEckQ0XIR+VYURZeNBqijo2NGW1vbc8NdIyLv897/qPqd5DiOdyoUCs4Y8yEiOpyZXy0imzDzUyJyOxF90Xuvo7nDHWyM2Z+ZP0BEO4nIfGZeKyJPMvOdSZJ8O4qie0ZTD/UnoqdHqEfdhbustZ8lojPTtgiMMdqOF2oZmXm2c26w76Qh6oNE9HZm7hSROcwcENF/iOh+Ebn6mWee+f6KFSv69H6NOg9X/vW8fr2cx6NPGmO+xMwna337+vpay+Vy64wZMz5JRG8joq2JSFck/6eIXMvMX3bOqes6RyMhebR/l+PpPJr+jXMhAAEIQAACEIAABCAwlgJND8lhGL6emX/FzC8fIaQlRHSK9/686nOstZ8goq/oZ0mSbMnMVzHzi0Y/5f+O96xdu/a61tbW65l5j6GeJSLneO8/0yigtXY6Ef2DiFqIaE56nYbmNWmZjo2i6KqahbteS0SnM/NbhinD8yKyZxRF99V+v2jRopmzZs36CRHtX/Vdn4hMS0Nm5eNLnXMf0x2nGqlLR0fHnLa2tr+k52pg1h8OSkQ0sDCXiPzTe7/jSKtbG2NOZuYv6fnlcnlBNpvVd5sXVJ5fCclhGG4WBMFviChf+U4bR/+7ekVtDctJkrwxiqKnG3Uerq6jvX5DnMejT1pr9ccI/VFCF8x7dSaT+aX+ljBM/Z8sl8t7dHV1PVj9fb2QvD5/l+Pp3Ei/xjkQgAAEIAABCEAAAhAYD4GmhuTFixdv0t7e/hAzbyYiOhr6v0R0VRRFTy5ZsuTlbW1tuwVB8BVmXpSGztdVj5JaazUIXpRW/Ardg1hEPrZmzZrbmXna9OnTD2ZmXURLQ+zDRHQTEb0jSZKT1q5de31/f3951qxZbxCR7+hoZxoMtxhq5G0kXGPMzsw8MHrbwHTra4joDUmSnFEqla589tln/zN//vxtiEgD/5HpPe703g+sIl11sLVWR8P302ykI85Jkujo96OLFi2aNnPmzKVEdBYz75tanRlF0cCexqM5RppuXSckn8jMOnKsBhcy8/FE9D0iiohounNu4McMa61+9oE0GJ9ZLpe/XywW/6nf5XK57bLZ7BEi8sk09F/pnHtnpfz1nOvVs8HrN8h5PPqktfZzRPT51Po2Igr1R6RyuXxDS0vLM6VSSR1PYeb3pCYF55yp/tFkpJC8oX+X4+Fcr63xPQQgAAEIQAACEIAABMZLoKkh2VqrU4Y1NGmw+rz3/ozainR2di5taWm5P/382865gSCpR80I7fNJkuxQKBRWVN/DGPNNZv5w+owkjuNdaqduh2F4UhAEujq1jki/I4qiX4wGtF4oqC6nDrQmSbLHUFOijTH3MvOOIpI888wz7ZXpxmlddWryVWk9jvLef3OoMhpjrmHmt6Y/OmwbRdHjo6nL+obkMAyPD4LgkvRZvSLyEe/91bXPttauJKKZOqXae3/wUGULw/CcIAh0OvGK3t7epRWHes716tnI9caYDXIejz5ZHXC1r4jIbkP1J2vt9emPKvr3ta/3Xn8kGjhGCslN+Lsc8Uej8ezP9foEvocABCAAAQhAAAIQgMCGCjQ1JOuIVVtb29Y6kpwkyV+KxeJTQxXQWqtB7xVEdK9zTrcnGjhqAslXvfc6ernOYYx5DzP/SD8UkZu99/sMcY5l5oHpzSLyKe/9l0cDVS981YTk7zvn9H3cFx1pOPy0fqGjgcViUUe/K3Wt7En9kHNuYGR9qMMYM1gXIjrROXfxaOqyviG5po53OOf2HOK5+q5yKR0l/pZzbuDHi9rDWtvinNMp2OXq7+o516tnI9dX7f29Xs7j0SdrQvJ13vu3DuOobaAjzXpckk7BH/hHvZHkDfy7bCQkj0t/rtcn8D0EIAABCEAAAhCAAAQ2VKCpIbnRwhhjupn5NbrAlnNu+8p1NYHk4KFGLvP5/F6ZTEbfgdXjVOfcF2ufu3Tp0q1aW1sfTT8/yzmn01kbPuqFr5pyHua9/9lQNzfGVE9Z3sV7r+/16hRlnS6uI7AvE5Efe+910bHhDl1w6jlmbheRn3rv39VwRf7vWcOubl1nuvVxzHxp+qxPVqZX1z7bWquzAnRq+Asicrj3/kodwG+kjPWc692j3vXNcB6PPlkdcJMkOXq4BefSRepWpz9K3O6ce0PFqN47yfUs9fsR/i5HDMnNcG6kfDgHAhCAAAQgAAEIQAAC4yEwJiE5DMNtmPlQ/f/dzDyPiDZL3yMeqJOuVK3vGBPR35xzumrywFEdSJIkWed95co5+Xx+WSaT0VWj9T5HeO+/WwvV0dGxeVtb27/Tc77gvT9tNJj1wlfNKOvuzrnfD3X/4c7L5/MLM5nM4KjyKMq2zsh7I9c1IySPNFCEEPAAACAASURBVGU9DMN9gyC4Nl2BWYv0GBFdlyTJXXEc3zbcbIK0veuOUI5Ux3rt1Azn8eiTNSF5WRRFdw5Xb2vtE0Q0X0R6vPevqpzXSEjegL/LEdupGc6N9GWcAwEIQAACEIAABCAAgfEQaHpINsboSs8aSnXbmnrHSCF5x6FWhK4JyQNbMk1kSNbFxSojxLXlGC4k53K5MJvN+no4Q3y/jlcj1zcpJL8+iqK7hnteGIZ7BEFwDhHtWn1OupjXfen0eJ2OPbBKeOWoF3Lr1a/e9c1wrgnJY9InqwNuHMdhoVAoDFd3Y8zf04Xv/u2c26LRkLyBf5cjhuRmONdra3wPAQhAAAIQgAAEIACB8RJoaki21p5ARAPvzIrIIyJyZhAEd65cufLpnp6eVZVKWWsfSLe42ShDchiGuSAIBoKQiOi71x9vsMH1vV5dCbvhoxkheaQfAqoLkoalt4jI3sy8U/UPJdofyuXyAcViUdt+4KgXcutVst71zXAe75BcLpeXdnV1dQ9Xd2vtQ0S0ne457r3fspGQ3IS/yxFDcjOc67U1vocABCAAAQhAAAIQgMB4CTQzJGettTrVdj4R9fb19S3t7u7WqaEvOowxDzKzThXdWEPyNkEQVFbt/olzrrK1T9PbfTxDcnXhOzo6ZrS2tu7JzEdV9oEWkb/39/drv1g7TiF5g53HOyQP95pBxbYy3br2ff4Rpls34++yXkjeYOemd3zcEAIQgAAEIAABCEAAAusp0LSQbK19JRH1aDlE5Jveew1HLzrS8NTbwDvJYzK1tRGneiOUNYs5jXq6NRHpqtArmXkGEXU753ThqzE5JiokV1fGGPMFZj417Rtv9d5fNx4huRnO4x2SRWTIVwjUa9GiRa0zZ85cowt3ichN3vuBPbT1GC4kN+nvst674+PWn8fkjwQ3hQAEIAABCEAAAhCAQJVAM0OyISKXBqFhF8syxhzLzF9Ny7BRjiSnAfFGZh7YvmqkKbYajGbNmnVEkiQ3RFH0yGh77xiH5Gwul1uczWbnOecGFlMb6rDW7kBExbRv6H7Ll49TSNYp3RvkPN4hmYhG2lLs9UEQ3JEan+ucG9herE5IbsbfZb2QvMHOo+3XOB8CEIAABCAAAQhAAAJjJdC0kFyzovSQe70aYzqZ+XcikjDzy2vfqxyPQNIIpLV2MFgkSfLZKIrOrr6uCSPJGirezsxXpcHxt+l+zy963zhdcOmMNEybrq6uqJE6VM4Zy5BsrT2LiHSRtlIa9B8cJiS/m4h+rN/FcfzmQqFwi/53Ped69Wzk+g11Ho8+WTMK3Kdbajnn9N3jdQ5r7S+J6KDUcddCoXB3vZDcjL/L8XCu19b4HgIQgAAEIAABCEAAAuMl0LSQnIYeHUnWgKlTro/r7++/XN8/7ezsnJfNZj/AzJ8VEQ2GGpKPSM8bnK48HoGkEdgwDDcLguCp9NzlcRy/S0SeTpKk9f777/9HM0Ky3rt6lJOIflMulz+bzWaj3t7ezOzZsxcHQXAcER2ZluNXzrm3NVL+6nPGMiSn+1HrPszTRUS9zmLmG4no308++aTMnj37FdOmTTtARM5J93nWbYt0X+yylrGec726Nnr9hjiPR5+sCcn3iohum3b8qlWrbunp6em31r5CRE5j5mPSv5k7vffLqn1G2gLKWrtBf5fj4VyvrfE9BCAAAQhAAAIQgAAExkug2SF5NxH5LTO3phXQkdHniWhW+u/rieidInIAM/+sqpLPJEnyBmbenZkv1c+TJJmwd5LTAHsHM7++piG+7Zw7slkhedGiRTNnzpz5c2beu/Ic3TaJmddpl9T0EOfcytF2jLEMyVoWa+3+RHQFEW1Sp2yPlsvl/WpXbjbGDOvcSF0buX5DnMc7JMdxvGsmk9G9v1+d9oUX9EeIKouHy+Xy7l1dXf8aRUjeoL/LKIq6xtq5kbbGORCAAAQgAAEIQAACEBgPgaaGZC1wPp/PZzKZzxDR7kQ0l4hWE5HuCaz75Gow1uAcWGt1X933i8gcZv57kiQanN8yWUJyZ2fngpaWFg3se6QjpbpS98Xe+4uaFZIrDWyMeQsRvZeZdyaieWlOflpE/kxEP/Te/0oH59enQ4x1SNYy5XK5LbPZ7EdF5E3pquWz0in1z4hINzNfm7b/Ovsk67UjOTdS39Fcvz7O4x2Sy+Xy4r6+vn/PmDFDtwXTmQPb6VZauoUWEf2Smb881I8lI40kb+jfpb4LP9bOjbQ1zoEABCAAAQhAAAIQgMB4CKwTksfjgXgGBCCwrkC9gAsvCEAAAhCAAAQgAAEIQGD8BBCSx88aT4LAkAIIyegYEIAABCAAAQhAAAIQmDwCCMmTpy1Qko1UACF5I214VBsCEIAABCAAAQhAYFIKICRPymZBoTYmAYTkjam1UVcIQAACEIAABCAAgckugJA82VsI5XvJCyAkv+SbGBWEAAQgAAEIQAACEJhCAgjJU6ixUNSXpgBC8kuzXVErCEAAAhCAAAQgAIGpKYCQPDXbDaWGAAQgAAEIQAACEIAABCAAgTEQQEgeA1TcEgIQgAAEIAABCEAAAhCAAASmpgBC8tRsN5QaAhCAAAQgAAEIQAACEIAABMZAACF5DFBxSwhAAAIQgAAEIAABCEAAAhCYmgIIyVOz3VBqCEAAAhCAAAQgAAEIQAACEBgDAYTkMUDFLSEAAQhAAAIQgAAEIAABCEBgagogJE/NdkOpIQABCEAAAhCAAAQgAAEIQGAMBBCSxwAVt4QABCAAAQhAAAIQgAAEIACBqSmAkDw12w2lhgAEIAABCEAAAhCAAAQgAIExEEBIHgNU3BICEIAABCAAAQhAAAIQgAAEpqYAQvLUbDeUGgIQgAAEIAABCEAAAhCAAATGQAAheQxQcUsIQAACEIAABCAAAQhAAAIQmJoCCMlTs91QaghAAAIQgAAEIAABCEAAAhAYAwGE5DFAxS0hAAEIQAACEIAABCAAAQhAYGoKNBySrbXnEtFS59wBtVU1xlxERAu894dMTYaJLfVo/OqdW+/7ia0png4BCEAAAhCAAAQgAAEIQGByC3A+n89nMplouGKKyK3e+zfVCcmL4jhu7erq6p7c1Z2cpTPGNOxXLwTX+35yCqBUEIAABCAAAQhAAAIQgAAEJocAd3R0TGttbd26qjh3ENG3iOhH+pmIrImi6HENySLS4b1/ywQVPSCiZIKePZaPHVW96oXget+PZUVwbwhAAAIQgAAEIAABCEAAAlNd4EXTrY0xK4joK977r1ZXLh1JXkxEOup8goi0MvPXnHOnVAcza+3WInIZM7+OiFhE7mbmo5xzjw6BlTHGnMPM7yaiuSLyIBGd5L2/Tc81xlxARLOZeTYR7eac21Q/t9Z+jIiOJiJ9lpb3NO/91bX3t9aen953NTPvIyJtRHQcEW3BzEeLyDwiush7f44xZh9m/uXKlSvn9/T0rNJ7LViw4GXz5s17WkTeEUXRjZX7h2G4bxAEV5dKpU2LxeJq/Xzx4sWbtLe3P01EB3rvfzuaeomI/iBRPV19WJeKNRE9xsyHi8hzzPxV55xOh1ezdaa+j2Q1UlsZY3Zm5ntKpdJWxWLxsane0VF+CEAAAhCAAAQgAAEIQAACjQiMKiSLyBEaoFevXv3/ZsyYsQcR/VpEckSknw+EPGvtz4loTalUOra/vz9ob28/X0Ouc+4dtQUyxhxFRGcx8x69vb0r5syZcwIzf2rlypVb9PT09KfB/INJknwhjuOfFYvFp8IwPIyZL2bmfZ1zXcaY/YjoSmbucM49NESwP0aDq3Pu9jAMNZB/lJkvcs6dmc/nl2UymVtWr169+fLly5+11v5TRD7jvf9uGsYPEpFveO+3JKJy5d7W2hYieiJJko9EUXSVfp6W6xLv/RbGmA+Npl7ZbPbU6pA8ksvMmTO/lIbjs1etWvWNWbNm7U5E14jI/t77m6tDcj2rkdqqs7NzQTabPXLVqlUXVH40aKRD4RwIQAACEIAABCAAAQhAAAJTWWBUITkNm9tXhcXHkyQ5iZl3rgrJv9ERYe+9jtjqMex04oULF7bNnTt3hnPuP3rikiVL5ra3t+t/b++cW56G5EOcc4sqzzTG3EpE93jvT6v6TEd5/+S9P2OIkLyXc87q5+lo8Y1xHM8uFArPElHGWltOkmTHKIruM8Z8WQeqvfdvTM//ITM/45zTket1DmPMt4lomvf+fWmg1h8H/uOcO2a09aod/R3pehHRkP+W1ETSct7JzF3OuROq71XPylrbcFtN5U6OskMAAhCAAAQgAAEIQAACEGhUYLQheQfn3P5VIblHRM4monxVSN5NRHTqs05xvilJkp9GUXTnUAVKpyifR0T7ENF0fQWamefFcRwWCoVCGpJD59zeVYF4BTNvM8T9fuCc+0BtSBaR7b33B+rnOnIcBMHN3vvWqjroCPEy59zvwzB8DTPfH8fx1tls9ikR0f/tpQF6iJCsZbrCez9v4cKF2Tlz5ui07P2jKLprtPWqDckjXR8EwQeJaDvv/Vur6vB9EdnEe//2mpA8opW1tuG2arRD4TwIQAACEIAABCAAAQhAAAJTWWC0IXmdLaCstS8KyYphrZ0uIhoidbuodxLR1733n6qFstb+RANfqVQ6RN97tdbOIqJna0Jy7TP/SkSXOecurgefhuwlzrmDqkLyTd57fTd54NCR5EpI1n8bY/7MzD8VkW5mvtA5NzhyXvO8rLVWp1wfSkTtQRDo+9m6AJqMtl5DvEc8rIuGZGZeWKlTWofvE1GLc+7dNe+H17VqtK3qWeN7CEAAAhCAAAQgAAEIQAACLwWBpofkpUuXzn/ggQee0rCYhs63M/P3nHMza8F0kTAROTeKosvSsPdmIrp5pJBsjLmOmZ90zh1ZFXS3ds7p4lLrrH69niH5WGZ+FxEtT5JkRRRFOlI+5GGtvVxEdMT85UTU65z7RFrnUdWrNiSP5JKOJL/Ze/+aSqGMMTpSr9PNT64ZSR7RajRt9VLo7KgDBCAAAQhAAAIQgAAEIACBegLNDsmHGmMeIaJLdMVlfbiInMHM+l5wOERIvoOZH3HOHZHL5Tqz2ezpRLRfHMcHFQqFG4bamzmfz++XyWR+kSTJwVEU3WKM2YWIrhWRg2qnda9PSO7o6JjT1tb2mIj0l8tlUywWHx4OMZ/P75XJZC4VkdnpVOuBadnGmFHVa4iQPOz1QRDoDwlHMvOJRPT9JEn20CnkIrKb9/6P1feqY/X7kdoKC3fV+9PB9xCAAAQgAAEIQAACEIDAS1Gg2SH5kFwut1Mmk9HVpzuJqKQjnCJyovdep/6uc+Tz+R2DIPgeEW3DzIU4jg8PguAUIjo0SZK9M5mM7sm8znRrvYG1Vreg0gXD5hPRiiRJvhhF0Q9q778+ITkNuVfpu9HOOV05eqRDF/56QkSe9d6/qnLiaOtVG5JHul5Ebg6C4Pl066f36ki2iJwfRZFulzXUFlDDWo3UVtgC6qX45446QQACEIAABCAAAQhAAAL1BF4UkutdsDF8b4y5j5kvdc7pu744IAABCEAAAhCAAAQgAAEIQGAjEUBIrmrodBGrjzPzEb29vR0rVqzo20j6AaoJAQhAAAIQgAAEIAABCEAAAkSEkJx2g87OzvaWlpaVRPSXOI7fr1tQoYdAAAIQgAAEIAABCEAAAhCAwMYlgJC8cbU3agsBCEAAAhCAAAQgAAEIQAACIwggJKN7QAACEIAABCAAAQhAAAIQgAAEUgGEZHQFCEAAAhCAAAQgAAEIQAACEIAAQjL6AAQgAAEIQAACEIAABCAAAQhAYF0BjCSjR0AAAhCAAAQgAAEIQAACEIAABDCSjD4AAQhAAAIQgAAEIAABCEAAAhDASDL6AAQgAAEIQAACEIAABCAAAQhAYEiBgenWYRgeFgTBFUR0qnPui9VnWmt/TUS/d86dC8ORBay1LUR0JhG9m4g2JaJ/JElyYRRF34EdBCAAAQhAAAIQgAAEIAABCEx+geqQ/DURaWXm1zjnHq0UHSG58UY0xlzEzB8jouVE9DcR2YeZW+M43rNQKNzR+J1wJgQgAAEIQAACEIAABCAAAQhMhEB1SP64iDzIzDOcc28bJiRnjDHnMLOOlM7V84noJO/9bXq+tfb89PPVzLyPiLQR0XFEtAUzHy0i84joIu/9OVX311B5NBFtLSIriOg07/3VxpidmfmeUqm0VbFYfKwWxxhzATN/PEmSdwVB8HYi2l9EHhGRo6MoujM9P2utPSsd2d0sDa+nOOd+U7leRN7HzO8joj1ExPf39x/c2tr6CWb+CBE9Ecfx4YVC4e7K840xH2bm44noVUT0aJIkp0dR9NO0/j8hopmlUunQYrG42hhzOjOfkSTJZ6MoOnsiGhjPhAAEIAABCEAAAhCAAAQgAIHGBapD8qf6+vr2bWtr01HQ9zjnrk+D3+B0a2PMUUR0FjPv0dvbu2LOnDknMPOnVq5cuUVPT0+/tVanZB9DRAc6524Pw1AD9UeZ+SLn3Jn5fH5ZJpO5ZfXq1ZsvX768V6d5M/PFzLyvc67LGLMfEV3JzB2lUqk/m80euWrVqgt6enpW1VZJ7x0EwaeJ6GEi+rmIvJyZtXyPOue2JaLEWqvfnyMiV4vIr4IgOE9EZpTL5e0ymcyJ6fUPich3ieggZn4tEd2v/xOR5/R+ItLlvc/r88Mw1ECuQfiWJEm+EQSBfv9G/cp7X6wu45IlS+ZOnz79h1o3Itpbg3njzYIzIQABCEAAAhCAAAQgAAEIQGAiBAZDMjOfomHQWnsCEX2st7e3Y8WKFX3V060XLlzYNnfuXB1p/o8WVoNge3u7/vf2zrnlaUjeyzln9XtjjE43vjGO49mFQuFZIspYa8tJkuwYRdF9xphbiege7/1plcobY24koj95788YCcQYczYzf4aIfuCc+0Aa6B8iou2SJFkYRdEj1tod4jieG8dx1/333/9fa+3lRHQkER0gIrvo9SLyTe/9UWEY7hsEwQ0i8pT3fgsiEmNMLxHN6u/vb+vu7l5rrf09Ee2q5V+7du3ylpaWRZlMJhKRr3vvj62UNzXbX0eikyQ5KYoifd8bBwQgAAEIQAACEIAABCAAAQhMcoEXhWQNssYYJyLXRFF0enVIXrx48Sbt7e3nEdE+RDRdgyQzz4vjOCwUCgUNySKyvff+QK23jhwHQXCz9761KkCWiWiZc+73xpgVzLzNEEaDwXc4v6qQ/DHn3CVpSNZp33smSZKPoqjLWruEiL5CRK/VEWRmnkZELTpFm5mXakhOkuSEKIouNcZ0MnOXiNzlvX99GvL/wszbr169elMd+bbWPp0uyLVOsUTkVu/9m6rq+AkR0X/vqUFZRPaLougvk7wvoHgQgAAEIAABCEAAAhCAAAQ2eoGhQrKG29dlMpnfikgnEV3IzH/Q1a2ttTrVeLtSqXSIvidsrZ1FRM9Wh2QdYHbOHVQVkm/y3uu7yQOHjiRXQrK19q9EdJlz7uLRtkQlJCdJou8gX5aG2t8y8xuryvMAEXWIyOFJkvwhk8l8nojeVROSB67v7Oxc2tLSotOsBwOvtXbgeiLaTEfPKyE5SZIDgyB4plLmOI6f1x8J0n+rqeh/V6Zni8jPvfeHjraOOB8CEIAABCAAAQhAAAIQgAAExldgyJCcBk59T3dzInqBme/VkKwjvyJybiWUWmvfTEQ3r29INsZcx8xPOud0CnQlRG/tnNOFupKRKOqF5FKp1NPW1vYcEa1yzmmY1+nf9zLzjhsQkgemWxPRG/Sda/2RII7jnYjo75lM5r/pwmBcKpVemS7c9XZmvoqIrnfOHTC+TYunQQACEIAABCAAAQhAAAIQgMBoBYYNyWEYbsbMf2PmtboidRqS72DmR5xzR+Ryuc5sNns6Ee0Xx/FBhULhhvSd5IZHkvP5/H6ZTOYXSZIcHEXRLcaYXYjoWhE5KI7jh0ZauKteSC4UCjrdWqdH6yrcHyeiVzKzToFeIiI/FpFngiA4vjIS3chIsjHmvcz8QyJ6MEmSrwZB8BYi2ktEDvPe/8wYcw0zv1X3RxaRB5hZp1tvIiJHee+/OdrGwfkQgAAEIAABCEAAAhCAAAQgML4Cw4ZkLYa1Vrdm+joRfVpDcj6f3zEIgu8R0TbMXNDtkYIgOIWIDk2SZO9MJqOhseGQnD7jBBE5iZnnE9GKJEm+GEXRDxrYAmpg4a6Rplvn83mdFq1TuTfVEd2+vr5PtbW1/VYDs4hcy8zvHE1IrirvR/UeRPQ4M3/BOfct/S6fz788CALd6umdzLyJ1kdEvuG9v2h8mxVPgwAEIAABCEAAAhCAAAQgAIH1ERgIyTggAAEIQAACEIAABCAAAQhAAAIQIEJIRi+AAAQgAAEIQAACEIAABCAAAQikAgjJ6AoQgAAEIAABCEAAAhCAAAQgAAGEZPQBCEAAAhCAAAQgAAEIQAACEIDAugIYSUaPgAAEIAABCEAAAhCAAAQgAAEIYCQZfQACEIAABCAAAQhAAAIQgAAEIICRZPQBCEAAAhCAAAQgAAEIQAACEIDAkAKYbo2OAQEIQAACEIAABCAAAQhAAAIQSAUQktEVIAABCEAAAhCAAAQgAAEIQAACCMnoAxCAAAQgAAEIQAACEIAABCAAgXUFMJKMHgEBCEAAAhCAAAQgAAEIQAACEMBIMvoABCAAAQhAAAIQgAAEIAABCEAAI8noAxCAAAQgAAEIQAACEIAABCAAgSEFMN0aHQMCEIAABCAAAQhAAAIQgAAEIJAKICSjK0AAAhCAAAQgAAEIQAACEIAABGpDchiGewRB8BkiMkT0chF5kpl/1tvb+5kVK1b0QeylIWCM2ZmIzmVmbefVInJXuVz+RLFYfOylUUPUAgIQgAAEIAABCEAAAhCAwPoLDIwkd3Z2Lm5paYlE5EvlcvkHLS0tz4lIJzN/i4huc84dOcpHBESUjPKal9rpaiuTqVJLly7dqrW1tZuI2kTkJmbeloiWisid3vtlk6msKAsEIAABCEAAAhCAAAQgAIGJEBgIycaYDxLRl73386oLEYbha4loYRRFvzDGXEZEM7z3762cY639DxEd6Zz7lTHmAiKazcyziWg359ym1trzRWQOET3NzG/VEWoi+q5z7tPpPTLGmHOY+d1ENFdEHiSik7z3t+m16WermXkfEWkjouOIaAtmPlpEtKwXee/PqSrPx4joaCLaWkRWENFp3vur0zruzMz3lEqlrYYaNTXG7M7Meq+ciJSZ+c7+/v4THnjggX/m8/mFmUzmYRFx3ns1oTAMDwuC4AoR+dqqVatOnTVr1koR+TMRXcnMnyeiN69cubKYfn4fM3+BiNRIPX7R19d3THd391pr7f/ojxPMHBLRCyJyTblcPqlYLK5etGjRzMr1RHQxM3+FiFpE5HNE9Dsi+iEzLySinzvnPkpEcfqjx4JsNnsREe1ORNOJ6Po1a9Yc29bW9j9BEJwgIldGUfTthQsXts2dO/cZIso651onW6ifiD8IPBMCEIAABCAAAQhAAAIQ2LgFBkJyPp/fMZPJ3CsiH2Xm7zjnSrUs9UKytfZcIvpgkiRfiOP4Z8Vi8an0s2OSJDk8iqKrrLU7iEhBM6b3vmiMOYqIzmLmPXp7e1fMmTPnBGb+1MqVK7eYNWuWBs1jiOhA59ztYRhqmNbyXeScOzOfzy/LZDK3rF69evPly5f3amhlZg2S+zrnuowx+6WBtcM591BnZ6cGxyNXrVp1QU9Pz6rq+i1evHiT9vb2x4noCSL6CjNvIiKnE9Ffvfc71QvJ/f39J7W1tfWn168Rkd/GcXx+uVxekX6uPyYsF5Grmfl4ItIR3A+XSqUrstnsP4lomoh8LAgCnQp9pIic570/uaOjY1rleg3gzHyfiJxGRNo+f2Lma0TkeGbehojepj9WEJH+8FAkolcS0SeISNtY63Sdc+4dVfXW8/Zi5htF5B7v/es27j8F1B4CEIAABCAAAQhAAAIQgMD/BaiBQwMrM58tIlkdpWTmu0ql0lXFYvHh9PsRR5LTQHyIc25R5Z76mYjs673PVT1H3339hPf+Z+lI5gznnIZIWrJkydz29nb97+01cBPRXs45mz5/Hw10cRzPLhQKz2oYtNaWkyTZMYqi+4wxtxKRhj0NkZU63ahh0nt/xkiNba1dooFYRG5dtWrV2zVEa6DXMOqcW14vJHvvT7TWVn5YsM45nz4vW/m8VCptp5ZhGL4vCIIfiMj3Vq9efcLLXvYyKyIru7q6olwut2U2m31MRO7z3u+oI7yV65Mk2TKKosettX8iop2SJDkhiqJLjTEfZ+YLROQc7/1nwjB8UxAEt4jIL/v7+9+v5Whra/uOiBzc39+/ZXd39xM6QyAIAh311uPKUql0nP6ogT8ICEAAAhCAAAQgAAEIQAACG7vAOqtbW2tbkiTZJQiC1xPR3kSkU4FP9d6f1+BIcuic0+sGjjQ47+Cc27/qsx4ROdt7/710BPc8ItonnRYszDwvjuMwk8kcJiLbe+8P1Gt15DgIgpu99zotuHL/MhEtc8793hizIh1RrW3THzjnPlCnoTVw35suWlYWkS4RuT4Igks1wDcakkVktfd+RtWzBkKuiPzXe6/TrHWati6QdicR/co59zZjzCeZ+UM6jVxEAmZuJ6K/Oec0uFdC8jPOubl6vTFGR6PfRkRv0BF2Y8w7dYE1Efmq9/54Y8yxzPzVYeq7u1p1dnZum81mdWTeiMirNGQ75/53Y/9jQP0hAAEIQAACEIAABCAAAQiMuAWUMeYjzPx1Itpcg23tO8nGmGeY+Qid5psG4qXOuQNqQnLtZ4Mh2Vr7EyLarlQqHaLvCVtrZxHRs5WQrIPLzrmDqkLyTd57fTf5RSHZWvtXIrrMOXfx+jTrggULXjZv3rz363RtEdlD360Wkb/29/fnW1pattB3kokocs7pqtAD0jk0uAAAC+VJREFU73Ez83f1neSqkeQnnXOb14ZkIhr83Fq7W/o+8TVJkvwoCIIriej35XL5hEwm06rvTQ8RkgevN8b8gpkP1veNNfCGYXiI3iMtx3FVIfkanWZdbdHX1/eX7u5ufQe5sqiYhnCd/t4hIq/x3qshDghAAAIQgAAEIAABCEAAAhutwEBIttZ+IkmS1VEU6ZTqwcMYoytc66jqa4hI3x9e4L0/RE/QUeAZM2bou70D78KuT0jW0V8RObfyXGvtm4no5vUJycaY65hZw+TgStzW2q2dczq9e8SVttMFsjpLpdKD6bTjrDHm2jQw5/r7+x9ra2vrFZGnvPcagsUY8zVmPmZDQrKI/J2Z/1dEdLGyC/P5/H6ZTOb6DQnJVdOt7/Le64wAHb1+LTNnRWQ/Zj5JRM6KouhLGpaNMQVm7qxMW99o/xJQcQhAAAIQgAAEIAABCEAAAumIooaoDzHz13RqdRAENyRJouH3VUEQfEFEdEXr0BhzDDOf3NfX19Hd3f28MeYLzHwiEb1nA0LyHcz8iHPuiFwu15nNZnWxrP3iOD4ok8nsMZqR5DRg/iJJkoOjKLrFGLMLEV0rIgdFUXTnSAt3hWH4+iAI7tCtkETkO8zcxsy6Z/SMJ598csFjjz32grW2RxfD0neJiegRZtZVvvXfGzKSfGsQBJfowlkiclkQBBqY56Sj2Id5729M30lueCQ5fVdbt3larFOwiejfRHQqMz9cKpWObGlp+YP2fF1cTKe2a4YmoodXrly5fU9Pjy4+hgMCEIAABCAAAQhAAAIQgMBGKzA43ToMw3cxs26xtL2u7qzhSkRuLJfLn9XR1Y6Ojhmtra0/YeadRORJ3X5JQzMRfc45d+X6jCTrqtpBEGjo3IaZC3EcHx4EwSlEdCgR/VLL0eh0a21Ba61ub3QSM88nohVJknwxiqIf6HfGmHpbQB2uo6xEtEhE+ojIicgpuihYeu/dROSbuuWSiNyiU621jCJyuff+mNowm/aoyjvFQ063JqJ3i8iPdLsoZv6XiJygz9etnkQk8t7vsR4hWfe91neOL2FmXS1bt4D6TWU7K2OMvv+tU+d1YbKVzHx3uVw+uaurS7ffwgEBCEAAAhCAAAQgAAEIQGCjFhjxneSNWgaVhwAEIAABCEAAAhCAAAQgAIGNTgAheaNrclQYAhCAAAQgAAEIQAACEIAABIYTQEhG34AABCAAAQhAAAIQgAAEIAABCKQCCMnoChCAAAQgAAEIQAACEIAABCAAAYRk9AEIQAACEIAABCAAAQhAAAIQgMC6AhhJRo+AAAQgAAEIQAACEIAABCAAAQhgJBl9AAIQgAAEIAABCEAAAhCAAAQggJFk9AEIQAACEIAABCAAAQhAAAIQgMCQAphujY4BAQhAAAIQgAAEIAABCEAAAhBIBRCS0RUgAAEIQAACEIAABCAAAQhAAAIIyegDEIAABCAAAQhAAAIQgAAEIACBdQUwkoweAQEIQAACEIAABCAAAQhAAAIQwEgy+gAEIAABCEAAAhCAAAQgAAEIQAAjyegDEIAABCAAAQhAAAIQgAAEIACBIQUmbLq1MeYiIlrgvT+k+r8nWztZa39PRLsS0fbOueW1/55s5UV5IAABCEAAAhCAAAQgAAEIQGD9BQZCchiGhwVBcMVQtxGR1d77Gev/iKGvNMYsiuO4taurq3syh2RjzIeJaBtmvsg595/akByG4RZBEHyFiPYiohYR6UqS5NRCofCHZpvhfhCAAAQgAAEIQAACEIAABCAwtgLVIfnbIpKrfVypVEruv//+f4xlMSZzSK6t9xAjyxER5UXkd0RUYuY3iMizSZJsWygUnh1LN9wbAhCAAAQgAAEIQAACEIAABJorMBiSmflbI40YW2vPJ6K5OrLMzPuISBsRHUdEWzDz0SIyj4gu8t6fkxYxY4w5h5nfnV73IBGd5L2/Tb8fbrq1MWZnZr6nVCptVSwWH6ut7qJFi1pnzZqlz3gbEb1CRHySJMcWCoWCnmut9To4TkS7i8g3mHmhiPx8zZo1/9ve3v59ItpTRP7c399/WHd39xMdHR2bt7a2XkhEb2DmNhG5m4iO9973pPcbdrp1qVR6PpvNfouZ/+ac+1h6/u1EtEyf75zTa3FAAAIQgAAEIAABCEAAAhCAwBQRGE1IPpeIjiGiA51zt4dhqAH4o+k05DPz+fyyTCZzy+rVqzdfvnx5rzHmKCI6i5n36O3tXTFnzpwTmPlTK1eu3KKnp6d/uJDc2dm5IJvNHrlq1aoLenp6VtU6GmM0+H5ERC4WkT8y8xeJaFp/f/+23d3da40xdzPzLkSkAfVXRHQKEW1KRBqiryOi3dKgfLH3/kRr7c1E9GYiOltEniEi/THgPu/9TvVCsr6jXF2+XC736mw2eysRzVq9evW26jBF+gGKCQEIQAACEIAABCAAAQhAAAJEtM47yTpKPISKhsnPWGs1JO/lnLN6jjFmH2a+MY7j2em04oy1tpwkyY5RFN23cOHCtrlz587Q93j1/CVLlsxtb2/X/x5YAGt9Fu6y1k4Xkf8S0cr+/v7t9L7Tpk07PAiCS4jonc65KyvToZMkeXcURVcYY77EzCeLyNXe+4NzuVyYzWa9jhh773c1xuyeJEmmUCjcSURijPk7Eb2yv79/Znd39/ONLtxljHmemduJSEe2j1ID9DAIQAACEIAABCAAAQhAAAIQmFoCdd9JXrNmzX91RFRDsohs770/UKuoI8dBENzsvW+tVFlDsk411mnGixcv3qS9vf08ItqHiKZrAGXmeXEchzo1en1Cci6X68hmsw8MRZwkyWejKDq7KtR2Oufut9aeQEQXJ0lyZhRFp3d2ds5raWl5kogecM7tkM/n98tkMp8TkVdr5iailzFz0NfX9wqdjj2KkPxt/S2AmV9HRHcQ0f7OuTVTqzugtBCAAAQgAAEIQAACEIAABDZugdFOt17inDuoKiTf5L3Xd5MHjuqQbK39CRFtVyqVDtF3i621s4jo2SaF5EeJ6D3VTVcqlf5VLBYfrg21xpjjmPnSqhCtU6+fJqLucrm8dyaTeYiIVjHzoSLyT2bW6dfbjTIkq6NoeSrTwXVqunPu/23c3Qu1hwAEIAABCEAAAhCAAAQgMLUExiwkG2NWiMi5URRdlgZofe/35g0JyQsWLHjZ/PnzV+oq0qVSaV6xWFy9ww47bJfNZrd64YUXHkhHvNdZaGukkExEnyKiX4vItTpC3tHRMae1tfVxZm5tJCQT0dYi8lMi+qP3fr+0njr1+3gi+qRzTreGwgEBCEAAAhCAAAQgAAEIQAACU0RgnenWcRx3DFXu559//t+zZs36vE4nbnQk2RhzBzM/4pw7IpfLdWaz2dOJaL84jg8qFAo3rO/CXdbabxHRh0TkZn0nWkSOTVfYzjnnHhrNSDIRvYuIikT0nyRJTmLm9zPzAq0nEX2aiDTw/oaIdq28S119/+eff/5f7e3tf2XmLXXFbGZ+VkTeSETlcrlsi8XikFPDp0jfQDEhAAEIQAACEIAABCAAAQhsdALrLNw1Qu13J6IDRhOS8/n8jkEQfI+ItmHmQhzHusCWrjR9aJIkewdB8A4iWuC9P6QmMI+4BZQu3kVEOkK7v4hsriGXmT9e2W5pNCHZObfUGHMGMx8vIjERncfMd+noMhHpe8kdbW1tvxguJOsCZJ2dnYuz2ayWZxkzi4hoMP68916nbeOAAAQgAAEIQAACEIAABCAAgSkkMBCScUAAAhCAAAQgAAEIQAACEIAABCCQbgEFCAhAAAIQgAAEIAABCEAAAhCAAAQQktEHIAABCEAAAhCAAAQgAAEIQAACgwKYbo3OAAEIQAACEIAABCAAAQhAAAIQSAUQktEVIAABCEAAAhCAAAQgAAEIQAACCMnoAxCAAAQgAAEIQAACEIAABCAAgXUFMJKMHgEBCEAAAhCAAAQgAAEIQAACEMBIMvoABCAAAQhAAAIQgAAEIAABCEAAI8noAxCAAAQgAAEIQAACEIAABCAAgSEFMN0aHQMCEIAABCAAAQhAAAIQgAAEIJAK/H9bMJh41JlVtQAAAABJRU5ErkJggg==',
                'gridster' => '{\"type\":\"h1\",\"sizeX\":4,\"sizeY\":1,\"gridsterId\":0,\"innerBrNodes\":1,\"$$hashKey\":\"object:11\",\"row\":0,\"col\":0}'
            ));

            // show information in the command line after templates are created
            $this->command->info('');
            $this->command->info('*********************************************');
            $this->command->info('******   Template app seeds finished   ******');
            $this->command->info('*********************************************');
            $this->command->info('');

    }

}
