'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Model2 = require('/Library/WebServer/Documents/baesic.js/core/Model.js');

var _Model3 = _interopRequireDefault(_Model2);

var _v = require('/Library/WebServer/Documents/baesic.js/node_modules/uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _underscore = require('/Library/WebServer/Documents/baesic.js/node_modules/underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserModel = function (_Model) {
	_inherits(UserModel, _Model);

	function UserModel() {
		_classCallCheck(this, UserModel);

		var _this = _possibleConstructorReturn(this, (UserModel.__proto__ || Object.getPrototypeOf(UserModel)).call(this));

		_this.table = "users";
		return _this;
	}

	_createClass(UserModel, [{
		key: 'checkCredentials',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(username, password) {
				var userCheck, uuid;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.queryRow("SELECT * from users where username = ? and password = ? LIMIT 1", [username, password]);

							case 2:
								userCheck = _context.sent;

								if (_underscore2.default.isEmpty(userCheck)) {
									_context.next = 8;
									break;
								}

								uuid = (0, _v2.default)();
								_context.next = 7;
								return this.setLoginToken(uuid, userCheck.id);

							case 7:
								return _context.abrupt('return', { token: uuid, id: userCheck.id });

							case 8:
								return _context.abrupt('return', false);

							case 9:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function checkCredentials(_x, _x2) {
				return _ref.apply(this, arguments);
			}

			return checkCredentials;
		}()
	}, {
		key: 'getUserRow',
		value: function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return this.queryRow("SELECT * from users where id = ? LIMIT 1", [id]);

							case 2:
								return _context2.abrupt('return', _context2.sent);

							case 3:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getUserRow(_x3) {
				return _ref2.apply(this, arguments);
			}

			return getUserRow;
		}()
	}, {
		key: 'setLoginToken',
		value: function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(token, userDetails) {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return this.client.set(token, userDetails);

							case 2:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function setLoginToken(_x4, _x5) {
				return _ref3.apply(this, arguments);
			}

			return setLoginToken;
		}()
	}, {
		key: 'checkTokenExist',
		value: function () {
			var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(auth) {
				var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
				var id;
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return this.client.getAsync(auth);

							case 2:
								id = _context4.sent;

								if (!(id && !result)) {
									_context4.next = 7;
									break;
								}

								return _context4.abrupt('return', id);

							case 7:
								if (!(id && result)) {
									_context4.next = 11;
									break;
								}

								_context4.next = 10;
								return this.getUserRow(id);

							case 10:
								return _context4.abrupt('return', _context4.sent);

							case 11:
								return _context4.abrupt('return', false);

							case 12:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function checkTokenExist(_x6) {
				return _ref4.apply(this, arguments);
			}

			return checkTokenExist;
		}()
	}]);

	return UserModel;
}(_Model3.default);

module.exports = new UserModel();