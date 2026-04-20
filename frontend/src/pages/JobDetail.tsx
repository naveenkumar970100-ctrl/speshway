import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, MapPin, Clock, DollarSign, Briefcase, Calendar, CheckCircle } from "lucide-react";
import GooeyButton from "@/components/GooeyButton";

interface Job {
  _id: string; title: string; location: string; type: string; salary: string;
  department: string; experience: string; desc: string; requirements: string[];
  status: string; createdAt: string;
}

const statusColors: Record<string, string> = {
  Open: "bg-green-500/10 text-green-500 border-green-500/20",
  Closed: "bg-red-500/10 text-red-500 border-red-500/20",
  Draft: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then(r => r.json())
      .then(data => { setJob(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    </Layout>
  );

  if (!job || job.status === "Closed") return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="text-6xl">🔍</div>
        <h2 className="text-2xl font-heading font-bold text-foreground">Job not found</h2>
        <button onClick={() => navigate("/career")} className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold">
          <ArrowLeft size={18} /> Back to Careers
        </button>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="container py-5 md:py-10 max-w-5xl px-3 md:px-4">
        {/* Back */}
        <button onClick={() => navigate("/career")}
          className="flex items-center gap-1.5 px-3 md:px-5 py-2 md:py-2.5 rounded-full glass border border-border text-muted-foreground font-bold text-xs md:text-sm hover:text-foreground hover:border-primary/30 transition-all duration-300 mb-4 md:mb-8 w-fit">
          <ArrowLeft size={14} /> Back to Careers
        </button>

        {/* Header */}
        <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-8 border border-border mb-4 md:mb-6">
          <div className="flex flex-wrap items-start justify-between gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <span className={`inline-flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-[11px] font-bold border ${statusColors[job.status] || ""}`}>
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-current animate-pulse" />{job.status}
                </span>
                {job.location && <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-muted text-muted-foreground text-[10px] md:text-[11px] font-bold">{job.location}</span>}
                {job.type && <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-muted text-muted-foreground text-[10px] md:text-[11px] font-bold">{job.type}</span>}
              </div>
              <h1 className="text-xl md:text-4xl font-heading font-black text-foreground leading-tight">{job.title}</h1>
            </div>
            <Link to={`/career/${id}/apply`}>
              <button className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-primary text-white font-bold text-xs md:text-sm uppercase tracking-wider">
                Apply Now →
              </button>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Job details table */}
            <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-8 border border-border">
              <div className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                <div>
                  <span className="text-muted-foreground font-medium">Job Title:</span>
                  <p className="text-foreground font-semibold mt-0.5 text-xs md:text-sm">{job.title}</p>
                </div>
                {job.location && (
                  <div>
                    <span className="text-muted-foreground font-medium">Location:</span>
                    <p className="text-foreground font-semibold mt-0.5 text-xs md:text-sm">{job.location}</p>
                  </div>
                )}
                {job.experience && (
                  <div>
                    <span className="text-muted-foreground font-medium">Experience:</span>
                    <p className="text-foreground font-semibold mt-0.5 text-xs md:text-sm">{job.experience} years</p>
                  </div>
                )}
                {job.salary && (
                  <div>
                    <span className="text-muted-foreground font-medium">Salary:</span>
                    <p className="text-foreground font-semibold mt-0.5 text-xs md:text-sm">{job.salary}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-8 border border-border">
              <h2 className="text-sm md:text-lg font-heading font-black text-foreground mb-2 md:mb-4">Summary</h2>
              <p className="text-muted-foreground text-xs md:text-base leading-relaxed whitespace-pre-line">{job.desc}</p>
            </div>

            {/* Requirements */}
            {job.requirements?.length > 0 && (
              <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-8 border border-border">
                <h2 className="text-sm md:text-lg font-heading font-black text-foreground mb-2 md:mb-4">Requirements</h2>
                <ul className="space-y-2 md:space-y-3">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 md:gap-3 text-muted-foreground text-xs md:text-base">
                      <CheckCircle size={13} className="text-primary shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Apply CTA */}
            <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-8 border border-border text-center">
              <h3 className="text-base md:text-xl font-heading font-black text-foreground mb-2 md:mb-3">Interested in this role?</h3>
              <p className="text-muted-foreground text-xs md:text-base mb-4 md:mb-6">Send us your resume and we'll get back to you soon.</p>
              <Link to={`/career/${id}/apply`}>
                <GooeyButton color="primary">
                  Apply Now <ArrowLeft size={14} className="inline ml-2 rotate-180" />
                </GooeyButton>
              </Link>
            </div>
          </div>

          {/* Sidebar — Key job details */}
          <div>
            <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-6 border border-border lg:sticky lg:top-28">
              <h3 className="text-xs md:text-sm font-black text-foreground uppercase tracking-widest mb-3 md:mb-5">Key Job Details</h3>
              <div className="space-y-2 md:space-y-4 text-xs md:text-sm">
                {[
                  { icon: Briefcase, label: "Job category", value: job.department },
                  { icon: MapPin, label: "Location", value: job.location },
                  { icon: Calendar, label: "Date published", value: new Date(job.createdAt).toLocaleDateString() },
                  { icon: Clock, label: "Employment type", value: job.type },
                  { icon: DollarSign, label: "Salary", value: job.salary },
                  { icon: CheckCircle, label: "Experience", value: job.experience ? `${job.experience} years` : null },
                ].filter(i => i.value).map(item => (
                  <div key={item.label} className="flex items-center justify-between py-1.5 md:py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <item.icon size={12} className="text-primary" />{item.label}:
                    </span>
                    <span className="font-semibold text-foreground text-right text-xs">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
