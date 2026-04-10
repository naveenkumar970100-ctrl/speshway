const FoodScreen = () => (
  <div className="h-full bg-gradient-to-b from-orange-950 to-slate-900 flex flex-col text-white overflow-hidden">
    {/* Header */}
    <div className="px-3 pt-2 pb-2">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-[8px] text-orange-400">Deliver to</div>
          <div className="text-[9px] font-bold text-white flex items-center gap-0.5">
            Hyderabad, IN <span className="text-orange-400">▾</span>
          </div>
        </div>
        <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-[10px]">🛒</div>
      </div>
      <div className="bg-slate-800/60 rounded-xl px-2 py-1.5 flex items-center gap-1">
        <span className="text-[9px]">🔍</span>
        <span className="text-[8px] text-muted-foreground">Search restaurants...</span>
      </div>
    </div>

    {/* Promo */}
    <div className="mx-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 p-3 relative overflow-hidden">
      <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-white/10" />
      <div className="text-[9px] font-bold text-white">🎉 FREE DELIVERY</div>
      <div className="text-[7px] text-white/80 mt-0.5">On your first 3 orders</div>
      <div className="mt-1.5 bg-white/20 rounded-lg px-2 py-0.5 w-fit">
        <span className="text-[7px] font-semibold text-white">Order Now</span>
      </div>
    </div>

    {/* Categories */}
    <div className="px-3 mt-2">
      <div className="flex gap-1.5 overflow-x-hidden">
        {[
          { label: "🍕 Pizza", active: true },
          { label: "🍔 Burger", active: false },
          { label: "🍜 Noodles", active: false },
        ].map((c) => (
          <div key={c.label} className={`rounded-xl px-2 py-1 text-[7px] font-medium whitespace-nowrap ${c.active ? "bg-orange-500 text-white" : "bg-white/10 text-white/60"}`}>
            {c.label}
          </div>
        ))}
      </div>
    </div>

    {/* Restaurants */}
    <div className="px-3 mt-2 flex-1">
      <div className="text-[8px] font-semibold text-white/80 mb-1.5">Nearby Restaurants</div>
      {[
        { name: "Pizza Palace", time: "25 min", rating: "4.8", tag: "Free delivery" },
        { name: "Burger Hub", time: "18 min", rating: "4.6", tag: "20% off" },
      ].map((r) => (
        <div key={r.name} className="flex items-center gap-2 bg-white/5 rounded-xl p-2 mb-1.5 border border-white/5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/30 to-red-500/30 flex items-center justify-center text-[12px] shrink-0">
            🍕
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[8px] font-semibold text-white">{r.name}</div>
            <div className="text-[7px] text-white/50">{r.time} • ⭐ {r.rating}</div>
          </div>
          <span className="text-[6px] bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded-full whitespace-nowrap">{r.tag}</span>
        </div>
      ))}
    </div>

    {/* Bottom nav */}
    <div className="flex justify-around py-2 bg-slate-900/90 border-t border-white/5">
      {["🏠", "🔍", "📦", "👤"].map((icon, i) => (
        <div key={i} className={`flex flex-col items-center gap-0.5 ${i === 0 ? "opacity-100" : "opacity-40"}`}>
          <span className="text-[10px]">{icon}</span>
          {i === 0 && <div className="w-1 h-1 rounded-full bg-orange-400" />}
        </div>
      ))}
    </div>
  </div>
);

export default FoodScreen;
