<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function addToWishlist(Request $request)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;

            $productCheck = Product::where('id', $product_id)->first();
            if ($productCheck) {
                if (Wishlist::where('product_id', $product_id)->where('user_id', $user_id)->exists()) {
                    return response()->json([
                        'status' => 409,
                        'message' => $productCheck->product_name . ' Already Added to WishList'
                    ]);
                } else {
                    $cartitem = new Wishlist;
                    $cartitem->user_id = $user_id;
                    $cartitem->product_id = $product_id;
                    $cartitem->save();
                    return response()->json([
                        'status' => 201,
                        'message' => 'Added To WishList'
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product not Found'
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Add to WishList'
            ]);
        }
    }

    public function viewWishList()
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $wishlists = Wishlist::where('user_id', $user_id)->get();
            return response()->json([
                'status' => 200,
                'wishlists' => $wishlists
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to View WishList Data'
            ]);
        }
    }

    public function deleteWishitem($cart_id)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartitem = Wishlist::where('id', $cart_id)->where('user_id', $user_id)->first();
            if ($cartitem) {
                $cartitem->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Wish Item Removed Successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Wish Item Not Found    '
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
