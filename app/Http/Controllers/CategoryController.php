<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use Yajra\DataTables\Facades\DataTables;


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
            $category = Category::orderBy('id')->get();
            return datatables($category)
                ->setRowClass('clickable-row')
                    ->setRowAttr([
                        'data-href' => function($category){
                            return route('editCategory', $category->id);
                        }
                        ])
                    ->addColumn('status', function($category){
                          return '<span class="badge badge-success">Active</span>';
                     })
                    ->addColumn('action', function ($category) {
                        
                        return "<button class='btn btn-sm btn-danger' id='suspend-btn' title='make it suspend' data-action='suspend' data-id='{$category->id}'><i class='fa fa-trash'></i></button>";
                        
                    })
                    ->rawColumns(['status', 'action'])
                    ->make(true);
        }

        return view('category.all');
        
    }
    public function store(StoreCategoryRequest $request)
    {
       $category = Category::create($request->validated());
       return redirect('allCategory')->with('Success', 'Category has been created successfully.');
    }

    public function edit(Request $request)
    {
       print_r('here');
    }
}
