<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addtocart(Request $request)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_color_name = $request->product_color_name;
            $product_quantity = $request->product_quantity;

            $productCheck = Product::where('id', $product_id)->first();
            if ($productCheck) {
                if (Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()) {
                    return response()->json([
                        'status' => 409,
                        'message' => $productCheck->product_name . ' Already Added to Cart'
                    ]);
                } else {
                    if ($productCheck->quantity > 0) {
                        $cartitem = new Cart;
                        $cartitem->user_id = $user_id;
                        $cartitem->product_id = $product_id;
                        $cartitem->product_color_name = $product_color_name;
                        $cartitem->product_quantity = $product_quantity;
                        $cartitem->save();
                        return response()->json([
                            'status' => 201,
                            'message' => 'Added To Cart'
                        ]);
                    } else {
                        return response()->json([
                            'status' => 404,
                            'message' => 'Out Of Stock'
                        ]);
                    }
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product not found'
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Add to Cart'
            ]);
        }
    }

    public function viewcart()
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartitems = Cart::where('user_id', $user_id)->get();
            return response()->json([
                'status' => 200,
                'cart' => $cartitems
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to View Cart Data'
            ]);
        }
    }

    public function updatequantity($cart_id, $scope)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartitem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            if ($scope == 'inc') {
                $cartitem->product_quantity += 1;
            } else if ($scope == 'dec') {
                $cartitem->product_quantity -= 1;
            }
            $cartitem->update();
            return response()->json([
                'status' => 200,
                'message' => 'Quantity Updated Success'
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Continue'
            ]);
        }
    }

    public function deleteCartitem($cart_id)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartitem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();

            if ($cartitem) {
                $cartitem->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Cart Item Removed Successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Cart Item Not Found    '
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
