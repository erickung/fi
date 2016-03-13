<?php
include 'init.php';
Yii::import('crawler.model.*');

//$units = libs\CrawBase::loadConfig('indicators_unit');
$mainConf = libs\CrawBase::loadConfig('main');
$stocks = libs\CrawBase::loadConfig('stocks');

$url = "";
foreach ($stocks as $stock) {
	echo "----------this is stock $stock-----------\n";
	
	$url = $mainConf['url'];
	$url = str_replace('STOCK', $stock, $url);
	$yurl = str_replace('STOCK', $stock, $mainConf['yurl']);
	
	$years = explode(',', $mainConf['years']);
	$year = $years[0];
	while ($year <= $years[1]) {
		echo "year: $year\n";

		$surl = str_replace('YEAR', $year, $url);
		//var_dump($surl);
		$SinaStockFinanceIndicators = new SinaStockFinanceIndicators($surl);
		$SinaStockFinanceIndicators->stock = $stock;
		$SinaStockFinanceIndicators->saveData($stock);
		
		$year++;
		sleep(10);
	}
	echo "\n";
	
}

