import { PageLayout } from "@shared/ui";
import { CardSection, EventVisualizers } from "./ui";
export function DebounceThrottlePlayground() {
  return (
    <PageLayout header={<PageLayout.Header title="Debounce & Throttle" />}>
      <PageLayout.Body className="px-6 py-4">
        <CardSection>
          <EventVisualizers />
        </CardSection>
      </PageLayout.Body>
    </PageLayout>
  );
}
