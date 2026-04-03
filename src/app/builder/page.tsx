import { Suspense } from "react";

import { SiteHeader } from "@/components/layout/site-header";
import { BuilderWorkspace } from "@/components/sections/builder-workspace";

export default function BuilderPage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <Suspense fallback={null}>
        <BuilderWorkspace />
      </Suspense>
    </main>
  );
}
