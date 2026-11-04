import React, { useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import {
    BookOpen,
    CheckCircle2,
    ArrowRight,
    Loader2,
    Upload,
    AlertCircle,
    FileText,
} from "lucide-react";

export default function SubmitAbstract({ conclaves = [] }) {
    const [formData, setFormData] = useState({
        author_name: "",
        author_email: "",
        author_phone: "",
        affiliation: "",
        title: "",
        track_category:
            conclaves[0]?.title || "Clinical Ayurveda & Integrative Medicine",
        conclave_id: conclaves[0]?.id || "",
        abstract_text: "",
        keywords: "",
        presentation_type: "oral",
    });

    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [successResult, setSuccessResult] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleConclaveChange = (e) => {
        const selectedId = e.target.value;
        const found = conclaves.find(
            (c) => String(c.id) === String(selectedId),
        );
        setFormData({
            ...formData,
            conclave_id: selectedId,
            track_category: found ? found.title : formData.track_category,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg(null);

        const data = new FormData();
        Object.keys(formData).forEach((k) => {
            if (formData[k]) data.append(k, formData[k]);
        });
        if (file) {
            data.append("file", file);
        }

        try {
            const res = await fetch("/api/abstracts", {
                method: "POST",
                headers: { Accept: "application/json" },
                body: data,
            });
            const resData = await res.json();
            if (res.ok) {
                setSuccessResult(resData);
            } else {
                setErrorMsg(
                    resData.message || "Error submitting abstract paper.",
                );
            }
        } catch (e) {
            setErrorMsg("Network error while uploading abstract.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AppLayout
            title="Research & Publication — Call for Abstracts"
            description="AYURPRAVAH 2027 invites researchers, academicians, clinicians, postgraduate scholars and students to contribute original work to its Research & Publication track."
        >
            {() => (
                <div className="py-8 sm:py-12 pb-24 sm:pb-16 space-y-8 sm:space-y-12">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-xs sm:text-sm font-sans font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#3e7405] uppercase">
                            Research & Publication Track
                        </span>
                        <h1 className="mt-2 sm:mt-3 font-heading text-3xl sm:text-5xl font-black text-[#164a08]">
                            Share. Present. Publish.
                        </h1>
                        <div className="mt-3 sm:mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-4 sm:mt-5 max-w-3xl mx-auto text-sm sm:text-base md:text-lg font-sans text-[#503323] leading-relaxed">
                            AYURPRAVAH 2027 invites researchers, academicians,
                            clinicians, postgraduate scholars and students to
                            contribute original work to its Research &
                            Publication track across Ayurveda, AYUSH
                            disciplines, integrative healthcare, pharmaceutical
                            science and technology.
                        </p>
                    </div>

                    {/* Important Dates & Awards Grid */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            {/* Awards Card */}
                            <div className="bg-[#F7F5EC] p-5 sm:p-6 rounded-2xl border border-[#164a08]/20 space-y-3">
                                <span className="text-xs font-sans font-bold text-[#3e7405] uppercase tracking-wider block">
                                    Research Presentation Awards
                                </span>
                                <div className="space-y-2 text-xs sm:text-sm">
                                    <div className="flex items-center justify-between font-semibold text-[#164a08] border-b border-black/5 pb-1.5">
                                        <span>First Prize:</span>
                                        <span className="font-bold font-mono">
                                            ₹10,000 + Certificate & Trophy
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between font-semibold text-[#164a08] border-b border-black/5 pb-1.5">
                                        <span>Second Prize:</span>
                                        <span className="font-bold font-mono">
                                            ₹5,000 + Certificate & Trophy
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between font-semibold text-[#164a08] border-b border-black/5 pb-1.5">
                                        <span>Third Prize:</span>
                                        <span className="font-bold font-mono">
                                            ₹2,500 + Certificate & Trophy
                                        </span>
                                    </div>
                                    <p className="text-[11px] sm:text-xs text-[#503323]/80 pt-1">
                                        ISBN-approved certificates provided.
                                        Selected best papers may be considered
                                        for publication in reputed journals.
                                    </p>
                                </div>
                            </div>

                            {/* Important Deadlines Card */}
                            <div className="bg-[#F7F5EC] p-5 sm:p-6 rounded-2xl border border-[#164a08]/20 space-y-3">
                                <span className="text-xs font-sans font-bold text-[#3e7405] uppercase tracking-wider block">
                                    Important Milestones & Deadlines
                                </span>
                                <div className="space-y-2 text-xs sm:text-sm">
                                    <div className="flex items-center justify-between text-[#503323] border-b border-black/5 pb-1.5">
                                        <span>Abstract Submission:</span>
                                        <span className="font-bold text-[#164a08]">
                                            10 February 2027
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-[#503323] border-b border-black/5 pb-1.5">
                                        <span>Acceptance Confirmation:</span>
                                        <span className="font-bold text-[#164a08]">
                                            10 March 2027
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-[#503323] border-b border-black/5 pb-1.5">
                                        <span>Full Paper & PPT:</span>
                                        <span className="font-bold text-[#164a08]">
                                            1 April 2027
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-[#503323]">
                                        <span>Poster Soft-Copy:</span>
                                        <span className="font-bold text-[#164a08]">
                                            4 April 2027
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-stone-200/80 shadow-md">
                            {successResult ? (
                                <div className="text-center py-8 space-y-5">
                                    <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h2 className="font-heading text-2xl font-bold text-[#164a08]">
                                        Abstract Submitted Successfully!
                                    </h2>
                                    <p className="text-base text-stone-700 max-w-md mx-auto leading-relaxed">
                                        {successResult.message}
                                    </p>
                                    <div className="bg-[#F7F5EC] p-5 rounded-2xl text-sm font-mono text-[#164a08] max-w-sm mx-auto">
                                        Submission Tracking ID:{" "}
                                        {successResult.uuid}
                                    </div>
                                    <p className="text-sm text-[#3e7405]">
                                        The scientific peer review board will
                                        notify you regarding oral/poster
                                        acceptance and presentation schedule.
                                    </p>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    {errorMsg && (
                                        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-2xl flex items-center space-x-2">
                                            <AlertCircle className="w-5 h-5 shrink-0" />
                                            <span>{errorMsg}</span>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                                Lead Author Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.author_name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        author_name:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="e.g. Dr. Ramesh Gupta"
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                                Author Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.author_email}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        author_email:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="author@university.edu"
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                                Phone / WhatsApp *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.author_phone}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        author_phone:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="+91 98765 43210"
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                                Institutional Affiliation *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.affiliation}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        affiliation:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="Department & Medical College / Institute"
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                                Scientific Track *
                                            </label>
                                            <select
                                                value={formData.conclave_id}
                                                onChange={handleConclaveChange}
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-[#164a08]/30"
                                            >
                                                {conclaves.map((c) => (
                                                    <option
                                                        key={c.id}
                                                        value={c.id}
                                                    >
                                                        {c.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                                Presentation Mode *
                                            </label>
                                            <select
                                                value={
                                                    formData.presentation_type
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        presentation_type:
                                                            e.target.value,
                                                    })
                                                }
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-[#164a08]/30"
                                            >
                                                <option value="oral">
                                                    Oral Podium Presentation (10
                                                    min + 5 min Q&A)
                                                </option>
                                                <option value="poster">
                                                    Scientific Poster Display &
                                                    Defense
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                            Paper Title *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    title: e.target.value,
                                                })
                                            }
                                            placeholder="Concise, descriptive title of your research paper"
                                            className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                            Abstract Text (Max 350 Words) *
                                        </label>
                                        <textarea
                                            rows="6"
                                            required
                                            value={formData.abstract_text}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    abstract_text:
                                                        e.target.value,
                                                })
                                            }
                                            placeholder="Include Background, Methodology, Results, and Clinical Conclusion..."
                                            className="w-full text-sm border border-stone-300 rounded-2xl p-3 font-sans focus:ring-2 focus:ring-[#164a08]/30"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                            Keywords (Comma separated)
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.keywords}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    keywords: e.target.value,
                                                })
                                            }
                                            placeholder="e.g. Panchakarma, Rheumatoid Arthritis, Metabolomics, Bio-sensors"
                                            className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#503323] mb-1.5">
                                            Attach Full Manuscript / Document
                                            (PDF / DOCX, Optional)
                                        </label>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) =>
                                                setFile(
                                                    e.target.files[0] || null,
                                                )
                                            }
                                            className="w-full text-sm border border-stone-300 rounded-xl p-2.5 text-stone-600 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#164a08] file:text-white hover:file:bg-[#164a08]"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-[#164a08] text-white py-3.5 sm:py-4 px-4 sm:px-8 rounded-full font-heading text-xs sm:text-sm font-bold tracking-wider hover:bg-[#0e3005] transition flex items-center justify-center space-x-2 shadow-md disabled:opacity-50 cursor-pointer"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-[#DFC479] shrink-0" />
                                                <span>
                                                    SUBMITTING ABSTRACT...
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-center">
                                                    SUBMIT SCIENTIFIC ABSTRACT
                                                </span>
                                                <ArrowRight className="w-4 h-4 text-[#DFC479] shrink-0" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
