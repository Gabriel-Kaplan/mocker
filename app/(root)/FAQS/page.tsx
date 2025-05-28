"use client";

import Link from "next/link";
import { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ArrowLeft, ChevronDown, ChevronUp, Search, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is Mocker and how does it work?",
          answer: "Mocker is an AI-powered mock interview platform that helps you practice and improve your interview skills. Our advanced AI interviewer, Miva, conducts realistic interview sessions tailored to your target role and provides personalized feedback to help you succeed."
        },
        {
          question: "How do I start my first mock interview?",
          answer: "Simply click on 'Start Practice Interview' from your dashboard, select your target role and tech stack, and our AI will generate a customized interview session for you. The process takes less than a minute to set up."
        },
        {
          question: "Is Mocker free to use?",
          answer: "Yes, Mocker offers free mock interview sessions. You can practice interviews, receive feedback, and track your progress without any cost. We believe everyone should have access to quality interview preparation."
        },
        {
          question: "Do I need to create an account?",
          answer: "Yes, creating an account allows you to save your interview history, track your progress over time, and access personalized feedback. The signup process is quick and only requires basic information."
        }
      ]
    },
    {
      category: "Interview Experience",
      questions: [
        {
          question: "What types of interviews can I practice?",
          answer: "Mocker supports various interview types including technical interviews (coding, system design), behavioral interviews, HR rounds, and role-specific interviews for positions like software engineer, product manager, data scientist, and more."
        },
        {
          question: "How realistic are the AI-generated interviews?",
          answer: "Our AI interviewer Miva is trained on thousands of real interview scenarios using Google Gemenei and questions from top tech companies. The experience closely mimics real interviews, including follow-up questions and adaptive difficulty based on your responses."
        },
        {
          question: "Can I practice coding interviews?",
          answer: "Yes! Mocker includes coding interview interviews, they include algorithm questions, and system design scenarios. You can practice in multiple programming languages including Python, JavaScript, Java, and C++. Go to the all interviews section where you will see your own and also all interviews other peole have taken." 
        },
        {
          question: "How long does each interview session last?",
          answer: "Interview sessions last by how many questions and difficulty of questions you ask the AI Interviewer to generate, and also by the type of job role you tell the AI Interviewer you are interviewing for. This means seessions can last anywhere from 1 minute, 15 minutes or an hour or more."
        }
      ]
    },
    {
      category: "Feedback & Progress",
      questions: [
        {
          question: "What kind of feedback do I receive?",
          answer: "After each interview, you'll receive detailed feedback transcript including your performance score, areas of improvement, specific suggestions for better answers, communication tips, and comparison with industry standards."
        },
        {
          question: "How is my performance scored?",
          answer: "Our AI evaluates multiple factors including technical accuracy, communication clarity, problem-solving approach, and interview presence. Scores are provided on a scale with detailed breakdowns for each criterion."
        },
        {
          question: "Can I track my progress over time?",
          answer: "Yes, your dashboard shows your interview history, performance trends, improvement areas, and achievements. You can see how your skills develop over multiple practice sessions."
        },
        {
          question: "Can I retake the same interview?",
          answer: "While you can't retake the exact same interview (to maintain authenticity), you can practice similar interview types and difficulty levels. Our AI generates new questions each time to keep the experience fresh."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What devices and browsers are supported?",
          answer: "Mocker works on all modern browsers (Chrome, Firefox, Safari, Edge) on desktop, tablet, and mobile devices. For the best experience, we recommend using a desktop with a stable internet connection and microphone access."
        },
        {
          question: "Do I need special software or equipment?",
          answer: "No special software is required. You just need a web browser, internet connection, and microphone access for voice interviews. A webcam is not needed."
        },
        {
          question: "What if I experience technical issues during an interview?",
          answer: "If you encounter technical problems, contact our support team if issues persist - we're here to help!"
        },
        {
          question: "Is my data and interview content secure?",
          answer: "Absolutely. We use enterprise-grade security measures to protect your data. Interview recordings and personal information are encrypted and stored securely. We never share your data with third parties."
        }
      ]
    },
    {
      category: "Advanced Features",
      questions: [
        {
          question: "Can I practice interviews for specific companies?",
          answer: "Yes, just ask the AI Interviewer for the company-specific interview preparation you want to do. For example preparing for major tech companies like Google, Amazon, Microsoft, Meta, and many others. The AI Interviewer will tailor it to your specific needs."
        },
        {
          question: "Are there industry-specific interview tracks?",
          answer: "As of now no, it is specifically designed with programmers in mind. However, we are working on adding more tracks for other industries and roles."
        },
        {
          question: "Can I get help with salary negotiations?",
          answer: "Yes, our platform includes salary negotiation practice sessions where you can learn effective negotiation strategies and practice common scenarios with our AI."
        },
        {
          question: "Do you offer interview tips and resources?",
          answer: "Our platform includes a comprehensive library of interview tips, common questions, best practices, and study materials. You'll also find links to external resources for continued learning."
        }
      ]
    }
  ];

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  // Animation variants
  const accordionVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.4,
          ease: [0.04, 0.62, 0.23, 0.98]
        },
        opacity: {
          duration: 0.25,
          delay: 0.15
        }
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          duration: 0.4,
          ease: [0.04, 0.62, 0.23, 0.98]
        },
        opacity: {
          duration: 0.25
        }
      }
    }
  };

  const contentVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: {
          duration: 0.4,
          ease: [0.04, 0.62, 0.23, 0.98],
          delay: 0.1
        },
        opacity: {
          duration: 0.25,
          delay: 0.2
        }
      }
    },
    closed: {
      y: -10,
      opacity: 0,
      transition: {
        duration: 0.25
      }
    }
  };

  const chevronVariants = {
    open: {
      rotate: 180,
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    },
    closed: {
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    }
  };

  return (
    <div className="min-h-screen bg-none p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl p-2">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Find answers to common questions about Mocker and get the most out of your interview practice
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <Input 
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-zinc-900 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12"
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="space-y-8">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-zinc-900 rounded-3xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center">
                    <span className="text-lg">❓</span>
                  </div>
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq, index) => {
                    const globalIndex = categoryIndex * 100 + index;
                    const isOpen = openItems.includes(globalIndex);
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                        className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden"
                      >
                        <motion.button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                          whileTap={{ scale: 0.995 }}
                        >
                          <h3 className="text-white font-semibold text-lg pr-4">
                            {faq.question}
                          </h3>
                          <motion.div
                            variants={chevronVariants}
                            animate={isOpen ? "open" : "closed"}
                          >
                            <ChevronDown className="w-5 h-5 text-white/70 flex-shrink-0" />
                          </motion.div>
                        </motion.button>
                        
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              variants={accordionVariants}
                              initial="closed"
                              animate="open"
                              exit="closed"
                              style={{ overflow: "hidden" }}
                            >
                              <motion.div
                                variants={contentVariants}
                                className="px-6 pb-6"
                              >
                                <div className="border-t border-white/10 pt-4">
                                  <p className="text-white/80 leading-relaxed">
                                    {faq.answer}
                                  </p>
                                </div>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900 rounded-3xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white/50" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-white/70">Try adjusting your search terms or browse all questions above</p>
              <Button 
                onClick={() => setSearchTerm("")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                Clear Search
              </Button>
            </motion.div>
          )}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-zinc-900 rounded-3xl p-8 mt-8"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
            <p className="text-white/70 mb-6">
              Can&apos;t find what you&lsquo;re looking for? Our support team is here to help!
            </p>
            
            <div className="flex gap-4 justify-center max-sm:flex-col">
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
                <a href="mailto:contact@devtodefy.com" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Support
                </a>
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 rounded-xl transition-all duration-300">
                 <a href="mailto:contact@devtodefy.com" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Send Feedback
                </a>
              </Button>
            </div>
          </div>
        </motion.div>  
    </div>
    </div>
  );
};

export default FAQ;