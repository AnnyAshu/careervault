import React from "react";
import "../../styles/courses.css";

const MyCourses = () => {
  const courses = [
    {
      id: 1,
      title: "ASP.NET Core 8 – Beginner to Advanced",
      progress: 75,
      hours: 42,
      status: "In Progress",
    },
    {
      id: 2,
      title: "Angular 17 – Complete Guide",
      progress: 40,
      hours: 18,
      status: "In Progress",
    },
    {
      id: 3,
      title: "AWS Cloud Practitioner – Crash Course",
      progress: 100,
      hours: 10,
      status: "Completed",
    },
    {
      id: 4,
      title: "Microservices Architecture with .NET",
      progress: 55,
      hours: 25,
      status: "In Progress",
    },
    {
      id: 5,
      title: "React JS 19 – Zero to Hero",
      progress: 20,
      hours: 35,
      status: "In Progress",
    },
    {
      id: 6,
      title: "Docker & Kubernetes for Developers",
      progress: 90,
      hours: 15,
      status: "Completed",
    },
    {
      id: 7,
      title: "DevOps with Azure – CI/CD Pipelines",
      progress: 10,
      hours: 22,
      status: "In Progress",
    },
    {
      id: 8,
      title: "Entity Framework Core – Deep Dive",
      progress: 100,
      hours: 12,
      status: "Completed",
    },
    {
      id: 9,
      title: "SQL Server Performance Tuning",
      progress: 45,
      hours: 28,
      status: "In Progress",
    },
    {
      id: 10,
      title: "Clean Architecture & DDD in .NET",
      progress: 65,
      hours: 30,
      status: "In Progress",
    },
  ];

  return (
    <div className="courses-container">
      <h2 className="courses-title">📘 My Courses</h2>

      <div className="courses-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <h3 className="course-title">{course.title}</h3>

            <p className="course-hours">⏳ {course.hours} total hours</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>

            <p
              className={`course-status ${
                course.status === "Completed" ? "completed" : "in-progress"
              }`}
            >
              {course.status}
            </p>

            <button className="btn-continue">
              {course.status === "Completed"
                ? "Review Course"
                : "Continue Learning"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
