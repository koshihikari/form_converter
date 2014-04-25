<?php

$ua = $_SERVER['HTTP_USER_AGENT'];
$ref = $_SERVER['HTTP_REFERER'];
$type = $_GET['t'];






// ---------- add ueda 2014-04-24 bigin ---------- //
$patterns = array(
	array(
		'url'			=> str_replace("/", "\/", "http://localhost/work/form_converter/mitsui/*"),
		'baseUrl'		=> 'http://localhost/work/form_converter/mitsui/',
		'basePath'		=> 'mitsui/'
	)
);
$index = -1;
$isLocal = false;
for ($i=0,$len=count($patterns); $i<$len; $i++) {
	$patternStr = '/^' . $patterns[$i]['url'] . '/';
	if (preg_match($patternStr, $ref)) {
		$index = $i;
		$isLocal = strpos($ref, $patternStr) !== false ? true : false;
		break;
	}
}
// error_log("\n", 3, "log.txt");
// error_log('$index = ' . $index . "\n", 3, "log.txt");
// error_log('$type = ' . $type . "\n", 3, "log.txt");
// error_log('$ref = ' . $ref . "\n", 3, "log.txt");
// error_log('$patterns[$i][basePath] = ' . $patterns[$i]['basePath'] . "\n", 3, "log.txt");
// error_log('config = ' . ($patterns[$i]['basePath'] . "config.php") . "\n", 3, "log.txt");
// error_log('file_exists = ' . file_exists($patterns[$i]['basePath'] . "config.php") . "\n", 3, "log.txt");
// error_log('include_once = ' . (include_once "" . $patterns[$i]['basePath'] . "config.php") . "\n", 3, "log.txt");
if (
	$index !== -1 && $type === 'request' &&
	(
		file_exists($patterns[$i]['basePath'] . "config.php") &&
		(include_once "" .$patterns[$i]['basePath'] . "config.php")
	)
) {
	$files = getFiles($patterns[$i]['baseUrl'], $patterns[$i]['basePath'], $ref, $ua, $type, $isLocal);
	// ob_start();//ここから
	// var_dump($files);
	// $out=ob_get_contents();//ob_startから出力された内容をゲットする。
	// ob_end_clean();//ここまで
	// error_log('-----------------' . "\n", 3, 'log.txt');
	// error_log($out . "\n", 3, 'log.txt');
	// error_log('-----------------' . "\n", 3, 'log.txt');
	// 必要なJavaScriptかCSSがあれば、document.write()でフォームページに挿入する
	if (0 < count($files['js'] || 0 < count($files['css']))) {
		header("Content-type: text/javascript");
		for ($i=0,$len=count($files['css']); $i<$len; $i++) {
			echo 'document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"' . $files['css'][$i] . '\" />");';
		}
		/*
		if (0 < count($files['js'])) {	// JavaScriptを挿入する場合は、Namespace.jsをまず挿入する
			echo 'document.write("<script type=\"text/javascript\" src=\"helper/Namespace.js\" charset=\"UTF-8\"></script>");';
		}
		*/
		for ($i=0,$len=count($files['js']); $i<$len; $i++) {
			echo 'document.write("<script type=\"text/javascript\" src=\"' . $files['js'][$i] . '\" charset=\"UTF-8\"></script>");';
		}
	}

} else {
// ---------- add ueda 2014-04-24 end ---------- //





	// $ref = 'https://enq.nisshinfudosan.co.jp/form/operator/formulator/formulator_preview?id=427&key=4e9772e5dfcc5549';

	// error_log("\n", 3, 'log.txt');
	// error_log('$ua = ' . $ua . "\n", 3, 'log.txt');
	// error_log('$ref = ' . $ref . "\n", 3, 'log.txt');
	// error_log('$ref2 = ' . str_replace("/", "\/", $ref) . "\n", 3, 'log.txt');
	// error_log('$type = ' . $type . "\n", 3, 'log.txt');

	if ($type !== 'request' && $type !== 'reserve' && $type !== 'enrollment' && $type !== 'summarize') {
	// if ($type !== 'request' && $type !== 'reserve') {
		return;
	}

	$pattern = array(
		array(
			'url'			=> str_replace("/", "\/", "https://enq.nisshinfudosan.co.jp/form/fm/honsya/kanagawa"),
			'path'			=> 'nisshinfudosan',
			'converttype'	=> 'B'
		)
		,array(
			'url'			=> str_replace("/", "\/", "https://enq.nisshinfudosan.co.jp/form/fm/honsya/tokyocity_saitama"),
			'path'			=> 'nisshinfudosan',
			'converttype'	=> 'B'
		)
		,array(
			'url'			=> str_replace("/", "\/", "https://enq.nisshinfudosan.co.jp/form/fm/honsya/tokyo23"),
			'path'			=> 'nisshinfudosan',
			'converttype'	=> 'B'
		)
		,array(
			'url'			=> str_replace("/", "\/", "https://enq.nisshinfudosan.co.jp/form/.+"),
			'path'			=> 'nisshinfudosan',
			'converttype'	=> 'A'
		)
		/*
		,array(
			'url'			=> str_replace("/", "\/", "https://www.morimoto-real.co.jp/shinchiku/kawasaki-mid/toiawase.html"),
			'path'			=> 'morimoto',
			'converttype'	=> 'A'
		)
		*/
		,array(
			'url'			=> str_replace("/", "\/", "https://www.codeles.net/sato/sample_site/morimoto/request_inputA_UTF8.html"),
			'path'			=> 'morimoto',
			'converttype'	=> 'A'
		)
		,array(
			'url'			=> str_replace("/", "\/", "https://www.codeles.net/sato/sample_site/megalos/request_inputA_megalos.html"),
			'path'			=> 'megalos',
			'converttype'	=> 'A'
		)
		,array(
			'url'			=> str_replace("/", "\/", "https://i02.smp.ne.jp/u/megalos/catalog/testindex.html"),
			'path'			=> 'megalos',
			'converttype'	=> 'A'
		)
		,array(
			'url'			=> str_replace("/", "\/", "https://i02.smp.ne.jp/u/megalos/catalog/index.html"),
			'path'			=> 'megalos',
			'converttype'	=> 'A'
		)
		,array(
			'url'			=> str_replace("/", "\/", "https://www.codeles.net/sato/sample_site/yuraku2/request_inputA_UTF8_yuraku2.html"),
			'path'			=> 'yuraku',
			'converttype'	=> 'A'
		)
		,array(
			'url'		=> str_replace("/", "\/", "https://www.codeles.net/sato/sample_site/yuraku2/y_yutorishia.+"),//分け方を変更
			'path'		=> 'yuraku',
			'converttype'	=> 'C'
		)
		,array(
			'url'		=> str_replace("/", "\/", "https://www.codeles.net/sato/sample_site/yuraku2/y_yokohamatsurumi.+"),//分け方を変更
			'path'		=> 'yuraku',
			'converttype'	=> 'B'
		)
		,array(
			'url'			=> str_replace("/", "\/", "https://www.codeles.net/sato/sample_site/yuraku2/y.+"),
			'path'			=> 'yuraku',
			'converttype'	=> 'A'
		)
		,array(
			'url'		=> str_replace("/", "\/", "http://localhost/primex/modularization/y_yutorishia.+"),//分け方を変更
			'path'		=> 'yuraku',
			'converttype'	=> 'C'
		)
		,array(
			'url'		=> str_replace("/", "\/", "http://localhost/primex/modularization/y_yokohamatsurumi.+"),//分け方を変更
			'path'		=> 'yuraku',
			'converttype'	=> 'B'
		)
		,array(
			'url'		=> str_replace("/", "\/", "http://localhost/primex/modularization/y.+"),
			'path'		=> 'yuraku',
			'converttype'	=> 'A'
		)

	//有楽・テスト ここから―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "http://202.143.87.155/eso_hp/index.html\?formId=B-29"),
			'path'		=> 'yuraku2',
			'converttype'	=> 'PcC'
		)
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "http://202.143.87.155/eso_hp/index.html\?formId=B-30"),
			'path'		=> 'yuraku2',
			'converttype'	=> 'PcC'
		)
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "http://202.143.87.155/eso_hp/index_sm.html\?formId=B-29"),
			'path'		=> 'yuraku2',
			'converttype'	=> 'SpC'
		)
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "http://202.143.87.155/eso_hp/index_sm.html\?formId=B-30"),
			'path'		=> 'yuraku2',
			'converttype'	=> 'SpC'
		)
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "http://202.143.87.155/eso_hp/index.html\?formId=B-101"),
			'path'		=> 'yuraku2',
			'converttype'	=> 'PcB'
		)
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "http://202.143.87.155/eso_hp/index.html\?formId=B-102"),
			'path'		=> 'yuraku2',
			'converttype'	=> 'PcB'
		)
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "http://202.143.87.155/eso_hp/index_sm.html\?formId=B-101&r=no"),
			'path'		=> 'yuraku2',
			'converttype'	=> 'SpB'
		)
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "http://202.143.87.155/eso_hp/index_sm.html\?formId=B-102"),
			'path'		=> 'yuraku2',
			'converttype'	=> 'SpB'
		)
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "http://202.143.87.155/eso_hp/index.html$"),
			'path'		=> 'yuraku2',
			'converttype'	=> 'PcD'
		)
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "http://202.143.87.155/eso_hp/index.html.+"),
			'path'		=> 'yuraku2',
			'converttype'	=> 'PcA'
		)
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "http://202.143.87.155/eso_hp/index_sm.html.+"),
			'path'		=> 'yuraku2',
			'converttype'	=> 'SpA'
		)
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "http://202.143.87.155/eso_hp/new/index.html"),
			'path'		=> 'yuraku2',
			'converttype'	=> 'PcA'
		)
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "http://202.143.87.155/eso_hp/new_sp/index.html"),
			'path'		=> 'yuraku2',
			'converttype'	=> 'SpA'
		)
	//有楽・テスト ここまで―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

	//有楽・本番 ここから―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
		,array(//ユトリシア PC 資料請求
			'url'		=> str_replace("/", "\/", "https://ober.dga.jp/index.html\?formId=B-29"),
			'path'		=> 'yuraku',
			'converttype'	=> 'PcC'
		)
		,array(//ユトリシア PC 来場予約
			'url'		=> str_replace("/", "\/", "https://ober.dga.jp/index.html\?formId=B-30"),
			'path'		=> 'yuraku',
			'converttype'	=> 'PcC'
		)
		,array(//ユトリシア スマホ 資料請求
			'url'		=> str_replace("/", "\/", "https://ober.dga.jp/index_sm.html\?formId=B-29"),
			'path'		=> 'yuraku',
			'converttype'	=> 'SpC'
		)
		,array(//ユトリシア SP 来場予約
			'url'		=> str_replace("/", "\/", "https://ober.dga.jp/index_sm.html\?formId=B-30"),
			'path'		=> 'yuraku',
			'converttype'	=> 'SpC'
		)
		,array(//横浜鶴見 PC 資料請求
			'url'		=> str_replace("/", "\/", "https://ober.dga.jp/index.html\?formId=B-101"),
			'path'		=> 'yuraku',
			'converttype'	=> 'PcB'
		)
		,array(//横浜鶴見 PC 来場予約
			'url'		=> str_replace("/", "\/", "https://ober.dga.jp/index.html\?formId=B-102"),
			'path'		=> 'yuraku',
			'converttype'	=> 'PcB'
		)
		,array(//横浜鶴見 SP 資料請求
			'url'		=> str_replace("/", "\/", "https://ober.dga.jp/index_sm.html\?formId=B-101&r=no"),
			'path'		=> 'yuraku',
			'converttype'	=> 'SpB'
		)
		,array(//横浜鶴見 SP 来場予約
			'url'		=> str_replace("/", "\/", "https://ober.dga.jp/index_sm.html\?formId=B-102"),
			'path'		=> 'yuraku',
			'converttype'	=> 'SpB'
		)
		,array(//エラー時、確認後修正時
			'url'		=> str_replace("/", "\/", "https://ober.dga.jp/index.html$"),
			'path'		=> 'yuraku',
			'converttype'	=> 'PcD'
		)
		,array(//yuraku 通常 PC スマホ 資料請求 来場予約 入会
			'url'		=> str_replace("/", "\/", "https://ober.dga.jp/index.html.+"),
			'path'		=> 'yuraku',
			'converttype'	=> 'PcA'
		)
		,array(//yuraku 通常 PC スマホ 資料請求 来場予約 入会
			'url'		=> str_replace("/", "\/", "https://ober.dga.jp/index_sm.html.+"),
			'path'		=> 'yuraku',
			'converttype'	=> 'SpA'
		)
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "https://ober.dga.jp/new/index.html"),
			'path'		=> 'yuraku',
			'converttype'	=> 'PcA'
		)
		,array(//yurakuテストURL
			'url'		=> str_replace("/", "\/", "https://ober.dga.jp/new_sp/index.html"),
			'path'		=> 'yuraku',
			'converttype'	=> 'SpA'
		)
	//有楽・本番 ここまで―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

		,array(
			'url'		=> str_replace("/", "\/", "https://www.codeles.net/sato/sample_site/sumisho/s.+"),
			'path'		=> 'sumisho',
			'converttype'	=> 'A'
		)
		,array(
			'url'		=> str_replace("/", "\/", "https://www.codeles.net/sato/sample_site/primex/test1.+"),
			'path'		=> 'primex',
			'converttype'	=> 'A'
		)
		,array(
			'url'		=> str_replace("/", "\/", "http(s)?://www.codeles.net/sato/sample_site/mitsui/mitsui"),
			'path'		=> 'mitsui',
			'converttype'	=> 'A'
		)
	//三井テスト ここまで―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
	//三井本番サーバテスト ここから―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
		,array(
			'url'		=> str_replace("/", "\/", "http(s)?://www.g.31sumai.com/form/Profile"),
			'path'		=> 'mitsui',
			'converttype'	=> 'A'
		)
		,array(
			'url'		=> str_replace("/", "\/", "http(s)?://www.g.31sumai.com/form/DocumentInput"),
			'path'		=> 'mitsui',
			'converttype'	=> 'A'
		)
		,array(
			'url'		=> str_replace("/", "\/", "http(s)?://www.g.31sumai.com/form/Attend"),
			'path'		=> 'mitsui',
			'converttype'	=> 'A'
		)
		,array(
			'url'		=> str_replace("/", "\/", "http(s)?://sp.g.31sumai.com/sp/doc"),
			'path'		=> 'mitsui',
			'converttype'	=> 'A'
		)
	//三井本番サーバテスト ここまで―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
	//三井本番 ここから―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
		,array(
			'url'		=> str_replace("/", "\/", "http(s)?://www.31sumai.com/form/Profile"),
			'path'		=> 'mitsui',
			'converttype'	=> 'A'
		)
		,array(
			'url'		=> str_replace("/", "\/", "http(s)?://www.31sumai.com/form/DocumentInput"),
			'path'		=> 'mitsui',
			'converttype'	=> 'A'
		)
		,array(
			'url'		=> str_replace("/", "\/", "http(s)?://www.31sumai.com/form/Attend"),
			'path'		=> 'mitsui',
			'converttype'	=> 'A'
		)
		,array(
			'url'		=> str_replace("/", "\/", "http(s)?://sp.31sumai.com/sp/doc"),
			'path'		=> 'mitsui',
			'converttype'	=> 'A'
		)
	//三井本番 ここまで―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――




	//三井本番 ここから―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
		,array(
			'url'		=> str_replace("/", "\/", "http://localhost/work/form_converter/mitsui2/"),
			'path'		=> 'mitsui2',
			'converttype'	=> 'A'
		)
	//三井本番 ここまで―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

	);
	$index = -1;
	for ($i=0,$len=count($pattern); $i<$len; $i++) {
		$patternStr = '/^' . $pattern[$i]['url'] . '/';
		if (preg_match($patternStr, $ref)) {
			$index = $i;
			break;
		}
	}

	// error_log('$index = ' . $index . "\n", 3, 'log.txt');


	header("Content-type: text/javascript");
	if($index !== -1) {
		$converttype = $pattern[$index]['converttype'];
		$path = $pattern[$index]['path'];
		$urlpath = 'https://www.codeles.net/form_converter/' . $path . '/';//localとサーバの変更点 2
		// $urlpath = 'http://localhost/primex/modularization/' . $path . '/';//localとサーバの変更点 2

		include_once "" . $path . "/readfile_" . $path . ".php";
		readFilesEcho($ua,$type,$path,$urlpath,$converttype);
	}







// ---------- add ueda 2014-04-24 bigin ---------- //
}
// ---------- add ueda 2014-04-24 end ---------- //






exit();

?>