webpackJsonp([1,5],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(800);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__authentication_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModuleService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ModuleService = (function () {
    function ModuleService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
    }
    ModuleService.prototype.loadFeaturedModules = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
        return this.http.get('/api/module/featured', { headers: headers })
            .map(function (response) {
            if (response.status === 200) {
                _this.moduleList = response.json();
                return true;
            }
            return false;
        });
    };
    ModuleService.prototype.loadModules = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
        return this.http.get('/api/module', { headers: headers })
            .map(function (response) {
            if (response.status === 200) {
                _this.moduleList = response.json();
                return true;
            }
            return false;
        });
    };
    ModuleService.prototype.loadModule = function (moduleCode) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
        return this.http.get("/api/module/" + moduleCode, { headers: headers })
            .map(function (response) {
            if (response.status === 200) {
                _this.selectedModule = response.json();
                return true;
            }
            return false;
        });
    };
    ModuleService.prototype.addModule = function (module) {
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"]();
    };
    ModuleService.prototype.getModules = function () {
        return this.moduleList;
    };
    ModuleService.prototype.getSelectedModule = function () {
        return this.selectedModule;
    };
    ModuleService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__authentication_service__["a" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__authentication_service__["a" /* AuthenticationService */]) === 'function' && _b) || Object])
    ], ModuleService);
    return ModuleService;
    var _a, _b;
}());
//# sourceMappingURL=module.service.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__authentication_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var QuestionService = (function () {
    function QuestionService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
    }
    QuestionService.prototype.addQuestion = function (question) {
        return this.http.post('/api/question', {
            "title": question.title,
            "moduleCode": question.moduleCode,
            "moduleName": question.moduleName,
            "topic": question.topic,
            "description": question.description,
            "submittedBy": question.submittedBy,
            "tags": question.tags,
            "token": this.authenticationService.getloggedOnUser().token
        })
            .map(function (response) {
            if (response.status === 200) {
                return true;
            }
            return false;
        });
    };
    QuestionService.prototype.loadQuestions = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
        return this.http.get('/api/question', { headers: headers })
            .map(function (response) {
            if (response.status === 200) {
                _this.questionList = response.json();
                return true;
            }
            return false;
        });
    };
    QuestionService.prototype.searchQuestions = function (keyword) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
        return this.http.get("/api/question/search/" + keyword, { headers: headers })
            .map(function (response) {
            if (response.status === 200) {
                _this.questionList = response.json();
                return true;
            }
            return false;
        });
    };
    QuestionService.prototype.loadQuestionsByModule = function (moduleCode) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
        return this.http.get("/api/question/module/" + moduleCode, { headers: headers })
            .map(function (response) {
            if (response.status === 200) {
                _this.questionList = response.json();
                return true;
            }
            return false;
        });
    };
    QuestionService.prototype.loadQuestionById = function (questionId) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
        return this.http.get("/api/question/" + questionId, { headers: headers })
            .map(function (response) {
            if (response.status === 200) {
                _this.selectedQuestion = response.json();
                _this.answerList = response.json() && response.json().answers;
                return true;
            }
            return false;
        });
    };
    QuestionService.prototype.addAnswer = function (questionId, answer) {
        return this.http.post("/api/answer/", {
            "questionId": questionId,
            "answer": {
                "answer": answer.answer,
                "submittedBy": answer.submittedBy
            },
            "token": this.authenticationService.getloggedOnUser().token
        })
            .map(function (response) {
            if (response.status === 200) {
                return true;
            }
            return false;
        });
    };
    QuestionService.prototype.getQuestionList = function () {
        return this.questionList;
    };
    QuestionService.prototype.getSelectedQuestion = function () {
        return this.selectedQuestion;
    };
    QuestionService.prototype.getAnswerList = function () {
        return this.answerList;
    };
    QuestionService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__authentication_service__["a" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__authentication_service__["a" /* AuthenticationService */]) === 'function' && _b) || Object])
    ], QuestionService);
    return QuestionService;
    var _a, _b;
}());
//# sourceMappingURL=question.service.js.map

/***/ }),

/***/ 1081:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(517);


