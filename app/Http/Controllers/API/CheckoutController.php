<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{
    public function placeorder(Request $request)
    {
        if (auth('sanctum')->check()) {
            $validator = Validator::make($request->all(), [
                'fullname' => 'required|max:191',
                'email' => 'required|email:rfc,dns',
                'phone' => 'required|max:191',
                'pincode' => 'required|digits:6',
                'address' => 'required|max:191',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            } else {
                $user_id = auth('sanctum')->user()->id;
                $order = new Order();
                $order->user_id = $user_id;
                $order->tracking_no = 'order' . rand(111, 999);
                $order->fullname = $request->fullname;
                $order->email = $request->email;
                $order->phone = $request->phone;
                $order->pincode = $request->pincode;
                $order->address = $request->address;
                $order->status_message = $request->status_message;
                $order->payment_mode = $request->payment_mode;
                $order->payment_id = 'pay' . rand(111, 999);
                $order->save();

                $cart = Cart::where('user_id', $user_id)->get();

                $orderitems = [];
                foreach ($cart as $item) {
                    $orderitems[] = [
                        'product_id' => $item->product_id,
                        'quantity' => $item->product_quantity,
                        'price' => $item->product->selling_price
                    ];

                    $item->product->update([
                        'quantity' => $item->product->quantity - $item->product_quantity,

                    ]);
                }

                $order->orderitems()->createMany($orderitems);
                Cart::destroy($cart);

                return response()->json([
                    'status' => 200,
                    'message' => 'Order Placed Successfully',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Continue'
            ]);
        }
    }

    public function validateOrder(Request $request)
    {
        if (auth('sanctum')->check()) {
            $validator = Validator::make($request->all(), [
                'firstname' => 'required|max:191',
                'lastname' => 'required|max:191',
                'phone' => 'required|max:191',
                'email' => 'required|max:191',
                'address' => 'required|max:191',
                'city' => 'required|max:191',
                'state' => 'required|max:191',
                'zipcode' => 'required|max:191',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            } else {
                return response()->json([
                    'status' => 200,
                    'message' => 'Form Validated Successfully',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Continue'
            ]);
        }
    }
}
