//获取style
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}


function startMove(obj,json,callBack){
    clearInterval(obj.timer);
    var num = null;
    obj.timer = setInterval(function(){
        var flag = true;//判断所有动画是否完成
        for(var ele in json){
            if(ele == "opacity"){
                num = Math.round(parseFloat(getStyle(obj,ele))*100);    
            }else{
                num = parseInt(getStyle(obj,ele));
            }

            if(num != json[ele]){
                flag = false;
                //获取速度
                var speed = (json[ele] - num)/10;
                speed = speed >0?Math.ceil(speed):Math.floor(speed);//因为offseLeft不会为小数，所以正数向上取整，负数向下取整

                //style改变
                if(ele == "opacity"){
                    obj.style[ele] = (num +speed)/100;
                }else{
                    obj.style[ele] = num + speed +"px";
                }
            }
        }

        if(flag){
            clearInterval(obj.timer);
            if(callBack){
                callBack();
            }
        }
    },50);

}