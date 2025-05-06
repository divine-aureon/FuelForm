import PaidNeuroSettingsPage from "@/components/Archive/NeuroSettings/paid";

export default function FreeNeuroSettingsPage() {
  return (
    <div>
      <PaidNeuroSettingsPage />
      <div className="absolute inset-0 z-30">
      </div>
    </div>
  );
}
