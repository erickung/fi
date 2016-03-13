<?php
$yii = _ROOT_ . 'framework' . FRAMEWORK_VERSION . '/yii.php';
$config= WEB .'protected/config/main.php';

// remove the following lines when in production mode
defined('YII_DEBUG') or define('YII_DEBUG',false);
// specify how many levels of call stack should be shown in each log message
defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL',3);

define('APP_PROTECT', WEB . 'protected' . DS);
define('APP_CONFIG', APP_PROTECT . 'config' . DS);


// remove the following lines when in production mode
defined('YII_DEBUG') or define('YII_DEBUG',false);
// specify how many levels of call stack should be shown in each log message
defined('YII_TRACE_LEVEL') or define('YII_TRACE_LEVEL',3);


