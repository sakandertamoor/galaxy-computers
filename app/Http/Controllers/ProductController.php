<?php

namespace App\Http\Controllers;
use App\Http\Requests\StoreProductRequest;
use App\Models\Category;
use App\Models\Product;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    //

    public function create()
    {
        $categories = Category::getCategory();
        return view('product.add', compact('categories'));
    }

    public function store(StoreProductRequest $request)
    {
        $product = $request->validated();
        if($product){
            $path = $request->file('image')->store('uploads/products/images/');
            $result = Product::create([
                'category_id' => $product['category'],
                'name' => $product['name'],
                'quantity' => $product['quantity'],
                'image' => basename($path)
            ]);
        }
        return  $result ? redirect('allProduct')->with('success', 'Product has been created successfully.') : redirect('allProduct')->with('error', 'Something went Wrong.');  
    }

    public function index(Request $request)
    {
        if ($request->ajax())
         {
            $product = Product::all();
           // return clientTable($product);
        }
        return view('product.all');
    }
}
