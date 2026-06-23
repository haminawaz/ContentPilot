"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Ban, CheckCircle2, Trash2, Mail, Calendar, Clock } from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import type { AdminUserDetail } from "@/types/admin";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { StatusBadge, Spinner, ConfirmModal } from "@/components/admin/ui";

function fmt(date: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleString();
}

export default function AdminUserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const { showToast, ToastContainer } = useToast();

  const [user, setUser] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.users.detail(id);
      setUser(res.response.data);
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Failed to load user", "error");
    } finally {
      setLoading(false);
    }
  }, [id, showToast]);

  useEffect(() => {
    if (!Number.isNaN(id)) load();
  }, [id, load]);

  const toggleStatus = async () => {
    if (!user) return;
    const next = user.status === "active" ? "blocked" : "active";
    setBusy(true);
    try {
      await adminApi.users.updateStatus(user.id, next);
      showToast(`User ${next === "blocked" ? "blocked" : "activated"}.`, "success");
      load();
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Update failed", "error");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    setDeleting(true);
    try {
      await adminApi.users.remove(user.id);
      showToast("User deleted.", "success");
      router.push("/admin/users");
    } catch (e) {
      showToast(e instanceof Error ? e.message : "Delete failed", "error");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="grid place-items-center py-24">
        <Spinner className="w-6 h-6 text-slate-gray" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center">
        <p className="text-slate-gray mb-4">User not found.</p>
        <Button href="/admin/users" variant="outline" size="sm">
          Back to users
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-[13px] text-slate-gray hover:text-ink-black transition-colors mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to users
      </Link>

      <div className="rounded-2xl border border-ink-black/8 bg-lifted-cream p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-ink-black/5">
          <span className="w-16 h-16 rounded-2xl bg-ink-black text-canvas-cream text-[22px] font-semibold grid place-items-center uppercase shrink-0">
            {user.first_name?.[0] || "?"}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-[20px] font-semibold text-ink-black tracking-mc-tight">
              {user.first_name} {user.last_name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Mail className="w-3.5 h-3.5 text-slate-gray" />
              <span className="text-[13px] text-slate-gray">{user.email}</span>
            </div>
          </div>
          <StatusBadge status={user.status} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 py-6">
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-slate-gray mt-0.5" />
            <div>
              <p className="text-[12px] text-slate-gray">Joined</p>
              <p className="text-[13px] font-medium text-ink-black">
                {fmt(user.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-slate-gray mt-0.5" />
            <div>
              <p className="text-[12px] text-slate-gray">Last login</p>
              <p className="text-[13px] font-medium text-ink-black">
                {fmt(user.last_login_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleStatus}
            isLoading={busy}
          >
            {user.status === "active" ? (
              <>
                <Ban className="w-4 h-4" /> Block
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" /> Activate
              </>
            )}
          </Button>
          <button
            onClick={() => setConfirmDel(true)}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-mc-button text-[13px] font-medium text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      <ConfirmModal
        open={confirmDel}
        title="Delete user"
        message={`Permanently delete ${user.first_name} ${user.last_name}? This cannot be undone.`}
        confirmLabel="Delete"
        danger
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setConfirmDel(false)}
      />

      <ToastContainer />
    </div>
  );
}
