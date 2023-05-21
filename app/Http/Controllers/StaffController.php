<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Staff;
use App\Models\User;

class StaffController extends Controller
{
    function index()
    {
        $staffs = Staff::orderBy('created_at', 'desc')->get();

        return response()->json(
            [
                "staffs" => $staffs,
            ],
            200,
        );
    }

    function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'gender' => 'required|string',
            'email' => 'required|email:rfc,dns',
            'password' => 'required|string',
        ]);

        // Create user first
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Create staff
        $staff = Staff::create([
            'name' => $request->name,
            'gender' => $request->gender,
            'user_id' => $user->id,
        ]);

        return response()->json(
            [
                'staff' => $staff,
            ],
            201,
        );
    }

    function update(Request $request, Staff $id)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'gender' => 'required|string',
        ]);

        $staff = $id;
        $staff->name = $request->name;
        $staff->gender = $request->gender;

        $staff->save();

        return response()->json([
            'staff' => $staff,
        ]);
    }

    function destroy(String $id)
    {
        $staff = Staff::find($id);
        $staff->delete();
        User::find($staff->user_id)->delete();

        return response()->json([
            'message' => 'Staff successfully deleted',
        ]);
    }
}
