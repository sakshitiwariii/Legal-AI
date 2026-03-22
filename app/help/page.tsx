"use client"

import { useState } from "react"

type Lawyer = {
  id: string
  name: string
  type: "NGO" | "Lawyer" | "Clinic" | "Government"
  specialization: string[]
  location: string
  state: string
  languages: string[]
  rating: number
  contact: {
    phone?: string
    email?: string
    website?: string
  }
  availability: string
  image?: string
  experience: string
  cases: number
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [stateFilter, setStateFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [specializationFilter, setSpecializationFilter] = useState("all")

  const lawyers: Lawyer[] = [
    {
      id: "1",
      name: "Adv. Priya Sharma",
      type: "Lawyer",
      specialization: ["Criminal Law", "Family Law", "Property Law"],
      location: "New Delhi",
      state: "Delhi",
      languages: ["Hindi", "English", "Punjabi"],
      rating: 4.8,
      contact: {
        phone: "+91-9876543210",
        email: "priya.sharma@lawfirm.com"
      },
      availability: "Mon-Fri 9AM-6PM",
      experience: "12 years",
      cases: 450
    },
    {
      id: "2",
      name: "Legal Aid Society Delhi",
      type: "NGO",
      specialization: ["Human Rights", "Women's Rights", "Criminal Defense"],
      location: "Connaught Place, Delhi",
      state: "Delhi",
      languages: ["Hindi", "English", "Urdu"],
      rating: 4.6,
      contact: {
        phone: "+91-1122334455",
        email: "help@lasdelhi.org",
        website: "lasdelhi.org"
      },
      availability: "Mon-Sat 10AM-5PM",
      experience: "15 years",
      cases: 1200
    },
    {
      id: "3",
      name: "Adv. Rajesh Kumar",
      type: "Lawyer",
      specialization: ["Corporate Law", "Tax Law", "Civil Law"],
      location: "Mumbai",
      state: "Maharashtra",
      languages: ["English", "Hindi", "Marathi"],
      rating: 4.9,
      contact: {
        phone: "+91-9988776655",
        email: "rajesh.kumar@corporate.in"
      },
      availability: "Mon-Fri 10AM-7PM",
      experience: "18 years",
      cases: 320
    }
  ]

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lawyer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lawyer.specialization.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesState = stateFilter === "all" || lawyer.state === stateFilter
    const matchesType = typeFilter === "all" || lawyer.type === typeFilter
    const matchesSpecialization = specializationFilter === "all" ||
                                 lawyer.specialization.some(spec => spec.toLowerCase().includes(specializationFilter.toLowerCase()))

    return matchesSearch && matchesState && matchesType && matchesSpecialization
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Lawyer": return "var(--blue)"
      case "NGO": return "var(--green)"
      case "Clinic": return "var(--gold)"
      case "Government": return "var(--purple)"
      default: return "var(--text3)"
    }
  }

  const renderStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))
  }

  return (
    <div className="page active" id="page-help">
      <div className="legal-help-finder">
        <div className="lhf-head">
          <div className="lhf-title">Legal Help Finder</div>
          <div className="lhf-subtitle">Connect with qualified legal professionals and support organizations</div>
        </div>

        <div className="lawyers-controls">
          <div className="lc-search">
            <input
              type="text"
              className="lc-search-input"
              placeholder="Search by name, location, or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="lc-search-btn">🔍</button>
          </div>

          <div className="lc-filters">
            <select
              className="lc-filter"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option value="all">All States</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>

            <select
              className="lc-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Lawyer">Lawyer</option>
              <option value="NGO">NGO</option>
              <option value="Clinic">Legal Clinic</option>
              <option value="Government">Government</option>
            </select>

            <select
              className="lc-filter"
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
            >
              <option value="all">All Specializations</option>
              <option value="Criminal Law">Criminal Law</option>
              <option value="Family Law">Family Law</option>
              <option value="Property Law">Property Law</option>
              <option value="Corporate Law">Corporate Law</option>
              <option value="Human Rights">Human Rights</option>
            </select>
          </div>
        </div>

        <div className="lawyers-grid">
          {filteredLawyers.map((lawyer) => (
            <div key={lawyer.id} className="lawyer-card">
              <div className="lc-head">
                <div className="lc-avatar">
                  <div className="lc-avatar-img">
                    {lawyer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="lc-info">
                  <div className="lc-name">{lawyer.name}</div>
                  <div className="lc-type" style={{backgroundColor: getTypeColor(lawyer.type)}}>
                    {lawyer.type}
                  </div>
                </div>
              </div>

              <div className="lc-body">
                <div className="lc-specialization">
                  {lawyer.specialization.slice(0, 2).map((spec, i) => (
                    <span key={i} className="lc-spec-tag">{spec}</span>
                  ))}
                  {lawyer.specialization.length > 2 && (
                    <span className="lc-spec-more">+{lawyer.specialization.length - 2} more</span>
                  )}
                </div>

                <div className="lc-location">
                  📍 {lawyer.location}, {lawyer.state}
                </div>

                <div className="lc-languages">
                  🗣️ {lawyer.languages.join(", ")}
                </div>

                <div className="lc-rating">
                  <span className="lc-stars">{renderStars(lawyer.rating)}</span>
                  <span className="lc-rating-num">{lawyer.rating}</span>
                </div>

                <div className="lc-stats">
                  <div className="lc-stat">
                    <span className="lc-stat-num">{lawyer.experience}</span>
                    <span className="lc-stat-label">Experience</span>
                  </div>
                  <div className="lc-stat">
                    <span className="lc-stat-num">{lawyer.cases}</span>
                    <span className="lc-stat-label">Cases</span>
                  </div>
                </div>
              </div>

              <div className="lc-actions">
                <button className="lc-action-btn lc-action-primary">
                  📞 Contact
                </button>
                <button className="lc-action-btn">
                  📅 Book Appointment
                </button>
                <button className="lc-action-btn">
                  ⭐ Rate & Review
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredLawyers.length === 0 && (
          <div className="no-results">
            <div className="nr-icon">🔍</div>
            <div className="nr-text">No legal professionals found matching your criteria.</div>
            <div className="nr-suggestion">Try adjusting your search filters or location.</div>
          </div>
        )}

        <div className="lhf-footer">
          <div className="lhf-stats">
            <div className="lhf-stat">
              <span className="lhf-stat-num">{lawyers.length}</span>
              <span className="lhf-stat-label">Legal Professionals</span>
            </div>
            <div className="lhf-stat">
              <span className="lhf-stat-num">15+</span>
              <span className="lhf-stat-label">States Covered</span>
            </div>
            <div className="lhf-stat">
              <span className="lhf-stat-num">24/7</span>
              <span className="lhf-stat-label">Emergency Support</span>
            </div>
          </div>
          <div className="lhf-disclaimer">
            <span>⚠️</span>
            This directory is for informational purposes. Always verify credentials and conduct due diligence before engaging legal services.
          </div>
        </div>
      </div>
    </div>
  )
}
  availability: string
  image?: string
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [stateFilter, setStateFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for legal help providers
  const legalHelpProviders: LegalHelp[] = [
    {
      id: "1",
      name: "Legal Aid Society",
      type: "NGO",
      specialization: ["Human Rights", "Women's Rights", "Criminal Defense"],
      location: "New Delhi",
      state: "Delhi",
      languages: ["Hindi", "English", "Punjabi"],
      rating: 4.8,
      contact: {
        phone: "+91-11-23456789",
        email: "contact@legalaid.org",
        website: "www.legalaid.org",
      },
      availability: "Mon-Fri, 9 AM - 5 PM",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Adv. Priya Sharma",
      type: "Lawyer",
      specialization: ["Family Law", "Divorce", "Child Custody"],
      location: "Mumbai",
      state: "Maharashtra",
      languages: ["Hindi", "English", "Marathi"],
      rating: 4.9,
      contact: {
        phone: "+91-22-87654321",
        email: "priya@sharmalegal.com",
      },
      availability: "By appointment",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "Community Legal Clinic",
      type: "Clinic",
      specialization: ["Property Disputes", "Consumer Rights", "Employment Law"],
      location: "Bangalore",
      state: "Karnataka",
      languages: ["English", "Kannada", "Tamil"],
      rating: 4.5,
      contact: {
        phone: "+91-80-12345678",
        email: "help@communitylegal.org",
        website: "www.communitylegal.org",
      },
      availability: "Mon-Sat, 10 AM - 6 PM",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "4",
      name: "District Legal Services Authority",
      type: "Government",
      specialization: ["Legal Aid", "Lok Adalat", "Victim Compensation"],
      location: "Chennai",
      state: "Tamil Nadu",
      languages: ["Tamil", "English", "Telugu"],
      rating: 4.2,
      contact: {
        phone: "+91-44-23456789",
        email: "dlsa.chennai@gov.in",
        website: "www.tnslsa.gov.in",
      },
      availability: "Mon-Fri, 10 AM - 5 PM",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "5",
      name: "Adv. Rajesh Kumar",
      type: "Lawyer",
      specialization: ["Criminal Law", "Bail Applications", "Appeals"],
      location: "Kolkata",
      state: "West Bengal",
      languages: ["Bengali", "Hindi", "English"],
      rating: 4.7,
      contact: {
        phone: "+91-33-98765432",
        email: "rajesh@kumarlaw.com",
      },
      availability: "By appointment",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "6",
      name: "Women's Rights Initiative",
      type: "NGO",
      specialization: ["Domestic Violence", "Sexual Harassment", "Gender Discrimination"],
      location: "Hyderabad",
      state: "Telangana",
      languages: ["Telugu", "English", "Hindi"],
      rating: 4.6,
      contact: {
        phone: "+91-40-87654321",
        email: "support@wri.org",
        website: "www.wri.org",
      },
      availability: "24/7 Helpline",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Get unique states for filter
  const states = Array.from(new Set(legalHelpProviders.map((provider) => provider.state)))

  // Filter providers based on search and filters
  const filteredProviders = legalHelpProviders.filter((provider) => {
    const matchesSearch =
      searchQuery === "" ||
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specialization.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      provider.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesState = stateFilter === "all" || provider.state === stateFilter
    const matchesType = typeFilter === "all" || provider.type === typeFilter

    return matchesSearch && matchesState && matchesType
  })

  // Function to render star rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < fullStars
                ? "text-yellow-400 fill-yellow-400"
                : i === fullStars && hasHalfStar
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-slate-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-slate-600 dark:text-slate-300">{rating.toFixed(1)}</span>
      </div>
    )
  }

  // Handle search and filter changes
  const handleSearch = () => {
    setIsLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white">Find Legal Help</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">Connect with legal aid providers, lawyers, and clinics across India</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                placeholder="Search by name, specialization, or location..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="NGO">NGOs</SelectItem>
                  <SelectItem value="Lawyer">Lawyers</SelectItem>
                  <SelectItem value="Clinic">Legal Clinics</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {isLoading ? (
            // Loading skeletons
            [...Array(3)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-9 w-28" />
                </CardFooter>
              </Card>
            ))
          ) : filteredProviders.length > 0 ? (
            filteredProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={provider.image || "/placeholder.svg"} alt={provider.name} />
                        <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{provider.name}</CardTitle>
                        <CardDescription>
                          <Badge variant="outline" className="mr-1">
                            {provider.type}
                          </Badge>
                          {renderRating(provider.rating)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400 mt-0.5 mr-2" />
                          <div>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              {provider.location}, {provider.state}
                            </p>
                          </div>
                        </div>

                        {provider.contact.phone && (
                          <div className="flex items-start">
                            <Phone className="h-4 w-4 text-slate-500 dark:text-slate-400 mt-0.5 mr-2" />
                            <p className="text-sm text-slate-700 dark:text-slate-300">{provider.contact.phone}</p>
                          </div>
                        )}

                        {provider.contact.email && (
                          <div className="flex items-start">
                            <Mail className="h-4 w-4 text-slate-500 dark:text-slate-400 mt-0.5 mr-2" />
                            <p className="text-sm text-slate-700 dark:text-slate-300">{provider.contact.email}</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Specialization</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {provider.specialization.map((spec, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Languages</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{provider.languages.join(", ")}</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Availability</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{provider.availability}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">No legal help providers found matching your criteria.</p>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 dark:shadow-2xl dark:shadow-slate-500/20">
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white mb-4">Need Immediate Legal Assistance?</h2>
          <p className="text-slate-700 dark:text-white mb-4">
            If you're facing an emergency legal situation, you can contact the National Legal Services Authority (NALSA)
            helpline at <span className="font-medium">1516</span> for free legal aid and advice.
          </p>
          <p className="text-slate-700 dark:text-white">
            For women in distress, the Women Helpline number is <span className="font-medium">1091</span> or{" "}
            <span className="font-medium">181</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
