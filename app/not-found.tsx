import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { StatusIndicator } from "@/components/mission-control/status-indicator";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <StatusIndicator status="offline" label="Signal Lost" />
      <h1 className="text-h1 font-semibold text-text-primary">404 — Telemetry dropout</h1>
      <p className="max-w-md text-body text-text-secondary">
        This route isn&apos;t transmitting. It may not have been built yet, or the link is out of date.
      </p>
      <Button asChild>
        <Link href="/">Return to Mission Control</Link>
      </Button>
    </Container>
  );
}
