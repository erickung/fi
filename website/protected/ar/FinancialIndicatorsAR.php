<?php
class FinancialIndicatorsAR extends FinancialIndicators
{
	function getIndicators()
	{
		$dics = self::model()->findAll();
		$t_dics = array();
		foreach ($dics as $dic)
		{
			$t_dics[$dic->name]['id'] = $dic->si_id;
			$t_dics[$dic->name]['type'] = $dic->type;
		}
		return $t_dics;
	}
	
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}