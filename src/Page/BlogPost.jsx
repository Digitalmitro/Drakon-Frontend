import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "./BlogData";
import { Helmet } from "react-helmet";
function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((post) => post.id === Number(id));

  if (!post) {
    return (
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8  text-center">
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
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta
          name="description"
          content={post.metaDescription}
        />
         <meta
          name="keywords"
          content={post.metaKeywords}
        />
         <link rel="canonical" href={`https://drakon-sports.com/blog/${id}`} />
      </Helmet>
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="text-sm text-gray-700 hover:text-blue-600 inline-flex items-center"
            >
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-3 h-3 text-gray-400 mx-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <a
                href="/blog"
                className="text-sm text-gray-700 hover:text-blue-600 ml-1 md:ml-2"
              >
                Blog
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-3 h-3 text-gray-400 mx-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-sm text-gray-500 ml-1 md:ml-2 font-medium">
                {post.title}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-4">
            {post.tags[0]}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.date}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-xl overflow-hidden mb-10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Article Content */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related Products CTA */}
        <div className="mt-16 bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Featured Gear Mentioned</h3>
          <p className="mb-4">Shop the products recommended in this article:</p>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/blog")}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition flex items-center mx-auto"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to All Articles
          </button>
        </div>
      </article>
    </div>
  );
}

export default BlogPost;
