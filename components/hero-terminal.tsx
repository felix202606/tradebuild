const asks = [
  ["64,218.40", "0.8421", 72],
  ["64,216.10", "1.2034", 88],
  ["64,214.75", "0.3310", 36],
  ["64,213.20", "2.5102", 100],
] as const;

const bids = [
  ["64,211.90", "1.9405", 92],
  ["64,210.35", "0.6120", 48],
  ["64,208.80", "3.0217", 100],
  ["64,207.15", "0.4473", 30],
] as const;

export function HeroTerminal() {
  return (
    <div
      aria-hidden="true"
      className="relative rounded-2xl border border-line bg-surface/90 p-5 font-mono text-xs shadow-[0_40px_120px_-40px_rgb(182_243_92/0.35)]"
    >
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-lime" />
          <span className="text-fg">BTC / USDT</span>
        </div>
        <span className="rounded bg-lime/15 px-2 py-0.5 text-lime">+2.41%</span>
      </div>
      <div className="mt-4 grid grid-cols-3 text-muted">
        <span>价格</span>
        <span className="text-right">数量</span>
        <span className="text-right">深度</span>
      </div>
      <div className="mt-2 space-y-1">
        {asks.map(([price, size, depth]) => (
          <div key={price} className="relative grid grid-cols-3 py-1">
            <span className="absolute inset-y-0 right-0 bg-rose-500/10" style={{ width: `${depth}%` }} />
            <span className="relative text-rose-400">{price}</span>
            <span className="relative text-right text-fg/80">{size}</span>
            <span className="relative text-right text-muted">{depth}%</span>
          </div>
        ))}
      </div>
      <div className="my-3 flex items-baseline justify-between border-y border-line py-3">
        <span className="text-xl text-lime">64,212.55</span>
        <span className="text-muted">≈ $64,212.55</span>
      </div>
      <div className="space-y-1">
        {bids.map(([price, size, depth]) => (
          <div key={price} className="relative grid grid-cols-3 py-1">
            <span className="absolute inset-y-0 right-0 bg-lime/10" style={{ width: `${depth}%` }} />
            <span className="relative text-lime">{price}</span>
            <span className="relative text-right text-fg/80">{size}</span>
            <span className="relative text-right text-muted">{depth}%</span>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4 text-center">
        <div>
          <p className="text-muted">撮合</p>
          <p className="mt-1 text-fg">现货 · 合约</p>
        </div>
        <div>
          <p className="text-muted">托管</p>
          <p className="mt-1 text-fg">MPC 多签</p>
        </div>
        <div>
          <p className="text-muted">风控</p>
          <p className="mt-1 text-fg">KYC · KYT</p>
        </div>
      </div>
    </div>
  );
}
