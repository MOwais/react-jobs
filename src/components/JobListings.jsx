import { useState, useEffect } from "react";
import JobListing from "./JobListing";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const resp = await fetch("http://localhost:8000/jobs");
        const data = await resp.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs data - ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent jobs" : "Browse jobs"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            <h2>Loading...</h2>
          ) : (
            jobs.map((job) => {
              return <JobListing job={job} key={job.id} />;
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
