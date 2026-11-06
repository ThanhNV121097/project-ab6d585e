import type { NavGroup } from "../components/DashboardLayout";

/** The private area's menu: the two things the owner does here. */
export function cmsNav(pieces: string, add: string): NavGroup[] {
  return [{ items: [{ to: "/cms", label: pieces }, { to: "/cms/new", label: add }] }];
}
