<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Models\Customer;
use App\Models\User;

class CustomerController extends Controller
{
    function index()
    {
        $customers = Customer::orderBy('created_at', 'desc')->get();

        return response()->json(
            [
                "customers" => $customers,
            ],
            200,
        );
    }

    function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'birth_date' => 'required|date',
            'gender' => 'required|string',
            'address' => 'required|string',
            'email' => 'required|email:rfc,dns',
            'password' => 'required|string',
            'identity_picture' => 'required|mimes:jpg,png',
        ]);


        // Create user first
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $fileName = $request->identity_picture->getClientOriginalName();
        $filePath = 'images/identity_pictures/' . $fileName;

        $isFileUploaded = Storage::disk('public')->put($filePath, file_get_contents($request->identity_picture));

        if ($isFileUploaded) {
            $path = $request->schemeAndHttpHost() . Storage::url($filePath);

            // Create customer
            $customer = Customer::create([
                'name' => $request->name,
                'birth_date' => $request->birth_date,
                'gender' => $request->gender,
                'address' => $request->address,
                'identity_picture' => $path,
                'user_id' => $user->id,
            ]);

            return response()->json(
                [
                    'customer' => $customer,
                ],
                201,
            );
        }

        return response()->json(
            [
                'message' => "Unexpected error",
            ],
            500,
        );
    }

    function update(Request $request, Customer $id)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'birth_date' => 'required|date',
            'gender' => 'required|string',
            'address' => 'required|string',
            'identity_picture' => 'mimes:jpg,png',
        ]);

        $customer = $id;
        $customer->name = $request->name;
        $customer->birth_date = $request->birth_date;
        $customer->gender = $request->gender;
        $customer->address = $request->address;

        if ($request->has('identity_picture')) {
            $fileName = $request->image->getClientOriginalName();
            $filePath = 'images/identity_pictures/' . $fileName;

            $isFileUploaded = Storage::disk('public')->put($filePath, file_get_contents($request->identity_picture));

            if ($isFileUploaded) {
                $path = $request->schemeAndHttpHost() . Storage::url($filePath);

                $customer->identity_picture = $path;
            } else {
                return response()->json(
                    [
                        'message' => "Unexpected error",
                    ],
                    500,
                );
            }
        }

        $customer->save();

        return response()->json([
            'customer' => $customer,
        ]);
    }

    function destroy(String $id)
    {
        $customer = Customer::find($id);

        $segments = explode("/", parse_url($customer->identity_picture, PHP_URL_PATH));
        $fileName = end($segments);

        Storage::disk('public')->delete('/images/identity_pictures/' . $fileName);

        $customer->delete();
        User::find($customer->user_id)->delete();

        return response()->json([
            'message' => 'Customer successfully deleted',
        ]);
    }
}