/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.storage = localStorage;
    }
    AuthenticationService.prototype.login = function (user) {
        var _this = this;
        return this.http.post('/api/user/login', {
            "email": user.email,
            "password": user.password
        })
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            if (token) {
                // set token property
                user.token = token;
                user.username = response.json() && response.json().username;
                user.accessLevel = response.json() && response.json().accessLevel;
                user.password = '';
                // store username and jwt token in local storage to keep user logged in between page refreshes
                _this.storage.setItem('currentUser', JSON.stringify(user));
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        });
    };
    AuthenticationService.prototype.register = function (user) {
        return this.http.post('/api/user/register', {
            "email": user.email,
            "username": user.username,
            "password": user.password
        })
            .map(function (response) {
            if (response.status == 200) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.storage.removeItem('currentUser');
    };
    AuthenticationService.prototype.getloggedOnUser = function () {
        return JSON.parse(this.storage.getItem('currentUser'));
    };
    AuthenticationService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], AuthenticationService);
    return AuthenticationService;
    var _a;
}());
//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__authentication_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserService = (function () {
    function UserService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
    }
    UserService.prototype.subscribeModule = function (email, module) {
        var _this = this;
        return this.http.post('/api/user/subscribe', {
            "email": email,
            "id": module._id,
            "token": this.authenticationService.getloggedOnUser().token
        })
            .map(function (response) {
            if (response.status === 200) {
                _this.subscribedModuleList.push(module);
                return true;
            }
            else {
                return false;
            }
        });
    };
    ;
    UserService.prototype.loadSubscribedModules = function (email) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
        return this.http.get("/api/user/profile/" + email, { headers: headers })
            .map(function (response) {
            if (response.status === 200) {
                _this.subscribedModuleList = response.json() && response.json().subscribedModules;
                return true;
            }
            return false;
        });
    };
    UserService.prototype.getSubscribedModules = function () {
        return this.subscribedModuleList;
    };
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__authentication_service__["a" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__authentication_service__["a" /* AuthenticationService */]) === 'function' && _b) || Object])
    ], UserService);
    return UserService;
    var _a, _b;
}());
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Error403Component; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Error403Component = (function () {
    function Error403Component() {
    }
    Error403Component.prototype.ngOnInit = function () {
    };
    Error403Component = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-error-403',
            template: __webpack_require__(773),
            styles: []
        }), 
        __metadata('design:paramtypes', [])
    ], Error403Component);
    return Error403Component;
}());
//# sourceMappingURL=error-403.component.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Error404Component; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Error404Component = (function () {
    function Error404Component() {
    }
    Error404Component.prototype.ngOnInit = function () {
    };
    Error404Component = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-error-404',
            template: __webpack_require__(774),
            styles: []
        }), 
        __metadata('design:paramtypes', [])
    ], Error404Component);
    return Error404Component;
}());
//# sourceMappingURL=error-404.component.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_module_service__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_question_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddQuestionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddQuestionComponent = (function () {
    function AddQuestionComponent(moduleService, questionService, authenticationService) {
        this.moduleService = moduleService;
        this.questionService = questionService;
        this.authenticationService = authenticationService;
        this.question = {
            _id: '',
            title: '',
            moduleCode: '',
            moduleName: '',
            topic: '',
            description: '',
            tags: [],
            totalRatings: 0,
            totalAnswers: 0,
            submittedBy: ''
        };
        this.hasError = false;
    }
    AddQuestionComponent.prototype.loadSelectedModule = function (moduleCode) {
        var _this = this;
        moduleCode = moduleCode.slice(0, 6);
        this.moduleService.loadModule(moduleCode).subscribe(function (result) {
            if (result) {
                _this.selectedModule = _this.moduleService.getSelectedModule();
            }
            else {
                _this.selectedModule = null;
            }
            _this.question.topic = '';
        });
        setTimeout(function () {
            $('select').material_select('destroy');
            $('select').material_select();
        }, 1000);
    };
    AddQuestionComponent.prototype.submitQuestion = function () {
        if (this.selectedModule == null) {
            this.hasError = true;
        }
        else {
            this.hasError = false;
            this.question.moduleCode = this.selectedModule.moduleCode;
            this.question.moduleName = this.selectedModule.moduleName;
            this.question.topic = $('#topic').val();
            this.question.title = $('#title').val();
            this.question.submittedBy = this.authenticationService.getloggedOnUser().username; //can remove after authentication implemented
            var chips = $('.chips-placeholder').material_chip('data');
            for (var _i = 0, chips_1 = chips; _i < chips_1.length; _i++) {
                var chip = chips_1[_i];
                this.question.tags.push(chip.tag);
            }
            console.log(this.question);
            this.questionService.addQuestion(this.question).subscribe(function (result) {
                if (result) {
                    console.log('Success');
                }
            });
        }
    };
    AddQuestionComponent.prototype.ngOnInit = function () {
    };
    AddQuestionComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.moduleService.loadModules().subscribe(function (result) {
            if (result) {
                _this.moduleList = _this.moduleService.getModules();
                var item = {};
                for (var _i = 0, _a = _this.moduleList; _i < _a.length; _i++) {
                    var module = _a[_i];
                    item[module.moduleCode + ' - ' + module.moduleName] = null;
                }
                $(document).ready(function () {
                    $('.modal').modal();
                    $('select').material_select();
                    $('#moduleSearch').autocomplete({
                        data: item,
                        limit: 20,
                        minLength: 1,
                        onAutocomplete: function () {
                            $('#load_topics').click();
                        }
                    });
                    $('.chips-placeholder').material_chip({
                        placeholder: 'Enter a tag',
                        secondaryPlaceholder: '+Tag',
                    });
                });
            }
        });
    };
    AddQuestionComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-add-question',
            template: __webpack_require__(775),
            styles: []
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_module_service__["a" /* ModuleService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_module_service__["a" /* ModuleService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_question_service__["a" /* QuestionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_question_service__["a" /* QuestionService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__["a" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__["a" /* AuthenticationService */]) === 'function' && _c) || Object])
    ], AddQuestionComponent);
    return AddQuestionComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=add-question.component.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_module_service__ = __webpack_require__(101);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeaturedComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FeaturedComponent = (function () {
    function FeaturedComponent(moduleService) {
        this.moduleService = moduleService;
        this.message = 'Loading.....';
    }
    FeaturedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.moduleService.loadFeaturedModules()
            .subscribe(function (result) {
            if (result) {
                _this.modulesList = _this.moduleService.getModules();
            }
            else {
                _this.message = 'Sorry no modules.';
            }
        });
    };
    FeaturedComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-featured',
            template: __webpack_require__(776)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_module_service__["a" /* ModuleService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_module_service__["a" /* ModuleService */]) === 'function' && _a) || Object])
    ], FeaturedComponent);
    return FeaturedComponent;
    var _a;
}());
//# sourceMappingURL=featured.component.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-home',
            template: __webpack_require__(777),
            styles: []
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_module_service__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_question_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModuleDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ModuleDetailsComponent = (function () {
    function ModuleDetailsComponent(moduleService, questionService, activatedRoute) {
        this.moduleService = moduleService;
        this.questionService = questionService;
        this.activatedRoute = activatedRoute;
        this.message = 'Loading...';
        this.isLoading = true;
    }
    ModuleDetailsComponent.prototype.getModule = function (id) {
        var _this = this;
        this.isLoading = true;
        this.message = 'Loading...';
        this.moduleService.loadModule(id)
            .subscribe(function (result) {
            if (result) {
                _this.selectedModule = _this.moduleService.getSelectedModule();
                _this.getQuestions(id);
                console.log(_this.message);
            }
            else {
                _this.selectedModule = null;
                _this.message = 'No such Module...';
            }
        }, function (err) {
            _this.selectedModule = null;
            _this.message = 'No such Module...';
        });
    };
    ModuleDetailsComponent.prototype.getQuestions = function (id) {
        var _this = this;
        this.questionService.loadQuestionsByModule(id)
            .subscribe(function (result) {
            if (result) {
                _this.questionList = _this.questionService.getQuestionList();
                _this.isLoading = false;
            }
            else {
                _this.questionList = null;
                _this.message = 'No questions submitted...';
            }
        });
    };
    ModuleDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) {
            _this.getModule(params['id']);
        });
    };
    ModuleDetailsComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ModuleDetailsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-module-details',
            template: __webpack_require__(778)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_module_service__["a" /* ModuleService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_module_service__["a" /* ModuleService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_question_service__["a" /* QuestionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_question_service__["a" /* QuestionService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object])
    ], ModuleDetailsComponent);
    return ModuleDetailsComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=module-details.component.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_module_service__ = __webpack_require__(101);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchModuleComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchModuleComponent = (function () {
    function SearchModuleComponent(moduleService) {
        this.moduleService = moduleService;
        this.message = 'Loading.....';
    }
    SearchModuleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.moduleService.loadModules()
            .subscribe(function (result) {
            if (result) {
                _this.modulesList = _this.moduleService.getModules();
            }
            else {
                _this.message = 'Sorry no modules.';
            }
        });
    };
    SearchModuleComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-search-module',
            template: __webpack_require__(779)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_module_service__["a" /* ModuleService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_module_service__["a" /* ModuleService */]) === 'function' && _a) || Object])
    ], SearchModuleComponent);
    return SearchModuleComponent;
    var _a;
}());
//# sourceMappingURL=search-module.component.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_question_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchQuestionsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SearchQuestionsComponent = (function () {
    function SearchQuestionsComponent(questionService, activatedRoute) {
        this.questionService = questionService;
        this.activatedRoute = activatedRoute;
        this.message = 'Loading...';
    }
    SearchQuestionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.activatedRoute.params.subscribe(function (params) { return _this.searchQuestions(params['keyword']); });
    };
    SearchQuestionsComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SearchQuestionsComponent.prototype.searchQuestions = function (keyword) {
        var _this = this;
        this.questionList = null;
        this.message = 'Loading...';
        this.questionService.searchQuestions(keyword)
            .subscribe(function (result) {
            if (result) {
                _this.questionList = _this.questionService.getQuestionList();
            }
            else {
                _this.message = 'Sorry no questions...';
            }
        });
    };
    SearchQuestionsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-search-questions',
            template: __webpack_require__(780),
            styles: []
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_question_service__["a" /* QuestionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_question_service__["a" /* QuestionService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], SearchQuestionsComponent);
    return SearchQuestionsComponent;
    var _a, _b;
}());
//# sourceMappingURL=search-questions.component.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_question_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewQuestionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ViewQuestionComponent = (function () {
    function ViewQuestionComponent(questionService, activatedRoute, authenticationService) {
        this.questionService = questionService;
        this.activatedRoute = activatedRoute;
        this.authenticationService = authenticationService;
        this.editingAnswer = {
            _id: '',
            totalRatings: 0,
            answer: '',
            submittedBy: ''
        };
    }
    ViewQuestionComponent.prototype.ngOnInit = function () {
        var id = this.activatedRoute.snapshot.params['id'];
        this.loadQuestion(id);
    };
    ViewQuestionComponent.prototype.loadQuestion = function (id) {
        var _this = this;
        this.questionService.loadQuestionById(id).subscribe(function (result) {
            if (result) {
                _this.selectedQuestion = _this.questionService.getSelectedQuestion();
                _this.answerList = _this.questionService.getAnswerList();
            }
            else {
                _this.selectedQuestion = null;
                _this.answerList = null;
            }
        });
    };
    ViewQuestionComponent.prototype.addAnswer = function () {
        var _this = this;
        this.editingAnswer.submittedBy = this.authenticationService.getloggedOnUser().username;
        this.questionService.addAnswer(this.selectedQuestion._id, this.editingAnswer).subscribe(function (result) {
            if (result) {
                var clone = {
                    _id: '',
                    totalRatings: 0,
                    answer: '',
                    submittedBy: ''
                };
                Object.assign(clone, _this.editingAnswer);
                _this.answerList.push(clone);
                _this.selectedQuestion.totalAnswers++;
                _this.editingAnswer.answer = '';
            }
        });
    };
    ViewQuestionComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-view-question',
            template: __webpack_require__(782),
            styles: []
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_question_service__["a" /* QuestionService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_question_service__["a" /* QuestionService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__["a" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__["a" /* AuthenticationService */]) === 'function' && _c) || Object])
    ], ViewQuestionComponent);
    return ViewQuestionComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=view-question.component.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_report_service__ = __webpack_require__(353);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewReportComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ViewReportComponent = (function () {
    function ViewReportComponent(reportService) {
        this.reportService = reportService;
        this.isModuleDataLoaded = false;
        this.isQuestionDataLoaded = false;
        this.moduleChart = {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        };
        this.allQuestionsChart = {
            type: 'bar',
            data: {
                labels: ['Answered', 'Unanswered'],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        };
    }
    ViewReportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reportService.loadOverallReport()
            .subscribe(function (result) {
            if (result) {
                _this.moduleList = _this.reportService.getModuleReport();
                _this.generateModuleChartData(_this.reportService.getModuleReport());
                _this.isModuleDataLoaded = true;
                _this.reportService.loadUnanswered()
                    .subscribe(function (result) {
                    if (result) {
                        _this.generateAllQuestionsChartData(_this.reportService.getAnsweredCount(), _this.reportService.getUnansweredCount());
                        _this.isQuestionDataLoaded = true;
                    }
                });
            }
        });
    };
    ViewReportComponent.prototype.generateModuleChartData = function (data) {
        var dataSet = [];
        var colorSet = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var module = data_1[_i];
            this.moduleChart.data.labels.push(module.moduleCode + ' - ' + module.moduleName);
            dataSet.push(module.totalQuestions);
            colorSet.push(this.getRandomColor());
        }
        this.moduleChart.data.datasets.push({
            data: dataSet,
            backgroundColor: colorSet,
            label: 'Module Report'
        });
    };
    ViewReportComponent.prototype.generateAllQuestionsChartData = function (answered, unanswered) {
        console.log(answered);
        this.allQuestionsChart.data.datasets.push({
            data: [answered, unanswered],
            backgroundColor: ['#1976d2', '#9e9e9e'],
            label: 'Questions'
        });
    };
    ViewReportComponent.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    ViewReportComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-view-report',
            template: __webpack_require__(783),
            styles: []
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_report_service__["a" /* ReportService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_report_service__["a" /* ReportService */]) === 'function' && _a) || Object])
    ], ViewReportComponent);
    return ViewReportComponent;
    var _a;
}());
//# sourceMappingURL=view-report.component.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.user = { email: '', password: '', username: '', token: '', accessLevel: 0 };
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authenticationService.login(this.user)
            .subscribe(function (result) {
            if (result) {
                _this.router.navigate(['/featured']);
            }
            return result;
        });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-login',
            template: __webpack_require__(784)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */]) === 'function' && _b) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b;
}());
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignUpComponent = (function () {
    function SignUpComponent(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.user = { email: '', password: '', username: '', token: '', accessLevel: 0 };
    }
    SignUpComponent.prototype.ngOnInit = function () {
        this.authenticationService.logout();
    };
    SignUpComponent.prototype.register = function () {
        var _this = this;
        this.authenticationService.register(this.user)
            .subscribe(function (result) {
            if (result) {
                _this.router.navigate(['/login']);
            }
            return result;
        });
    };
    SignUpComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-sign-up',
            template: __webpack_require__(785)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], SignUpComponent);
    return SignUpComponent;
    var _a, _b;
}());
//# sourceMappingURL=sign-up.component.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.authenticationService.getloggedOnUser()) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */]) === 'function' && _b) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LecturerGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LecturerGuard = (function () {
    function LecturerGuard(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
    }
    LecturerGuard.prototype.canActivate = function () {
        if (this.authenticationService.getloggedOnUser().accessLevel == 1) {
            //If lecturer
            return true;
        }
        // If not lecturer
        this.router.navigate(['/forbidden']);
        return false;
    };
    LecturerGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], LecturerGuard);
    return LecturerGuard;
    var _a, _b;
}());
//# sourceMappingURL=lecturer.guard.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__authentication_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReportService = (function () {
    function ReportService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
        this.moduleReport = [];
    }
    ReportService.prototype.loadOverallReport = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
        return this.http.get('/api/report', { headers: headers })
            .map(function (response) {
            if (response.status === 200) {
                _this.moduleReport = response.json();
                return true;
            }
            else {
                return false;
            }
        });
    };
    ;
    ReportService.prototype.loadUnanswered = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('x-jwt-token', this.authenticationService.getloggedOnUser().token);
        return this.http.get('/api/report/unanswered', { headers: headers })
            .map(function (response) {
            if (response.status === 200) {
                _this.unanswered = response.json() && response.json().count;
                return true;
            }
            else {
                return false;
            }
        });
    };
    ReportService.prototype.getModuleReport = function () {
        return this.moduleReport;
    };
    ReportService.prototype.getUnansweredCount = function () {
        return this.unanswered;
    };
    ReportService.prototype.getAnsweredCount = function () {
        var count = 0;
        for (var _i = 0, _a = this.moduleReport; _i < _a.length; _i++) {
            var module = _a[_i];
            count += module.totalQuestions;
        }
        return (count - this.unanswered);
    };
    ReportService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__authentication_service__["a" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__authentication_service__["a" /* AuthenticationService */]) === 'function' && _b) || Object])
    ], ReportService);
    return ReportService;
    var _a, _b;
}());
//# sourceMappingURL=report.service.js.map

