<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use App\Models\Setting;
use Illuminate\Http\Request;

class FrontendController extends Controller
{

    public function setting()
    {
        $setting = Setting::first();
        if ($setting) {
            return response()->json([
                'status' => 200,
                'setting' => $setting
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Setting Not Found'
            ]);
        }
    }

    public function home()
    {
        $categories = Category::all();
        $banners = Banner::all();
        $trendingProducts = Product::where('status', '0')->where('trending', '1')->latest()->get();
        $featuredProducts = Product::where('status', '0')->where('featured', '1')->latest()->get();
        if ($categories || $banners || $trendingProducts || $featuredProducts) {
            return response()->json([
                'status' => 200,
                'data' => [
                    'categories' => $categories ?? [],
                    'banners' => $banners ?? [],
                    'trendingProducts' => $trendingProducts ?? [],
                    'featuredProducts' => $featuredProducts ?? [],
                ]
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Home Page Not Found'
            ]);
        }
    }
    public function trending()
    {
        $trendingProducts = Product::where('status', '0')->where('trending', '1')->latest()->get();
        if ($trendingProducts) {
            return response()->json([
                'status' => 200,
                'trendingProducts' => $trendingProducts,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Trending Page Not Found'
            ]);
        }
    }

    public function featured()
    {
        $featuredProducts = Product::where('status', '0')->where('featured', '1')->latest()->get();
        if ($featuredProducts) {
            return response()->json([
                'status' => 200,
                'featuredProducts' => $featuredProducts,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Featured Page Not Found'
            ]);
        }
    }

    public function categories()
    {
        $categories = Category::all();
        if ($categories) {
            return response()->json([
                'status' => 200,
                'categories' => $categories
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Category Not Found'
            ]);
        }
    }

    public function products()
    {
        $allCategory = Category::all();
        $allBrand = Brand::all();
        $allColor = Color::all();
        $products = Product::where('status', '0')->get();
        if ($products) {
            foreach ($products as $product) {
                $colorOfProducts = $product->productColors()->get();
                $productArr[] = [
                    'product' => $product,
                    'colorOfProducts' => $colorOfProducts,
                ];
            }
            return response()->json([
                'status' => 200,
                'data' => [
                    'allCategory' => $allCategory ?? [],
                    'allBrand' => $allBrand ?? [],
                    'allColor' => $allColor ?? [],
                    'products' => $productArr ?? []
                ]
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Product Found'
            ]);
        }
    }

    public function productOfCategory($category_slug)
    {
        $category = Category::where('slug', $category_slug)->firstorfail();
        $brands = Brand::where('category_name', $category->category_name)->get();
        if ($category) {
            $products = Product::where('category_name', $category->category_name)->where('status', '0')->get();
            if ($products) {
                return response()->json([
                    'status' => 200,
                    'data' => [
                        'category' => $category,
                        'products' => $products,
                        'brands' => $brands ?? [],
                    ]
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'No Product Available'
                ]);
            }
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'No Such Category Found'
            ]);
        }
    }

    public function productOfBrand($brand_name)
    {
        $products = Product::where('brand_name', $brand_name)->where('status', '0')->get();
        if ($products) {
            return response()->json([
                'status' => 200,
                'products' => $products
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'No Product Found'
            ]);
        }
    }

    public function productdetails($category_slug, $product_slug)
    {
        $category = Category::where('slug', $category_slug)->firstorfail();
        if ($category) {
            $product = Product::where('category_name', $category->category_name)->where('slug', $product_slug)->where('status', '0')->firstorfail();
            $relativeProductOfCategory = Product::where('category_name', $product->category_name)->get();
            $relativeProductOfBrand = Product::where('brand_name', $product->brand_name)->get();
            $colorOfProducts = $product->productColors()->get();
            $productArr[] = [
                'product' => $product,
                'colorOfProducts' => $colorOfProducts,
            ];
            if ($productArr) {
                return response()->json([
                    'status' => 200,
                    'data' => [
                        'product' => $productArr ?? [],
                        'relativeProductOfCategory' => $relativeProductOfCategory ?? [],
                        'relativeProductOfBrand' => $relativeProductOfBrand ?? [],
                    ]
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'No Product Details Found'
                ]);
            }
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'No Product Details Found'
            ]);
        }
    }

    public function searchProducts(Request $request)
    {
        if ($request->keyword) {
            $searchProducts = Product::where('product_name', 'LIKE', '%' . $request->keyword . '%')->where('status', 0)->latest()->get();
            if ($searchProducts) {
                return response()->json([
                    'status' => 200,
                    'searchProducts' =>  $searchProducts
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Product Found'
                ]);
            }
        }
    }
}
