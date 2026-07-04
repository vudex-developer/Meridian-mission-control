"use client";

import { useState } from "react";
import { Card } from "@/components/ui/primitives";
import { settingsToggles } from "@/data/seed";
import { founders } from "@/data/seed";

export default function SettingsPage() {
  const [toggles, setToggles] = useState(settingsToggles.map((t) => t.on));

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-[20px] px-[28px] pb-[56px] pt-[26px]">
      <Card className="p-[22px_24px]">
        <div className="mb-4 text-[15px] font-bold">Founders</div>
        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
          {Object.values(founders).map((f) => (
            <div key={f.id} className="flex items-center gap-[14px] rounded-[14px] border border-border bg-bg2 p-[16px]">
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] text-[17px] font-bold text-white" style={{ background: f.gradient }}>{f.letter}</div>
              <div>
                <div className="text-[14.5px] font-semibold">{f.name}</div>
                <div className="text-[12px] text-text3">{f.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-[22px_24px]">
        <div className="mb-4 text-[15px] font-bold">AI COO Settings</div>
        {settingsToggles.map((t, i) => (
          <div key={t.label} className="flex items-center justify-between border-b border-border py-[13px] last:border-0">
            <div>
              <div className="text-[13.5px] font-medium">{t.label}</div>
              <div className="mt-[2px] text-[11.5px] text-text3">{t.desc}</div>
            </div>
            <button
              onClick={() => setToggles((prev) => prev.map((v, idx) => (idx === i ? !v : v)))}
              className="relative h-[23px] w-[40px] shrink-0 rounded-full transition-colors"
              style={{ background: toggles[i] ? "var(--color-accent)" : "rgba(255,255,255,0.12)" }}
              aria-pressed={toggles[i]}
            >
              <span className="absolute top-[2px] h-[19px] w-[19px] rounded-full bg-white transition-[left]" style={{ left: toggles[i] ? 19 : 2 }} />
            </button>
          </div>
        ))}
      </Card>
    </div>
  );
}
