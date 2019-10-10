<?php
namespace  app\models\routine;


use crmeb\basic\BaseModel;
use crmeb\traits\ModelTrait;

/**
 * TODO 小程序token辅助验证表
 * Class Token
 * @package app\models\routine
 */
class Token extends BaseModel
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
    protected $name = 'token';

    use ModelTrait;

    /**
     * TODO 保存随机字符串 当前用户有token则删除 保存最新token
     * @param int $uid 用户uid
     * @param string $randstring 随机字符串
     * @return Token|\think\Model
     * @throws \Exception
     */
    public static function SetRandString($uid,$randstring)
    {
        if(self::be(['uid'=>$uid])) self::where('uid',$uid)->delete();
        return self::create(['uid'=>$uid,'rand_string'=>$randstring,'add_time'=>time()]);
    }

    /**
     * TODO 验证当前token是否被篡改
     * @param int $uid 用户uid
     * @param string $randstring 随机字符串
     * @return bool
     */
    public static function checkRandString($uid,$randstring)
    {
        return self::where('uid',$uid)->value('rand_string') === $randstring;
    }
}