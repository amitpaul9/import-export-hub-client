import React from 'react';
import { FaStar } from 'react-icons/fa';  // ✅ import star icon

const Testimonial = () => {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "CEO at TechCorp",
            content: "This platform revolutionized how we operate. The ROI was evident within weeks.",
            rating: 5
        },
        {
            name: "Michael Rodriguez",
            role: "Product Manager",
            content: "Intuitive, powerful, and reliable. Everything we needed in one place.",
            rating: 5
        },
        {
            name: "Emma Thompson",
            role: "Startup Founder",
            content: "Scaled our operations effortlessly. The support team is phenomenal.",
            rating: 5
        }
    ];

    return (
        <div>
            <section
                id="testimonials"
                className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 mb-3 sm:mb-4 md:mb-5 px-2">
                            What Our Clients Say
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 px-4">
                            Trusted by thousands of businesses worldwide
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-7 lg:gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl shadow-lg border border-gray-200"
                            >
                                {/* Rating stars */}
                                <div className="flex mb-3 sm:mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-900"
                                        />
                                    ))}
                                </div>

                                {/* Testimonial content */}
                                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-5 md:mb-6 italic">
                                    "{testimonial.content}"
                                </p>

                                {/* Author */}
                                <div>
                                    <p className="font-bold text-indigo-900 text-sm sm:text-base md:text-lg">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-gray-600 text-xs sm:text-sm">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonial;
