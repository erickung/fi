<?php
class FileCache extends CacheAbstract
{
	private static $_is_init = 0;
	
	public function get()
	{
		$this->_init();
		
		if (isset(self::$_data[$this->key]) && !$this->isExpired()) 
		{
			return self::$_data[$this->key];
		}
		
		return self::$_data[$this->key] =  file_get_contents($this->getFile());
	}
	
	public function set($value)
	{
		$file = $this->getFile();
		return file_put_contents($file, $value, LOCK_EX);
	}
	
	public function isExpired()
	{
		$time_len = time() - $this->getConfig('lastmodifytime');
		$ttl =$this->getConfig('ttl');;

		return $time_len >  $ttl;
	}
	
	public function getFile()
	{
		return TipsFile::Instance()->getFile($this->key);
	}
	
	private function _init()
	{
		if (self::$_is_init !== 0) return true;
		$this->setConfig($this->key, 'lastmodifytime', time());
		self::$_is_init = 1;
	}
}