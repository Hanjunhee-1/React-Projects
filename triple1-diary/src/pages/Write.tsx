import { useState } from "react"
import AppButton from "../components/AppButton";

export default function Write () {
    const phrases = [
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
    const [text, setText] = useState("");
    const [saved, setSaved] = useState("");

    const handleSave = () => {
        if (!text.trim()) return; // 빈 내용이면 무시
        setSaved(text); // 입력 내용 저장
        setText(""); // 입력 필드 비우기
    }

    const randomPhrase = () => {
        return phrases[Math.floor((Math.random() * phrases.length))];
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

            {saved && (
                <div className="mt-10 max-w-2xl w-full bg-black/30 border border-gray-600 rounded-md p-6 shadow-inner">
                <h2 className="text-lg font-semibold mb-3 text-amber-300">📖 저장된 일기</h2>
                <p className="whitespace-pre-wrap leading-7">{saved}</p>
                </div>
            )}

        </div>
    )
}