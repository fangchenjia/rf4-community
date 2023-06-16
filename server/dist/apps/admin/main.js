/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/admin/src/admin.controller.ts":
/*!********************************************!*\
  !*** ./apps/admin/src/admin.controller.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const admin_service_1 = __webpack_require__(/*! ./admin.service */ "./apps/admin/src/admin.service.ts");
let AdminController = exports.AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    getHello() {
        return this.adminService.getHello();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AdminController.prototype, "getHello", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _a : Object])
], AdminController);


/***/ }),

/***/ "./apps/admin/src/admin.module.ts":
/*!****************************************!*\
  !*** ./apps/admin/src/admin.module.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const admin_controller_1 = __webpack_require__(/*! ./admin.controller */ "./apps/admin/src/admin.controller.ts");
const admin_service_1 = __webpack_require__(/*! ./admin.service */ "./apps/admin/src/admin.service.ts");
const common_2 = __webpack_require__(/*! common/common */ "./libs/common/src/index.ts");
const users_module_1 = __webpack_require__(/*! ./users/users.module */ "./apps/admin/src/users/users.module.ts");
const auth_1 = __webpack_require__(/*! auth/auth */ "./libs/auth/src/index.ts");
let AdminModule = exports.AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [common_2.CommonModule, users_module_1.UsersModule, auth_1.AuthModule.forRoot('admin')],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService],
    })
], AdminModule);


/***/ }),

/***/ "./apps/admin/src/admin.service.ts":
/*!*****************************************!*\
  !*** ./apps/admin/src/admin.service.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AdminService = exports.AdminService = class AdminService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)()
], AdminService);


/***/ }),

/***/ "./apps/admin/src/users/users.controller.ts":
/*!**************************************************!*\
  !*** ./apps/admin/src/users/users.controller.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const nestjs_mongoose_crud_1 = __webpack_require__(/*! nestjs-mongoose-crud */ "nestjs-mongoose-crud");
const user_model_1 = __webpack_require__(/*! libs/db/models/user.model */ "./libs/db/src/models/user.model.ts");
const nestjs_typegoose_1 = __webpack_require__(/*! nestjs-typegoose */ "nestjs-typegoose");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
let UsersController = exports.UsersController = class UsersController {
    constructor(model) {
        this.model = model;
    }
};
exports.UsersController = UsersController = __decorate([
    (0, nestjs_mongoose_crud_1.Crud)({
        model: user_model_1.User,
    }),
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('用户'),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersController);


/***/ }),

/***/ "./apps/admin/src/users/users.module.ts":
/*!**********************************************!*\
  !*** ./apps/admin/src/users/users.module.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_controller_1 = __webpack_require__(/*! ./users.controller */ "./apps/admin/src/users/users.controller.ts");
let UsersModule = exports.UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController]
    })
], UsersModule);


/***/ }),

/***/ "./libs/auth/src/admin-auth.controller.ts":
/*!************************************************!*\
  !*** ./libs/auth/src/admin-auth.controller.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminAuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const cache_manager_2 = __webpack_require__(/*! cache-manager */ "cache-manager");
