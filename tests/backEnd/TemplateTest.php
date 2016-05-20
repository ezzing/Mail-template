<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TemplateTest extends TestCase
{
    /**
     * Test if the Get /getCreatedTemplates return the expected elements of the JSON
     *
     * @return void
     */
    public function testGetAllTheCreatedTemplates()
    {
        $response = $this->call('GET', '/getCreatedTemplates');

        $this->assertEquals(200, $response->status());

        $this->assertNotEmpty($response);
    }

    /**
     * Test if the Get /getSelectedTemplate return the expected elements of the JSON
     *
     * @return void
     */
    public function testGetTheSelectedTemplate()
    {
        $response = $this->call('GET', '/getTemplate/1');

        $this->assertEquals(200, $response->status(), $mensaje = 'Invalid Id');

        $data = json_decode($response->getContent(), true);

        $this->assertNotEquals(array_get($data, 'templates'), null, $mensaje = 'Empty Template');
    }

    /**
     * Test if the Get /getTemplateToEdit return the expected elements of the JSON
     *
     * @return void
     */
    public function testSelectedTemplateToEditIt()
    {
        $response = $this->call('GET', '/getTemplateToEdit/1');

        $this->assertEquals(200, $response->status(), $mensaje = 'Invalid Id');

        $data = json_decode($response->getContent(), true);

        $this->assertNotEquals(array_get($data[0], 'html_edit'), null, $mensaje = 'UneditableTemplate');

        $this->assertNotEquals(array_get($data[0], 'gridster'), null, $mensaje = 'Empty Gridsters');
    }

    /**
     * Test if the Post /saveTemplate save correctly the recieved template
     *
     * @return void
     */
    public function testSaveCreatedTemplate()
    {
        $data = [
            'name_template' => 'fooo',
            'html'          => 'foo',
            'html_edit'     => 'foo',
            'icon'          => 'foo',
            'gridster'      => 'foo'
        ];
        $data = json_encode($data);
        $data = 'template=' . $data;

        $response = $this->call('POST', '/saveTemplate?' . $data);

        $this->assertEquals(200, $response->status(), $mensaje = 'Fail conexion to save');

        $data = json_decode($response->getContent(), true);

        $this->assertEquals(array_get($data, 'status'), "success", $mensaje = 'Invalid data to save');
    }

    /**
     * Test if the Post /updateTemplate correctly update the selected template
     *
     * @return void
     */
    public function testUpdateSelectedTemplate()
    {
        $data = [
            'id' => '2',
            'html'          => 'foo',
            'html_edit'     => 'foo',
            'icon'          => 'foo',
            'gridster'      => 'foo'
        ];
        $data = json_encode($data);
        $data = 'template=' . $data;

        $response = $this->call('POST', '/updateTemplate?' . $data);

        $this->assertEquals(200, $response->status(), $mensaje = 'Fail conexion to update');

        $data = json_decode($response->getContent(), true);

        $this->assertEquals(array_get($data, 'status'), "success", $mensaje = 'Invalid data to save');
    }

    /**
     * Test if the Post /deleteTemplate correctly delete the selected template
     *
     * @return void
     */
    public function testDeleteTheSelectedTemplate()
    {
        $response = $this->call('POST', '/deleteTemplate?data=1');

        $this->assertEquals(200, $response->status(), $mensaje = 'Delete Fail');

        $data = json_decode($response->getContent(), true);

        $this->assertEquals(array_get($data, 'status'), "success", $mensaje = 'Invalid data to delete');

        $this->assertEquals(array_get($data, 'borradas'), 1, $mensaje = 'Invalid data to delete');
    }
}
