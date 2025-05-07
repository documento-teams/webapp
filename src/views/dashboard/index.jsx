import Sidebar from "@/components/common/sidebar";
import useWorkspace from "@/hooks/useWorkspace";

const Dashboard = () => {
  const { workspaceList, setWorkspaceList, createWorkspace, getWorkspaceList } =
    useWorkspace();
  return (
    <>
      <div className="flex flex-col w-screen md:flex-row">
        <div className=" md:w-3/4 p-4">
          <h1 className="text-2xl font-bold">Dashboard Content</h1>
          {/* <button onClick={getWorkspaceList}> test </button> */}
          <button onClick={createWorkspace}> test create </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
