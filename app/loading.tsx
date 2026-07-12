import { RadarSweep } from "@/components/mission-control/radar-sweep";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <RadarSweep label="Loading Mission Control…" />
    </div>
  );
}
