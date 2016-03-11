<div class="container-fluid cardList fadein fadeout" data-ng-hide="fakeIntro"  ng-controller="cardListCtrl as cardListCtrl">
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

            <div class="row" sv-root sv-part="cardListCtrl.allCardList">
                <div class="col-md-3 card-list-item"
                     data-ng-repeat="cardList in cardListCtrl.allCardList"
                     sv-element>

                    <div class="panel panel-default" style="box-shadow: 0 1px 6px @{{ cardList.color == '' ? '' : cardList.color }}">
                        <div class="panel-heading" style="background-color: @{{ cardList.color == '' ? '' : cardList.color }}">
                            @{{ cardList.name }}
                            <span class=" card-list-item__delete" sv-handle><i class="material-icons">create</i></span>
                            <button type="button"
                                    class="card-list-item__update"
                                    data-ng-click="cardListCtrl.editCardList(cardList.id)"><i class="material-icons">create</i></button>
                            <button type="button"
                                    class="confirm card-list-item__delete"
                                    data-ng-click="cardListCtrl.deleteCardList(cardList.id)"><i class="material-icons">delete</i></button>

                        </div>
                        <div class="panel-body">
                            ere
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</div>
