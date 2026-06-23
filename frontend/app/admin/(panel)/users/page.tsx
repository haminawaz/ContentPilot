"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Eye, Ban, CheckCircle2, Trash2 } from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import type { AdminUserRow, Paginated } from "@/types/admin";
import { useToast } from "@/components/ui/Toast";
import {
  SearchInput,
  Pagination,
  StatusBadge,
  TableSkeleton,
  EmptyState,
  ConfirmModal,
  useDebounced,
} from "@/components/admin/ui";

const PAGE_SIZE = 10;

export default function AdminUsersPage() {
  const { showToast, ToastContainer } = useToast();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounced(search);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Paginated<AdminUserRow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [toDelete, setToDelete] = useState<AdminUserRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(
    async (p: number, q: string) => {
      setLoading(true);
      try {
        const res = await adminApi.users.list(p, PAGE_SIZE, q);
        setData(res.response.data);
      } catch (e) {
        showToast(
          e instanceof Error ? e.message : "Failed to load users",
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

  const toggleStatus = async (u: AdminUserRow) => {
    const next = u.status === "active" ? "blocked" : "active";
    setBusyId(u.id);
    try {
      await adminApi.users.updateStatus(u.id, next);
      showToast(`User ${next === "blocked" ? "blocked" : "activated"}.`, "success");
      load(page, debouncedSearch);
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Update failed", "error");
    } finally {
      setBusyId(null);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await adminApi.users.remove(toDelete.id);
      showToast("User deleted.", "success");
      setToDelete(null);
      const nextPage =
        data && data.data.length === 1 && page > 1 ? page - 1 : page;
      setPage(nextPage);
      load(nextPage, debouncedSearch);
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-[18px] font-semibold text-ink-black tracking-mc-tight">
            Users
          </h2>
          <p className="text-[13px] text-slate-gray">
            Manage registered accounts and their access.
          </p>
        </div>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name or status…"
        />
      </div>

      <div className="rounded-2xl border border-ink-black/8 bg-lifted-cream overflow-hidden">
        {/* header row */}
        <div className="hidden md:grid grid-cols-[1fr_120px_140px_160px] gap-4 px-4 py-3 border-b border-ink-black/5 text-[11px] font-semibold uppercase tracking-mc-wide text-slate-gray">
          <span>Name</span>
          <span>Status</span>
          <span>Joined</span>
          <span className="text-right">Actions</span>
        </div>

        {loading ? (
          <TableSkeleton rows={PAGE_SIZE} cols={4} />
        ) : !data || data.data.length === 0 ? (
          <EmptyState message="No users found." />
        ) : (
          <div className="divide-y divide-ink-black/5">
            {data.data.map((u) => (
              <div
                key={u.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_120px_140px_160px] gap-2 md:gap-4 px-4 py-3.5 items-center"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-full bg-ink-black text-canvas-cream text-[12px] font-semibold grid place-items-center uppercase shrink-0">
                    {u.first_name?.[0] || "?"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-ink-black truncate">
                      {u.first_name} {u.last_name}
                    </p>
                    <p className="text-[12px] text-slate-gray md:hidden">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <StatusBadge status={u.status} />
                </div>

                <div className="hidden md:block text-[13px] text-slate-gray">
                  {new Date(u.createdAt).toLocaleDateString()}
                </div>

                <div className="flex items-center justify-start md:justify-end gap-1.5">
                  <Link
                    href={`/admin/users/${u.id}`}
                    className="grid place-items-center w-8 h-8 rounded-lg text-slate-gray hover:text-ink-black hover:bg-ink-black/5 transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => toggleStatus(u)}
                    disabled={busyId === u.id}
                    title={u.status === "active" ? "Block user" : "Activate user"}
                    className="grid place-items-center w-8 h-8 rounded-lg text-slate-gray hover:text-ink-black hover:bg-ink-black/5 transition-colors disabled:opacity-40"
                  >
                    {u.status === "active" ? (
                      <Ban className="w-4 h-4" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setToDelete(u)}
                    title="Delete user"
                    className="grid place-items-center w-8 h-8 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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

      <ConfirmModal
        open={!!toDelete}
        title="Delete user"
        message={`Permanently delete ${toDelete?.first_name} ${toDelete?.last_name}? This cannot be undone.`}
        confirmLabel="Delete"
        danger
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => setToDelete(null)}
      />

      <ToastContainer />
    </div>
  );
}
