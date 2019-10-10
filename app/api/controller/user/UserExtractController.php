<?php
namespace app\api\controller\user;

use app\models\store\StoreOrder;
use app\models\user\UserBill;
use app\models\user\UserExtract;
use app\Request;
use crmeb\services\SystemConfigService;
use crmeb\services\UtilService;

/**
 * 提现类
 * Class UserExtractController
 * @package app\api\controller\user
 */
class UserExtractController
{
    /**
     * 提现银行
     * @param Request $request
     * @return mixed
     */
    public function bank(Request $request)
    {

        $uid = $request->uid();
        $extractCount = UserExtract::extractSum($uid);//累计提现金额
        $commissionCount = UserBill::getBrokerage($uid);//获取总佣金
        if($commissionCount > 0){
            $rechargeCount = UserBill::getRecharge($uid);//累计充值
            $orderYuePrice = StoreOrder::getOrderStatusYueSum($uid);//余额累计消费
            $systemAdd = UserBill::getSystemAdd($uid);//后台添加余额
            $yueCount = bcadd($rechargeCount,$systemAdd,2);// 后台添加余额 + 累计充值  = 非佣金的总金额
            $orderYuePrice = $yueCount > $orderYuePrice ? 0 : bcsub($orderYuePrice,$yueCount,2);// 余额累计消费（使用佣金消费的金额）
            $commissionCount = bcsub($commissionCount, $extractCount,2);//减去已提现金额
            $extractPriceCount = UserExtract::userExtractTotalPrice($uid,0);
            $commissionCount = $extractPriceCount < $commissionCount ? bcsub($commissionCount, $extractPriceCount,2) : 0;//减去审核中的提现金额
            $commissionCount = $commissionCount > $orderYuePrice ? bcsub($commissionCount, $orderYuePrice,2) : 0;//减掉余额支付
        }
        $data['commissionCount'] = $commissionCount;//可提现佣金
        $extractBank = SystemConfigService::get('user_extract_bank') ?? []; //提现银行
        $extractBank = str_replace("\r\n","\n",$extractBank);//防止不兼容
        $data['extractBank'] = explode("\n",is_array($extractBank)  ? ( isset($extractBank[0]) ? $extractBank[0]: $extractBank): $extractBank);
        $data['minPrice'] = SystemConfigService::get('user_extract_min_price');//提现最低金额
        return app('json')->successful($data);
    }

    /**
     * 提现申请
     * @param Request $request
     * @return mixed
     */
    public function cash(Request $request)
    {
        $extractInfo = UtilService::postMore([
            ['alipay_code',''],
            ['extract_type',''],
            ['money',0],
            ['name',''],
            ['bankname',''],
            ['cardnum',''],
            ['weixin',''],
        ],$request);
        if(UserExtract::userExtract($request->user(),$extractInfo))
            return app('json')->successful('申请提现成功!');
        else
            return app('json')->fail(UserExtract::getErrorInfo('提现失败'));
    }
}