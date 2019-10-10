<!DOCTYPE html>
<html lang="zh-CN">
<head>
    {include file="public/head"}

    <link href="/system/frame/css/bootstrap.min.css?v=3.4.0" rel="stylesheet">
    <link href="/system/frame/css/style.min.css?v=3.0.0" rel="stylesheet">
    <title>{$title|default=''}</title>
    <style>
        .check{color: #f00}
        .demo-upload{
            display: block;
            height: 33px;
            text-align: center;
            border: 1px solid transparent;
            border-radius: 4px;
            overflow: hidden;
            background: #fff;
            position: relative;
            box-shadow: 0 1px 1px rgba(0,0,0,.2);
            margin-right: 4px;
        }
        .demo-upload img{
            width: 100%;
            height: 100%;
            display: block;
        }
        .demo-upload-cover{
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,.6);
        }
        .demo-upload:hover .demo-upload-cover{
            display: block;
        }
        .demo-upload-cover i{
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
        }
        .code-send{
            cursor: pointer;
        }
    </style>
    <script>
        window.test=1;
    </script>
</head>
<body>
<div class="wrapper wrapper-content">
    <div class="row">
        <div class="col-sm-12">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>短信账号注册/修改</h5>
                </div><div id="store-attr" class="mp-form" v-cloak="">
                    <i-Form :label-width="80" style="width: 100%">
                        <template >
                            <template >
                                <Form-Item>
                                    <Row>
                                        <i-Col span="13">
                                            <span>账&nbsp;&nbsp;&nbsp;&nbsp;号：</span><i-Input placeholder="短信平台账号" v-model="form.account" style="width: 80%" type="text"></i-Input>
                                        </i-Col>
                                    </Row>
                                </Form-Item>
                                <Form-Item>
                                    <Row>
                                        <i-Col span="13">
                                            <span>密&nbsp;&nbsp;&nbsp;&nbsp;码：</span><i-Input placeholder="短信平台密码/token" v-model="form.password" style="width: 80%" type="password"></i-Input>
                                        </i-Col>
                                    </Row>
                                </Form-Item>
                                <Form-Item>
                                    <Row>
                                        <i-Col span="13">
                                            <span>域&nbsp;&nbsp;&nbsp;&nbsp;名：</span><i-Input placeholder="网址域名" v-model="form.url" style="width: 80%"></i-Input>
                                        </i-Col>
                                    </Row>
                                </Form-Item>
                                <Form-Item>
                                    <Row>
                                        <i-Col span="13">
                                            <span>手机号：</span><i-Input placeholder="注册手机号" v-model="form.phone" style="width: 80%"></i-Input>
                                        </i-Col>
                                    </Row>
                                </Form-Item>
                                <Form-Item>
                                    <Row>
                                        <i-Col span="13">
                                            <span style="float: left">验证码：</span>
                                            <i-Input placeholder="验证码" v-model="form.code" style="width: 80%">
                                                <span slot="append" @click="sendCode" v-text="codeMsg" class="code-send"></span>
                                            </i-Input>
                                        </i-Col>
                                    </Row>
                                </Form-Item>
                            </template>
                            <Form-Item>
                                <Row>
                                    <i-Col span="8" offset="6">
                                        <i-Button type="primary" @click="submit">提交</i-Button>
                                    </i-Col>
                                </Row>
                            </Form-Item>
                        </template>
                    </i-Form>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    var _vm ;
    mpFrame.start(function(Vue){
        new Vue({
            data () {
                return {
                    codeUrl : "{$url}",
                    codeMsg : "发送验证码",
                    form:{
                        account:'',
                        password:'',
                        url:'',
                        phone:'',
                        code:'',
                    }
                }
            },
            methods: {
                isPhone:function(test){
                    var reg = /^1[3456789]\d{9}$/;
                    return reg.test(test);
                },
                sendCode:function(){
                    var that = this;
                    if(that.form.phone.length == 0){
                        $eb.message('error','请填写手机号');
                        return false;
                    }
                    if(!that.isPhone(that.form.phone)){
                        $eb.message('error','手机号格式错误');
                        return false;
                    }
                    $eb.axios.get(that.codeUrl + '?phone=' + that.form.phone).then(function(res){
                        if(res.status == 200){
                            $eb.message('success','验证码发送成功');
                        }else{
                            $eb.message('error',res.msg);
                        }
                        return false;
                    }).catch(function(err){
                        $eb.message('error',err);
                    })
                },
                submit(){
                    var that = this;
                    $eb.axios.post("{:Url('save')}",that.form).then(function(res){
                        if(res.status == 200 && res.data.code == 200){
                            $eb.message('success',res.data.msg || '提交成功!');
                            $eb.closeModalFrame(window.name);
                        }else{
                            $eb.message('error',res.data.msg || '请求失败!');
                        }
                    }).catch(function(err){
                        $eb.message('error',err);
                    })
                },
            },
            mounted (){

            }
        }).$mount(document.getElementById('store-attr'));
    });
</script>
</body>