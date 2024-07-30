import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { io, Socket } from "socket.io-client";
import { fetchJobs, createJob } from "../services/jobApis";
import { IJob } from "../types/jobTypes";

const SOCKET_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3002";

const useJobs = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isPolling, setIsPolling] = useState<boolean>(false);

  useEffect(() => {
    const fetchInitialJobs = async () => {
      try {
        const jobsData = await fetchJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialJobs();

    const newSocket = io(SOCKET_URL, { query: { clientId: uuidv4() } });

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket");
      setIsPolling(false);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
      setIsPolling(true);
    });

    newSocket.on("jobCompleted", (job: IJob) => {
      console.log("Job completed:", job);
      setJobs((prevJobs) => {
        const updatedJobs = prevJobs.map((j) => (j.id === job.id ? job : j));
        if (!updatedJobs.find((j) => j.id === job.id)) {
          updatedJobs.unshift(job);
        }
        return updatedJobs;
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isPolling) {
      const interval = setInterval(async () => {
        try {
          const jobsData = await fetchJobs();
          setJobs(jobsData);
        } catch (error) {
          console.error(error);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPolling]);

  const createNewJob = async () => {
    try {
      const { id } = await createJob();
      if (!id) return;

      const newJob: IJob = {
        id,
        status: "PENDING",
        imageUrl: null,
        createdAt: new Date().toISOString(),
      };
      setJobs((prevJobs) => [newJob, ...prevJobs]);
    } catch (error) {
      console.error(error);
    }
  };

  return { jobs, loading, createNewJob };
};

export default useJobs;
