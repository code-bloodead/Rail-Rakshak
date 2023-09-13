import Card from "components/card";

const Footages = () => {
  return (
    <div>
      <div className="mx-3 mt-3 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card extra="min-h-[40vh] ">
          <div className="flex items-center justify-start">
            <h1 className="ml-3 mt-3 text-xl font-bold text-navy-700 dark:text-white">
              Footage 1
            </h1>
          </div>
        </Card>
        <Card extra="min-h-[40vh]">
          <div className="flex items-center justify-start">
            <h1 className="ml-3 mt-3 text-xl font-bold text-navy-700 dark:text-white">
              Footage 2
            </h1>
          </div>
        </Card>
      </div>
      <div className="mx-3 mt-3 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card extra="min-h-[40vh]">
          <div className="flex items-center justify-start">
            <h1 className="ml-3 mt-3 text-xl font-bold text-navy-700 dark:text-white">
              Footage 3
            </h1>
          </div>
        </Card>
        <Card extra="min-h-[40vh]">
          <div className="flex items-center justify-start">
            <h1 className="ml-3 mt-3 text-xl font-bold text-navy-700 dark:text-white">
              Footage 4
            </h1>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Footages;
