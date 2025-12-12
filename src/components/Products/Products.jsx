import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const blogs = [
  {
    id: 84043113,
    img: "https://cdn.easyfrontend.com/pictures/courses/courses_3_1.png",
    cart: "First product",
    format: "DELIVERED",
  },
  {
    id: 3468570,
    img: "https://cdn.easyfrontend.com/pictures/courses/courses_3_2.png",
    cart: "Second product",
    format: "CANCELLED",
  },
  {
    id: 40106705,
    img: "https://cdn.easyfrontend.com/pictures/courses/courses_3_3.png",
    cart: "Third product",
    format: "DELIVERED TO SENDER",
  },
];

const BlogItem = ({ item }) => {
  const { t, i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const formattedId = new Intl.NumberFormat(
    i18n.language === "ar" ? "ar-EG" : "en-US"
  ).format(item.id);
  const fontClass = i18n.language === "ar" ? "font-cairo" : "font-primary";
  return (
    <div
      className={`rounded-lg overflow-hidden mt-6 lg:mt-0 ${fontClass}`}
      dir={direction}
    >
      <div className="relative">
        <img src={item.img} alt="" className="w-full" />
        <div className="absolute bottom-0 flex flex-col justify-center items-center w-full text-white px-12 pb-6 text-center">
          <h5 className="text-[22px] font-medium text-[#E30613] my-3">
            {formattedId}
          </h5>
          <Link
            to={`/tracking-shipment/${item.id}`}
            className="bg-transparent hover:bg-[#E30613] border border-[#E30613] hover:text-white py-2 rounded transition text-[#E30613] px-9 mb-3"
          >
            {t(item.cart)}
          </Link>
          <p className="text-base opacity-80">{t(item.format)}</p>
        </div>
      </div>
    </div>
  );
};

BlogItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export const Blog12 = () => {
  const { t, i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const fontClass = i18n.language === "ar" ? "font-cairo" : "font-primary";

  return (
    <section
      className={`ezy__blog12 light pt-14 md:pt-24 pb-5 text-stone-800 bg-white dark:text-[#0b1727] overflow-hidden ${fontClass}`}
      dir={direction}
    >
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-9">
            <h1 className="text-[32px] lg:text-[45px] leading-none font-bold mb-3">
              {t("Reliable Shipping Solutions for Your Business Needs")}
            </h1>
            <div className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-9">
                <p className="text-lg opacity-80 mb-2">
                  {t(
                    "We ensure timely deliveries with our seamless logistics services. From local to international shipping, we’re here to simplify your supply chain and drive your business forward."
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-12">
            <div className="grid grid-cols-6 gap-x-6 mt-12">
              {blogs.map((item, i) => (
                <div className="col-span-6 md:col-span-3 lg:col-span-2" key={i}>
                  <BlogItem item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
