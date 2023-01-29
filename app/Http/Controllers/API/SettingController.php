<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
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
    
    public function store(Request $request)
    {
        $setting = Setting::first();
        if ($setting) {
            $input = $request->all();
            $setting->update($input);
            return response()->json([
                'status' => 200,
                'message' => "Setting Saved"
            ]);
        } else {
            $input = $request->all();
            Setting::create($input);
            return response()->json([
                'status' => 200,
                'message' => "Setting Saved"
            ]);
        }
    }
}
