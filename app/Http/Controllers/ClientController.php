<?php

namespace App\Http\Controllers;
use App\Http\Requests\StoreClientRequest;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    //

    public function create()
    {
        return view('client.add');
    }

    public function store(StoreClientRequest $request)
    {
       $client = Client::create($request->validated());
       return redirect('allClient')->with('success', 'Client has been created successfully.');
    }

    public function index(Request $request)
    {
        if ($request->ajax())
         {
            $client = Client::all();
            return clientTable($client);
        }
        return view('client.all');
    }
    public function edit($client)
    {
         $client = Client::find($client);
         return view('client.edit', compact('client'));
    }
    public function update(Client $client, StoreClientRequest $request)
    {
        $result = Client::where('id', $client->id)->update($request->validated());
        return  $result ? redirect('allClient')->with('success', 'Client has been Updated successfully.') : redirect('allClient')->with('error', 'Something went Wrong.');
    }

}
