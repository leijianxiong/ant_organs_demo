<?php


namespace crmeb\services\workerman;


use think\facade\Middleware;
use think\facade\Session;
use Workerman\Connection\TcpConnection;

class WorkermanHandle
{
    protected $service;

    public function __construct(WorkermanService &$service)
    {
        $this->service = &$service;
    }

    public function login(TcpConnection &$connection, array $res, Response $response)
    {
        if (!isset($res['data']) || !$sessionId = $res['data']) {
            return $response->close([
                'msg' => '授权失败!'
            ]);
        }

        Session::setId($sessionId);
        Session::start();

        if (!Session::has('adminId') || !Session::has('adminInfo')) {
            return $response->close([
                'msg' => '授权失败!'
            ]);
        }

        $connection->adminInfo = Session::get('adminInfo');
        $connection->sessionId = $sessionId;
        $this->service->setUser($connection);

        return $response->success();
    }
}