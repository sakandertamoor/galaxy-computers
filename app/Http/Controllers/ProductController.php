<?php

namespace App\Http\Controllers;
use App\Models\Category;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    //

    public function create()
    {
        $category = Category::getCategory();
        return view('product.add', compact('category'));
    }
}
