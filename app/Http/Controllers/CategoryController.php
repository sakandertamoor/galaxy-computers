<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreCategoryRequest;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;


class CategoryController extends Controller
{
    public function create()
    {
        return view('category.add');
        
    }
    public function index(Request $request)
    {
        if ($request->ajax())
         {
            $category = Category::all();
            return categoryTable($category);
        }
        return view('category.all');
    }
    public function store(StoreCategoryRequest $request)
    {
       $category = Category::create($request->validated());
       return redirect('allCategory')->with('success', 'Category has been created successfully.');
    }

    public function edit($id)
    {
        $category = Category::find($id);
        return view('category.edit', compact('category'));
    }
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_name' => 'required',
            'status' => 'required'
        ]);
        if ($validator->fails()) {
            return back()
                ->withErrors($validator)
                ->withInput();
        }
     $result = Category::where('id', $request->id)->update(
         [
            'category_name' => $request->category_name,
            'status' => $request->status,
         ]
    );
      return  $result ? redirect('allCategory')->with('success', 'Category has been Updated successfully.') : redirect('allCategory')->with('error', 'Something went Wrong.');
    }
    
}
