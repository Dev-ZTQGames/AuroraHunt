<?php
include $_SERVER['DOCUMENT_ROOT'] . "/includes/header.htm";

// 이메일이 빈값이면 로그인 페이지로 강제 이동
if( $_REQUEST['userEmail'] ){
 	$userEmail = $_REQUEST['userEmail'];
	$prefix_id = $_REQUEST['prefix_id'];
	$name = $_REQUEST['name'];

	if($name == ''){
		$name = $lang['Set_Nickname'];
	}
	//echo "<script>console.log('" . $userEmail . "'); </script>";
} else {

	echo '<script>
		swal({
			text: "'.$lang['Email_Check'].'",
			buttons: "'.$lang['Confirm'].'",
		}).then(function(isConfirm) {
			location.href="login.htm";
		});
	</script>'; 
	exit;

}

	$login_id =  $prefix_id . bin2hex($userEmail);		// 아이디의 기본 베이스를 중복되지 않는 이메일 기반으로 간다.
	
	$email = $userEmail;


// 같은 아이디로 이미 가입되었는지 여부 처리 
$que = mysqli_query($connect, "SELECT id FROM Accounts WHERE login_id='".$login_id."'");
$row = mysqli_fetch_assoc($que);

$already = $row['id'];

mysqli_free_result($que);

if ($already == 0) {	   // 기존 아이디가 없으면 먼저 가입 처리

	// 이메일 중복 검사
	$already = 0;
	$que = mysqli_query($connect, "SELECT count(id) as counter FROM Accounts WHERE email='" . $email . "'");
	$row = mysqli_fetch_assoc($que);
	$already = $row['counter'];

	if ($already > 0) { // 동일한 이메일로 가입된 계정이 있음
		//echo "<script>alert('" . $lang['Resigter_Failed_byEmail'] . "'); location.href='login.htm';</script>";
		include_once $_SERVER['DOCUMENT_ROOT'].'/includes/header.htm';
		session_unset();
		echo '<script>
				swal({
					text: "'.$lang['Exist_Same_Email'].'",
					buttons: "'.$lang['Confirm'].'",
				}).then(function(isConfirm) {
					location.href="login.htm";
				});
			</script>'; 
		exit;
	} 

	// usn 발급
/*	$info_usn = array();
	$query_usn = "SELECT max(usn) as usn FROM Accounts";
	$que_usn = mysqli_query($connect, $query_usn);
	$row_usn = mysqli_fetch_array($que_usn);
	$info_usn = $row_usn;
	
	$real_usn = $info_usn['usn'];
	$real_usn++;		// 맥스값에서 1증가 처리 */

	$result = mysqli_query($connect, "INSERT INTO Accounts (login_id,login_pw,email,createdAt,usn,name,lang_code,social_type) VALUES ('".$login_id."',PASSWORD('".$login_pw."'),'".$email."',now(),(SELECT max(usn)+1 FROM Accounts account),'".$name."','".strtoupper($lang_code)."','".$prefix_id."')");
	echo $result;

	if ($result > 0) {
		// 가입 성공
		mysqli_query($connect, "INSERT INTO AccountsLog (m_login_id,m_content,m_date,m_ip) VALUES ('".$login_id."','Register Success!','".date("Y-m-d H:i:s")."','".$ip."')");
		$SocialRegistrationOkay = "true";

	} else {
		// 가입 실패
		//$msg = $lang['Please_Tryagain_Later'];
	}

} 

// 로그인 처리
$info = array();

$que = mysqli_query($connect, "SELECT login_pw,PASSWORD('".$login_pw."') as check_pw, login_id, usn,id, birth, sex, name, status, grade FROM Accounts WHERE login_id='".$login_id."' COLLATE utf8_bin");		// 향후 ID 검색은 대소문자 구분 위해 COLLATE utf8_bin 추가 요망

$row = mysqli_fetch_array($que);
$info = $row;

/*
if ( $configuration['mode'] == "test / debug" ) {
	if ( $info['grade'] <= 50 )	{
		die("Administrator only can login on this Aurorahunt test server.");	
	}
}
*/

$que_ban = mysqli_query($connect, "SELECT *,NOW() AS time FROM AccountsBan WHERE m_login_id='".$login_id."' AND m_game_code = 'Platform'");
if($que_ban){
	$row_ban = mysqli_fetch_array($que_ban);
	$now = strtotime($row_ban['time']);
	$enddate = strtotime($row_ban['m_enddate']);
	$gap = $enddate - $now;
	$hours = floor($gap / 3600);
	$minutes = floor(($gap % 3600) / 60);
	$seconds = $gap % 60;
	if($row_ban['m_ban'] == 1 && $now < $enddate){
		include_once $_SERVER['DOCUMENT_ROOT'].'/includes/header.htm';
		echo '
		      <script>
				swal({
					text: "'.$lang['Block_msg'].$hours.":".$minutes.":".$seconds.'",
					buttons: "'.$lang['Confirm'].'",
					closeOnClickOutside: false,
					closeOnEsc: false,
				}).then(function(isConfirm){
					if(isConfirm){
						location.href="login.htm";
					}
				})
			  </script>';
		exit;
	} else if($row_ban['m_ban'] == 1 && $now >= $enddate) {
		$result_ban = mysqli_query($connect, "UPDATE AccountsBan SET m_ban = 0 WHERE m_login_id ='".$login_id."' AND m_game_code = 'Platform'");

		$result_banlog = mysqli_query($connect, "INSERT INTO AccountsBanLog (m_login_id,m_content,m_date) VALUES ('".$login_id."','GameCode : Platform, ban : 0, changeby: Time Up',NOW())");

		$result_query_grade = "UPDATE Accounts SET grade = '".$row_ban['m_grade_old']."' WHERE login_id = '".$login_id."'";
		$result_grade = mysqli_query($connect, $result_query_grade);

	}
}

