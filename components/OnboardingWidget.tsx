import React, { useState } from 'react';
import { X, CheckCircle2, Circle } from 'lucide-react';

export const OnboardingWidget: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [steps] = useState([
        { id: 1, label: 'Create Account', completed: true },
        { id: 2, label: 'Connect Stripe', completed: false },
        { id: 3, label: 'Import First Lead', completed: false },
        { id: 4, label: 'Launch Campaign', completed: false },
    ]);

    if (!isVisible) return null;

    const completedSteps = steps.filter(s => s.completed).length;
    const progress = (completedSteps / steps.length) * 100;

    return (
        <div className="mb-8 rounded-xl border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-md p-6 relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
                <X size={16} />
            </button>

            <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">Getting Started</h3>
                        <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                            {Math.round(progress)}% Complete
                        </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">Complete these steps to fully activate your agency operating system.</p>

                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${step.completed
                                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                    : 'bg-slate-800/50 border-slate-700 text-slate-400'
                                }`}
                        >
                            {step.completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                            {step.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