const auth_dto_1 = __webpack_require__(/*! ./auth.dto */ "./libs/auth/src/auth.dto.ts");
const nestjs_typegoose_1 = __webpack_require__(/*! nestjs-typegoose */ "nestjs-typegoose");
const user_model_1 = __webpack_require__(/*! libs/db/models/user.model */ "./libs/db/src/models/user.model.ts");
const typegoose_1 = __webpack_require__(/*! @typegoose/typegoose */ "@typegoose/typegoose");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const common_2 = __webpack_require__(/*! common/common */ "./libs/common/src/index.ts");
let AdminAuthController = exports.AdminAuthController = class AdminAuthController {
    constructor(cacheManager, jwtServer, userModel) {
        this.cacheManager = cacheManager;
        this.jwtServer = jwtServer;
        this.userModel = userModel;
    }
    async login(loginDto, req) {
        const accessToken = this.jwtServer.sign({ id: String(req.user._id) }, {
            expiresIn: Number(process.env.ACCESS_TOKEN_VALIDITY_SEC),
        });
        const accessTokenRedisKey = `accessToken:${req.user._id}`;
        this.cacheManager.set(accessTokenRedisKey, accessToken, {
            ttl: Number(process.env.ACCESS_TOKEN_VALIDITY_SEC),
        });
        const refreshToken = this.jwtServer.sign({ id: String(req.user._id) }, {
            expiresIn: Number(process.env.REFRESH_TOKEN_VALIDITY_SEC),
        });
        const refreshTokenRedisKey = `refreshToken:${req.user._id}`;
        this.cacheManager.set(refreshTokenRedisKey, refreshToken, {
            ttl: Number(process.env.REFRESH_TOKEN_VALIDITY_SEC),
        });
        return {
            accessToken,
            refreshToken,
        };
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: '管理员登录' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local-login'), common_2.CaptchaGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof auth_dto_1.loginDto !== "undefined" && auth_dto_1.loginDto) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "login", null);
exports.AdminAuthController = AdminAuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('用户授权'),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(2, (0, nestjs_typegoose_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof cache_manager_2.Cache !== "undefined" && cache_manager_2.Cache) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof typegoose_1.ReturnModelType !== "undefined" && typegoose_1.ReturnModelType) === "function" ? _c : Object])
], AdminAuthController);


/***/ }),

/***/ "./libs/auth/src/auth.dto.ts":
/*!***********************************!*\
  !*** ./libs/auth/src/auth.dto.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loginDto = exports.registerDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class registerDto {
}
exports.registerDto = registerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码', example: '1234' }),
    __metadata("design:type", String)
], registerDto.prototype, "captcha", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名', example: '2362414624' }),
    __metadata("design:type", String)
], registerDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '密码', example: '123456' }),
    __metadata("design:type", String)
], registerDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '昵称', example: '大帅比' }),
    __metadata("design:type", String)
], registerDto.prototype, "nickname", void 0);
class loginDto {
}
exports.loginDto = loginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '验证码', example: '1234' }),
    __metadata("design:type", String)
], loginDto.prototype, "captcha", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '用户名', example: '2362414624' }),
    __metadata("design:type", String)
], loginDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '密码', example: '123456' }),
    __metadata("design:type", String)
], loginDto.prototype, "password", void 0);


/***/ }),

/***/ "./libs/auth/src/auth.module.ts":
/*!**************************************!*\
  !*** ./libs/auth/src/auth.module.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const admin_auth_controller_1 = __webpack_require__(/*! ./admin-auth.controller */ "./libs/auth/src/admin-auth.controller.ts");
const common_auth_controller_1 = __webpack_require__(/*! ./common-auth.controller */ "./libs/auth/src/common-auth.controller.ts");
const server_auth_controller_1 = __webpack_require__(/*! ./server-auth.controller */ "./libs/auth/src/server-auth.controller.ts");
const local_strategy_1 = __webpack_require__(/*! ./local.strategy */ "./libs/auth/src/local.strategy.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const jwt_strategy_1 = __webpack_require__(/*! ./jwt.strategy */ "./libs/auth/src/jwt.strategy.ts");
const connect_redis_1 = __webpack_require__(/*! connect-redis */ "connect-redis");
const session = __webpack_require__(/*! express-session */ "express-session");
const redis_1 = __webpack_require__(/*! redis */ "redis");
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD,
    database: Number(process.env.REDIS_DB),
});
redisClient.connect().catch(console.error);
const redisStore = new connect_redis_1.default({
    client: redisClient,
    ttl: Number(process.env.SESSION_MAX_AGE),
});
let AuthModule = exports.AuthModule = AuthModule_1 = class AuthModule {
    configure(consumer) {
        consumer
            .apply(session({
            store: redisStore,
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: { maxAge: Number(process.env.SESSION_MAX_AGE) * 1000 },
        }))
            .forRoutes('*');
    }
    static forRoot(AuthType) {
        const controllers = [];
        controllers.push(common_auth_controller_1.CommonAuthController);
        if (AuthType === 'admin') {
            controllers.push(admin_auth_controller_1.AdminAuthController);
        }
        if (AuthType === 'server') {
            controllers.push(server_auth_controller_1.ServerAuthController);
        }
        return {
            module: AuthModule_1,
            imports: [passport_1.PassportModule],
            controllers,
            providers: [local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        };
    }
};
exports.AuthModule = AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], AuthModule);


