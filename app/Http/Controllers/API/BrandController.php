<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    public function allBrands()
    {
        $brands = Brand::all();
        return response()->json([
            'status' => 200,
            'brands' => $brands
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brand_name' => 'required|string|unique:brands',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ]);
        } else {
            Brand::create([
                'category_name' => $request->input('category_name'),
                'brand_name' => $request->input('brand_name'),
                'slug' => Str::slug($request->input('brand_name'))
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Brand Added Successfully'
            ]);
        }
    }

    public function edit(string $brand_name)
    {
        $brand = Brand::where('brand_name', $brand_name)->firstorfail();
        if ($brand) {
            return response()->json([
                'status' => 200,
                'brand' => $brand
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Brand Name Found'
            ]);
        }
    }

    public function update(Request $request, string $brand_name)
    {
        $brand = Brand::where('brand_name', $brand_name)->firstorfail();
        if ($brand) {
            $brand->update([
                'brand_name' => $request->input('brand_name'),
                'slug' => Str::slug($request->input('brand_name')),
                'category_name' => $request->input('category_name')
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Brand Updated Successfully'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Brand Name Found'
            ]);
        }
    }

    public function destroy(string $brand_name)
    {
        $brand = Brand::where('brand_name', $brand_name)->firstorfail();
        if ($brand) {
            $brand->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Brand deleted successfully'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Brand Name Found'
            ]);
        }
    }
}
