"use client";
import { Upload } from "lucide-react";
import React from "react";

const page = () => {
  const handleSubmit = async () => {};

  return (
    <main className="min-h-screen px-4 md:px-12 mt-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full flex flex-col space-y-7"
      >
        {/* Upload */}
        <p className="md:text-2xl text-xl font-semibold text-gray-800">
          Upload thumbnail
        </p>

        <label className="group cursor-pointer border border-gray-300 hover:border-blue-500 transition rounded-xl px-10 py-10 flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-blue-50 w-fit shadow-sm">
          <Upload
            size={26}
            className="text-gray-500 group-hover:text-blue-600 transition"
          />
          <p className="text-sm text-gray-500 group-hover:text-blue-600">
            Click to upload thumbnail
          </p>
          <input type="file" hidden />
        </label>

        {/* Blog Title */}
        <label className="text-sm font-medium text-gray-700">Blog Title</label>

        <input
          type="text"
          placeholder="Enter blog title..."
          className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Blog Description */}
        <p className="md:text-2xl font-semibold text-gray-800">
          Blog Description
        </p>

        <textarea
          rows={5}
          placeholder="Write short description..."
          className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />

        {/* Blog Content */}
        <textarea
          cols={80}
          rows={10}
          placeholder="Write Content Here"
          className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        ></textarea>

        {/* Category */}
        <p className="font-medium text-gray-700">Blog Category</p>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            Select Category
          </label>

          <select className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white">
            <option value="">Choose Category</option>
            <option value="neet-exams">NEET Exam</option>
            <option value="jee-exams">JEE Exam</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-fit mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow-sm transition"
        >
          Publish Blog
        </button>
      </form>
    </main>
  );
};

export default page;
