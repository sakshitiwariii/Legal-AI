import Link from "next/link"
import { ArrowRight, Scale, Shield, FileText, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-teal-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-navy-900">
                Democratizing Justice with AI
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl">
                Legal AI provides instant, simplified, and accurate legal assistance. Understand your rights, simplify complex documents, and chat with our RAG-powered legal expert.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/chat">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white h-11 px-8">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="outline" className="h-11 px-8 text-teal-700 border-teal-600 hover:bg-teal-50">
                  Find Legal Help
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center p-6 border rounded-xl bg-slate-50 shadow-sm transition-all hover:shadow-md">
              <div className="p-3 rounded-full bg-teal-100">
                <MessageSquare className="h-8 w-8 text-teal-700" />
              </div>
              <h3 className="text-xl font-bold">AI Chat Assistant</h3>
              <p className="text-slate-600">
                Ask legal questions and get answers based on Indian laws and constitutional rights.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center p-6 border rounded-xl bg-slate-50 shadow-sm transition-all hover:shadow-md">
              <div className="p-3 rounded-full bg-teal-100">
                <FileText className="h-8 w-8 text-teal-700" />
              </div>
              <h3 className="text-xl font-bold">Document Simplifier</h3>
              <p className="text-slate-600">
                Upload complex legal documents and contracts to receive easy-to-understand summaries.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center p-6 border rounded-xl bg-slate-50 shadow-sm transition-all hover:shadow-md">
              <div className="p-3 rounded-full bg-teal-100">
                <Shield className="h-8 w-8 text-teal-700" />
              </div>
              <h3 className="text-xl font-bold">Know Your Rights</h3>
              <p className="text-slate-600">
                A visual explorer of your fundamental rights, tailored for common situations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
