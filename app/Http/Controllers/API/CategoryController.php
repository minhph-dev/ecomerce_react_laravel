<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function allCategories(){
        $categories = Category::all();
        return response()->json([
            'status' => 200,
            'categories' => $categories
        ]);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'category_name' =>'required|unique:categories',
            'image' =>'nullable|image|mimes:jpeg,jpg,png,gif',
            'description' =>'nullable|max:255',
        ] );

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' =>$validator->messages()
            ]);
        }else{
            $category = new Category();
            $category->category_name = $request->input('category_name');
            $category->slug = Str::slug($request->input('category_name'));
            
            $uploadPath = 'uploads/category/';
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $ext = $file->getClientOriginalExtension();
                $filename = time() . '.' . $ext;
    
                $file->move('uploads/category/', $filename);
                $category->image = $uploadPath . $filename;
            }

            $category->description = $request->input('description');
            $category->save();
            return response()->json([
                'status' => 200,
                'message' =>'Category Added Successfully'
            ]);
        }

    }

    public function edit(string $category_name){
        $category = Category::where('category_name', $category_name)->firstorfail();
        if($category){
            return response()->json([
                'status' => 200,
                'category' => $category
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Category Name Found'
            ]);
        }
    }

    public function update(Request $request , string $category_name){
        $validator = Validator::make($request->all(),[
            // 'image' =>'image|mimes:jpeg,jpg,png,gif|nullable',
            'description' =>'nullable|max:191',
        ] );

        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' =>$validator->messages()
            ]);
        }else{
            $category = Category::where('category_name', $category_name)->firstorfail();

            if($category){
                if ($request->hasFile('image')) {
                    $uploadPath = 'uploads/category/';
                    $path = 'uploads/category/' . $category->image;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $ext = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $ext;
        
                    $file->move('uploads/category/', $filename);
                    $category->image = $uploadPath.$filename;
                }
    
                $category->description = $request->input('description');

                $category->update();

                return response()->json([
                    'status' => 200,
                    'message' =>'Category Updated Successfully'
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' =>'No Category Name Found'
                ]);
            }

        }
    }

    public function destroy(string $category_name){
        $category = Category::where('category_name', $category_name)->firstorfail();
        if($category){
            $category->delete();
            return response()->json([
                'status' => 200,
                'message' =>'Category deleted successfully'
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' =>'No Category Name Found'
            ]);
        }
    }
}
