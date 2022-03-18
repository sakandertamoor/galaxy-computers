<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CategoryController;
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
    //Route::get('/storeCategory/{id}','edit')->name('editCategory');
});