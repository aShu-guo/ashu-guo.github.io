# Vue RFCs

## 什么是RFC

RFC(请求意见稿)目的是在为框架添加新功能时，提供持续而且受控的流程

许多变更，包括bug修复以及文档改进，都可以通过github的Pull Request工作流实现

虽然有些变更是"实质性的"(substantial)，但是我们要求这些变更提供一些设计过程，并且在Vue核心团队和社区之间达成共识

## RFC的生命周期

一个RFC需要经历以下过程：

- Pending: RFC作为PR提交时
- Active: RFC PR正在被实现，并且等待被合并到主仓库
- Landed: RFC已经被实现，而且已经在新版本中体现
- Rejected: RFC在没有被合并的情况下被关闭

[Pending状态下的RFC列表](https://github.com/vuejs/rfcs/pulls)

## 什么情况下开发需要遵循RFC流程

如果您打算对以下项目之一做出"实质性的"(substantial)变更，那么需要遵循此过程

- [Vue core](https://github.com/vuejs/vue)
- [Vue Router](https://github.com/vuejs/vue-router)
- [Vuex](https://github.com/vuejs/vuex)
- [Vue CLI](https://github.com/vuejs/vue-cli)

我们正在限制上面这些仓库的RFC流程，目的是更容易管理测试流程，并可能未来在vuejs组织下的更多项目中实施。现在，如果您希望对这些项目提出更改建议，请在各自的仓库下提issue。

"实质性"(substantial)变更的定义是根据社区规范不断变化的，但是可能包含以下内容：

- 需要创建新API的功能
- 更改现有API的行为或者语义
- 删除已发布的功能
- 引入新的约定或者惯用用法，即使不会更改Vue的代码

一些更改不需要RFC：

- 基于性能指标改进原有代码逻辑（提高性能、更好的浏览器支持）
- 纠正客观上错误的行为
- 代码相关的改写、重构
- 添加或删除警告（指控制台Warning）
- 新增的内容只会被Vue的实现者注意到，而用户是无法感知到的

如果您没有经过RFC流程提交了一个实现新功能的Pull Request，这个RFC可能会被礼貌地关闭，并建议先提交一个RFC

## 为什么你需要这样做

很感谢对您愿意为Vue做出贡献！然而，随着Vue的使用越来越广泛，我们需要更加重视稳定性，因此对于每一个可能影响用户的更改都必须仔细考虑。另一方面，我们也认为Vue已经到了需要有意识防止API复杂化的阶段。

对于那些只是为了解决在开发过程中遇到的特定问题而提出的RFC的用户来说，这些要求的RFC流程并不能立竿见影的解决他们的问题。在更改Vue时，RFC流程可以引导您完成思考过程，这样我们就可以在讨论为什么这样更改或者为什么不应该进行这些更改时达成共识。

## 在提交之前收集反馈

在深入研究RFC所需API的设计细节之后，得到关于您RFC的设计概念对我们很有帮助。您可以打开一个高等级的discussion展开讨论

## 提交RFC的流程是什么

简言之，如果要将主要功能添加到Vue中，首先必须要将RFC作文md文件合并到vue-rfcs仓库中，此时RFC的状态是"Active"
，并且可能以合并到Vue中作为目标来实现。

1. 基于vue-rfcs中的（0000-teamplate.md）模板来提交您的RFC
    - 需要注意的是：如果RFC没有提供令人信服的动机、没有展示该设计会产生哪些影响，或者没有诚实的展示RFC的缺点，往往不会被接受

2. 打开一个新的Discussions，确保设置类别为"RFC Discussions"
    - 在讨论中达成共识并关于RFC的反馈。获得广泛支持的RFC更可能取得进展

3. 如果提案在社区中获得极大的兴趣和积极的反馈，您可以准备一个Pull Request
    - Fork vue-rfc仓库
    - 新增你的RFC到目录中，存放路径为：active-rfcs/0000-my-feature.md
    - 提交一个Pull Request，确保链接到Discussion

4. 最终，核心团队将决定RFC是否包含在Vue待开发列表中
    - 根据核心团队和设计的反馈修改RFC，比较大的改动会触发新的评论截止日期
    - 通过公开的讨论，并且总结了应当拒绝当前RFC的理由之后，RFC可能会被拒绝。之后，核心团队的应当关闭RFC的Pull Request
    - RFC也可能在截止日期之前被接受，核心成员将合并RFC的相关Pull Request，此时状态为"Active"

## 有关"Active"状态下RFC的详细信息

一旦RFC生效，作者就可以实现它并将该功能提交到核心库。"Active"状态下的RFC并不意味着板上钉钉--一定会被合并到核心库；但这确实意味着核心团队已经原则上统一并愿意合并它。

此外，"Active"状态下的RFC并不意味着它被实现的优先级，也不意味着正在有贡献者处理它。

也可以在后续的PR中修改"Active"
的RFC。我们编写每个RFC来反映功能的最终设计方式；但是这个过程并不意味着每个合并的RFC都能实际反映下一个主要版本的最终结果。因此，我们尽量让每个RFC文档按计划与功能开发保持同步，通过更新文档来追踪后续的更改。

## 实现RFC

RFC的作者并没有义务去实现它。当然，也欢迎RFC作者在RFC被社区以及核心团队接受之后，发布实现以供审查。

一个活跃的RFC应当有指向实现PR的链接（如果有的话）。对于社区的反馈，应当反映在实现PR中，而不是RFC PR。

如果您对"Active"的RFC感兴趣，但是无法确定是否有人在处理它，请随时提问（例如：在相关issue中发布评论）

## 审查RFC's

核心团队成员将定期审查一些开放的RFC Pull Request。如果核心团队成员认为RFC
PR已经具备进入Active状态的条件，他们可以使用Github的review功能批准PR，以表示他们批准了RFC。

VueRFC流程的灵感来自React、Rust、Ember

