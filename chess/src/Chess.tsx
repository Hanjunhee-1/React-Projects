/**
 * TODO list
 * 
 * 1. 체스판 구성 (2025.12.07 완)
 *      - 세로 -> 숫자 표시
 *      - 가로 -> 알파벳 표시
 * 
 * 2. 각 위치별 기물 놓기
 *      - 맨 위 블랙, 맨 아래 화이트
 *      - a2 ~ h2 -> white pawn
 *      - a1, h1 -> white rook
 *      - b1, g1 -> white knight
 *      - c1, f1 -> white bishop
 *      - d1     -> white queen
 *      - e1     -> white king
 * 3. 기물 움직임 제한하기
 *      - pawn -> 맨 처음 움직일 때 두 칸까지 가능. 이후 한 칸씩만 움직일 수 있고 기물을 잡을 수 있다면 대각선 한 칸 가능.
 *                뒤로 이동할 수 없음. 기물 뛰어넘기 불가능.
 *      - knight -> 앞으로 두 칸 가고 왼쪽 혹은 오른쪽으로 한칸 이동. 뒤로도 마찬가지.
 *                  오른쪽으로 두 칸 가고 앞쪽 혹은 뒤쪽으로 한칸 이동. 왼쪽으로도 마찬가지.
 *                  기물 뛰어넘기 가능
 *      - bishop -> 대각선의 모든 칸으로 이동 가능. 기물 뛰어넘기 불가능.
 *      - rook   -> 좌우앞뒤의 모든 칸으로 이동 가능. 기물 뛰어넘기 불가능.
 *      - queen  -> 좌우앞뒤의 모든 칸과 대각선의 모든 칸으로 이동 가능. 기물 뛰어넘기 불가능.
 *      - king   -> 좌우앞뒤로 한 칸과 대각선의 한 칸 이동 가능. 기물 뛰어넘기 불가능.
 * 4. 기물 간 상호작용 구현
 *      - pawn -> 기물 잡기, 프로모션
 *      - knight, bishop, rook, queen -> 기물 잡기
 *      - king -> 기물 잡기, 체크메이트 상황
 * 5. 기물이 놓인 순서 기록
 *      - 기물이동 -> w_Pe4, b_Pe5, w_Nf3
 *      - 기물잡기 -> w_Nxe5 : whiteKnight 가 e5 에 놓인 기물을 잡음 
 */
import blackRook from "../img/black_rook.png";
import blackKnight from "../img/black_knight.png";
import blackBishop from "../img/black_bishop.png";
import blackQueen from "../img/black_queen.png";
import blackKing from "../img/black_king.png";
import blackPawn from "../img/black_pawn.png";
import whiteRook from "../img/white_rook.png";
import whiteKnight from "../img/white_knight.png";
import whiteBishop from "../img/white_bishop.png";
import whiteQueen from "../img/white_queen.png";
import whiteKing from "../img/white_king.png";
import whitePawn from "../img/white_pawn.png";
import type React from "react";

