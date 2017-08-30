var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/TodoConstants');
var ObjectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';
var _store = {
  list: [],
  editing: false
};

var TodoStore = ObjectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(callBack) {
    this.on(CHANGE_EVENT, callBack);
  },
  removeChangeListener: function(callBack) {
    this.removeListener(CHANGE_EVENT, callBack);
  },
  getList: function() {
    return _store;
  }
});

AppDispatcher.register((payload) => {
  var action = payload.action;
  switch(action.actionType) {
    case AppConstants.NEW_ITEM :
      _store.editing = true;
      TodoStore.emit(CHANGE_EVENT);
      break;
    case AppConstants.SAVE_ITEM :
      _store.list.push(action.text);
      _store.editing = false;
      TodoStore.emit(CHANGE_EVENT);
      break;
    case AppConstants.REMOVE_ITEM :
      _store.list.splice(action.index, 1);
      TodoStore.emit(CHANGE_EVENT);
      break;
    case AppConstants.GET_RANDOM_RESPONSE :
      _store.list.push(action.response);
      TodoStore.emit(CHANGE_EVENT);
      break;
    default :
      return true;
  }
});
module.exports = TodoStore;
