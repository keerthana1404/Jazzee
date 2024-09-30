import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );
console.log("Component re-rendered");
  const { jobId } = useParams();
  // console.log("jobId:", jobId);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
      setResume((user.resume && user.resume.url) || "");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId, user]);

  //   if (!singleJob) {
  //   return <p>Loading job details...</p>; // or a loading spinner
  // }
  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (error) {
    return <p>Error fetching job details: {error}</p>;
  }

  if (!singleJob || Object.keys(singleJob).length === 0) {
    return <p>No job found.</p>;
  }


  let qualifications = [];
  let responsibilities = [];
  let offering = [];
  if (singleJob.qualifications) {
    qualifications = singleJob.qualifications.split(". ");
  }
  if (singleJob.responsibilities) {
    responsibilities = singleJob.responsibilities.split(". ");
  }
  if (singleJob.offers) {
    offering = singleJob.offers.split(". ");
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  // useEffect(() => {
  //   console.log("Is Authenticated:", isAuthenticated);
  //   if (user) {
  //     console.log("User Role:", user.role);
  //   } else {
  //     console.log("User is not defined");
  //   }
  //   console.log("Loading state:", loading);
  // }, [isAuthenticated, user, loading]);


  // console.log(user.role)
  return (
    <>
    {/* {isAuthenticated}
    {name} */}
      <article className="application_page">
        <form>
          <h3>Application Form</h3>
          <div>
            <label>Job Title</label>
            <input type="text" placeholder={singleJob.title} disabled />
          </div>
          <div>
            <label>Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {/* {user && user.role === "job Seeker" && (
            <>
              <div>
                <label>Coverletter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={10}
                />
              </div>
              <div>
                <label>Resume</label>
                <input type="file" onChange={resumeHandler} />
              </div>
            </>
          )} */}
          <div>
                <label>Coverletter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={10}
                />
              </div>
              <div>
                <label>Resume</label>
                <input type="file" onChange={resumeHandler} />
              </div>
          {/* (isAuthenticated) */}
          {/* {isAuthenticated && user.role === "job Seeker" && (
            <div style={{ alignItems: "flex-end" }}>
              <button
                className="btn"
                onClick={handlePostApplication}
                disabled={loading}
                type="submit"
              >
                Apply
              </button>
            </div>
          )} */}
          <div style={{ alignItems: "flex-end" }}>
              <button
                className="btn"
                onClick={handlePostApplication}
                disabled={loading}
                type="submit"
              >
                Apply
              </button>
            </div>
        </form>

        <div className="job-details">
          <header>
            <h3>{singleJob.title}</h3>
            {singleJob.personalWebsite && (
              <Link target="_blank" to={singleJob.personalWebsite.url}>
                {singleJob.personalWebsite.title}
              </Link>
            )}
            <p>{singleJob.location}</p>
            <p>Rs. {singleJob.salary} a month</p>
          </header>
          <hr />
          <section>
            <div className="wrapper">
              <h3>Job details</h3>
              <div>
                <IoMdCash />
                <div>
                  <span>Pay</span>
                  <span>{singleJob.salary} a month</span>
                </div>
              </div>
              <div>
                <FaToolbox />
                <div>
                  <span>Job type</span>
                  <span>{singleJob.jobType}</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="wrapper">
              <h3>Location</h3>
              <div className="location-wrapper">
                <FaLocationDot />
                <span>{singleJob.location}</span>
              </div>
            </div>
            <hr />
            <div className="wrapper">
              <h3>Full Job Description</h3>
              <p>{singleJob.introduction}</p>
              {singleJob.qualifications && (
                <div>
                  <h4>Qualifications</h4>
                  <ul>
                    {qualifications.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {singleJob.responsibilities && (
                <div>
                  <h4>Responsibilities</h4>
                  <ul>
                    {responsibilities.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {singleJob.offers && (
                <div>
                  <h4>Offering</h4>
                  <ul>
                    {offering.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </section>
          <hr />
          <footer>
            <h3>Job Niche</h3>
            <p>{singleJob.jobNiche}</p>
          </footer>
        </div>
      </article>
    </>
  );
};

export default PostApplication;