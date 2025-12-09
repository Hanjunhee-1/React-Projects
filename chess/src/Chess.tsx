/**
 * TODO list
 * 
 * 1. 체스판 구성 (2025.12.07 완)
 *      - 세로 -> 숫자 표시
 *      - 가로 -> 알파벳 표시
 * 
 * 2. 각 위치별 기물 놓기 (2025.12.08 완)
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
import { useState } from "react";

type Piece = "b_R" | "b_N" | "b_B" | "b_Q" | "b_K" | "b_P" |
             "w_R" | "w_N" | "w_B" | "w_Q" | "w_K" | "w_P" |
             "None";

const PIECE_IMAGE_MAP: Record<Piece, string | null> = {
    b_P: blackPawn,
    b_R: blackRook,
    b_N: blackKnight,
    b_B: blackBishop,
    b_Q: blackQueen,
    b_K: blackKing,

    w_P: whitePawn,
    w_R: whiteRook,
    w_N: whiteKnight,
    w_B: whiteBishop,
    w_Q: whiteQueen,
    w_K: whiteKing,

    None: null
};

export default function Chess () {
    // 기록용 타일
    const createInitialBoard = (): Piece[] => {
        const board: Piece[] = new Array(64).fill("None");

        // black 메이저 기물 (row 0)
        const blackMajor: Piece[] = ["b_R","b_N","b_B","b_Q","b_K","b_B","b_N","b_R"];
        for (let i=0; i<8; i++) board[i] = blackMajor[i];

        // black pawns (row 1)
        for (let c=0; c<8; c++) board[1*8 + c] = "b_P";

        // white pawns (row 6)
        for (let c=0; c<8; c++) board[6*8 + c] = "w_P";

        // white major (row 7)
        const whiteMajor: Piece[] = ["w_R","w_N","w_B","w_Q","w_K","w_B","w_N","w_R"];
        for (let c=0; c<8; c++) board[7*8 + c] = whiteMajor[c];

        return board;
    }
    
    const [board, setBoard] = useState<Piece[]>(createInitialBoard());

    // 사용자가 선택한 칸 (없으면 null)
    const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);

    // 선택된 기물이 움직일 수 있는 위치 목록
    const [validMoves, setValidMoves] = useState<{ row: number; col: number }[]>([])

    // 표시용 숫자와 문자들
    const numbers = [8,7,6,5,4,3,2,1];
    const letters = ["a","b","c","d","e","f","g","h"];

    // 기물 움직임 계산
    const calculateMoves = (piece: Piece, row: number, col: number) => {
        const moves: { row: number; col: number }[] = [];

        // whitePawn
        if (piece === "w_P") {
            if (row - 1 >= 0 && board[(row-1)*8 + col] === "None") {
                moves.push({ row: row-1, col });
            }

            // 첫 움직임이라면 두 칸
            if (row === 6 && board[(row-1)*8 + col] === "None" && board[(row-2)*8 + col] === "None") {
                moves.push({ row: row-2, col });
            }
        }

        // blackPawn
        else if (piece === "b_P") {
            if (row + 1 < 8 && board[(row+1)*8 + col] === "None") {
                moves.push({ row: row+1, col });
            }
            if (row === 1 && board[(row+1)*8 + col] === "None" && board[(row+2)*8 + col] === "None") {
                moves.push({ row: row+2, col });
            }
        }

        return moves;
    }

    // 기물 움직임 처리
    const movePiece = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
        const boardCopy = [...board];
        const movePiece = boardCopy[fromRow * 8 + fromCol];

        boardCopy[toRow * 8 + toCol] = movePiece;
        boardCopy[fromRow * 8 + fromCol] = "None";

        setBoard(boardCopy);
    }

    // 칸을 클릭했을 때의 처리
    const handleTileClick = (row: number, col: number) => {
        const index = row * 8 + col;
        const piece = board[index];

        // 기물이 있는 칸이라면 해당 기물의 가능한 움직임 계산
        if (piece !== "None") {
            setSelected({row, col});

            // 해당 기물의 종류에 따라 이동 가능한 칸 계산
            const moves = calculateMoves(piece, row, col);
            setValidMoves(moves);
            return;
        }

        // 빈 칸이고 선택된 말이 있었다면 움직임 처리
        if (selected) {
            movePiece(selected.row, selected.col, row, col);
            setSelected(null);
            setValidMoves([]);
        }
    }

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
                    {
                        board.map((piece: Piece, index: number) => {
                            const row = Math.floor(index / 8);
                            const col = index % 8;

                            const isDark = (row + col) % 2 === 1;
                            const isValid = validMoves.some(
                                (move) => move.row === row && move.col === col
                            );
                            const isSelected = selected?.row === row && selected?.col === col;

                            return (
                                <div
                                    key={index}
                                    onClick={() => handleTileClick(row, col)}
                                    className={`
                                        w-[80px] h-[80px] flex justify-center items-center relative
                                        ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"}
                                        ${isSelected ? "outline outline-4 outline-yellow-400" : ""}
                                    `}
                                >
                                    {/** 이동 가능 위치 표시 UI */}
                                    {
                                        isValid && (
                                            <div className="absolute w-[20px] h-[20px] rounded-full bg-green-500 opacity-40"></div>
                                        )
                                    }
                                    {/** 기물 표시 */}
                                    {
                                        piece !== "None" && (
                                            <img 
                                            src={PIECE_IMAGE_MAP[piece] as string} 
                                            className="w-[60px] h-[60px]"
                                            draggable={false}/>
                                        )
                                    }
                                </div>
                            );
                        })
                    }
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