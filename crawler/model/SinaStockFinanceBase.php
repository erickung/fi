<?php
abstract class SinaStockFinanceBase
{
	private $url;
	private $html_parser;
	private $html;
	
	public function __construct($url)
	{
		$this->html_parser = new HtmlParser($url);
	}
	
	abstract function saveData();
	
	protected function getDom()
	{
		$this->getHtml();
		$tmp = array();
		$data = array();
		$more = array();
		foreach ($this->html->find("table#BalanceSheetNewTable0") as $th)
		{
			$children = $th->children();
			$tbody = $children[1];
		
			$is_year = false;
			$j = 0;
			foreach ($tbody->children() as $i => $ch)
			{
				if ($i == 0) $is_year = true;
				else $is_year = false;
		
				$tds = $ch->children();
				if (count($tds) < 5) continue;
				$t = array();
		
				foreach ($tds as $k => $td)
				{
						
					if ($is_year)
					{
						if ($k == 0)
							$tmp['head'][$k] = preg_replace("/(\<strong\>|\<\/strong\>)/", '', $td->innerText()) ;
						else
						{
							$tmp[$k]= $td->innerText();
						}
							
					}
					else
					{
						if ($k == 0)
						{
							preg_match("/<a\s+\S*\s*href=\'(\S+)\'\s*\S*\>(\S+)<\/a>/", $td->innerText(), $matches);
							$more[$matches[2]] = $matches[1];
							$t['head'] = $matches[2];					
						}
						else
							$t[$tmp[$k]] = $td->innerText();
					}
						
				}
		
				if (!empty($t)) array_push($data, $t);
				$j++;
			}
		}
		
		return $data;
	}
	
	protected function getHtml()
	{
		if (!is_null($this->html)) return $this->html;

		return $this->html = $this->html_parser->fileGetHtml();
	}
}