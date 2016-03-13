<?php
define('FRAMEWORK_VERSION', '1.1.14');
defined('YII_DEBUG') or define('YII_DEBUG',true);
defined('YII_TRACE_LEVEL') or define('YII_ENABLE_EXCEPTION_HANDLER',true);
defined('YII_ENABLE_ERROR_HANDLER') or define('YII_ENABLE_ERROR_HANDLER',false);
defined('CACHE_PATH') or define('CACHE_PATH', RUNTIME_PATH . 'cache');

class RunTime
{
	public static function getServerConf()
	{
		return array(
				'host'=>'192.168.135.248',
				'port'=>9501,
				'setting'=> array(
					'worker_num' => 8,
					'daemonize'  => 0,
				)
		);
	}
	
	public static function getCacheConf()
	{
		
	}
	
	public static function getDBConf()
	{
		return array(
			'connectionString' => 'mysql:host=127.0.0.1;dbname=caibao',
			'emulatePrepare' => true,
			'username' => 'root',
			'password' => '',
			'charset' => 'utf8',
			'tablePrefix' => 'caibao_',
		);
	}

	public static function getLogConf()
	{
		return array(
			'class'=>'CLogRouter',
			'routes'=>array(
					array(
							'class'=>'CFileLogRoute',
							'levels' => 'trace, info, error, warning',
							'categories'=> array('system.base.*', 'system.CModule.*','application.*'),
							'maxFileSize'=>5120,//日志大小
							'logPath'=>RUNTIME_PATH . 'logs', //日志文件路径
							'maxLogFiles'=>20,
					),
					array(
							'class' => 'CFileLogRoute',
							'levels' => 'trace, info',
							'categories'=> 'system.db.*',
							'logFile'=> 'db.log',
							'maxFileSize'=>5120,//日志大小
							'logPath'=>RUNTIME_PATH . 'logs', //日志文件路径
							'maxLogFiles'=>20,
					),
					array(
							'class' => 'CFileLogRoute',
							'levels' => 'warning',
							'categories'=> 'system.db.*',
							'logFile'=> 'db.warn',
							'maxFileSize'=>5120,//日志大小
							'logPath'=>RUNTIME_PATH . 'logs', //日志文件路径
							'maxLogFiles'=>20,
					),
					array(
							'class' => 'CFileLogRoute',
							'levels' => 'error',
							'categories'=> 'system.db.*',
							'logFile'=> 'db.error',
							'maxFileSize'=>5120,//日志大小
							'logPath'=>RUNTIME_PATH . 'logs', //日志文件路径
							'maxLogFiles'=>20,
					),
					array(
							'class' => 'CWebLogRoute',
							'levels' => 'trace', //级别为trace
							'categories' => 'system.db.*' //只显示关于数据库信息,包括数据库连接,数据库执行语句
					),
			),
		);
	}

}
