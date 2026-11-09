-- Programmatic SEO dimensions. Adding a row multiplies the other two dimensions
-- into new pages on the next generation. The site falls back to data/dimensions.json
-- when Supabase is not configured or these tables are empty.

create table if not exists seo_services (
  slug text primary key,
  sort integer not null,
  name text not null,
  keyword text not null,
  definition text not null,
  modules text[] not null,
  excludes text[] not null,
  outcome text not null,
  updated_at timestamptz not null default now()
);

create table if not exists seo_audiences (
  slug text primary key,
  sort integer not null,
  name text not null,
  job text not null,
  need text not null,
  focus text not null,
  updated_at timestamptz not null default now()
);

create table if not exists seo_markets (
  slug text primary key,
  sort integer not null,
  name text not null,
  area_served text not null,
  regulator text not null,
  framework text not null,
  check_note text not null,
  source_name text not null,
  source_url text not null,
  updated_at timestamptz not null default now()
);

alter table seo_services enable row level security;
alter table seo_audiences enable row level security;
alter table seo_markets enable row level security;

grant select on seo_services, seo_audiences, seo_markets to anon, authenticated;

drop policy if exists "public read seo_services" on seo_services;
create policy "public read seo_services" on seo_services for select using (true);

drop policy if exists "public read seo_audiences" on seo_audiences;
create policy "public read seo_audiences" on seo_audiences for select using (true);

drop policy if exists "public read seo_markets" on seo_markets;
create policy "public read seo_markets" on seo_markets for select using (true);

