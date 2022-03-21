<?php

namespace App\Http\Controllers;
use App\Models\Product;

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
    public function Home(Request $request)
    {
        $product = Product::getProductWithCategory();
        return view('home', compact('category'));
    }
}