/***/ }),

/***/ "./libs/auth/src/auth.service.ts":
/*!***************************************!*\
  !*** ./libs/auth/src/auth.service.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AuthService = exports.AuthService = class AuthService {
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);


/***/ }),

/***/ "./libs/auth/src/common-auth.controller.ts":
/*!*************************************************!*\
  !*** ./libs/auth/src/common-auth.controller.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonAuthController = void 0;
const common_service_1 = __webpack_require__(/*! ./../../common/src/common.service */ "./libs/common/src/common.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const cache_manager_2 = __webpack_require__(/*! cache-manager */ "cache-manager");
const nestjs_typegoose_1 = __webpack_require__(/*! nestjs-typegoose */ "nestjs-typegoose");
const user_model_1 = __webpack_require__(/*! libs/db/models/user.model */ "./libs/db/src/models/user.model.ts");
const typegoose_1 = __webpack_require__(/*! @typegoose/typegoose */ "@typegoose/typegoose");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const req_user_decorator_1 = __webpack_require__(/*! ./req-user.decorator */ "./libs/auth/src/req-user.decorator.ts");
let CommonAuthController = exports.CommonAuthController = class CommonAuthController {
    constructor(cacheManager, jwtServer, userModel, commonService) {
        this.cacheManager = cacheManager;
        this.jwtServer = jwtServer;
        this.userModel = userModel;
        this.commonService = commonService;
    }
    async userInfo(user) {
        return user;
    }
    async captcha(session, res) {
        const svgCaptcha = await this.commonService.captche();
        session.captcha = svgCaptcha.text;
        console.log(session.captcha);
        res.type('image/svg+xml');
        res.send(svgCaptcha.data);
    }
};
__decorate([
    (0, common_1.Get)('info'),
    (0, swagger_1.ApiOperation)({ summary: '获取用户信息' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt-login')),
    __param(0, (0, req_user_decorator_1.ReqUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof user_model_1.UserDocument !== "undefined" && user_model_1.UserDocument) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], CommonAuthController.prototype, "userInfo", null);
__decorate([
    (0, common_1.Get)('captcha'),
    (0, swagger_1.ApiOperation)({ summary: '获取图形验证码' }),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommonAuthController.prototype, "captcha", null);
exports.CommonAuthController = CommonAuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('用户授权'),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(2, (0, nestjs_typegoose_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof cache_manager_2.Cache !== "undefined" && cache_manager_2.Cache) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof typegoose_1.ReturnModelType !== "undefined" && typegoose_1.ReturnModelType) === "function" ? _c : Object, typeof (_d = typeof common_service_1.CommonService !== "undefined" && common_service_1.CommonService) === "function" ? _d : Object])
], CommonAuthController);


/***/ }),

/***/ "./libs/auth/src/index.ts":
/*!********************************!*\
  !*** ./libs/auth/src/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./auth.module */ "./libs/auth/src/auth.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./auth.service */ "./libs/auth/src/auth.service.ts"), exports);


/***/ }),

/***/ "./libs/auth/src/jwt.strategy.ts":
/*!***************************************!*\
  !*** ./libs/auth/src/jwt.strategy.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const cache_manager_2 = __webpack_require__(/*! cache-manager */ "cache-manager");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const nestjs_typegoose_1 = __webpack_require__(/*! nestjs-typegoose */ "nestjs-typegoose");
const user_model_1 = __webpack_require__(/*! libs/db/models/user.model */ "./libs/db/src/models/user.model.ts");
let JwtStrategy = exports.JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-login') {
    constructor(cacheManager, userModel) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            passReqToCallback: true,
        });
        this.cacheManager = cacheManager;
        this.userModel = userModel;
    }
    async validate(req, payload) {
        const token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        const redisToken = await this.cacheManager.get(`accessToken:${payload.id}`);
        if (!redisToken || redisToken !== token) {
            throw new common_1.UnauthorizedException('登录已过期');
        }
        return await this.userModel.findById(payload.id);
    }
};
exports.JwtStrategy = JwtStrategy = __decorate([
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(1, (0, nestjs_typegoose_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof cache_manager_2.Cache !== "undefined" && cache_manager_2.Cache) === "function" ? _a : Object, Object])
], JwtStrategy);