insert into seo_services (slug, sort, name, keyword, definition, modules, excludes, outcome)
values
  ('crypto-exchange', 0, '虚拟币交易所系统', '虚拟币交易所系统', '供机构向其客户提供数字资产买卖的系统，核心是订单簿撮合、账户分账、充值提现、KYC 接口和运营后台。', array['现货撮合', '账户与分账', '充值提现', 'KYC 与名单筛查接口', '运营后台', '行情与 API']::text[], array['不代办交易场所或经纪牌照', '不提供做市资金', '不提供绕过 KYC 或制裁筛查的通道']::text[], '交付结果应是可对账的交易和资产记录，而不是一个无法审计的买卖页面。'),
  ('stock-trading', 1, '股票交易系统', '股票交易系统', '供券商或经纪商接收客户股票订单、接入行情、完成路由、风控和清算对账的经纪系统。', array['行情接入', '订单路由', '保证金与风控', '清算对账', '客户门户', '经纪后台']::text[], array['不提供买卖建议或收益承诺', '不保证接入某一家交易所，接入以该市场会员资格为前提', '不替代证券经纪牌照']::text[], '订单从客户指令到清算回执的路径要能逐笔追溯。'),
  ('futures', 2, '期货交易系统', '期货交易系统', '支持期货与衍生品合约的下单、保证金、强平和结算，面向已有或正在申请相应资格的机构。', array['合约与保证金', '风控与强平', '结算', '行情', '交易接口', '风险报表']::text[], array['不提供杠杆上限的豁免', '不提供带单或收益承诺', '不替代期货或衍生品业务资格']::text[], '保证金、强平和结算结果必须能和风险报表对上。'),
  ('forex', 3, '外汇交易系统', '外汇交易系统', '面向外汇经纪业务的报价、订单执行、保证金和流动性接入系统。', array['报价聚合', '订单执行', '保证金', '流动性接入', '客户分级', '对账']::text[], array['不承诺成交价差或客户收益', '不提供绕过零售杠杆保护的配置', '不替代外汇业务资格']::text[], '报价来源、执行结果和保证金变动要能按客户账户复核。'),
  ('white-label', 4, '白标方案', '交易系统白标', '在可配置的交易或经纪系统上替换品牌、域名、费率和开通模块，由机构以自己的品牌对客。', array['品牌与域名', '费率与品种配置', '多租户权限', '管理后台', '客户端', '上线核对清单']::text[], array['不替代对客法律主体和牌照', '不包含虚假成交量或虚假用户', '不把技术供应商自动写成资产保管人']::text[], '白标上线前要能指出谁对客、谁持牌、谁保管资产。这三件事不能只体现在标识上。'),
  ('wallet', 5, '钱包系统', '数字资产钱包系统', '管理数字资产的地址、归集、热冷钱包签名和提现审核的托管钱包系统。', array['地址生成', '归集', '热钱包签名', '冷钱包审批', '提现审核', '余额对账']::text[], array['不包含混币或匿名跨链', '不绕过制裁筛查', '不把单人热钱包私钥当作完整的托管控制']::text[], '每一笔提现都要有审核记录，链上余额要能和账本余额核对。'),
  ('ecommerce', 6, '电商系统', '电商系统', '面向真实商品和服务的电商系统，包含商品、库存、订单、支付和履约。', array['商品与库存', '购物车与结算', '支付', '订单与履约', '会员', '运营后台']::text[], array['不包含虚假订单或虚假评价', '不包含操纵销量或搜索排名的功能', '不把未支付的点击记成已完成订单']::text[], '订单必须对应真实的库存变动和支付结果，后台数字要能回到原始订单。'),
  ('rwa-tokenization', 7, 'RWA 代币化交易所', 'RWA代币化交易所系统', '把房地产、债券、基金份额等现实资产登记、拆分，并在同一平台完成认购、托管与二级流转的系统。', array['资产登记与份额拆分', '投资者资格与白名单', '一级认购', '二级转让规则', '收益分配', '信息披露']::text[], array['不把资产上链等同于证券发行已获批准', '不提供绕过投资者适当性的转让通道', '不承诺资产增值或分红']::text[], '份额从发行到转让都要能回到登记记录，转让限制必须写进规则，而不是只写在介绍页上。'),
  ('liquidity', 8, '流动性技术', '交易系统流动性接入', '为交易平台接入外部做市与报价源，管理额度、拒单和盘口深度的流动性接入系统。', array['报价接入', '成交回报', '额度与拒单', '盘口聚合', '延迟监控', '对账']::text[], array['不提供做市本金', '不承诺盘口深度或滑点', '不把外部流动性包装成自有资产']::text[], '每一笔外部成交都要能回到报价源、额度和客户订单，延迟和拒单原因必须可观测。'),
  ('crypto-card', 9, '加密卡方案', '加密借记卡系统', '把数字资产账户连接到卡组织消费的发卡与清算系统，覆盖开卡、授权、结算和对账。', array['开卡与 KYC 接口', '授权与限额', '汇率与冻结', '清算对账', '商户拒付处理', '运营后台']::text[], array['不代办发卡行或卡组织牌照', '不提供绕过商户风控的伪装交易', '不把未清算授权记成已完成消费']::text[], '授权、冻结、清算和退款必须能按卡片和账户逐笔核对。'),
  ('kyt', 10, 'KYT 链上交易监控', 'KYT链上监控系统', '在充值和提现前后对地址、交易和对手方做风险评分与名单筛查的链上监控系统。', array['地址风险评分', '交易监控', '名单筛查', '告警与审核', '案例留痕', '报表接口']::text[], array['不提供关闭筛查或匿名混币的通道', '不把评分结果写成监管认证', '不代替运营机构自己的可疑交易报告责任']::text[], '每一笔放行或拦截都要留下评分、规则和审核人，而不是只有一个通过标记。'),
  ('managed-services', 11, '运维托管服务', '交易系统运维托管', '为已交付的交易与钱包系统提供值守、变更、备份和故障响应的运维托管。', array['监控告警', '变更窗口', '备份与恢复演练', '权限值守', '事件记录', '月度运行报告']::text[], array['不把运维托管写成牌照或资产保管责任转移', '不在未授权窗口变更生产配置', '不承诺零故障']::text[], '变更、告警和恢复步骤必须可审计，生产权限不能只掌握在单人手里。'),
  ('compliance-advisory', 12, '合规咨询', '交易系统合规咨询', '按机构类型和市场梳理牌照路径、AML/KYC 框架和系统需要预留的合规接口，咨询结论供选型对照。', array['活动定性', '牌照路径对照', 'AML/KYC 流程设计', '系统接口清单', '风险评估备忘', '上线核对问题']::text[], array['不代办牌照结果', '不构成当地持牌律师的法律意见', '不保证某一申请会被批准']::text[], '交付的是可核对的问题清单和接口范围，不是一张已经获批的许可。'),
  ('web3-infra', 13, 'Web3 基础设施', 'Web3节点与质押基础设施', '为机构提供节点运营、质押和链上基础设施接入，强调可监控、可恢复和权限分离。', array['节点运营', '质押与解质押流程', '密钥与审批', '监控与告警', '收益对账', '变更记录']::text[], array['不承诺质押收益', '不提供帮助绕过制裁名单的节点策略', '不把节点服务写成客户资产的法定托管人']::text[], '节点状态、质押头寸和收益必须能和链上记录核对，操作要有多人审批。')
