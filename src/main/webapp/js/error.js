/*
 * 获取范围内的随机正整数
 */
function rnd(start, end){
    return Math.floor(Math.random() * (end - start) + start);
}

function error() {
	var status = rnd(0,10);
	switch (status) {
	case 0:
		alert('名人不说暗话, 老子出错啦!');
		break;
	case 1:
		alert('天王盖地虎');
		break;
	case 2:
		alert('感谢爬虫一号提供数据');
		break;
	case 3:
		alert('感谢123132132搭建环境');
		break;
	case 4:
		alert('感谢帅的掉渣编写逻辑业务');
		break;
	case 5:
		alert('感谢数据库一号优化SQL');
		break;
	case 6:
		alert('感谢全体人员');
		break;
	case 7:
		alert('(๑╹ヮ╹๑)ﾉ Studying makes me happy');
		break;
	case 8:
		alert('(ノ"◑ڡ◑)ノ"(。•́︿•̀。)给爷笑一个~');
		break;
	case 9:
		alert('ヾ(❀●◡●)ﾉ滴~网络卡');
		break;
	}
}