<?php
namespace libs;

class Base 
{
	private static $requires = array();
	
	static function fileRequire($file)
	{
		if (!is_file($file)) return false;
		 
		if (!isset(self::$requires[$file])) 
		{
			self::$requires[$file] = 1;
			return require $file;
		}
	
		return self::$requires[$file];
	} 
}