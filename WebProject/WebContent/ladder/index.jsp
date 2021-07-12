<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title> 사다리 게임 </title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script type="text/javascript">

	var numOfPerson = 2;
	
	function count(type)  {
	  // 결과를 표시할 element
	  const resultElement = document.getElementById('result'); // 상수 선언 
	  
	  // 현재 화면에 표시된 값
	  let number = resultElement.innerText;
	  
	  // 더하기/빼기
	  if(type === 'plus') {
		  if(number < 20 ){ // 최대 20명
		    number = parseInt(number) + 1;
		  }
	  }else if(type === 'minus')  { // 최소 2명
		  if (number > 2){
		    number = parseInt(number) - 1;
		  } 
	  }
	  
	  // 결과 출력
	  resultElement.innerText = number;
	  numOfPerson = number;
	}
	
	function result() {
		alert(numOfPerson);
	}

// 	$(document).ready(function(){
		
// 	    var heightNode = 10;
// 	    var widthNode =  0;
		
		
// 	});

	
</script>
</head>
<body>
	<div align="center">
	
		<h1> 사다리 게임 </h1>
			
			<div class="person">
				<h4> 참여자 입력하기 </h4>
					<div class="number">
					   <h6> 최소 2명 최대 20명 </h6> 
						<input type='button' onclick='count("minus")' value='-'/>
						<span id='result'>2</span>명참가 
						<input type='button' onclick='count("plus")' value='+'/>
						<input type="button" value="완료" onclick='result()' id="num" >
					</div>
					<div class="nameGroup">
					   <h6> 참가자 이름을 입력하세요. </h6> 
                        <input type="text" placeholder="이름을 입력하세요" class="name"/>
					</div>
					
			</div>
			
	
	
	</div>

</body>
</html>