<?php

use Yajra\DataTables\Facades\DataTables;


if (!function_exists('categoryTable')) {
    function categoryTable($category)
    {
        return datatables($category)
                ->setRowClass('clickable-row')
                    ->setRowAttr([
                        'data-href' => function($category){
                            return route('editCategory', $category->id);
                        }
                        ])
                    ->addColumn('status', function($category){
                          return renderStatus($category);
                     })
                    ->rawColumns(['status'])
                    ->make(true);
    }
}
