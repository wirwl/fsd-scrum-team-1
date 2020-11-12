import { SagaIterator } from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';

import Api, { getAuthError } from 'src/services/Api';
import {
  SIGN_IN, SIGN_IN_FIREBASE_SUCCESS,
  // SIGN_OUT_SUCCESS,
} from 'src/redux/user/userTypes';
import {
  signIn,
  signInRequesting,
  signInFail,
  signInFirebaseSuccess,
  signInSuccess,
} from 'src/redux/user/userActions';

const api = new Api();

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

function* signInFirebaseSuccessSaga(
  { payload }: ReturnType<typeof signInFirebaseSuccess>,
): SagaIterator | void {
  const user = yield api.getUser(payload);

  if (user !== null) {
    yield put(signInSuccess(user));
    return;
  }

  yield put(signInFail(`Пользователь с email ${payload} не найден`))
}

function* watchUserSaga(): SagaIterator {
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SIGN_IN_FIREBASE_SUCCESS, signInFirebaseSuccessSaga);
}

export default watchUserSaga;
