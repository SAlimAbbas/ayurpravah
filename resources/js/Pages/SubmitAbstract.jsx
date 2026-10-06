import React, { useState } from 'react';
import AppLayout from '../Layouts/AppLayout';
import { BookOpen, CheckCircle2, ArrowRight, Loader2, Upload, AlertCircle, FileText } from 'lucide-react';

export default function SubmitAbstract({ conclaves = [] }) {
    const [formData, setFormData] = useState({
        author_name: '',
        author_email: '',
        author_phone: '',
        affiliation: '',
        title: '',
        track_category: conclaves[0]?.title || 'Clinical Ayurveda & Integrative Medicine',
        conclave_id: conclaves[0]?.id || '',
        abstract_text: '',
        keywords: '',
        presentation_type: 'oral',
    });

    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [successResult, setSuccessResult] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleConclaveChange = (e) => {
        const selectedId = e.target.value;
        const found = conclaves.find(c => String(c.id) === String(selectedId));
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
        Object.keys(formData).forEach(k => {
            if (formData[k]) data.append(k, formData[k]);
        });
        if (file) {
            data.append('file', file);
        }

        try {
            const res = await fetch('/api/abstracts', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: data,
            });
            const resData = await res.json();
            if (res.ok) {
                setSuccessResult(resData);
            } else {
                setErrorMsg(resData.message || 'Error submitting abstract paper.');
            }
        } catch (e) {
            setErrorMsg('Network error while uploading abstract.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AppLayout
            title="Call for Papers — Scientific Abstract Submission"
            description="Submit your original clinical research, randomized trial data, or theoretical treatise for oral or poster defense at AYURPRAVAH 2027."
        >
            {() => (
                <div className="py-12 space-y-12">
                    {/* Header */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-sm font-sans font-bold tracking-[0.25em] text-[#3e7405] uppercase">
                            Peer-Reviewed Scientific Forum
                        </span>
                        <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-black text-[#164a08]">
                            Call for Scientific Papers
                        </h1>
                        <div className="mt-4 w-20 h-1 bg-[#164a08] mx-auto rounded-full"></div>
                        <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg font-sans text-[#503323] leading-relaxed">
                            Submit your clinical trials, pharmaco-epidemiological surveys, AI phenotyping algorithms,
                            or classical literary hermeneutics across any of our 13 thematic conclave tracks.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-md">
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
                                        Submission Tracking ID: {successResult.uuid}
                                    </div>
                                    <p className="text-sm text-[#3e7405]">
                                        The scientific peer review board will notify you regarding oral/poster acceptance and presentation schedule.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {errorMsg && (
                                        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-2xl flex items-center space-x-2">
                                            <AlertCircle className="w-5 h-5 shrink-0" />
                                            <span>{errorMsg}</span>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">Lead Author Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.author_name}
                                                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                                                placeholder="e.g. Dr. Ramesh Gupta"
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">Author Email *</label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.author_email}
                                                onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
                                                placeholder="author@university.edu"
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">Phone / WhatsApp *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={formData.author_phone}
                                                onChange={(e) => setFormData({ ...formData, author_phone: e.target.value })}
                                                placeholder="+91 98765 43210"
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">Institutional Affiliation *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.affiliation}
                                                onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                                                placeholder="Department & Medical College / Institute"
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">Scientific Track *</label>
                                            <select
                                                value={formData.conclave_id}
                                                onChange={handleConclaveChange}
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-[#164a08]/30"
                                            >
                                                {conclaves.map((c) => (
                                                    <option key={c.id} value={c.id}>{c.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#503323] mb-1.5">Presentation Mode *</label>
                                            <select
                                                value={formData.presentation_type}
                                                onChange={(e) => setFormData({ ...formData, presentation_type: e.target.value })}
                                                className="w-full text-sm border border-stone-300 rounded-xl p-3 bg-white focus:ring-2 focus:ring-[#164a08]/30"
                                            >
                                                <option value="oral">Oral Podium Presentation (10 min + 5 min Q&A)</option>
                                                <option value="poster">Scientific Poster Display & Defense</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#503323] mb-1.5">Paper Title *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="Concise, descriptive title of your research paper"
                                            className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#503323] mb-1.5">Abstract Text (Max 350 Words) *</label>
                                        <textarea
                                            rows="6"
                                            required
                                            value={formData.abstract_text}
                                            onChange={(e) => setFormData({ ...formData, abstract_text: e.target.value })}
                                            placeholder="Include Background, Methodology, Results, and Clinical Conclusion..."
                                            className="w-full text-sm border border-stone-300 rounded-2xl p-3 font-sans focus:ring-2 focus:ring-[#164a08]/30"
                                        ></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#503323] mb-1.5">Keywords (Comma separated)</label>
                                        <input
                                            type="text"
                                            value={formData.keywords}
                                            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                                            placeholder="e.g. Panchakarma, Rheumatoid Arthritis, Metabolomics, Bio-sensors"
                                            className="w-full text-sm border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#164a08]/30"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#503323] mb-1.5">Attach Full Manuscript / Document (PDF / DOCX, Optional)</label>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => setFile(e.target.files[0] || null)}
                                            className="w-full text-sm border border-stone-300 rounded-xl p-2.5 text-stone-600 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#164a08] file:text-white hover:file:bg-[#164a08]"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-[#164a08] text-white py-4 rounded-full font-heading text-sm font-bold tracking-wider hover:bg-[#0e3005] transition flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
                                    >
                                        {submitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin text-[#DFC479]" />
                                        ) : (
                                            <>
                                                <span>SUBMIT SCIENTIFIC ABSTRACT</span>
                                                <ArrowRight className="w-4 h-4 text-[#DFC479]" />
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
