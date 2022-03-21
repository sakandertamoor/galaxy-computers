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


if (!function_exists('clientTable')) {
    function clientTable($client)
    {
        return datatables($client)
                ->setRowClass('clickable-row')
                    ->setRowAttr([
                        'data-href' => function($client){
                            return route('editClient', $client->id);
                        }
                        ])
                    ->addColumn('full_name', function($client){
                          return $client->first_name." ". $client->last_name;
                     })
                    ->addColumn('payment', function($client){
                        return "0";
                   })
                    ->make(true);
    }
}

if (!function_exists('prodcutTable')) {
    function prodcutTable($product)
    {
        return datatables($product)
                ->setRowClass('clickable-row')
                    ->setRowAttr([
                        'data-href' => function($product){
                            return route('editProduct', $product->id);
                        }
                        ])
                        ->addColumn('status', function($product){
                            return renderStatus($product);
                       })
                       ->rawColumns(['status'])
                    ->make(true);
    }
}