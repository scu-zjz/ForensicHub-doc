import{_ as n,c as a,e,o as i}from"./app-B5qfj-UT.js";const l={};function t(c,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="yaml-configuration" tabindex="-1"><a class="header-anchor" href="#yaml-configuration"><span>Yaml Configuration</span></a></h1><p>In ForensicHub, users directly configure the training or testing pipeline through a Yaml file. Below, we will explain the specific parameters used in the Yaml file and provide a complete Yaml file at the end. The following example Yaml is from the Quick Start section of the Readme on the repository&#39;s homepage. It is assumed that you have already read the <a href="https://github.com/scu-zjz/ForensicHub?tab=readme-ov-file#quick-start" target="_blank" rel="noopener noreferrer">Readme</a>:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># DDP</span></span>
<span class="line">gpus: <span class="token string">&quot;4,5&quot;</span></span>
<span class="line">flag: train</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>gpus</code> parameter defines the GPU numbers used in a multi-GPU environment. In the example, GPUs 4 and 5 are used. The <code>flag</code> parameter indicates the training (train) and testing (test) phases.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Log</span></span>
<span class="line">log_dir: <span class="token string">&quot;./log/aigc_resnet_df_train&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>log_dir</code> parameter defines the location for storing logs and checkpoints.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Model</span></span>
<span class="line">model:</span>
<span class="line">  name: Resnet50</span>
<span class="line">  <span class="token comment"># Model specific setting</span></span>
<span class="line">  init_config:</span>
<span class="line">    pretrained: <span class="token boolean">true</span></span>
<span class="line">    num_classes: <span class="token number">1</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>name</code> must be the name used during registration; otherwise, the registered class will not be found. The <code>init_config</code> can include parameters used for model initialization, with specific parameter names matching the names of the initialization parameters defined in the model.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Train dataset</span></span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>train_dataset</code> and <code>test_dataset</code> parameters define the training and testing datasets used in training. The <code>test_dataset</code> can use one or multiple testing datasets, formatted as a list when using multiple datasets. Similarly, the <code>name</code> must be the name used during registration, and the <code>init_config</code> can include parameters used for initialization.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Transform</span></span>
<span class="line">transform:</span>
<span class="line">  name: AIGCTransform</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Evaluators</span></span>
<span class="line">evaluator:</span>
<span class="line">  - name: ImageF1</span>
<span class="line">    init_config:</span>
<span class="line">      threshold: <span class="token number">0.5</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>transform</code> and <code>evaluator</code> parameters follow the same format as the previous model and dataset parameters.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Training related</span></span>
<span class="line">batch_size: <span class="token number">768</span></span>
<span class="line">test_batch_size: <span class="token number">128</span></span>
<span class="line">epochs: <span class="token number">20</span></span>
<span class="line">accum_iter: <span class="token number">1</span></span>
<span class="line">record_epoch: <span class="token number">0</span>  <span class="token comment"># Save the best only after record epoch.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>These parameters define the training parameters, with <code>record_epoch</code> defining when to start saving the best-performing checkpoint.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Test related</span></span>
<span class="line">no_model_eval: <span class="token boolean">false</span></span>
<span class="line">test_period: <span class="token number">1</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>no_model_eval</code> parameter controls whether to use <code>model_eval</code> in <code>torch</code> during testing, and <code>test_period</code> controls how many epochs to wait before conducting a test.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Logging &amp; TensorBoard</span></span>
<span class="line">log_per_epoch_count: <span class="token number">20</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># DDP &amp; AMP settings</span></span>
<span class="line">find_unused_parameters: <span class="token boolean">false</span></span>
<span class="line">use_amp: <span class="token boolean">true</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>log_per_epoch_count</code> parameter controls how many times to log to TensorBoard within an epoch.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># Optimizer parameters</span></span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>Below is the complete Yaml file:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># DDP</span></span>
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
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23)]))}const r=n(l,[["render",t]]),d=JSON.parse('{"path":"/guide/quickstart/2_yaml.html","title":"Yaml Configuration","lang":"en-US","frontmatter":{"description":"Yaml Configuration In ForensicHub, users directly configure the training or testing pipeline through a Yaml file. Below, we will explain the specific parameters used in the Yaml...","head":[["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://scu-zjz.github.io/ForensicHub-doc/ForensicHub-doc/zh/guide/quickstart/2_yaml.html"}],["meta",{"property":"og:url","content":"https://scu-zjz.github.io/ForensicHub-doc/ForensicHub-doc/guide/quickstart/2_yaml.html"}],["meta",{"property":"og:site_name","content":"ForensicHub Documentation"}],["meta",{"property":"og:title","content":"Yaml Configuration"}],["meta",{"property":"og:description","content":"Yaml Configuration In ForensicHub, users directly configure the training or testing pipeline through a Yaml file. Below, we will explain the specific parameters used in the Yaml..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-06-22T10:25:35.000Z"}],["meta",{"property":"article:modified_time","content":"2025-06-22T10:25:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Yaml Configuration\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-06-22T10:25:35.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"updatedTime":1750587935000,"contributors":[{"name":"Sunnyhaze","username":"Sunnyhaze","email":"mxch1122@126.com","commits":2,"url":"https://github.com/Sunnyhaze"}],"changelog":[{"hash":"fea89d2b43ec8abc7030f43fb5a8ceaab4fa2e80","time":1750587935000,"email":"mxch1122@126.com","author":"Sunnyhaze","message":"[translate] translate update doc to english"},{"hash":"ae6034ce76dc3f2e9a0d62fa55ba660a2a50f668","time":1747816122000,"email":"mxch1122@126.com","author":"Sunnyhaze","message":"[translate] trasnlate to english by kimi"}]},"filePathRelative":"guide/quickstart/2_yaml.md","autoDesc":true}');export{r as comp,d as data};
