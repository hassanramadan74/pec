# EmailJS Setup Instructions

To enable email sending functionality in your contact form, follow these steps:

## 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)

## 2. Set Up Email Service

1. After login, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Copy the **Service ID** (you'll need this)

"hr033469@gmail.com"
"amgqzxftbojiswid"
## 3. Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Department: {{department}}

Message:
{{message}}

---
This email was sent from the PEC contact form.
```
serviceid:"service_r1d5sxe"
templateid:"template_l1rlws9"
public key: "a14KnxpmDjDoYWEWe"
4. Copy the **Template ID**

## 4. Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called User ID)
3. Copy this key

## 5. Update Your Code

Open `src/components/Contact/Contact.jsx` and replace these values (around line 55):

```javascript
const serviceID = "YOUR_SERVICE_ID"; // Replace with your Service ID
const templateID = "YOUR_TEMPLATE_ID"; // Replace with your Template ID
const publicKey = "YOUR_PUBLIC_KEY"; // Replace with your Public Key
```

## 6. Test the Form

1. Fill out the contact form on your website
2. Click Send
3. Check your inbox (hassanramdanmohammed@gmail.com) for the test email

## Alternative: Use Environment Variables (Recommended for Production)

Create a `.env` file in your project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Then update Contact.jsx:

```javascript
const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

**Note:** Don't commit your `.env` file to git! Add it to `.gitignore`

## Troubleshooting

- **Email not sending?** Check browser console for errors
- **Wrong email address?** Verify template settings in EmailJS dashboard
- **Rate limit reached?** Free tier has 200 emails/month limit

## Features Implemented

✅ Formik for form management
✅ Yup validation with error messages
✅ Real-time validation feedback
✅ Loading state during submission
✅ Success/Error messages
✅ Form reset after successful submission
✅ Bilingual validation messages (English/Arabic)
✅ Email sent to: hassanramdanmohammed@gmail.com
