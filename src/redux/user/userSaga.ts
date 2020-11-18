import { SagaIterator } from 'redux-saga';
import { takeLatest, put } from 'redux-saga/effects';
import cookie from 'js-cookie';

import Api, { getAuthError } from 'src/services/Api';
import {
  SIGN_IN, SIGN_IN_FIREBASE_SUCCESS, SIGN_OUT,
} from 'src/redux/user/userTypes';
import {
  signIn,
  signInRequesting,
  signInFail,
  signInFirebaseSuccess,
  signInSuccess,
  signOutSuccess,
} from 'src/redux/user/userActions';

const TOKEN_NAME = 'firebaseToken';
const TOKEN_EXPIRES = 14;

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
  const firebaseUser = payload;
  const { uid } = firebaseUser;

  const user = yield api.getUser(uid);

  const token = yield firebaseUser.getIdToken();
  cookie.set(TOKEN_NAME, token, { expires: TOKEN_EXPIRES });

  if (user !== null) {
    yield put(signInSuccess(user));
    return;
  }

  yield put(signInFail(`Пользователь с uid ${payload} не найден`));
}

function* signOutSaga(): SagaIterator | void {
  cookie.remove(TOKEN_NAME);
  yield api.auth.signOut();
  yield put(signOutSuccess());
}

function* watchUserSaga(): SagaIterator {
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SIGN_IN_FIREBASE_SUCCESS, signInFirebaseSuccessSaga);
  yield takeLatest(SIGN_OUT, signOutSaga);
}

export default watchUserSaga;
