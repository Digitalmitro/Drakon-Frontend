import { useNavigate } from "react-router-dom";
import { blogPosts } from "./BlogData";

function Blog() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-24 sm:py-4">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Dugout Chronicles
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Expert tips, gear guides, and insider knowledge to elevate your game
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/blog/${post.slug}`)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                  {post.tags[0]}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 text-justify">{post.excerpt}</p>
              <button className="text-blue-600 font-medium text-sm flex items-center">
                Read More
                <svg
                  className="w-4 h-4 ml-1"
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
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
