<?php
class TipsFile
{
	private static $ins;

	static function Instance()
	{
		if (self::$ins === null)
			self::$ins = new self();

		return self::$ins;
	}

	function getFile($key)
	{
		return CACHE . "$key.cache";
	}


}