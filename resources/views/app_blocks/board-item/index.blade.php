<div class="container-fluid cardList" ng-controller="cardListCtrl as cardListCtrl">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">

            <div class="page-header">
                <h1>@{{ pageName }}</h1>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <button type="button" class="btn btn-raised btn-success btn-lg" data-ng-click="cardListCtrl.createCardList()">Create new card list ...</button>
                </div>
            </div>

            <div class="row">
                <div class="col-md-3 card-list-item"
                     ng-repeat="cardList in cardListCtrl.allCardList">

                    <div class="panel panel-default" style="box-shadow: 0 1px 6px @{{ cardList.color == '' ? '' : cardList.color }}">
                        <div class="panel-heading" style="background-color: @{{ cardList.color == '' ? '' : cardList.color }}">
                            @{{ cardList.name }}
                            <button type="button"
                                    class="card-list-item__update"
                                    data-ng-click="cardListCtrl.editCardList(cardList.id)"><i class="material-icons">create</i></button>
                            <button type="button"
                                    class="confirm card-list-item__delete"
                                    data-ng-click="cardListCtrl.deleteCardList(cardList.id)"><i class="material-icons">delete</i></button>

                        </div>
                        <div class="panel-body">
                            <span data-drag="true" jqyoui-draggable>So you think you can drag</span>
                            <span data-drag="true" jqyoui-draggable>So you think you can drag2</span>
                            <span data-drag="true" jqyoui-draggable>So you think you can drag3</span>
                            <span data-drag="true" jqyoui-draggable>So you think you can drag4</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</div>
