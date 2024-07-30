import React from "react";
import useJobs from "../hooks/useJobs";
import { IJob } from "../types/jobTypes";
import { getFormattedDate, getStatusColor } from "../utils/utils";

const JobList: React.FC = () => {
  const { jobs, loading, createNewJob } = useJobs();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job List</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => createNewJob()}
      >
        Create New Job
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2">ID</th>
              <th className="px-4 py-2 border-b-2">Description</th>
              <th className="px-4 py-2 border-b-2">Created At</th>
              <th className="px-4 py-2 border-b-2">Image</th>
              <th className="px-4 py-2 border-b-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const JobRow: React.FC<{ job: IJob }> = ({ job }) => {
  const getImageContent = () => {
    switch (job.status) {
      case "PENDING":
        return (
          <div className="animate-pulse h-12 w-12 bg-gray-200 rounded-md"></div>
        );
      case "COMPLETED":
        return (
          <img
            src={job.imageUrl || ""}
            alt={job.description || "Job Image"}
            className="w-12 h-12 object-cover rounded-md"
          />
        );
      case "FAILED":
        return (
          <img
            src="/assets/404-error.svg" // Add your default error image in the public/images folder
            alt="Error"
            className="w-12 h-12 object-cover rounded-md"
          />
        );
      default:
        return null;
    }
  };

  const isPending = job.status === "PENDING";
  const isCompleted = job.status === "COMPLETED";

  return (
    <tr>
      <td className="px-4 py-2 border-b">{job.id}</td>
      <td className="px-4 py-2 border-b">
        <div
          className={`${isPending ? "animate-pulse h-6 w-1/2 bg-gray-200 rounded-md" : ""}`}
        >
          {isCompleted ? job.description : ""}
        </div>
      </td>
      <td className="px-4 py-2 border-b">{getFormattedDate(job.createdAt)}</td>
      <td className="px-4 py-2 border-b">{getImageContent()}</td>
      <td
        className={`px-4 py-2 border-b text-bold ${getStatusColor(job.status)}`}
      >
        {" "}
        {job.status}
      </td>
    </tr>
  );
};

export default JobList;
