<?php

namespace App\Http\Controllers;

use App\CardList;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class CardListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $cardList = CardList::where('board_id', $request->board_id)->orderBy('sorting', 'asc')->get();
        return response()->json($cardList);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $cardList = new CardList;
        $cardList->board_id = $request->board_id;
        $cardList->name = $request->name;
        $cardList->color = isset($request->color) ? $request->color : '';
        $cardList->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $cardList = CardList::where('id', $id)->firstOrFail();
        return response()->json($cardList);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $cardList = CardList::find($id);
        $cardList->name = $request->name;
        $cardList->color = $request->color;
        $cardList->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return CardList::destroy($id);
    }

    /**
     * Sorting update value in card list
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function cardListSorting(Request $request)
    {

        if(!count($request->json())){
            return 'none object';
        }

        dump($request->json());

        foreach ($request->json() as $key => $item) {
            CardList::where('id', $item['id'])->update(['sorting' => $key]);
        }

        return 'ok';
    }
}
