<?php

namespace App\Http\Controllers\API;

use App\Models\Brand;
use App\Models\Color;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use App\Models\ProductColor;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json([
            'status' => 200,
            'products' => $products
        ]);
    }

    public function create()
    {
        $allCategory = Category::all();
        $allBrand = Brand::all();
        $allColor = Color::all();
        return response()->json([
            'status' => 200,
            'data' => [
                'allCategory' => $allCategory,
                'allBrand' => $allBrand,
                'allColor' => $allColor,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_name' => 'required|max:191',
            'product_name' => 'required|max:191',
            'meta_title' => 'required|max:191',
            'description' => 'required|max:255',
            'original_price' => 'required|max:20',
            'selling_price' => 'required|max:20',
            'quantity' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        } else {
            $product = new Product();
            $product->category_name = $request->input('category_name');
            $product->product_name = $request->input('product_name');
            $product->slug = Str::slug($request->input('product_name'));
            $product->brand_name = $request->input('brand_name');
            $product->description = $request->input('description');

            $product->original_price = $request->input('original_price');
            $product->selling_price = $request->input('selling_price');
            $product->quantity = $request->input('quantity');
            $product->trending = $request->input('trending') == true ? '1' : '0';
            $product->featured = $request->input('featured') == true ? '1' : '0';
            $product->status = $request->input('status') == true ? '1' : '0';

            $product->meta_title = $request->input('meta_title');
            $product->meta_keyword = $request->input('meta_keyword');
            $product->meta_description = $request->input('meta_description');

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $ext = $file->getClientOriginalExtension();
                $filename = time() . '.' . $ext;
                $file->move('uploads/product/', $filename);
                $imagePath = 'uploads/product/' . $filename;
                $product->image = $imagePath;
            }
            $product->save();

            if ($request->input('colorQuantity')) {
                $colorsQuantity = json_decode($request->input('colorQuantity'), true);
                foreach ($colorsQuantity as $color => $quantity) {
                    $product->productColors()->create([
                        'product_id' => $product->id,
                        'color_name' => $color,
                        'quantity' => $quantity
                    ]);
                }
            }

            return response()->json([
                'status' => 200,
                'message' => 'Product Added successfully'
            ]);
        }
    }

    public function edit($id)
    {
        $allCategory = Category::all();
        $allBrand = Brand::all();
        $allColor = Color::all();
        $product = Product::find($id);
        $colorOfProducts = $product->productColors()->get();
        if ($product) {
            return response()->json([
                'status' => 200,
                'data' => [
                    'allCategory' => $allCategory,
                    'allBrand' => $allBrand,
                    'allColor' => $allColor,
                    'product' => $product,
                    'colorOfProducts' => $colorOfProducts,
                ]
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Product Found'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'category_name' => 'required|max:191',
            'product_name' => 'required|max:191',
            'meta_title' => 'required|max:191',
            'description' => 'required|max:255',
            'original_price' => 'required|max:20',
            'selling_price' => 'required|max:20',
            'quantity' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        } else {
            $product = Product::find($id);
            if ($product) {
                $product->category_name = $request->input('category_name');
                $product->product_name = $request->input('product_name');
                $product->slug = Str::slug($request->input('product_name'));
                $product->brand_name = $request->input('brand_name');
                $product->description = $request->input('description');

                $product->original_price = $request->input('original_price');
                $product->selling_price = $request->input('selling_price');
                $product->quantity = $request->input('quantity');
                $product->trending = $request->input('trending') == true ? '1' : '0';
                $product->featured = $request->input('featured') == true ? '1' : '0';
                $product->status = $request->input('status') == true ? '1' : '0';

                $product->meta_title = $request->input('meta_title');
                $product->meta_keyword = $request->input('meta_keyword');
                $product->meta_description = $request->input('meta_description');

                if ($request->hasFile('image')) {
                    $uploadPath = 'uploads/product/';
                    $path = 'uploads/product/' . $product->image;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $ext = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $ext;

                    $file->move('uploads/product/', $filename);
                    $product->image = $uploadPath . $filename;
                }

                $product->update();

                if ($request->input('colorQuantity')) {
                    $colorsQuantity = json_decode($request->input('colorQuantity'), true);
                    foreach ($colorsQuantity as $color => $quantity) {
                        $product->productColors()->create([
                            'product_id' => $product->id,
                            'color_name' => $color,
                            'quantity' => $quantity
                        ]);
                    }
                }

                return response()->json([
                    'status' => 200,
                    'message' => 'Product Updated successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product Not Found'
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Product deleted successfully'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Product Id Found'
            ]);
        }
    }


    public function updateProdColorQty(Request $request, $color_name)
    {
        $productColorData = Product::findOrFail($request->input('product_id'))
            ->productColors()->where('color_name', $color_name)->first();
            $colorsQuantity = json_decode($request->input('colorQuantity'), true);
            if($colorsQuantity){
                foreach ($colorsQuantity as $color => $quantity) {
                    $productColorData->update([
                        'quantity' => $quantity
                    ]);
                }
                return response()->json(['status' => 200, 'message' => 'Product Colors Quantity Updated']);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'No Product Color Quantity Found'
                ]);
            }
    }

    public function deleteProdColor($color_name)
    {
        $color = ProductColor::where('color_name', $color_name)->firstorfail();
        if ($color) {
            $color->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Product Color deleted successfully'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Product Color Id Found'
            ]);
        }
    }
}