/***/ }),

/***/ "./libs/auth/src/local.strategy.ts":
/*!*****************************************!*\
  !*** ./libs/auth/src/local.strategy.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const passport_local_1 = __webpack_require__(/*! passport-local */ "passport-local");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const nestjs_typegoose_1 = __webpack_require__(/*! nestjs-typegoose */ "nestjs-typegoose");
const user_model_1 = __webpack_require__(/*! libs/db/models/user.model */ "./libs/db/src/models/user.model.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const bcryptjs_1 = __webpack_require__(/*! bcryptjs */ "bcryptjs");
let LocalStrategy = exports.LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy, 'local-login') {
    constructor(userModel) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
        this.userModel = userModel;
    }
    async validate(username, password) {
        const user = await this.userModel.findOne({ username }).select('+password');
        if (!user) {
            throw new common_1.BadRequestException('用户名不存在');
        }
        if (!(0, bcryptjs_1.compareSync)(password, user.password)) {
            throw new common_1.BadRequestException('密码错误');
        }
        return user;
    }
};
exports.LocalStrategy = LocalStrategy = __decorate([
    __param(0, (0, nestjs_typegoose_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], LocalStrategy);


/***/ }),

/***/ "./libs/auth/src/req-user.decorator.ts":
/*!*********************************************!*\
  !*** ./libs/auth/src/req-user.decorator.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReqUser = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.ReqUser = (0, common_1.createParamDecorator)((data, ctx) => {
    return ctx.switchToHttp().getRequest().user;
});


/***/ }),

/***/ "./libs/auth/src/server-auth.controller.ts":
/*!*************************************************!*\
  !*** ./libs/auth/src/server-auth.controller.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServerAuthController = void 0;
const common_service_1 = __webpack_require__(/*! ./../../common/src/common.service */ "./libs/common/src/common.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const cache_manager_2 = __webpack_require__(/*! cache-manager */ "cache-manager");
const auth_dto_1 = __webpack_require__(/*! ./auth.dto */ "./libs/auth/src/auth.dto.ts");
const nestjs_typegoose_1 = __webpack_require__(/*! nestjs-typegoose */ "nestjs-typegoose");
const user_model_1 = __webpack_require__(/*! libs/db/models/user.model */ "./libs/db/src/models/user.model.ts");
const typegoose_1 = __webpack_require__(/*! @typegoose/typegoose */ "@typegoose/typegoose");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
let ServerAuthController = exports.ServerAuthController = class ServerAuthController {
    constructor(cacheManager, jwtServer, userModel, CommonService) {
        this.cacheManager = cacheManager;
        this.jwtServer = jwtServer;
        this.userModel = userModel;
        this.CommonService = CommonService;
    }
    async register(registerDto) {
        const { username } = registerDto;
        if (await this.userModel.findOne({ username })) {
            return {
                code: 1,
                message: '用户已存在',
            };
        }
        else {
            const user = await this.userModel.create(registerDto);
            return {
                code: 0,
                user,
                message: '注册成功',
            };
        }
        return registerDto;
    }
    async login(loginDto, req, session) {
        session.test = 'test';
        const accessToken = this.jwtServer.sign({ id: String(req.user._id) }, {
            expiresIn: Number(process.env.ACCESS_TOKEN_VALIDITY_SEC),
        });
        const accessTokenRedisKey = `accessToken:${req.user._id}`;
        this.cacheManager.set(accessTokenRedisKey, accessToken, {
            ttl: Number(process.env.ACCESS_TOKEN_VALIDITY_SEC),
        });
        const refreshToken = this.jwtServer.sign({ id: String(req.user._id) }, {
            expiresIn: Number(process.env.REFRESH_TOKEN_VALIDITY_SEC),
        });
        const refreshTokenRedisKey = `refreshToken:${req.user._id}`;
        this.cacheManager.set(refreshTokenRedisKey, refreshToken, {
            ttl: Number(process.env.REFRESH_TOKEN_VALIDITY_SEC),
        });
        return {
            accessToken,
            refreshToken,
        };
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: '用户注册' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof auth_dto_1.registerDto !== "undefined" && auth_dto_1.registerDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], ServerAuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: '用户登录' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local-login')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof auth_dto_1.loginDto !== "undefined" && auth_dto_1.loginDto) === "function" ? _f : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ServerAuthController.prototype, "login", null);
exports.ServerAuthController = ServerAuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('用户授权'),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(2, (0, nestjs_typegoose_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof cache_manager_2.Cache !== "undefined" && cache_manager_2.Cache) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof typegoose_1.ReturnModelType !== "undefined" && typegoose_1.ReturnModelType) === "function" ? _c : Object, typeof (_d = typeof common_service_1.CommonService !== "undefined" && common_service_1.CommonService) === "function" ? _d : Object])
], ServerAuthController);


