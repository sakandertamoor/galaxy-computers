<?php

namespace App\Http\Controllers;
use App\Http\Requests\StoreProductRequest;
use Illuminate\Support\Facades\Validator;
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
            $path = $request->file('image')->store('uploads/products/images/', 'public');
            $result = Product::create([
                'category_id' => $product['category'],
                'name' => $product['name'],
                'price' => $product['price'],
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
            $product = Product::getProductWithCategory();
             return prodcutTable($product);
        }   
        return view('product.all');
    }
    public function edit($id)
    {
        $product = Product::find($id);
        $categories = Category::getCategory();
        return view('product.edit', compact('product', 'categories'));
    }

    public function update(Product $product, Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'category' => 'required',
            'name' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'status' => 'required'
        ]);
        if ($validator->fails()) {
            return back()
                ->withErrors($validator)
                ->withInput();
        }
        if ($request->file('image')) {
            $imagePath = $request->file('image')->store('uploads/products/images/', 'public');
            }
            $result = Product::where('id', $product->id)->update([
                'category_id' => $request->category,
                'name' => $request->name,
                'quantity' => $request->quantity,
                'price' => $request->price,
                'image' => !empty($imagePath) ? basename($imagePath) : $product->image,
                'status' => $request->status
            ]);
   
        return  $result ? redirect('allProduct')->with('success', 'Product has been Updated successfully.') : redirect('allProduct')->with('error', 'Something went Wrong.');
    }
}
