interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-[#f7c5d8] dark:hover:border-[#f7c5d8] hover:shadow-lg dark:hover:shadow-[#f7c5d8]/10 transition-all duration-300 cursor-pointer">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
