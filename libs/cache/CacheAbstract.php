<?php
abstract class CacheAbstract
{
	protected static $config = array();
	protected $key;
	protected static $_data;
	
	public function __construct($key, $config)
	{
		$this->checkConfig($key, $config);
		$this->key = $key;
		return $this;
	}
	
	abstract function get();
	
	abstract function set($value);
	
	protected function checkConfig($key, $config)
	{
		if (!isset(self::$config[$key]))
		{
			self::$config[$key] = $config;
		} 
	}
	
	protected function getConfig($sk = null)
	{
		if ($sk !== null && isset(self::$config[$this->key][$sk])) return  self::$config[$this->key][$sk];
		return self::$config[$this->key];
	}
	
	protected function setConfig($key, $sk, $value)
	{
		self::$config[$this->key][$sk] = $value;
	}
}