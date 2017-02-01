<?php
/*
 * Created on Oct 21, 2016
 * Plugin Name: Kunta API Core
 * Description: Core functionalities for Kunta API integrations
 * Version: 0.2.0
 * Author: Antti Leppä / Metatavo Oy
 */

defined ( 'ABSPATH' ) || die ( 'No script kiddies please!' );

require_once( __DIR__ . '/activator.php');
require_once( __DIR__ . '/core/schedules.php');
require_once( __DIR__ . '/core/locale-helper.php');
require_once( __DIR__ . '/core/settings.php');
require_once( __DIR__ . '/core/api.php');
require_once( __DIR__ . '/core/kses.php');
require_once( __DIR__ . '/core/tinymce.php');
require_once( __DIR__ . '/core/ckeditor.php');
require_once( __DIR__ . '/core/abstract-content-processor.php');
require_once( __DIR__ . '/core/page-processor.php');
require_once( __DIR__ . '/services/kunta-api-services.php');

?>