on conflict (slug) do update set
  sort = excluded.sort,
  name = excluded.name,
  keyword = excluded.keyword,
  definition = excluded.definition,
  modules = excluded.modules,
  excludes = excluded.excludes,
  outcome = excluded.outcome,
  updated_at = now();

insert into seo_audiences (slug, sort, name, job, need, focus)
values
  ('broker', 0, '券商', '券商已经有客户关系和开户流程，缺的是能审计的订单、分账和清算，而不是再做一个品牌官网。', '订单、客户资产和合规记录要能分开对账。', '把现有开户和适当性流程接进交易栈，而不是平行再造一套客户主档。'),
  ('exchange-startup', 1, '交易所创业团队', '创业团队往往还没有持牌主体和完整交易栈，容易把前端演示当成可以展业的交易所。', '先确定市场、对客主体和牌照路径，再决定撮合、托管和开户的交付顺序。', '把牌照路径写在系统范围之前，避免先开发无法上线的交易功能。'),
  ('liquidity-provider', 2, '流动性提供商', '流动性提供商需要稳定的报价、成交和库存接口，很少需要零售开户流程。', '延迟、拒单原因和额度要可观测，方便内部风控。', '交付报价和成交接口、额度控制和对账，不把零售客户关系管理当作必选模块。'),
  ('bank', 3, '银行', '银行的客户主档、核心账户和审计已经存在，交易系统只能作为受控模块接入。', '权限、日志和数据留存要满足银行现有的内部控制。', '明确哪些数据留在核心系统，哪些只在交易模块里产生。'),
  ('fintech', 4, '金融科技公司', '金融科技公司通常已有应用和用户体系，想把交易嵌进去，而不是让客户跳到另一个品牌。', '接口、权限边界和故障时的客户提示要先定义。', '用接口接入交易和账户，保留现有应用的身份系统。'),
  ('asset-manager', 5, '资产管理公司', '资管公司下的是机构指令，关注分账户、授权和成交回报，而不是零售杠杆。', '投资指令、成交和托管对账要能按委托关系追溯。', '做授权审批、分账户和审计报表，不做面向公众的开户增长功能。'),
  ('payment-firm', 6, '支付机构', '支付机构的优势是法币出入金，交易账户必须能和支付账逐笔对上。', '充值、提现、退款和交易结算要使用同一套对账键。', '把名单筛查和提现审核放在资金离开之前，而不是事后补日志。'),
  ('market-maker', 7, '做市商', '做市商关心报价、库存和限额，不对公众承担经纪义务。', '成交明细和库存风险要实时可见。', '交付内部报单和风险限额，不做成面向公众的开户系统。'),
  ('family-office', 8, '家族办公室', '家族办公室要的是多托管账户、审批流和报表，交易频率不是唯一指标。', '谁可以下单、谁可以出金，必须分开授权。', '把审批、托管对账和报表做完整，再考虑交易品种。'),
  ('mining-pool', 9, '矿池运营方', '矿池的主业务是产出分配和提现。若要提供买卖，就变成另一类受监管活动。', '分配、结算币种和提现地址要可追溯。', '先交付分配和提现。面向公众的交易功能必须另案确认资格，不能在矿池后台里默认打开。'),
  ('otc-desk', 10, 'OTC 柜台', 'OTC 柜台用询价和成交确认完成交易，不依赖公开订单簿。', '报价、确认、结算和对手方额度要留痕。', '交付询价、确认和结算，不把柜台系统写成已获许可的公开交易所。'),
  ('prop-firm', 11, '自营机构', '自营机构用自己的资金交易，风险限额和成交回报服务于内部风控。', '策略账户、限额和盈亏要能按内部主体核算。', '只做内部交易和风控。不对公众募资，也不把系统包装成零售理财产品。'),
  ('broker-network', 12, '跨境经纪网络', '跨境网络有多个法律实体和多个市场，每个实体的客户和牌照不能混用。', '订单路由必须知道当前订单属于哪个实体、哪个市场。', '按实体拆分客户、牌照边界和清算账户，禁止用一个全局账户池混放。'),
  ('platform-operator', 13, '平台运营商', '平台运营商把交易模块提供给下游品牌，自己可能是技术方，也可能是持牌主体。', '合同和系统都要写清谁对客、谁保管资产、谁承担投诉。', '多租户的品牌、费率和权限可以配置，对客法律主体不能只是一个可切换的标识。'),
  ('custodian', 14, '托管机构', '托管机构负责资产隔离、授权签名和对账，不负责零售获客。', '入金、出金和余额必须能和链上或上游托管独立核对。', '交付授权、审批和对账。营销开户不是托管系统的核心。'),
  ('integrator', 15, '系统集成商', '集成商把交易能力接进客户已有的客户管理和总账，自己通常不是持牌对客主体。', '接口、字段和责任边界要能写进实施说明。', '交付接口和映射，不在集成项目里把集成商写成客户资产的保管人。'),
  ('prime-broker', 16, '主经纪商', '主经纪商给下游机构提供融资、清算和报告，交易系统必须按下游账户隔离，而不是做成一个零售 App。', '下游账户、保证金、成交和报告要能按客户实体拆开。', '先交付分账户、限额和给下游的成交回报，再考虑是否对公众开户。'),
  ('hedge-fund', 17, '对冲基金', '对冲基金下的是策略指令，关心执行质量、分配和托管对账，不需要获客漏斗。', '指令、分配、成交和托管头寸要能按基金和策略核对。', '做指令、分配和托管对账，不做面向不特定公众的销售页面。'),
  ('neobank', 18, '数字银行', '数字银行已有账户、卡片和客户身份，交易能力只能作为受控模块接到现有核心。', '客户身份、账户余额和交易结算必须沿用银行现有主档。', '用接口接入交易，不平行再建一套开户和账本。'),
  ('wealth-manager', 19, '财富管理机构', '财富管理按客户组合和下单授权运作，交易系统要能按投顾关系和适当性留痕。', '谁能下单、为哪位客户下单、依据哪份授权，必须可追溯。', '把授权、适当性和成交回报做完整，而不是先上零售杠杆。'),
  ('corporate-treasury', 20, '企业司库', '企业司库管理自有资金的收付、兑换和托管，交易对象通常是内部主体而不是零售客户。', '审批流、对手方白名单和对账要按公司内控执行。', '交付内部兑换、支付和托管审批，不把司库系统写成对公众的交易所。'),
  ('insurance', 21, '保险公司', '保险公司若接入交易或托管，必须服从保险资金运用和客户保单账户的隔离规则。', '保单账户、自有资金和交易头寸不能混在一个可随意划转的池子里。', '先写清账户隔离和审批，再决定能否开通面向投保人的交易功能。')
