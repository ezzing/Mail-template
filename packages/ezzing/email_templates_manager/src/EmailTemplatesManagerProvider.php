<?php

namespace Ezzing\Email_templates_manager;

use Illuminate\Support\ServiceProvider;

class EmailTemplatesManagerProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadViewsFrom(__DIR__.'/views', 'email_templates_manager');
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        include __DIR__.'/routes.php';
        $this->app->make('Ezzing\Email_templates_manager\EmailTemplatesManagerController');
    }
}
