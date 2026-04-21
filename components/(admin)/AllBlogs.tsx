"use client";
import React, { useEffect, useState } from "react";
import { getAllBlogs, deleteBlog } from "@/lib/actions/(admin)/blogActions";
import { Trash2, Loader2, FileText } from "lucide-react";

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs on load
  const fetchBlogs = async () => {
    setLoading(true);
    const res = await getAllBlogs();
    if (res.success) setBlogs(res.blogs);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    
    const res = await deleteBlog(id);
    if (res.success) {
      setBlogs(blogs.filter((b) => b._id !== id));
      alert("Blog deleted successfully");
    } else {
      alert("Error: " + res.error);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin text-red-600" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Manage Blogs</h1>
            <p className="text-slate-500 text-sm">Total Published: {blogs.length}</p>
          </div>
        </header>

        <div className="space-y-4">
          {blogs.length === 0 ? (
            <div className="text-center p-20 bg-white dark:bg-zinc-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-zinc-800">
              <p className="text-slate-400">No blogs found. Start writing!</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <div 
                key={blog._id} 
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 flex justify-between items-center group hover:border-red-200 transition-all shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-400">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-1 max-w-md">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => handleDelete(blog._id)}
                  className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all active:scale-90"
                  title="Delete Blog"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminBlogList;