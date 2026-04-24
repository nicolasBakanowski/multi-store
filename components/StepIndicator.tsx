import { FiCheck } from "react-icons/fi";

interface StepIndicatorProps {
  steps: string[];
  current: number;
}

const StepIndicator = ({ steps, current }: StepIndicatorProps) => {
  return (
    <div className="flex items-start w-full mb-7">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const last = i === steps.length - 1;

        return (
          <div key={i} className={`flex items-center ${!last ? "flex-1" : ""}`}>
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-all duration-300 ${
                  done
                    ? "bg-vb-ambar text-vb-negro"
                    : active
                    ? "bg-vb-negro text-vb-dorado ring-4 ring-vb-ambar/10"
                    : "bg-black/10 text-vb-negro/45"
                }`}
              >
                {done ? <FiCheck size={12} strokeWidth={3} /> : <span>{i + 1}</span>}
              </div>
              <span
                className={`mt-1.5 text-xs whitespace-nowrap transition-colors duration-300 ${
                  active
                    ? "text-vb-negro font-semibold"
                    : done
                    ? "text-vb-ambar font-medium"
                    : "text-vb-negro/45 font-medium"
                }`}
              >
                {label}
              </span>
            </div>
            {!last && (
              <div
                className={`flex-1 h-px mx-2 mb-5 transition-colors duration-300 ${
                  i < current ? "bg-vb-ambar/60" : "bg-black/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
