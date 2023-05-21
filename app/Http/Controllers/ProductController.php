<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

class ProductController extends Controller
{
    function index()
    {
        $products = Product::orderBy('created_at', 'desc')->get();

        return response()->json(
            [
                "products" => $products,
            ],
            200,
        );
    }

    function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'description' => 'required|string',
            'type' => 'required|string',
            'stock' => 'required|numeric',
            'buy_price' => 'required|numeric',
            'sell_price' => 'required|numeric',
            'image' => 'required|mimes:jpg,png',
        ]);

        $fileName = $request->image->getClientOriginalName();
        $filePath = 'images/products/' . $fileName;

        $isFileUploaded = Storage::disk('public')->put($filePath, file_get_contents($request->image));

        if ($isFileUploaded) {
            $path = $request->schemeAndHttpHost() . Storage::url($filePath);

            $product = Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'type' => $request->type,
                'stock' => $request->stock,
                'buy_price' => $request->buy_price,
                'sell_price' => $request->sell_price,
                'image' => $path,
            ]);

            return response()->json(
                [
                    'product' => $product,
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

    function update(Request $request, Product $id)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'description' => 'required|string',
            'type' => 'required|string',
            'stock' => 'required|numeric',
            'buy_price' => 'required|numeric',
            'sell_price' => 'required|numeric',
            'image' => 'mimes:jpg,png',
        ]);

        $product = $id;
        $product->name = $request->name;
        $product->description = $request->description;
        $product->type = $request->type;
        $product->stock = $request->stock;
        $product->buy_price = $request->buy_price;
        $product->sell_price = $request->sell_price;

        if ($request->has('image')) {
            $fileName = $request->image->getClientOriginalName();
            $filePath = 'images/products/' . $fileName;

            $isFileUploaded = Storage::disk('public')->put($filePath, file_get_contents($request->image));

            if ($isFileUploaded) {
                $path = $request->schemeAndHttpHost() . Storage::url($filePath);

                $product->image = $path;
            } else {
                return response()->json(
                    [
                        'message' => "Unexpected error",
                    ],
                    500,
                );
            }
        }

        $product->save();

        return response()->json([
            'product' => $product,
        ]);
    }

    function destroy(String $id)
    {
        $product = Product::find($id);

        $segments = explode("/", parse_url($product->image, PHP_URL_PATH));
        $fileName = end($segments);

        Storage::disk('public')->delete('/images/products/' . $fileName);

        $product->delete();

        return response()->json([
            'message' => 'Product successfully deleted',
        ]);
    }
}
