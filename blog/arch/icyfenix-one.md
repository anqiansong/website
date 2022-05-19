---
title: 凤凰架构学习笔记——演进中的架构
date: 2022-05-17
authors: keson
tags: [架构]
---
import useBaseUrl from '@docusaurus/useBaseUrl';

![cover](../resource/202205/icyfenix-one.svg)

软件架构风格从大型机（Mainframe），到原始分布式（Distributed），到大型单体（Monolithic），到面向服务（Service-Oriented），
到微服务（Microservices），到服务网格（Service Mesh），到无服务（Serverless）……技术架构上确实呈现出“从大到小”的发展趋势。

<!-- truncate -->

## 单体架构(Monolithic)

:::tip 单体架构
“单体”只是表明系统中主要的过程调用都是进程内调用，不会发生进程间通信，仅此而已。
:::

“单体架构”在整个软件架构演进的历史进程里，是出现时间最早、应用范围最广、使用人数最多、统治历史最长的一种架构风格，但“单体”这个名称，却是在微服
务开始流行之后才“事后追认”所形成的概念

### 单体架构的特点
- 易开发
- 易测试
- 易部署
- 进程内通信

事务具有双面性，有其优势那必然存在不足：
- 软件性能提升空间有限： 受单机资源限制
- 局促的治理规则：比较明显的就是故障隔离，一旦进程内某个模块出现内存、线程泄露，进程阻塞，死循环等问题，都将影响整个程序
- 可维护性/稳定性低：由于单机资源有限和故障隔离较弱直接导致整个应用的可维护性和稳定性偏弱


为了允许程序出错，为了获得隔离、自治的能力，为了可以技术异构等目标，是继为了性能与算力之后，让程序再次选择分布式的理由。然而，开发分布式程序也
并不意味着一定要依靠今天的微服务架构才能实现。在新旧世纪之交，人们曾经探索过几种服务拆分方法，将一个大的单体系统拆分为若干个更小的、不运行在同
一个进程的独立服务，这些服务拆分方法后来导致了面向服务架构（Service-Oriented Architecture）的一段兴盛期，我们称其为“SOA 时代”。

## 面向服务架构(SOA)
:::tip 面向服务架构(Service-Oriented Architecture)
面向服务的体系结构（英语：service-oriented architecture）并不特指一种技术，而是一种分布式运算的软件设计方法。
SOA中的一项服务应有以下四个特性：

- 针对某特定要求的输出，该服务就是运作一项商业逻辑
- 具有完备的特性（self-contained）
- 消费者并不需要了解此服务的运作过程
- 可能由底层其他服务组成

