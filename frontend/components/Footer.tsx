"use client";

import { ChevronDown } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink-black text-canvas-cream pt-[120px] pb-[48px] px-6 md:px-[100px] selection:bg-signal-orange">
      <div className="w-full mx-auto">
        <h2 className="text-[32px] md:text-[48px] mb-[80px] max-w-xl font-medium tracking-mc-tight leading-none">
          Ready to chart your content's trajectory?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-[120px]">
          <div>
            <h4 className="text-[12px] font-bold tracking-mc-wide uppercase text-slate-gray mb-8">
              Capabilities
            </h4>
            <ul className="space-y-4">
              {[
                "Search Labs",
                "Structural Pilot",
                "Native Export",
                "Brand Security",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[15px] hover:text-signal-orange transition-colors duration-300 font-normal opacity-80 hover:opacity-100">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold tracking-mc-wide uppercase text-slate-gray mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {["Features", "Solutions", "Process", "Technical"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-[15px] hover:text-signal-orange transition-colors duration-300 font-normal opacity-80 hover:opacity-100">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-bold tracking-mc-wide uppercase text-slate-gray mb-8">
              Legal
            </h4>
            <ul className="space-y-4">
              {["Terms", "Privacy", "Compliance", "Security"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[15px] hover:text-signal-orange transition-colors duration-300 font-normal opacity-80 hover:opacity-100">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-canvas-cream/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap gap-8 text-[12px] text-slate-gray font-medium tracking-mc-wide">
            <span>© 2026 STRUCTA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
