import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Page } from "@/components/layout/page";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <Page className="items-center justify-center bg-gray-50 p-6">
      <div className="text-center max-w-sm">
        <div className="text-6xl mb-4">🌱</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! You wandered off the path.</h1>
        <p className="text-gray-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => setLocation("/")} className="w-full">
          Take Me Home 🌸
        </Button>
      </div>
    </Page>
  );
}