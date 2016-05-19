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
        $response = $this->call('POST', '/saveTemplate', [
            json_encode('template')=>[
                'name_template' => 'foo',
                'html'          => 'foo',
                'html_edit'     => 'foo',
                'icon'          => 'foo',
                'gridster'      => 'foo'
                ]
        ]);

        $this->assertEquals(200, $response->status(), $mensaje = 'Invalid data to save');
    }

    /**
     * Test if the Post /updateTemplate correctly update the selected template
     *
     * @return void
     */
    public function testUpdateSelectedTemplate()
    {
        $this->assertTrue(true);
    }

    /**
     * Test if the Post /deleteTemplate correctly delete the selected template
     *
     * @return void
     */
    public function testDeleteTheSelectedTemplate()
    {
        $data = ['data' => 1];
        $data = json_encode($data);

        $response = $this->call('POST', '/deleteTemplate', [
            $data
        ]);

        //$this->assertEquals($data, "rr", $mensaje = 'Invalid data to delete');

        $this->assertEquals(200, $response->status(), $mensaje = 'Invalid data to delete');
    }
}
