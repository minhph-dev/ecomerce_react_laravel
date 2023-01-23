<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class AdminOrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return response()->json([
            'status' => 200,
            'orders' => $orders
        ]);
    }

    public function show($orderId)
    {
        $order = Order::where('id', $orderId)->first();
        $orderItems = OrderItem::where('order_id', $order->id)->get();
        if ($order) {
            return response()->json([
                'status' => 200,
                'data' => [
                    'order' => $order,
                    'orderItems' => $orderItems
                ]
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Order Id Not Found'
            ]);
        }
    }
}
