/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import Link from "next/link";
import Image from "next/image";
import {TargetIcon, NotebookPen,ActivityIcon,} from "lucide-react"
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  // Calculate stats for dashboard metrics
  const totalInterviews = userInterviews?.length || 0;
  const recentInterviews = userInterviews?.filter(interview => {
    const interviewDate = new Date(interview.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return interviewDate >= weekAgo;
  }).length || 0;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-grey-900 p-12 mb-8 border-2 border-grey">
        <div className="absolute inset-0 bg-black/20 "></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-600/20 to-grey-600/20"></div>
        
        <div className="relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Let&apos;s get you 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> interview-ready</span> , {user?.name}!
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 max-w-3xl mx-auto">
              <strong>Train smarter. Perform better.</strong> <br />
              With Mocker&apos;s advanced AI interviewers like Miva, you&apos;ll get personalized feedback, realistic scenarios, and the edge you need to stand out.
            </p>
            
            <div className="flex gap-6 justify-center max-sm:flex-col max-sm:items-center">
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-bold px-10 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 text-lg">
                <Link href="/interview">Start Practice Interview</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      {/* Quick Stats Dashboard */}
      <section id="dashboard" className="bg-zinc-900 rounded-3xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-xl">📊</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Your Dashboard</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <span className="text-sm font-medium text-white/70 bg-white/10 px-3 py-1 rounded-full">Total</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{totalInterviews}</h3>
            <p className="text-white/70 text-sm">Interviews You Completed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <span className="text-sm font-medium text-green-300 bg-green-500/20 px-3 py-1 rounded-full">This Week</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{recentInterviews}</h3>
            <p className="text-white/70 text-sm">Recent Practice</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <span className="text-sm font-medium text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">Available</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{allInterview?.length || 0}</h3>
            <p className="text-white/70 text-sm">Community Made Interviews</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500/30 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <span className="text-sm font-medium text-orange-300 bg-orange-500/20 px-3 py-1 rounded-full">Streak</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{recentInterviews > 0 ? '🔥' : '0'}</h3>
            <p className="text-white/70 text-sm">Practice Streak</p>
          </div>
        </div>
      </section>

      {/* Quick Actions Panel */}
      <section className="bg-zinc-900 rounded-3xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-xl"><ActivityIcon/></span>
          </div>
          <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/interview" className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/30 rounded-xl flex items-center justify-center group-hover:bg-indigo-500/40 transition-colors">
                <span className="text-2xl">💼</span>
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">New Interview</h3>
                <p className="text-sm text-white/70"></p>
              </div>
            </div>
          </Link>

          <Link href="/progress" className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-green-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/30 rounded-xl flex items-center justify-center group-hover:bg-green-500/40 transition-colors">
                <span className="text-2xl">📈</span>
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-green-300 transition-colors">View Progress</h3>
                <p className="text-sm text-white/70">Track your improvement</p>
              </div>
            </div>
          </Link>

          <Link href="https://www.interviewbit.com/technical-interview-questions/" className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-purple-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center group-hover:bg-purple-500/40 transition-colors">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">Study Resources</h3>
                <p className="text-sm text-white/70">Tips and guides</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Header Section */}
      <section className="relative overflow-hidden rounded-3xl bg-zinc-900 p-8 mb-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between max-lg:flex-col max-lg:gap-6">
            <div className="flex flex-col gap-4 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Ready to Level Up?</h2>
              </div>
              
              <p className="text-lg text-white/90 leading-relaxed">
                Your journey to interview success starts here. Choose from our comprehensive practice sessions tailored to your career goals.
              </p>
              
              <div className="flex gap-4 mt-4 max-sm:flex-col">
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700  font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
                  <Link href="/interview">Quick Start</Link>
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl px-8 py-3">
                  <Link href="/allInterviews">Browse All</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-full blur-xl"></div>
              <Image
                src="/rocket5.png"
                alt="AI Interview Assistant"
                width={380}
                height={280}
                className="relative z-10 max-sm:w-48 max-sm:h-48 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Your Interview History */}
      <section className="bg-zinc-900 rounded-3xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-xl"><NotebookPen/></span>
            </div>
            <h2 className="text-2xl font-bold text-white">Your Interview History</h2>
          </div>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-300">
              <Link href="/allInterviews">View All History</Link>
            </Button>
          
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
          {hasPastInterviews ? (
            <div className="interviews-section p-6">
              {userInterviews?.slice(0, 3).map((interview) => (
                <InterviewCard
                  key={interview.id}
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              ))}
              {userInterviews?.length! > 3 && (
                <div className="text-center pt-4 border-t border-white/20">
                  <Button variant="ghost" className="text-blue-300 hover:text-blue-200 hover:bg-white/10 rounded-xl">
                    <Link href="/allInterviews">Show {userInterviews?.length! - 3} more interviews</Link>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No interviews yet</h3>
              <p className="text-white/70 mb-6">Start your first practice interview to see your progress here</p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105">
                <Link href="/interview">Take Your First Interview</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Available Practice Interviews */}
      <section className="bg-zinc-900 rounded-3xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-xl"><TargetIcon/></span>
            </div>
            <h2 className="text-2xl font-bold text-white">Available Practice Interviews</h2>
          </div>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-300">
              <Link href="/browse">Browse All</Link>
            </Button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
          {hasUpcomingInterviews ? (
            <div className="interviews-section p-6">
              {allInterview?.slice(0, 4).map((interview) => (
                <InterviewCard
                  key={interview.id}
                  userId={user?.id}
                  interviewId={interview.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              ))}
              {allInterview?.length! > 4 && (
                <div className="text-center pt-4 border-t border-white/20">
                  <Button variant="ghost" className="text-emerald-300 hover:text-emerald-200 hover:bg-white/10 rounded-xl">
                    <Link href="/browse">Show {allInterview?.length! - 4} more opportunities</Link>
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No interviews available</h3>
              <p className="text-white/70 mb-6">Check back later for new practice opportunities</p>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-6 py-3">
                Refresh Page
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Motivational Footer */}
      <section className="bg-zinc-900 to-grey-900 rounded-3xl p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-3">
            &quot;Success is where preparation meets opportunity&quot;
          </h3>
          <p className="text-white/90 text-lg mb-6">
            Every practice session brings you closer to landing your dream job. Keep going!
          </p>
          <div className="flex gap-4 justify-center max-sm:flex-col">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700  font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
              <Link href="/interview">Start Practice Interview</Link>
            </Button>

            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 rounded-xl transition-all duration-300">
              <Link href="https://www.techinterviewhandbook.org/software-engineering-interview-guide/">Get Pro Tips</Link>
            </Button>
          </div>
        </div>
      </section>

      {/*Page Footer*/}
       <footer className="bg-transparent rounded-3xl p-8 mt-12 ">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center">
                <Image src="/mockerlogo.png" alt="MockMate Logo" width={38} height={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Mocker</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Master your interviews with AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/interview" className="text-white/70 hover:text-white transition-colors text-sm">
                  Start Interview
                </Link>
              </li>
              <li>
                <Link href="#dashboard" className="text-white/70 hover:text-white transition-colors text-sm">
                  Interview History
                </Link>
              </li>
              <li>
                <Link href="#dashboard" className="text-white/70 hover:text-white transition-colors text-sm">
                  Progress Tracking
                </Link>
              </li>
              <li>
                <Link href="/allInterviews" className="text-white/70 hover:text-white transition-colors text-sm">
                  Browse Interviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="https://www.techinterviewhandbook.org/software-engineering-interview-guide/" className="text-white/70 hover:text-white transition-colors text-sm">
                  Interview Tips
                </Link>
              </li>
              <li>
                <Link href="https://leetcode.com/problemset/" className="text-white/70 hover:text-white transition-colors text-sm">
                  Study Guides
                </Link>
              </li>
              <li>
                <Link href="https://www.interviewbit.com/technical-interview-questions/" className="text-white/70 hover:text-white transition-colors text-sm">
                  Learning Materials
                </Link>
              </li>
              <li>
                <Link href="/FAQS" className="text-white/70 hover:text-white transition-colors text-sm">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
                <li>
              <a href="mailto:contact@devtodefy.com" className="text-white/70 hover:text-white transition-colors text-sm">
                Contact Us
              </a>
            </li>
            <li>
              <a href="mailto:contact@devtodefy.com" className="text-white/70 hover:text-white transition-colors text-sm">
                Send Feedback
              </a>
            </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/70 text-sm">
              © 2025 Mocker. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-white/70 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
    
  );
}

export default Home;