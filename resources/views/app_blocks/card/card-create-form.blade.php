<form name="cardCreateForm">
    <div class="modal-header">
        <h3 class="modal-title">@{{ formTitle }}</h3>
    </div>
    <div class="modal-body">
        <div class="form-group">
            <input type="text" id="cardName" class="form-control" placeholder="Name" data-ng-model="cardFields.name" data-ng-value="cardName" required autofocus>
        </div>
        <div class="form-group">
            <textarea class="form-control" id="cardDescription" placeholder="Description..." data-ng-model="cardFields.description" rows="6"></textarea>
        </div>

    </div>

    <div class="modal-footer">
        <button class="btn btn-raised btn-success" type="submit" data-ng-click="cardCreateSubmit()">Save</button>
        <button class="btn btn-raised btn-warning" type="button" data-ng-click="cancel()">Cancel</button>
    </div>
</form>