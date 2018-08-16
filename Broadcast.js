// JavaScript Document
(function() {
	'use strict'
    
    function broadCast(varDatas) {
        function Broadcast(datas) {
            this.datas = datas;
            this.direction = -1;//轮播方向
            this.index = 0;//图片索引
            this.target = -1;//数字按钮的索引
            this.ul = this.datas.UL;
            this.stopRunning = 1;//动画循环
            this.isState = true;//左右按钮启动条件
            this.isLeftBtn = true;//静态动画左按钮启动条件
            this.isRightBtn = true;//静态动画左按钮启动条件
            this.control = 1;//控制动画循环
            this.moveTimes = 1;//移动距离倍数
            if(this.datas.object.length > 2) this.main();
        }
        
        Broadcast.prototype.main = function() {//主方法
            this.broadCastDirection();
            if (this.datas.numberHover === 1) this.datas.move = this.datas.object[0][this.width];
            this.static(); 
            if(this.datas.numberButtons === 1) this.createButtons();
            this.init();
            if(this.datas.autoPlay === 1) this.autoPlay();
            if(this.datas.leftRightButton !== 0 && this.datas.leftRightButton != null) this.leftReightButtons();
            if(this.datas.numberButtons === 1 || this.datas.selfHaveUl === 1) this.numberFunction();
        }

        Broadcast.prototype.init = function() {//初始化
            this.datas.object[0].parentNode.style.position = 'relative';
            this.datas.object[0].parentNode.style.overflow = 'hidden';
            for(let i = 0; i < this.datas.object.length; i++){
                switch(i){
                    case 0 : this.datas.object[i].style[this.left] = 0;
                        break;
                    case 1 : this.datas.object[i].style[this.left] = this.datas.object[0][this.width] + 'px';
                        break;
                    default : this.datas.object[i].style[this.left] = -this.datas.object[0][this.width] + 'px';
                        break;
                }
                this.datas.object[i].style.position = 'absolute';
                this.datas.object[i].style.display = 'inline-block';
                if(this.datas.numberButtons === 1 && this.datas.numbersStyle === 1) this.ul[0].children[i].style.width = this.datas.object[0].clientWidth / this.datas.object.length + 'px';
            }
            if(this.datas.numberButtons === 1) {
                let cssStyle;
                this.attribute = this.ul[0].children[0].getAttribute('class');
                this.datas.selfHaveUl === 1 ? cssStyle = this.attribute +  ' ' + this.datas.LICSSstyle : cssStyle = this.datas.LICSSstyle;
                this.ul[0].children[0].setAttribute('class', cssStyle);
            }
        }

        Broadcast.prototype.createButtons = function() {//创建数字按钮
            if(this.datas.selfHaveUl !== 1) {
                let frag = document.createDocumentFragment();
                for(let i = 0; i < this.datas.object.length; i++){
                    let li = document.createElement('li');
                    if(this.datas.closeNumber === 0) li.appendChild(document.createTextNode(i + 1));
                    frag.appendChild(li);
                }
                this.ul[0].appendChild(frag);
            }
            let num = 0;
            for(let j in this.ul[0].children){
                if((this.ul[0].children[j].tagName) != null) {
                    num++;
                    this.ul[0].children[j].setAttribute('index', num);
                }
            }
        }

        Broadcast.prototype.activeUpdate = function() {//数字按钮点击效果
            this.clearStyle();
            let i, cssStyle;
            this.index === this.datas.object.length ? i = 0 : i = this.index;
            this.datas.selfHaveUl === 1 ? cssStyle = this.ul[0].children[i].getAttribute('class') +  ' ' + this.datas.LICSSstyle : cssStyle = this.datas.LICSSstyle;
            this.ul[0].children[i].setAttribute('class', cssStyle);
        }

        Broadcast.prototype.clearStyle = function() {//清除数字按钮所有样式
            for(let i in this.ul[0].children){
                if((this.ul[0].children[i].tagName) != null) 
                {
                    this.ul[0].children[i].setAttribute('class', '');
                    if(this.datas.selfHaveUl === 1) this.ul[0].children[i].setAttribute('class', this.attribute);
                }
            }
        }

        Broadcast.prototype.numberFunction = function() {//数字按钮点击功能
            if(this.datas.selfHaveUl === 1){
                let num = 0;
                for(let j in this.ul[0].children){
                    if((this.ul[0].children[j].tagName) != null) {
                        num++;
                        this.ul[0].children[j].setAttribute('index', num);
                    }
                }
            }
            let effect;
            this.datas.numberHover === 1 ? effect = 'onmouseover' : effect = 'onclick';
            this.ul[0][effect] = (event)=> {
                if(event.target.getAttribute('index') - 0 > this.index && event.target.getAttribute('index') != null) {
                    if(this.isState) {
                        this.target = event.target.getAttribute('index') - 0;
                        if(this.index === 0) this.index = 1;
                        if(this.target != this.index) {
                            this.direction = -1;
                            this.moveTimes = 5;
                            this.control = 0;
                            this.play = 1;
                            this.changePicture();
                            clearTimeout(this.go);
                        }
                    }
                }
                else if(event.target.getAttribute('index') - 0 <= this.index && event.target.getAttribute('index') != null) {
                    if(this.isState) {
                        clearTimeout(this.go);
                        if(this.index === this.datas.object.length) this.index = 1;
                        this.target = event.target.getAttribute('index');
                            this.direction = 1;
                            this.moveTimes = 5;
                            this.control = 0;
                            this.play = 1;
                            this.changePicture();
                    }
                }
            }
        }

        Broadcast.prototype.leftReightButtons = function() {//左右按钮功能

            this.datas.leftRightButton[this.buttonLDirection].onclick = ()=> {//左
                this.static();
                if(this.isState && this.isRightBtn) {
                    clearTimeout(this.go);
                    this.direction = 1;
                    this.index === 0 ? this.index = this.datas.object.length - 1 : this.index --;
                    this.changePicture();
                }
            }
            
            this.datas.leftRightButton[this.buttonDirection].onclick = ()=> {//右
                clearTimeout(this.go);
                this.static();
                if(this.isState && this.isLeftBtn) {
                    this.direction = -1;
                    this.datas.object.length === this.index ? this.index = 1 : this.index ++;
                    this.changePicture();
                }
            }

        }

        Broadcast.prototype.autoPlay = function() {//自动轮播
                this.go = setTimeout(()=> {
                    this.index = 0;
                    this.datas.object.length === this.index ? this.index = 1 : this.index ++;
                    this.changePicture();
                    if(this.datas.numberButtons === 1) this.activeUpdate();
                }, this.datas.autoPlayTime);
        }

        Broadcast.prototype.static = function() {//静态动画
            if(this.datas.static === 1) {
                this.datas.autoPlay = 0;
                if(this.index === this.datas.object.length - 1) this.isLeftBtn = false;
                else this.isLeftBtn = true;
                if(this.index === 0) this.isRightBtn = false;
                else this.isRightBtn = true;
            }
        }

        Broadcast.prototype.broadCastDirection = function() {//轮播方向
            if(this.datas.broadCastDirection === 0) {
                this.left = 'left';
                this.width = 'clientWidth';
                this.buttonDirection = 1;
                this.buttonLDirection = 0;
            }
            else if(this.datas.broadCastDirection === 1){
                this.left = 'top';
                this.width = 'clientHeight';
                this.datas.numberButtons = 0;
                this.buttonDirection = 1;
                this.buttonLDirection = 0;
                this.direction = -1;
                this.datas.move = Math.ceil(this.datas.move / 2);
            }
        }

        Broadcast.prototype.changePicture = function() {//动态更新图片
            clearInterval(this.stopRunning);
            if(this.datas.numberButtons === 1) this.activeUpdate();
            if(this.index + 1 === this.target - 0) {
                this.control = 1;
                this.moveTimes = 1;
                this.play = null;
            }
            let [x, y] = [0, 0];
            this.isState = false;
            this.datas.object.length  === this.index ? x = -this.datas.object.length : x = 0;
            if(this.direction > 0) this.index !== this.datas.object.length - 1 ? y = 2 : y = - this.datas.object.length + 2;
            else this.index === this.datas.object.length ? y = 0 : y = 0;
            this.stopRunning = setInterval( ()=> {
                this.datas.object[this.index - 1 + y].style[this.left] = (this.datas.object[this.index - 1 + y].style[this.left]).replace('px', '') - 0 + this.datas.move * this.direction * this.moveTimes + 'px';
                this.datas.object[this.index + x].style[this.left] = (this.datas.object[this.index + x].style[this.left]).replace('px', '') - 0 + this.datas.move * this.direction * this.moveTimes + 'px';
                if((this.datas.object[this.index + x].style[this.left]).replace('px', '') * this.direction > 0) {
                    clearInterval(this.stopRunning);
                    this.isState = true;
                    this.datas.object[this.index + x].style[this.left] = 0;
                    if(this.direction > 0 && this.index !== 0) {
                        this.datas.object[this.index - 1 + y].style[this.left] = this.datas.object[0][this.width] + 'px';
                        this.datas.object[this.index + x - 1].style[this.left] = -this.datas.object[0][this.width] + 'px';
                    }
                    else if(this.direction > 0 && this.index === 0) {
                        this.datas.object[this.datas.object.length - 1].style[this.left] = -this.datas.object[0][this.width] + 'px';
                        this.datas.object[1].style[this.left] = -this.datas.object[0][this.width] + 'px';
                    }
                    if(this.direction < 0 && this.index < this.datas.object.length - 1) {
                        this.datas.object[this.index + x - 1].style[this.left] = this.datas.object[0][this.width] * this.direction  + 'px';
                        this.datas.object[this.index + x + 1].style[this.left] = -this.datas.object[0][this.width] * this.direction  + 'px';
                    }
                    else if(this.direction < 0 && this.index === this.datas.object.length - 1) {
                        this.datas.object[this.index + x - 1].style[this.left] = this.datas.object[0][this.width] * this.direction  + 'px';
                        this.datas.object[0].style[this.left] = this.datas.object[0][this.width] + 'px';
                    }
                    else if(this.direction < 0 && this.index === this.datas.object.length) {
                        this.datas.object[this.index - 1].style[this.left] = this.datas.object[0][this.width] * this.direction  + 'px';
                        this.datas.object[1].style[this.left] = -this.datas.object[0][this.width] * this.direction  + 'px';
                    }
                    if(this.index === 0 && this.direction > 0) this.datas.object[1].style[this.left] = this.datas.object[0][this.width] * this.direction  + 'px';
                    if(this.datas.autoPlay === 1 || this.play === 1) {
                        this.stopRunning = setInterval(()=> {
                            if(this.datas.autoPlayDirection === 1 || this.play === 1) {
                                if(this.direction === 1) {
                                    this.index === 0 ? this.index = this.datas.object.length - 1 : this.index --;
                                }
                                else this.datas.object.length === this.index ? this.index = 1 : this.index ++;
                            }
                            else{
                                this.direction = -1;
                                this.datas.object.length === this.index ? this.index = 1 : this.index ++;
                            }
                            this.changePicture();
                        },this.datas.autoPlayTime * this.control);
                    }
                    return false;
                }
            }
            , this.datas.speed * this.control);
        }

        new Broadcast(varDatas);
    
    }

    broadCast({//不支持3张以下图片轮播，如果你只有2张图片，请复制这2张图片使其变成4张即可
        /*该代码会自动给标签添加position属性，请务必根据轮播功能，正确关闭没必要的功能，每调用一次，class必须保持唯一*/
        'object' : document.getElementsByClassName('broadCast-pictures'),//通过class定位图片标签，请务必提供唯一的class名，所有需要轮播的图片class名保持一致
        'leftRightButton' : document.getElementsByClassName('broadCast-leftRight'),//左右按钮,不需要请赋值为0，,接受值：0或document.getElementsByClassName('broadCast-leftRight')
        'UL' : document.getElementsByClassName('broadCast-numbers'),//定位ul标签
        'selfHaveUl' : 1,//根据提供的ul标签创建li，设置1使用提供的ul标签，不再创建li
        'LICSSstyle' : 'public-activeStyle',//标签li活动添加样式，接受css选择器名
        'numberButtons' : 1,//开启数字按钮功能,不需要请赋值为0,接受值：0或1，指标签li
        'autoPlay': 1,//开启自动轮播,不需要请赋值为0,接受值：0或1
        'autoPlayDirection' : 0,//自动轮播方向随点击方向发生改变，关闭设置0
        'autoPlayTime' : 2000,//自动轮播间隔时间
        'speed' : 5,//轮播一张图片需要的时间
        'move' : 10,//图片移动距离，当图片图片移动距离等于图片宽度，将会是另一种效果，可以试试
        'numbersStyle': 0,//设置数字分布样式，1为均分宽度,接受值：0或1，指标签li
        'closeNumber': 0,//默认存在数字，设置1可以关闭数字，指标签li
        'numberHover' : 0,//数字按钮悬停功能，1为开启,接受值：0或1，指标签li
        'static' : 0,//禁用静态动画，设置1为开启,会关闭轮播功能,接受值：0或1
        'broadCastDirection' : 0,//轮播方向，0为左右，1位上下
    });

})()