<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MultiLanguageTest extends TestCase
{
    /**
     * Test if the Get /getLanguage return the expected elements of the JSON
     *
     * @return void
     */
    public function testGetSpecificLanguage()
    {
        // Testing Spanish Language
        $response = $this->call('GET', '/getLanguage?lang=es');

        $this->assertEquals(200, $response->status(), $mensaje = 'Invalid Id');

        $data = json_decode($response->getContent(), true);

        $this->assertEquals(array_get($data, 'back'), 'Atras', $mensaje = 'Wrong Key');


        // Testing English Language
        $response = $this->call('GET', '/getLanguage?lang=en');

        $this->assertEquals(200, $response->status(), $mensaje = 'Invalid Id');

        $data = json_decode($response->getContent(), true);

        $this->assertEquals(array_get($data, 'back'), 'Back', $mensaje = 'Wrong Key');
    }
}
