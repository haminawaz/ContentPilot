"use client";

import { useEffect, useState, useCallback } from "react";
import { Trash2, FileText, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { adminApi } from "@/lib/admin-api";
import type {
  AdminContentRow,
  AdminContentDetail,
  Paginated,
} from "@/types/admin";
import { useToast } from "@/components/ui/Toast";
import {
  SearchInput,
  Pagination,
  StatusBadge,
  TableSkeleton,
  EmptyState,
  ConfirmModal,
  Spinner,
  useDebounced,
} from "@/components/admin/ui";

const PAGE_SIZE = 10;

function ContentViewer({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) {
  const { showToast, ToastContainer } = useToast();
  const [detail, setDetail] = useState<AdminContentDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    adminApi.contents
      .detail(id)
      .then((res) => mounted && setDetail(res.response.data))
      .catch((e) =>
        showToast(e instanceof Error ? e.message : "Failed to load", "error"),
      )
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id, showToast]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.div
        className="absolute inset-0 bg-ink-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 360, damping: 38 }}
        className="relative w-full max-w-2xl bg-canvas-cream h-full overflow-y-auto shadow-mc-heavy"
      >
        <div className="sticky top-0 bg-canvas-cream/90 backdrop-blur-xl border-b border-ink-black/5 px-6 py-4 flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-ink-black">
            Article Preview
          </h3>
          <button
            onClick={onClose}
            className="grid place-items-center w-8 h-8 rounded-lg text-slate-gray hover:text-ink-black hover:bg-ink-black/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="grid place-items-center py-24">
            <Spinner className="w-6 h-6 text-slate-gray" />
          </div>
        ) : detail ? (
          <div className="px-6 py-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <StatusBadge status={detail.status} />
              <span className="text-[11px] text-slate-gray bg-ink-black/5 px-2 py-0.5 rounded-full">
                {detail.language}
              </span>
              <span className="text-[11px] text-slate-gray bg-ink-black/5 px-2 py-0.5 rounded-full">
                {detail.word_count} words
              </span>
            </div>
            <h1 className="text-[22px] font-semibold text-ink-black tracking-mc-tight mb-1">
              {detail.title || detail.topic}
            </h1>
            <p className="text-[13px] text-slate-gray mb-1">
              Topic: {detail.topic}
            </p>
            <p className="text-[13px] text-slate-gray mb-5">
              By {detail.user.first_name} {detail.user.last_name} &middot;{" "}
              {detail.user.email}
            </p>
            <div className="prose prose-sm max-w-none whitespace-pre-wrap text-[14px] text-ink-black/90 leading-relaxed border-t border-ink-black/5 pt-5">
              {detail.content}
            </div>
          </div>
        ) : (
          <EmptyState message="Content not found." />
        )}
        <ToastContainer />
      </motion.div>
    </div>
  );
}

export default function AdminContentsPage() {
  const { showToast, ToastContainer } = useToast();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounced(search);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Paginated<AdminContentRow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState<AdminContentRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [viewId, setViewId] = useState<number | null>(null);

  const load = useCallback(
    async (p: number, q: string) => {
      setLoading(true);
      try {
        const res = await adminApi.contents.list(p, PAGE_SIZE, q);
        setData(res.response.data);
      } catch (e) {
        showToast(
          e instanceof Error ? e.message : "Failed to load contents",
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

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await adminApi.contents.remove(toDelete.id);
      showToast("Content deleted.", "success");
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
            Contents
          </h2>
          <p className="text-[13px] text-slate-gray">
            All AI-generated articles across the platform.
          </p>
        </div>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by topic or title…"
        />
      </div>

      <div className="rounded-2xl border border-ink-black/8 bg-lifted-cream overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_160px_90px_120px_110px] gap-4 px-4 py-3 border-b border-ink-black/5 text-[11px] font-semibold uppercase tracking-mc-wide text-slate-gray">
          <span>Article</span>
          <span>Author</span>
          <span>Words</span>
          <span>Created</span>
          <span className="text-right">Actions</span>
        </div>

        {loading ? (
          <TableSkeleton rows={PAGE_SIZE} cols={5} />
        ) : !data || data.data.length === 0 ? (
          <EmptyState message="No content found." />
        ) : (
          <div className="divide-y divide-ink-black/5">
            {data.data.map((c) => (
              <div
                key={c.id}
                className="grid grid-cols-1 md:grid-cols-[1fr_160px_90px_120px_110px] gap-2 md:gap-4 px-4 py-3.5 items-center"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-lg bg-signal-orange/10 text-signal-orange grid place-items-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-ink-black truncate">
                      {c.title || c.topic}
                    </p>
                    <p className="text-[12px] text-slate-gray truncate">
                      {c.language} &middot; {c.topic}
                    </p>
                  </div>
                </div>

                <div className="text-[13px] text-ink-black truncate">
                  {c.user.first_name} {c.user.last_name}
                </div>

                <div className="hidden md:block text-[13px] text-slate-gray">
                  {c.word_count}
                </div>

                <div className="hidden md:block text-[13px] text-slate-gray">
                  {new Date(c.createdAt).toLocaleDateString()}
                </div>

                <div className="flex items-center justify-start md:justify-end gap-1.5">
                  <button
                    onClick={() => setViewId(c.id)}
                    title="Preview"
                    className="grid place-items-center w-8 h-8 rounded-lg text-slate-gray hover:text-ink-black hover:bg-ink-black/5 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setToDelete(c)}
                    title="Delete"
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
        title="Delete content"
        message={`Permanently delete "${toDelete?.title || toDelete?.topic}"? This cannot be undone.`}
        confirmLabel="Delete"
        danger
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => setToDelete(null)}
      />

      <AnimatePresence>
        {viewId !== null && (
          <ContentViewer id={viewId} onClose={() => setViewId(null)} />
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
}
