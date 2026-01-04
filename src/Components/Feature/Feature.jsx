import { Shield, TrendingUp, Users, Zap } from 'lucide-react';
import React from 'react';

const Feature = () => {
    const features = [
        { icon: <Zap className="w-6 h-6" />, title: "Lightning Fast", desc: "Experience blazing speeds that transform your workflow" },
        { icon: <Shield className="w-6 h-6" />, title: "Secure & Safe", desc: "Enterprise-grade security protecting your data 24/7" },
        { icon: <Users className="w-6 h-6" />, title: "Team Collaboration", desc: "Work together seamlessly across departments" },
        { icon: <TrendingUp className="w-6 h-6" />, title: "Growth Analytics", desc: "Track metrics that matter with real-time insights" }
    ];
    return (
        <div>

            <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 mb-3 sm:mb-4 md:mb-5 px-2">
                            Powerful Features
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-xl sm:max-w-2xl mx-auto px-4">
                            Everything you need to succeed, built with precision and care
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7 lg:gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl hover:shadow-xl transition border border-gray-200 hover:border-indigo-900">
                                <div className="bg-indigo-900 text-white p-2.5 sm:p-3 md:p-3.5 rounded-lg inline-block mb-3 sm:mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-900 mb-2 sm:mb-3">{feature.title}</h3>
                                <p className="text-sm sm:text-base md:text-lg text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Feature;