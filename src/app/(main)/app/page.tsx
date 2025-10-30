import AppLayout from "@/app/components/common/AppLayout";
import CreateBundleCard from "@/app/components/CreateBundleCard";
import FeaturedBundles from "@/app/components/FeaturedBundles";
import UserHomeView from "@/app/components/UserHomeView";
import Welcome from "@/app/components/Welcome";

export default function Home() {
  return (
    <AppLayout>
      <main className="w-full min-h-screen relative overflow-hidden px-2 lg:px-4">
        <UserHomeView />
        <br />
        <FeaturedBundles />
        <br />
        <div className="p-2 pb-20">
          <CreateBundleCard />
        </div>
        <Welcome/>
      </main>
    </AppLayout>
  );
}
