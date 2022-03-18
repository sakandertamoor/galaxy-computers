<?php

declare(strict_types=1);

namespace App\Classes;

class Category
{
    private string $name;
    private bool $status;

    /**
     * Category constructor.
     * @param string $name
     * @param bool $status
     */
    public function __construct(string $name, bool $status ) {
        $this->name = $name;
        $this->status = $status;
    }

    public function getName(): string
    {
        return $this->name;
    }
    public function getStatus(): bool
    {
        return $this->status;
    }
}