on conflict (slug) do update set
  sort = excluded.sort,
  name = excluded.name,
  job = excluded.job,
  need = excluded.need,
  focus = excluded.focus,
  updated_at = now();

insert into seo_markets (slug, sort, name, area_served, regulator, framework, check_note, source_name, source_url)
values
  ('singapore', 0, '新加坡', 'Singapore', '新加坡金融管理局（MAS）', '数字支付代币服务、资本市场服务和支付服务分属不同牌照。经纪、交易场所和托管往往不是同一张牌。', '先写清业务是撮合、经纪、托管还是只做技术输出。MAS 按活动监管，不按系统名称监管。', 'MAS', 'https://www.mas.gov.sg'),
  ('hong-kong', 1, '香港', 'Hong Kong', '香港证监会（SFC）', '虚拟资产交易平台有专门制度，证券和期货业务适用《证券及期货条例》下的牌照。是否触及证券型代币，会改变牌照路径。', '先区分平台交易、证券经纪和只向专业投资者提供服务。客户类别不同，制度不同。', 'SFC', 'https://www.sfc.hk'),
  ('dubai', 2, '迪拜', 'Dubai', '迪拜虚拟资产监管局（VARA）', '在迪拜（不含 DIFC）开展虚拟资产活动通常要看 VARA 的牌照分类。DIFC 内部由 DFSA 监管，不要把两个辖区写成一个牌照。', '先确认办公和展业主体位于 VARA 辖区还是 DIFC。写错辖区，后面的模块清单没有意义。', 'VARA', 'https://www.vara.ae'),
  ('abu-dhabi', 3, '阿布扎比', 'Abu Dhabi', '阿布扎比全球市场金融服务监管局（FSRA）', 'ADGM 内的虚拟资产和金融服务活动由 FSRA 发牌。ADGM 的许可不自动等于迪拜本土或其他酋长国的许可。', '先确认主体、客户和推广行为是否都在 ADGM 框架内。辖区不能靠服务器位置来声称。', 'ADGM', 'https://www.adgm.com'),
  ('london', 4, '伦敦', 'United Kingdom', '英国金融行为监管局（FCA）', '金融推广、支付和投资业务分别受 FCA 规则约束。面向英国客户的加密资产金融推广要求严格，技术公司不能代替持牌推广主体。', '先确认谁对英国客户做推广、谁持有相关许可。系统白标不能代替金融推广的责任主体。', 'FCA', 'https://www.fca.org.uk'),
  ('tokyo', 5, '东京', 'Japan', '日本金融厅（FSA）', '加密资产交换业需要注册。证券型代币和衍生品可能落入金融商品交易法。向日本居民提供服务前要先确定是否构成该法下的业务。', '先确认客户是否为日本居民，以及资产属于加密资产交换、证券还是衍生品。', 'FSA', 'https://www.fsa.go.jp'),
  ('seoul', 6, '首尔', 'South Korea', '韩国金融委员会（FSC）', '虚拟资产服务商通常要向金融情报院申报并遵守反洗钱要求，证券型业务另看资本市场规则。以 FSC 当时的公开要求为准。', '先确认服务是否面向韩国用户，以及是否已经完成申报和实名相关安排。不要用技术架构回避申报义务。', 'FSC', 'https://www.fsc.go.kr'),
  ('sydney', 7, '悉尼', 'Australia', '澳大利亚证券与投资委员会（ASIC）', '金融服务、衍生品和外汇面向零售客户时，有授权和产品设计方面的限制。加密资产是否构成金融产品，要按资产实质判断。', '先判断产品是不是金融产品，客户是不是零售客户。零售衍生品和外汇不能按机构柜台的方式直接套用。', 'ASIC', 'https://asic.gov.au'),
  ('zurich', 8, '苏黎世', 'Switzerland', '瑞士金融市场监督管理局（FINMA）', '银行、证券和 DLT 交易设施分轨监管。代币是支付、实用还是资产型，会改变适用规则。', '先做代币定性，再选择银行、证券或 DLT 交易设施路径。不能用一个交易所模板覆盖全部代币。', 'FINMA', 'https://www.finma.ch'),
  ('toronto', 9, '多伦多', 'Canada', '安大略证券委员会（OSC）', '加拿大证券监管以省为单位。面向加拿大客户的加密资产交易平台，通常要按证券或衍生品路径评估注册义务。OSC 是安大略的主要入口，其他省份可能同时适用。', '先列出客户所在省份。只对照安大略，不能代表已经覆盖加拿大其他省。', 'OSC', 'https://www.osc.ca'),
  ('malta', 10, '马耳他', 'Malta', '马耳他金融服务管理局（MFSA）', '在马耳他或向欧盟客户提供加密资产服务，需要同时符合 MFSA 的规则和欧盟 MiCA。证券和投资服务另有授权。', '先确认是向欧盟客户护照通行，还是只在马耳他本地展业。MiCA 的服务类别要逐项勾选。', 'MFSA', 'https://www.mfsa.mt'),
  ('vilnius', 11, '维尔纽斯', 'Lithuania', '立陶宛银行', '在立陶宛开展加密资产服务，要符合立陶宛银行的监管和欧盟 MiCA。支付与电子货币另有牌照。', '先把加密资产服务和支付牌照分开写。一个电子货币牌照不等于可以经营交易场所。', 'Bank of Lithuania', 'https://www.lb.lt'),
  ('paris', 12, '巴黎', 'France', '法国金融市场管理局（AMF）', '投资服务看 AMF，加密资产服务同时受 MiCA 约束。支付和银行业务的一部分还涉及 ACPR。先分清活动类型。', '先确认活动落在投资服务、加密资产服务还是支付。三套规则不要并成一个许可编号。', 'AMF', 'https://www.amf-france.org'),
  ('frankfurt', 13, '法兰克福', 'Germany', '德国联邦金融监管局（BaFin）', '证券、银行类业务以及欧盟 MiCA 下的加密资产服务，通常要对照 BaFin 的许可或通知要求。类别取决于是经纪、交易场所、托管还是只提供技术。', '先确认对客主体、客户是零售还是机构，以及产品是证券、衍生品、外汇还是加密资产。', 'BaFin', 'https://www.bafin.de'),
  ('amsterdam', 14, '阿姆斯特丹', 'Netherlands', '荷兰金融市场管理局（AFM）', '行为监管中由 AFM 负责的部分，以及欧盟 MiCA 下的加密资产服务，需要按业务实质分别核对。技术供应商不是当然的持牌主体。', '先确认谁向荷兰客户提供服务。只把服务器放在荷兰，不会自动形成合规。', 'AFM', 'https://www.afm.nl'),
  ('dublin', 15, '都柏林', 'Ireland', '爱尔兰中央银行', '在欧盟提供加密资产服务需符合 MiCA，证券和投资服务另有授权要求。以中央银行当时的授权名单和规则为准。', '先在授权名单上核对法律主体，而不是核对品牌名。白标品牌通常没有独立牌照。', 'Central Bank of Ireland', 'https://www.centralbank.ie'),
  ('luxembourg', 16, '卢森堡', 'Luxembourg', '卢森堡金融监管委员会（CSSF）', '基金、银行和投资服务是 CSSF 的常见范围。加密资产服务还需符合 MiCA。技术输出方不等于持牌金融机构。', '先确认主体是基金、银行、投资公司还是技术供应商。不同主体能开通的模块不同。', 'CSSF', 'https://www.cssf.lu'),
  ('cayman', 17, '开曼', 'Cayman Islands', '开曼群岛金融管理局（CIMA）', '基金、证券和虚拟资产相关业务可能落入 CIMA 的不同法案。注册地在开曼，不等于可以向任意国家的零售客户无牌展业。', '先确认客户所在地和招揽行为发生地。开曼实体的登记不能自动覆盖其他市场的推广。', 'CIMA', 'https://www.cima.ky'),
  ('bermuda', 18, '百慕大', 'Bermuda', '百慕大金融管理局（BMA）', '数字资产商业活动通常涉及 BMA 的牌照或许可。对境外客户展业仍要遵守客户所在地的推广规则。', '先分开写百慕大牌照覆盖的活动，以及客户所在地对推广的额外要求。', 'BMA', 'https://www.bma.bm'),
  ('sao-paulo', 19, '圣保罗', 'Brazil', '巴西央行（BCB）', '虚拟资产服务与支付安排主要看巴西央行的登记和规则，证券型代币和证券经纪还要看 CVM。上线前要先分清资产是支付型还是证券型。', '先做资产定性，再决定主要对照 BCB 还是 CVM。一个交易界面里可能同时有两类资产。', 'BCB', 'https://www.bcb.gov.br'),
  ('new-york', 20, '纽约', 'United States (New York)', '纽约州金融服务局（NYDFS）', '在纽约开展虚拟货币业务通常要看 BitLicense 或有限目的信托章程。联邦层面还有 FinCEN 的 MSB 登记，证券和衍生品另看 SEC 与 CFTC。州许可不等于联邦登记，也不覆盖其他州。', '先确认客户、招揽和实体是否触及纽约州。纽约许可不能拿来声称已经获得美国全国牌照。', 'NYDFS', 'https://www.dfs.ny.gov'),
  ('gibraltar', 21, '直布罗陀', 'Gibraltar', '直布罗陀金融服务委员会（GFSC）', '分布式账本技术服务提供商在直布罗陀有专门制度。拿到本地许可，不等于可以向欧盟或英国零售客户无限制招揽。', '先分开写直布罗陀许可覆盖的活动，以及客户所在地的推广规则。', 'GFSC', 'https://www.fsc.gi'),
  ('tallinn', 22, '塔林', 'Estonia', '爱沙尼亚金融监督局（Finantsinspektsioon）', '在爱沙尼亚提供加密资产服务需符合欧盟 MiCA 和金融监督局的授权。虚拟资产服务商的旧登记不能自动当成 MiCA 许可。', '先在授权名单核对法律主体和 MiCA 服务类别，不要沿用已经失效的旧登记编号。', 'Finantsinspektsioon', 'https://www.fi.ee'),
  ('kuala-lumpur', 23, '吉隆坡', 'Malaysia', '马来西亚证券监督委员会（SC）', '数字资产交易所和认可以数字资产在马来西亚主要由证监会监管，支付与电子货币另看国家银行。证券型代币可能同时落入资本市场规则。', '先区分数字资产交易、支付和证券发行。一张电子钱包许可不等于可以开交易所。', 'SC Malaysia', 'https://www.sc.com.my'),
  ('labuan', 24, '纳闽', 'Labuan', '纳闽金融服务管理局（Labuan FSA）', '纳闽作为马来西亚离岸金融中心，数字资产和金融服务有单独的发牌框架。纳闽许可不自动覆盖马来西亚本土零售客户。', '先确认客户和推广是否只在纳闽框架内。面向半岛客户的招揽要另案对照证监会和国家银行。', 'Labuan FSA', 'https://www.labuanfsa.gov.my'),
  ('bangkok', 25, '曼谷', 'Thailand', '泰国证券交易委员会（SEC）', '数字资产业务在泰国主要由证监会发牌，类别包括经纪、交易中心、经销和顾问等。支付业务另有其他主管机关。', '先按活动勾选牌照类别，不要用一个交易界面同时声称覆盖全部数字资产活动。', 'SEC Thailand', 'https://www.sec.or.th'),
  ('jakarta', 26, '雅加达', 'Indonesia', '印尼金融服务管理局（OJK）', '加密资产交易已纳入 OJK 的金融监管范围，不再只按商品期货路径理解。证券和融资业务另有规则。', '先确认对客主体是否已在 OJK 框架下登记，以及产品是加密资产、证券还是支付。', 'OJK', 'https://www.ojk.go.id'),
  ('mumbai', 27, '孟买', 'India', '印度金融情报中心（FIU-IND）', '印度对虚拟数字资产服务商有反洗钱登记和报告义务，入口是 FIU-IND。证券与投资顾问另看 SEBI，支付系统另看储备银行。', '先确认是否构成虚拟数字资产服务并向 FIU-IND 履行义务。完成反洗钱登记不等于获得证券经纪牌照。', 'FIU-IND', 'https://fiuindia.gov.in'),
  ('nicosia', 28, '尼科西亚', 'Cyprus', '塞浦路斯证券交易委员会（CySEC）', '投资公司和加密资产服务在塞浦路斯分别对应 CySEC 授权和欧盟 MiCA。CIF 牌照不等于自动覆盖全部加密资产服务。', '先把投资服务和 MiCA 服务类别分开核对。白标品牌通常不是被授权主体。', 'CySEC', 'https://www.cysec.gov.cy'),
  ('madrid', 29, '马德里', 'Spain', '西班牙国家证券市场委员会（CNMV）', '投资服务看 CNMV，加密资产服务同时受 MiCA 约束，反洗钱登记另有主管机关。三类义务不能写成一张牌。', '先确认活动是投资服务、加密资产服务还是仅技术输出。面向西班牙客户的推广主体必须写明。', 'CNMV', 'https://www.cnmv.es'),
  ('milan', 30, '米兰', 'Italy', '意大利全国公司与交易所委员会（CONSOB）', '投资服务和公开发行由 CONSOB 监管，加密资产服务需符合 MiCA，银行与支付还涉及意大利银行。', '先确认谁向意大利客户提供服务。把服务器放在意大利不会自动形成授权。', 'CONSOB', 'https://www.consob.it'),
  ('warsaw', 31, '华沙', 'Poland', '波兰金融监督局（KNF）', '投资公司和加密资产服务在波兰要对照 KNF 与欧盟 MiCA。虚拟资产服务商的旧登记制度不能直接当成现行授权。', '先在现行授权框架下核对法律主体和服务类别，不要沿用过期登记。', 'KNF', 'https://www.knf.gov.pl'),
  ('vienna', 32, '维也纳', 'Austria', '奥地利金融市场管理局（FMA）', '投资服务、加密资产服务和部分托管活动由 FMA 对照欧盟规则发牌或通知。技术供应商不是当然的持牌主体。', '先确认对客主体、客户所在地和资产类型。奥地利授权不自动覆盖其他欧盟零售招揽细节。', 'FMA Austria', 'https://www.fma.gv.at'),
  ('liechtenstein', 33, '列支敦士登', 'Liechtenstein', '列支敦士登金融市场管理局（FMA）', '区块链服务和金融服务在列支敦士登有专门法律，同时受欧洲经济区规则约束。本地许可仍要看客户所在地的推广限制。', '先写清许可覆盖的代币和服务类别，以及是否向其他欧洲经济区国家护照通行。', 'FMA Liechtenstein', 'https://www.fma-li.li'),
  ('mauritius', 34, '毛里求斯', 'Mauritius', '毛里求斯金融服务委员会（FSC）', '投资交易商、托管和虚拟资产服务在毛里求斯可能落入 FSC 的不同牌照。注册地在毛里求斯，不等于可向任意国家零售客户招揽。', '先确认客户所在地和招揽发生地。毛里求斯牌照不能自动覆盖其他市场的推广。', 'FSC Mauritius', 'https://www.fscmauritius.org'),
  ('nassau', 35, '拿骚', 'Bahamas', '巴哈马证券委员会（SCB）', '数字资产业务在巴哈马主要对照证券委员会的数字资产框架。对境外客户展业仍要遵守客户所在地规则。', '先分开写巴哈马牌照覆盖的活动，以及目标客户所在地是否允许招揽。', 'SCB', 'https://www.scb.gov.bs'),
  ('johannesburg', 36, '约翰内斯堡', 'South Africa', '南非金融部门行为监管局（FSCA）', '加密资产被纳入金融资产，相关服务提供商通常要向 FSCA 申报或授权。证券和集体投资另有规则。', '先确认是否构成加密资产服务提供商，以及客户是否为南非居民。', 'FSCA', 'https://www.fsca.co.za'),
  ('astana', 37, '阿斯塔纳', 'Kazakhstan (AIFC)', '阿斯塔纳国际金融中心金融服务管理局（AFSA）', 'AIFC 内的金融服务和数字资产活动由 AFSA 发牌。该许可覆盖的是中心框架，不等于哈萨克斯坦全境或其他国家的零售许可。', '先确认主体、客户和合同是否都在 AIFC 框架内。不要把 AFSA 许可写成全国或跨境通行证。', 'AFSA', 'https://www.afsa.kz'),
  ('lisbon', 38, '里斯本', 'Portugal', '葡萄牙证券市场委员会（CMVM）', '投资服务看 CMVM，加密资产服务需符合 MiCA，反洗钱登记另有入口。三类规则要分开勾选。', '先确认活动落在投资服务还是加密资产服务。完成反洗钱登记不等于可以经营交易场所。', 'CMVM', 'https://www.cmvm.pt'),
  ('auckland', 39, '奥克兰', 'New Zealand', '新西兰金融市场管理局（FMA）', '金融服务提供商需要登记，投资建议、衍生品和托管可能还要额外许可。加密资产是否构成金融产品，按资产实质判断。', '先判断产品是不是金融产品，以及谁向新西兰客户提供建议或交易服务。', 'FMA New Zealand', 'https://www.fma.govt.nz')
on conflict (slug) do update set
  sort = excluded.sort,
  name = excluded.name,
  area_served = excluded.area_served,
  regulator = excluded.regulator,
  framework = excluded.framework,
  check_note = excluded.check_note,
  source_name = excluded.source_name,
  source_url = excluded.source_url,
  updated_at = now();
