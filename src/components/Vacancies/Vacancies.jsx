import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";

const Vacancies = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-cairo" : "font-primary";
  const direction = isArabic ? "rtl" : "ltr";

  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // Job listings data - All positions in Cairo
  const jobs = [
    {
      id: 1,
      titleKey: "vacancies.jobs.architecturalDesign.title",
      department: "engineering",
      location: "cairo",
      type: "full-time",
      experience: "3-5",
      descriptionKey: "vacancies.jobs.architecturalDesign.description",
      requirementsKey: "vacancies.jobs.architecturalDesign.requirements",
    },
    {
      id: 2,
      titleKey: "vacancies.jobs.architecturalDrawing.title",
      department: "engineering",
      location: "cairo",
      type: "full-time",
      experience: "2-4",
      descriptionKey: "vacancies.jobs.architecturalDrawing.description",
      requirementsKey: "vacancies.jobs.architecturalDrawing.requirements",
    },
    {
      id: 3,
      titleKey: "vacancies.jobs.structuralConcrete.title",
      department: "engineering",
      location: "cairo",
      type: "full-time",
      experience: "3-5",
      descriptionKey: "vacancies.jobs.structuralConcrete.description",
      requirementsKey: "vacancies.jobs.structuralConcrete.requirements",
    },
    {
      id: 4,
      titleKey: "vacancies.jobs.structuralSteel.title",
      department: "engineering",
      location: "cairo",
      type: "full-time",
      experience: "3-5",
      descriptionKey: "vacancies.jobs.structuralSteel.description",
      requirementsKey: "vacancies.jobs.structuralSteel.requirements",
    },
    {
      id: 5,
      titleKey: "vacancies.jobs.electricalEngineer.title",
      department: "engineering",
      location: "cairo",
      type: "full-time",
      experience: "3-5",
      descriptionKey: "vacancies.jobs.electricalEngineer.description",
      requirementsKey: "vacancies.jobs.electricalEngineer.requirements",
    },
    {
      id: 6,
      titleKey: "vacancies.jobs.mechanicalEngineer.title",
      department: "engineering",
      location: "cairo",
      type: "full-time",
      experience: "3-5",
      descriptionKey: "vacancies.jobs.mechanicalEngineer.description",
      requirementsKey: "vacancies.jobs.mechanicalEngineer.requirements",
    },
    {
      id: 7,
      titleKey: "vacancies.jobs.technicalOffice.title",
      department: "engineering",
      location: "cairo",
      type: "full-time",
      experience: "2-4",
      descriptionKey: "vacancies.jobs.technicalOffice.description",
      requirementsKey: "vacancies.jobs.technicalOffice.requirements",
    },
    {
      id: 8,
      titleKey: "vacancies.jobs.architecturalSupervision.title",
      department: "engineering",
      location: "cairo",
      type: "full-time",
      experience: "3-5",
      descriptionKey: "vacancies.jobs.architecturalSupervision.description",
      requirementsKey: "vacancies.jobs.architecturalSupervision.requirements",
    },
    {
      id: 9,
      titleKey: "vacancies.jobs.structuralSupervision.title",
      department: "engineering",
      location: "cairo",
      type: "full-time",
      experience: "3-5",
      descriptionKey: "vacancies.jobs.structuralSupervision.description",
      requirementsKey: "vacancies.jobs.structuralSupervision.requirements",
    },
    {
      id: 10,
      titleKey: "vacancies.jobs.mechanicalSupervision.title",
      department: "engineering",
      location: "cairo",
      type: "full-time",
      experience: "3-5",
      descriptionKey: "vacancies.jobs.mechanicalSupervision.description",
      requirementsKey: "vacancies.jobs.mechanicalSupervision.requirements",
    },
  ];

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required(t("contact.validation.firstNameRequired")),
    lastName: Yup.string().required(t("contact.validation.lastNameRequired")),
    email: Yup.string()
      .email(t("contact.validation.emailInvalid"))
      .required(t("contact.validation.emailRequired")),
    university: Yup.string().required(
      t("vacancies.application.universityRequired")
    ),
    phone: Yup.string().required(t("contact.validation.phoneRequired")),
    experience: Yup.string().required(
      t("vacancies.application.experienceRequired")
    ),
    resume: Yup.mixed().required(t("vacancies.application.resumeRequired")),
    coverLetter: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // EmailJS configuration
      const serviceID = "service_r1d5sxe";
      const templateID = "template_rbczywr"; // Create a new template for job applications
      const publicKey = "a14KnxpmDjDoYWEWe";

      // Prepare template parameters
      const templateParams = {
        to_email: "Main@professionals-design.com",
        job_title: t(selectedJob.titleKey),
        job_department: t(`vacancies.departments.${selectedJob.department}`),
        job_location: t(`vacancies.locations.${selectedJob.location}`),
        from_name: `${values.firstName} ${values.lastName}`,
        from_email: values.email,
        phone: values.phone,
        university: values.university,
        experience: values.experience,
        resume: values.resume,
        cover_letter: values.coverLetter || "No cover letter provided",
        submission_date: new Date().toLocaleDateString(),
      };

      // Send email using EmailJS
      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      setSubmitStatus("success");
      resetForm();

      // Clear success message and close modal after 3 seconds
      setTimeout(() => {
        setSubmitStatus("");
        setShowApplicationForm(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to send application:", error);
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
    <>
      <div className={`${fontClass}  pb-16`} dir={direction}>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#076380] to-[#0a8fb3] text-white py-48">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("vacancies.hero.title")}
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              {t("vacancies.hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-16">
          <div className="container">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {t("vacancies.availablePositions")} ({jobs.length})
              </h2>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-16">
                <i className="fa-solid fa-briefcase text-6xl text-gray-300 mb-4"></i>
                <p className="text-xl text-gray-500">{t("vacancies.noJobs")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                          {t(job.titleKey)}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-block px-3 py-1 bg-[#076380] text-white text-sm rounded-full">
                            {t(`vacancies.departments.${job.department}`)}
                          </span>
                          <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                            <i className="fa-solid fa-location-dot mr-1"></i>
                            {t(`vacancies.locations.${job.location}`)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {t(job.descriptionKey)}
                    </p>

                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>
                          <i className="fa-solid fa-clock mr-1"></i>
                          {t(`vacancies.types.${job.type}`)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleApply(job)}
                        className="px-6 py-2 bg-[#E30613] text-white rounded-lg hover:bg-[#c20511] transition-colors duration-300 font-semibold"
                      >
                        {t("vacancies.applyNow")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Application Modal - Commented Out */}
      {showApplicationForm && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div
            className={`bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto ${fontClass}`}
            dir={direction}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">
                {t("vacancies.application.title")}
              </h3>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {t(selectedJob.titleKey)}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 bg-[#076380] text-white text-sm rounded-full">
                    {t(`vacancies.departments.${selectedJob.department}`)}
                  </span>
                  <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                    {t(`vacancies.locations.${selectedJob.location}`)}
                  </span>
                </div>
              </div>

              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  university: "",
                  experience: "",
                  resume: "",
                  coverLetter: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    {/* Status Messages */}
                    {submitStatus === "success" && (
                      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                        <span className="block sm:inline">
                          {t("vacancies.application.successMessage")}
                        </span>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        <span className="block sm:inline">
                          {t("vacancies.application.errorMessage")}
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          {t("vacancies.application.firstName")} *
                        </label>
                        <Field
                          type="text"
                          name="firstName"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          {t("vacancies.application.lastName")} *
                        </label>
                        <Field
                          type="text"
                          name="lastName"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          {t("vacancies.application.email")} *
                        </label>
                        <Field
                          type="email"
                          name="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          {t("vacancies.application.phone")} *
                        </label>
                        <Field
                          type="tel"
                          name="phone"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        {t("vacancies.application.university")} *
                      </label>
                      <Field
                        type="text"
                        name="university"
                        placeholder={t(
                          "vacancies.application.universityPlaceholder"
                        )}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                      />
                      <ErrorMessage
                        name="university"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          {t("vacancies.application.experience")} *
                        </label>
                        <Field
                          type="text"
                          name="experience"
                          placeholder={t(
                            "vacancies.application.experiencePlaceholder"
                          )}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                        />
                        <ErrorMessage
                          name="experience"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          {t("vacancies.application.resume")} *
                        </label>
                        <Field
                          type="url"
                          name="resume"
                          placeholder={t(
                            "vacancies.application.resumePlaceholder"
                          )}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                        />
                        <ErrorMessage
                          name="resume"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 -mt-2">
                      {t("vacancies.application.resumeLinkNote")}
                    </p>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        {t("vacancies.application.coverLetter")}
                      </label>
                      <Field
                        as="textarea"
                        name="coverLetter"
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-[#E30613] text-white rounded-lg hover:bg-[#c20511] transition-colors duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting
                          ? t("vacancies.application.submitting")
                          : t("vacancies.application.submit")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowApplicationForm(false)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 font-semibold"
                      >
                        {t("vacancies.application.cancel")}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Vacancies;