export default function Chess () {
    // 화면 표기용 타일
    const tiles: React.ReactNode[] = [];

    // 기록용 타일
    const tilesSaved: string[] = [];

    // 표시용 숫자와 문자들
    const numbers = [8,7,6,5,4,3,2,1];
    const letters = ["a","b","c","d","e","f","g","h"];

    const makeTiles = () => {
        for (let row=0; row<8; row++) {
            for (let col=0; col<8; col++) {
                const isDark = (row+col) % 2 === 1;

                // blackRook
                if ((row == 0 && col == 0) || (row == 0 && col == 7)) {
                    tiles.push(
                        <div 
                            key={`${row}-${col}`} 
                            className={`w-[80px] h-[80px] ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"} flex justify-center items-center`}
                        >
                            <img src={blackRook} className="h-[60px] w-[60px]" draggable={false} />
                        </div>
                    )
                    tilesSaved.push("b_R");
                }
                // whiteRook
                else if ((row == 7 && col == 0) || (row == 7 && col == 7)) {
                    tiles.push(
                        <div 
                            key={`${row}-${col}`} 
                            className={`w-[80px] h-[80px] ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"} flex justify-center items-center`}
                        >
                            <img src={whiteRook} className="h-[60px] w-[60px]" draggable={false} />
                        </div>
                    )
                    tilesSaved.push("w_R");
                }
                // blackKnight
                else if ((row == 0 && col == 1) || (row == 0 && col == 6)) {
                    tiles.push(
                        <div 
                            key={`${row}-${col}`} 
                            className={`w-[80px] h-[80px] ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"} flex justify-center items-center`}
                        >
                            <img src={blackKnight} className="h-[60px] w-[60px]" draggable={false} />
                        </div>
                    )
                    tilesSaved.push("b_N");
                }
                // whiteKnight
                else if ((row == 7 && col == 1) || (row == 7 && col == 6)) {
                    tiles.push(
                        <div 
                            key={`${row}-${col}`} 
                            className={`w-[80px] h-[80px] ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"} flex justify-center items-center`}
                        >
                            <img src={whiteKnight} className="h-[60px] w-[60px]" draggable={false} />
                        </div>
                    )
                    tilesSaved.push("w_N");
                }
                // blackBishop
                else if ((row == 0 && col == 2) || (row == 0 && col == 5)) {
                    tiles.push(
                        <div 
                            key={`${row}-${col}`} 
                            className={`w-[80px] h-[80px] ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"} flex justify-center items-center`}
                        >
                            <img src={blackBishop} className="h-[60px] w-[60px]" draggable={false} />
                        </div>
                    )
                    tilesSaved.push("b_B");
                }
                // whiteBishop
                else if ((row == 7 && col == 2) || (row == 7 && col == 5)) {
                    tiles.push(
                        <div 
                            key={`${row}-${col}`} 
                            className={`w-[80px] h-[80px] ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"} flex justify-center items-center`}
                        >
                            <img src={whiteBishop} className="h-[60px] w-[60px]" draggable={false} />
                        </div>
                    )
                    tilesSaved.push("w_B");
                }
                // blackQueen
                else if (row == 0 && col == 3) {
                    tiles.push(
                        <div 
                            key={`${row}-${col}`} 
                            className={`w-[80px] h-[80px] ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"} flex justify-center items-center`}
                        >
                            <img src={blackQueen} className="h-[60px] w-[60px]" draggable={false} />
                        </div>
                    )
                    tilesSaved.push("b_Q");
                }
                // whiteQueen
                else if (row == 7 && col == 3) {
                    tiles.push(
                        <div 
                            key={`${row}-${col}`} 
                            className={`w-[80px] h-[80px] ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"} flex justify-center items-center`}
                        >
                            <img src={whiteQueen} className="h-[60px] w-[60px]" draggable={false} />
                        </div>
                    )
                    tilesSaved.push("w_Q");
                }
                // blackKing
                else if (row == 0 && col == 4) {
                    tiles.push(
                        <div 
                            key={`${row}-${col}`} 
                            className={`w-[80px] h-[80px] ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"} flex justify-center items-center`}
                        >
                            <img src={blackKing} className="h-[60px] w-[60px]" draggable={false} />
                        </div>
                    )
                    tilesSaved.push("b_K");
                }
                // whiteKing
                else if (row == 7 && col == 4) {
                    tiles.push(
                        <div 
                            key={`${row}-${col}`} 
                            className={`w-[80px] h-[80px] ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"} flex justify-center items-center`}
                        >
                            <img src={whiteKing} className="h-[60px] w-[60px]" draggable={false} />
                        </div>
                    )
                    tilesSaved.push("w_K");
                }
                // blackPawn
                else if (row == 1) {
                    tiles.push(
                        <div 
                            key={`${row}-${col}`} 
                            className={`w-[80px] h-[80px] ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"} flex justify-center items-center`}
                        >
                            <img src={blackPawn} className="h-[60px] w-[60px]" draggable={false} />
                        </div>
                    )
                    tilesSaved.push("b_P");
                }
                // whitePawn
                else if (row == 6) {
                    tiles.push(
                        <div 
                            key={`${row}-${col}`} 
                            className={`w-[80px] h-[80px] ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"} flex justify-center items-center`}
                        >
                            <img src={whitePawn} className="h-[60px] w-[60px]" draggable={false} />
                        </div>
                    )
                    tilesSaved.push("w_P");
                }
                else {
                    tiles.push(
                        <div 
                            key={`${row}-${col}`} 
                            className={`w-[80px] h-[80px] ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"}`}
                        >
                            
                        </div>
                    );
                    tilesSaved.push("None");
                }
            }
        }

        console.log(tilesSaved);
    }
    makeTiles();

    return (
        <div className="bg-(--bg-color) h-screen w-screen flex justify-center items-center">

            {/** 전체 컨테이너 */}
            <div className="bg-black h-[690px] w-[690px] grid grid-cols-[50px_640px] grid-rows-[640px_50px]">
                
                {/** 왼쪽 숫자 라벨 */}
                <div className="flex flex-col justify-between pr-2 text-white font-bold text-xl">
                    {
                        numbers.map((n) => (
                            <div className="h-[50px] flex items-center justify-end">{n}</div>
                        ))
                    }
                </div>

                {/** 체스판 */}
                <div className="grid grid-cols-8 w-[640px] h-[640px]">
                    {tiles}
                </div>
                
                {/** 빈 공간 */}
                <div></div>
                {/** 아랫쪽 알파벳 라벨 */}
                <div className="flex flex-row justify-between pr-2 text-white fond-bold text-xl pt-2">
                    {
                        letters.map((l) => (
                            <div className="w-[50px] flex items-center justify-end">{l}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}