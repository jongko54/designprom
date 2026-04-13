import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { R3FMotionLab } from "@/components/sections/r3f-motion-lab";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "React Three Fiber workflow for 3D and gif-style landing pages",
  description:
    "A practical workflow for building 3D, loop-heavy web pages with React Three Fiber and three.js, including prompt packets and a live motion demo.",
  keywords: [
    "react three fiber landing page",
    "three.js website workflow",
    "3d website prompt workflow",
    "gif style web animation"
  ],
  path: "/r3f-motion-lab"
});

export default function R3FMotionLabPage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <R3FMotionLab />
    </main>
  );
}
