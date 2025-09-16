import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/api/blog/${slug}`
        );
        const data = await response.json();
        console.log("data by slug", data);
        if (response.ok) {
          setPost(data);
        } else {
          setError("Post not found or failed to load.");
        }
      } catch (err) {
        setError("Post not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (error || !post) {
    return (
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <button
          onClick={() => navigate("/blog")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-24 py-8">
      {/* SEO */}
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.focusKeyword} />
        <link rel="canonical" href={`https://drakon-sports.com/blog/${slug}`} />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <a
              href="/"
              className="text-sm text-gray-700 hover:text-blue-600 inline-flex items-center"
            >
              Home
            </a>
          </li>
          <li>
            <span className="mx-2">/</span>
            <a
              href="/blog"
              className="text-sm text-gray-700 hover:text-blue-600"
            >
              Blog
            </a>
          </li>
          <li aria-current="page">
            <span className="mx-2">/</span>
            <span className="text-sm text-gray-500 font-medium">
              {post.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* Article */}
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-4">
            {post.tags?.[0]}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>{new Date(post.createdAt).toDateString()}</span>
          </div>
        </div>

        {/* Image */}
        <div className="rounded-xl overflow-hidden mb-10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto max-h-[400px] object-cover"
          />
        </div>

        {/* Content */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/blog")}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition flex items-center mx-auto"
          >
            ← Back to All Articles
          </button>
        </div>
      </article>
    </div>
  );
}

export default BlogPost;
