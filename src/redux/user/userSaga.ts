import { SagaIterator } from 'redux-saga';
import {
  takeLatest,
  put,
  select,
} from 'redux-saga/effects';
import cookie from 'js-cookie';

import Api, { getAuthError } from 'src/services/Api';
import {
  REGISTRATION,
  RegistrationAction,
  SIGN_IN,
  SIGN_OUT,
  SIGN_IN_FIREBASE_SUCCESS,
  UPDATE_USER,
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
  updateUser,
  updateUserFail,
  updateUserRequesting,
  updateUserSuccess,
} from 'src/redux/user/userActions';
import { IRootState } from '../reducer';

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

const selectLoadingStatus = (store: IRootState): boolean => store.user.isRegistration;

function* signInFirebaseSuccessSaga(
  { payload }: ReturnType<typeof signInFirebaseSuccess>,
): SagaIterator | void {
  const isRegistration = yield select(selectLoadingStatus);
  if (isRegistration) return;

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
    const userInfo = action.payload;
    const { user } = yield api.registration({ ...userInfo });

    const [day, month, year] = action.payload.birthday.split('.').map((el) => parseInt(el, 10));
    const birthday = new Date(year, month - 1, day).getTime();

    const newUser = yield api.createUser({
      birthday,
      uid: user.uid,
      getSpecialOffers: userInfo.isGetSpecialOffers,
      email: userInfo.email,
      lastname: userInfo.surname,
      name: userInfo.name,
      sex: userInfo.gender as 'man' | 'woman',
    });

    yield put(registrationSuccess(newUser));
  } catch (error) {
    yield put(registrationFail(String(error)));
  }
}

function* updateUserSaga(
  { payload }: ReturnType<typeof updateUser>,
): SagaIterator | void {
  const uidSelector = (store: IRootState): string | undefined => store.user.user?.uid;
  const uid = yield select(uidSelector);

  yield put(updateUserRequesting());

  if (uid === undefined) {
    yield put(updateUserFail('Вы не авторизованы'));
    return;
  }

  const updateResult = yield api.updateUser(uid, payload);

  if (updateResult === null) {
    yield put(updateUserSuccess(payload));
    return;
  }

  yield put(updateUserFail(updateResult));
}

function* watchUserSaga(): SagaIterator {
  yield takeLatest(REGISTRATION, registrationSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
  yield takeLatest(SIGN_IN, signInSaga);
  yield takeLatest(SIGN_IN_FIREBASE_SUCCESS, signInFirebaseSuccessSaga);
  yield takeLatest(SIGN_OUT, signOutSaga);
}

export default watchUserSaga;
