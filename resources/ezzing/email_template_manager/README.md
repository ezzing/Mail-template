# email-template-manager
Create, save, and edit your own email templates, and then send them to anybody whenever you need it.

## How to install
##### 0- Add email-template-manager as a composer dependency
`composer require ezzing/email-template-manager`
##### 1- Edtir your composer.json to add email-template-manager into PSR-4 autoloading
    "psr-4": {
        "App\\": "app/",
        "Ezzing\\EmailTemplateManager\\":"vendor/ezzing/email-template-manager/src"
    }
##### 2- Edit your config/app.php to add a new service provider
    'providers' => [
        ...
        Ezzing\EmailTemplateManager\EmailTemplatesManagerProvider::class,
        ...
    ]
##### 3- Refresh autoload_classmap.php so new service provider can be recognised
`composer dump-autoload`
##### 4- Publish new package
`php artisan vendor:publish`


Files are published in /public/resources/emailTemplateManager directory.
##### 5- Refresh autoload_classmap.php so new models and seeders cand be recognised
`composer dump-autoload`
##### 6- Migrate email-template-manager tables into your DB
`php artisan migrate`
##### 7- Seed new email-template-manager tables
`php artisan db:seed --class=MailTemplateManagerSeeder`

## Done!

Now you can access your email template manager accessig to

`http://yourdomain/template_manager`

You can change this route modifying /vendor/ezzing/email_template_manager/src/routes.php.


