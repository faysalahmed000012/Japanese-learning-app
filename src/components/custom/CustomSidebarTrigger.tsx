import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

const CustomSidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button onClick={toggleSidebar} variant="outline" className="w-full">
      <ChevronLeft className="mr-2 h-4 w-4" />
      Collapse
    </Button>
  );
};

export default CustomSidebarTrigger;
