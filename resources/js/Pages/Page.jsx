import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Page({ page }) {
    return (
        <AppLayout
            title={page.title}
            description={page.meta_description || page.title}
        >
            {() => (
                <div className="py-16 space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 text-sm font-sans font-semibold text-[#3e7405] hover:text-[#164a08]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Return to Home</span>
                    </Link>

                    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-sm space-y-6">
                        <div className="border-b border-stone-100 pb-6">
                            <span className="text-xs font-sans font-bold tracking-[0.2em] text-[#3e7405] uppercase">
                                Legal & Regulatory Compliance
                            </span>
                            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#164a08] mt-2">
                                {page.title}
                            </h1>
                            <div className="text-xs font-mono text-stone-500 mt-2">
                                Effective Date: AYURPRAVAH 2027 Secretariat • Version 1.0
                            </div>
                        </div>

                        {/* CMS Content */}
                        <div
                            className="text-base font-sans text-[#503323] leading-relaxed space-y-4 prose prose-emerald max-w-none"
                            dangerouslySetInnerHTML={{ __html: page.content }}
                        />
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
