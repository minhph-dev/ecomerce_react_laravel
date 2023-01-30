<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminUserController extends Controller
{
    public function allUser()
    {
        $users = User::all();
        if ($users) {
            return response()->json([
                'status' => 200,
                'users' => $users
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No User Found'
            ]);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users|string:max:800',
            'password' => 'required|string|min:8',
            'role_as' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ]);
        } else {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_as' => $request->role_as
            ]);
        }
        return response()->json([
            'status' => 200,
            'message' => 'User Added Successfully'
        ]);
    }

    public function edit($id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json([
                'status' => 200,
                'user' => $user
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No User Found'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:8',
            'role_as' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        } else {
            $user = User::find($id);
            if ($user->email == "admin@gmail.com") {
                return response()->json([
                    'status' => 404,
                    'message' => 'Cannot Update Acount System'
                ]);
            } else if ($user) {
                $user->update([
                    'name' => $request->name,
                    'password' => Hash::make($request->password),
                    'role_as' => $request->role_as
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => 'User Updated successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'User Not Found'
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if ($user->id == auth()->user()->id) {
            return response()->json([
                'status' => 404,
                'message' => 'Cannot Delete MySelf'
            ]);
        } else if ($user->email == "admin@gmail.com") {
            return response()->json([
                'status' => 404,
                'message' => 'Cannot Delete Acount System'
            ]);
        } else if ($user) {
            $user->delete();
            return response()->json([
                'status' => 200,
                'message' => 'User Deleted Successfully'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No User Id Found'
            ]);
        }
    }
}
