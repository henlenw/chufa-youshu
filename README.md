# 出发有数

留学与长期出国准备工具。包含完整用户网站、管理后台、行前清单、行李整理、预算计算、兑换码管理、内容设置和销售素材。手机优先，无需用户注册，不调用 AI 或模型 API。

这是脱敏后的独立部署源码。没有绑定原作者的线上域名、托管账号或数据库，也没有默认管理员密码、有效兑换码或客户数据。数据库迁移只创建空表。

## 功能

- 99 条内置提示，按出行目的、气候和住宿筛选；可编辑、勾选和增删。
- 行李数量与重量整理；一次性支出、每月支出、预留比例和手动汇率计算。
- 个人计划保存在浏览器本机，可导出文件或复制、粘贴完整备份。
- `/admin` 独立管理后台：批量生成、禁用、删除和导出兑换码；修改价格、文案、FAQ、公告和功能开关。
- 管理密码校验、HttpOnly 会话和来源检查在服务端执行。共享兑换码属于轻量访问机制，不承诺防破解。
- 使用统计为累计事件，不等于人数、销量或收入。

## 技术与运行环境

React、TypeScript、Vinext / Vite、Cloudflare Workers 和 D1。UI 使用 Radix 与 shadcn 风格组件。Node.js 建议 22.18 或更高版本，便于直接运行 TypeScript 规则测试。

Vinext 为 beta 版本，已通过本项目构建检查，但后续升级需要重新验证。原托管平台的连接器与登录辅助代码已移除；本项目使用自己的管理员密码，不依赖第三方账号登录。

## 本地运行

```sh
npm ci
```

复制 `.dev.vars.example` 为 `.dev.vars`，自行设置 `ADMIN_PASSWORD`。不要使用示例或弱密码。可用下面命令在自己的电脑生成随机值，再写入本地文件：

```sh
node -e "console.log(require('node:crypto').randomBytes(24).toString('hex'))"
```

初始化本地空数据库，然后启动：

```sh
npm run db:migrate:local
npm run dev
```

打开终端显示的本地网址。管理入口为 `/admin`，使用刚刚设置的本地密码。新数据库没有兑换码，请在后台生成。

```sh
npm test
npm run typecheck
npm run build
```

## 部署到自己的 Cloudflare

源码默认数据库 ID 是无权限占位值，仅供本地开发。线上部署前必须换成自己的数据库。

```sh
npx wrangler login
npx wrangler d1 create chufa-local
```

将返回的数据库 ID 填入本地 `wrangler.jsonc` 的 `database_id`，确认数据库名一致；将 Worker `name` 改为自己想要的名字。对自己新建的数据库执行迁移：

```sh
npm run db:migrate:remote
npm run build
```

为生成的 Worker 配置管理员密码并部署：

```sh
npx wrangler secret put ADMIN_PASSWORD --config dist/server/wrangler.json
npm run deploy
```

按 Wrangler 的交互提示设置秘密。某些账号第一次设置秘密时会提示创建 Worker，请核对名称是自己的新项目。密码不能写入公开配置或仓库。后续修改源码需重新构建后再部署。

Cloudflare 有免费额度，但请求量、CPU 和数据库使用都有上限；免费额度不代表永久无上限。以 [Workers 定价](https://developers.cloudflare.com/workers/platform/pricing/) 和 [D1 定价](https://developers.cloudflare.com/d1/platform/pricing/) 为准。本仓库不会自动购买域名或开通付费计划。

## 运营与数据

首次部署后，在后台填写真实购买渠道、联系方式、价格和公告。库内的标题与销售素材是可编辑模板，选品评分属于产品判断，不是调查结论或营收保证。

用户清单不上传数据库。换手机、换网址或清除浏览器数据前，应导出或复制完整备份；后台无法代用户恢复本机计划。实际微信、小红书内置浏览器兼容性应由部署者进行真机验证。

模板内容用于个人信息整理，不提供签证、法律、医疗或税务结论。目的地法规、航司和学校要求应由用户核对官方信息。

## 公开前已排除

真实密码和兑换码、账号邮箱与 Token、原站域名和托管项目 ID、本地绝对路径、环境文件、数据库内容、缓存、构建产物、生产验收脚本、内部报告、后台截图及原项目 Git 历史。

仓库保留的是业务源码、必要 UI 组件、空库迁移、依赖锁文件、静态素材和离线规则测试。第三方 CSS 的许可保留在 `vendor/`；其他依赖遵循各自许可证。

## 许可证

项目原创代码采用 MIT，见 [LICENSE](LICENSE)。第三方代码和依赖的原有许可继续适用。旅行主图为本项目生成的素材，不包含用户上传的个人照片。
