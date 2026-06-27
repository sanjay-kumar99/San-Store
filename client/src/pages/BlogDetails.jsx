import { useParams } from "react-router-dom";

const blogs = [
  {
    _id: 1,
    title: "How to Build a Modern E-Commerce Website",
    content: `
      Building a modern e-commerce website requires frontend, backend and database integration.

      Step 1: Setup React frontend  
      Step 2: Create Node.js backend  
      Step 3: Connect MongoDB  
      Step 4: Add Cart & Wishlist  
      Step 5: Payment integration  

      Always focus on UI and user experience.
    `,
    image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0",
    author: "Sanjay Kumar",
  },
];

const BlogDetails = () => {
  const { id } = useParams();

  const blog = blogs.find((b) => b._id.toString() === id);

  if (!blog) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Blog not found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white py-16 px-5">
      <div className="max-w-3xl mx-auto">

        <img
          src={blog.image}
          className="w-full h-80 object-cover rounded-2xl shadow"
        />

        <h1 className="text-4xl font-bold mt-6 text-slate-900">
          {blog.title}
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          By {blog.author}
        </p>

        <div className="mt-8 text-slate-700 leading-7 whitespace-pre-line">
          {blog.content}
        </div>

      </div>
    </section>
  );
};

export default BlogDetails;