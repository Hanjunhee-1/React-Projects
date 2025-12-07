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
 */
export default function Chess () {
    const tiles = [];
    const numbers = [8,7,6,5,4,3,2,1];
    const letters = ["a","b","c","d","e","f","g","h"];

    for (let row=0; row<8; row++) {
        for (let col=0; col<8; col++) {
            const isDark = (row+col) % 2 === 1;

            tiles.push(
                <div key={`${row}-${col}`} className={`w-[80px] h-[80px] ${isDark ? "bg-(--black-tile)" : "bg-(--white-tile)"}`} />
            );
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