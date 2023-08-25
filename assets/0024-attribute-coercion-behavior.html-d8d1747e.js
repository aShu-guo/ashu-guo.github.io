import{_ as e,o as t,c as d,b as o}from"./app-a46f6870.js";const c={},a=o('<h1 id="attribute强制行为" tabindex="-1"><a class="header-anchor" href="#attribute强制行为" aria-hidden="true">#</a> attribute强制行为</h1><h2 id="概览" tabindex="-1"><a class="header-anchor" href="#概览" aria-hidden="true">#</a> 概览</h2><ul><li>废弃内置的<code>enumerated attributes</code>的概念，将这些属性作为普通非布尔类型的attribute来处理。</li><li>如果属性值为false，则不再移除这个属性。而是设置为<code>attr=&#39;false&#39;</code>。想要移除属性时，需要设置为<code>null</code>或者<code>undefined</code>。</li></ul><h2 id="动机" tabindex="-1"><a class="header-anchor" href="#动机" aria-hidden="true">#</a> 动机</h2><p>在2.x版本，对于v-bind绑定的属性值我们采用的是以下策略：</p><ul><li>对于attribute/element结对出现时，Vue使用相关的IDL attribute（property）：类似 <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code>, <code>&lt;progress&gt;</code> 标签的value属性</li><li>对于布尔类型的attribute和xlinks，如果它们的值为<code>falsy</code>（null || undefined || false）则会移除它们，反之则添加。</li><li>对于<code>enumerated attributes</code>（目前包括：<code>contenteditable</code>, <code>draggable</code> 和 <code>spellcheck</code> ），vue试图强制改写它们为字符串（目前对<code>contenteditable</code>做了特殊处理，来接收用户传入合法的<code>contenteditable</code> 值而不是转为<code>contenteditable=&#39;true&#39;</code>）</li><li>对于其他attribute，如果它们的值为<code>falsy</code>则会移除，反之则按set原值。</li></ul><p>在v2.x版本中，我们添加了<code>enumerated attributes</code>的概念，表示只能接收<code>&#39;true&#39;</code>或<code>&#39;false&#39;</code> 的属性，这在技术上是有缺陷的。而且相对于其他非布尔类型的attribute的行为是不同的，这也对用户造成了困惑。下面的table描述了<code>enumerated attributes</code> 的属性与普通非布尔类型attributes的不同点：</p><table><thead><tr><th>Binding expr.</th><th><code>foo</code> <sup>normal</sup></th><th><code>draggable</code> <sup>enumerated</sup></th></tr></thead><tbody><tr><td><code>:attr=&quot;null&quot;</code></td><td>/</td><td><code>draggable=&quot;false&quot;</code></td></tr><tr><td><code>:attr=&quot;undefined&quot;</code></td><td>/</td><td>/</td></tr><tr><td><code>:attr=&quot;true&quot;</code></td><td><code>foo=&quot;true&quot;</code></td><td><code>draggable=&quot;true&quot;</code></td></tr><tr><td><code>:attr=&quot;false&quot;</code></td><td>/</td><td><code>draggable=&quot;false&quot;</code></td></tr><tr><td><code>:attr=&quot;0&quot;</code></td><td><code>foo=&quot;0&quot;</code></td><td><code>draggable=&quot;true&quot;</code></td></tr><tr><td><code>attr=&quot;&quot;</code></td><td><code>foo=&quot;&quot;</code></td><td><code>draggable=&quot;true&quot;</code></td></tr><tr><td><code>attr=&quot;foo&quot;</code></td><td><code>foo=&quot;foo&quot;</code></td><td><code>draggable=&quot;true&quot;</code></td></tr><tr><td><code>attr</code></td><td><code>foo=&quot;&quot;</code></td><td><code>draggable=&quot;true&quot;</code></td></tr></tbody></table><p>我们从上面这个table得知，目前的实现是将true强制设置为了<code>&#39;true&#39;</code>，但是为<code>false</code> 时会移除attribute。这造成了用法上的不连贯，而且在很普遍的用例中，例如<code>aria-*</code>：<code>aria-selected</code>, <code>aria-hidden</code>等， 要求用户手动将值从boolean类型更改为string类型。</p><h2 id="详细设计" tabindex="-1"><a class="header-anchor" href="#详细设计" aria-hidden="true">#</a> 详细设计</h2><ul><li>我们计划移除<code>enumerated attributes</code>的概念，并且将它们作为普通非布尔类型的HTML attribute对待。</li></ul><p>这解决了<code>enumerated attributes</code>和普通非布尔类型的attribute之间的不一致性。这样也就可以去使用其他值，而不仅仅是<code>&#39;true&#39;</code> 和 <code>&#39;false&#39;</code>，甚至尚未确定的关键字。</p><ul><li>对于非布尔类型的HTML attribute，如果值为false时不再移除，而是设置为<code>&#39;false&#39;</code>。</li></ul><p>这解决了值为<code>true</code>和<code>false</code>如何set attribute的不一致性，而且更容易输出<code>aria-*</code> attribute。</p><p>下面这个表格描述了新的行为：</p><table><thead><tr><th>Binding expr.</th><th><code>foo</code> <sup>normal</sup></th><th><code>draggable</code> <sup>enumerated</sup></th></tr></thead><tbody><tr><td><code>:attr=&quot;null&quot;</code></td><td>/</td><td>/ <sup>†</sup></td></tr><tr><td><code>:attr=&quot;undefined&quot;</code></td><td>/</td><td>/</td></tr><tr><td><code>:attr=&quot;true&quot;</code></td><td><code>foo=&quot;true&quot;</code></td><td><code>draggable=&quot;true&quot;</code></td></tr><tr><td><code>:attr=&quot;false&quot;</code></td><td><code>foo=&quot;false&quot;</code> <sup>†</sup></td><td><code>draggable=&quot;false&quot;</code></td></tr><tr><td><code>:attr=&quot;0&quot;</code></td><td><code>foo=&quot;0&quot;</code></td><td><code>draggable=&quot;0&quot;</code> <sup>†</sup></td></tr><tr><td><code>attr=&quot;&quot;</code></td><td><code>foo=&quot;&quot;</code></td><td><code>draggable=&quot;&quot;</code> <sup>†</sup></td></tr><tr><td><code>attr=&quot;foo&quot;</code></td><td><code>foo=&quot;foo&quot;</code></td><td><code>draggable=&quot;foo&quot;</code> <sup>†</sup></td></tr><tr><td><code>attr</code></td><td><code>foo=&quot;&quot;</code></td><td><code>draggable=&quot;&quot;</code> <sup>†</sup></td></tr></tbody></table><p><small>†: changed</small></p><p>对于布尔类型attribute的行为与之前保持一致。</p><h2 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h2><p>该提案引入了以下重大更改：</p><ul><li>对于<code>enumerated attributes</code>： <ul><li>值为<code>null</code>时才会移除attribute，而不是设置为<code>&#39;false&#39;</code></li><li><code>&#39;true&#39;</code> 和 <code>&#39;false&#39;</code>以外的number类型和string类型的值都不在强制转换为<code>&#39;true&#39;</code></li></ul></li><li>对于所有非布尔类型的attribute，值为<code>false</code>时不会移除它，而是会被设置为<code>&#39;false&#39;</code></li></ul><p>最重大的变更是用户不应该再依赖值为false时移除attribute，而是应该使用null或者undefined。但是布尔类型的attribute并不受影戏，这个变更更多影响的是值为<code>&#39;false&#39;</code> 或者不传递值 的<code>enumerated attributes</code>，例如<code>aria-checked</code>。这也可能影响如<code>[foo]</code>的css选择器。</p><h2 id="可选的方案" tabindex="-1"><a class="header-anchor" href="#可选的方案" aria-hidden="true">#</a> 可选的方案</h2><p>N/A</p><h2 id="采取的策略" tabindex="-1"><a class="header-anchor" href="#采取的策略" aria-hidden="true">#</a> 采取的策略</h2><p>不太可能为该用例提供一个有帮助的代码模板。我们应该在迁移指引中提供详细的信息，并且在v3.x版本的档案中记录下。</p><h3 id="enumerated-attributes" tabindex="-1"><a class="header-anchor" href="#enumerated-attributes" aria-hidden="true">#</a> enumerated attributes</h3><p>移除<code>enumerated attributes</code>的概念和<code>attr=&#39;false&#39;</code>可能造成不同的IDL attribute值（这将会反映在真实的值上），描述如下：</p><table><thead><tr><th>Absent enumerated attr</th><th>IDL attr &amp; value</th></tr></thead><tbody><tr><td><code>contenteditable</code></td><td><code>contentEditable</code> → <code>&#39;inherit&#39;</code></td></tr><tr><td><code>draggable</code></td><td><code>draggable</code> → <code>false</code></td></tr><tr><td><code>spellcheck</code></td><td><code>spellcheck</code> → <code>true</code></td></tr></tbody></table><p>为了保证旧行为有效，我们将会将<code>false</code>强制转换为<code>&#39;false&#39;</code>，在3.x版本中对于通过v-bind传递给<code>contenteditable</code> 和 <code>spellcheck</code>的值，开发者需要手动将<code>false</code>处理为<code>&#39;false&#39;</code>。</p><p>在2.x版本中，对于enumerated attributes所有非法的属性值都会被转换为<code>true</code> 。这通常是无意的，不太可能被大规模依赖。在3.x，<code>true</code>或者<code>&#39;true&#39;</code>需要精确指定。</p><h3 id="将false转换为-false-而不是移除attribute" tabindex="-1"><a class="header-anchor" href="#将false转换为-false-而不是移除attribute" aria-hidden="true">#</a> 将<code>false</code>转换为<code>&#39;false&#39;</code>而不是移除attribute</h3><p>在3.x版本中，移除attribute需要指定值为<code>null</code>或<code>undefined</code></p><h3 id="_2-x版本和3-x版本中的行为比较" tabindex="-1"><a class="header-anchor" href="#_2-x版本和3-x版本中的行为比较" aria-hidden="true">#</a> 2.x版本和3.x版本中的行为比较</h3><table><thead><tr><th>Attribute</th><th><code>v-bind</code> value <sup>2.x</sup></th><th><code>v-bind</code> value <sup>3.x</sup></th><th>HTML output</th></tr></thead><tbody><tr><td rowspan="3">2.x “Enumerated attrs”<br><small>i.e. <code>contenteditable</code>, <code>draggable</code> and <code>spellcheck</code>.</small></td><td><code>undefined</code>, <code>false</code></td><td><code>undefined</code>, <code>null</code></td><td><i>removed</i></td></tr><tr><td><code>true</code>, <code>&#39;true&#39;</code>, <code>&#39;&#39;</code>, <code>1</code>, <code>&#39;foo&#39;</code></td><td><code>true</code>, <code>&#39;true&#39;</code></td><td><code>&quot;true&quot;</code></td></tr><tr><td><code>null</code>, <code>&#39;false&#39;</code></td><td><code>false</code>, <code>&#39;false&#39;</code></td><td><code>&quot;false&quot;</code></td></tr><tr><td rowspan="2">Other non-boolean attrs<br><small>eg. <code>aria-checked</code>, <code>tabindex</code>, <code>alt</code>, etc.</small></td><td><code>undefined</code>, <code>null</code>, <code>false</code></td><td><code>undefined</code>, <code>null</code></td><td><i>removed</i></td></tr><tr><td><code>&#39;false&#39;</code></td><td><code>false</code>, <code>&#39;false&#39;</code></td><td><code>&quot;false&quot;</code></td></tr></tbody></table><h2 id="未解决的问题" tabindex="-1"><a class="header-anchor" href="#未解决的问题" aria-hidden="true">#</a> 未解决的问题</h2><p>N/A</p>',37),r=[a];function u(l,i){return t(),d("div",null,r)}const n=e(c,[["render",u],["__file","0024-attribute-coercion-behavior.html.vue"]]);export{n as default};