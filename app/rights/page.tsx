"use client"

import { useState } from "react"

type Right = {
  id: string
  title: string
  content: string
  section?: string
}

type Category = {
  id: string
  title: string
  description: string
  rights: Right[]
}

export default function RightsPage() {
  const [activeTab, setActiveTab] = useState("arrest")
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const categories: Category[] = [
    {
      id: "arrest",
      title: "Arrest Rights",
      description: "Your rights when interacting with law enforcement or during arrest",
      rights: [
        {
          id: "arrest-1",
          title: "Right to be informed of grounds of arrest",
          content: "Under Section 50 of CrPC (now Section 35 of BNSS), you have the right to be informed of the grounds of your arrest at the time of arrest or as soon as possible thereafter.",
          section: "BNSS Section 35"
        },
        {
          id: "arrest-2",
          title: "Right to consult a lawyer",
          content: "You have the right to consult a legal practitioner of your choice. If you cannot afford one, you are entitled to free legal aid under Section 304 CrPC.",
          section: "CrPC Section 304"
        },
        {
          id: "arrest-3",
          title: "Right to remain silent",
          content: "You have the right to remain silent and cannot be compelled to make any statement that may be used against you in court.",
          section: "Article 20(3)"
        }
      ]
    },
    {
      id: "consumer",
      title: "Consumer Rights",
      description: "Your rights as a consumer under the Consumer Protection Act 2019",
      rights: [
        {
          id: "consumer-1",
          title: "Right to safety",
          content: "Right to be protected against the marketing of goods and services which are hazardous to life and property.",
          section: "CPA Section 6"
        },
        {
          id: "consumer-2",
          title: "Right to be informed",
          content: "Right to be informed about the quality, quantity, potency, purity, standard and price of goods or services.",
          section: "CPA Section 6"
        },
        {
          id: "consumer-3",
          title: "Right to choose",
          content: "Right to be assured, wherever possible, access to a variety of goods and services at competitive prices.",
          section: "CPA Section 6"
        }
      ]
    },
    {
      id: "property",
      title: "Property Rights",
      description: "Your rights regarding property ownership and transactions",
      rights: [
        {
          id: "property-1",
          title: "Right to property",
          content: "No person shall be deprived of his property save by authority of law. This right is now a legal right under Article 300A.",
          section: "Article 300A"
        },
        {
          id: "property-2",
          title: "Protection against arbitrary acquisition",
          content: "The state cannot acquire your property without following due process and providing adequate compensation.",
          section: "Article 300A"
        }
      ]
    },
    {
      id: "women",
      title: "Women's Rights",
      description: "Special protections and rights for women under Indian law",
      rights: [
        {
          id: "women-1",
          title: "Protection against domestic violence",
          content: "Protection of women from any act of domestic violence under the Protection of Women from Domestic Violence Act 2005.",
          section: "PWDVA Section 3"
        },
        {
          id: "women-2",
          title: "Right to maintenance",
          content: "Right to claim maintenance from husband under Section 125 CrPC and Hindu Marriage Act.",
          section: "CrPC Section 125"
        }
      ]
    },
    {
      id: "rti",
      title: "RTI Rights",
      description: "Your right to information under the RTI Act 2005",
      rights: [
        {
          id: "rti-1",
          title: "Right to information",
          content: "Every citizen has the right to information from public authorities under the RTI Act 2005.",
          section: "RTI Section 3"
        },
        {
          id: "rti-2",
          title: "Right to inspect works and documents",
          content: "Right to inspect works, documents, records, taking notes, extracts or certified copies of documents or records.",
          section: "RTI Section 2(j)"
        }
      ]
    }
  ]

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const activeCategory = categories.find(cat => cat.id === activeTab)

  return (
    <div className="page active" id="page-rights">
      <div className="rights-visualizer">
        <div className="rv-head">
          <div className="rv-title">Rights Visualizer</div>
          <div className="rv-subtitle">Explore your fundamental rights under Indian law</div>
        </div>

        <div className="rv-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`rv-tab ${activeTab === category.id ? 'active' : ''}`}
              onClick={() => setActiveTab(category.id)}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className="rv-content">
          <div className="rv-category-desc">
            {activeCategory?.description}
          </div>

          <div className="rv-accordion">
            {activeCategory?.rights.map((right) => (
              <div key={right.id} className="rv-accordion-item">
                <button
                  className="rv-accordion-trigger"
                  onClick={() => toggleExpanded(right.id)}
                >
                  <div className="rv-accordion-title">
                    <span className="rv-right-icon">⚖️</span>
                    <span>{right.title}</span>
                  </div>
                  <span className="rv-accordion-arrow">
                    {expandedItems.includes(right.id) ? '−' : '+'}
                  </span>
                </button>
                {expandedItems.includes(right.id) && (
                  <div className="rv-accordion-content">
                    <div className="rv-right-content">
                      <p>{right.content}</p>
                      {right.section && (
                        <div className="rv-right-section">
                          <span className="rv-section-tag">{right.section}</span>
                        </div>
                      )}
                    </div>
                    <div className="rv-right-actions">
                      <button className="rv-action-btn">📋 Copy</button>
                      <button className="rv-action-btn">📖 Read More</button>
                      <button className="rv-action-btn">🔗 Share</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rv-footer">
          <div className="rv-disclaimer">
            <span>⚠️</span>
            This is general legal information. For specific legal advice, consult a qualified advocate.
          </div>
          <div className="rv-stats">
            <div className="rv-stat">
              <span className="rv-stat-num">{categories.length}</span>
              <span className="rv-stat-label">Categories</span>
            </div>
            <div className="rv-stat">
              <span className="rv-stat-num">
                {categories.reduce((sum, cat) => sum + cat.rights.length, 0)}
              </span>
              <span className="rv-stat-label">Rights</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
          title: "Right to know the grounds of arrest",
          content:
            "Under Section 50(1) of the Code of Criminal Procedure (CrPC), the police officer arresting you must inform you of the full particulars of the offense and grounds for arrest. If arrested without a warrant, you must be told why you are being arrested.",
        },
        {
          id: "arrest-2",
          title: "Right to legal representation",
          content:
            "Article 22(1) of the Indian Constitution gives you the right to consult and be defended by a legal practitioner of your choice. Section 41D of the CrPC allows you to meet an advocate of your choice during interrogation, though not throughout the interrogation.",
        },
        {
          id: "arrest-3",
          title: "Right to be presented before a magistrate",
          content:
            "Under Article 22(2) of the Constitution and Section 57 of the CrPC, you must be produced before the nearest magistrate within 24 hours of arrest, excluding the time necessary for the journey from the place of arrest to the magistrate's court.",
        },
        {
          id: "arrest-4",
          title: "Right to inform a relative or friend",
          content:
            "Section 41B(b) of the CrPC gives you the right to have one friend, relative, or other person informed of your arrest and the location where you are being detained.",
        },
        {
          id: "arrest-5",
          title: "Right to medical examination",
          content:
            "Under Section 54 of the CrPC, you have the right to request a medical examination to document any injuries you may have sustained during the arrest. This can be important evidence if you allege police misconduct.",
        },
      ],
    },
    {
      id: "property",
      title: "Property Rights",
      description:
        "Rights related to property ownership, transfer, and disputes",
      rights: [
        {
          id: "property-1",
          title: "Right to own property",
          content:
            "Article 300A of the Indian Constitution states that no person shall be deprived of their property save by authority of law. This means the government cannot arbitrarily take away your property without following due process of law.",
        },
        {
          id: "property-2",
          title: "Right to transfer property",
          content:
            "Under the Transfer of Property Act, 1882, you have the right to sell, gift, mortgage, or lease your property to others, subject to certain conditions and legal procedures.",
        },
        {
          id: "property-3",
          title: "Right to ancestral property",
          content:
            "Under the Hindu Succession (Amendment) Act, 2005, daughters have equal rights to ancestral property as sons. This applies to Hindu, Buddhist, Jain, and Sikh families.",
        },
        {
          id: "property-4",
          title: "Right to peaceful possession",
          content:
            "You have the right to peaceful possession of your property. If someone disturbs your possession, you can file a suit for injunction or file a complaint for trespass under Section 441 of the Indian Penal Code.",
        },
        {
          id: "property-5",
          title: "Right to fair compensation",
          content:
            "Under the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013, you are entitled to fair compensation if your land is acquired by the government for public purposes.",
        },
      ],
    },
    {
      id: "consumer",
      title: "Consumer Rights",
      description:
        "Your rights as a consumer when purchasing goods and services",
      rights: [
        {
          id: "consumer-1",
          title: "Right to safety",
          content:
            "Under the Consumer Protection Act, 2019, you have the right to be protected against marketing of goods and services that are hazardous to life and property.",
        },
        {
          id: "consumer-2",
          title: "Right to information",
          content:
            "You have the right to be informed about the quality, quantity, potency, purity, standard and price of goods or services to protect yourself against unfair trade practices.",
        },
        {
          id: "consumer-3",
          title: "Right to choose",
          content:
            "You have the right to be assured, wherever possible, access to a variety of goods and services at competitive prices.",
        },
        {
          id: "consumer-4",
          title: "Right to be heard",
          content:
            "You have the right to be heard and to be assured that your interests will receive due consideration at appropriate forums.",
        },
        {
          id: "consumer-5",
          title: "Right to seek redressal",
          content:
            "You have the right to seek redressal against unfair trade practices or restrictive trade practices or unscrupulous exploitation. You can file complaints with the District, State, or National Consumer Disputes Redressal Commission.",
        },
      ],
    },
    {
      id: "employment",
      title: "Employment Rights",
      description: "Rights in the workplace and employment relationships",
      rights: [
        {
          id: "employment-1",
          title: "Right to equal remuneration",
          content:
            "Under the Equal Remuneration Act, 1976, you have the right to equal pay for equal work, regardless of gender.",
        },
        {
          id: "employment-2",
          title: "Right to minimum wages",
          content:
            "The Minimum Wages Act, 1948, entitles you to receive minimum wages as fixed by the appropriate government. These rates vary by state, sector, and skill level.",
        },
        {
          id: "employment-3",
          title: "Right to safe working conditions",
          content:
            "Under the Occupational Safety, Health and Working Conditions Code, 2020, employers must provide safe working conditions and take measures to prevent accidents and occupational diseases.",
        },
        {
          id: "employment-4",
          title: "Right against sexual harassment",
          content:
            "The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, protects women from sexual harassment at the workplace and provides a mechanism for redressal of complaints.",
        },
        {
          id: "employment-5",
          title: "Right to gratuity",
          content:
            "Under the Payment of Gratuity Act, 1972, employees who have worked for at least 5 years are entitled to gratuity payment when they leave the job, retire, or in case of death.",
        },
      ],
    },
    {
      id: "family",
      title: "Family Law Rights",
      description: "Rights related to marriage, divorce, and family matters",
      rights: [
        {
          id: "family-1",
          title: "Right to maintenance",
          content:
            "Under Section 125 of the CrPC, you have the right to claim maintenance from your spouse if they neglect or refuse to maintain you despite having sufficient means. This applies to wives, children, and parents.",
        },
        {
          id: "family-2",
          title: "Right to divorce",
          content:
            "Various personal laws and the Special Marriage Act provide grounds for divorce, including cruelty, desertion, conversion to another religion, mental disorder, and mutual consent.",
        },
        {
          id: "family-3",
          title: "Rights to child custody",
          content:
            "In matters of child custody, courts are guided by the principle of 'welfare of the child' rather than the rights of parents. However, both parents generally have the right to visitation and to participate in major decisions affecting the child.",
        },
        {
          id: "family-4",
          title: "Right to adopt",
          content:
            "Under the Juvenile Justice (Care and Protection of Children) Act, 2015, and the Hindu Adoption and Maintenance Act, 1956, eligible individuals and couples have the right to legally adopt children.",
        },
        {
          id: "family-5",
          title: "Right to inherit",
          content:
            "Various personal laws govern inheritance rights in India. For example, under the Hindu Succession Act (as amended in 2005), sons and daughters have equal inheritance rights to ancestral and self-acquired property.",
        },
      ],
    },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The legal information has been copied to your clipboard.",
    });
  };

  const handleShare = (text: string) => {
    if (navigator.share) {
      navigator
      .share({
        title: "Legal Rights Information from LEgalAi",
          text: text,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      handleCopy(text);
      toast({
        title: "Sharing not supported",
        description:
          "Your browser doesn't support direct sharing, but we've copied the text to your clipboard instead.",
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <RightsVisualizerSkeleton />;
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy-900">
            Legal Rights Visualizer
          </h1>
          <p className="text-slate-600 mt-2">
            Explore your legal rights in simple, easy-to-understand language
          </p>
        </div>

        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-xs md:text-sm"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AnimatePresence>
                        {category.rights.map((right, index) => (
                          <AccordionItem key={right.id} value={right.id}>
                            <AccordionTrigger className="text-left">
                              {right.title}
                            </AccordionTrigger>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <AccordionContent>
                                <div className="space-y-4">
                                  <p className="text-slate-700">
                                    {right.content}
                                  </p>
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleCopy(right.content)}
                                    >
                                      <Copy className="h-3.5 w-3.5 mr-1.5" />
                                      Copy
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleShare(
                                          `${right.title}: ${right.content}`
                                        )
                                      }
                                    >
                                      <Share2 className="h-3.5 w-3.5 mr-1.5" />
                                      Share
                                    </Button>
                                  </div>
                                </div>
                              </AccordionContent>
                            </motion.div>
                          </AccordionItem>
                        ))}
                      </AnimatePresence>
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8 bg-slate-50 dark:bg-gray-900 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white mb-4">
            Understanding Your Rights
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Knowing your legal rights is the first step toward accessing
            justice. The information provided here is simplified for better
            understanding but is based on actual Indian laws and legal
            provisions.
          </p>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Remember that laws can change, and specific circumstances may affect
            how these rights apply to your situation. When facing a legal issue,
            it's always advisable to consult with a qualified legal
            professional.
          </p>
          <div className="flex justify-center mt-6">
            <Button
              asChild
              className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600"
            >
              <a href="/help">Find Legal Help</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
