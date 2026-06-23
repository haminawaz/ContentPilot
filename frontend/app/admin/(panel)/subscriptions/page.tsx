"use client";

import { useEffect, useState, useCallback } from "react";
import { adminApi } from "@/lib/admin-api";
import type { AdminSubscriptionRow, Paginated } from "@/types/admin";
import { useToast } from "@/components/ui/Toast";
import {
  SearchInput,
  Pagination,
  StatusBadge,
  TableSkeleton,
  EmptyState,
  useDebounced,
} from "@/components/admin/ui";

const PAGE_SIZE = 10;

function fmtDate(d: string | null) {
  return d ? new Date(d).toLocaleDateString() : "—";
}

export default function AdminSubscriptionsPage() {
  const { showToast, ToastContainer } = useToast();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounced(search);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Paginated<AdminSubscriptionRow> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(
    async (p: number, q: string) => {
      setLoading(true);
      try {
        const res = await adminApi.subscriptions.list(p, PAGE_SIZE, q);
        setData(res.response.data);
      } catch (e) {
        showToast(
          e instanceof Error ? e.message : "Failed to load subscriptions",
          "error",
        );
      } finally {
        setLoading(false);
      }
    },
    [showToast],
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    load(page, debouncedSearch);
  }, [page, debouncedSearch, load]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-[18px] font-semibold text-ink-black tracking-mc-tight">
            Subscriptions
          </h2>
          <p className="text-[13px] text-slate-gray">
            Active and historical plan subscriptions.
          </p>
        </div>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by user, plan or status…"
        />
      </div>

      <div className="rounded-2xl border border-ink-black/8 bg-lifted-cream overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_120px_100px_110px_130px] gap-4 px-4 py-3 border-b border-ink-black/5 text-[11px] font-semibold uppercase tracking-mc-wide text-slate-gray">
          <span>Subscriber</span>
          <span>Plan</span>
          <span>Credits</span>
          <span>Status</span>
          <span>Renews</span>
        </div>

        {loading ? (
          <TableSkeleton rows={PAGE_SIZE} cols={5} />
        ) : !data || data.data.length === 0 ? (
          <EmptyState message="No subscriptions found." />
        ) : (
          <div className="divide-y divide-ink-black/5">
            {data.data.map((s) => (
              <div
                key={s.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_120px_100px_110px_130px] gap-2 md:gap-4 px-4 py-3.5 items-center"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-full bg-ink-black text-canvas-cream text-[12px] font-semibold grid place-items-center uppercase shrink-0">
                    {s.user.first_name?.[0] || "?"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-ink-black truncate">
                      {s.user.first_name} {s.user.last_name}
                    </p>
                    <p className="text-[12px] text-slate-gray truncate">
                      {s.user.email}
                    </p>
                  </div>
                </div>

                <div className="text-[13px] font-medium text-ink-black">
                  {s.plan.plan_name}
                  <span className="text-slate-gray font-normal">
                    {" "}
                    ${s.plan.price}/{s.plan.interval}
                  </span>
                </div>

                <div className="text-[13px] text-slate-gray">
                  {s.credits_remaining}/{s.plan.credit_limit}
                </div>

                <div>
                  <StatusBadge status={s.status} />
                </div>

                <div className="text-[13px] text-slate-gray">
                  {fmtDate(s.current_period_end)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {data && (
        <Pagination
          page={data.page}
          totalPages={data.totalPages}
          total={data.total}
          onPage={setPage}
        />
      )}

      <ToastContainer />
    </div>
  );
}
