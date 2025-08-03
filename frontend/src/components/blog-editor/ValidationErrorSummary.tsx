// components/BlogEditor/ValidationErrorSummary.tsx
interface ValidationErrorSummaryProps {
  errors: Record<string, string>;
}

export const ValidationErrorSummary: React.FC<ValidationErrorSummaryProps> = ({ errors }) => {
  if (Object.keys(errors).length === 0) return null;

  return (
    <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
      <h3 className="text-red-400 font-semibold mb-2">Please fix the following errors:</h3>
      <ul className="text-red-300 text-sm space-y-1">
        {Object.entries(errors).map(([field, error]) => (
          <li key={field}>• {error}</li>
        ))}
      </ul>
    </div>
  );
};