/***/ }),

/***/ 516:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 516;


/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(610);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_ask_module__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(661);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_ask_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 640:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AskComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AskComponent = (function () {
    function AskComponent() {
    }
    AskComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-root',
            template: '<router-outlet></router-outlet>'
        }), 
        __metadata('design:paramtypes', [])
    ], AskComponent);
    return AskComponent;
}());
//# sourceMappingURL=ask.component.js.map

/***/ }),

/***/ 641:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_chartjs__ = __webpack_require__(663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_chartjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_chartjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ask_component__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_header_header_component__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_footer_footer_component__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_side_panel_side_panel_component__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_module_module_summary_component__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_module_module_summary_list_component__ = __webpack_require__(652);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_about_us_aboutus_component__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_header_loginheader_component__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_home_home_component__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_question_question_summary_component__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__shared_question_question_list_component__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ask_routing__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_login_login_component__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_sign_up_sign_up_component__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_authentication_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__guards_auth_guard__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_module_service__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_home_featured_featured_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_question_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__shared_text_area_text_area_component__ = __webpack_require__(657);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_home_search_question_search_questions_component__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_home_search_module_search_module_component__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_home_module_details_module_details_component__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_home_add_question_add_question_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__shared_messages_input_error_input_error_component__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__shared_answer_answer_list_component__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__shared_answer_answer_summary_component__ = __webpack_require__(647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_home_view_question_view_question_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_error_pages_error_404_error_404_component__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__services_user_service__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__components_home_view_report_view_report_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__services_report_service__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__components_home_view_module_report_view_module_report_component__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__components_error_pages_error_403_error_403_component__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__guards_lecturer_guard__ = __webpack_require__(352);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__ask_component__["a" /* AskComponent */],
                __WEBPACK_IMPORTED_MODULE_6__shared_header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_7__shared_footer_footer_component__["a" /* FooterComponent */],
                __WEBPACK_IMPORTED_MODULE_8__shared_side_panel_side_panel_component__["a" /* SidePanelComponent */],
                __WEBPACK_IMPORTED_MODULE_9__shared_module_module_summary_component__["a" /* ModuleSummaryComponent */],
                __WEBPACK_IMPORTED_MODULE_10__shared_module_module_summary_list_component__["a" /* ModuleSummaryListComponent */],
                __WEBPACK_IMPORTED_MODULE_11__shared_about_us_aboutus_component__["a" /* AboutusComponent */],
                __WEBPACK_IMPORTED_MODULE_12__shared_header_loginheader_component__["a" /* LoginheaderComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_25__shared_text_area_text_area_component__["a" /* TextAreaComponent */],
                __WEBPACK_IMPORTED_MODULE_15__shared_question_question_summary_component__["a" /* QuestionSummaryComponent */],
                __WEBPACK_IMPORTED_MODULE_16__shared_question_question_list_component__["a" /* QuestionListComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_sign_up_sign_up_component__["a" /* SignUpComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_home_featured_featured_component__["a" /* FeaturedComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_home_search_question_search_questions_component__["a" /* SearchQuestionsComponent */],
                __WEBPACK_IMPORTED_MODULE_27__components_home_search_module_search_module_component__["a" /* SearchModuleComponent */],
                __WEBPACK_IMPORTED_MODULE_28__components_home_module_details_module_details_component__["a" /* ModuleDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_29__components_home_add_question_add_question_component__["a" /* AddQuestionComponent */],
                __WEBPACK_IMPORTED_MODULE_30__shared_messages_input_error_input_error_component__["a" /* InputErrorComponent */],
                __WEBPACK_IMPORTED_MODULE_31__shared_answer_answer_list_component__["a" /* AnswerListComponent */],
                __WEBPACK_IMPORTED_MODULE_32__shared_answer_answer_summary_component__["a" /* AnswerSummaryComponent */],
                __WEBPACK_IMPORTED_MODULE_33__components_home_view_question_view_question_component__["a" /* ViewQuestionComponent */],
                __WEBPACK_IMPORTED_MODULE_34__components_error_pages_error_404_error_404_component__["a" /* Error404Component */],
                __WEBPACK_IMPORTED_MODULE_36__components_home_view_report_view_report_component__["a" /* ViewReportComponent */],
                __WEBPACK_IMPORTED_MODULE_38__components_home_view_module_report_view_module_report_component__["a" /* ViewModuleReportComponent */],
                __WEBPACK_IMPORTED_MODULE_39__components_error_pages_error_403_error_403_component__["a" /* Error403Component */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_14__angular_router__["a" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_4_angular2_chartjs__["ChartModule"],
                __WEBPACK_IMPORTED_MODULE_17__ask_routing__["a" /* routing */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_20__services_authentication_service__["a" /* AuthenticationService */],
                __WEBPACK_IMPORTED_MODULE_22__services_module_service__["a" /* ModuleService */],
                __WEBPACK_IMPORTED_MODULE_24__services_question_service__["a" /* QuestionService */],
                __WEBPACK_IMPORTED_MODULE_35__services_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_37__services_report_service__["a" /* ReportService */],
                __WEBPACK_IMPORTED_MODULE_21__guards_auth_guard__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_40__guards_lecturer_guard__["a" /* LecturerGuard */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__ask_component__["a" /* AskComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=ask.module.js.map

/***/ }),

/***/ 642:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_home_home_component__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_login_login_component__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_home_home_routes__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_sign_up_sign_up_component__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__guards_auth_guard__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_error_pages_error_404_error_404_component__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_error_pages_error_403_error_403_component__ = __webpack_require__(339);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });








var APP_ROUTES = [
    { path: '', redirectTo: 'featured', pathMatch: 'full' },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__components_home_home_component__["a" /* HomeComponent */], children: __WEBPACK_IMPORTED_MODULE_3__components_home_home_routes__["a" /* HOME_ROUTES */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_2__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'sign-up', component: __WEBPACK_IMPORTED_MODULE_4__components_sign_up_sign_up_component__["a" /* SignUpComponent */] },
    { path: 'forbidden', component: __WEBPACK_IMPORTED_MODULE_7__components_error_pages_error_403_error_403_component__["a" /* Error403Component */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_6__components_error_pages_error_404_error_404_component__["a" /* Error404Component */] }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(APP_ROUTES);
//# sourceMappingURL=ask.routing.js.map

/***/ }),

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__featured_featured_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_question_search_questions_component__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__module_details_module_details_component__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_question_add_question_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_question_view_question_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__search_module_search_module_component__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__view_report_view_report_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__guards_lecturer_guard__ = __webpack_require__(352);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HOME_ROUTES; });








var HOME_ROUTES = [
    { path: 'featured', component: __WEBPACK_IMPORTED_MODULE_0__featured_featured_component__["a" /* FeaturedComponent */] },
    { path: 'add-question', component: __WEBPACK_IMPORTED_MODULE_3__add_question_add_question_component__["a" /* AddQuestionComponent */] },
    { path: 'search-module', component: __WEBPACK_IMPORTED_MODULE_5__search_module_search_module_component__["a" /* SearchModuleComponent */] },
    { path: 'question/:id', component: __WEBPACK_IMPORTED_MODULE_4__view_question_view_question_component__["a" /* ViewQuestionComponent */] },
    { path: 'question/search/:keyword', component: __WEBPACK_IMPORTED_MODULE_1__search_question_search_questions_component__["a" /* SearchQuestionsComponent */] },
    { path: 'module/:id', component: __WEBPACK_IMPORTED_MODULE_2__module_details_module_details_component__["a" /* ModuleDetailsComponent */] },
    { path: 'view-report', component: __WEBPACK_IMPORTED_MODULE_6__view_report_view_report_component__["a" /* ViewReportComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_7__guards_lecturer_guard__["a" /* LecturerGuard */]] }
];
//# sourceMappingURL=home.routes.js.map