/***/ }),

/***/ "./libs/common/src/common.module.ts":
/*!******************************************!*\
  !*** ./libs/common/src/common.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_service_1 = __webpack_require__(/*! ./common.service */ "./libs/common/src/common.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const db_1 = __webpack_require__(/*! libs/db */ "./libs/db/src/index.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const cache_manager_redis_store_1 = __webpack_require__(/*! cache-manager-redis-store */ "cache-manager-redis-store");
let CommonModule = exports.CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
            }),
            db_1.DbModule,
            cache_manager_1.CacheModule.registerAsync({
                useFactory: () => ({
                    isGlobal: true,
                    store: cache_manager_redis_store_1.redisStore,
                    host: process.env.REDIS_HOST,
                    port: process.env.REDIS_PORT,
                    db: process.env.REDIS_DB,
                    auth_pass: process.env.REDIS_PASSPORT,
                }),
            }),
            jwt_1.JwtModule.registerAsync({
                useFactory() {
                    return {
                        secret: process.env.JWT_SECRET,
                    };
                },
            }),
        ],
        providers: [common_service_1.CommonService],
        exports: [common_service_1.CommonService, jwt_1.JwtModule, cache_manager_1.CacheModule],
    })
], CommonModule);


/***/ }),

/***/ "./libs/common/src/common.service.ts":
/*!*******************************************!*\
  !*** ./libs/common/src/common.service.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const svgCaptcha = __webpack_require__(/*! svg-captcha */ "svg-captcha");
let CommonService = exports.CommonService = class CommonService {
    async captche(size = 4) {
        const captcha = svgCaptcha.create({
            size,
            fontSize: 50,
            width: 100,
            height: 34,
            background: '#cc9966',
        });
        return captcha;
    }
};
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)()
], CommonService);


/***/ }),

/***/ "./libs/common/src/guards/captcha.guard.ts":
/*!*************************************************!*\
  !*** ./libs/common/src/guards/captcha.guard.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CaptchaGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let CaptchaGuard = exports.CaptchaGuard = class CaptchaGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const captcha = request.body.captcha;
        const sessionCaptch = request.session.captcha;
        request.session.captcha = null;
        if (!captcha) {
            throw new common_1.BadRequestException('验证码不能为空');
        }
        if (captcha.toLowerCase() !== (sessionCaptch === null || sessionCaptch === void 0 ? void 0 : sessionCaptch.toLowerCase())) {
            throw new common_1.BadRequestException('验证码错误');
        }
        return true;
    }
};
exports.CaptchaGuard = CaptchaGuard = __decorate([
    (0, common_1.Injectable)()
], CaptchaGuard);


/***/ }),

/***/ "./libs/common/src/index.ts":
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./common.module */ "./libs/common/src/common.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./common.service */ "./libs/common/src/common.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./guards/captcha.guard */ "./libs/common/src/guards/captcha.guard.ts"), exports);


/***/ }),

/***/ "./libs/db/src/db.module.ts":
/*!**********************************!*\
  !*** ./libs/db/src/db.module.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const db_service_1 = __webpack_require__(/*! ./db.service */ "./libs/db/src/db.service.ts");
