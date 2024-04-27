<?php
//  PSCT 노드 연결 플랫폼 API
//  Last Update : 2023-03-12
//
// mode : 
// - getAddress
// - getBalance
// - MiningStart
//
// return_path : 
// - N/A
//
// Example Callback 
// https://dev.aurorahunt.xyz/extern/api/node/peer.php?mode=getAddress&login_id=neoguru0&game_code=clwmc
// https://dev.aurorahunt.xyz/extern/api/node/peer.php?mode=MiningStart&login_id=neoguru0&game_code=clwmc{&option=nft|123|123|123}
// https://dev.aurorahunt.xyz/extern/api/node/peer.php?mode=MiningStatus&login_id=neoguru0&game_code=clwmc 
// https://dev.aurorahunt.xyz/extern/api/node/peer.php?mode=getBalance&login_id=neoguru0&game_code=clwmc
//
// 구매 진행시 반드시 해당 게임 캐시의 잔액 조회(getCash)를 먼저 실행 후, 게임 캐시가 충분할 경우 구매 처리하는 것을 추천함.

header("Content-Type: application/json");

include $_SERVER['DOCUMENT_ROOT'] . "/includes/config.php";

$mode			= escape_string(trim($_REQUEST['mode']));				// mode 메소드 값
$login_id			= escape_string(trim($_REQUEST['login_id']));				// 로그인 아이디 ( 필수값 )
$game_code		= escape_string(trim($_REQUEST['game_code']));			// 게임 코드 ( 필수 값 )

$amount			= escape_string(trim($_REQUEST['amount']));			// 토큰 수량 ( PSCT )

//$option			= escape_string(trim($_REQUEST['option']));				//  채굴 옵션

//echo $option;

//print_r(explode("|",$option));
//exit;

// 로그 설정
if ( $mode )				$proc1 = $mode;
if ( $login_id )			$proc2 .= "login_id : " . $login_id;
if ( $game_code )		$proc2 .= ", game_code : " . $game_code;

// 게임 서버 호출 IP 화이트 리스트 체크 여부 확인 요망 ( by neoguru )
if ( $mode == "" || $login_id == "" || $game_code == "" )	{
	$array = array("result" => "0", "msg" => "Default required parameter not passed."); // 기본 필수 매개 변수가 전달되지 않았습니다.

	$json_result = json_encode($array);
	print($json_result);

	output_log($json_result, "NODE");
	exit;
}

if( $configuration['mode'] == "development / alpha" )		{ $HOST = $nodeURL[$game_code]["dev"]; $M_PUBLIC = $AH_node[$game_code]["dev"]["public"]; }
if( $configuration['mode'] == "test / debug" )				{ $HOST = $nodeURL[$game_code]["test"]; $M_PUBLIC = $AH_node[$game_code]["test"]["public"]; }
if( $configuration['mode'] == "service / release" )			{ $HOST = $nodeURL[$game_code]["live"]; $M_PUBLIC = $AH_node[$game_code]["live"]["public"]; }


// 호스트 체크 
if ( $HOST == "" )	{
	$array = array("result" => "0", "msg" => "Host information is not set properly due to an invalid game_code."); // 기본 필수 매개 변수가 전달되지 않았습니다.

	$json_result = json_encode($array);
	print($json_result);

	output_log($json_result, "NODE");
	exit;
}


// login_id에 대한 지갑 주소가 있는지 확인하고 없으면 발급해서 전달한다. 
if ( $mode == "getAddress" ) {

	// 지갑 유무 확인
	$info_checkWallet = array();
	$que_checkWallet = mysqli_query($connect, "SELECT m_index, m_key_public FROM AccountsPSCTNodeWallet WHERE m_game_code = '".$game_code."' AND m_login_id='".$login_id."'");
	$row_checkWallet = mysqli_fetch_array($que_checkWallet);
	$info_checkWallet = $row_checkWallet;

	$m_index			= $info_checkWallet['m_index'];
	$m_key_public  = $info_checkWallet['m_key_public'];

	if ( $m_index == "" ) {
		$url = $HOST . "/api/account.php?address=getAddress";
		$return_data = curl_return_json($url);

		// 지갑 부존재시 생성하여 디비 삽입
		mysqli_query($connect, "INSERT INTO AccountsPSCTNodeWallet (m_login_id,m_game_code,m_key_private, m_key_public,m_date) VALUES ('".$login_id."', '".$game_code."', '".$return_data["response"]["private_key"]."','".$return_data["response"]["public_key"]."','".date("Y-m-d H:i:s")."')");

	//	$array = array("result" => "1", "msg" => "Request OK, Success.", "private_key" => $return_data["response"]["private_key"], "public_key" => $return_data["response"]["public_key"]);
		$array = array("result" => "1", "msg" => "Request OK, Success.", "public_key" => $return_data["response"]["public_key"]);

		$json_result = json_encode($array);
		print($json_result);

		output_log($json_result, "NODE");
	}
	else {

		$array = array("result" => "1", "msg" => "Request OK, Success.", "public_key" => $m_key_public);

		$json_result = json_encode($array);
		print($json_result);

		output_log($json_result, "NODE");

	}

}


