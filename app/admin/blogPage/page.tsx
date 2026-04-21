"use client";
import React, { useState } from "react";
import { Upload, Trash2, FileText, Type, HelpCircle, FileDown, LayoutGrid, Save, PlusCircle } from "lucide-react";
import { uploadBlog } from "@/lib/actions/(admin)/blogActions";
import { maxSize } from "zod";

const AdminBlogUpload = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [blogData, setBlogData] = useState({
    title: "",
    category: "board-exams",
    tag: "",
    excerpt: "",
    featuredImage: "",
    seo: { metaTitle: "", metaDescription: "" },
    content: []
  });

const handleImageSelect = (e) => {
    setFile(e.target.files[0]);
  };



  const addBlock = (type) => {
    const newBlock = { type, id: Date.now() };
    if (type === "heading" || type === "text") newBlock.text = "";
    if (type === "pdf") { newBlock.title = ""; newBlock.url = ""; }
    if (type === "qa") { newBlock.question = ""; newBlock.answer = ""; }
    setBlogData({ ...blogData, content: [...blogData.content, newBlock] });
  };

  const updateBlock = (id, field, value) => {
    const updatedContent = blogData.content.map(b => b.id === id ? { ...b, [field]: value } : b);
    setBlogData({ ...blogData, content: updatedContent });
  };

  const handlePublish = async () => {
    if (!file) return alert("Please select a featured image");
    
    setLoading(true);
    
    // Create FormData to send file + text
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("featuredImage", file); // The actual file
    formData.append("content", JSON.stringify(blogData.content));
    formData.append("category", blogData.category);
    formData.append("tag", blogData.tag);
    formData.append("excerpt", blogData.excerpt);
    formData.append("seo", JSON.stringify(blogData.seo));

    const result = await uploadBlog(formData);
    
    setLoading(false);
    if (result.success) alert("Blog Published in ABC Folder!");
    else alert("Error: " + result.error);
  };
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 pb-20 font-sans transition-colors duration-200">
      {/* Sticky Top Bar */}
      <nav className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 sticky top-0 z-50 px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-red-500/20">
              A
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">Admin Console</h1>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase tracking-widest font-bold">Editor v2.0</p>
            </div>
          </div>
          <button 
            disabled={loading}
            onClick={handlePublish}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 dark:disabled:bg-zinc-800 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-600/20 active:scale-95 text-sm"
          >
            {loading ? "Publishing..." : <><Save size={18}/> Publish Post</>}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Editor */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-zinc-800">
            <input 
              type="text" 
              placeholder="Enter catchphrase title..." 
              className="w-full text-4xl font-black bg-transparent border-none focus:ring-0 placeholder:text-slate-200 dark:placeholder:text-zinc-800 mb-4"
              onChange={(e) => setBlogData({...blogData, title: e.target.value})}
            />
            <textarea 
              placeholder="Write a compelling excerpt for the thumbnail..." 
              className="w-full bg-transparent border-none focus:ring-0 text-slate-500 dark:text-zinc-400 text-lg resize-none"
              rows={2}
              onChange={(e) => setBlogData({...blogData, excerpt: e.target.value})}
            />
          </div>

          {/* Dynamic Content */}
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-zinc-800">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500 mb-8 flex items-center gap-2">
              <LayoutGrid size={14}/> Content Architecture
            </h3>
            
            <div className="space-y-8">
              {blogData.content.map((block) => (
                <div key={block.id} className="group relative bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-transparent hover:border-red-200 dark:hover:border-red-900/50 transition-all">
                   <button 
                    onClick={() => setBlogData({...blogData, content: blogData.content.filter(b => b.id !== block.id)})} 
                    className="absolute -right-2 -top-2 bg-white dark:bg-zinc-800 shadow-xl text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 dark:hover:bg-red-950 border border-slate-100 dark:border-zinc-700"
                   >
                    <Trash2 size={14} />
                  </button>

                  {block.type === "heading" && (
                    <div className="flex gap-4">
                        <Type className="text-red-500 shrink-0" size={20} />
                        <input type="text" placeholder="Section Heading (H2)" className="w-full bg-transparent text-xl font-bold focus:outline-none placeholder:text-slate-300 dark:placeholder:text-zinc-600" onChange={(e) => updateBlock(block.id, "text", e.target.value)} />
                    </div>
                  )}

                  {block.type === "text" && (
                    <div className="flex gap-4">
                        <FileText className="text-slate-400 shrink-0" size={20} />
                        <textarea placeholder="Write your paragraph content here..." className="w-full bg-transparent focus:outline-none resize-none leading-relaxed text-slate-600 dark:text-zinc-300" rows={4} onChange={(e) => updateBlock(block.id, "text", e.target.value)} />
                    </div>
                  )}

                  {block.type === "qa" && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-500 font-bold text-xs uppercase tracking-widest"><HelpCircle size={14}/> Frequently Asked Question</div>
                      <input type="text" className="w-full p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 focus:ring-2 ring-red-500/20 transition-all outline-none" placeholder="Question Title" onChange={(e) => updateBlock(block.id, "question", e.target.value)} />
                      <textarea className="w-full p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-sm focus:ring-2 ring-red-500/20 transition-all outline-none" placeholder="Provide a detailed answer..." rows={3} onChange={(e) => updateBlock(block.id, "answer", e.target.value)} />
                    </div>
                  )}

                  {block.type === "pdf" && (
                    <div className="space-y-4">
                       <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest"><FileDown size={14}/> Resource Attachment</div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Button Label (e.g. Download Syllabus)" className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-sm outline-none" onChange={(e) => updateBlock(block.id, "title", e.target.value)} />
                        <input type="text" placeholder="Google Drive / PDF URL" className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-sm outline-none" onChange={(e) => updateBlock(block.id, "url", e.target.value)} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Block Selectors */}
            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-zinc-800">
                <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-4 text-center">Add Content Section</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Heading", icon: Type, type: "heading" },
                    { label: "Paragraph", icon: FileText, type: "text" },
                    { label: "Q&A", icon: HelpCircle, type: "qa" },
                    { label: "PDF Link", icon: FileDown, type: "pdf" }
                ].map((item) => (
                    <button 
                        key={item.type} 
                        onClick={() => addBlock(item.type)} 
                        className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-red-500 dark:hover:border-red-500 hover:text-red-600 dark:hover:text-red-500 transition-all group"
                    >
                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-red-50 dark:group-hover:bg-red-950/30 transition-colors">
                        <item.icon size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </button>
                ))}
                </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 shadow-sm border border-slate-200 dark:border-zinc-800">
            <h3 className="font-bold text-sm mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                Metadata & Taxonomy
            </h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-[0.15em]">Category</label>
                <select 
                    className="w-full mt-2 p-3.5 rounded-xl border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/50 text-sm font-medium focus:ring-2 ring-red-500/20 outline-none" 
                    onChange={(e) => setBlogData({...blogData, category: e.target.value})}
                >
                  <option value="board-exams">Board Exams</option>
                  <option value="neet-exams">NEET Exams</option>
                  <option value="jee-exams">JEE Exams</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-[0.15em]">Primary Tag</label>
                <input 
                    type="text" 
                    placeholder="e.g. Accountancy" 
                    className="w-full mt-2 p-3.5 rounded-xl border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800/50 text-sm outline-none focus:ring-2 ring-red-500/20" 
                    onChange={(e) => setBlogData({...blogData, tag: e.target.value})} 
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 dark:bg-red-600 rounded-[2rem] p-6 shadow-xl text-white">
            <h3 className="font-bold text-sm mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 dark:bg-white"></div>
                SEO Optimizer
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 dark:text-red-200 uppercase tracking-widest px-1">Meta Title</p>
                <input 
                    type="text" 
                    placeholder="Search engine title..." 
                    className="w-full bg-zinc-800 dark:bg-red-700/50 border-none rounded-xl text-sm placeholder:text-zinc-600 dark:placeholder:text-red-200 focus:ring-2 ring-white/20 transition-all"
                    onChange={(e) => setBlogData({...blogData, seo: {...blogData.seo, metaTitle: e.target.value}})}
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-zinc-500 dark:text-red-200 uppercase tracking-widest px-1">Meta Description</p>
                <textarea 
                    placeholder="Brief description for Google search results..." 
                    className="w-full bg-zinc-800 dark:bg-red-700/50 border-none rounded-xl text-sm placeholder:text-zinc-600 dark:placeholder:text-red-200 focus:ring-2 ring-white/20 transition-all resize-none"
                    rows={4}
                    onChange={(e) => setBlogData({...blogData, seo: {...blogData.seo, metaDescription: e.target.value}})}
                />
              </div>
            </div>
          </div>

       <div className="p-6 rounded-[2rem] border-2 border-dashed ...">
      <input 
        type="file" 
        accept="image/*" 
        id="imageInput" 
        hidden 
        onChange={handleImageSelect} 
      />
      <label htmlFor="imageInput" className="cursor-pointer flex flex-col items-center">
        <Upload className={file ? "text-green-500" : ""} />
        <p className="text-xs font-bold mt-2">
          {file ? `Selected: ${file.name}` : "Featured Image"}
        </p>
      </label>
    </div>
        </div>
      </div>
    </main>
  );
};

export default AdminBlogUpload;