# Ladder Gram 

### CLICK Action
```javascript 
    $('#button').on('click', function(){
        var member = $('input[name=member]').val();
        if(member < 2){
            return alert('최소 2명 이상 입력하세요')
        }
        
        if(member > 15){
            return alert('15명까지 입력가능합니다.')   
        }
        $('#landing').css({
            'opacity': 0
        });
        widthNode = member;
        setTimeout(function(){
            $('#landing').remove();
            init();
        }, 310)
        
    });

```

- if문을 통하여 입력받은 참가자의 수가 2 미만, 10을 초과하는 경우 리턴한다.
- landing은 사다리 index.html을 감싸는 id 속성인 투명도를 0으로 설정해준다. 
- setTimeout()함수를 사용해 index화면을 삭제하고 0.3초 후 init()함수를 실행한다.

### init()
```javascript 
    function init(){
        canvasDraw();
    }

```

- canvasDraw()를 호출한다.

------------
### canvasDraw()

```javascript 

    function canvasDraw(){
        ladder.css({
            'width' :( widthNode-1) * 100 + 6,
            'height' : (heightNode -1 ) * 25 + 6,
            'background-color' : '#fff'
        });

       ladder_canvas
       .attr('width' , ( widthNode-1) * 100 + 6)
       .attr('height' , ( heightNode-1) * 25 + 6);

        setDefaultFootPrint();
        reSetCheckFootPrint();
        setDefaultRowLine();
        setRandomNodeData();
        drawDefaultLine();
        drawNodeLine();
        userSetting();
        resultSetting();
        
    }

```

- ladder(id가 ladder인 Elements)의 css를 입력받은 값에 알맞게 크기를 조정한다. 또한 배경색을 fff -> 화이트로 지정한다. 
- ladder_canvas(id가 ladder_canvas인 Elements) 의 속성을 넓이 100, 높이 25의 간격으로 맞춘다. 

------------
### setDefaultFootPrint()

```javascript 

    function setDefaultFootPrint(){
      
        for(var r = 0; r < heightNode; r++){
            for(var column =0; column < widthNode; column++){
                GLOBAL_FOOT_PRINT[column + "-" + r] = false;
            }
        }
    }
    
```

 heightNode = 10, widthNode = 참가자 수   
 즉 한 raw 당 colum이 반복된다.   

 배열을 'false'로 초기화 
 'GLOBAL_FOOT_PRINT' 배열은 "column-raw" 형식으로 저장된다.   
 사다리를 그릴때 사용된다. 

------------
### reSetCheckFootPrint()

```javascript 

    function reSetCheckFootPrint(){

        for(var r = 0; r < heightNode; r++){
            for(var column =0; column < widthNode; column++){
                GLOBAL_CHECK_FOOT_PRINT[column + "-" + r] = false;
            }
        }
    }
    
```

- 'GLOBAL_CHECK_FOOT_PRINT' 배열을 'false'로 초기화 
- 'setDefaultFootPrint()' 와 동일 

------------
### setDefaultRowLine()

```javascript 

    function setDefaultRowLine(){

        for(var y =0; y < heightNode; y++){
            var rowArr = [];
            for(var x =0; x <widthNode ; x++){
                var node = x + "-"+ row;
                rowArr.push(node);
                // 노드그리기
                var left = x * 100;
                var top = row * 25;
                var node = $('<div></div>')
                .attr('class' ,'node')
                .attr('id' , node)
                .attr('data-left' , left)
                .attr('data-top' , top)
                .css({
                    'position' : 'absolute',
                    'left' : left,
                    'top' : top
                });
                ladder.append(node);
             }
             LADDER[row] = rowArr;
             row++;
        }
    }

```

- 각 노드들의 좌표를 위한 '<div>'태그 생성을 위한 함수
- '<div>' 태그를 만들고 속성 설정 
- `class`는 "node"로 설정
- `id`는 'node' 값으로 설정
- `data-left`는 `x * 100;`으로 설정
- `data-top`은 `row * top`으로 설정

------------
### setRandomNodeData()