/***/ }),

/***/ 644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewModuleReportComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ViewModuleReportComponent = (function () {
    function ViewModuleReportComponent() {
    }
    ViewModuleReportComponent.prototype.ngOnInit = function () {
    };
    ViewModuleReportComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-view-module-report',
            template: __webpack_require__(781),
            styles: []
        }), 
        __metadata('design:paramtypes', [])
    ], ViewModuleReportComponent);
    return ViewModuleReportComponent;
}());
//# sourceMappingURL=view-module-report.component.js.map

/***/ }),

/***/ 645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutusComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AboutusComponent = (function () {
    function AboutusComponent() {
    }
    AboutusComponent.prototype.ngOnInit = function () {
    };
    AboutusComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-aboutus',
            template: __webpack_require__(786)
        }), 
        __metadata('design:paramtypes', [])
    ], AboutusComponent);
    return AboutusComponent;
}());
//# sourceMappingURL=aboutus.component.js.map

/***/ }),

/***/ 646:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnswerListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AnswerListComponent = (function () {
    function AnswerListComponent() {
    }
    AnswerListComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], AnswerListComponent.prototype, "answerList", void 0);
    AnswerListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-answer-list',
            template: __webpack_require__(787),
            styles: []
        }), 
        __metadata('design:paramtypes', [])
    ], AnswerListComponent);
    return AnswerListComponent;
}());
//# sourceMappingURL=answer-list.component.js.map

/***/ }),

/***/ 647:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types_answer_type__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types_answer_type___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__types_answer_type__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnswerSummaryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AnswerSummaryComponent = (function () {
    function AnswerSummaryComponent() {
    }
    AnswerSummaryComponent.prototype.ngOnInit = function () {
        console.log(this.answer);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__types_answer_type__["Answer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__types_answer_type__["Answer"]) === 'function' && _a) || Object)
    ], AnswerSummaryComponent.prototype, "answer", void 0);
    AnswerSummaryComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-answer-summary',
            template: __webpack_require__(788)
        }), 
        __metadata('design:paramtypes', [])
    ], AnswerSummaryComponent);
    return AnswerSummaryComponent;
    var _a;
}());
//# sourceMappingURL=answer-summary.component.js.map

/***/ }),

/***/ 648:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-footer',
            template: __webpack_require__(789)
        }), 
        __metadata('design:paramtypes', [])
    ], FooterComponent);
    return FooterComponent;
}());
//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ 649:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HeaderComponent = (function () {
    function HeaderComponent(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.username = this.authenticationService.getloggedOnUser().username;
    };
    HeaderComponent.prototype.logout = function () {
        // logout user
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    };
    HeaderComponent.prototype.ngAfterViewInit = function () {
        $(document).ready(function () {
            $('.dropdown-button').dropdown();
        });
    };
    HeaderComponent.prototype.search = function () {
        this.router.navigate([("/question/search/" + this.keyword)]);
    };
    HeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-header',
            template: __webpack_require__(790)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], HeaderComponent);
    return HeaderComponent;
    var _a, _b;
}());
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ 650:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginheaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoginheaderComponent = (function () {
    function LoginheaderComponent() {
    }
    LoginheaderComponent.prototype.ngOnInit = function () {
    };
    LoginheaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-loginheader',
            template: __webpack_require__(791)
        }), 
        __metadata('design:paramtypes', [])
    ], LoginheaderComponent);
    return LoginheaderComponent;
}());
//# sourceMappingURL=loginheader.component.js.map

/***/ }),

