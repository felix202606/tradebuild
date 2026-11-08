# tradebuild

交易系统交付说明站点，面向 [tradebuild.dev](https://tradebuild.dev)。

页面按系统、机构类型和市场组合生成。当前种子数据是 7 类系统、16 类机构和 20 个市场。新增任一维度，都会和其他两个维度自动组合成新页面。

```bash
npm install
npm run dev
```

可选：把 `supabase/migrations/001_programmatic_seo.sql` 应用到 Supabase，并设置 `SUPABASE_URL` 与 `SUPABASE_ANON_KEY`。未配置时使用 `data/dimensions.json`。
