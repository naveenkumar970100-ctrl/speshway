const FintechScreen = () => (
  <div className="h-full bg-gradient-to-b from-slate-950 to-blue-950 flex flex-col text-white overflow-hidden">
    {/* Header */}
    <div className="px-3 pt-2 pb-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[8px] text-blue-400">Portfolio</div>
          <div className="text-[10px] font-bold text-white">FinEdge</div>
        </div>
        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[9px]">🔔</div>
      </div>
    </div>

    {/* Balance card */}
    <div className="mx-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-3 relative overflow-hidden">
      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-white/5" />
      <div className="text-[7px] text-white/70">Total Balance</div>
      <div className="text-[20px] font-bold text-white leading-tight">₹2,45,830</div>
      <div className="flex items-center gap-1 mt-0.5">
        <span className="text-[7px] text-green-300">▲ +3.2%</span>
        <span className="text-[7px] text-white/50">this month</span>
      </div>
      <div className="flex gap-2 mt-2">
        {["Send", "Receive", "Pay"].map((a) => (
          <div key={a} className="bg-white/20 rounded-lg px-2 py-0.5 text-[7px] font-medium text-white">{a}</div>
        ))}
      </div>
    </div>

    {/* Chart */}
    <div className="mx-3 mt-2 bg-white/5 rounded-xl p-2 border border-blue-500/10">
      <div className="text-[7px] text-white/60 mb-1.5">Portfolio Performance</div>
      <div className="flex items-end gap-1 h-10">
        {[40, 55, 35, 70, 50, 80, 65, 90, 75, 95].map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-sm ${i === 9 ? "bg-blue-400" : "bg-blue-500/30"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1">
        {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((m) => (
          <span key={m} className="text-[6px] text-white/30">{m}</span>
        ))}
      </div>
    </div>

    {/* Holdings */}
    <div className="px-3 mt-2 flex-1">
      <div className="text-[8px] font-semibold text-white/80 mb-1.5">Holdings</div>
      {[
        { name: "NIFTY 50", val: "₹85,200", change: "+2.1%", up: true },
        { name: "Bitcoin", val: "₹1,20,500", change: "+5.4%", up: true },
        { name: "Gold ETF", val: "₹40,130", change: "-0.3%", up: false },
      ].map((h) => (
        <div key={h.name} className="flex items-center justify-between py-1.5 border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[8px]">📈</div>
            <span className="text-[8px] font-medium text-white">{h.name}</span>
          </div>
          <div className="text-right">
            <div className="text-[8px] font-semibold text-white">{h.val}</div>
            <div className={`text-[7px] ${h.up ? "text-green-400" : "text-red-400"}`}>{h.change}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Bottom nav */}
    <div className="flex justify-around py-2 bg-slate-950/90 border-t border-white/5">
      {["🏠", "📊", "💳", "👤"].map((icon, i) => (
        <div key={i} className={`flex flex-col items-center gap-0.5 ${i === 0 ? "opacity-100" : "opacity-40"}`}>
          <span className="text-[10px]">{icon}</span>
          {i === 0 && <div className="w-1 h-1 rounded-full bg-blue-400" />}
        </div>
      ))}
    </div>
  </div>
);

export default FintechScreen;
