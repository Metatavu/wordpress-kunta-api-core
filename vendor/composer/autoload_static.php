<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitc7a584e8870075c37b9494a8c0a22248
{
    public static $prefixLengthsPsr4 = array (
        'T' => 
        array (
            'Twig\\' => 5,
        ),
        'K' => 
        array (
            'KuntaAPI\\' => 9,
        ),
        'C' => 
        array (
            'Composer\\Installers\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Twig\\' => 
        array (
            0 => __DIR__ . '/..' . '/twig/twig/src',
        ),
        'KuntaAPI\\' => 
        array (
            0 => __DIR__ . '/..' . '/metatavu/kunta-api-php-client/lib',
        ),
        'Composer\\Installers\\' => 
        array (
            0 => __DIR__ . '/..' . '/composer/installers/src/Composer/Installers',
        ),
    );

    public static $prefixesPsr0 = array (
        'T' => 
        array (
            'Twig_' => 
            array (
                0 => __DIR__ . '/..' . '/twig/twig/lib',
            ),
        ),
        'S' => 
        array (
            'Sunra\\PhpSimple\\HtmlDomParser' => 
            array (
                0 => __DIR__ . '/..' . '/sunra/php-simple-html-dom-parser/Src',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitc7a584e8870075c37b9494a8c0a22248::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitc7a584e8870075c37b9494a8c0a22248::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInitc7a584e8870075c37b9494a8c0a22248::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}
