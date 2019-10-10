<?php
/**
 *
 * @author: xaboy<365615158@qq.com>
 * @day: 2018/01/05
 */

namespace app\models\user;

use crmeb\basic\BaseModel;
use crmeb\services\MiniProgramService;
use crmeb\services\WechatService;
use crmeb\traits\ModelTrait;

/**
 * TODO 用户充值
 * Class UserRecharge
 * @package app\models\user
 */
class UserRecharge extends BaseModel
{
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'user_recharge';

    use ModelTrait;

    protected $insert = ['add_time'];

    protected function setAddTimeAttr()
    {
        return time();
    }

    public static function addRecharge($uid,$price,$recharge_type = 'weixin',$paid = 0)
    {
        $order_id = self::getNewOrderId($uid);
        return self::create(compact('order_id','uid','price','recharge_type','paid'));
    }

    public static function getNewOrderId($uid = 0)
    {
        if(!$uid) return false;
        $count = (int)self::where('uid', $uid)->where('add_time', '>=', strtotime(date("Y-m-d")))->where('add_time', '<', strtotime(date("Y-m-d", strtotime('+1 day'))))->count();
        return 'wx' . date('YmdHis', time()) . (10000 + $count + $uid);
    }

    public static function jsPay($orderInfo)
    {
        return MiniProgramService::jsPay(WechatUser::uidToOpenid($orderInfo['uid']),$orderInfo['order_id'],$orderInfo['price'],'user_recharge','用户充值');
    }

    /**
     * 微信H5支付
     * @param $orderInfo
     * @return mixed
     */
    public static function wxH5Pay($orderInfo)
    {
        return WechatService::paymentPrepare(null,$orderInfo['order_id'],$orderInfo['price'],'user_recharge','用户充值', '', 'MWEB');
    }

    /**
     * 公众号支付
     * @param $orderInfo
     * @return array|string
     * @throws \Exception
     */
    public static function wxPay($orderInfo)
    {
        return WechatService::jsPay(WechatUser::uidToOpenid($orderInfo['uid'], 'openid'),$orderInfo['order_id'],$orderInfo['price'],'user_recharge','用户充值');
    }

    /**
     * //TODO用户充值成功后
     * @param $orderId
     */
    public static function rechargeSuccess($orderId)
    {
        $order = self::where('order_id',$orderId)->where('paid',0)->find();
        if(!$order) return false;
        $user = User::getUserInfo($order['uid']);
        self::beginTrans();
        $res1 = self::where('order_id',$order['order_id'])->update(['paid'=>1,'pay_time'=>time()]);
        $res2 = UserBill::income('用户余额充值',$order['uid'],'now_money','recharge',$order['price'],$order['id'],$user['now_money'],'成功充值余额'.floatval($order['price']).'元');
        $res3 = User::edit(['now_money'=>bcadd($user['now_money'],$order['price'],2)],$order['uid'],'uid');
        $res = $res1 && $res2 && $res3;
        self::checkTrans($res);
        return $res;
    }
}