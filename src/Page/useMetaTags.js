import { useEffect } from "react";

const useMetaTags = ({ title, description, keywords }) => {
  useEffect(() => {
    document.title = title;

    // Update or create description meta tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Update or create keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }

    // Convert keywords to string (handles string or array)
    metaKeywords.content = Array.isArray(keywords)
      ? keywords.join(', ')
      : (keywords || '');

  }, [title, description, keywords]);
};

export default useMetaTags;
