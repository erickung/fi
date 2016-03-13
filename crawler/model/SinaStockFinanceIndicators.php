<?php
class SinaStockFinanceIndicators extends SinaStockFinanceBase
{
	public $stock;
	function saveData()
	{
		$data = $this->processData();
	
		foreach ($data as $d)
		{
			$si_id = $d['id'];
			unset($d['id']);

			foreach ($d as $k => $v)
			{
				$quarter = substr(str_replace('-', '', $k), 0, 6);
				$criteria = new CDbCriteria();
				$criteria->addCondition("si_id=$si_id");
				$criteria->addCondition("quarter=$quarter");
				$criteria->addCondition("code={$this->stock}");
				$tmp = FinancialIndicatorsDataAR::model()->findAll($criteria);

				if (!empty($tmp)) {
					continue;
				}
				
				$FinancialIndicatorsDataAR = new FinancialIndicatorsDataAR();
				$FinancialIndicatorsDataAR->si_id = $si_id;
				$FinancialIndicatorsDataAR->quarter = $quarter;
				$FinancialIndicatorsDataAR->data = $v;
				$FinancialIndicatorsDataAR->code = $this->stock;
				$FinancialIndicatorsDataAR->year = substr($quarter, 0, 4);
				if ($FinancialIndicatorsDataAR->data == '--') $FinancialIndicatorsDataAR->data = '';
				if (empty($FinancialIndicatorsDataAR->data) || !$FinancialIndicatorsDataAR->data) {
					continue;
				}
				//var_dump($FinancialIndicatorsDataAR);exit;
				
				
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