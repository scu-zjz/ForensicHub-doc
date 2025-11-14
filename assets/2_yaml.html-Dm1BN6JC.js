import{_ as n,c as a,e,o as i}from"./app-B5qfj-UT.js";const l={};function c(p,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="yaml配置" tabindex="-1"><a class="header-anchor" href="#yaml配置"><span>Yaml配置</span></a></h1><p>ForensicHub中，用户直接通过Yaml文件配置训练或测试的 pipeline，下面将解释Yaml中具体用到的参数，最后会给出完整的Yaml文件。以下示例的Yaml为仓库首页Readme中的Quick Start中的示例，希望你已经阅读过仓库首页的<a href="https://github.com/scu-zjz/ForensicHub?tab=readme-ov-file#quick-start" target="_blank" rel="noopener noreferrer">Readme</a>：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># DDP</span></span>
<span class="line">gpus: <span class="token string">&quot;4,5&quot;</span></span>
<span class="line">flag: train</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>gpus</code>定义了多卡环境下使用的显卡序号，示例中使用的是第4，5两张卡。<code>flag</code>标识了训练（train）和测试（test）阶段。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Log</span></span>
<span class="line">log_dir: <span class="token string">&quot;./log/aigc_resnet_df_train&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>log_dir</code>定义了存放log和checkpoint的位置。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Model</span></span>
<span class="line">model:</span>
<span class="line">  name: Resnet50</span>
<span class="line">  <span class="token comment"># Model specific setting</span></span>
<span class="line">  init_config:</span>
<span class="line">    pretrained: <span class="token boolean">true</span></span>
<span class="line">    num_classes: <span class="token number">1</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>name</code>必须是注册时使用的名称，否则会找不到注册类。<code>init_config</code>中可以加入模型初始化所使用的参数，具体参数名称要与模型定义的初始化参数的名称相匹配。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Train dataset</span></span>
<span class="line">train_dataset:</span>
<span class="line">  name: AIGCLabelDataset</span>
<span class="line">  dataset_name: DiffusionForensics_train</span>
<span class="line">  init_config:</span>
<span class="line">    image_size: <span class="token number">224</span></span>
<span class="line">    path: /mnt/data1/public_datasets/AIGC/DiffusionForensics/images/train.json</span>
<span class="line"><span class="token comment">#  Test dataset (one or many)</span></span>
<span class="line">test_dataset:</span>
<span class="line">  - name: AIGCLabelDataset</span>
<span class="line">    dataset_name: DiffusionForensics_val</span>
<span class="line">    init_config:</span>
<span class="line">      image_size: <span class="token number">224</span></span>
<span class="line">      path: /mnt/data1/public_datasets/AIGC/DiffusionForensics/images/val.json</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>train_dataset</code>和<code>test_dataset</code>定义了训练中使用的训练集和测试集，其中<code>test_dataset</code>可以使用一个或多个测试集，使用多个时为列表形式。同样的，<code>name</code>必须是注册时使用的名称，<code>init_config</code>中可以加入初始化所使用的参数。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Transform</span></span>
<span class="line">transform:</span>
<span class="line">  name: AIGCTransform</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Evaluators</span></span>
<span class="line">evaluator:</span>
<span class="line">  - name: ImageF1</span>
<span class="line">    init_config:</span>
<span class="line">      threshold: <span class="token number">0.5</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>transform</code>和<code>evaluator</code>参数和前面的模型和数据集参数格式相同。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Training related</span></span>
<span class="line">batch_size: <span class="token number">768</span></span>
<span class="line">test_batch_size: <span class="token number">128</span></span>
<span class="line">epochs: <span class="token number">20</span></span>
<span class="line">accum_iter: <span class="token number">1</span></span>
<span class="line">record_epoch: <span class="token number">0</span>  <span class="token comment"># Save the best only after record epoch.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义训练使用的参数，其中<code>record_epoch</code>定义了什么时候开始保存性能最好的checkpoint。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Test related</span></span>
<span class="line">no_model_eval: <span class="token boolean">false</span></span>
<span class="line">test_period: <span class="token number">1</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>no_model_eval</code>控制在测试时是否使用<code>torch</code>中的<code>model_eval</code>，<code>test_period</code>控制多少个epoch后进行一次测试。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Logging &amp; TensorBoard</span></span>
<span class="line">log_per_epoch_count: <span class="token number">20</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># DDP &amp; AMP settings</span></span>
<span class="line">find_unused_parameters: <span class="token boolean">false</span></span>
<span class="line">use_amp: <span class="token boolean">true</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>log_per_epoch_count</code>控制一个epoch中记录多少次到tensorboard中。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Optimizer parameters</span></span>
<span class="line">weight_decay: <span class="token number">0.05</span></span>
<span class="line">lr: 1e-4</span>
<span class="line">blr: <span class="token number">0.001</span></span>
<span class="line">min_lr: 1e-5</span>
<span class="line">warmup_epochs: <span class="token number">1</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Device and training control</span></span>
<span class="line">device: <span class="token string">&quot;cuda&quot;</span></span>
<span class="line">seed: <span class="token number">42</span></span>
<span class="line">resume: <span class="token string">&quot;&quot;</span></span>
<span class="line">start_epoch: <span class="token number">0</span></span>
<span class="line">num_workers: <span class="token number">8</span></span>
<span class="line">pin_mem: <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Distributed training parameters</span></span>
<span class="line">world_size: <span class="token number">1</span></span>
<span class="line">local_rank: <span class="token parameter variable">-1</span></span>
<span class="line">dist_on_itp: <span class="token boolean">false</span></span>
<span class="line">dist_url: <span class="token string">&quot;env://&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>以下为完整的Yaml文件：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># DDP</span></span>
<span class="line">gpus: <span class="token string">&quot;4,5&quot;</span></span>
<span class="line">flag: train</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Log</span></span>
<span class="line">log_dir: <span class="token string">&quot;./log/aigc_resnet_df_train&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Task</span></span>
<span class="line">if_predict_label: <span class="token boolean">true</span></span>
<span class="line">if_predict_mask: <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Model</span></span>
<span class="line">model:</span>
<span class="line">  name: Resnet50</span>
<span class="line">  <span class="token comment"># Model specific setting</span></span>
<span class="line">  init_config:</span>
<span class="line">    pretrained: <span class="token boolean">true</span></span>
<span class="line">    num_classes: <span class="token number">1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Train dataset</span></span>
<span class="line">train_dataset:</span>
<span class="line">  name: AIGCLabelDataset</span>
<span class="line">  dataset_name: DiffusionForensics_train</span>
<span class="line">  init_config:</span>
<span class="line">    image_size: <span class="token number">224</span></span>
<span class="line">    path: /mnt/data1/public_datasets/AIGC/DiffusionForensics/images/train.json</span>
<span class="line"><span class="token comment">#  Test dataset (one or many)</span></span>
<span class="line">test_dataset:</span>
<span class="line">  - name: AIGCLabelDataset</span>
<span class="line">    dataset_name: DiffusionForensics_val</span>
<span class="line">    init_config:</span>
<span class="line">      image_size: <span class="token number">224</span></span>
<span class="line">      path: /mnt/data1/public_datasets/AIGC/DiffusionForensics/images/val.json</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Transform</span></span>
<span class="line">transform:</span>
<span class="line">  name: AIGCTransform</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Evaluators</span></span>
<span class="line">evaluator:</span>
<span class="line">  - name: ImageF1</span>
<span class="line">    init_config:</span>
<span class="line">      threshold: <span class="token number">0.5</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Training related</span></span>
<span class="line">batch_size: <span class="token number">768</span></span>
<span class="line">test_batch_size: <span class="token number">128</span></span>
<span class="line">epochs: <span class="token number">20</span></span>
<span class="line">accum_iter: <span class="token number">1</span></span>
<span class="line">record_epoch: <span class="token number">0</span>  <span class="token comment"># Save the best only after record epoch.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Test related</span></span>
<span class="line">no_model_eval: <span class="token boolean">false</span></span>
<span class="line">test_period: <span class="token number">1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Logging &amp; TensorBoard</span></span>
<span class="line">log_per_epoch_count: <span class="token number">20</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># DDP &amp; AMP settings</span></span>
<span class="line">find_unused_parameters: <span class="token boolean">false</span></span>
<span class="line">use_amp: <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Optimizer parameters</span></span>
<span class="line">weight_decay: <span class="token number">0.05</span></span>
<span class="line">lr: 1e-4</span>
<span class="line">blr: <span class="token number">0.001</span></span>
<span class="line">min_lr: 1e-5</span>
<span class="line">warmup_epochs: <span class="token number">1</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Device and training control</span></span>
<span class="line">device: <span class="token string">&quot;cuda&quot;</span></span>
<span class="line">seed: <span class="token number">42</span></span>
<span class="line">resume: <span class="token string">&quot;&quot;</span></span>
<span class="line">start_epoch: <span class="token number">0</span></span>
<span class="line">num_workers: <span class="token number">8</span></span>
<span class="line">pin_mem: <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Distributed training parameters</span></span>
<span class="line">world_size: <span class="token number">1</span></span>
<span class="line">local_rank: <span class="token parameter variable">-1</span></span>
<span class="line">dist_on_itp: <span class="token boolean">false</span></span>
<span class="line">dist_url: <span class="token string">&quot;env://&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23)]))}const t=n(l,[["render",c]]),r=JSON.parse('{"path":"/zh/guide/quickstart/2_yaml.html","title":"Yaml配置","lang":"zh-CN","frontmatter":{"description":"Yaml配置 ForensicHub中，用户直接通过Yaml文件配置训练或测试的 pipeline，下面将解释Yaml中具体用到的参数，最后会给出完整的Yaml文件。以下示例的Yaml为仓库首页Readme中的Quick Start中的示例，希望你已经阅读过仓库首页的Readme： gpus定义了多卡环境下使用的显卡序号，示例中使用的是第4，5两张卡。...","head":[["link",{"rel":"alternate","hreflang":"en-us","href":"https://scu-zjz.github.io/ForensicHub-doc/ForensicHub-doc/guide/quickstart/2_yaml.html"}],["meta",{"property":"og:url","content":"https://scu-zjz.github.io/ForensicHub-doc/ForensicHub-doc/zh/guide/quickstart/2_yaml.html"}],["meta",{"property":"og:site_name","content":"ForensicHub 文档"}],["meta",{"property":"og:title","content":"Yaml配置"}],["meta",{"property":"og:description","content":"Yaml配置 ForensicHub中，用户直接通过Yaml文件配置训练或测试的 pipeline，下面将解释Yaml中具体用到的参数，最后会给出完整的Yaml文件。以下示例的Yaml为仓库首页Readme中的Quick Start中的示例，希望你已经阅读过仓库首页的Readme： gpus定义了多卡环境下使用的显卡序号，示例中使用的是第4，5两张卡。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:locale:alternate","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-06-16T09:08:10.000Z"}],["meta",{"property":"article:modified_time","content":"2025-06-16T09:08:10.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Yaml配置\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-06-16T09:08:10.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"updatedTime":1750064890000,"contributors":[{"name":"Bo Du","username":"","email":"2500074187@qq.com","commits":2}],"changelog":[{"hash":"a1ff3b9d9933eb39d8d72ac69ef5de88e4452402","time":1750064890000,"email":"2500074187@qq.com","author":"Bo Du","message":"doc"},{"hash":"581d67fe91b215c6bde911ac4e0fbfec6ef93172","time":1747815100000,"email":"2500074187@qq.com","author":"Bo Du","message":"doc"}]},"filePathRelative":"zh/guide/quickstart/2_yaml.md","autoDesc":true}');export{t as comp,r as data};
