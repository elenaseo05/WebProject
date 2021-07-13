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
          if(number < 10 ){ // 최대 10명
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
    
    

    $(document).ready(function(){
        
        $('#num').click(function(){
            $('.nameMini').html(" "); //초기화 
            $('.resultMini').html(" "); //초기화 
            
            $('.nameMini').append("<h6> 참가자 이름을 입력하세요. </h6>"); // 제목 
            $('.resultMini').append("<h6> 내기를 입력하세요. </h6>"); // 제목
            
            for (i = 1; i <= numOfPerson; i++) { // 입력받은 참가자 수 만큼 input append
                $('.nameMini').append("<input type='text' placeholder='이름을 입력하세요' class='name'/>");
                $('.resultMini').append("<input type='text' placeholder='내기를 입력하세요' class='name'/>");
//              if(i % 5 == 0){ // 한줄에 입력할 갯수 
//                  $('.nameMini').append("<br>");
//                  $('.resultMini').append("<br>");
//              }
                
            }
            
            //시작버튼 활성화   
            
            
        });
        
        $('.#startBtn').click(function() {
            
              alert("적성에안 맞어");
            
        });
        
        
    });

    
</script>
</head>
<body>
    <div align="center">
    
        <h1> 사다리 게임 </h1>
         <h6> 최소 2명 최대 20명 </h6> 
            
            <div class="person">
                <h4> 참여자 입력하기 </h4>
                    <div class="number">
                       <input type='button' onclick='count("minus")' value='-'/>
                       <span id='result'>2</span>명참가 
                       <input type='button' onclick='count("plus")' value='+'/>
                       <input type="button" value="완료" id="num" >
                    </div>
                    <div class="nameGroup">
                        <span class="nameMini">
                        <!-- 이름이 입력될 곳  -->
                        </span>
                    </div>
                    
            </div>
            
            <div class="ladder">
            
            
            </div>
            
            
            <div class="result">
                <h4> 내기 입력하기 </h4>
                    <div class="resultGroup">
                        <span class="resultMini">
                        <!-- 내기가 입력될 곳  -->
                        </span>
                    </div>
                    
            </div>
            
            <div class="start">
             <input type="submit" value="게임시작" id="startBtn" >
            </div>
    
    
    </div>

</body>
</html>