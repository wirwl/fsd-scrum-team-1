import { SagaIterator } from 'redux-saga';
import { takeLatest, put, call } from 'redux-saga/effects';
import cookie from 'js-cookie';

import Api, { getAuthError } from 'src/services/Api';
import {
  REGISTRATION,
  RegistrationAction,
  SIGN_IN, SIGN_IN_FIREBASE_SUCCESS, SIGN_OUT,
} from 'src/redux/user/userTypes';
import {
  signIn,
  signInRequesting,
  signInFail,
  signInFirebaseSuccess,
  signInSuccess,
  signOutSuccess,
  registrationFail,
  registrationSuccess,
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

function* registrationSaga(action: RegistrationAction): SagaIterator | void {
  try {
    const info = action.payload;
    const newUser = yield call(api.createUser.bind(api), {
      uid: `${Date.now()}${Math.random()}`,
      birthday: info.birthday,
      email: info.email,
      getSpecialOffers: info.isGetSpecialOffers,
      lastname: info.surname,
      name: info.name,
      sex: info.gender,
    });
    yield put(registrationSuccess(newUser));
  } catch (error) {
    yield put(registrationFail(String(error)));
  }
}

function* watchUserSaga(): SagaIterator {
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SIGN_IN_FIREBASE_SUCCESS, signInFirebaseSuccessSaga);
  yield takeLatest(SIGN_OUT, signOutSaga);
  yield takeLatest(REGISTRATION, registrationSaga);
}

export default watchUserSaga;
