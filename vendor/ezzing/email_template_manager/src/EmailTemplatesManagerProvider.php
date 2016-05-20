<?php

namespace Ezzing\EmailTemplateManager;

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
	// Loading views into a namespace
        $this->loadViewsFrom(__DIR__.'/views', 'EmailTemplateManagerViews');
	// Moving views to resources directory
    	$this->publishes([
            __DIR__.'/views' => base_path('public/resources/EmailTemplateManager'),
    	]);
	// Moving migrations to migrations directory
	$this->publishes([
	    __DIR__.'/migrations' => database_path('/migrations')
	]);
	// Moving seeder to seeds directory
	$this->publishes([
	    __DIR__.'/seeder' => database_path('/seeds')
	]);
	// Moving seeder to seeds directory
	$this->publishes([
	    __DIR__.'/models' => base_path('app/Models')
	]);
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        include __DIR__.'/routes.php';
      	$this->app->make('Ezzing\EmailTemplateManager\MultilanguageController');
    }
}
