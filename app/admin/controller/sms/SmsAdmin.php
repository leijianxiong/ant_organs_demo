<?php
namespace app\admin\controller\sms;

use app\admin\controller\AuthController;
use crmeb\services\JsonService;
use crmeb\services\SMSService;
use crmeb\services\UtilService;

/**
 * 短信账号
 * Class SmsAdmin
 * @package app\admin\controller\sms
 */
class SmsAdmin extends AuthController
{
    /**
     * @return string
     */
    public function index()
    {
        $this->assign('url', SMSService::code());
        return $this->fetch();
    }

    /**
     * 修改/注册短信平台账号
     */
    public function save(){
        list($account, $password, $phone, $code, $url) = UtilService::postMore([
            ['account', ''],
            ['password', ''],
            ['phone', ''],
            ['code', ''],
            ['url', ''],
        ], null ,true);
        if(!strlen(trim($account))) return JsonService::fail('请填写账号');
        if(!strlen(trim($password))) return JsonService::fail('请填写密码');
        if(!strlen(trim($code))) return JsonService::fail('请填写验证码');
        if(!strlen(trim($url))) return JsonService::fail('请填写域名');
        $status = SMSService::register($account, md5(trim($password)), $url, $phone, $code);
        if($status['status'] == 400) return JsonService::fail('短信平台：'.$status['msg']);
        return JsonService::success('短信平台：'.$status['msg']);
    }
}