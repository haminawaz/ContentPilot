"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  UserX,
  FileText,
  CreditCard,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import type { AdminStats } from "@/types/admin";
import { useToast } from "@/components/ui/Toast";
import { StatCard, StatusBadge, Spinner } from "@/components/admin/ui";

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function AdminDashboardPage() {
  const { showToast, ToastContainer } = useToast();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    adminApi.dashboard
      .stats()
      .then((res) => {
        if (mounted) setStats(res.response.data);
      })
      .catch((e) =>
        showToast(e instanceof Error ? e.message : "Failed to load stats", "error"),
      )
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [showToast]);

  if (loading) {
    return (
      <div className="grid place-items-center py-24">
        <Spinner className="w-6 h-6 text-slate-gray" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="py-16 text-center text-slate-gray">
        Unable to load dashboard statistics.
      </div>
    );
  }

  const t = stats.totals;
  const chartMax = Math.max(
    1,
    ...stats.monthly.map((m) => Math.max(m.users, m.articles)),
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Primary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value={t.totalUsers}
          hint={`+${t.newUsersThisMonth} this month`}
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          label="Active Users"
          value={t.activeUsers}
          hint={`${t.blockedUsers} blocked`}
          icon={<UserCheck className="w-4 h-4" />}
          accent="emerald"
        />
        <StatCard
          label="Articles"
          value={t.totalArticles}
          hint={`+${t.articlesThisMonth} this month`}
          icon={<FileText className="w-4 h-4" />}
          accent="orange"
        />
        <StatCard
          label="Est. MRR"
          value={`$${t.mrr.toLocaleString()}`}
          hint={`${t.activeSubscriptions} active subs`}
          icon={<DollarSign className="w-4 h-4" />}
          accent="emerald"
        />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Blocked Users"
          value={t.blockedUsers}
          icon={<UserX className="w-4 h-4" />}
          accent="red"
        />
        <StatCard
          label="Subscriptions"
          value={t.totalSubscriptions}
          icon={<CreditCard className="w-4 h-4" />}
        />
        <StatCard
          label="Active Subs"
          value={t.activeSubscriptions}
          icon={<TrendingUp className="w-4 h-4" />}
          accent="emerald"
        />
        <StatCard
          label="New This Month"
          value={t.newUsersThisMonth}
          icon={<Users className="w-4 h-4" />}
          accent="orange"
        />
      </div>

      {/* Chart + plan distribution */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-ink-black/8 bg-lifted-cream p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[14px] font-semibold text-ink-black">
              Last 6 months
            </h3>
            <div className="flex items-center gap-4 text-[11px] text-slate-gray">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-ink-black" /> Users
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-signal-orange" />{" "}
                Articles
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-3 h-44">
            {stats.monthly.map((m) => (
              <div
                key={m.key}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full flex items-end justify-center gap-1 h-36">
                  <div
                    className="w-1/2 max-w-7 rounded-t bg-ink-black/85 transition-all"
                    style={{ height: `${(m.users / chartMax) * 100}%` }}
                    title={`${m.users} users`}
                  />
                  <div
                    className="w-1/2 max-w-7 rounded-t bg-signal-orange transition-all"
                    style={{ height: `${(m.articles / chartMax) * 100}%` }}
                    title={`${m.articles} articles`}
                  />
                </div>
                <span className="text-[11px] text-slate-gray">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-ink-black/8 bg-lifted-cream p-5">
          <h3 className="text-[14px] font-semibold text-ink-black mb-4">
            Plan Distribution
          </h3>
          {stats.planDistribution.length === 0 ? (
            <p className="text-[13px] text-slate-gray">No subscriptions yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.planDistribution.map((p) => {
                const total = stats.planDistribution.reduce(
                  (s, x) => s + x.count,
                  0,
                );
                const pct = total > 0 ? (p.count / total) * 100 : 0;
                return (
                  <div key={p.plan_id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-medium text-ink-black">
                        {p.plan_name}
                      </span>
                      <span className="text-[12px] text-slate-gray">
                        {p.count}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-ink-black/8 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-signal-orange"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-ink-black/8 bg-lifted-cream p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold text-ink-black">
              Recent Users
            </h3>
            <Link
              href="/admin/users"
              className="text-[12px] text-signal-orange hover:underline font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-1">
            {stats.recentUsers.length === 0 ? (
              <p className="text-[13px] text-slate-gray">No users yet.</p>
            ) : (
              stats.recentUsers.map((u) => (
                <Link
                  key={u.id}
                  href={`/admin/users/${u.id}`}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-ink-black/5 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-ink-black text-canvas-cream text-[11px] font-semibold grid place-items-center uppercase shrink-0">
                    {u.first_name?.[0] || "?"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-ink-black truncate">
                      {u.first_name} {u.last_name}
                    </p>
                    <p className="text-[12px] text-slate-gray truncate">
                      {u.email}
                    </p>
                  </div>
                  <StatusBadge status={u.status} />
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-ink-black/8 bg-lifted-cream p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold text-ink-black">
              Recent Articles
            </h3>
            <Link
              href="/admin/contents"
              className="text-[12px] text-signal-orange hover:underline font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-1">
            {stats.recentArticles.length === 0 ? (
              <p className="text-[13px] text-slate-gray">No articles yet.</p>
            ) : (
              stats.recentArticles.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg"
                >
                  <span className="w-8 h-8 rounded-lg bg-signal-orange/10 text-signal-orange grid place-items-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-ink-black truncate">
                      {a.title || a.topic}
                    </p>
                    <p className="text-[12px] text-slate-gray truncate">
                      {a.user.first_name} {a.user.last_name} &middot;{" "}
                      {a.word_count} words
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-gray shrink-0">
                    {timeAgo(a.createdAt)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
