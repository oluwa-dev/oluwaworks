/** @format */
"use client";
import { useEffect, useState } from "react";
import TestimonialCard from "./card";
import { toast } from "@/hooks/use-toast";

// Fix: This should be a single testimonial item, not wrapped in data array
export type Testimonial = {
  id?: string;
  quote: string;
  name: string;
  role?: string;
  businessName?: string;
  avatar?: string;
  createdAt?: Date;
};

const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Delivered a polished site ahead of schedule. Traffic up, headaches down.",
    name: "Ada G.",
    role: "Founder, DTC brand",
  },
  {
    quote: "Clear comms, data‑driven decisions, and measurable results.",
    name: "Sam T.",
    role: "Head of Growth",
  },
  {
    quote: "Took our Webflow mess and turned it into a scalable system.",
    name: "Lena R.",
    role: "Marketing Lead",
  },
  {
    quote: "Dashboard shipped with blazing performance and zero drama.",
    name: "Imran K.",
    role: "CTO",
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(SAMPLE_TESTIMONIALS);
  const [isLoading, setIsLoading] = useState(false);
const [err, setErr] = useState< string | null >(null)
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/feedback?limite=10");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        let transformedData: Testimonial[];

        
        const testimonialItems = data.data || data; 

       transformedData = testimonialItems.map((item: any) => ({
         id: item.id,
         quote: item.feedback,
         name: item.name,
         role: item.role || item.businessName, 
         businessName: item.businessName, 
         avatar: item.imageUrl,
         createdAt: item.createdAt,
       }));
        if (transformedData.length > 0) {

          // console.log(transformedData);
          
          setTestimonials(transformedData);
        }
      } catch (error) {

        setErr("Failed to load Reviews")
        // toast({
        //   title: "Error",
        //   description: "Failed to load testimonials",
        //   variant: "destructive",
        // });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <section className="bg-brand-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-semibold md:text-4xl">What Clients Say</h2>
        <p className="mt-2 max-w-prose text-slate-300">
          Results, reliability, and a smooth process.
        </p>

        {isLoading && (
          <div className="mt-8 text-slate-400">Loading...</div>
        )}

        <p className="text-gray-300 text-[14px] italic">
          {err}
        </p>

        <div className="mt-8 overflow-hidden">
          <div className="flex min-w-max gap-4 animate-[marquee_22s_linear_infinite] [--tw:80%] hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={`marquee-${i}`} t={t} />
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <TestimonialCard key={`grid-${i}`} t={t} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
}
