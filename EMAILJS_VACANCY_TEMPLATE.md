# EmailJS Template Setup for Job Applications

## Template Configuration

### Step 1: Create New Template in EmailJS

1. Go to https://www.emailjs.com/
2. Login with your account
3. Navigate to **Email Templates**
4. Click **Create New Template**
5. Use Template ID: **template_vacancy**

---

## Email Template Content

### Template Name

**Job Application - PEC Engineering Consultancy**

---

### Subject Line

```
New Job Application: {{job_title}} - {{from_name}}
```

---

### Email Body (HTML Format)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
      }
      .header {
        background-color: #076380;
        color: white;
        padding: 20px;
        text-align: center;
        border-radius: 5px 5px 0 0;
      }
      .content {
        background-color: white;
        padding: 30px;
        border-radius: 0 0 5px 5px;
      }
      .section {
        margin-bottom: 20px;
      }
      .section-title {
        font-weight: bold;
        color: #076380;
        margin-bottom: 10px;
        font-size: 16px;
        border-bottom: 2px solid #076380;
        padding-bottom: 5px;
      }
      .info-row {
        margin: 10px 0;
        padding: 10px;
        background-color: #f5f5f5;
        border-left: 3px solid #076380;
      }
      .label {
        font-weight: bold;
        color: #555;
        display: inline-block;
        width: 150px;
      }
      .value {
        color: #333;
      }
      .footer {
        margin-top: 20px;
        padding: 15px;
        background-color: #f0f0f0;
        border-radius: 5px;
        font-size: 12px;
        color: #666;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>New Job Application Received</h1>
      </div>

      <div class="content">
        <!-- Job Information -->
        <div class="section">
          <div class="section-title">📋 Position Details</div>
          <div class="info-row">
            <span class="label">Job Title:</span>
            <span class="value">{{job_title}}</span>
          </div>
          <div class="info-row">
            <span class="label">Department:</span>
            <span class="value">{{job_department}}</span>
          </div>
          <div class="info-row">
            <span class="label">Location:</span>
            <span class="value">{{job_location}}</span>
          </div>
        </div>

        <!-- Applicant Information -->
        <div class="section">
          <div class="section-title">👤 Applicant Information</div>
          <div class="info-row">
            <span class="label">Full Name:</span>
            <span class="value">{{from_name}}</span>
          </div>
          <div class="info-row">
            <span class="label">Email:</span>
            <span class="value">{{from_email}}</span>
          </div>
          <div class="info-row">
            <span class="label">Phone:</span>
            <span class="value">{{phone}}</span>
          </div>
          <div class="info-row">
            <span class="label">University:</span>
            <span class="value">{{university}}</span>
          </div>
          <div class="info-row">
            <span class="label">Experience:</span>
            <span class="value">{{experience}}</span>
          </div>
        </div>

        <!-- Cover Letter -->
        <div class="section">
          <div class="section-title">✉️ Cover Letter</div>
          <div
            style="padding: 15px; background-color: #f9f9f9; border-radius: 5px; white-space: pre-wrap;"
          >
            {{cover_letter}}
          </div>
        </div>

        <!-- Submission Details -->
        <div class="section">
          <div class="section-title">📅 Submission Details</div>
          <div class="info-row">
            <span class="label">Submitted on:</span>
            <span class="value">{{submission_date}}</span>
          </div>
          <div class="info-row">
            <span class="label">Resume Link:</span>
            <span class="value">
              <a
                href="{{resume}}"
                target="_blank"
                style="color: #076380; font-weight: bold; text-decoration: underline;"
                >Click Here to View Resume</a
              >
              <br />
              <span style="font-size: 12px; color: #666; word-break: break-all;"
                >{{resume}}</span
              >
            </span>
          </div>
        </div>

        <!-- Important Note -->
        <div
          style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border-left: 4px solid #076380; border-radius: 5px;"
        >
          <strong>📎 Resume:</strong> Click the link above to access the
          applicant's resume from Google Drive. If the link is not clickable,
          you can copy and paste the URL shown below it.
        </div>
      </div>

      <div class="footer">
        <p>
          This is an automated email from PEC Engineering Consultancy job
          application system.
        </p>
        <p>Please do not reply to this email.</p>
      </div>
    </div>
  </body>
</html>
```

---

## Template Variables Used

Make sure these variables are properly mapped in your template:

- `{{to_email}}` - Recipient email (Main@professionals-design.com)
- `{{job_title}}` - Title of the position applied for
- `{{job_department}}` - Department of the position
- `{{job_location}}` - Location of the position
- `{{from_name}}` - Applicant's full name
- `{{from_email}}` - Applicant's email address
- `{{phone}}` - Applicant's phone number
- `{{university}}` - Applicant's college/university
- `{{experience}}` - Years of experience
- `{{cover_letter}}` - Cover letter text
- `{{submission_date}}` - Date of application submission
- `{{resume_link}}` - Google Drive link to the resume

---

## Alternative Plain Text Version

If you prefer a simpler plain text template:

```
New Job Application Received
================================

POSITION DETAILS
----------------
Job Title: {{job_title}}
Department: {{job_department}}
Location: {{job_location}}

APPLICANT INFORMATION
---------------------
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
University: {{university}}
Experience: {{experience}}

COVER LETTER
------------
{{cover_letter}}

SUBMISSION DETAILS
------------------
Date: {{submission_date}}
Resume File: {{resume_name}}

NOTE: The applicant's resume is attached to this email.

---
This is an automated email from PEC Engineering Consultancy job application system.
```

---

## Setup Instructions

1. **Login to EmailJS Dashboard**

   - Go to https://dashboard.emailjs.com/

2. **Create the Template**
   Link: {{resume_link}}

NOTE: Click the link above to view the applicant's resume on Google Drive

- Set Template ID: `template_vacancy`

3. **Configure the Template**

   - Paste the HTML template above into the "Content" section
   - Set the subject line: `New Job Application: {{job_title}} - {{from_name}}`
   - Set "To email": `{{to_email}}`

4. **Test the Template**

   - Use the "Test It" feature in EmailJS
   - Fill in sample data for all variables
   - Send a test email to verify formatting

5. **Save and Deploy**
   - Click "Save" to activate the template

---

## Notes

- **File Attachments**: Resume files are automatically attached to the email via base64 encoding
- **File Size Limit**: Maximum 5MB (validated in the frontend)
- **Accepted Formats**: PDF, DOC, DOCX only
- **Service ID**: Using existing `service_r1d5sxe`
- **Public Key**: Using existing `a14KnxpmDjDoYWEWe`
- **Recipient**: All applications go to `Main@professionals-design.com`

---

## Customization Tips

- You can add your company logo by hosting it online and adding `<img>` tag in the header
- Adjust colors by changing the hex values in the CSS
- Add more fields if needed by creating new template variables
- Set up auto-reply to applicants by creating a second template
  Resume Submission\*\*: Applicants provide Google Drive links to their resumes
- **Link Access**: Applicants are instructed to set sharing to "Anyone with the link can view"
- **URL Validation**: Links are validated in the frontend to ensure proper format
