import { LucideIcon } from 'lucide-react';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

interface StatItemProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
}

export function StatItem({ icon: Icon, value, label }: StatItemProps) {
  const numValue = typeof value === 'string' ? parseInt(value) : value;
  const { count, ref } = useCounterAnimation(numValue, 2000);

  const displayValue = () => {
    if (value === '4.9') {
      return (count / 100).toFixed(1);
    }
    if (typeof value === 'string' && value.includes('-')) {
      return value;
    }
    return count;
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