/***/ 651:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InputErrorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InputErrorComponent = (function () {
    function InputErrorComponent() {
    }
    InputErrorComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], InputErrorComponent.prototype, "errorMessage", void 0);
    InputErrorComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-input-error',
            template: __webpack_require__(792)
        }), 
        __metadata('design:paramtypes', [])
    ], InputErrorComponent);
    return InputErrorComponent;
}());
//# sourceMappingURL=input-error.component.js.map

/***/ }),

/***/ 652:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModuleSummaryListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ModuleSummaryListComponent = (function () {
    function ModuleSummaryListComponent() {
        this.subscribeEnabled = false;
    }
    ModuleSummaryListComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], ModuleSummaryListComponent.prototype, "moduleList", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ModuleSummaryListComponent.prototype, "subscribeEnabled", void 0);
    ModuleSummaryListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-modulesummarylist',
            template: __webpack_require__(793)
        }), 
        __metadata('design:paramtypes', [])
    ], ModuleSummaryListComponent);
    return ModuleSummaryListComponent;
}());
//# sourceMappingURL=module-summary-list.component.js.map

/***/ }),

/***/ 653:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types_module_type__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types_module_type___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__types_module_type__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__(225);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModuleSummaryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ModuleSummaryComponent = (function () {
    function ModuleSummaryComponent(authenticationService, userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.subscribeEnabled = false;
    }
    ModuleSummaryComponent.prototype.ngOnInit = function () {
    };
    ModuleSummaryComponent.prototype.subscribe = function () {
        var email = this.authenticationService.getloggedOnUser().email;
        this.userService.subscribeModule(email, this.module)
            .subscribe(function (result) {
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__types_module_type__["Module"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__types_module_type__["Module"]) === 'function' && _a) || Object)
    ], ModuleSummaryComponent.prototype, "module", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ModuleSummaryComponent.prototype, "subscribeEnabled", void 0);
    ModuleSummaryComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-module-summary',
            template: __webpack_require__(794)
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]) === 'function' && _c) || Object])
    ], ModuleSummaryComponent);
    return ModuleSummaryComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=module-summary.component.js.map

/***/ }),

/***/ 654:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var QuestionListComponent = (function () {
    function QuestionListComponent() {
    }
    QuestionListComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], QuestionListComponent.prototype, "questionList", void 0);
    QuestionListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-question-list',
            template: __webpack_require__(795)
        }), 
        __metadata('design:paramtypes', [])
    ], QuestionListComponent);
    return QuestionListComponent;
}());
//# sourceMappingURL=question-list.component.js.map

/***/ }),

/***/ 655:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types_question_type__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types_question_type___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__types_question_type__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionSummaryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QuestionSummaryComponent = (function () {
    function QuestionSummaryComponent() {
    }
    QuestionSummaryComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__types_question_type__["Question"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__types_question_type__["Question"]) === 'function' && _a) || Object)
    ], QuestionSummaryComponent.prototype, "question", void 0);
    QuestionSummaryComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-question-summary',
            template: __webpack_require__(796)
        }), 
        __metadata('design:paramtypes', [])
    ], QuestionSummaryComponent);
    return QuestionSummaryComponent;
    var _a;
}());
//# sourceMappingURL=question-summary.component.js.map

/***/ }),

/***/ 656:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(225);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidePanelComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SidePanelComponent = (function () {
    function SidePanelComponent(authenticationService, userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }
    SidePanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userEmail = this.authenticationService.getloggedOnUser().email;
        this.userService.loadSubscribedModules(userEmail)
            .subscribe(function (result) {
            if (result) {
                _this.enrolledModules = _this.userService.getSubscribedModules();
            }
            else {
                _this.enrolledModules = [];
            }
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], SidePanelComponent.prototype, "enrolledModules", void 0);
    SidePanelComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-side-panel',
            template: __webpack_require__(797),
            styles: [__webpack_require__(765)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _b) || Object])
    ], SidePanelComponent);
    return SidePanelComponent;
    var _a, _b;
}());
//# sourceMappingURL=side-panel.component.js.map

/***/ }),

/***/ 657:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextAreaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TextAreaComponent = (function () {
    function TextAreaComponent() {
        this.onEditorKeyup = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    TextAreaComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        tinymce.init({
            selector: '#questionDetail',
            plugins: ['link', 'paste', 'table'],
            skin_url: '/assets/skins/lightgray',
            setup: function (editor) {
                _this.editor = editor;
                editor.on('keyup', function () {
                    var content = editor.getContent();
                    _this.onEditorKeyup.emit(content);
                });
            },
        });
    };
    TextAreaComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], TextAreaComponent.prototype, "onEditorKeyup", void 0);
    TextAreaComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'ask-text-area',
            template: __webpack_require__(798)
        }), 
        __metadata('design:paramtypes', [])
    ], TextAreaComponent);
    return TextAreaComponent;
}());
//# sourceMappingURL=text-area.component.js.map

/***/ }),

/***/ 658:
/***/ (function(module, exports) {

//# sourceMappingURL=answer.type.js.map

/***/ }),

/***/ 659:
/***/ (function(module, exports) {

//# sourceMappingURL=module.type.js.map

/***/ }),

/***/ 660:
/***/ (function(module, exports) {

//# sourceMappingURL=question.type.js.map

/***/ }),

/***/ 661:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 765:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(160)();
// imports


