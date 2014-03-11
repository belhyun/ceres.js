$(window).load(function(){

		var mouse = {x:0 , y:0};
		var o = {x:0 , y:0};
		var arraynow = [];
		var arrayactualx = [];
		var arrayactualy = [];
		var ml , mr , nt , nb;
		var top = 0 , left = 0 , num=0;
		var coordinate , coordinateX , coordinateY;
		var min = 1 , sec = 5; // 타이머
		var flag = true;
		var empty;
    
    //그림의 부분만 표시하기 위해 좌표값 세팅
		for(var i=1 ; i<10 ; i++){
		    coordinate = $('li:nth-child('+i+')').position();
		    coordinateX = coordinate.left;
		    coordinateY = coordinate.top;
			  arraynow.push(coordinate);
		}
    
    //각 단위의 실제 좌표를 구함
		for(var i=0 ; i<9 ; i++){
			if( (i % 3 == 0) && (i!=0) ){
				top+=100;
				left = 0;
			}
			o.x = left;
			o.y = top;
			arrayactualx.push(o.x);
			arrayactualy.push(o.y);
			left+=100;
		}

    //빈 타일의 좌표값을 구함
		empty = $('li.empty').attr('id').substring(1,2);
		o.x = arraynow[empty].left;
	  o.y = arraynow[empty].top;

    //hover 했을 때 empty 타일의 상하좌우에 효과 부여
		$('li').hover(function(){
			var bool = true;
      //hover 요소의 좌표값을 구함
			coordinate = $(this).position();
			coordinateX = coordinate.left;
			coordinateY = coordinate.top;

      //empty 타일의 좌측에 대해서
			ml = coordinateX - 100;
      if(arraynow[empty].left == ml && arraynow[empty].top == coordinateY){
					$(this).addClass('neighbor');
					bool = false;
				}
			//empty 타일의 우측에 대해서
			mr = coordinateX + 100;
				if(arraynow[empty].left == mr && arraynow[empty].top == coordinateY){
					$(this).addClass('neighbor');
					bool = false;
				}			
		 //empty 타일의 하단에 대해서			
			nt = coordinateY - 100;
				if(arraynow[empty].left == coordinateX && arraynow[empty].top == nt){
					$(this).addClass('neighbor');
					bool = false;
				}
			//empty 타일의 상단에 대해서	
			nb = coordinateY + 100;
				if(arraynow[empty].left == coordinateX && arraynow[empty].top == nb){
					$(this).addClass('neighbor');
					bool = false;
				}
				
			if(bool){
				$(this).removeClass('neighbor');
			}

			if(!flag){
				$('li').removeClass('neighbor');
			}
		});

    //타일 이동
		$('.puzzle li').click(function(){
			if(flag){
      //mouse 객체에 좌표값 바인딩
			var p = $(this).position();
			mouse.x =  p.left;
			mouse.y =  p.top;
      //id extract
			var id = $(this).attr('id').substring(1,2);
			//좌측
			ml = mouse.x - 100;
        //빈 타일이 좌측에 있을 경우
			 	if(o.x == ml && o.y == mouse.y ){
          //빈 타일을 우측으로 옮김
			 		o.x+=100;
          //원래 타일을 빈 타일이 있는 자리로
			 		arraynow[id].left-=100;
          //실제 빈 타일을 이동
			 		arraynow[empty].left=o.x;
          //css 효과
			 		$(this).css({left : o.x-100+'px'});
          //실제 타일을 빈 타일 자리로 이동
			 		$('li:nth-child('+empty+')').next().css({left : o.x+'px'});
			 	}
      //우측
			mr = mouse.x + 100;
				if( o.x == mr && mouse.y == o.y){
					o.x-=100;
					arraynow[id].left+=100;
			 		arraynow[empty].left=o.x;
					$(this).css({left : o.x+100+'px'} );
					$('li:nth-child('+empty+')').next().css({left : o.x+'px'});
				} 
      //하단
			nt = mouse.y-100;
				if(o.y == nt && mouse.x == o.x ){
					o.y+=100;
					arraynow[id].top-=100;
			 		arraynow[empty].top=o.y;
					$(this).css({top : o.y-100+'px'} );
					$('li:nth-child('+empty+')').next().css({top : o.y+'px'} );
				}	
      //상단
			nb = mouse.y+100;
				if(o.y == nb && mouse.x == o.x ){
					o.y-=100;
					arraynow[id].top+=100;
			 		arraynow[empty].top=o.y;
					$(this).css({top : o.y+100+'px'} );
					$('li:nth-child('+empty+')').next().css({top : o.y+'px'} );
				}

				test_End();
			}
		});
			// 모든 좌표 값이 일치할 경우 성공
			function test_End(){
 				for(var i=0; i<arraynow.length ;i++){
 					if(arraynow[i].left == arrayactualx[i] && arraynow[i].top == arrayactualy[i] ){
 						num++;
 						if(num==9){
								alert('you succeed to create puzzel. ');
							  flag = false;
 						}
 					}
 				}
        window.score = num;
        console.log(num);
        num = 0;
      }
      setTimeout(test_End, 60000);
      var minutes = 1;
      var warning = 55;
      var timerEl, seconds, timer;
      timerEl = document.getElementById('timer');
      seconds = 60*minutes;
      function updateTimer() {
        var m,s;
        m = Math.floor(seconds/60);
        s = seconds % 60;
        s = (s < 10) ? "0"+s : s;
        timerEl.innerHTML = m + ":" + s;
        seconds--;
        timerEl.classList.add('warning');
        if(seconds < 0) {
          clearInterval(timer);
        }
      }
      timer = setInterval(updateTimer, 1000);
});
