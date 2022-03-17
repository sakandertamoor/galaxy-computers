@extends('admin-layouts.admin_master')
@push('title')
    <title>Galaxy Computers</title>
@endpush
@push('content')
    <div class="row mb-3">

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-6 col-md-6 mb-6">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Projects</div>
                         
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-tasks fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-6 col-md-6 mb-6">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">Total Employees</div>
                          
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-user fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Earnings (Monthly) Card Example -->


    </div>

    <div class="row mb-4">
        <div class="col-md-6">
            <div class="card">
              <div class="card-header d-flex justify-content-between align-items-baseline pb-1"><h5>Latest Projects</h5>">View all</a>
                </div>
                <div class="card-body list-body pt-0">
                    <table class="table table-hover">
                        <tbody>
                      
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-baseline pb-1"><h5>Latest Employees</h5><a
                        href="">View all</a>
                </div>
                <div class="card-body list-body pt-1">
                    <table class="table table-hover">
                        <tbody>
                     
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>


@endpush
