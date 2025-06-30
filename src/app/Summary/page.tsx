"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import NavBar from "@/Komponenten /navBar/NavBar";
import Header from "@/Komponenten /Header/Header";

export default function SummaryPage() {
  const [todoCount] = useState(0);
  const [doneCount] = useState(0);
  const [urgentCount] = useState(0);
  const [nextDeadline] = useState("April 27, 2024");
  const [tasksInBoard] = useState(0);
  const [tasksInProgress] = useState(0);
  const [awaitingFeedback] = useState(0);
  const [daytimeGreeting, setDaytimeGreeting] = useState("Good Morning");
  const [nameGreeting] = useState("Guest");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setDaytimeGreeting("Good Morning");
    else if (hour < 18) setDaytimeGreeting("Good Afternoon");
    else setDaytimeGreeting("Good Evening");
  }, []);

  const redirectToBoard = () => alert("Redirect to Board");

  return (
    <section className="pt-[140px] lg:pl-[428px] px-4">
      <NavBar />
      <Header />
      <div className="flex items-center gap-[30px] mb-10 flex-wrap lg:flex-nowrap">
        <h1 className="text-[61px] font-bold leading-[73.2px]">Join 360</h1>
        <div className="hidden lg:block border-l-[3px] h-[59px] border-[#29ABE2]" />
        <p className="text-[27px] font-normal">Key Metrics at a Glance</p>
        <div className="block lg:hidden border-t-[3px] w-[90px] mt-2 border-[#29ABE2]" />
      </div>

      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex gap-[30px]">
            <SummaryCard
              icon="/pencil.png"
              hoverIcon="/pencil_hover.png"
              count={todoCount}
              label="To-do"
              onClick={redirectToBoard}
            />
            <SummaryCard
              icon="/check_summary.png"
              hoverIcon="/check_hover.png"
              count={doneCount}
              label="Done"
              onClick={redirectToBoard}
            />
          </div>

          {/* Urgency Box */}
          <div
            className="group bg-white w-[560px] h-[168px] rounded-[30px] flex items-center justify-center gap-[30px] cursor-pointer hover:scale-[1.05] transition-all duration-150 hover:bg-[#2A3647]"
            onClick={redirectToBoard}
          >
            <Image
              src="/urgency.png"
              alt="Urgency Icon"
              width={60}
              height={60}
              className="ml-6"
            />
            <div className="flex flex-col items-center text-center">
              <span className="text-[64px] font-semibold text-black group-hover:text-white">
                {urgentCount}
              </span>
              <span className="text-[20px] text-[#2A3647] group-hover:text-white">
                urgent
              </span>
            </div>
            <div className="border-l border-[#D1D1D1] h-[102px] mx-[80px]" />
            <div className="flex flex-col gap-[13px]">
              <span className="text-[21px] font-bold text-[#2A3647] group-hover:text-white">
                {nextDeadline}
              </span>
              <span className="text-[#2A3647] group-hover:text-white">
                Upcoming Deadline
              </span>
            </div>
          </div>

          {/* Task Progress Feedback */}
          <div className="flex gap-[30px] flex-wrap">
            <TPFBox count={tasksInBoard} label1="Tasks in" label2="Board" />
            <TPFBox
              count={tasksInProgress}
              label1="Tasks in"
              label2="Progress"
            />
            <TPFBox
              count={awaitingFeedback}
              label1="Awaiting"
              label2="Feedback"
            />
          </div>
        </div>

        {/* Greeting */}
        <div className="hidden lg:flex flex-col justify-center ml-[60px]">
          <span className="text-[47px] font-medium text-[#2A3647]">
            {daytimeGreeting}
          </span>
          <span className="text-[64px] font-bold text-[#29ABE2]">
            {nameGreeting}
          </span>
        </div>
      </div>
    </section>
  );
}

// SummaryCard-Komponente
type SummaryCardProps = {
  icon: string;
  hoverIcon: string;
  count: number;
  label: string;
  onClick: () => void;
};

function SummaryCard({
  icon,
  hoverIcon,
  count,
  label,
  onClick,
}: SummaryCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative w-[264px] h-[168px] bg-white rounded-[30px] flex items-center justify-center gap-4 cursor-pointer transition-transform hover:scale-[1.05] hover:bg-[#2A3647]"
    >
      <div className="relative w-[69px] h-[69px]">
        <Image src={icon} alt={label} fill className="group-hover:hidden" />
        <Image
          src={hoverIcon}
          alt={label}
          fill
          className="hidden group-hover:block"
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[64px] font-semibold text-black group-hover:text-white">
          {count}
        </span>
        <span className="text-[20px] text-[#2A3647] group-hover:text-white">
          {label}
        </span>
      </div>
    </div>
  );
}

// TPFBox-Komponente
type TPFBoxProps = {
  count: number;
  label1: string;
  label2: string;
};

function TPFBox({ count, label1, label2 }: TPFBoxProps) {
  return (
    <div
      className="group w-[168px] h-[168px] bg-white rounded-[30px] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#2A3647] hover:scale-[1.05] transition-all"
      onClick={() => alert("Redirect to Board")}
    >
      <span className="text-[64px] font-semibold text-black group-hover:text-white">
        {count}
      </span>
      <span className="text-[20px] text-[#2A3647] group-hover:text-white">
        {label1}
      </span>
      <span className="text-[20px] text-[#2A3647] group-hover:text-white">
        {label2}
      </span>
    </div>
  );
}
