<?php

if (!function_exists('renderStatus')) {
    function renderStatus($data)
    {
        return $data->status == true ? '<span class="badge badge-success">Active</span>' : '<span class="badge badge-danger">Inactive</span>' ;
    }
}
