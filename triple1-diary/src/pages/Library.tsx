import { useEffect, useState } from "react";
import Bookshelf from "../components/Bookshelf";
import AppButton from "../components/AppButton";

export default function Library () {
    const [diaries, setDiaries] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("diaries");
        if (stored) {
            setDiaries(JSON.parse(stored));
        }
    }, []);

    const deleteDiary = (id) => {
        const updated = diaries.filter((d) => d.id !== id); // 삭제된 배열
        setDiaries(updated); // state 업데이트
        localStorage.setItem("diaries", JSON.stringify(updated)); // 로컬 저장소 반영
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
            <p className="font-serif text-4xl text-[var(--ink)]">📚 Library Page</p>

            <Bookshelf>
                {
                    diaries.length === 0 ? ( 
                        <p className="opacity-60 font-serif text-5xl text-[var(--ink)]">
                            아직 작성된 일기가 없어요
                        </p>
                    ) : (
                        diaries.map((d) => (
                            <div key={d.id} className="text-[var(--ink)] font-serif p-4 bg-[#2c2c2c] rounded-md border border-gray-600">
                                <p className="text-sm">{d.date}</p>
                                <p className="mt-2 whitespace-pre-line">{d.content}</p>
                                <AppButton onClick={() => deleteDiary(d.id)}>delete</AppButton>
                            </div>
                        ))
                    )
                }
            </Bookshelf>
        </div>
    )
}