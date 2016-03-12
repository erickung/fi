<?php
include 'init.php';
Yii::import('crawler.model.*');

$units = libs\CrawBase::loadConfig('indicators_unit');
$simple_caibao = "http://vip.stock.finance.sina.com.cn/corp/go.php/vFD_FinancialGuideLine/stockid/600460/displaytype/4.phtml";
$simple_caibao = CACHE_PATH.'/sample.txt';
$HtmlParser = new HtmlParser(CACHE_PATH.'/sample.txt');
$html = $HtmlParser->fileGetHtml();
$SinaStockFinanceIndicators = new SinaStockFinanceIndicators($simple_caibao);

$SinaStockFinanceIndicators->saveData();
