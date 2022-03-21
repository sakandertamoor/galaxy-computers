<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProductController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::controller(HomeController::class)->group( function(){
    Route::get('/','home');
});

Route::controller(CategoryController::class)->group( function(){
    Route::get('/addCategory','create')->name('addCategory');
    Route::get('/allCategory','index')->name('Category');
    Route::post('/storeCategory','store')->name('storeCategory');
    Route::get('/editCategory/{id}','edit')->name('editCategory');
    Route::put('/updateCategory','update')->name('updateCategory');
});

Route::controller(ClientController::class)->group( function(){
    Route::get('/addClient','create')->name('addClient');
    Route::post('/storeClient','store')->name('storeClient');
    Route::get('/allClient','index')->name('Client');
    Route::get('/client/{client}/edit','edit')->name('editClient');
    Route::put('/updateClient/{client}','update')->name('updateClient');
});

Route::controller(ProductController::class)->group( function(){
    Route::get('/addProduct','create')->name('addProduct');
    Route::post('/storeProduct','store')->name('storeProduct');
    Route::get('/allProduct','index')->name('Product');
    Route::get('/product/{product}/edit','edit')->name('editProduct');
    Route::put('/updateProduct/{product}','update')->name('updateProduct');
});