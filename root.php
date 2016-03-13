<?php
if (!defined('DS')) define('DS', DIRECTORY_SEPARATOR);
if (!defined('_ROOT_')) define('_ROOT_', dirname(__FILE__) . DS);

if (!defined('FRM_ROOT')) define('FRM_ROOT', dirname(__FILE__) . DS);
define('FRM_COM', FRM_ROOT . 'component');
define('KEY_MANAGE', _ROOT_ . 'key_manage' . DS);

define('CRAWLER_ROOT', _ROOT_ . 'crawler' . DS);
define('WEB', _ROOT_ . 'website' . DS);
define('RUNTIME_PATH', _ROOT_ . 'runtime' . DS);
define('LIBS', _ROOT_ . 'libs' . DS);
define('CACHE', RUNTIME_PATH . 'cache' . DS);

if (file_exists(RUNTIME_PATH . 'runtime.php'))
	require RUNTIME_PATH . 'runtime.php';
else
	exit("No runtime.php\n");

define('FRAMEWORK_BASE', _ROOT_ . 'framework' . FRAMEWORK_VERSION . DS . 'yii.php');

include 'config/crawler.config.php';
include 'config/web.config.php';

class Root
{
	public static $app;
	public static $alias = array(
		'libs' => LIBS,
		'crawler' => CRAWLER_ROOT,
		'web' => WEB,
	); 
	
	static function startApp()
	{
		require_once(FRAMEWORK_BASE);
		self::$app = Yii::createWebApplication($GLOBALS['config']);
		
		self::setPathOfAlias();
		Yii::import('libs.*');
	}
	
	static function setPathOfAlias()
	{
		foreach (self::$alias as $alias => $path)
		{
			Yii::setPathOfAlias($alias, $path);
		}
	}
	
	static function run()
	{
		if (is_null(self::$app))
			self::startApp();

		self::$app->run();
	}
}