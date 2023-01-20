<?php

namespace App\Http\Controllers\API;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\OrderItem;
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
                $order = Order::create([
                    'user_id' => $user_id,
                    'tracking_no' => 'Order-' . Str::random(10),
                    'fullname' => $request->fullname,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'pincode' => $request->pincode,
                    'address' => $request->address,
                    'status_message' => 'In progress',
                    'payment_mode' => $request->payment_mode,
                    'payment_id' => $request->payment_id,
                ]);

                $cart = Cart::where('user_id', $user_id)->get();
                foreach ($cart as $cartItem) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $cartItem->product_id,
                        'product_color_name' => $cartItem->product_color_name,
                        'quantity' => $cartItem->product_quantity,
                        'price' => $cartItem->product->selling_price
                    ]);
                    if ($cartItem->product_color_name != NULL) {
                        $cartItem->productColor()->where('color_name', $cartItem->product_color_name)->decrement('quantity', $cartItem->product_quantity);
                    } else {
                        $cartItem->product()->where('id', $cartItem->product_id)->decrement('quantity', $cartItem->product_quantity);
                    }
                }
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
