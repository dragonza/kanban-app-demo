import { spawn } from 'redux-saga/effects';
import laneSaga from '../page/saga/lane-saga';

export default function* rootSaga() {
	yield spawn(laneSaga);
}
