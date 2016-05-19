<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ExampleTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->visit('/getLanguage?lang=es')
             ->see('{"back":"Atras","big_title":"T\u00edtulo grande","choose_image":"Elegir imagen","close":"Cerrar","date":"Fecha","email":"Email","email_settings":"Ajustes de Email","image_settings":"Ajustes de imagen","new":"Nuevo","new_template":"Crear una nueva plantilla","no_input_files":"Ning\u00fan archivo seleccionado","middle_title":"T\u00edtulo medio","paragraph":"P\u00e1rrafo","replace_template":"Reemplazar la plantilla","replace_template_question":"\u00bfQuiere reemplazar la plantilla?","save":"Guardar","save_template":"Guardar plantilla","send":"Enviar","small_title":"T\u00edtulo peque\u00f1o","subject":"Asunto","template_name":"Nombre de la plantilla","title_mail":"Generador de E-mails","title_template":"Generador de plantillas de E-mails","variables":"Variables"}');
    }
}
