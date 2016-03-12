<?php

/**
 * This is the model class for table "{{financial_indicators}}".
 *
 * The followings are the available columns in table '{{financial_indicators}}':
 * @property string $si_id
 * @property string $name
 * @property integer $type
 *
 * The followings are the available model relations:
 * @property FinancialIndicatorsData[] $financialIndicatorsDatas
 */
class FinancialIndicators extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return '{{financial_indicators}}';
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
				
			'financialIndicatorsDatas' => array(self::HAS_MANY, 'FinancialIndicatorsData', 'si_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'si_id' => 'Si',
			'name' => 'Name',
			'type' => '类型：1=>元，2=>百分比，3=>次数，4=>天，9=>其他',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('si_id',$this->si_id,true);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('type',$this->type);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return FinancialIndicators the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
