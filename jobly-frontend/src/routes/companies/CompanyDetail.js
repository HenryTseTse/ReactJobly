import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api/api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../../common/LoadingSpinner";

/** Company Detail page.
 *
 * Renders information about company, along with the jobs at that company.
 *
 * Routed at /companies/:handle
 *
 * Routes -> CompanyDetail -> JobCardList
 */

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(function getCompanyAndJobsForUser() {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }

    getCompany();
  }, [handle]);

  // while waiting for company results to load, display loading spinner
  if (!company) return <LoadingSpinner />;

  return (
      <div className="CompanyDetail col-md-8 offset-md-2">
        <h4>{company.name}</h4>
        <p>{company.description}</p>
        <JobCardList jobs={company.jobs} />
      </div>
  );
}

export default CompanyDetail;
