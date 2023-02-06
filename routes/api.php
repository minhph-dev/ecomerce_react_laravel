<?php

use App\Http\Controllers\API\AdminOrderController;
use App\Http\Controllers\API\AdminUserController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BannerController;
use App\Http\Controllers\API\BrandController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\ColorController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\SettingController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\WishlistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('login-google', 'loginGoogle');
});

Route::controller(FrontendController::class)->group(function () {
    Route::get('all-categories', 'categories');
    Route::get('fetch-products/{category_slug}', 'productOfCategory');
    Route::get('filter-by-brand/{brand_name}', 'productOfBrand');
    Route::get('product-details/{category_slug}/{product_slug}', 'productdetails');
    Route::get('search-product', 'searchProducts');
    Route::get('home', 'home');
    Route::get('trending', 'trending');
    Route::get('featured', 'featured');
    Route::get('all-product', 'products');
    Route::get('settings', 'setting');
});

Route::prefix('admin')->middleware(['auth:sanctum', 'isAPIAdmin'])->group(function () {
    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message' => 'You are in', 'status' => 200], 200);
    });

    Route::controller(DashboardController::class)->group(function () {
        Route::get('dashboard', 'index');
    });

    Route::controller(CategoryController::class)->group(function () {
        Route::get('view-category', 'allCategories');
        Route::post('store-category', 'store');
        Route::get('edit-category/{category_name}', 'edit');
        Route::post('update-category/{category_name}', 'update');
        Route::delete('delete-category/{category_name}', 'destroy');
        Route::get('all-category', 'allCategories');
    });

    Route::controller(BrandController::class)->group(function () {
        Route::get('view-brand', 'allBrands');
        Route::post('store-brand', 'store');
        Route::get('edit-brand/{brand_name}', 'edit');
        Route::post('update-brand/{brand_name}', 'update');
        Route::delete('delete-brand/{brand_name}', 'destroy');
        Route::get('all-brand', 'allBrands');
    });

    Route::controller(ColorController::class)->group(function () {
        Route::get('view-color', 'allColors');
        Route::post('store-color', 'store');
        Route::delete('delete-color/{color_name}', 'destroy');
        Route::get('all-color', 'allColors');
    });

    Route::controller(ProductController::class)->group(function () {
        Route::get('view-product', 'index');
        Route::get('create-product', 'create');
        Route::post('store-product', 'store');
        Route::get('edit-product/{id}', 'edit');
        Route::post('update-product/{id}', 'update');
        Route::delete('delete-product/{id}', 'destroy');
        Route::post('product-color/{color_name}', 'updateProdColorQty');
        Route::delete('product-color/{color_name}/delete', 'deleteProdColor');
        Route::get('search-product', 'search');
    });

    Route::controller(BannerController::class)->group(function () {
        Route::post('store-banner', 'store');
        Route::get('view-banner', 'allBanner');
        Route::get('edit-banner/{id}', 'edit');
        Route::post('update-banner/{id}', 'update');
        Route::delete('delete-banner/{id}', 'destroy');
        Route::get('all-banner', 'allBanner');
    });

    Route::controller(AdminUserController::class)->group(function () {
        Route::post('store-user', 'store');
        Route::get('view-user', 'allUser');
        Route::get('edit-user/{id}', 'edit');
        Route::post('update-user/{id}', 'update');
        Route::delete('delete-user/{id}', 'destroy');
    });

    Route::controller(AdminOrderController::class)->group(function () {
        Route::get('orders', 'index');
        Route::get('orders/{orderId}', 'show');
        Route::post('orders/{orderId}', 'updateOrderStatus');
        Route::get('filter-orders/{statusFilter}/{date}', 'filterOrder');
    });

    Route::controller(SettingController::class)->group(function () {
        Route::get('settings', 'setting');
        Route::post('settings', 'store');
    });
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);

    Route::controller(UserController::class)->group(function () {
        Route::get('profile', 'profile');
        Route::post('profile', 'updateProfile');
        Route::post('change-password', 'changePassword');
    });

    Route::controller(OrderController::class)->group(function () {
        Route::get('orders', 'myOrder');
        Route::get('orders/{orderId}', 'orderDetails');
    });

    Route::controller(CheckoutController::class)->group(function () {
        Route::post('validate-order', 'validateOrder');
        Route::post('place-order', 'placeorder');
    });
});

Route::controller(CartController::class)->group(function () {
    Route::post('add-to-cart', 'addToCart');
    Route::get('cart', 'viewCart');
    Route::put('cart-updatequantity/{cart_id}/{scope}', 'updatequantity');
    Route::delete('delete-cartitem/{cart_id}', 'deleteCartitem');
});

Route::controller(WishlistController::class)->group(function () {
    Route::get('wishlist', 'viewWishList');
    Route::post('add-to-wishlist', 'addToWishlist');
    Route::delete('delete-wishitem/{cart_id}', 'deleteWishitem');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
