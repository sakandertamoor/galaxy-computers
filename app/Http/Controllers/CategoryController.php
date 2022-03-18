<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function create()
    {
        return view('category.add');
        
    }
    public function index(Request $request)
    {
        
        
    }
    public function store(Request $request)
    {
        print_r($request->category_name);
    }
}
