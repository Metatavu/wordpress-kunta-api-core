# Kunta API Core plugin for Wordpress 

Wordpress plugin core functionalities for Kunta API integrations

## Service and service channels

Kunta API core plugin allows users to embed service and service channel components (e.g. service description or service channel phone number, ...) into 
pages

### Customizing service and service channel components

All components are rendered through templates. This allows plugin and theme developers to customize the outputted markup to match their needs.

Templates are written as [Twig](https://twig.symfony.com/) templates 

Default templates can be found from [Project's GitHub project templates folder](https://github.com/Metatavu/wordpress-kunta-api-core/tree/develop/templates)

#### Registering custom templates folder

You can register your own templates folder by using ``kunta_api_register_templates`` -action. 

For example:

    add_action('kunta_api_register_templates', function () {
      global $kuntaApiTemplateFolders;
      $kuntaApiTemplateFolders[] = __DIR__ . '/templates';
    });

This allows the template system to lookup template-files under the new specified folder and allows the plugin or theme to override default templates.
