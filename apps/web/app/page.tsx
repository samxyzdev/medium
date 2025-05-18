import { TopBar } from "../components/TopBar";
import { TabBar } from "../components/TabBar";
import { BlogCard } from "../components/BlogCard";
import { RightCard } from "../components/RightCard";

export default function Home() {
  return (
    <div>
      <TopBar />
      <div className="flex gap-5 ">
        <div className="ml-4">
          <TabBar tabName="For you" />
          <BlogCard
            authorName={"Rico Fritzsche"}
            title={
              "Mastering PostgreSQL Row-Level Security (RLS) for Rock-SoligMulti-Tenancy"
            }
            description={
              "How to Safeguard Saas Data from Cross-Tenant Leaks by Enforcing Strict Tenant Isolation at the Database Layer"
            }
          />
        </div>
        <div className="pt-10 border-l border-gray-200 pl-10 hidden lg:block">
          <div className="font-bold">Staff Picks</div>
          <RightCard
            authorName={"James Horton, Ph.D"}
            title={
              "Things You Learn From Skimming 1350 Academy Jouranl Articles"
            }
          />
        </div>
      </div>
    </div>
  );
}
