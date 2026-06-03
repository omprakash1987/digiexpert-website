import { LucideIcon } from 'lucide-react';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

interface StatItemProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
}

export function StatItem({ icon: Icon, value, label }: StatItemProps) {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  const isDecimal = typeof value === 'number' ? !Number.isInteger(value) : /^\d+\.\d+$/.test(value as string);
  const { count, ref } = useCounterAnimation(numValue, 2000);

  const displayValue = () => {
    if (typeof value === 'string' && value.includes('-')) {
      return value;
    }
    if (isDecimal) {
      return count.toFixed(1);
    }
    return Math.floor(count);
  };

  return (
    <div ref={ref} className="text-center">
      <Icon className="w-8 h-8 text-primary-200 mx-auto mb-2" />
      <p className="text-3xl font-bold text-white mb-1">
        {displayValue()}
        {typeof value === 'string' && value.includes('+') ? '+' : ''}
      </p>
      <p className="text-primary-200">{label}</p>
    </div>
  );
}
