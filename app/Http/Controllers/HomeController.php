<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Category;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    //

     /**
     * View landingPage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function Home()
    {
        $products = Product::getProductDetailsWithCategory()->get();
        return view('home', compact('products'));
    }
}
