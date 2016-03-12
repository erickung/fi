<?php
include LIBS . 'TipsFile.php';
include LIBS . 'config.php';
include LIBS . 'cache/CacheAbstract.php';

class Cache
{
	public static $cache_config;

	private static $_ins;
	private static $_data;
	private static $cache_types = array(
			config::CONFIG_FILE => 'FileCache',
			config::CONFIG_SHM => 'SHMCache',
	);

	public static function Instance()
	{
		if (self::$_ins === null)
			self::$_ins = new self();

		return self::$_ins;
	}

	public function getCacheFactory($key)
	{
		$conf = config::$cache_conf[$key];
		$cache_file = self::$cache_types[$conf['type']];
		Base::fileRequire(LIBS . 'cache/' . $cache_file . '.php');
		return new $cache_file($key, $conf);
	}

	public function getCache($key)
	{
		$cacheFactory = $this->getCacheFactory($key);

		return $cacheFactory->get();
	}

	function setCache($key ,$value)
	{
		$value = gzencode($value, 9);
		$cacheFactory = $this->getCacheFactory($key);
		return $cacheFactory->set($value);
	}
}