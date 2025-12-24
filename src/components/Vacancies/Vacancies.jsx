import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Vacancies = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-cairo" : "font-primary";
  const direction = isArabic ? "rtl" : "ltr";

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

  const handleApply = () => {
    // Navigate to contact page instead of showing modal
    navigate("/contact");
    // Commented out modal functionality
    // setSelectedJob(job);
    // setShowApplicationForm(true);
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
                        onClick={handleApply}
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

        {/* Why Join Us Section */}
        <section className="bg-[#F5F1E8] py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
              {t("vacancies.whyJoin.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[#076380] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-dollar-sign text-3xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t("vacancies.benefits.salary.title")}
                </h3>
                <p className="text-gray-600">
                  {t("vacancies.benefits.salary.description")}
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[#076380] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-graduation-cap text-3xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t("vacancies.benefits.training.title")}
                </h3>
                <p className="text-gray-600">
                  {t("vacancies.benefits.training.description")}
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[#076380] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-heart text-3xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t("vacancies.benefits.health.title")}
                </h3>
                <p className="text-gray-600">
                  {t("vacancies.benefits.health.description")}
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-16 h-16 bg-[#076380] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-users text-3xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {t("vacancies.benefits.culture.title")}
                </h3>
                <p className="text-gray-600">
                  {t("vacancies.benefits.culture.description")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Application Modal - Commented Out */}
      {/* {showApplicationForm && selectedJob && (
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

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t("vacancies.application.firstName")} *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t("vacancies.application.lastName")} *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t("vacancies.application.email")} *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {t("vacancies.application.phone")} *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {t("vacancies.application.experience")} *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                  >
                    <option value="">
                      {t("vacancies.application.selectExperience")}
                    </option>
                    <option value="0-2">0-2 {t("vacancies.years")}</option>
                    <option value="2-4">2-4 {t("vacancies.years")}</option>
                    <option value="4-6">4-6 {t("vacancies.years")}</option>
                    <option value="6+">6+ {t("vacancies.years")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {t("vacancies.application.resume")} *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {t("vacancies.application.resumeFormat")}
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {t("vacancies.application.coverLetter")}
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#076380] focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[#E30613] text-white rounded-lg hover:bg-[#c20511] transition-colors duration-300 font-semibold"
                  >
                    {t("vacancies.application.submit")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 font-semibold"
                  >
                    {t("vacancies.application.cancel")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Vacancies;
