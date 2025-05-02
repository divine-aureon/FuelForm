import PaidStatsEchoPage from "@/components/StatsEcho/paid";

export default function FreeStatsEchoPage() {
  return (
    <div>
      <PaidStatsEchoPage />
      <div className="absolute inset-0 z-30">
      </div>
    </div>
  );
}