```javascript 
    
    function setRandomNodeData(){
        for(var y =0; y < heightNode; y++){
           for(var x =0; x <widthNode ; x++){
               var loopNode = x + "-" + y;
               var rand = Math.floor(Math.random() * 2);
               if(rand == 0){
                   GLOBAL_FOOT_PRINT[loopNode] = {"change" : false , "draw" : false}
               }else{
                   if(x == (widthNode - 1)){ // 마지막 열 
                       GLOBAL_FOOT_PRINT[loopNode] = {"change" : false , "draw" : false} ;    
                   }else{
                       GLOBAL_FOOT_PRINT[loopNode] =  {"change" : true , "draw" : true} ;  ;
                       x = x + 1;
                        loopNode = x + "-" + y;
                        GLOBAL_FOOT_PRINT[loopNode] =  {"change" : true , "draw" : false} ;  ;
                   }
               }
           }
        }
   }
    
```
 - 'Math.floor(Math.random() * 2);'로 50:50 확률
 - 즉 rand 가 1이고, 마지막 노드가 아닐때 'change'와 'draw'를 'true'로 초기화
 - 그 후 'change'는 가능하지만, 'draw'는 불가능 [ |-|-|-| 이렇게 되면 안되기때문  ]
------------
### drawDefaultLine()
- 세로선을 그리는 메소드 (default)

```javascript 

   function drawDefaultLine(){
        var html = '';
        html += '<table>'
        for(var y =0; y < heightNode-1; y++){
            html += '<tr>';
            for(var x =0; x <widthNode-1 ; x++){
                html += '<td style="width:98px; height:25px; border-left:2px solid #ddd; border-right:2px solid #ddd;"></td>';
            }
            html += '</tr>';
        }
        html += '</table>'
        ladder.append(html);
    }
    
```
- '<table>'을 만드는 메소드 
- 사다리 높이 만큼 '<tr>' 참여자 수 만큼 '<td>' 생성 


------------
### drawNodeLine()
- 라인을 그릴수 있도로 매개변수를 전달하는 매소드 

```javascript 

    function drawNodeLine(){

        for(var y =0; y < heightNode; y++){
            for(var x =0; x <widthNode ; x++){
                var node = x + '-' + y;
                var nodeInfo  = GLOBAL_FOOT_PRINT[node];
                if(nodeInfo["change"] && nodeInfo["draw"] ){
                     stokeLine(x, y ,'w' , 'r' , '#ddd' , '2')
                }else{

                }
            }
        }
    }
    
```
- 반복문을 통해 배열의 change와 draw가 모두 참인지 판별후 참일 경우 'stokeLine()'를 호출

------------
### userSetting()
- 참여자 이름과 색상을 정하는 메서드 

```javascript 

    function userSetting(){
        var userList = LADDER[0];
        var html = '';
        for(var i=0; i < userList.length; i++){
            var color = '#'+(
                function lol(m,s,c){
                    return s[m.floor(m.random() * s.length)] 
                    + (c && lol(m,s,c-1));
                })(Math,'0123456789ABCDEF',4);

            var x = userList[i].split('-')[0]*1;
            var y = userList[i].split('-')[1]*1;
            var left = x * 100 - 30
            html += '<div class="user-wrap" style="left:'+left+'"><input type="text" data-node="'+userList[i]+'"><button class="ladder-start" style="background-color:'+color+'" data-color="'+color+'" data-node="'+userList[i]+'"></button>';
            html +='</div>'
        }
        ladder.append(html);
    }
    
```
 - color변수에 색상을 '0123456789ABCDEF'중 4개를 골라 16진수를 랜덤하게 저장
 - 각 자리수 를 추출하여 위치를 정해 주고, div태그와 input 텍스트 태그, button태그에 속성에 맞게 입력 후 append
------------

### resultSetting()

```javascript 
    function resultSetting(){
         var resultList = LADDER[heightNode-1];
         console.log(resultList )

        var html = '';
        for(var i=0; i <  resultList.length; i++){
            
            var x = resultList[i].split('-')[0]*1;
            var y = resultList[i].split('-')[1]*1 + 1;
            var node = x + "-" + y;
            var left = x * 100 - 30
            html += '<div class="answer-wrap" style="left:'+left+'"><input type="text" data-node="'+node+'">';
            html +='<p id="'+node+'-user"></p>'
            html +='</div>'
        }
        ladder.append(html);
    }

```
- 참가자 수에 맞게 내기 결과를 세팅하고 내기 내용을 입력 할 수 있도록 한 메소드 
- userSetting() 와 동일한 방식 (color 설정 없음)

