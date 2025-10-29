interface InfoCardProps {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string;
    gradient: string;
}

const InfoCard = ({ icon: Icon, label, value, gradient }: InfoCardProps) => (
    <div className={`bg-gradient-to-br ${gradient} m-2 rounded-xl p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group`}>
        <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
            <Icon size={80} className="text-white" />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
                <Icon size={18} className="text-primary-100" />
                <p className="text-light-100 font-semibold text-sm uppercase tracking-wider">{label}</p>
            </div>
            <h2 className={`text-primary-100 font-bold text-xl ${label === 'status' || label === 'Status' ? 'capitalize' : ''}`}>{value}</h2>
        </div>
    </div>
);

export default InfoCard;