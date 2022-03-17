<?php

declare(strict_types=1);

namespace App\Classes;

class Category
{
    private string $name;
 

    /**
     * Category constructor.
     * @param string $name
     */
    public function __construct(string $name) {
        $this->name = $name;
    }

    public function getName(): string
    {
        return $this->name;
    }
}
