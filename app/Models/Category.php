<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table = 'category';
    protected $fillable = ['category_name','status'];

    public static function getCategory()
    {
        return Category::where('status', '1')->get(['id','category_name']);
    }
    public function products()
    {
          return $this->hasMany(Product::class, 'id');
    }
}
