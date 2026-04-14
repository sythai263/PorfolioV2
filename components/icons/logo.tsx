export const IndividualLogo = ({ className }: { className?: string }) => (
  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FFF4E0] border border-primary/20 flex flex-col items-center justify-center p-2 transition-transform active:scale-95">
    <div className="w-6 h-6 bg-gradient-to-br from-primary to-orange-600 rounded-md rotate-45 flex items-center justify-center shadow-sm">
      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
    </div>
    <span className="text-[6px] font-bold text-primary tracking-widest uppercase mt-1">
      Company
    </span>
  </div>
)
