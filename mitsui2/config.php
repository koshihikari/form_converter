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



			,$baseUrl . 'helper/Namespace.js'
			,$baseUrl . 'plugin/kanaTextExtensionForSP.js'
			,$baseUrl . 'request/sp/data/DataManager.js'
			,$baseUrl . 'request/sp/view/ElementManager.js'
			,$baseUrl . 'request/sp/view/ValidationManager.js'
			,$baseUrl . 'request/sp/index.js'


			/*
		echo 'document.write("<script type=\"text/javascript\" src=\"' . $urlpath . 'plugin/kanaTextExtensionForSP.js\" charset=\"UTF-8\"></script>");';
		echo 'document.write("<script type=\"text/javascript\" src=\"' . $urlpath . 'helper/Namespace.js\" charset=\"UTF-8\"></script>");';
		echo 'document.write("<script type=\"text/javascript\" src=\"' . $url . 'sp/model/DataManager.js\" charset=\"UTF-8\"></script>");';
		echo 'document.write("<script type=\"text/javascript\" src=\"' . $url . 'sp/view/AutoAddressManager.js\" charset=\"UTF-8\"></script>");';
		echo 'document.write("<script type=\"text/javascript\" src=\"' . $url . 'sp/view/AutoEmManager.js\" charset=\"UTF-8\"></script>");';
		echo 'document.write("<script type=\"text/javascript\" src=\"' . $url . 'sp/view/ItemManager.js\" charset=\"UTF-8\"></script>");';
		echo 'document.write("<script type=\"text/javascript\" src=\"' . $url . 'sp/view/MultiItemsManager.js\" charset=\"UTF-8\"></script>");';
		echo 'document.write("<script type=\"text/javascript\" src=\"' . $url . 'sp/view/RemainingItemsManager.js\" charset=\"UTF-8\"></script>");';
		echo 'document.write("<script type=\"text/javascript\" src=\"' . $url . 'sp/view/SubmitCheckManager.js\" charset=\"UTF-8\"></script>");';
		echo 'document.write("<script type=\"text/javascript\" src=\"' . $url . 'sp/view/TimerSolutionManager.js\" charset=\"UTF-8\"></script>");';
		echo 'document.write("<script type=\"text/javascript\" src=\"' . $url . 'sp/view/ValidateManager.js\" charset=\"UTF-8\"></script>");';
		echo 'document.write("<script type=\"text/javascript\" src=\"' . $url . 'sp/controller/Index.js\" charset=\"UTF-8\"></script>");';

			,$basePath . '/plugin/exValidation-master/scripts/jquery.easing.js'
			,$basePath . '/plugin/exValidation-master/scripts/jQselectable.js'
			,$basePath . '/plugin/exValidation-master/scripts/exvalidation-custom.js'
			,$basePath . '/plugin/exValidation-master/scripts/exchecker-ja.js'
			,$basePath . '/request/pc/data/DataManager.js'
			,$basePath . '/request/pc/view/ElementManager.js'
			,$basePath . '/request/pc/view/ValidationManager.js'
			,$basePath . '/request/pc/converter.js'
			*/
		);
/*
		$files['css'] = array(
			// $domain . '/lib/sweet-tooltip.css'
			// $domain . '/plugin/jquery-ui-1.9.2.custom/css/smoothness/jquery-ui-1.9.2.custom.css'
			// ,$domain . '/plugin/exValidation-master/styles/style.css'
			// ,$domain . '/plugin/exValidation-master/skin/selectable/style.css'
			$basePath . '/plugin/exValidation-master/styles/exvalidation.css'
			,$basePath . '/request/pc/style.css'
		);
		*/

	} else {	// PC
	}

	return $files;
}
?>