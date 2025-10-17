interface CardProps {
    title: string;
    subTitle: string;
    icon: React.ReactNode;
}

function Card({ title, subTitle, icon }: CardProps) {
    return (
        <div className="group bg-gradient-to-br from-primary-800 via-primary-700 to-primary-800 rounded-2xl p-6 border-2 border-primary-700 hover:border-accent-600 hover:shadow-2xl hover:from-primary-700 hover:via-primary-900 hover:to-primary-700 transition-all duration-500 cursor-pointer mx-4 my-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="flex items-center justify-between relative z-10">
                <div className="flex-1 transform group-hover:translate-x-1 transition-transform duration-300">
                    <p className="text-primary-300 text-sm font-medium mb-1 group-hover:text-primary-600 transition-colors duration-300">
                        {subTitle}
                    </p>
                    <h1 className="text-white font-bold text-3xl group-hover:text-primary-100 transition-colors duration-300">
                        {title}
                    </h1>
                </div>
                <div className="bg-gradient-to-br from-accent-600 to-accent-700 p-4 rounded-xl text-white group-hover:from-accent-500 group-hover:to-accent-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default Card;