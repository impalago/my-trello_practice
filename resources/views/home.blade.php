@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">

            <div class="page-header">
                <h1>Boards</h1>
            </div>

            <div id="board_list" class="container-fluid" ng-controller="boardsCtrl">

                <div class="row">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-raised btn-success btn-lg" data-ng-click="createBoard()">Create board</button>
                    </div>
                </div>

                <div class="row">
                    @include('app_blocks/board.boards')
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