------------
### stokeLine()
- canvas 그림그리기 

```javascript 


    function stokeLine(x, y, flag , dir , color , width){
        var canvas = document.getElementById('ladder_canvas');
        var ctx = canvas.getContext('2d');
        var moveToStart =0, moveToEnd =0, lineToStart =0 ,lineToEnd =0; 
        var eachWidth = 100; 
        var eachHeight = 25;
        if(flag == "w"){
            //가로줄
           
            if(dir == "r"){ // 오른쪽
                ctx.beginPath();
                moveToStart = x * eachWidth ;
                moveToEnd = y * eachHeight ;
                lineToStart = (x+ 1) * eachWidth;
                lineToEnd = y * eachHeight;
                
            }else{ // 왼쪽
                // dir "l"
                 ctx.beginPath();
                moveToStart = x * eachWidth;
                moveToEnd = y * eachHeight;
                lineToStart = (x- 1) * eachWidth;
                lineToEnd = y * eachHeight;
            }

        }else{ //h 일때 
                ctx.beginPath();
                moveToStart = x * eachWidth ;
                moveToEnd = y * eachHeight;
                lineToStart = x * eachWidth ;
                lineToEnd = (y+1) * eachHeight;
        }

        ctx.moveTo(moveToStart + 3 ,moveToEnd  + 2);
        ctx.lineTo(lineToStart  + 3 ,lineToEnd  + 2 );
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.closePath();
    }


    
```
- 가로줄 세로줄 구분 
- l = Left 우선 | r = Right 우선
- 매개 변수로 canvas 속성 변경하기 
- 좌표를 초기화 하여 

------------
### CLICK Action
- 참여자 색상 클릭 시 이벤트 


```javascript 

    var userName = "";
    $(document).on('click', 'button.ladder-start', function(e){
        if(working){
            return false;
        }
        $('.dim').remove();
        working = true;
        reSetCheckFootPrint();
        var _this = $(e.target);
        _this.attr('disabled' ,  true).css({
            'color' : '#000',
            'border' : '1px solid #F2F2F2',
            'opacity' : '0.3'
        })
        var node = _this.attr('data-node');
        var color =  _this.attr('data-color');
        startLineDrawing(node, color);
        userName =  $('input[data-node="'+node+'"]').val();
    })


    
```
- working 하지 않을 때에만 작동 
- dim '<div>' 태그 remove
- GLOBAL_CHECK_FOOT_PRINT 배열을 reSetCheckFootPrint()를 통해 초기화
- 클릭한 객체의 속성을 위와 같이 바꿈 또한 클릭한 객체의 node와 color를 startLineDrawing()의 매개변수로 던짐 
- data-color는 참여자 고유 색상 




------------
### startLineDrawing()

