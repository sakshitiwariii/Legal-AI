"use client"

import Link from "next/link"

export default function HomePage() {
  return (
    <div className="page active" id="page-home">
      <div className="hero">
        <div className="hero-badge">⚖️ Powered by AI · Built for India</div>
        <h1>Your Intelligent Legal<br/>Companion</h1>
        <p>Navigate the Indian legal system with confidence. From constitutional rights to case tracking — AI-powered, plain-English answers at your fingertips.</p>
        <div className="hero-btns">
          <Link href="/chat" className="btn-gold">Ask Legal AI →</Link>
          <Link href="/rights" className="btn-outline">Know Your Rights</Link>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card"><div className="stat-num">50K+</div><div className="stat-label">Queries Answered</div></div>
        <div className="stat-card"><div className="stat-num">1,200+</div><div className="stat-label">Cases Tracked</div></div>
        <div className="stat-card"><div className="stat-num">340+</div><div className="stat-label">Legal Professionals</div></div>
        <div className="stat-card"><div className="stat-num">28</div><div className="stat-label">States Covered</div></div>
      </div>

      <div className="features-grid">
        <Link href="/chat" className="feature-card">
          <div className="fc-icon">🤖</div>
          <div className="fc-title">AI Legal Chatbot</div>
          <div className="fc-desc">RAG-powered chatbot trained on Indian legal documents. Get instant answers with citations.</div>
        </Link>
        <Link href="/dashboard" className="feature-card">
          <div className="fc-icon">📋</div>
          <div className="fc-title">Case Tracker</div>
          <div className="fc-desc">Monitor your cases, hearing dates, and progress across all courts in one dashboard.</div>
        </Link>
        <Link href="/rights" className="feature-card">
          <div className="fc-icon">🏛️</div>
          <div className="fc-title">Rights Visualizer</div>
          <div className="fc-desc">Explore Fundamental Rights, CrPC sections, and consumer protections with law references.</div>
        </Link>
        <Link href="/simplify" className="feature-card">
          <div className="fc-icon">📄</div>
          <div className="fc-title">Doc Simplifier</div>
          <div className="fc-desc">Upload legal documents and get plain-English summaries with key points extracted.</div>
        </Link>
        <Link href="/help" className="feature-card">
          <div className="fc-icon">🔍</div>
          <div className="fc-title">Find Legal Help</div>
          <div className="fc-desc">Directory of verified lawyers and NGOs across India. Filter by state and specialization.</div>
        </Link>
      </div>

      <div className="card" style={{marginTop:'1rem',background:'linear-gradient(135deg,rgba(201,168,76,.06),rgba(74,128,212,.04))',borderColor:'rgba(201,168,76,.2)'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'1.5rem',alignItems:'center'}}>
          <div>
            <h3 style={{fontFamily:'var(--serif)',fontSize:'1.2rem',color:'var(--gold2)',marginBottom:'.5rem'}}>⚠️ Important Disclaimer</h3>
            <p style={{fontSize:'.85rem',color:'var(--text2)',lineHeight:'1.7'}}>Legal AI provides general legal information for educational purposes only. This is not legal advice and does not create an attorney-client relationship. For specific legal matters, please consult a qualified legal professional.</p>
          </div>
          <div style={{fontSize:'2.5rem',opacity:'.4'}}>⚖️</div>
        </div>
      </div>
    </div>
  )
}
          <motion.div
            className="mx-auto text-center space-y-4 max-w-[800px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-navy-900 dark:text-white">Our Mission</h2>
            <p className="text-slate-700 md:text-xl dark:text-slate-300">
              We believe that legal knowledge should be accessible to everyone, not just those who can afford expensive
              lawyers. LEgalAi uses AI and plain language to demystify the legal system, empowering citizens to
              understand and exercise their rights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-12 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-navy-900 dark:text-white">Core Features</h2>
              <p className="max-w-[700px] text-slate-700 md:text-xl dark:text-slate-300">
                Powerful tools designed to simplify your legal journey
              </p>
            </div>
          </div>
          <div className="mx-auto grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch max-w-5xl pt-8 md:pt-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-all hover:shadow-lg bg-white dark:bg-slate-800">
                  <CardHeader>
                    <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900 w-fit mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl dark:text-white">{feature.title}</CardTitle>
                    <CardDescription className="text-slate-700 dark:text-slate-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" className="group dark:text-slate-300">
                      <Link href={feature.link}>
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 bg-white dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-navy-900 dark:text-white">What Our Users Say</h2>
              <p className="max-w-[700px] text-slate-700 md:text-xl dark:text-slate-300">
                Real stories from people who have used LEgalAi to navigate their legal challenges
              </p>
            </div>
          </div>
          <div className="mx-auto grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch max-w-5xl pt-8 md:pt-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="container px-4 md:px-6">
          <motion.div
            className="mx-auto flex flex-col items-center justify-center space-y-4 text-center max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-navy-900 dark:text-white">
                Ready to Simplify Your Legal Journey?
              </h2>
              <p className="max-w-[700px] text-slate-700 md:text-xl dark:text-slate-300">
                Join thousands of Indians who are using LEgalAi to understand their rights and navigate the legal
                system with confidence.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
                <Link href="/chat">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="dark:border-slate-600 dark:text-slate-300">
                <Link href="/help">Find Legal Help</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-4 pt-4">
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-teal-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">No credit card required</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-teal-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Free basic access</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="h-4 w-4 text-teal-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
