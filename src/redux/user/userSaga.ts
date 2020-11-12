import { SagaIterator } from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';

import Api, { getAuthError } from 'src/services/Api';
import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT_SUCCESS,
} from 'src/redux/user/userTypes';
import {
  signIn,
  signInRequesting,
  signInSuccess,
  signInFail,
} from 'src/redux/user/userActions';

const api = new Api();

function* signInSuccessSaga(
  { payload }: ReturnType<typeof signInSuccess>,
) : SagaIterator {
  yield put(signInSuccess(payload));
}

// function* signInFailSaga(
//   { payload }: ReturnType<typeof signInFail>,
// ) : SagaIterator {
//   yield put(signInFail(payload));
// }

const DEFAULT_MESSAGE = 'Что-то пошло не так, проверьте соединение и перезагрузите страницу';
function* signInSaga(
  { payload }: ReturnType<typeof signIn>,
): SagaIterator | void {
  yield put(signInRequesting());
  try {
    yield api.signIn(payload);
  } catch (error) {
    const { code, message } = error;

    const errorMessage = getAuthError(code);

    if (errorMessage === null) {
      yield put(signInFail(DEFAULT_MESSAGE));
      console.error(
        'Error with `signing in` in signInSaga method. Message',
        message,
      );
    } else {
      yield put(signInFail(errorMessage));
    }
  }
}

function* watchUserSaga(): SagaIterator {
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SIGN_IN_SUCCESS, signInSuccessSaga);
  // yield takeLatest(SIGN_IN_FAIL, signInFailSaga);
}

export default watchUserSaga;
