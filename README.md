# NestJS

> NestJS 是一个用于构建高效可扩展的一个基于 Nodejs 服务端的应用程序开发框架
>
> 其完全支持 TypeScript 结合了 AOP 面向切面的编程方式
>
> 底层使用了 express 和 Fastify 在他们的基础上提供了一定程度的抽象，同时也将其 API 直接暴露给开发人员
>
> [Nest.js 中文文档]([Nest.js 中文文档 (c)](https://docs.nestjs.cn/))  

> nestjs 内置默认使用 exporess
>
> [Express 中文网](https://www.expressjs.com.cn/)



## 前置知识

### IOC 和 DI

> IOC 是 Inversion of Control 的简写，字面意思是 “控制反转”
>
> 具体定义是高层模块不应该依赖底层模块，二者都应该依赖其抽象；抽象不应该依赖细节；细节应该依赖抽象

> DI 是 Dependency Injection 的简写 —— “依赖注入”
>
> 其实和 IOC 是同根生，这两个原本就是一个东西，只不过由于控制反转概念比较含糊（可能只是理解为容器控制对象这一个层面，很难让人想到谁来维护对象关系），所以2004年大师级人物Martin Fowler又给出了一个新的名字：“依赖注入”。 类A依赖类B的常规表现是在A中使用B的instance。
>
> 具体看代码



**这是未使用控制反转和依赖注入之前的代码**

```typescript
class A {
  name: string
  constructor(name: string) {
   	this.name = name;
  }
}

class B {
  age: number
  entity： A
  constructor(age: number) {
    this.age = age;
    this.entity = new A('黄子豪')
  }
}

const c = new B(21);

c.entity.name
```

- 我们可以看到，B 中代码实现是需要依赖 A 的，两者的代码耦合度非常高。
- 当两者之间的业务逻辑复杂程度增加的情况下，维护成本与代码可读性都会随着增加，并且很难再多映入额外多模块进行功能拓展。



**所以有了一下的写法（IOC容器）**

```typescript
class A {
  name: string
  constructor(name: string) {
   	this.name = name;
  }
}

class C {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

// 中间件用于解耦
class Container {
  modeuls: any
  constructor() {
    this.modeuls = {}
  }
  provide(key: string, modeuls: any) {
    this.modeuls[key] = modeuls
  }
  get(key) {
    return this.modeuls[key]
  }
}

const mo = new Container()
mo.provide('a', new A('黄子豪1'))
mo.provide('c', new C('黄子豪2'))

class B {
  a: any
  c: any
  constructor(container: Container) {
    this.a = container.get('a')
    this.c = container.get('c')
  }
}

new B(mo)
```

- 其实就是写了一个中间件，来收集依赖，主要是为了解耦，减少维护成本。



### 装饰器

**1、什么是装饰器？**

> 装饰器是一种特殊的类型声明，他可以附加在勒、方法、属性、参数上面
>
> ps：装饰器写法需要开启一项配置 tsconfig => compilerOptions => experimentalDecorators: true

**2、类装饰器**

> 他会自动吧 class 的构造函数传入到装饰器的第一个参数 target，然后通过 prototype 可以自定义添加属性和方法

```typescript
function decotators(target: any) {
  target.prototype.name = '黄子豪'
}

@decotators
class Hzh {
  constructor() {}
}

const hzh: any = new Hzh()
console.log(hzh.name) // 打印 '黄子豪'
```

**3、属性装饰器**

> 同样是 @ 符号给属性添加装饰器
>
> 他会返回两个参数：
>
> 1. 原型对象
> 2. 属性的名称

```typescript
const currency: PropertyDecorator = (target: any, key: string | symbol) => {
  console.log(target, key) // {} name
}

class Hzh {
  @currency
  public name: string
  constructor() {
    this.name = ''
  }
  getName() {
    return this.name
  } 
}
```

**4、参数装饰器**

> 同样是 @ 符号给属性添加装饰器
>
> 他会返回三个参数：
>
> 1. 原型对象
> 2. 方法的名称
> 3. 参数的位置从 0。开始

```typescript
const currency: ParameterDecorator = (target: any, key: string | symbol, index: number) => {
  console.log(target, key, index); // {} getName 1
}

class Hzh {
  public name: string
  construtor() {
    this.name = ''
  }
  getName(name: string, @currency age： number) {
    return this.name
  }
}
```

## 拓展知识

### RESTful 风格设计

> RESTful 是一种风格，在 RESTful 中，一切都被认为是资源，每个资源有对应的 URL 标识。
>
> 不是标准也不是协议，只是一种风格，当然你也可以不按照他 的风格去写。

**1、接口 url**

- 传统接口

  > http://localhost:8080/api/get_list?id=1
  >
  > http://localhost:8080/api/delete_list?id=1
  >
  > http://localhost:8080/api/update_list?id=1

- RESTful 接口

  > http://localhost:8080/api/list?id=1
  >
  > RESTful 风格一个接口就会完成 增删改查 他是通过不同的请求方式来区分的
  >
  > 查询 GET
  >
  > 提交 POST
  >
  > 更新 PUT PATCH
  >
  > 删除 DELETE

**2、RESTful 版本的控制**

> 一共有三种，我们一般用第一种，优点是更加语义化

|         名字          |                  使用                  |
| :-------------------: | :------------------------------------: |
|    URI Versioning     | 版本将在请求的 URL 中传递（nest 默认） |
|   Header Versioning   |        自定义请求标头将指定版本        |
| Media Type Versioning |      请求的 Accept 标头将指定版本      |

**3、Code 规范**

- 200 — 成功
- 304 — 协议缓存了
- 400 — 参数错误
- 401 — token 错误
- 403 — 验证失败
- 404 — 接口不存在
- 500 — 服务器端错误
- 502 — 上游接口用问题或者服务器问题

## 正式开始学习

### Nest CLI 

> Nest CLI 是一个命令行界面工具，以帮助您初始化、开发和维护 `Nest` 应用程序。

安装

> npm install   -g  @nestjs/cli

基本工作流程

> nest new 创建 nestjs 项目

项目目录介绍

**1、main.ts 入口文件主文件 类似于 vue 的 main.ts**

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // 创建一个 app 就是类似于绑定一个根组件 App.vue
  await app.listen(3000); // 监听一个端口
}
bootstrap();
```

**2、Controller.ts 控制器**

```typescript
// 可以理解成 vue 的路由
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // private readonly appService: AppService 这一行代码就是依赖注入，不需要实例化 appService 它内部会自己实例化的，我们只需要放上去就可以了
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

**3、app.service.ts**

```typescript
// 这个文件主要实现业务逻辑的 当然 Controller 可以实现逻辑，但单一无法复用，放到 app.service 有别的模块也需要就可以实现复用
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

**4、cli 常用指令**

> ps: nest --help 可以查看 nestjs 所有命令

1. 生成 controller.ts —— nest g mo 名字
2. 生成 module.ts —— nest g s 名字
3. 生成 service.ts —— nest g s 名字
4. 一个命令生成全部 —— nest g resource 名字



### 控制器

### Session

**引言**

_session_ 是服务器为每个用户的浏览器创建的一个会话对象，这个 _session_ 会记录到浏览器 _cookie_ 用来区分用户

我们使用的是 nestjs 默认框架 _express_ 他也支持 _express_ 的插件，所以我们就可以安装 _express_ 的 _session_

> npm install express-session -S

需要 TypeScript 声明提示可以安装一个声明依赖

> npm install @types/express-session -D

然后在 main.ts 引入，通过 app.use 注册 session

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(session({
    secret: "Hzh",
    name: "hzh.session",
    rolling: true,
    cookie: {
      maxAge: null
    }
  }));
  
  await app.listen(3000);
}
bootstrap();
```

**参数详情**

| Key     | 功能                                                         |
| ------- | ------------------------------------------------------------ |
| secret  | 生成服务端 session 签名                                      |
| name    | 生成客户端 cookie 的名字，默认 connect.sid                   |
| cookie  | 设置放回到前端 key 的属性，默认为{ path: '/', httpOnly: true, secure: false, maxAge: null } |
| rolling | 在每次请求时强行设置 cookie，这将重置 cookie 过期时间，默认 fasle |

**案例**



### Providers 提供者

Providers 是 Nest 的一个基本概念。许多基本的 Nest 类可能被视为 provider - service，repository，factory，helper 等等。他们都可以通过 constructor 注入依赖关系。这意味着对象可以彼此创建各种关系，并且“连接”对象实例的功能在很大程度上可以委托给 Nest 运行时系统。Provider 只是一个用 @Injectable() 装饰器主食的类。

**1、基本用法**

通过 module 引入 service 在 providers 注入

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

在 Controller 将可以使用注入好的 service 了

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service'; // **

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} // **

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

**2、自定义名称**

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [{
  	provide: "Hzh",
  	useClass: AppService
  }],
})
export class AppModule {}
```

```typescript
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service'; // **

@Controller()
export class AppController {
  constructor(@Inject("Hzh") private readonly appService: AppService) {} // **

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

**3、自定义注入值**

```typescript
providers: [{
  provide: "Hzh",
  useValue: [1,2,3],
}]
```

```typescript
constructor(@Inject("Hzh") private readonly appService: AppService) {}
getHello(): string {
  return this.appService[0]; // 这里拿到的是数组[1,2,3]
}
```

**4、工厂模式**

如果"服务"之间用相互的依赖，或者逻辑处理，可以使用 useFactory

```typescript
providers: [{
  provide: "Hzh",
  inject: [server1, serve2],
  useFactory(server1, serve2) {
    return // 最终返回的值 
  }
}]
```

```typescript
constructor(@Inject("Hzh") private readonly appService: AppService) {}
getHello(): string {
  return this.appService;
}
```



### Module 模块
