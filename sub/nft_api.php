<?php include_once $_SERVER['DOCUMENT_ROOT'].'/includes/header.htm'; ?>
<script>
function nft_main_list(){
	$.ajax({
	   type:"GET",       
	   url:"/nft/nft_main_list",   
	   data : ({app_cd:app_cd, lang_cd:lang_cd}), // app_cd:게임코드, lang_cd:언어코드
	   timeout : 5000,     
	   cache : false,       
	   success: function whenSuccess(res){  // SUCCESS FUNCTION
		document.getElementById('nft_item_name').innerText = res.nft_name;
		document.getElementById('nft_item_price').innerText = res.sell_price;
		document.getElementById('nft_popup_name').innerText = res.nft_name;
	   },
	   error: function whenError(e){    // ERROR FUNCTION
		//alert("code : " + e.status + "\r\nmessage : " + e.responseText);
	   }
  });
}

function nft_detail_info(){
	$.ajax({
	   type:"GET",       
	   url:"/nft/nft_detail_info",   
	   data : ({idx:idx}), //idx:NFT 고유 번호
	   timeout : 5000,     
	   cache : false,       
	   success: function whenSuccess(res){  // SUCCESS FUNCTION
		//console.log(res);
	   },
	   error: function whenError(e){    // ERROR FUNCTION
		//alert("code : " + e.status + "\r\nmessage : " + e.responseText);
	   }
  });
}

function buy_nft(){
	$.ajax({
	   type:"POST",       
	   url:"",   
	   data : ({data: data}),
	   timeout : 5000,     
	   cache : false,       
	   success: function whenSuccess(res){  // SUCCESS FUNCTION
		//console.log(res);
	   },
	   error: function whenError(e){    // ERROR FUNCTION
		//alert("code : " + e.status + "\r\nmessage : " + e.responseText);
	   }
  });
}
</script>