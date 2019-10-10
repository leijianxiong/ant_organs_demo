<?php


namespace app\http\middleware;


use app\models\user\User;
use app\models\user\UserToken;
use app\Request;
use crmeb\exceptions\AuthException;
use crmeb\interfaces\MiddlewareInterface;
use crmeb\repositories\UserRepository;
use think\db\exception\DataNotFoundException;
use think\db\exception\ModelNotFoundException;
use think\exception\DbException;

class AuthTokenMiddleware implements MiddlewareInterface
{
    public function handle(Request $request, \Closure $next, bool $force = true)
    {
        $authInfo = null;
        $token = trim(ltrim($request->header('Authorization'), 'Bearer'));
        try {
            $authInfo = UserRepository::parseToken($token);
        } catch (AuthException $e) {
            if ($force)
                return app('json')->make($e->getCode(), $e->getMessage());
        }

        if(is_null($authInfo) && $force){
            return app('json')->make(410000, '请登录');
        }

        if (!is_null($authInfo)) {
            Request::macro('user', function () use (&$authInfo) {
                return $authInfo['user'];
            });
            Request::macro('tokenData', function () use (&$authInfo) {
                return $authInfo['tokenData'];
            });
        }
        Request::macro('isLogin', function () use (&$authInfo) {
            return !is_null($authInfo);
        });
        Request::macro('uid', function () use (&$authInfo) {
            return is_null($authInfo) ? 0 : $authInfo['user']->uid;
        });

        return $next($request);
    }
}