import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col h-full animate-pulse">
      <div className="relative h-48">
        <Skeleton className="w-full h-full absolute inset-0" />
      </div>
      <CardHeader>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-20" />
      </CardFooter>
    </Card>
  );
}
