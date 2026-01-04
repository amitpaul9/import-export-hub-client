import React, { useState } from 'react';

const Faqs = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const faqs = [
        { q: "How do I get started?", a: "Simply sign up for a free trial and you'll be onboarded in minutes with our guided setup process." },
        { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and wire transfers for enterprise customers." },
        { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time with no penalties or hidden fees." },
        { q: "Do you offer custom solutions?", a: "Absolutely! Our enterprise plan includes custom development and dedicated support." }
    ];
    return (
        <div>
            <section className="py-12 sm:py-16 md:py-20 lg:py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 mb-3 sm:mb-4 md:mb-5 px-2">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 px-4">
                            Everything you need to know about our platform
                        </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                                    className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 text-left font-semibold text-indigo-900 hover:bg-gray-50 transition flex justify-between items-center text-sm sm:text-base md:text-lg"
                                >
                                    <span className="pr-4">{faq.q}</span>
                                    <span className="text-xl sm:text-2xl flex-shrink-0">{activeAccordion === idx ? '−' : '+'}</span>
                                </button>
                                {activeAccordion === idx && (
                                    <div className="px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 bg-gray-50 text-gray-700 text-sm sm:text-base md:text-lg">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Faqs;