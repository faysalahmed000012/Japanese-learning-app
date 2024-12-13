import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>You have 3 new activities this week.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* This would typically come from an API or database */}
          <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                New lesson added: Basic Phrases
              </p>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                User John Doe completed Lesson 3
              </p>
              <p className="text-sm text-muted-foreground">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                10 new vocabularies added to Lesson 2
              </p>
              <p className="text-sm text-muted-foreground">1 day ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
