<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function myOrder(){
        $orders = Order::where('user_id', Auth::user()->id)->orderBy('created_at', 'asc')->get();
        return response()->json([
            'status' => 200,
            'orders' => $orders
        ]);
    }

    public function orderDetails($id){
        $order = Order::where('user_id', Auth::user()->id)->where('id', $id)->first();
        if($order){
            return response()->json([
                'status' => 200,
                'order' => $order
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Not Order Found'
            ]);
        }
    }
}