// module
exports.push([module.i, "/*Make scrollable div*/\r\n.scroll-box {\r\n  overflow-y:scroll;\r\n  height: 300px;\r\n}\r\n\r\n@media screen and (max-width: 1024px) {\r\n  .scroll-box {\r\n    overflow-y:hidden;\r\n    height: 300px;\r\n  }\r\n}\r\n\r\n.active{\r\n  background-color: #e0e0e0;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 766:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 371,
	"./af.js": 371,
	"./ar": 378,
	"./ar-dz": 372,
	"./ar-dz.js": 372,
	"./ar-kw": 373,
	"./ar-kw.js": 373,
	"./ar-ly": 374,
	"./ar-ly.js": 374,
	"./ar-ma": 375,
	"./ar-ma.js": 375,
	"./ar-sa": 376,
	"./ar-sa.js": 376,
	"./ar-tn": 377,
	"./ar-tn.js": 377,
	"./ar.js": 378,
	"./az": 379,
	"./az.js": 379,
	"./be": 380,
	"./be.js": 380,
	"./bg": 381,
	"./bg.js": 381,
	"./bn": 382,
	"./bn.js": 382,
	"./bo": 383,
	"./bo.js": 383,
	"./br": 384,
	"./br.js": 384,
	"./bs": 385,
	"./bs.js": 385,
	"./ca": 386,
	"./ca.js": 386,
	"./cs": 387,
	"./cs.js": 387,
	"./cv": 388,
	"./cv.js": 388,
	"./cy": 389,
	"./cy.js": 389,
	"./da": 390,
	"./da.js": 390,
	"./de": 393,
	"./de-at": 391,
	"./de-at.js": 391,
	"./de-ch": 392,
	"./de-ch.js": 392,
	"./de.js": 393,
	"./dv": 394,
	"./dv.js": 394,
	"./el": 395,
	"./el.js": 395,
	"./en-au": 396,
	"./en-au.js": 396,
	"./en-ca": 397,
	"./en-ca.js": 397,
	"./en-gb": 398,
	"./en-gb.js": 398,
	"./en-ie": 399,
	"./en-ie.js": 399,
	"./en-nz": 400,
	"./en-nz.js": 400,
	"./eo": 401,
	"./eo.js": 401,
	"./es": 403,
	"./es-do": 402,
	"./es-do.js": 402,
	"./es.js": 403,
	"./et": 404,
	"./et.js": 404,
	"./eu": 405,
	"./eu.js": 405,
	"./fa": 406,
	"./fa.js": 406,
	"./fi": 407,
	"./fi.js": 407,
	"./fo": 408,
	"./fo.js": 408,
	"./fr": 411,
	"./fr-ca": 409,
	"./fr-ca.js": 409,
	"./fr-ch": 410,
	"./fr-ch.js": 410,
	"./fr.js": 411,
	"./fy": 412,
	"./fy.js": 412,
	"./gd": 413,
	"./gd.js": 413,
	"./gl": 414,
	"./gl.js": 414,
	"./gom-latn": 415,
	"./gom-latn.js": 415,
	"./he": 416,
	"./he.js": 416,
	"./hi": 417,
	"./hi.js": 417,
	"./hr": 418,
	"./hr.js": 418,
	"./hu": 419,
	"./hu.js": 419,
	"./hy-am": 420,
	"./hy-am.js": 420,
	"./id": 421,
	"./id.js": 421,
	"./is": 422,
	"./is.js": 422,
	"./it": 423,
	"./it.js": 423,
	"./ja": 424,
	"./ja.js": 424,
	"./jv": 425,
	"./jv.js": 425,
	"./ka": 426,
	"./ka.js": 426,
	"./kk": 427,
	"./kk.js": 427,
	"./km": 428,
	"./km.js": 428,
	"./kn": 429,
	"./kn.js": 429,
	"./ko": 430,
	"./ko.js": 430,
	"./ky": 431,
	"./ky.js": 431,
	"./lb": 432,
	"./lb.js": 432,
	"./lo": 433,
	"./lo.js": 433,
	"./lt": 434,
	"./lt.js": 434,
	"./lv": 435,
	"./lv.js": 435,
	"./me": 436,
	"./me.js": 436,
	"./mi": 437,
	"./mi.js": 437,
	"./mk": 438,
	"./mk.js": 438,
	"./ml": 439,
	"./ml.js": 439,
	"./mr": 440,
	"./mr.js": 440,
	"./ms": 442,
	"./ms-my": 441,
	"./ms-my.js": 441,
	"./ms.js": 442,
	"./my": 443,
	"./my.js": 443,
	"./nb": 444,
	"./nb.js": 444,
	"./ne": 445,
	"./ne.js": 445,
	"./nl": 447,
	"./nl-be": 446,
	"./nl-be.js": 446,
	"./nl.js": 447,
	"./nn": 448,
	"./nn.js": 448,
	"./pa-in": 449,
	"./pa-in.js": 449,
	"./pl": 450,
	"./pl.js": 450,
	"./pt": 452,
	"./pt-br": 451,
	"./pt-br.js": 451,
	"./pt.js": 452,
	"./ro": 453,
	"./ro.js": 453,
	"./ru": 454,
	"./ru.js": 454,
	"./sd": 455,
	"./sd.js": 455,
	"./se": 456,
	"./se.js": 456,
	"./si": 457,
	"./si.js": 457,
	"./sk": 458,
	"./sk.js": 458,
	"./sl": 459,
	"./sl.js": 459,
	"./sq": 460,
	"./sq.js": 460,
	"./sr": 462,
	"./sr-cyrl": 461,
	"./sr-cyrl.js": 461,
	"./sr.js": 462,
	"./ss": 463,
	"./ss.js": 463,
	"./sv": 464,
	"./sv.js": 464,
	"./sw": 465,
	"./sw.js": 465,
	"./ta": 466,
	"./ta.js": 466,
	"./te": 467,
	"./te.js": 467,
	"./tet": 468,
	"./tet.js": 468,
	"./th": 469,
	"./th.js": 469,
	"./tl-ph": 470,
	"./tl-ph.js": 470,
	"./tlh": 471,
	"./tlh.js": 471,
	"./tr": 472,
	"./tr.js": 472,
	"./tzl": 473,
	"./tzl.js": 473,
	"./tzm": 475,
	"./tzm-latn": 474,
	"./tzm-latn.js": 474,
	"./tzm.js": 475,
	"./uk": 476,
	"./uk.js": 476,
	"./ur": 477,
	"./ur.js": 477,
	"./uz": 479,
	"./uz-latn": 478,
	"./uz-latn.js": 478,
	"./uz.js": 479,
	"./vi": 480,
	"./vi.js": 480,
	"./x-pseudo": 481,
	"./x-pseudo.js": 481,
	"./yo": 482,
	"./yo.js": 482,
	"./zh-cn": 483,
	"./zh-cn.js": 483,
	"./zh-hk": 484,
	"./zh-hk.js": 484,
	"./zh-tw": 485,
	"./zh-tw.js": 485
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 766;


/***/ }),

/***/ 773:
/***/ (function(module, exports) {

module.exports = "<body>\n<main>\n  <div class=\"container\">\n    <div class=\"row\" style=\"padding-top: 50px;\">\n      <h1 class=\"center-align\" style=\"font-size: 200px\">403</h1>\n    </div>\n    <div class=\"divider\"></div>\n    <div class=\"row\">\n      <h1 class=\"center-align\">Forbidden Access!</h1>\n      <p class=\"center-align\">You do not have permission to access this route. Please contact system administrator.</p>\n      <p class=\"center-align\"><a [routerLink] = \"['/']\">Asking - Home</a></p>\n    </div>\n  </div>\n</main>\n</body>\n"

/***/ }),

/***/ 774:
/***/ (function(module, exports) {

module.exports = "<body>\n<main>\n  <div class=\"container\">\n    <div class=\"row\" style=\"padding-top: 50px;\">\n      <h1 class=\"center-align\" style=\"font-size: 200px\">404</h1>\n    </div>\n    <div class=\"divider\"></div>\n    <div class=\"row\">\n      <h1 class=\"center-align\">Page not found!</h1>\n      <p class=\"center-align\">You may have typed the address incorrectly or you may have used an unauthorized link.</p>\n      <p class=\"center-align\"><a [routerLink] = \"['/']\">Asking - Home</a></p>\n    </div>\n  </div>\n</main>\n</body>\n"

/***/ }),

/***/ 775:
/***/ (function(module, exports) {

module.exports = "<div class=\"row container\" style=\"padding-top: 20px\">\n  <h5>Add New Question</h5>\n</div>\n<div class=\"row divider\"></div>\n<div class=\"container\" style=\"padding-bottom: 50px\">\n  <!-- Modal Structure -->\n  <div id=\"confirmation\" class=\"modal\">\n    <div class=\"modal-content\">\n      <h4>Question is not submitted!</h4>\n      <p>Do you wish to cancel the question submission. All the entered details will be lost.</p>\n    </div>\n    <div class=\"modal-footer\">\n      <a [routerLink]=\"['/featured']\" class=\"modal-action modal-close waves-effect waves-green btn-flat\">Agree</a>\n    </div>\n  </div>\n\n  <form (ngSubmit)=\"submitQuestion()\">\n    <div class=\"row\">\n      <div class=\"input-field col s12\">\n        <input type=\"text\" placeholder=\"Search for module\" id=\"moduleSearch\" class=\"autocomplete\"\n               name=\"moduleSearch\" autocomplete=\"off\" #moduleName required>\n        <button id=\"load_topics\" hidden (click)=\"loadSelectedModule(moduleName.value)\" type=\"button\"></button>\n        <label for=\"moduleSearch\" class=\"active\">Module</label>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"input-field col s12\">\n        <select id=\"topic\" name=\"topic\">\n          <option value=\"\" disabled selected>Choose your option</option>\n          <option *ngFor=\"let topic of selectedModule?.topics\" [value]=\"topic\">{{topic}}</option>\n        </select>\n        <label>Topic</label>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"input-field col s12\">\n        <input placeholder=\"Add your question title here...\" id=\"title\" type=\"text\" required\n               [(ngModel)]=\"question.title\" name=\"title\">\n        <label for=\"title\" class=\"active\">Question</label>\n      </div>\n    </div>\n    <div class=\"input-field col s12\">\n      <ask-text-area (onEditorKeyup)=\"question.description = $event\"></ask-text-area>\n    </div>\n    <div class=\"row\">\n      <div class=\"input-field col s12\">\n        <div class=\"chips chips-placeholder\"></div>\n      </div>\n    </div>\n\n    <ask-input-error *ngIf=\"hasError\" [errorMessage]=\"'PLease select a module before submitting the answer'\"></ask-input-error>\n\n    <div class=\"row\">\n      <div class=\"input-field\">\n        <div class=\"col s6\">\n          <button data-target=\"confirmation\" class=\"btn waves-effect waves-light center grey darken-1\" type=\"button\" name=\"cancel\" style=\"width: 100%\">\n            Cancel\n          </button>\n        </div>\n        <div class=\"col s6\">\n          <button class=\"btn waves-effect waves-light center\" type=\"submit\" name=\"submit\" style=\"width: 100%\">\n            Submit\n          </button>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>\n"

/***/ }),

