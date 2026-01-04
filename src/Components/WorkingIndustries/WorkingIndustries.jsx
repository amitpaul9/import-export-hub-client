import React from 'react';

const WorkingIndustries = () => {
    const categories = [
        "Enterprise", "Startups", "E-commerce", "Healthcare", "Education", "Finance"
    ];
    return (
        <div>
            <section id="categories" className="py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-indigo-900 mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-2">
                        Industries We Serve
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="bg-white p-4 sm:p-5 md:p-6 lg:p-7 rounded-lg text-center hover:shadow-lg transition cursor-pointer border-2 border-transparent hover:border-indigo-900">
                                <p className="font-semibold text-indigo-900 text-sm sm:text-base md:text-lg">{cat}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WorkingIndustries;