<?php
class config
{
	const CONFIG_FILE = 'file';
	const CONFIG_SHM = 'shm';
	
	static $cache_conf = array(
				'tips'=> array(
						'ttl'=>10,
						'type'=>self::CONFIG_FILE,
						'app' => array(
							'zone1','zone2'
						),
				),
	);
	
	
	static function getConf($key=null, $sk=null)
	{
		if($key === null || !isset(self::$cache_conf[$key]))
			return self::$cache_conf;
		
		return self::$cache_conf[$key];
	}
	
}

