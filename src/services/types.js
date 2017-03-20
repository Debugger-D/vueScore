//接口路径

const scoreapi='/api/v1/credit/';
const accountapi='/account/';

//登录
export const LOGIN = accountapi+ 'user/login';
//登出
export const LOGOUT = accountapi+ 'user/logout';
//首页轮播图
export const BANNER = scoreapi+ 'mall/banner';











//判断生产环境
export const SETTING = function () {
    let setting = {};

    if(document.location.host.indexOf('trc.com') != -1 ) {
        setting.env = 'trc';
        setting.host = 'http://www.trc.com/';
        setting.loginUrl = 'http://passport.trc.com/login?redirectUrl='+window.location.href;
        setting.registerUrl = 'http://passport.trc.com/register?redirectUrl='+window.location.href;
    } else {
        setting.env = 'develop';
        setting.host = './';
        setting.payHost = './';
        setting.loginUrl = '../login.vue?redirectUrl='+window.location.href;
        setting.registerUrl = 'http://passport.trc.com/register?redirectUrl='+window.location.href;
    }

    return setting;
};