```javascript 


    function startLineDrawing(node , color){

        var node = node;
        var color = color;
        
        var x = node.split('-')[0]*1;
        var y = node.split('-')[1]*1;
        var nodeInfo = GLOBAL_FOOT_PRINT[node];

        GLOBAL_CHECK_FOOT_PRINT[node] = true;
        
        var dir = 'r';
        if(y == heightNode ){
            reSetCheckFootPrint();
            var target = $('input[data-node="'+node+'"]');
            target.css({
                'background-color' : color
            })
            $('#' + node + "-user").text(userName)
             working = false;
            return false;
        }
        if(nodeInfo["change"] ){
            var leftNode = (x-1) + "-" +y;
            var rightNode = (x+1) + "-" +y;
            var downNode = x +"-"+ (y + 1);
            var leftNodeInfo = GLOBAL_FOOT_PRINT[leftNode];
            var rightNodeInfo = GLOBAL_FOOT_PRINT[rightNode];
                
            if(GLOBAL_FOOT_PRINT.hasOwnProperty(leftNode) && GLOBAL_FOOT_PRINT.hasOwnProperty(rightNode)){      
                var leftNodeInfo = GLOBAL_FOOT_PRINT[leftNode];
                var rightNodeInfo = GLOBAL_FOOT_PRINT[rightNode];
                if(  (leftNodeInfo["change"] &&  leftNodeInfo["draw"] && !!!GLOBAL_CHECK_FOOT_PRINT[leftNode] ) && (rightNodeInfo["change"])&&  leftNodeInfo["draw"]  && !!!GLOBAL_CHECK_FOOT_PRINT[rightNode] ){
                    //Left우선 
                    console.log("중복일때  LEFT 우선");
                    stokeLine(x, y, 'w' , 'l' , color ,3)
                     setTimeout(function(){ 
                         return startLineDrawing(leftNode, color)
                     }, 100);
                }
                else if(  (leftNodeInfo["change"] &&  !!!leftNodeInfo["draw"] && !!!GLOBAL_CHECK_FOOT_PRINT[leftNode] ) && (rightNodeInfo["change"]) && !!!GLOBAL_CHECK_FOOT_PRINT[rightNode] ){
                    console.log('RIGHT 우선')
                    stokeLine(x, y, 'w' , 'r' , color ,3)
                    console.log("right")
                    setTimeout(function(){ 
                        return startLineDrawing(rightNode, color)
                     }, 100);
                }
                else if(  (leftNodeInfo["change"] &&  leftNodeInfo["draw"] && !!!GLOBAL_CHECK_FOOT_PRINT[leftNode] ) && (!!!rightNodeInfo["change"]) ){
                    //Left우선 
                    console.log("LEFT 우선");
                    stokeLine(x, y, 'w' , 'l' , color ,3)
                     setTimeout(function(){ 
                         return startLineDrawing(leftNode, color)
                     }, 100);
                }
                 else if(  !!!leftNodeInfo["change"]  &&  (rightNodeInfo["change"]) && !!!GLOBAL_CHECK_FOOT_PRINT[rightNode] ){
                    //Right우선 
                    console.log("RIGHT 우선");
                    stokeLine(x, y, 'w' , 'r' , color ,3)
                     setTimeout(function(){ 
                         return startLineDrawing(rightNode, color)
                     }, 100);
                }
                else{
                    console.log('DOWN 우선')
                    stokeLine(x, y, 'h' , 'd' , color ,3)
                    setTimeout(function(){ 
                       return startLineDrawing(downNode, color)
                    }, 100);
                }
            }else{
                console.log('else')
               if(!!!GLOBAL_FOOT_PRINT.hasOwnProperty(leftNode) && GLOBAL_FOOT_PRINT.hasOwnProperty(rightNode)){      
                    /// 좌측라인
                    console.log('좌측라인')
                    if(  (rightNodeInfo["change"] && !!!rightNodeInfo["draw"] ) && !!!GLOBAL_CHECK_FOOT_PRINT[rightNode] ){
                        //Right우선 
                        console.log("RIGHT 우선");
                        stokeLine(x, y, 'w' , 'r' , color ,3)
                        setTimeout(function(){ 
                            return startLineDrawing(rightNode, color)
                        }, 100);
                    }else{
                        console.log('DOWN')
                        stokeLine(x, y, 'h' , 'd' , color ,3)
                        setTimeout(function(){ 
                           return startLineDrawing(downNode, color)
                        }, 100);
                    }
                    
               }else if(GLOBAL_FOOT_PRINT.hasOwnProperty(leftNode) && !!!GLOBAL_FOOT_PRINT.hasOwnProperty(rightNode)){      
                    /// 우측라인
                    console.log('우측라인')
                    if(  (leftNodeInfo["change"] && leftNodeInfo["draw"] ) && !!!GLOBAL_CHECK_FOOT_PRINT[leftNode] ){
                        //Right우선 
                        console.log("LEFT 우선");
                        stokeLine(x, y, 'w' , 'l' , color ,3)
                        setTimeout(function(){ 
                            return startLineDrawing(leftNode, color)
                        }, 100);
                    }else{
                        console.log('DOWN')
                        stokeLine(x, y, 'h' , 'd' , color ,3)
                        setTimeout(function(){ 
                           return startLineDrawing(downNode, color)
                        }, 100);
                    }
               }
            }


        }else{
            console.log("down")
            var downNode = x +"-"+ (y + 1);
            stokeLine(x, y, 'h' , 'd' , color ,3)
            setTimeout(function(){ 
                return startLineDrawing(downNode, color)
             }, 100);
        }
    }


   
```



------------

