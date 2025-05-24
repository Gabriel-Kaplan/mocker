import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    userId: user?.id!,
  });

  // Define thresholds for interview performance
  const PASSING_SCORE = 70; // Minimum score to "pass" the interview
  const GOOD_SCORE = 85; // Score considered "good performance"
  
  // Determine if retake should be offered based on score
  const totalScore = feedback?.totalScore || 0;
  const shouldOfferRetake = totalScore < PASSING_SCORE;
  const isGoodPerformance = totalScore >= GOOD_SCORE;

  // Generate performance message based on score
  const getPerformanceMessage = (score: number) => {
    if (score >= GOOD_SCORE) {
      return "Excellent performance! You demonstrated strong competency across all areas.";
    } else if (score >= PASSING_SCORE) {
      return "Good performance overall. You met the basic requirements with room for improvement.";
    } else {
      return "There's significant room for improvement. Consider retaking the interview after reviewing the feedback.";
    }
  };

  // Determine button text and styling based on performance
  const getRetakeButtonConfig = (score: number) => {
    if (score < PASSING_SCORE) {
      return {
        text: "Retake Interview",
        className: "btn-primary",
        textColor: "text-white"
      };
    } else {
      return {
        text: "Practice Again",
        className: "btn-secondary",
        textColor: "text-primary-200"
      };
    }
  };

  const retakeConfig = getRetakeButtonConfig(totalScore);

  return (
    <section className="section-feedback">
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold">
          Feedback on the Interview -{" "}
          <span className="capitalize">{interview.role}</span> Interview
        </h1>
      </div>

      <div className="flex flex-row justify-center ">
        <div className="flex flex-row gap-5">
          {/* Overall Impression */}
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p>
              Overall Impression:{" "}
              <span 
                className={`font-bold ${
                  totalScore >= GOOD_SCORE 
                    ? 'text-green-600' 
                    : totalScore >= PASSING_SCORE 
                    ? 'text-yellow-600' 
                    : 'text-red-600'
                }`}
              >
                {feedback?.totalScore}
              </span>
              /100
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-row gap-2">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Performance Status Indicator */}
      <div className="flex justify-center mb-4">
        <div 
          className={`px-4 py-2 rounded-lg text-center ${
            totalScore >= GOOD_SCORE 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : totalScore >= PASSING_SCORE 
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          <p className="font-medium">{getPerformanceMessage(totalScore)}</p>
        </div>
      </div>

      <hr />

      <p>{feedback?.finalAssessment}</p>

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-4">
        <h2>Breakdown of the Interview:</h2>
        {feedback?.categoryScores?.map((category, index) => (
          <div key={index}>
            <p className="font-bold">
              {index + 1}. {category.name} (
              <span 
                className={
                  category.score >= GOOD_SCORE 
                    ? 'text-green-600' 
                    : category.score >= PASSING_SCORE 
                    ? 'text-yellow-600' 
                    : 'text-red-600'
                }
              >
                {category.score}
              </span>
              /100)
            </p>
            <p>{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h3>Strengths</h3>
        <ul>
          {feedback?.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3>Areas for Improvement</h3>
        <ul>
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        {/* Conditionally rendered retake button */}
        {shouldOfferRetake ? (
          <Button className={`${retakeConfig.className} flex-1`}>
            <Link
              href={`/interview/${id}`}
              className="flex w-full justify-center"
            >
              <p className={`text-sm font-semibold ${retakeConfig.textColor} text-center`}>
                {retakeConfig.text}
              </p>
            </Link>
          </Button>
        ) : (
          <Button className={`${retakeConfig.className} flex-1`}>
            <Link
              href={`/interview/${id}`}
              className="flex w-full justify-center"
            >
              <p className={`text-sm font-semibold ${retakeConfig.textColor} text-center`}>
                {retakeConfig.text}
              </p>
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};

export default Feedback;