/***/ 776:
/***/ (function(module, exports) {

module.exports = "<div class=\"row container\" style=\"padding-top: 20px\">\n  <h5>Featured Modules</h5>\n</div>\n<div class=\"row container\" *ngIf=\"!modulesList\">\n  <h5>{{message}}</h5>\n</div>\n<ask-modulesummarylist *ngIf=\"modulesList\" [moduleList]=\"modulesList\"></ask-modulesummarylist>\n"

/***/ }),

/***/ 777:
/***/ (function(module, exports) {

module.exports = "<body>\n<header class=\"setSidebar\">\n  <ask-header></ask-header>\n</header>\n<main class=\"setSidebar\">\n  <ask-side-panel></ask-side-panel>\n  <router-outlet></router-outlet>\n</main>\n<footer class=\"setSidebar\">\n  <ask-footer>\n    <ask-aboutus></ask-aboutus>\n  </ask-footer>\n</footer>\n</body>\n"

/***/ }),

/***/ 778:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"selectedModule\" class=\"row container\" style=\"padding-top: 20px\">\n  <h5>{{selectedModule?.moduleCode}} - {{selectedModule?.moduleName}}</h5>\n</div>\n<div class=\"row container\" *ngIf=\"isLoading\" style=\"padding-top: 20px\">\n  <h6>{{message}}</h6>\n</div>\n<ask-question-list *ngIf=\"questionList\" [questionList]=\"questionList\"></ask-question-list>\n"

/***/ }),

/***/ 779:
/***/ (function(module, exports) {

module.exports = "<div class=\"row container\" style=\"padding-top: 20px\">\n  <h5>Modules</h5>\n</div>\n<div class=\"row container\" *ngIf=\"!modulesList\">\n  <h5>{{message}}</h5>\n</div>\n<ask-modulesummarylist *ngIf=\"modulesList\" [moduleList]=\"modulesList\" [subscribeEnabled]=\"true\">\n</ask-modulesummarylist>\n"

/***/ }),

/***/ 780:
/***/ (function(module, exports) {

module.exports = "<div class=\"row container\" style=\"padding-top: 20px\">\n  <h5>Question List</h5>\n</div>\n<div class=\"row container\" *ngIf=\"!questionList\">\n  <h6>{{message}}</h6>\n</div>\n<ask-question-list *ngIf=\"questionList\" [questionList]=\"questionList\"></ask-question-list>\n"

/***/ }),

/***/ 781:
/***/ (function(module, exports) {

module.exports = "<p>\n  view-module-report works!\n</p>\n"

/***/ }),

/***/ 782:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"selectedQuestion && answerList\" class=\"container\" style=\"padding-top: 50px; padding-bottom: 50px\">\n  <div class=\"row\">\n    <h5>{{selectedQuestion.title}}</h5>\n    <div class=\"divider\"></div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col s12\">\n      <div [innerHTML]=\"selectedQuestion.description\">\n      </div>\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"chip\" style=\"background-color: #1e88e5; border-radius: 0\">\n      <a style=\"color: white\">{{selectedQuestion.moduleCode}} - {{selectedQuestion.moduleName}}</a></div>\n    <div class=\"chip\" style=\"border-radius: 0\" *ngFor=\"let tag of selectedQuestion.tags\">{{tag}}</div>\n  </div>\n\n  <ask-answer-list [answerList]=\"answerList\"></ask-answer-list>\n\n  <div class=\"row\" style=\"padding-top: 20px\">\n    <div class=\"col s12\">\n      <ask-text-area (onEditorKeyup)=\"editingAnswer.answer = $event\"></ask-text-area>\n      <button class=\"btn waves-effect waves-light center right\" (click)=\"addAnswer()\">\n        Add Answer\n      </button>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 783:
/***/ (function(module, exports) {

module.exports = "<div class=\"row container\" style=\"padding-top: 20px\">\n  <h5>Report</h5>\n</div>\n<div class=\"row divider\"></div>\n<div class=\"container\">\n  <div class=\"row\">\n    <h6 class=\"center-align\">All questions submitted</h6><br>\n  </div>\n  <div class=\"row\">\n    <div class=\"col s6\">\n      <chart *ngIf=\"isQuestionDataLoaded\" [type]=\"allQuestionsChart.type\" [data]=\"allQuestionsChart.data\" [options]=\"allQuestionsChart.options\"></chart>\n    </div>\n    <div class=\"col s6\">\n      <p>This chart displays a report of answered and unanswered questions. Below chart categorized questions according to\n        module. Further you can view report on each module by selecting the relevant module.\n      </p>\n    </div>\n  </div>\n  <div class=\"row divider\"></div>\n  <div class=\"row\">\n    <h6 class=\"center-align\">Questions submitted categorized by module</h6><br>\n  </div>\n  <div class=\"row\">\n    <div class=\"col s12\">\n      <chart *ngIf=\"isModuleDataLoaded\" [type]=\"moduleChart.type\" [data]=\"moduleChart.data\" [options]=\"moduleChart.options\"></chart>\n    </div>\n  </div>\n  <div class=\"row\">\n    <table class=\"highlight\">\n      <thead>\n      <tr>\n        <th>Module Code</th>\n        <th>Module Name</th>\n        <th>Answers Submitted</th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr *ngFor=\"let module of moduleList\">\n        <td>{{module.moduleCode}}</td>\n        <td>{{module.moduleName}}</td>\n        <td>{{module.totalQuestions}}</td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n<div class=\"row divider\"></div>\n<router-outlet style=\"padding-bottom: 20px\"></router-outlet>\n"

/***/ }),

/***/ 784:
/***/ (function(module, exports) {

module.exports = "<body>\n<header>\n  <ask-loginheader></ask-loginheader>\n</header>\n<main>\n  <div class=\"container\">\n    <div class=\"row\" style=\"padding-top: 50px;\">\n      <form id=\"loginForm\" (ngSubmit)=\"login()\" class=\"col s6 offset-s3 z-depth-2\" style=\"padding: 30px 50px;\">\n        <div class=\"row\">\n          <div class=\"input-field col s12\">\n            <input\n              id=\"email\"\n              type=\"email\"\n              class=\"validate\"\n              [(ngModel)]=\"user.email\"\n              name=\"email\"\n              ngModel\n              required\n              pattern=\"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\"\n            >\n            <label for=\"email\">Email</label>\n          </div>\n\n          <div class=\"input-field col s12\">\n            <input\n              id=\"password\"\n              type=\"password\"\n              class=\"validate\"\n              [(ngModel)]=\"user.password\"\n              name=\"password\"\n              ngModel\n              required\n            >\n            <label for=\"password\">Password</label>\n          </div>\n        </div>\n        <div class=\"row\" style=\"padding-left: 10px; padding-right: 10px;\">\n          <button class=\"btn waves-effect waves-light center\" type=\"submit\" name=\"action\" style=\"width: 100%\">Login\n          </button>\n          <br><br>\n          <a href=\"#!\" class=\"left\"><u>Forgot password</u></a>\n          <a [routerLink]=\"['/sign-up']\" class=\"right\" href=\"javascript:void(0);\"><u>Sign Up</u></a>\n        </div>\n      </form>\n    </div>\n  </div>\n</main>\n<footer>\n  <ask-footer></ask-footer>\n</footer>\n</body>\n"

/***/ }),

