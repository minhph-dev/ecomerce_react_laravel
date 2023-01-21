<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function home()
    {
        $categories = Category::all();
        $banners = Banner::all();
        $trendingProducts = Product::where('trending', '1')->latest()->get();
        $featuredProducts = Product::where('featured', '1')->latest()->get();
        return response()->json([
            'status' => 200,
            'data' => [
                'categories' => $categories,
                'banners' => $banners,
                'trendingProducts' => $trendingProducts,
                'featuredProducts' => $featuredProducts,
            ]
        ]);
    }
    public function trending()
    {
        $trendingProducts = Product::where('trending', '1')->latest()->get();
        return response()->json([
            'status' => 200,
            'trendingProducts' => $trendingProducts,
        ]);
    }

    public function featured()
    {
        $featuredProducts = Product::where('featured', '1')->latest()->get();
        return response()->json([
            'status' => 200,
            'featuredProducts' => $featuredProducts,
        ]);
    }

    public function getCategories()
    {
        $categories = Category::all();
        return response()->json([
            'status' => 200,
            'categories' => $categories
        ]);
    }

    public function getProducts()
    {
        $allCategory = Category::all();
        $allBrand = Brand::all();
        $allColor = Color::all();
        $products = Product::all();
        foreach ($products as $product) {
            $colorOfProducts = $product->productColors()->get();
            $productArr[] = [
                'product' => $product,
                'colorOfProducts' => $colorOfProducts,
            ];
        }
        if ($products) {
            return response()->json([
                'status' => 200,
                'data' => [
                    'allCategory' => $allCategory,
                    'allBrand' => $allBrand,
                    'allColor' => $allColor,
                    'products' => $productArr
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
                        'brands' => $brands,
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
                'message' => 'No Product Available'
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
            if ($product) {
                return response()->json([
                    'status' => 200,
                    'data' => [
                        'product' => $productArr,
                        'relativeProductOfCategory' => $relativeProductOfCategory,
                        'relativeProductOfBrand' => $relativeProductOfBrand,
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

    public function searchProducts($product_name)
    {
        if ($product_name) {
            $searchProducts = Product::where('product_name', 'LIKE', '%' . $product_name . '%')->latest()->paginate(15);
            foreach ($searchProducts as $product) {
                $colorOfProducts = $product->productColors()->get();
                $materialOfProducts = $product->productMaterials()->get();
                $productArr[] = [
                    'product' => $product,
                    'colorOfProducts' => $colorOfProducts,
                    'materialOfProducts' => $materialOfProducts
                ];
            }
            if ($searchProducts) {
                return response()->json([
                    'status' => 200,
                    'data' => [
                        'searchProducts' => $productArr
                    ]
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
