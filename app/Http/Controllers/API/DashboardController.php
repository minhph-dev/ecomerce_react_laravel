<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Color;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalBrands = Brand::count();
        $totalColors = Color::count();

        $totalAllUsers = User::count();
        $totalUser = User::where('role_as', '0')->count();
        $totalAdmin = User::where('role_as', '1')->count();

        $todayDate = Carbon::now()->format('d-m-Y');
        $thisMonth = Carbon::now()->format('m');
        $thisYear = Carbon::now()->format('Y');

        $totalOrder = Order::count();
        $todayOrder = Order::whereDate('created_at', $todayDate)->count();
        $thisMonthOrder = Order::whereMonth('created_at', $thisMonth)->count();
        $thisYearOrder = Order::whereYear('created_at', $thisYear)->count();

        return response()->json([
            'status' => 200,
            'data' => [
                'totalProducts' => $totalProducts ?? [],
                'totalCategories' => $totalCategories ?? [],
                'totalBrands' => $totalBrands ?? [],
                'totalColors' => $totalColors ?? [],
                'totalAllUsers' => $totalAllUsers ?? [],
                'totalUser' => $totalUser ?? [],
                'totalAdmin' => $totalAdmin ?? [],
                'totalOrder' => $totalOrder ?? [],
                'todayOrder' => $todayOrder ?? [],
                'thisMonthOrder' => $thisMonthOrder ?? [],
                'thisYearOrder' => $thisYearOrder ?? [],
            ]
        ]);
    }
}