/***/ 785:
/***/ (function(module, exports) {

module.exports = "<body>\n<header>\n  <ask-loginheader></ask-loginheader>\n</header>\n<main>\n  <div class=\"container\" style=\"padding-bottom: 50px\">\n    <div class=\"row\" style=\"padding-top: 50px;\">\n      <form id=\"signUpForm\" (ngSubmit)=\"register()\" class=\"col s6 offset-s3 z-depth-2\" style=\"padding: 30px 50px;\"\n            #f=\"ngForm\">\n        <div class=\"row\">\n          <div class=\"input-field col s12\">\n            <input id=\"email\"\n                   type=\"email\"\n                   class=\"validate\"\n                   [(ngModel)]=\"user.email\"\n                   name=\"email\"\n                   mgModel\n                   required\n                   pattern=\"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\"\n            >\n            <label for=\"email\">Email</label>\n          </div>\n\n          <div class=\"input-field col s12\">\n            <input id=\"username\"\n                   type=\"text\"\n                   class=\"validate\"\n                   [(ngModel)]=\"user.username\"\n                   name=\"username\"\n                   data-length=\"20\"\n                   ngModel\n                   required\n            >\n            <label for=\"username\">Username</label>\n          </div>\n\n          <div class=\"input-field col s12\">\n            <input id=\"password\"\n                   type=\"password\"\n                   class=\"validate\"\n                   [(ngModel)]=\"user.password\"\n                   name=\"password\"\n                   ngModel\n                   required\n            >\n            <label for=\"password\">Password</label>\n          </div>\n\n          <div class=\"input-field col s12\">\n            <input id=\"confirmPassword\"\n                   type=\"password\"\n                   class=\"validate\"\n                   name=\"confirmPassword\"\n                   required\n            >\n            <label for=\"confirmPassword\">Confirm Password</label>\n          </div>\n        </div>\n        <div class=\"row\" style=\"padding-left: 10px; padding-right: 10px; padding-bottom: 10px\">\n          <button [routerLink]=\"['/']\" class=\"btn waves-effect waves-light center grey darken-1\" type=\"button\"\n                  name=\"cancel\" style=\"width: 100%\">Cancel\n          </button>\n        </div>\n        <div class=\"row\" style=\"padding-left: 10px; padding-right: 10px;\">\n          <button class=\"btn waves-effect waves-light center\" type=\"submit\" name=\"action\" style=\"width: 100%\">Submit\n          </button>\n        </div>\n      </form>\n    </div>\n  </div>\n</main>\n<footer>\n  <ask-footer></ask-footer>\n</footer>\n</body>\n"

/***/ }),

/***/ 786:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col l12 s12\">\n      <h5 class=\"white-text\">About us</h5>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 787:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col s12\">\n    <h5>{{answerList.length}} Answers</h5>\n    <div class=\"divider\"></div>\n  </div>\n</div>\n<ask-answer-summary *ngFor=\"let answer of answerList\" [answer]=\"answer\"></ask-answer-summary>\n"

/***/ }),

/***/ 788:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col s12\">\n    <div [innerHTML]=\"answer.answer\"></div>\n    <span class=\"right\" style=\"color: gray\">- {{answer.submittedBy}}</span><br>\n  </div>\n</div>\n<div class=\"row divider\"></div>\n"

/***/ }),

/***/ 789:
/***/ (function(module, exports) {

module.exports = "<div style=\"background-color: #424242; color: white;\">\n  <ng-content></ng-content>\n  <div class=\"footer-copyright\">\n    <div class=\"container\">\n      © 2017 Alternate Solutions<br> This work is licensed under a\n      <a rel=\"license\" href=\"http://creativecommons.org/licenses/by-sa/3.0/\">\n        Creative Commons Attribution-ShareAlike 3.0 Unported License\n      </a>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 790:
/***/ (function(module, exports) {

module.exports = "<!-- Dropdown Structure -->\n<ul id=\"dropdown1\" class=\"dropdown-content\">\n  <li><a href=\"\">{{username}}</a></li>\n  <li><a href=\"\">Change Password</a></li>\n  <li class=\"divider\"></li>\n  <li><a (click)=\"logout()\">Logout</a></li>\n</ul>\n<nav>\n  <div class=\"nav-wrapper\">\n    <div class=\"row\">\n      <div class=\"col s8 offset-s1\">\n        <form class=\"navbar-form\" (ngSubmit)=\"search()\">\n          <div class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Search Questions\" name=\"srch-term\" id=\"srch-term\"\n                   [(ngModel)]=\"keyword\">\n          </div>\n        </form>\n      </div>\n      <div class=\"col s3\">\n        <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n          <li>\n            <a id=\"accountDropdown\" class=\"dropdown-button truncate\" data-activates=\"dropdown1\" href=\"javascript:void(0);\"><i\n              class=\"material-icons left\">perm_identity</i>\n              {{username}}\n              <i class=\"material-icons right\">arrow_drop_down</i></a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</nav>\n"

/***/ }),

/***/ 791:
/***/ (function(module, exports) {

module.exports = "<nav>\n  <div class=\"nav-wrapper\">\n    <a class=\"brand-logo center\" style=\"font-size: 40px\">asking</a>\n  </div>\n</nav>\n"

/***/ }),

/***/ 792:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col s12\">\n    <div class=\"card-panel white\">\n          <span class=\"red-text\">\n            * {{errorMessage}}\n          </span>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 793:
/***/ (function(module, exports) {

module.exports = "<div class=\"row container\">\n  <ask-module-summary *ngFor=\"let module of moduleList\" [module]=\"module\" [subscribeEnabled]=\"subscribeEnabled\">\n  </ask-module-summary>\n</div>\n"

/***/ }),

/***/ 794:
/***/ (function(module, exports) {

module.exports = "<div class=\"row valign-wrapper z-depth-1\" style=\"background-color: #1e88e5; height: 100px;\">\n  <div class=\"col s9\">\n    <a class=\"left-align\" [routerLink]=\"['/module/' + module.moduleCode]\" style=\"color: white; font-size: 20px; padding-left: 20px\">{{module.moduleCode}} - {{module.moduleName}}</a>\n  </div>\n  <div class=\"col s3\">\n    <button *ngIf=\"subscribeEnabled\" (click)=\"subscribe()\" class=\"btn waves-effect waves-light center grey darken-2 z-depth-0\">Subscribe</button>\n    <div *ngIf=\"!subscribeEnabled\" class=\"right-align\" style=\"padding-right: 20px;\">\n      <span class=\"new badge grey darken-2\" data-badge-caption=\"questions\">{{module.totalQuestions}}</span>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 795:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"padding-top: 20px\">\n  <ask-question-summary *ngFor=\"let question of questionList\" [question]=\"question\"></ask-question-summary>\n</div>\n"

/***/ }),

/***/ 796:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" style=\"border: 1px solid #bbdefb\">\n  <div class=\"col s1\">\n    <h5 class=\"center-align\">{{question.totalRatings}}</h5>\n    <div class=\"divider\"></div>\n    <h6 class=\"center-align\">Rate</h6>\n  </div>\n  <div class=\"col s1\">\n    <h5 class=\"center-align\">{{question.totalAnswers}}</h5>\n    <div class=\"divider\"></div>\n    <h6 class=\"center-align\">Ans</h6>\n  </div>\n  <div class=\"col s10 valign-wrapper\">\n    <div style=\"padding: 10px\">\n      <a [routerLink]=\"['/question/' + question._id]\" style=\"font-size: 20px; color: #1976d2;\">{{question.title}}</a>\n      <br><br>\n      <div class=\"chip\" style=\"background-color: #1e88e5; border-radius: 0\"><a href=\"#\" style=\"color: white\">{{question.moduleCode}} - {{question.moduleName}}</a></div>\n      <div class=\"chip\" style=\"border-radius: 0\" *ngFor=\"let tag of question.tags\">{{tag}}</div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 797:
/***/ (function(module, exports) {

module.exports = "<ul id=\"slide-out\" class=\"side-nav fixed\">\n  <li>\n    <div class=\"valign-wrapper z-depth-1\" style=\"background-color: #424242; height: 100px\">\n      <img style=\"height: 70px\" src=\"../../../assets/images/company_logo.png\" alt=\"Company Logo\">\n      <h1 style=\"font-size: 40px; color: white; padding-left: 40px;\">asking</h1>\n    </div>\n  </li>\n  <li><a [routerLink]=\"['/featured']\" routerLinkActive=\"active\">Home</a></li>\n  <li><a [routerLink]=\"['/add-question']\" routerLinkActive=\"active\">Add Question</a></li>\n  <li><a [routerLink]=\"['/search-module']\" routerLinkActive=\"active\">Search Module</a></li>\n  <li>\n    <div class=\"divider\"></div>\n  </li>\n  <li><a class=\"subheader\">Enrolled Modules</a></li>\n  <div class=\"scroll-box\">\n    <li *ngFor=\"let module of enrolledModules\"><a [routerLink]=\"['/module/' + module.moduleCode]\" class=\"truncate\">{{module.moduleName}}</a></li>\n  </div>\n</ul>\n"

/***/ }),

/***/ 798:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <textarea id=\"questionDetail\" style=\"padding-right: 10px; padding-left: 10px\"></textarea>\n</div>\n"

/***/ })

},[1081]);
//# sourceMappingURL=main.bundle.js.map