"use client";

import { useState } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Optional plugin to enhance markdown rendering

interface MarkdownEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
}

const EditorWithPreview: React.FC<MarkdownEditorProps> = ({
  initialContent,
  onChange,
}) => {
  const [content, setContent] = useState(initialContent);

  // Handle content changes in the editor
  const handleChange = (newValue: string) => {
    setContent(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-screen">
      {/* Markdown Editor Section */}
      <div className="flex-1 overflow-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📝 Markdown Editor
        </h2>
        <MarkdownEditor
          value={content}
          onChange={handleChange}
          height="50vh" // Use half of the screen height for the editor
          style={{
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontFamily: "monospace",
            fontSize: "14px",
            height: "calc(50vh - 3rem)", // Set the editor's height to fill 50% of the viewport height, subtracting for the header
          }}
        />
      </div>

      {/* Live Preview Section */}
      <div className="flex-1 overflow-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Preview</h2>
        <div className="flex-1 border p-4 rounded-md overflow-auto">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]} // Optional: for better markdown support
            components={{
              h1: ({ children }) => (
                <h2 className="text-3xl font-bold font-sans text-black my-4">
                  {children}
                </h2>
              ),
              h2: ({ children }) => (
                <h3 className="text-2xl font-semibold font-sans text-black my-4">
                  {children}
                </h3>
              ),
              h3: ({ children }) => (
                <h4 className="text-xl font-medium font-sans text-black my-3">
                  {children}
                </h4>
              ),
              h4: ({ children }) => (
                <h5 className="text-lg font-medium font-sans text-black my-3">
                  {children}
                </h5>
              ),
              h5: ({ children }) => (
                <h6 className="text-base font-normal text-gray-700 my-2">
                  {children}
                </h6>
              ),
              h6: ({ children }) => (
                <span className="text-sm font-light text-gray-600">
                  {children}
                </span>
              ),
              p: ({ children }) => (
                <p className="text-base text-gray-700 leading-relaxed my-4">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-700 my-4">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-gray-700 my-4">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-700 my-2">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 pl-4 italic text-gray-600 my-4">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-gray-100 text-sm font-mono p-1 rounded-md">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                  {children}
                </pre>
              ),
              hr: () => <hr className="my-4 border-t-2 border-gray-300" />,
              a: ({ children, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default EditorWithPreview;
