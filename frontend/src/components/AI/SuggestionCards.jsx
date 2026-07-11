const suggestions = [
    {
        icon: "📚",
        title: "React Classroom",
        subtitle: "Generate beginner React course",
        prompt: "Create a React classroom",
    },
    {
        icon: "🐳",
        title: "Docker Classroom",
        subtitle: "Containers & Images",
        prompt: "Create a Docker classroom",
    },
    {
        icon: "☕",
        title: "Java Course",
        subtitle: "OOP + Collections",
        prompt: "Create a Java classroom",
    },
    {
        icon: "📝",
        title: "Generate Assignments",
        subtitle: "Create 5 assignments",
        prompt: "Create 5 assignments",
    },
    {
        icon: "❓",
        title: "Generate Quiz",
        subtitle: "MCQ with answers",
        prompt: "Generate quiz",
    },
    {
        icon: "🧠",
        title: "Explain OOP",
        subtitle: "AI Teacher",
        prompt: "Explain OOP",
    },
];

function SuggestionCards({ onSelect }) {
    return (
        <div className="mb-10">

            <h2 className="text-xl font-semibold mb-5">
                ✨ Quick Actions
            </h2>

            <div className="grid md:grid-cols-3 gap-5">

                {suggestions.map((item) => (

                    <button
                        key={item.title}
                        onClick={() => onSelect(item.prompt)}
                        className="
                        p-5
                        rounded-2xl
                        border
                        shadow-sm
                        hover:shadow-lg
                        hover:-translate-y-1
                        transition
                        text-left
                        bg-white
                        "
                    >

                        <div className="text-4xl mb-4">
                            {item.icon}
                        </div>

                        <h3 className="font-semibold text-lg">
                            {item.title}
                        </h3>

                        <p className="text-gray-500 text-sm mt-2">
                            {item.subtitle}
                        </p>

                    </button>

                ))}

            </div>

        </div>
    );
}

export default SuggestionCards;