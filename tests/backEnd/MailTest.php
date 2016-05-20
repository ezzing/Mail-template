<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MailTest extends TestCase
{
    /**
     * Test if the Post /sendMail return success
     *
     * @return void
     */
    public function testSendMail()
    {
        $data = [
            'email' => 'foo@foo.com',
            'subject' => 'fooo',
            'htmlContent' => 'foo'
        ];
        $data = json_encode($data);
        $data = 'emailData=' . $data;

        $response = $this->call('POST', '/email?' . $data);

        $this->assertEquals(200, $response->status(), $mensaje = 'Fail calling send mail');

        $data = json_decode($response->getContent(), true);

        $this->assertEquals(array_get($data, 'status'), "success", $mensaje = 'Invalid data to send by mail');
    }
}
