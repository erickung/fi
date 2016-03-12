<?php
class SinaStockFinanceIndicators extends SinaStockFinanceBase
{
	function saveData()
	{
		$data = $this->processData();
		
		foreach ($data as $d)
		{
			$si_id = $d['id'];
			unset($d['id']);

			foreach ($d as $k => $v)
			{
				$FinancialIndicatorsDataAR = new FinancialIndicatorsDataAR();
				$FinancialIndicatorsDataAR->si_id = $si_id;
				$FinancialIndicatorsDataAR->quarter = substr(str_replace('-', '', $k), 0, 6);
				$FinancialIndicatorsDataAR->data = $v;
				if ($FinancialIndicatorsDataAR->data == '--') $FinancialIndicatorsDataAR->data = '';
				$FinancialIndicatorsDataAR->save();
			}
		}
	}
	
	private function processData()
	{
		$data = $this->getDom();
		$units = libs\CrawBase::loadConfig('indicators_unit');
	
		$dics = FinancialIndicatorsAR::model()->getIndicators();

		foreach ($data as $i => $d)
		{
			foreach ($units as $id => $v)
			{
				if (strpos($d['head'], $v) !== false)
				{
					$d['head'] = str_replace($v, '', $d['head']);
				}
			}
			$data[$i]['id'] = $dics[$d['head']]['id'];
			unset($data[$i]['head']);
		}
		return $data;
	}
}