## CareerVault – Full Application Flow Diagram (Text Diagram)

(Covers Authentication → User Portal → Admin Panel → Courses → Payments → Progress → Certificates)

                    ┌─────────────────────────┐
                    │      CareerVault App     │
                    └─────────────┬───────────┘
                                  │
                                  ▼

                ┌───────────────────────────────────┐
                │          AUTHENTICATION            │
                └────────────────┬────────────────────┘
                                 │
      ┌──────────────────────────┼──────────────────────────┐
      ▼                          ▼                          ▼
┌─────────────┐         ┌────────────────┐         ┌─────────────────┐
│ Login Page  │         │ Register Page  │         │ Forgot Password │
└───────┬─────┘         └───────┬────────┘         └─────────┬──────┘
        │                      Create User                     │
        │ Generate JWT Token                                   │
        ▼                                                     Reset Link
┌────────────────┐                                              ▼
│ Validate Roles │                                       ┌──────────────┐
└───────┬────────┘                                       │ Reset Password│
        │                                                └──────────────┘
        ▼
     Redirect
        │
 ┌──────┴─────────────┐
 │ ROLE CHECK MIDDLEWARE │
 └──────┬─────────────┘
        │
        ├─────────── Admin Role → /admin/dashboard
        │
        └────────── User Role → /user/dashboard


## USER PORTAL FLOW (Student Side)
                ┌──────────────────────────┐
                │      User Dashboard       │
                └───────────┬─────────────┘
                            │
   ┌────────────────────────┼────────────────────────┐
   ▼                        ▼                        ▼
┌─────────────┐     ┌────────────────┐      ┌───────────────────┐
│ My Courses  │     │  Browse Courses│      │ User Profile       │
└─────┬───────┘     └──────┬────────┘      └────────┬──────────┘
      │                     │                        │
      ▼                     ▼                        ▼
┌───────────────┐   ┌────────────────────┐   ┌────────────────────┐
│ Course Details │   │ Search / Filter    │   │ Update Info        │
└──────┬─────────┘   │ Category-wise List │   │ Change Password    │
       │             └───────┬────────────┘   │ Upload Avatar      │
       ▼                     ▼                 └────────────────────┘
┌───────────────────────┐  ┌──────────────────────────┐
│ Video/Module Player   │  │ Enroll / Purchase Course  │
│  - Lessons list        │  └──────────┬──────────────┘
│  - Video Section       │             │
│  - Notes / Bookmarks   │             ▼
│  - Mark Completed      │     ┌──────────────────────┐
└─────────┬─────────────┘     │ Payment Gateway       │
          │                   │ RazorPay / Stripe     │
          ▼                   └─────────┬────────────┘
 ┌────────────────────┐                ▼
 │ Progress Tracking   │       ┌──────────────────────┐
 │ - Lesson Complete   │       │ Enrollment Success    │
 │ - Resume position   │       └──────────────────────┘
 │ - Course %          │
 └─────────┬──────────┘
           │
           ▼
 ┌────────────────────┐
 │ Certificate (PDF)   │
 └────────────────────┘


## ADMIN PORTAL FLOW

                   ┌─────────────────────────────┐
                   │       Admin Dashboard        │
                   └─────────────┬────────────────┘
                                 │
      ┌──────────────────────────┼──────────────────────────┐
      ▼                          ▼                          ▼
┌───────────────┐        ┌────────────────┐        ┌────────────────┐
│ Manage Users  │        │ Manage Courses │        │ Analytics      │
└───────┬───────┘        └──────┬─────────┘        └───────────────┘
        │                        │
        ▼                        ▼
┌───────────────┐      ┌─────────────────────┐
│ View Users     │      │ Create Course       │
│ Edit Roles     │      └──────────┬──────────┘
│ Block/Unblock  │                 │
└───────┬────────┘                 ▼
        │                 ┌─────────────────────────┐
        ▼                 │ Manage Modules (Ch#1..) │
                          │ Add module title        │
                          └──────────┬──────────────┘
                                     │
                                     ▼
                        ┌─────────────────────────┐
                        │ Manage Lessons          │
                        │ - Upload Video          │
                        │ - Upload PDFs           │
                        │ - Write Description     │
                        └──────────┬──────────────┘
                                   │
                                   ▼
                        ┌──────────────────────────┐
                        │ Publish/Unpublish Course │
                        └──────────────────────────┘


## BACKEND SYSTEM FLOW
  ┌─────────────┐     JWT Authentication     ┌─────────────────┐
  │ Frontend    │ ─────────────────────────→ │ ASP.NET API     │
  │ React + Vite│ ←───────────────────────── │ .NET Core 8 API │
  └─────────────┘      JSON Responses        └─────────┬───────┘
                                                         │
                                                         ▼
                                    ┌────────────────────────────────┐
                                    │ Database (SQL Server/Postgres) │
                                    └────────────────────────────────┘
                                                         │
                                                         ▼
                                    ┌────────────────────────────────┐
                                    │ Blob Storage (Videos/PDFs)     │
                                    └────────────────────────────────┘


##   Data Base PostGreSql Complete code

1. Create Database
CREATE DATABASE careervault;

2.2. Roles Table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);
Dummy Roles
INSERT INTO roles (name) VALUES ('Admin'), ('User');


3. Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

4. User Roles Mapping Table

(For multi-role support)

CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE
);

5. Courses Table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    price NUMERIC(10,2) DEFAULT 0.00,
    thumbnail_url TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Dummy Courses
INSERT INTO courses (title, description, category, price, thumbnail_url, is_published)
VALUES 
('ASP.NET Core Mastery', 'Become an expert in ASP.NET Core.', 'Backend', 499.00, '/img/aspnet.png', TRUE),
('React + Vite Frontend Bootcamp', 'Complete frontend development course.', 'Frontend', 299.00, '/img/react.png', TRUE);



6. Course Modules Table

(Each course has multiple modules)

CREATE TABLE modules (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    module_order INT DEFAULT 1
);

Dummy Modules
INSERT INTO modules (course_id, title, module_order)
VALUES
(1, 'Introduction to ASP.NET Core', 1),
(1, 'Controllers & Routing', 2),
(2, 'React Basics', 1),
(2, 'State Management', 2);


7. Lessons Table

(Videos, PDFs, Notes)

CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    module_id INT REFERENCES modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    video_url TEXT,
    pdf_url TEXT,
    duration_minutes INT,
    lesson_order INT DEFAULT 1
);

Dummy Lessons
INSERT INTO lessons (module_id, title, video_url, duration_minutes, lesson_order)
VALUES
(1, 'What is .NET Core?', 'https://videos/c1m1l1.mp4', 12, 1),
(1, 'Project Structure', 'https://videos/c1m1l2.mp4', 15, 2),
(3, 'Basics of React', 'https://videos/c2m1l1.mp4', 10, 1);


ye code chala nhi hn ----02 dec 2025

INSERT INTO enrollments (user_id, course_id)
VALUES (1, 1), (1, 2);

INSERT INTO progress (user_id, lesson_id, is_completed, last_watched_second)
VALUES (1, 1, TRUE, 720);


INSERT INTO payments (user_id, course_id, amount, payment_status, provider, transaction_id)
VALUES (1, 1, 499.00, 'SUCCESS', 'RazorPay', 'TXN123456789');


INSERT INTO certificates (user_id, course_id, certificate_url)
VALUES (1, 1, '/certs/certificate_1_1.pdf');







