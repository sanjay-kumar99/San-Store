import { useNavigate } from "react-router-dom";

const blogs = [
  {
    _id: 1,
    title: "How to Build a Modern E-Commerce Website",
    desc: "Learn step-by-step how to build a full-stack MERN e-commerce app with authentication, cart, wishlist and payments.",
    image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0",
    author: "Sanjay Kumar",
    date: "2026-06-20",
  },
  {
    _id: 2,
    title: "React Performance Optimization Tips",
    desc: "Improve your React app performance using memoization, lazy loading, and better state management.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    author: "Admin",
    date: "2026-06-18",
  },
  {
    _id: 3,
    title: "Tailwind CSS Modern UI Tricks",
    desc: "Make your UI look premium using Tailwind spacing, shadows, gradients and hover effects.",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
    author: "Design Team",
    date: "2026-06-15",
  },
];

const Blog = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#f5f7fa] py-16 px-5">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Latest Blogs ✍️
          </h1>
          <p className="text-slate-600 mt-2">
            Read insights, tutorials and tech updates
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden cursor-pointer"
              onClick={() => navigate(`/blog/${blog._id}`)}
            >
              <img
                src={blog.image}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold text-slate-900">
                  {blog.title}
                </h2>

                <p className="text-slate-600 text-sm mt-2">
                  {blog.desc.substring(0, 90)}...
                </p>

                <div className="flex justify-between mt-4 text-xs text-slate-500">
                  <span>{blog.author}</span>
                  <span>{blog.date}</span>
                </div>

                <button className="mt-4 text-blue-600 font-semibold">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;