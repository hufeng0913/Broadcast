自主原生JS封装轮播图
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
