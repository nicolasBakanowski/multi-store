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
                    ? "bg-ambar text-white"
                    : active
                    ? "bg-verde text-crema ring-4 ring-verde/10"
                    : "bg-crema-dark text-carbon/40"
                }`}
              >
                {done ? <FiCheck size={12} strokeWidth={3} /> : <span>{i + 1}</span>}
              </div>
              <span
                className={`mt-1.5 text-xs whitespace-nowrap transition-colors duration-300 ${
                  active
                    ? "text-verde font-semibold"
                    : done
                    ? "text-ambar font-medium"
                    : "text-carbon/30 font-medium"
                }`}
              >
                {label}
              </span>
            </div>
            {!last && (
              <div
                className={`flex-1 h-px mx-2 mb-5 transition-colors duration-300 ${
                  i < current ? "bg-ambar/50" : "bg-crema-dark"
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