const nestjs_typegoose_1 = __webpack_require__(/*! nestjs-typegoose */ "nestjs-typegoose");
const user_model_1 = __webpack_require__(/*! ./models/user.model */ "./libs/db/src/models/user.model.ts");
const models = nestjs_typegoose_1.TypegooseModule.forFeature([user_model_1.User]);
let DbModule = exports.DbModule = class DbModule {
};
exports.DbModule = DbModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            nestjs_typegoose_1.TypegooseModule.forRootAsync({
                useFactory() {
                    const ENV = process.env;
                    const DB_URL = `mongodb://${ENV.DB_USER}:${ENV.DB_USER_PWD}@${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_NAME}`;
                    return {
                        uri: DB_URL,
                    };
                },
            }),
            models,
        ],
        providers: [db_service_1.DbService],
        exports: [db_service_1.DbService, models],
    })
], DbModule);


/***/ }),

/***/ "./libs/db/src/db.service.ts":
/*!***********************************!*\
  !*** ./libs/db/src/db.service.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let DbService = exports.DbService = class DbService {
};
exports.DbService = DbService = __decorate([
    (0, common_1.Injectable)()
], DbService);


/***/ }),

/***/ "./libs/db/src/index.ts":
/*!******************************!*\
  !*** ./libs/db/src/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./db.module */ "./libs/db/src/db.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./db.service */ "./libs/db/src/db.service.ts"), exports);


/***/ }),

/***/ "./libs/db/src/models/user.model.ts":
/*!******************************************!*\
  !*** ./libs/db/src/models/user.model.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typegoose_1 = __webpack_require__(/*! @typegoose/typegoose */ "@typegoose/typegoose");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const bcryptjs_1 = __webpack_require__(/*! bcryptjs */ "bcryptjs");
let User = exports.User = class User {
};
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '用户名', example: 'user1' }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typegoose_1.prop)({
        select: false,
        get: (val) => val,
        set: (val) => (val ? (0, bcryptjs_1.hashSync)(val) : val),
    }),
    (0, swagger_1.ApiProperty)({ description: '密码', example: 'pass1' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '昵称', example: 'nick1' }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, swagger_1.ApiProperty)({ description: '角色', example: 'role1' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
exports.User = User = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
        },
    })
], User);


/***/ }),

/***/ "@nestjs/cache-manager":
/*!****************************************!*\
  !*** external "@nestjs/cache-manager" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/cache-manager");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@typegoose/typegoose":
/*!***************************************!*\
  !*** external "@typegoose/typegoose" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@typegoose/typegoose");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "cache-manager":
/*!********************************!*\
  !*** external "cache-manager" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cache-manager");

/***/ }),

/***/ "cache-manager-redis-store":
/*!********************************************!*\
  !*** external "cache-manager-redis-store" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("cache-manager-redis-store");

/***/ }),

/***/ "connect-redis":
/*!********************************!*\
  !*** external "connect-redis" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("connect-redis");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-session");

/***/ }),

/***/ "nestjs-mongoose-crud":
/*!***************************************!*\
  !*** external "nestjs-mongoose-crud" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("nestjs-mongoose-crud");

/***/ }),

/***/ "nestjs-typegoose":
/*!***********************************!*\
  !*** external "nestjs-typegoose" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("nestjs-typegoose");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/***/ ((module) => {

module.exports = require("redis");

/***/ }),

/***/ "svg-captcha":
/*!******************************!*\
  !*** external "svg-captcha" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("svg-captcha");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************************!*\
  !*** ./apps/admin/src/main.ts ***!
  \********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const admin_module_1 = __webpack_require__(/*! ./admin.module */ "./apps/admin/src/admin.module.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(admin_module_1.AdminModule);
    app.setGlobalPrefix('v1');
    const options = new swagger_1.DocumentBuilder()
        .setTitle('俄钓4社区admin API')
        .setDescription('俄钓4社区后台管理界面的API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(process.env.ADMIN_PORT || 3000);
    console.log(`admin server run: http://localhost:${process.env.ADMIN_PORT}`);
}
bootstrap();

})();

/******/ })()
;