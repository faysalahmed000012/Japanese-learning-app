export const dynamic = "force-dynamic";
import { Card, CardHeader } from "@/components/ui/card";
import { getAllTutorials } from "@/services/TutorialServices";

const TutorialPage = async () => {
  const data = await getAllTutorials();
  const tutorials = data?.data;
  console.log(tutorials);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutorials?.map((tutorial) => (
        <Card
          key={tutorial._id}
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <CardHeader className="p-0">
            <div className="relative pb-[56.25%]">
              <iframe
                src={`https://www.youtube.com/embed/${tutorial.link}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default TutorialPage;
