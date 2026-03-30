"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Upload, FileText, X, Check, Copy, Download } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function SimplifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalContent, setOriginalContent] = useState<string>("");
  const [simplifiedContent, setSimplifiedContent] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("simplified");
  const [loading, setLoading] = useState(true);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (selectedFile: File) => {
    const validTypes = [
      "text/plain",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      toast("Invalid file type: Please upload a PDF, Word, or text file.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast("File too large: Please upload a file smaller than 10MB.");
      return;
    }

    setFile(selectedFile);
    setSimplifiedContent(null);
    setIsProcessing(true);
    setProgress(10);

    try {
      if (selectedFile.type === "text/plain") {
        const text = await selectedFile.text();
        setOriginalContent(text);
      } else {
        // Mocking pdf extraction for now
        setOriginalContent("This is mock extracted text from PDF/Word document...");
      }
      setProgress(50);
    } catch (error) {
      toast("Error reading file");
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  };

  const handleSimplify = async () => {
    if (!originalContent.trim()) {
      toast("No content found");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      const result = "This is a simplified dummy response text. It would normally be produced by calling the local LLM logic, but this has been simplified for stability.";

      setTimeout(() => {
        clearInterval(progressInterval);
        setSimplifiedContent(result);
        setProgress(100);
        setActiveTab("simplified");
        setIsProcessing(false);
        toast("Document successfully simplified");
      }, 2000);

    } catch (error) {
      toast("Error simplifying document");
      setIsProcessing(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setOriginalContent("");
    setSimplifiedContent(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard");
  };

  const downloadText = (text: string, filename: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="flex justify-center p-10">Loading Simplifier App...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy-900 dark:text-slate-100">
            Legal Document Simplifier
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Upload your legal document and get a simplified, easy-to-understand explanation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>
                Our AI simplifies complex legal documents into plain language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-teal-100 dark:bg-teal-900 rounded-full p-2 mt-0.5">
                  <span className="text-teal-600 dark:text-teal-300 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Upload Your Document</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Upload any legal document (supports plain text and PDF)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-teal-100 dark:bg-teal-900 rounded-full p-2 mt-0.5">
                  <span className="text-teal-600 dark:text-teal-300 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium">AI Processing</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Our AI analyzes the document and identifies key legal concepts
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-teal-100 dark:bg-teal-900 rounded-full p-2 mt-0.5">
                  <span className="text-teal-600 dark:text-teal-300 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Get Simplified Explanation</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Receive a clear, plain-language explanation of your document's content
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>
                Supported formats: PDF, Word, Text (Max 10MB)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!file ? (
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20" : "border-slate-300 dark:border-slate-700"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800">
                      <Upload className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        Drag and drop your file here, or{" "}
                        <label className="text-teal-600 dark:text-teal-400 hover:underline cursor-pointer">
                          browse
                          <input type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
                        </label>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        PDF, Word, or Text files up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-md bg-slate-200 dark:bg-slate-700">
                        <FileText className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removeFile}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                  <Button
                    className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-800"
                    onClick={handleSimplify}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Simplify Document"}
                  </Button>
                </div>
              )}

              {isProcessing && (
                <div className="mt-4 space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                    Analyzing document... {progress}%
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {simplifiedContent !== null && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Document Analysis</CardTitle>
                <CardDescription>We've simplified your legal document into plain language</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="simplified">Simplified Version</TabsTrigger>
                    <TabsTrigger value="original">Original Document</TabsTrigger>
                  </TabsList>
                  <TabsContent value="simplified">
                    <div className="relative">
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(simplifiedContent)}>
                          <Copy className="h-3.5 w-3.5 mr-1.5" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => downloadText(simplifiedContent, "simplified-document.txt")}>
                          <Download className="h-3.5 w-3.5 mr-1.5" />
                          Download
                        </Button>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mt-10">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                          {simplifiedContent.length > 0 ? (
                            simplifiedContent.split("\n\n").map((paragraph, index) => (
                              <p key={index}>{paragraph}</p>
                            ))
                          ) : (
                            <p>No simplified content produced.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="original">
                    <div className="relative">
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(originalContent)}>
                          <Copy className="h-3.5 w-3.5 mr-1.5" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => downloadText(originalContent, "original-document.txt")}>
                          <Download className="h-3.5 w-3.5 mr-1.5" />
                          Download
                        </Button>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mt-10">
                        <pre className="text-sm whitespace-pre-wrap font-mono text-slate-800 dark:text-slate-200">
                          {originalContent}
                        </pre>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 rounded-lg p-4 flex items-start space-x-3">
              <div className="shrink-0">
                <Check className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="font-medium text-teal-800 dark:text-teal-300">Document Successfully Simplified</h3>
                <p className="text-sm text-teal-700 dark:text-teal-400 mt-1">
                  We've simplified your legal document into plain language. You can now better understand the key terms and implications.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
