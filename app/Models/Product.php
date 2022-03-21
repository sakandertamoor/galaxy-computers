<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['category_id', 'name', 'quantity','image'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'id');
    }

    public function getProductWithCategory(){
        return $data = DB::table('products')
        ->join('category', 'products.category_id', '=', 'category.id')
        ->select(
            'products.id as id',
            'products.name as name',
            'category.category_name as category_name',
            'products.status as status'
        );
    }
}
