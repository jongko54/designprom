import { SiteHeader } from "@/components/layout/site-header";
import { ToolGuidePage } from "@/components/sections/tool-guide-page";
import { getToolGuide } from "@/data/tool-guides";

export default function PhotogradientPage() {
  return (
    <main className="page-frame">
      <SiteHeader />
      <ToolGuidePage guide={getToolGuide("photogradient")} />
    </main>
  );
}
