import AppLayout from "./components/common/AppLayout";
import CreateBundleCard from "./components/CreateBundleCard";
import FeaturedBundles from "./components/FeaturedBundles";

export default function Home() {
  return (
    <AppLayout>
      <main className="w-full min-h-screen relative overflow-hidden">
        <span className="mt-20 block" />
        <FeaturedBundles />
        <br />
        {/* <br /> */}
        <div className="p-2">
          <CreateBundleCard />
        </div>
      </main>
    </AppLayout>
  );
}
