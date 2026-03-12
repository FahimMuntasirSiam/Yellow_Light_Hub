import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: 'Tanvir Rahman',
        role: 'Tech Enthusiast',
        content: "YellowLight Hub has the best collection of mechanical keyboards in Bangladesh. Their delivery was faster than I expected!",
        rating: 5
    },
    {
        name: 'Nusrat Jahan',
        role: 'Freelancer',
        content: "I bought a Windows 11 license and got it within seconds in my email. Very reliable for digital products.",
        rating: 5
    },
    {
        name: 'Sazzad Hossein',
        role: 'Home Gamer',
        content: "The support team helped me choose the right mouse for my setup. Highly recommend their service!",
        rating: 4
    }
];

export const Testimonials = () => {
    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">What Our Customers Say</h2>
                    <p className="text-slate-500 font-medium">Trusted by thousands of shoppers across Bangladesh.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-royal-blue/5 transition-all">
                            <div className="flex gap-1 mb-6 text-brand-yellow">
                                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-brand-yellow" />)}
                            </div>
                            <p className="text-slate-600 mb-8 italic leading-relaxed">"{t.content}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-royal-blue text-white flex items-center justify-center font-bold">
                                    {t.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-sm">{t.name}</h4>
                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