if($info['status']=='1'){
	$today = strtotime(date('Y-m-d'));

	//탈퇴 요청일
	$target = strtotime(substr($info['ask_remove_day'],0,10));
	
	//탈퇴 요청일 + 유예기간 (탈퇴 신청 취소 가능 만료일)
	$plus_day = $target.strtotime('+15 days');

	if($today > $plus_day){
		include_once $_SERVER['DOCUMENT_ROOT'].'/includes/header.htm';
		echo '
			  <script>
				swal({
				  text: "'.$lang['Not_Exist_Member_Info'].'",
				   buttons: "'.$lang['Confirm'].'",
					}).then(function(isConfirm){
						if(isConfirm){
						location.href="login.htm";
						}
					})
			  </script>';
	} else {
		include_once $_SERVER['DOCUMENT_ROOT'].'/includes/header.htm';
		echo '
			  <script>
				swal({
				  text: "'.$lang['Want_Withdrawal_Request'].'",
				   buttons: {
						cancel : "'.$lang['Cancel'].'",
						confirm : {
							text : "'.$lang['Confirm'].'",
							value : "catch"
						},
					  },
					}).then(function(value){
						if(value == "catch"){
							$.ajax({
							   type:"POST",        
							   url:"cancel_withdraw.htm",     
							   data : ({login_id:"'.$info['login_id'].'"}),
							   timeout : 5000,  
							   cache : false,        
							   success: function whenSuccess(args){
								   console.log(args);
								switch(args.trim()){
									 case("success"):
										swal({
										  text: "'.$lang['Withdrawn'].'",
										   buttons: "'.$lang['Confirm'].'",
										}).then(function(isConfirm){
											if(isConfirm){
											location.href="login.htm";
											}
										})
									 break;
									 case("id_check"):
									   swal({
										  text: "'.$lang['Try_Again_Later'].'",
										   buttons: "'.$lang['Confirm'].'",
										}).then(function(isConfirm){
											if(isConfirm){
											location.href="login.htm";
											}
										})
									 break;
									 case("fail"):
									   swal({
										  text: "'.$lang['Try_Again_Later'].'",
										   buttons: "'.$lang['Confirm'].'",
										}).then(function(isConfirm){
											if(isConfirm){
											location.href="login.htm";
											}
										})
									 break;
								  }
							   },
							   error: function whenError(e){
								//alert("code : " + e.status + "\r\nmessage : " + e.responseText);
							  }
							});
						} else {
							location.href="login.htm";  
						}
					})	
			  </script>';
	}
} else {

	// 로그인 성공
	$_SESSION['sess_login_id'] = $login_id;
	$_SESSION['sess_change_serial_no'] = $info['change_serial_no'];
	$_SESSION['sess_usn'] = $info['usn'];

	$time = time();
	//setcookie('login_id', $login_id, time() + 60 * 60 * 24, "/", ".aurorahunt.xyz");			// 로그인이 되었다는 완료 쿠키 => 대외용 sfonline.com.tw

	setcookie('id', $info['id'], time() + 60 * 60 * 24, "/", ".aurorahunt.xyz");			// 로그인이 되었다는 완료 쿠키 => 대외용 cosmosinfra.net
	setcookie('login_id', $login_id, time() + 60 * 60 * 24, "/; samesite=none; secure", ".aurorahunt.xyz");			// 로그인이 되었다는 완료 쿠키 => 대외용 cosmosinfra.net
	setcookie('name', $info['name'], time() + 60 * 60 * 24, "/", ".aurorahunt.xyz");	
	setcookie('email', $info['email'], time() + 60 * 60 * 24, "/", ".aurorahunt.xyz");			// 로그인이 되었다는 완료 쿠키 => 대외용 cosmosinfra.net
	setcookie('time', $time, time() + 60 * 60 * 24, "/", ".aurorahunt.xyz");			
	setcookie('hash', AES128Encrypt("CO-STAZ", $login_id."|".$time."|CSVersion:180323"), time() + 60 * 60 * 24, "/", ".aurorahunt.xyz");	

	//if ( stripos($return_path, "sfonline.cosmosinfra.net" > 0 ) )	{
	//$game_code = "SF";
	//}

	$statistics_year = intval(date('Y'));
	$statistics_month = intval(date('m'));
	$statistics_day = intval(date('d'));
	$statistics_hour = intval(date('H'));

	$statistics = mysqli_query($connect, "INSERT INTO LoginLog (m_id, m_login_id, m_usn, m_lang_code, m_game_code, m_service_code, m_type, m_year, m_month, m_day, m_hour, m_date, m_success, m_ip) VALUES (".$info['id'].",'".$login_id."', ".$info['usn'].",'".strtoupper($lang_code)."','".$game_code."', '".$service_code."',3," . $statistics_year . "," . $statistics_month . "," . $statistics_day . "," . $statistics_hour . ",now(), 1,'".$ip."' )");



	if ( $SocialRegistrationOkay == "true" ) {
		//소셜로 최초 회원가입 성공
		//header("Location:https://" . $return_url ."");
		echo "<script>location.href='https://".$return_url."/extern/sso/register_agree.htm?prefix_id=".$prefix_id."';</script>"; 
		exit;
	}

		header("Location:https://" . $return_url ."");
}
?>