import { useEffect } from 'react';

const useMetaTags = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const tag = document.createElement('meta');
      tag.name = 'description';
      tag.content = description;
      document.head.appendChild(tag);
    }
    
    // Clean up function
    return () => {
      document.title = ''; // Reset to default title if needed
    };
  }, [title, description]);
};

export default useMetaTags;