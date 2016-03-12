<?php
class HtmlParser
{
	private $url;
	
	public function __construct($url)
	{
		$this->url = $url;
	}
	
	public function fileGetHtml()
	{
		$dom = new simple_html_dom();
		$contents = file_get_contents($this->url);
		if (empty($contents) || strlen($contents) > MAX_FILE_SIZE)
		{
			return false;
		}
		// The second parameter can force the selectors to all be lowercase.
		$dom->load($contents);
		return $dom;
	}
}