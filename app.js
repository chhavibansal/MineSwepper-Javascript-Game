// after the content is loaded then this comes in action 
document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    let width = 10
    let fillBomb = 20
    let isGameOver = false
    let flag = 0
    let squares = []
    function createBoard() {

        let bombArray = Array(fillBomb).fill('bomb')
        let validArray = Array(width * width - fillBomb).fill('valid')

        let gameArray = validArray.concat(bombArray)
        // console.log(gameArray)
        let shuffledArray = gameArray.sort(() => (Math.random() - 0.5))
        // console.log(shuffledArray)
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.setAttribute('id', i);
            // add a name to each square    
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)

            // normal click

            square.addEventListener('click', function (e) {
                click(square)
            })

            //cntrol click 
            square.oncontextmenu = function (e) {
                e.preventDefault()
                addFlag(square)
            }




        }


        for (let i = 0; i < squares.length; i++) {

            let total = 0

            // 0 .... 9 
            // 10 .... 19 

            // 90 ......99
            let leftCorner = (i % width === 0)
            let rightCorner = (width - i % width === 1)

            //check if valid 
            if (squares[i].classList.contains('valid')) {
                if (i > 0 && !leftCorner && squares[i - 1].classList.contains('bomb')) total += 1
                if (i > 9 && !rightCorner && squares[i + 1 - width].classList.contains('bomb')) total += 1
                if (i > 10 && squares[i - width].classList.contains('bomb')) total += 1;
                if (i > 11 && !leftCorner && squares[i - 1 - width].classList.contains('bomb')) total += 1;
                if (i < 98 && !rightCorner && squares[i + 1].classList.contains('bomb')) total += 1;
                if (i < 90 && !leftCorner && squares[i - 1 + width].classList.contains('bomb')) total += 1;
                if (i < 88 && !rightCorner && squares[i + 1 + width].classList.contains('bomb')) total += 1;
                if (i < 89 && squares[i + width].classList.contains('bomb')) total += 1;
                squares[i].setAttribute('data', total)
                console.log(squares[i])
            }

            // count bombs in the adjacemtn 8 nbd

        }

    }

    createBoard()


    function click(square) {
        let currentId = square.id
        //base condition 
        if (isGameOver) return
        // 
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        // if bomb exit 
        if (square.classList.contains('bomb')) {
            //    alert('game over ')
            gameOver(square)
        } else {
            let total = square.getAttribute('data')
            if (total != 0) {
                square.classList.add('checked')
                square.innerHTML = total
                return
            }
            checkSquare(square, currentId)
        }

        square.classList.add('checked')
    }

    function addFlag(square) {
        if (isGameOver) return
        if ((!square.classList.contains('checked')) && (flag < fillBomb)) {
            if (!square.classList.contains('flag')) {
                square.innerHTML = '<i class="fa fa-flag" aria-hidden="true"></i>'
                square.classList.add('flag')
                flag += 1
                checkForWin()
            } else {
                square.classList.remove('flag')
                square.innerHTML = ''
                flag -= 1
            }
        }
    }

    function checkSquare(square, currentId) {
        const leftEdge = (currentId % width === 0)
        const rightEdge = (width - currentId % width === 1)

        setTimeout(() => {
            // left 
            if (currentId > 0 && !leftEdge) {
                const newId = squares[parseInt(currentId) - 1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }

            //right
            if (currentId > 9 && !rightEdge) {
                const newId = squares[parseInt(currentId) + 1 - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }

            //up
            if (currentId > 10) {
                const newId = squares[parseInt(currentId) - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }


            // down
            if (currentId > 11 && !leftEdge) {
                const newId = squares[parseInt(currentId) - 1 - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }


            //top left
            if (currentId < 98 && !rightEdge) {
                const newId = squares[parseInt(currentId) + 1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }



            ///top right
            if (currentId < 90 && !leftEdge) {
                const newId = squares[parseInt(currentId) - 1 + width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }

            //bottom left
            if (currentId < 88 && !rightEdge) {
                const newId = squares[parseInt(currentId) + 1 + width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }

            // bottom right
            if (currentId < 89) {
                const newId = squares[parseInt(currentId) + width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }

        }, 10)
    }
    function gameOver(square) {
        squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '<i class="fa fa-bomb" aria-hidden="true"></i>'
            }
        })
        isGameOver = true

    }

    function checkForWin(){
        let match = 0 
        for(let i =0 ; i < squares.length ; i++){
            if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')){
                match+=1

                if(match === fillBomb){
                    console.log("YOU WON")
                    isGameOver = true
                    return
                }
            } 
        }
    }

})  