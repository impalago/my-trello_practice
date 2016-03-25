<form name="cardListForm">
    <div class="modal-header">
        <h3 class="modal-title">@{{ formTitle }}</h3>
    </div>
    <div class="modal-body">
        <div class="form-group">
            <input type="text" id="cardListName" class="form-control" placeholder="Name" data-ng-model="cardListFields.name" data-ng-value="cardListName" required autofocus>
        </div>
    </div>

    <div class="modal-footer">
        <button class="btn btn-raised btn-info" colorpicker type="button" colorpicker-position="top" data-ng-model="cardListFields.color" data-ng-value="cardListColor">Change Color</button>
        <button class="btn btn-raised btn-success" type="submit" data-ng-click="cardListSubmit()">Save</button>
        <button class="btn btn-raised btn-warning" type="button" data-ng-click="cancel()">Cancel</button>
    </div>
</form>