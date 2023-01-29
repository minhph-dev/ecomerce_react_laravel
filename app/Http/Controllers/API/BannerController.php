<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class BannerController extends Controller
{
    public function allBanner()
    {
        $banners = Banner::all();
        if ($banners) {
            return response()->json([
                'status' => 200,
                'banners' => $banners
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Banner Found'
            ]);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string:max:800',
            'link' => 'required|string:max:800',
            'image' => 'nullable|image|mimes:jpg,jpeg,png',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ]);
        } else {
            $banner = new Banner();
            $banner->title = $request->title;
            $banner->description = $request->description;
            $banner->link = $request->link;
        }

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $ext = $file->getClientOriginalExtension();
            $filename = time() . '.' . $ext;
            $file->move('uploads/banner/', $filename);
            $imagePath = 'uploads/banner/' . $filename;
            $banner->image = $imagePath;
        }
        $banner->save();

        return response()->json([
            'status' => 200,
            'message' => 'Banner Added successfully'
        ]);
    }

    public function edit($id)
    {
        $banner = Banner::find($id);
        if ($banner) {
            return response()->json([
                'status' => 200,
                'banner' => $banner
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Banner Found'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string:max:800',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        } else {
            $banner = Banner::find($id);
            if ($banner) {
                $banner->title = $request->title;
                $banner->description = $request->description;
                $banner->link = $request->link;
                if ($request->hasFile('image')) {
                    $uploadPath = 'uploads/banner/';
                    $path = 'uploads/banner/' . $banner->image;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $ext = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $ext;

                    $file->move('uploads/banner/', $filename);
                    $banner->image = $uploadPath . $filename;
                }
                $banner->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'Banner Updated successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Banner Not Found'
                ]);
            }
            $banner->update();
        }
    }

    public function destroy($id)
    {
        $banner = Banner::find($id);
        if ($banner) {
            $banner->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Banner deleted successfully'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Banner Id Found'
            ]);
        }
    }
}
