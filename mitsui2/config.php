<?php
function getFiles($baseUrl, $basePath, $refrer, $ua, $type, $isLocal) {
	$files = array();
	switch ($type) {
		case 'request':	// 資料請求
			$files = getFilesOfRequestForm($baseUrl, $basePath, $refrer, $ua, $isLocal);
			break;
		case 'reserve':	// 来場予約

			break;
		case 'enrollment':	// 会員登録

			break;
		default:
			return;
	}
	return $files;
}









function getFilesOfRequestForm($baseUrl, $basePath, $refrer, $ua, $isLocal) {
	$files = array(
		'js'	=> array(),
		'css'	=> array()
	);
	$protocol = $isLocal === true ? 'http:' : '';

	if ((strpos($ua, 'iPhone') !== false) || (strpos($ua, 'iPod') !== false) || (strpos($ua, 'Android') !== false)) {	// スマホ
		$files['js'] = array(
			$protocol . '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js'
			,$protocol . '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'

			,$baseUrl . 'plugin/exValidation-master/scripts/exvalidation.js'
			,$baseUrl . 'plugin/exValidation-master/scripts/exchecker-ja.js'
			,$baseUrl . 'helper/Namespace.js'
			,$baseUrl . 'request/sp/ElementManager.js'
			,$baseUrl . 'request/sp/index.js'
		);
		$files['css'] = array(
			$baseUrl . 'plugin/exValidation-master/styles/exvalidation.css'
			,$baseUrl . 'request/sp/style.css'
		);

	} else {	// PC
	}

	return $files;
}
?>