import { NextFixturesState, INITIAL_STATE_NEXT_FIXTURES } from "../../../app.state";
import { IAction } from "app/app.module";
import { NextFixturesActions } from "app/components/containers/next-fixtures/next-fixtures.actions";

export function NextFixturesReducer(lastState: NextFixturesState, action: IAction): NextFixturesState {
  if (lastState === undefined) { return INITIAL_STATE_NEXT_FIXTURES; }
  switch (action.type) {
    case NextFixturesActions.fetchNextFixtures:
      break;
    case NextFixturesActions.fetchNextFixturesStarted:
      break;
    case NextFixturesActions.fetchNextFixturesSuccess:
      return { raw: action.payload }
    case NextFixturesActions.fetchNextFixturesFail:
      alert("Failed to fetch fixtures.");
      break;
    case NextFixturesActions.submitPredictionStarted:
      return updateFixtureSubmitted(lastState, action.payload.fixture.id, getSubmissionState(false, true));
    case NextFixturesActions.submitPredictionSuccess:
      return updateFixtureSubmitted(lastState, action.payload.fixture.id, getSubmissionState(true, false));
    case NextFixturesActions.submitPredictionFail:
      return updateFixtureSubmitted(lastState, action.payload.prediction.fixture.id, getSubmissionState(false, false));
  }
  return lastState;
}

function updateFixtureSubmitted(lastState: NextFixturesState, fixtureId: string, keyValues: KeyValue[]): NextFixturesState {
  const raw  = lastState.raw.slice(0);
  const index = raw.findIndex(fixture => fixture.id === fixtureId);
  keyValues.forEach(keyVal => {
    raw[index][keyVal.key] = keyVal.value;
  })
  return { raw }
}

function getSubmissionState(submitted: boolean, submitting: boolean) {
  return [{
    key: "submitted",
    value: submitted
  },
  {
    key: "submitting",
    value: submitting
  }];
}

interface KeyValue {
  key: string,
  value: any
}
