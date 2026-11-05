import { Link } from "react-router-dom";
import { useContent } from "../editable";
import { useCollection } from "../data";
import { useTableQuery } from "../lib/table";
import { useSession, signOut } from "../lib/session";
import DashboardLayout from "../components/DashboardLayout";
import DataTable from "../components/DataTable";
import TableFilters, { SearchBox, FilterSelect, Badge } from "../components/TableFilters";
import Icon from "../components/Icon";
import Logo from "../components/Logo";
import { formatPrice } from "../lib/format";
import { usePageMeta } from "../seo";
import type { Piece } from "../types";
import NotSignedIn from "../components/NotSignedIn";
import { cmsNav } from "./cmsNav";

/**
 * The private area: every piece as a table the owner reads down a column,
 * sorts, searches and pages. No hero, no marketing header, no footer — the
 * person here is at work.
 */
export default function CmsPieces() {
  usePageMeta("pages.cms.title");
  const session = useSession();
  const t = useTableQuery({ size: 20, sort: "name" });
  const words = {
    title: useContent("cms.pieces.title"),
    search: useContent("cms.pieces.search"),
    status: useContent("cms.pieces.status"),
    available: useContent("pieces.here"),
    sold: useContent("pieces.sold"),
    add: useContent("cms.pieces.add"),
    empty: useContent("cms.pieces.empty"),
    edit: useContent("cms.pieces.edit"),
    out: useContent("cms.out"),
    name: useContent("cms.pieces.name"),
    kind: useContent("pieces.kind"),
    glaze: useContent("pieces.glaze"),
    price: useContent("pieces.price"),
    of: useContent("cms.pieces.of"),
  };
  const { items, total, pages, page, loading } = useCollection<Piece>("pieces", {
    where: { status: t.get("status") },
    q: t.q,
    search: ["name", "glaze", "kind"],
    sort: t.sort,
    page: t.page,
    pageSize: t.size,
  });

  if (!session) return <NotSignedIn />;

  return (
    <DashboardLayout
      title={words.title}
      nav={cmsNav(words.title, words.add)}
      brand={<Logo />}
      actions={
        <div className="flex items-center gap-[var(--space-2)]">
          <Link
            to="/cms/new"
            data-testid="cms-add"
            className="inline-flex items-center gap-2 bg-accent-strong px-[var(--space-4)] py-[var(--space-2)] text-sm text-accent-ink"
          >
            <Icon name="plus" size={16} />
            {words.add}
          </Link>
          <button
            type="button"
            onClick={signOut}
            aria-label={words.out}
            className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink-soft hover:text-ink"
          >
            <Icon name="logout" size={16} label={words.out} />
          </button>
        </div>
      }
    >
      <TableFilters onClear={t.filtering ? t.clear : undefined}>
        <SearchBox value={t.q} onChange={t.setQ} placeholder={words.search} />
        <FilterSelect
          label={words.status}
          value={t.get("status")}
          onChange={(v) => t.set("status", v)}
          options={[
            ["available", words.available],
            ["sold", words.sold],
          ]}
        />
      </TableFilters>

      <p className="tabular text-sm text-ink-soft" data-testid="cms-total">
        {`${total === 0 ? "0" : `${(page - 1) * t.size + 1}\u2013${Math.min(page * t.size, total)}`} ${words.of} ${total}`}
      </p>

      <DataTable<Piece>
        caption={words.title}
        columns={[
          { key: "name", label: words.name, sortable: true },
          { key: "kind", label: words.kind, sortable: true, secondary: true },
          { key: "glaze", label: words.glaze, secondary: true },
          {
            key: "price",
            label: words.price,
            sortable: true,
            align: "right",
            render: (r) => <span className="tabular">{formatPrice(r.price)}</span>,
          },
          {
            key: "status",
            label: words.status,
            sortable: true,
            render: (r) => <Badge tone={r.status === "sold" ? "neutral" : "good"}>{r.status === "sold" ? words.sold : words.available}</Badge>,
          },
        ]}
        rows={items}
        rowKey={(r) => r.id}
        total={total}
        page={page}
        pages={pages}
        size={t.size}
        sort={t.sort}
        onSort={t.toggleSort}
        onPage={t.setPage}
        onSize={t.setSize}
        loading={loading}
        empty={words.empty}
        exportName={words.title}
        actions={(r) => (
          <Link to={`/cms/${r.id}`} data-testid={`edit-${r.id}`} className="text-accent-strong hover:underline">
            {words.edit}
          </Link>
        )}
      />
    </DashboardLayout>
  );
}
