import { useState } from "react";
import { useTranslation } from "react-i18next";

const Vacancies = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const fontClass = isArabic ? "font-cairo" : "font-primary";
  const direction = isArabic ? "rtl" : "ltr";

  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Job listings data
  const jobs = [
    {
      id: 1,
      titleKey: "vacancies.jobs.civilEngineer.title",
      department: "engineering",
      location: "riyadh",
      type: "full-time",
      experience: "3-5",
      descriptionKey: "vacancies.jobs.civilEngineer.description",
      requirementsKey: "vacancies.jobs.civilEngineer.requirements",
    },
    {
      id: 2,
      titleKey: "vacancies.jobs.projectManager.title",
      department: "management",
      location: "makkah",
      type: "full-time",
      experience: "5-8",
      descriptionKey: "vacancies.jobs.projectManager.description",
      requirementsKey: "vacancies.jobs.projectManager.requirements",
    },
    {
      id: 3,
      titleKey: "vacancies.jobs.safetyOfficer.title",
      department: "safety",
      location: "cairo",
      type: "full-time",
      experience: "2-4",
      descriptionKey: "vacancies.jobs.safetyOfficer.description",
      requirementsKey: "vacancies.jobs.safetyOfficer.requirements",
    },
    {
      id: 4,
      titleKey: "vacancies.jobs.architect.title",
      department: "engineering",
      location: "riyadh",
      type: "full-time",
      experience: "4-6",
      descriptionKey: "vacancies.jobs.architect.description",
      requirementsKey: "vacancies.jobs.architect.requirements",
    },
    {
      id: 5,
      titleKey: "vacancies.jobs.electricalEngineer.title",
      department: "engineering",
      location: "makkah",
      type: "contract",
      experience: "3-5",
      descriptionKey: "vacancies.jobs.electricalEngineer.description",
      requirementsKey: "vacancies.jobs.electricalEngineer.requirements",
    },
    {
      id: 6,
      titleKey: "vacancies.jobs.qaInspector.title",
      department: "quality",
      location: "cairo",
      type: "full-time",
      experience: "2-4",
      descriptionKey: "vacancies.jobs.qaInspector.description",
      requirementsKey: "vacancies.jobs.qaInspector.requirements",
    },
  ];

  // Filter jobs based on selected criteria
  const filteredJobs = jobs.filter((job) => {
    if (selectedDepartment !== "all" && job.department !== selectedDepartment)
      return false;
    if (selectedLocation !== "all" && job.location !== selectedLocation)
      return false;
    return true;
  });

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
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

        {/* Filters Section */}
        <section className="bg-gray-50 py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              {/* Department Filter */}
              <div className="w-full md:w-auto">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-[#076380] focus:outline-none text-gray-700"
                >
                  <option value="all">
                    {t("vacancies.filters.allDepartments")}
                  </option>
                  <option value="engineering">
                    {t("vacancies.filters.engineering")}
                  </option>
                  <option value="management">
                    {t("vacancies.filters.management")}
                  </option>
                  <option value="safety">
                    {t("vacancies.filters.safety")}
                  </option>
                  <option value="quality">
                    {t("vacancies.filters.quality")}
                  </option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="w-full md:w-auto">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:border-[#076380] focus:outline-none text-gray-700"
                >
                  <option value="all">
                    {t("vacancies.filters.allLocations")}
                  </option>
                  <option value="riyadh">
                    {t("vacancies.filters.riyadh")}
                  </option>
                  <option value="makkah">
                    {t("vacancies.filters.makkah")}
                  </option>
                  <option value="cairo">{t("vacancies.filters.cairo")}</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSelectedDepartment("all");
                  setSelectedLocation("all");
                }}
                className="w-full md:w-auto px-6 py-3 bg-[#E30613] text-white rounded-lg hover:bg-[#c20511] transition-colors duration-300 font-semibold"
              >
                {t("vacancies.filters.reset")}
              </button>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-16">
          <div className="container">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {t("vacancies.availablePositions")} ({filteredJobs.length})
              </h2>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-16">
                <i className="fa-solid fa-briefcase text-6xl text-gray-300 mb-4"></i>
                <p className="text-xl text-gray-500">{t("vacancies.noJobs")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
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
                        <span>
                          <i className="fa-solid fa-briefcase mr-1"></i>
                          {job.experience} {t("vacancies.years")}
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

        {/* Why Join Us Section */}
        <section className="bg-[#F5F1E8] py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {t("vacancies.whyJoin.title")}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t("vacancies.whyJoin.subtitle")}
              </p>
            </div>

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

      {/* Application Modal */}
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
      )}
    </>
  );
};

export default Vacancies;