—— 引自《[维基百科](https://zh.wikipedia.org/zh-cn/%E9%9D%A2%E5%90%91%E6%9C%8D%E5%8A%A1%E7%9A%84%E4%BD%93%E7%B3%BB%E7%BB%93%E6%9E%84)》
:::

### [信息烟囱式架构](https://en.wikipedia.org/wiki/Information_silo)
指的是一种不能与其他相关信息系统之间进行互操作或者说协调工作的信息系统。

<center><img src={useBaseUrl('../resource/202205/information_silo.png')} alt="微内核架构示意"/></center>
<center>信息烟囱式架构</center>
<center>图片来自 <a href="https://en.wikipedia.org/wiki/Information_silo">维基百科</a></center>

### [微内核架构](https://en.wikipedia.org/wiki/Microkernel)
微内核架构也被称为插件式架构（Plug-in Architecture）。

各子系统使用到的公共服务、数据、资源集中到一块，成为一个被所有业务系统共同依赖的核心（Kernel，也称为 Core System），具体的业务系统以
插件模块（Plug-in Modules）的形式存在，这样也可提供可扩展的、灵活的、天然隔离的功能特性，即微内核架构，如图所示。

<center><img src={require('../resource/202205/coresystem.png').default} alt="微内核架构示意"/></center>
<center>微内核架构示意</center>
<center>图片引自O'Reilly 的开放文档《 <a href="https://www.oreilly.com/content/software-architecture-patterns/">
Software Architecture Patterns</a>》</center>

### [事件驱动架构](https://en.wikipedia.org/wiki/Event-driven_architecture)
为了能让子系统互相通信，一种可行的方案是在子系统之间建立一套事件队列管道（Event Queues），来自系统外部的消息将以事件的形式发送至管道中，各个
子系统从管道里获取自己感兴趣、能够处理的事件消息，也可以为事件新增或者修改其中的附加信息，甚至可以自己发布一些新的事件到管道队列中去，如此，每
一个消息的处理者都是独立的，高度解耦的，但又能与其他处理者（如果存在该消息处理者的话）通过事件管道进行互动，如图所示:

<center><img src={require('../resource/202205/eventbus.png').default} alt="事件驱动架构示意"/></center>
<center>事件驱动架构示意</center>
<center>图片引自O'Reilly 的开放文档《 <a href="https://www.oreilly.com/content/software-architecture-patterns/">
Software Architecture Patterns</a>》</center>

## 微服务时代(Microservices)

:::tip 微服务
微服务是一种通过多个小型服务组合来构建单个应用的架构风格，这些服务围绕业务能力而非特定的技术标准来构建。各个服务可以采用不同的编程语言，不同的
数据存储技术，运行在不同的进程之中。服务采取轻量级的通信机制和自动化的部署机制实现通信与运维。
:::

### 特点
- 各自都在较大的域上下文中实现特定业务功能
- 各自都自主开发，可以独立部署
- 各自都是独立的，封装其自己的数据存储技术、依赖项和编程平台
- 各自都在自己的进程中运行，并使用 HTTP/HTTPS、gRPC、WebSocket 或 AMQP 等标准通信协议与其他微服务进行通信
- 它们组合在一起形成应用程序

### 优势
- 每个微服务都有自治生命周期，可以独立发展并频繁部署。 不必等待每季度发布一次才能部署新功能或更新。 可以更新实时应用程序的小区域，降低中断整
个系统的风险。 无需完全重新部署应用程序即可进行更新
- 每个微服务都可以独立缩放。 你可以仅横向扩展需要更多处理能力才能满足所需性能级别和服务级别协议的服务，而不是将整个应用程序作为单个单元进行缩
- 放。 精细缩放可使你更好地控制系统，并且有助于降低总体成本，因为是缩放部分系统（而不是所有内容）

### 挑战
#### 1. 通信
前端客户端应用程序如何与后端核心微服务通信？ 是否允许直接通信？ 或者，是否可以使用提供灵活性、控制和安全性的网关外观来抽象后端微服务？

后端核心微服务如何彼此通信？ 是否允许进行可以提高耦合并影响性能和敏捷性的直接 HTTP 调用？ 或者是否可以考虑将消息与队列和主题技术分离？

#### 2. 故障修复
微服务体系结构将系统从进程内迁移到进程外网络通信。 在分布式体系结构中，当服务 B 未响应来自服务 A 的网络调用时，会发生什么情况？ 或者，当服务
C 暂时不可用，而调用它的其他服务被阻止时，会发生什么情况？

#### 3. 分布式数据
按照设计，每个微服务都封装自己的数据，通过其公共接口公开操作。 如果是这样，如何跨多个服务查询数据或实现事务？

#### 4. 数据安全
微服务如何安全地存储并管理机密和敏感配置数据？

### 组件与服务
:::tip 组件
A component is a unit of software that is independently replaceable and upgradeable

组件是可独立更换和升级的软件单元。

-- 引自 《<a href="https://martinfowler.com/articles/microservices.html">
Microservices: a definition of this new architectural term</a>》
:::

:::tip 服务
服务是可独立部署的组件
:::

服务是一种特殊的组件，可以独立部署。

## 单体服务和微服务对比
单体应用程序可以取得成功，但越来越多的人对它们感到沮丧——尤其是随着越来越多的应用程序被部署到云中。更改周期是紧密相连的——对应用程序的一小部分
进行更改，需要重新构建和部署整个单体。随着时间的推移，通常很难保持良好的模块化结构，这使得保持应该只影响该模块中的一个模块的更改变得更加困难。
扩展需要扩展整个应用程序，而不是需要更多资源的部分。

<center><img src={require('../resource/202205/sketch.png').default} alt="单体和微服务"/></center>
<center>单体和微服务</center>
<center>图片引自《 <a href="https://martinfowler.com/articles/microservices.html">
Microservices: a definition of this new architectural term</a>》</center>
<p></p>

单体应用程序更喜欢使用单个逻辑数据库来存储持久数据，微服务更喜欢让每个服务管理自己的数据库，可以是相同数据库技术的不同实例，也可以是完全不同的
数据库系统——这种方法称为 Polyglot Persistence。

<center><img src={require('../resource/202205/decentralised-data.png').default} alt="单体和微服务"/></center>
<center>单体和微服务</center>
<center>图片引自《 <a href="https://martinfowler.com/articles/microservices.html">
Microservices: a definition of this new architectural term</a>》</center>

## 云原生时代(Cloud Native)
:::tip 云原生
云原生技术使组织能够在新式动态环境（如公有云、私有云和混合云）中构建和运行可缩放的应用程序。 容器、服务网格、微服务、不可变基础结构和声明性 
API 便是此方法的范例。
:::

<center><img src={require('../resource/202205/cloud-native-foundational-pillars.png').default} alt="云原生基础架构"/></center>
<center>云原生基础架构</center>
<center>图片引自《 <a href="https://docs.microsoft.com/zh-cn/dotnet/architecture/cloud-native/definition">
Microsoft Build: 什么是云原生？》</a></center>

### 设计要素
|因素 |	说明|
|---|---|
1 | 基本代码	每个微服务都有单个基本代码，存储在其自己的存储库中。 它通过版本控制进行跟踪，可以部署到多个环境（QA、暂存、生产）。|
2 | 依赖项	每个微服务都隔离并打包其自己的依赖项，以在不影响整个系统的情况下进行更改。|
3 | 配置	配置信息通过代码之外的配置管理工具移出微服务和实现外部化。 在应用了正确配置的情况下，相同部署可以在环境间传播。|
4 | 支持服务	辅助资源（数据存储、缓存、消息中转站）应通过可寻址 URL 进行公开。 这样做可使资源与应用程序分离，使其可以互换。|
5 | 生成、发布、运行	每个版本都必须在生成、发布和运行阶段执行严格的分离。 各自都应使用唯一 ID 进行标记，并支持回滚功能。 新式 CI/CD 系统有助于实现此原则。|
6 | 进程	每个微服务应在其自己的进程中执行，与其他正在运行的服务隔离。 将所需状态外部化到支持服务，如分布式缓存或数据存储。|
7 | 端口绑定	每个微服务都应是独立的，其接口和功能在自己的端口上公开。 这样做可与其他微服务隔离。|
8 | 并发	当容量需要增加时，跨多个相同进程（副本）横向扩展服务，而不是在功能最强大的可用计算机上纵向扩展单个大型实例。 将应用程序开发为并发应用程序，从而无缝地在云环境中横向扩展。|
9 | 可处置性	服务实例应是可处置的。 支持快速启动以增加可伸缩性机会，以及支持正常关闭以使系统保持正确状态。 Docker 容器以及业务流程协调程序本质上满足此要求。|
10|  开发/生产等同	使整个应用程序生命周期中的各个环境尽可能相似，避免使用成本高昂的快捷方式。 在这里，通过促进相同的执行环境，容器的采用可以做出很大贡献。|
11|  日志记录	将微服务生成的日志视为事件流。 使用事件聚合器处理它们。 将日志数据传播到数据挖掘/日志管理工具（如 Azure Monitor 或 Splunk）并最终传播到长期存档。|
12 | 管理员进程	以一次性进程形式运行管理性/管理任务，例如数据清理或计算分析。 使用独立工具从生产环境调用这些任务，但独立于应用程序。|
13 | API 优先	使一切成为服务。 假设前端客户端、网关或其他服务会使用你的代码。|
14 | 遥测	在工作站上，你可深入了解应用程序及其行为。 在云中，你无法这样。 确保设计包括监视、特定于域和运行状况/系统数据的集合。|
15 | 身份验证/授权	从开始便实现标识。 请考虑公有云中提供的 [RBAC（基于角色的访问控制）](https://docs.microsoft.com/zh-CN/azure/role-based-access-control/overview) 功能。|

## Serverless

无服务现在还没有一个特别权威的“官方”定义，但它的概念并没有前面各种架构那么复杂，本来无服务也是以“简单”为主要卖点的，它只涉及两块内容：
后端设施（Backend）和函数（Function）。

**后端设施** 是指数据库、消息队列、日志、存储，等等这一类用于支撑业务逻辑运行，但本身无业务含义的技术组件，这些后端设施都运行在云中，无服务中称其
为“后端即服务”（Backend as a Service，BaaS）。
**函数** 是指业务逻辑代码，这里函数的概念与粒度，都已经很接近于程序编码角度的函数了，其区别是无服务中的函数运行在云端，不必考虑算力问题，不必考虑
容量规划（从技术角度可以不考虑，从计费的角度你的钱包够不够用还是要掂量一下的），无服务中称其为“函数即服务”（Function as a Service，FaaS）。


## 扩展阅读
1. [《Microservices: a definition of this new architectural term》](https://martinfowler.com/articles/microservices.html)
2. [《Microsoft Build: 什么是云原生？》](https://docs.microsoft.com/zh-cn/dotnet/architecture/cloud-native/definition)