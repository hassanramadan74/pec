import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import contactbg from "../../assets/contactus.jpg";
import contacthero from "../../assets/contacthero.jpg";
import world from "../../assets/world-Photoroom.png";

function Contact() {
  const { t, i18n } = useTranslation();
  const fontClass = i18n.language === "ar" ? "font-cairo" : "font-primary";
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const [submitStatus, setSubmitStatus] = useState("");

  // Validation schema with Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(
        2,
        t("contact.validation.firstNameMin") ||
          "First name must be at least 2 characters"
      )
      .required(
        t("contact.validation.firstNameRequired") || "First name is required"
      ),
    lastName: Yup.string()
      .min(
        2,
        t("contact.validation.lastNameMin") ||
          "Last name must be at least 2 characters"
      )
      .required(
        t("contact.validation.lastNameRequired") || "Last name is required"
      ),
    email: Yup.string()
      .email(t("contact.validation.emailInvalid") || "Invalid email address")
      .required(t("contact.validation.emailRequired") || "Email is required"),
    phone: Yup.string()
      .matches(
        /^[0-9+\s()-]+$/,
        t("contact.validation.phoneInvalid") || "Invalid phone number"
      )
      .min(
        10,
        t("contact.validation.phoneMin") ||
          "Phone number must be at least 10 digits"
      )
      .required(t("contact.validation.phoneRequired") || "Phone is required"),
    company: Yup.string()
      .min(
        2,
        t("contact.validation.companyMin") ||
          "Company name must be at least 2 characters"
      )
      .required(
        t("contact.validation.companyRequired") || "Company is required"
      ),
    department: Yup.string().required(
      t("contact.validation.departmentRequired") || "Department is required"
    ),
    message: Yup.string()
      .min(
        10,
        t("contact.validation.messageMin") ||
          "Message must be at least 10 characters"
      )
      .required(
        t("contact.validation.messageRequired") || "Message is required"
      ),
  });

  // Initial form values
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    department: "",
    message: "",
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // EmailJS configuration

      // You need to replace these with your actual EmailJS credentials from https://www.emailjs.com/
      const serviceID = "service_r1d5sxe"; // Get from EmailJS dashboard
      const templateID = "template_l1rlws9"; // Get from EmailJS dashboard
      const publicKey = "a14KnxpmDjDoYWEWe"; // Get from EmailJS dashboard

      // Prepare template parameters
      const templateParams = {
        to_email: "Main@professionals-design.com",
        from_name: `${values.firstName} ${values.lastName}`,
        from_email: values.email,
        phone: values.phone,
        company: values.company,
        department: values.department,
        message: values.message,
      };

      // Send email using EmailJS
      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      setSubmitStatus("success");
      resetForm();

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("");
      }, 5000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");

      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("");
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <div
        className={`relative w-full min-h-[400px] md:min-h-[400px] lg:min-h-[400px] flex items-center justify-center ${fontClass}`}
        dir={direction}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${contactbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="lg:container ">
          {/* Title */}
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
            {t("Contact")}
          </h1>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className={`container py-16 md:py-24 ${fontClass}`} dir={direction}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form Column */}
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                      <span className="block sm:inline">
                        {t("contact.successMessage") ||
                          "Message sent successfully! We'll get back to you soon."}
                      </span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                      <span className="block sm:inline">
                        {t("contact.errorMessage") ||
                          "Failed to send message. Please try again or contact us directly."}
                      </span>
                    </div>
                  )}

                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t("contact.firstName")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="firstName"
                        type="text"
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#076380] ${
                          errors.firstName && touched.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t("contact.lastName")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="lastName"
                        type="text"
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#076380] ${
                          errors.lastName && touched.lastName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t("contact.email")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#076380] ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t("contact.phone")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="phone"
                        type="tel"
                        placeholder="010 01234567"
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#076380] ${
                          errors.phone && touched.phone
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Company & Department */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t("contact.company")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="company"
                        type="text"
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#076380] ${
                          errors.company && touched.company
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="company"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        {t("contact.department")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="department"
                        type="text"
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#076380] ${
                          errors.department && touched.department
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <ErrorMessage
                        name="department"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      {t("contact.message")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Field
                      name="message"
                      as="textarea"
                      rows="6"
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#076380] resize-none ${
                        errors.message && touched.message
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-[#076380] hover:bg-[#065470] text-white font-semibold px-8 py-3 rounded-md transition-colors duration-300 ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <i className="fa-solid fa-spinner fa-spin"></i>
                          {t("contact.sending") || "Sending..."}
                        </span>
                      ) : (
                        t("contact.send")
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Image Column */}
          <div>
            <img
              src={contacthero}
              alt={t("contact.imageAlt")}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="bg-[#f3f3f3] w-full shadow-lg">
        <div className="container">
          <img src={world} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Company Locations Section */}
      <div className={`bg-[#076380] py-10  ${fontClass}`} dir={direction}>
        <div className="container">
          {/* Section Title */}
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-12">
            {t("contact.locations.title")}
          </h2>

          {/* Office Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Cairo Office */}
            <div className="bg-white  p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {t("contact.locations.cairo.title")}
              </h3>
              <div className="space-y-3 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-location-dot text-orange-500 mt-1 text-lg"></i>
                  <div className="text-[#076380]">
                    <p className="font-semibold">
                      {t("contact.locations.cairo.company")}
                    </p>
                    <p>{t("contact.locations.cairo.address1")}</p>
                    <p>{t("contact.locations.cairo.address2")}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-phone text-orange-500 text-lg"></i>
                  <a
                    href="tel:+201159606060"
                    className="text-[#076380] hover:underline"
                  >
                    +201159606060
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-envelope text-orange-500 text-lg"></i>
                  <a
                    href="mailto:Main@professinals-design.com"
                    className="text-[#076380] hover:underline"
                  >
                    Main@professinals-design.com
                  </a>
                </div>

                {/* Postal Code */}
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-solid fa-box-open text-orange-500 text-lg"></i>
                  <span className="text-[#076380]">4440001</span>
                </div>

                {/* View on Map */}
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-map text-orange-500 text-lg"></i>
                  <a
                    href="#"
                    className="text-[#076380] hover:underline font-semibold"
                  >
                    {t("contact.locations.viewMap")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
