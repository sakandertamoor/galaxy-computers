@extends('layouts.index')

@push('content')
    

    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-baseline pb-1"><h5>Products</h5>
                </div>
                <div class="card-body list-body pt-2">
                <div class="row">
                @foreach($products as $product)
                <div class="col-md-6">
                    <div class="card shadow mb-4">
                        <div class="card-header py-4">
                            <h6 class="m-0 font-weight-bold text-primary"> {{$product->name}}</h6>
                        </div>
                        <div class="card-body">
                            <div class="text-left">
                                <img  class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 10rem; height:10rem" src="@if($product->image != ""){{asset('storage/uploads/products/images/'.$product->image)}}
                                @else{{asset('assets/image_not_found.png')}}
                                @endif" alt="...">
                            </div>
                            <a href="#" class="btn btn-success btn-icon-split">
                                <span class="icon text-white-50">
                                    <i class="fas fa-check"></i>
                                </span>
                                <span class="text">Stock Quantiy : {{$product->quantity}}</span>
                            </a>
                            <div class="my-2"></div>
                            <a href="#" class="btn btn-primary btn-icon-split">
                                <span class="icon text-white-50">
                                    <i class="fas fa-flag"></i>
                                </span>
                                <span class="text">Category : {{$product->category_name}}</span>
                            </a>
                        </div>
                    </div>
                 </div>
                    @endforeach
                </div>
            </div>
        
        </div>
    </div>
       
    </div>

   

@endpush
