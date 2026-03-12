import { ShieldCheck, Truck, CreditCard, RotateCcw, Headphones } from 'lucide-react';

const badges = [
    { icon: ShieldCheck, title: 'Genuine Products', desc: '100% Authentic' },
    { icon: Truck, title: 'Fast Delivery', desc: 'Express Shipping' },
    { icon: CreditCard, title: 'Secure Payment', desc: 'Protected by SSL' },
    { icon: RotateCcw, title: '7-Day Return', desc: 'Easy Exchange' },
    { icon: Headphones, title: '24/7 Support', desc: 'Bilingual Team' },
];

export const TrustBadges = () => {
    return (
        <section className="py-12 border-y border-slate-100 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {badges.map((badge, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-royal-blue group-hover:text-white transition-all duration-300">
                                <badge.icon className="w-6 h-6 text-royal-blue group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="font-bold text-slate-800 text-sm mb-1">{badge.title}</h4>
                            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{badge.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
