import { TopSupplements } from "@/components/supplements/TopSupplements";
import { PageContainer } from "@/components/layout/page-container";
import { HeaderWithSettings } from "@/components/layout/header-with-settings";
import { GlassPanel } from "@/components/glass/GlassPanel";

export default function SupplementsPage() {
  return (
    <PageContainer>
      <HeaderWithSettings title="Top Supplements" />
      <GlassPanel>
        <TopSupplements />
      </GlassPanel>
    </PageContainer>
  );
}
