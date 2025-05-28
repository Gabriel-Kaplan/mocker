/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import Link from "next/link";
import { NotebookPen, TargetIcon, Search, Filter, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function AllInterviews() {
  const user = await getCurrentUser();

  const [userInterviews, allInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const totalUserInterviews = userInterviews?.length || 0;
  const totalAvailableInterviews = allInterviews?.length || 0;

  return (
    <div className="min-h-screen bg-none p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl p-2">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              All Interviews
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Track your progress and discover new practice opportunities
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-zinc-900 rounded-3xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                <Input 
                  placeholder="Search interviews by role, tech stack..."
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl"
                />
              </div>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl text-sm">
                Sort by Date
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl text-sm">
                Sort by Role
              </Button>
            </div>
          </div>
        </div>

        {/* Your Completed Interviews */}
        <section className="bg-zinc-900 rounded-3xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <NotebookPen className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Your Completed Interviews</h2>
              <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                {totalUserInterviews} interviews
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            {totalUserInterviews > 0 ? (
              <div className="p-6">
                <div className="grid gap-4">
                  {userInterviews?.map((interview) => (
                    <div key={interview.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <InterviewCard
                        userId={user?.id}
                        interviewId={interview.id}
                        role={interview.role}
                        type={interview.type}
                        techstack={interview.techstack}
                        createdAt={interview.createdAt}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📋</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No completed interviews yet</h3>
                <p className="text-white/70 mb-6">Start your first practice interview to build your history</p>
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
                <TargetIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Available Practice Interviews</h2>
              <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                {totalAvailableInterviews} available
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            {totalAvailableInterviews > 0 ? (
              <div className="p-6">
                <div className="grid gap-4">
                  {allInterviews?.map((interview) => (
                    <div key={interview.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <InterviewCard
                        userId={user?.id}
                        interviewId={interview.id}
                        role={interview.role}
                        type={interview.type}
                        techstack={interview.techstack}
                        createdAt={interview.createdAt}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No practice interviews available</h3>
                <p className="text-white/70 mb-6">Check back later for new practice opportunities</p>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105">
                  <Link href="/interview">Create New Interview</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-zinc-900 rounded-3xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready for More Practice?</h3>
            <p className="text-white/70 mb-6">Keep building your skills with personalized interview sessions</p>
            
            <div className="flex gap-4 justify-center max-sm:flex-col">
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
                <Link href="/interview">Start New Interview</Link>
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 rounded-xl transition-all duration-300">
                <Link href="/progress">View Progress</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AllInterviews;