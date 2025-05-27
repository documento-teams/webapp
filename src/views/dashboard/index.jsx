import Sidebar from "@/components/common/sidebar";
import Input from "@/components/form/input";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 p-4">
          <h1 className="text-2xl font-bold">Dashboard Content</h1>
          <Input/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
