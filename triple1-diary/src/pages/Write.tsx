import { useEffect, useState } from "react"
import AppButton from "../components/AppButton";
import { v4 as uuidv4 } from "uuid";

export default function Write () {
    const placeholderPhrases = [
        "기록은 기억을 지켜주는 작은 병이에요", 
        "기억은 말보다 잔잔하게 쌓여요",
        "무조건 대단할 필요는 없어요",
        "오늘의 작은 감정이라도 여기에 놓아주세요",
        "당신의 하루를 잉크에 담아보세요",
        "남긴 하루가 내일의 빛을 켭니다",
        "당신의 이야기가 궁금해요",
        "하루에 하나씩 나에게 남기는 작은 불씨",
        "쓰는 동안에는 자신만의 세계에 빠져보세요"
    ];
    const alertPhrases = [
        "잉크에 담긴 당신의 하루를 간직해둘게요",
        "작은 불씨를 남겨주어서 고마워요",
        "당신의 내일의 빛을 켜둘게요"
    ]
    const [text, setText] = useState("");
    const [diaries, setDiaries] = useState([]);

    // localStorage 사용
    useEffect(() => {
        const stored = localStorage.getItem("diaries");
        if (stored) {
            setDiaries(JSON.parse(stored));
        }
    }, []);

    const handleSave = () => {
        if (!text.trim()) return; // 빈 내용이면 무시
        
        // diary 저장
        const newDiary = {
            id: uuidv4(),
            content: text,
            date: new Date().toLocaleDateString(),
        };

        const updated = [...diaries, newDiary];
        setDiaries(updated);

        localStorage.setItem("diaries", JSON.stringify(updated));

        setText("");
        alert(alertPhrases[Math.floor((Math.random() * alertPhrases.length))]);
    }

    const randomPhrase = () => {
        return placeholderPhrases[Math.floor((Math.random() * placeholderPhrases.length))];
    }

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen bg-[#1b1b1b] text-white py-16 px-6">
            
            <h1 className="font-serif text-3xl mb-8 font-light tracking-wide">
                ✍️ Write Your Diary
            </h1>

            <textarea
                className="font-serif w-full max-w-2xl h-52 p-5 text-lg rounded-md bg-[#2a2929] border border-gray-600 shadow-[0_0_25px_rgba(255,214,165,0.08)] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:shadow-[0_0_35px_rgba(255,199,93,0.2)] transition-all duration-300"
                placeholder={randomPhrase()}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <AppButton onClick={handleSave}>Save</AppButton>
        </div>
    )
}