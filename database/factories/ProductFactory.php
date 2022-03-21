<?php

namespace Database\Factories;
use App\Models\Category;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //factory(Category::class)
            'category_id' => '1',
            'name' => $this->faker->name(),
            'quantity' => $this->faker->randomDigit(),
            'price' =>$this->faker->randomDigit()
        ];
    }
}
