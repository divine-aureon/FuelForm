import PaidNeuroSettingsPage from "@/components/Pages/NeuroSettings/paid";

export default function FreeNeuroSettingsPage() {
  return (
    <div>
      <PaidNeuroSettingsPage />
      <div className="absolute inset-0 z-30">
      </div>
    </div>
  );
}
