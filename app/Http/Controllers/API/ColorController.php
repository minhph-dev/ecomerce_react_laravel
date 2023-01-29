<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ColorController extends Controller
{
    public function allColors()
    {
        $colors = Color::all();
        if ($colors) {
            return response()->json([
                'status' => 200,
                'colors' => $colors
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Color Found'
            ]);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'color_name' => 'required|string|unique:colors',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ]);
        } else {
            Color::create([
                'color_name' => $request->color_name,
            ]);
            return response()->json([
                'status' => 200,
                'message' => 'Color Added Successfully'
            ]);
        }
    }

    public function destroy(string $color_name)
    {
        $color = Color::where('color_name', $color_name)->firstorfail();
        if ($color) {
            $color->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Color deleted successfully'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Color Id Found'
            ]);
        }
    }
}
