$(function(){

    var heightNode = 10;
    var widthNode =  0;

    var LADDER = {};
    var row =0;
    var ladder = $('#ladder');
    var ladder_canvas = $('#ladder_canvas');
    var GLOBAL_FOOT_PRINT= {};
    var GLOBAL_CHECK_FOOT_PRINT= {};
    var working = false;
    var ladder_start = false;
    
    function init(){
        canvasDraw();
    }

    $('#button').on('click', function(){
        // input에 name이 member인것에 값을 담는다.
        var member = $('input[name=member]').val();
        // 만약  5명 미만일 경우
        if(member < 2){
            return alert('참여 인원 수는 최소 5명 이상이어야 합니다.')
        }
        // 만약 20명 초과인 경우
        if(member > 20){
            return alert('20명을 넘을 수 없습니다.')   
        }
        $('#landing').css({
            'opacity': 0
        });
        // member값을 widthNode에 담는다.
        widthNode = member;
        
        // 화면 전환
        setTimeout(function(){
            // index 화면을 삭제
            $('#landing').remove();
            // init() 함수에 canvasDraw()를 호출
            init();
        }, 300)

    });

    $('#startButton').click(function(){
        for(var member = 0; member < widthNode; member++){
            if(!($('input[data-node='+member + '-0]').val())){
                return alert(('0-'+member) + '님에 회원 정보가 비어 있습니다.');
            }else if(!!!($('input[data-node='+member + '-' + heightNode+']').val())) {
                return alert('결과 인풋이 비어있음');
            }
        }
        ladder_start = true;
    });

    function canvasDraw(){
        ladder.css({
            // 사다리 가로 폭
            'width' :( widthNode-1) * 100 + 6,
            // 사다리 세로 폭은 10으로 지역변수에 고정 되어 있음
            'height' : (heightNode -1 ) * 25 + 6,
            // 사다리 배경색상
            'background-color' : '#fafafa'
        });
        
       ladder_canvas
       .attr('width' , ( widthNode-1) * 100 + 6)
       .attr('height' , ( heightNode-1) * 25 + 6);
    


        setDefaultFootPrint(); // ?
        reSetCheckFootPrint();
        setDefaultRowLine(); // 사다리 대상 및 결과값 input
        setRandomNodeData(); // 사다리 
        drawDefaultLine();
        drawNodeLine();
        userSetting();
        resultSetting();
      

    }
    var userName = "";
    $(document).on('click', 'button.ladder-start', function(e){
        if(working){
            return false;
        }

        if(!ladder_start){
            alert('먼저 회원에 정보와 결과 값을 입력해주시고 사다리를 돌려주세용');
            return true;
        }
//        $('.dim').remove();
        working = true;
//        reSetCheckFootPrint();
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
    
    function startLineDrawing(node , color){

        var node = node;
        console.log('node' + node);
        var color = color;
        
        var x = node.split('-')[0]*1;
        var y = node.split('-')[1]*1;
        console.log('x' + x);
        console.log('y' + y);
        var nodeInfo = GLOBAL_FOOT_PRINT[node];

        GLOBAL_CHECK_FOOT_PRINT[node] = true;
        
        var dir = 'r'
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
            console.log('leftNode' + leftNode);  // -1-1
            var rightNode = (x+1) + "-" +y;
            console.log('rightNode' + rightNode); // 1-1
            var downNode = x +"-"+ (y + 1); // 1-2
            var leftNodeInfo = GLOBAL_FOOT_PRINT[leftNode];
            var rightNodeInfo = GLOBAL_FOOT_PRINT[rightNode];
                
            console.log('GLOBAL_FOOT_PRINT.hasOwnProperty(leftNode)' +GLOBAL_FOOT_PRINT.hasOwnProperty(leftNode));
            console.log('GLOBAL_FOOT_PRINT.hasOwnProperty(rightNode)' + GLOBAL_FOOT_PRINT.hasOwnProperty(rightNode))
            
            if(GLOBAL_FOOT_PRINT.hasOwnProperty(leftNode) && GLOBAL_FOOT_PRINT.hasOwnProperty(rightNode)){      
                var leftNodeInfo = GLOBAL_FOOT_PRINT[leftNode];
                var rightNodeInfo = GLOBAL_FOOT_PRINT[rightNode];
                if(  (leftNodeInfo["change"] &&  leftNodeInfo["draw"] && !!!GLOBAL_CHECK_FOOT_PRINT[leftNode] ) && (rightNodeInfo["change"])&&  leftNodeInfo["draw"]  && !!!GLOBAL_CHECK_FOOT_PRINT[rightNode] ){
                    //Left우선 
//                    console.log("중복일때  LEFT 우선");
                    stokeLine(x, y, 'w' , 'l' , color ,3)
                     setTimeout(function(){ 
                         return startLineDrawing(leftNode, color)
                     }, 100);
                }
                else if(  (leftNodeInfo["change"] &&  !!!leftNodeInfo["draw"] && !!!GLOBAL_CHECK_FOOT_PRINT[leftNode] ) && (rightNodeInfo["change"]) && !!!GLOBAL_CHECK_FOOT_PRINT[rightNode] ){
//                    console.log('RIGHT 우선')
                    stokeLine(x, y, 'w' , 'r' , color ,3)
                    console.log("right")
                    setTimeout(function(){ 
                        return startLineDrawing(rightNode, color)
                     }, 100);
                }
                else if(  (leftNodeInfo["change"] &&  leftNodeInfo["draw"] && !!!GLOBAL_CHECK_FOOT_PRINT[leftNode] ) && (!!!rightNodeInfo["change"]) ){
                    //Left우선 
//                    console.log("LEFT 우선");
                    stokeLine(x, y, 'w' , 'l' , color ,3)
                     setTimeout(function(){ 
                         return startLineDrawing(leftNode, color)
                     }, 100);
                }
                 else if(  !!!leftNodeInfo["change"]  &&  (rightNodeInfo["change"]) && !!!GLOBAL_CHECK_FOOT_PRINT[rightNode] ){
                    //Right우선 
//                    console.log("RIGHT 우선");
                    stokeLine(x, y, 'w' , 'r' , color ,3)
                     setTimeout(function(){ 
                         return startLineDrawing(rightNode, color)
                     }, 100);
                }
                else{
//                    console.log('DOWN 우선')
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
//                        console.log("RIGHT 우선");
                        stokeLine(x, y, 'w' , 'r' , color ,3)
                        setTimeout(function(){ 
                            return startLineDrawing(rightNode, color)
                        }, 100);
                    }else{
//                        console.log('DOWN')
                        stokeLine(x, y, 'h' , 'd' , color ,3)
                        setTimeout(function(){ 
                           return startLineDrawing(downNode, color)
                        }, 100);
                    }
                    
               }else if(GLOBAL_FOOT_PRINT.hasOwnProperty(leftNode) && !!!GLOBAL_FOOT_PRINT.hasOwnProperty(rightNode)){      
                    /// 우측라인
//                    console.log('우측라인')
                    if(  (leftNodeInfo["change"] && leftNodeInfo["draw"] ) && !!!GLOBAL_CHECK_FOOT_PRINT[leftNode] ){
                        //Right우선 
//                        console.log("LEFT 우선");
                        stokeLine(x, y, 'w' , 'l' , color ,3)
                        setTimeout(function(){ 
                            return startLineDrawing(leftNode, color)
                        }, 100);
                    }else{
//                        console.log('DOWN')
                        stokeLine(x, y, 'h' , 'd' , color ,3)
                        setTimeout(function(){ 
                           return startLineDrawing(downNode, color)
                        }, 100);
                    }
               }
            }


        }else{
//            console.log("down")
            var downNode = x +"-"+ (y + 1);
            stokeLine(x, y, 'h' , 'd' , color ,3)
            setTimeout(function(){ 
                return startLineDrawing(downNode, color)
             }, 100);
        }
    }



    function userSetting(){
        var userList = LADDER[0];
//        console.log('userList' + userList);
        var html = '';
                        // 사다리 참여하는 유저 수 
        for(var i=0; i <  userList.length; i++){
            // 회원 마다 고유 색상
            var color = '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] + (c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);
            
            // 회원마다 열을 맞추기 위해서 split로 0-0일 경우 '-' 이전 값을 x에 담는다.
            var x = userList[i].split('-')[0]*1;
            
            // 왼쪽으로 left하기 위한 변수
            var left = x * 100 - 30;
            // html에 붙히기 위해서 += 해준다.
            html += '<div class="user-wrap" style="left:'+left+'"><input type="text" data-node="'+userList[i]+'"><button class="ladder-start" style="background-color:'+color+'" data-color="'+color+'" data-node="'+userList[i]+'"></button>';
            html +='</div>'
        }
        // append함수를 사용해 ladder에 붙힌다.
        ladder.append(html);
    }
    
    function resultSetting(){
         var resultList = LADDER[heightNode-1];
//         console.log(resultList );

        var html = '';
        for(var i=0; i <  resultList.length; i++){
            
            var x = resultList[i].split('-')[0]*1;
            var y = resultList[i].split('-')[1]*1 + 1;
            var node = x + "-" + y;
            var left = x * 100  -30
            html += '<div class="answer-wrap" style="left:'+left+'"><input type="text" data-node="'+node+'">';
            html +='<p id="'+node+'-user"></p>'
            html +='</div>'
        }
        ladder.append(html);
    }

    function drawNodeLine(){
                          // 10
        for(var y =0; y < heightNode; y++){
                            // 사다리타기 참여 인원 수
            for(var x =0; x <widthNode ; x++){
                // 노드에 좌표 정보를 담기위한 변수
                var node = x + '-' + y;
                // GLOBAL_FOOT_PRINT[node]객체 배열에 정보를 nodeInf에 담는다.
                var nodeInfo  = GLOBAL_FOOT_PRINT[node];
                // 만약 변경할거고 선을 그릴거라면
                if(nodeInfo["change"] && nodeInfo["draw"] ){
                     // stokeLine메소드로 이동
                     stokeLine(x, y ,'w' , 'r' , '#ddd' , '2')
                }
            }
        }
    }

    function stokeLine(x, y, flag , dir , color , width){
        // document.getElementById 메소드를 통하여 DOM을 검색한다.
        var canvas = document.getElementById('ladder_canvas');
        // canvas를 통해 그림을 그릴 때는 Context 객체를 먼저 얻어와야 한다.
        // getContext()메소드를 통하여 CanvasRenderingContext2D를 얻어왔다.
        var ctx = canvas.getContext('2d');
        var moveToStart =0, moveToEnd =0, lineToStart =0 ,lineToEnd =0; 
        var eachWidth = 100; // 가로선
        var eachHeight = 25; // 세로선
        if(flag == "w"){
            //가로줄
            if(dir == "r"){
                ctx.beginPath(); // 새로운 경로를 만들어준다.
                moveToStart = x * eachWidth ; // 각 열마다 가로 사다리 선에 배치되는 시작 좌표 위치를 지정해준다.
                moveToEnd = y * eachHeight ; // 각 열마다 가로 사다리 선에 배치되는 끝 좌표 위치를 지정해준다.
                lineToStart = (x+ 1) * eachWidth; // 가로선 시작 좌표
                lineToEnd = y * eachHeight; // 가로선의 끝 좌표
            }else{
                // dir "l"
                ctx.beginPath();
                moveToStart = x * eachWidth;
                moveToEnd = y * eachHeight;
                lineToStart = (x- 1) * eachWidth;
                lineToEnd = y * eachHeight;
            }
        }else{
                ctx.beginPath();
                moveToStart = x * eachWidth ;
                moveToEnd = y * eachHeight;
                lineToStart = x * eachWidth ;
                lineToEnd = (y+1) * eachHeight;
        }

        ctx.moveTo(moveToStart + 3 ,moveToEnd  + 2); // 시작점으로 이동
        ctx.lineTo(lineToStart  + 3 ,lineToEnd  + 2 ); // 가로선 긋기
        ctx.strokeStyle = color; // 도형(선)의 윤곽선 색을 설정
        ctx.lineWidth = width; // 선의 두께를 설정
        ctx.stroke(); //위에 설정한 값으로 선을 그린다.
        ctx.closePath(); //위에 설정한 값으로 선을 그린다.
    }

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

    function setRandomNodeData(){
         for(var y =0; y < heightNode; y++){
            for(var x =0; x <widthNode ; x++){
                var loopNode = x + "-" + y;
                var rand = Math.floor(Math.random() * 2);
//                console.log(rand);
                if(rand == 0){
                    GLOBAL_FOOT_PRINT[loopNode] = {"change" : false , "draw" : false}
                }else{
                    if(x == (widthNode - 1)){
                        GLOBAL_FOOT_PRINT[loopNode] = {"change" : false , "draw" : false} ;    
                    }else{
//                        console.log('rand' + rand);
                        GLOBAL_FOOT_PRINT[loopNode] =  {"change" : true , "draw" : true} ;  ;
                        x = x + 1;
                         loopNode = x + "-" + y;
                         GLOBAL_FOOT_PRINT[loopNode] =  {"change" : true , "draw" : false} ;  ;
                    }
                }
            }
         }
    }

    function setDefaultFootPrint(){
                        // 10
        for(var r = 0; r < heightNode; r++){
            for(var column =0; column < widthNode; column++){
                GLOBAL_FOOT_PRINT[column + "-" + r] = false;
//                console.log(GLOBAL_FOOT_PRINT[column + "-" + r]);
            }
        }
    }
    
    function reSetCheckFootPrint(){
        for(var r = 0; r < heightNode; r++){
            for(var column =0; column < widthNode; column++){
                GLOBAL_CHECK_FOOT_PRINT[column + "-" + r] = false;
            }
        }
    }

    function setDefaultRowLine(){
        // heightNode는 10
        for(var y =0; y < heightNode; y++){
            // 행배열
            var rowArr = [];
            // widthNode 즉, 사다리 참여자 수 만큼
            for(var x =0; x <widthNode ; x++){
                // node에 id이름을 만들어 준다.
                var node = x + "-"+ row;
                // rowArr배열에 node값을 push한다.
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
             LADDER[row] =  rowArr;
             row++;
        }//end for
    }



});
