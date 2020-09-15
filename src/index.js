import './assets/stylesheets/style.scss';
import { GameManager, Gameboard } from './modules/logic';
import {
  addButtonStart, addButtonRestart, addPlaceMove, cancelButton, submitButton,
} from './modules/dom';

addButtonStart();
addButtonRestart(Gameboard, GameManager);
addPlaceMove(Gameboard, GameManager);
cancelButton();
submitButton(GameManager);