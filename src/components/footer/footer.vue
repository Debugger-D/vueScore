<template>
    <div class="footer">
        <div id="footer-container">
            <div id="footer-trc">
                <div class="container">
                    <div class="cat">
                        <a href="https://jr.trc.com/" style="padding-left:0px;">泰然金融</a>
                        <a href="https://ysk.trc.com/">优驷卡</a>
                        <a href="https://www.trc.com/">泰然城</a>
                        <a href="https://www.trc.com/content-info.html?article_id=84">帮助中心</a>
                        <a href="https://bbs.trc.com">小泰社区</a>
                        <a href="https://www.trc.com/content-info.html?article_id=86" style="border-right: 0px;">关于我们</a>
                        <div class="addr">
                            <p>Copyright © 2016 泰然城 TRC.COM 版权所有&nbsp;&nbsp;|&nbsp;&nbsp;让信任创造价值</p>
                        </div>
                    </div>
                    <div class="contact">
                        <div>
                            <img src="./img/icon_phone.png">
                            <span class="t">联系我们 (09:00 - 21:00)</span>
                            <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4008260035&amp;aty=0&amp;a=0&amp;curl=&amp;ty=1">
                                <img src="./img/icon_qq.png">
                                <span class="t">在线客服</span>
                            </a>
                        </div> <br>
                        <div style="font-size: 16px; margin: 20px 30px;">400 669 0685</div>
                    </div>
                    <div class="qrcode">
                        <div class="qr">
                            <img src="./img/qrcode_3.png">
                            <div>下载泰然城APP</div>
                        </div>
                        <div class="qr">
                            <img src="./img/qrcode_1.png">
                            <div>关注泰然城服务号</div>
                        </div>
                        <div class="qr">
                            <img src="./img/qrcode_2.png">
                            <div>关注泰然城订阅号</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

    #footer-container {
        z-index: 99;
        position: relative;
        top: -1px;
    }
    .container {
        width: 1200px;
        margin: 0px auto;
        position: relative;
    }
    #footer-trc {
        background-color: #3B3D49;
        padding-top: 30px;
        min-height: 140px;
        .cat {
            float: left;
            a {
                color: #B2B3B8;
                font-size: 12px;
                height: 15px;
                line-height: 15px;
                padding: 0px 10px;
                border-right: 1px solid #B2B3B8;
            }

            .addr {
                color: #B2B3B8;
                font-size: 12px;
                margin-top: 9px;
            }
        }

        .contact {
            float: left;
            margin-left: 95px;
            color: #b2b4b9;
            font-size: 12px;
            a {
                color: #b2b4b9;
            }
            .t {
                display: block;
                float: left;
                height: 20px;
                line-height: 20px;
                margin: 0px 10px;
            }
            img {
                display: block;
                float: left;
            }
        }

        .qrcode {
            float: right;
            .qr {
                float: right;
                color: #b3b5ba;
                font-size: 12px;
                margin-left: 30px;
                text-align: center;
            }
        }

    }

</style>
