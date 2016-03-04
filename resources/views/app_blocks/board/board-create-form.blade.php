<form name="boardForm">
    <div class="modal-header">
        <h3 class="modal-title">Create board</h3>
    </div>
    <div class="modal-body">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Name" ng-model="board.name" required>
        </div>
    </div>

    <div class="modal-footer">
        <button class="btn btn-raised btn-success" type="submit" ng-click="boardSubmit()" ng-disabled="createBoardForm.$invalid">Save</button>
        <button class="btn btn-raised btn-warning" type="button" ng-click="cancel()">Cancel</button>
    </div>
</form>