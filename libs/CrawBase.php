<?php
namespace libs;

class CrawBase extends Base
{
	private static $config;
	static function loadConfig($alias)
	{
		if (isset(self::$config[$alias])) return self::$config[$alias];

		return self::$config[$alias] = self::fileRequire(CRAWLER_ROOT . "config/$alias.config.php");
	}
}