import { useImageCache } from "../../hooks/useImageCache";

/**
 * CachedImage component - automatically caches images in session storage
 */
const CachedImage = ({
  src,
  alt,
  className,
  style,
  loading = "lazy",
  ...props
}) => {
  const { cachedUrl, isLoading } = useImageCache(src);

  return (
    <>
      {isLoading && (
        <div
          className={`${className} animate-pulse bg-gray-200 flex items-center justify-center`}
          style={style}
        >
          <i className="fa-solid fa-image text-gray-400 text-4xl"></i>
        </div>
      )}
      <img
        src={cachedUrl}
        alt={alt}
        className={`${className} ${isLoading ? "hidden" : ""}`}
        style={style}
        loading={loading}
        decoding="async"
        {...props}
      />
    </>
  );
};

export default CachedImage;
