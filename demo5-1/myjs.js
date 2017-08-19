var backUl=document.getElementById('back');
var backLi=backUl.getElementsByTagName('li');
var oneWidth=backLi[0].offsetWidth;
var num=Math.ceil(oneWidth/backLi.length);
var num2=70;

for(i=0;i<backLi.length;i++){
	backLi[i].style.left=  num*i+'px';
	backLi[i].index=i;
	backLi[i].onmouseover=function(){
		for(j=0;j<backLi.length;j++){
			if(j<=this.index){
				startMove(backLi[j],'left',num2*j);
			}
			else if(j>this.index){
				startMove(backLi[j],'left',oneWidth-num2*backLi.length+j*num2);
			}
		}
	}
	backLi[i].onmouseout=function(){
		for(j=0;j<backLi.length;j++){
			startMove(backLi[j],'left',num*j);
		}
	}
}