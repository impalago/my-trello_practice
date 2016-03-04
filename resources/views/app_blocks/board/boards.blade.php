<div class="col-md-4 col-lg-3 board-item"  data-ng-repeat="board in boards">
    <div class="alert alert-dismissible alert-success" >
        <button type="button" class="board-item__update" data-ng-click="editBoard(board.id)"><i class="material-icons">create</i></button>
        <button type="button" class="confirm board-item__cart" data-ng-click="deleteBoard(board.id)"><i class="material-icons">delete</i></button>
        <div class="panel-heading board-item__title">@{{ board.name }} </div>
    </div>
</div>

