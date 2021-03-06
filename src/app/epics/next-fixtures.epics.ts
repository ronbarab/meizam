import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/withLatestFrom";
import { NextFixturesService } from "app/services/next-fixtures.service";
import { NextFixturesActions } from "app/components/containers/next-fixtures/next-fixtures.actions";
import { AppActions } from "app/app.acions";

@Injectable()
export class NextFixturesEpics {
    constructor(
      private nextFixturesService: NextFixturesService,
      private actions: NextFixturesActions,
      private appActions: AppActions,
    ) {}

    fetchNextFixtures = action$ => action$.ofType(NextFixturesActions.fetchNextFixtures)
      .map(action => {
          this.nextFixturesService.fetchNextFixtures();
          return this.actions.fetchNextFixturesStarted();
        });

    predictionSelected = action$ => action$.ofType(NextFixturesActions.predictionSelected)
      .map(action => {
        return this.actions.submitPredictionStarted(action.payload);
      });

    submitPredictionStarted = action$ => action$.ofType(NextFixturesActions.submitPredictionStarted)
      .map(action => {
        this.nextFixturesService.submitPrediction(action.payload);
        return this.appActions.doNothing();
      });

    public getEpics(): any {
      return [this.fetchNextFixtures, this.predictionSelected, this.submitPredictionStarted];
    }
}
