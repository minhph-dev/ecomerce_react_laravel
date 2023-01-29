<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function profile()
    {
        $myProfile = auth('sanctum')->user();
        if ($myProfile) {
            return response()->json([
                'status' => 200,
                'myProfile' => $myProfile
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No Profile Found"
            ]);
        }
    }

    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'phone' => ['required', 'digits:10'],
            'pin_code' => ['required', 'digits:6'],
            'address' => ['required', 'string', 'max:499'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        } else {
            $user = User::findOrFail(Auth::user()->id);
            if ($user) {
                $user->update([
                    'name' => $request->name,
                    'phone' => $request->phone,
                    'pin_code' => $request->pin_code,
                    'address' => $request->address,
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => 'Information Updated successfully'
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'Information Updated Faild'
                ]);
            }
        }
    }

    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => ['required', 'string', 'min:8'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        } else {
            $currentPasswordStatus = Hash::check($request->current_password, auth()->user()->password);
            if ($currentPasswordStatus) {
                User::findOrFail(Auth::user()->id)->update([
                    'password' => Hash::make($request->password),
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => 'Password Updated Successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Current Password does not match with Old Password'
                ]);
            }
        }
    }
}