// 
if ( $mode == "getBalance" ) {

	// 지갑 유무 확인
	$info_checkWallet = array();
	$que_checkWallet = mysqli_query($connect, "SELECT m_key_public FROM AccountsPSCTNodeWallet WHERE m_game_code = '".$game_code."' AND m_login_id='".$login_id."'");
	$row_checkWallet = mysqli_fetch_array($que_checkWallet);
	$info_checkWallet = $row_checkWallet;

	$m_key_public  = $info_checkWallet['m_key_public'];

	$url = $HOST . "/api/balance.php?address=" . $m_key_public;
	$return_data = curl_return_json($url);

	$array = array("result" => "1", "msg" => "Request OK, Success.", "balance" => $return_data["response"]["balance"]);

	$json_result = json_encode($array);
	print($json_result);

	output_log($json_result, "NODE");

}


// 
if ( $mode == "MiningStart" ) {

	// 지갑 유무 확인
	$info_checkWallet = array();
	$que_checkWallet = mysqli_query($connect, "SELECT m_key_public, m_NFTs, m_NFT_images FROM AccountsPSCTNodeWallet WHERE m_game_code = '".$game_code."' AND m_login_id='".$login_id."'");
	$row_checkWallet = mysqli_fetch_array($que_checkWallet);
	$info_checkWallet = $row_checkWallet;

	$m_key_public  = $info_checkWallet['m_key_public'];
	$m_NFTs			= $info_checkWallet['m_NFTs'];
	$m_NFT_images	= $info_checkWallet['m_NFT_images'];

	$url = $HOST . "/api/mining.php?address=" . $m_key_public . "&mode=start&option=" .  $m_NFTs;
	$return_data = curl_return_json($url);

	$array = array("result" => "1", "msg" => "Request OK, Success.", "status" => $return_data["response"]["start"], "NFTs" => $m_NFTs, "NFT_images" => $m_NFT_images);

	$json_result = json_encode($array);
	print($json_result);

	output_log($json_result, "NODE");

}

// 
if ( $mode == "MiningStatus" ) {

	// 지갑 유무 확인
	$info_checkWallet = array();
	$que_checkWallet = mysqli_query($connect, "SELECT m_key_public FROM AccountsPSCTNodeWallet WHERE m_game_code = '".$game_code."' AND m_login_id='".$login_id."'");
	$row_checkWallet = mysqli_fetch_array($que_checkWallet);
	$info_checkWallet = $row_checkWallet;

	$m_key_public  = $info_checkWallet['m_key_public'];

	$url = $HOST . "/api/mining.php?address=" . $m_key_public . "&mode=status";
	$return_data = curl_return_json($url);

	$array = array("result" => "1", "msg" => "Request OK, Success.", "status" => $return_data["response"]["status"]);

	$json_result = json_encode($array);
	print($json_result);

	output_log($json_result, "NODE");

}

// 
if ( $mode == "NFTInfo" ) {

	// 지갑 유무 확인
	$info_checkWallet = array();
	$que_checkWallet = mysqli_query($connect, "SELECT m_NFTs, m_NFT_images FROM AccountsPSCTNodeWallet WHERE m_game_code = '".$game_code."' AND m_login_id='".$login_id."'");
	$row_checkWallet = mysqli_fetch_array($que_checkWallet);
	$info_checkWallet = $row_checkWallet;

	$m_NFTs			= $info_checkWallet['m_NFTs'];
	$m_NFT_images	= $info_checkWallet['m_NFT_images'];

	$array = array("result" => "1", "msg" => "Request OK, Success.", "NFTs" => $m_NFTs, "NFT_images" => $m_NFT_images);

	$json_result = json_encode($array);
	print($json_result);

	output_log($json_result, "NODE");

}

// 
if ( $mode == "Consume" ) {

	// 지갑 유무 확인
	$info_checkWallet = array();
	$que_checkWallet = mysqli_query($connect, "SELECT m_key_public FROM AccountsPSCTNodeWallet WHERE m_game_code = '".$game_code."' AND m_login_id='".$login_id."'");
	$row_checkWallet = mysqli_fetch_array($que_checkWallet);
	$info_checkWallet = $row_checkWallet;

	$m_key_public  = $info_checkWallet['m_key_public'];

	$url = $HOST . "/api/send_token.php?from=" . $m_key_public . "&to=" . $M_PUBLIC . "&amount=" . $amount;
	$return_data = curl_return_json($url);

	$array = array("result" => "1", "msg" => "Request OK, Success.", "status" => $return_data["response"]);

	$json_result = json_encode($array);
	print($json_result);

	output_log($json_result, "NODE");

}

//
if ( $mode == "Reward" ) {

	// 지갑 유무 확인
	$info_checkWallet = array();
	$que_checkWallet = mysqli_query($connect, "SELECT m_key_public FROM AccountsPSCTNodeWallet WHERE m_game_code = '".$game_code."' AND m_login_id='".$login_id."'");
	$row_checkWallet = mysqli_fetch_array($que_checkWallet);
	$info_checkWallet = $row_checkWallet;

	$m_key_public  = $info_checkWallet['m_key_public'];

	$url = $HOST . "/api/send_token.php?from=" . $M_PUBLIC . "&to=" . $m_key_public . "&amount=" . $amount;
	$return_data = curl_return_json($url);

	$array = array("result" => "1", "msg" => "Request OK, Success.", "status" => $return_data["response"]);

	$json_result = json_encode($array);
	print($json_result);

	output_log($json_result, "NODE");

}
?>

