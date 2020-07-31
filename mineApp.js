document.addEventListener('DOMContentLoaded', () => {

    let width = 10
    let matrix = new Array(width)
    let bombQuantity = 20
    const grid = document.querySelector('.grid')
    let isGameOver = false
    let count = 0 
    let flag = 0 
    let valid = 0 
    function createBoard() {

        bombArray = Array(bombQuantity).fill('bomb')
        validArray = Array(width * width - bombQuantity).fill('valid')

        totalArray = validArray.concat(bombArray)
        shuffledArray = totalArray.sort(() => { return Math.random() - 0.5 })
        // console.log(shuffledArray)
        let count = 0

        for (let i = 0; i < width; i++)
            matrix[i] = new Array()
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < width; j++) {
                // matrix[i][j] = 
                const square = document.createElement('div')
                square.setAttribute('id', count)
                square.classList.add(shuffledArray[count])
                grid.appendChild(square)
                matrix[i].push(square)
                count += 1;
                square.addEventListener('click', function (e) {
                    click(square)
                })
                // right click 

                square.oncontextmenu = function(e){
                    e.preventDefault()
                    addFlag(square)
                }
            }


        }
        // console.log(matrix)
        // console.log(matrix[0])
        console.log(matrix[0][0], matrix[4][2])


        // mark those with bomb as unsafe
        for (let i = 0; i < width; i++) {
            let total = 0
            for (let j = 0; j < width; j++) {

                if (i - 1 >= 0 && matrix[i - 1][j].classList.contains('bomb')) total += 1;
                if (j - 1 >= 0 && matrix[i][j - 1].classList.contains('bomb')) total += 1;
                if (i + 1 < width && matrix[i + 1][j].classList.contains('bomb')) total += 1;
                if (j + 1 < width && matrix[i][j + 1].classList.contains('bomb')) total += 1;
                if (i - 1 >= 0 && j - 1 >= 0 && matrix[i - 1][j - 1].classList.contains('bomb')) total += 1;
                if (i - 1 >= 0 && j + 1 < width && matrix[i - 1][j + 1].classList.contains('bomb')) total += 1;
                if (i + 1 < width && j + 1 < width && matrix[i + 1][j + 1].classList.contains('bomb')) total += 1;
                if (i + 1 < width && j - 1 >= 0 && matrix[i + 1][j - 1].classList.contains('bomb')) total += 1;
                // console.log(i , total)
                matrix[i][j].setAttribute('nbdBombs', total)
                total = 0
            }

        }

    }
    createBoard()

    function addFlag(square){
        if(square.classList.contains('flag') ) return

        if(!square.classList.contains('checked') && flag < bombQuantity){
            if(!square.classList.contains('flag')){
                square.innerHTML = '<i class="fa fa-flag" aria-hidden="true"></i>'
                square.classList.add('flag')
                flag+=1
                checkIfWon()
            }else{
                square.classList.remove('flag')
                square.innerHTML = ' '
                flag-=1
            }
        }
        
    }
    function gameOver(square){
        for(let i =0 ; i < width ; i++){
            for(let j = 0 ; j < width ; j++){
                if(matrix[i][j].classList.contains('bomb')){
                    matrix[i][j].innerHTML = '<i class="fa fa-bomb" aria-hidden="true"></i>'

                }
            }
        }
        isGameOver = true
    }
    function click(square) {

        if (isGameOver) return


        // console.log(square)
        id = square.id


        //cheeck if already visited
        // console.log(square)
        if (square.classList.contains('checked') || square.classList.contains('flag')) return;


        if (square.classList.contains('bomb')) {
            // alert('game over')
            gameOver(square)
        } else {
            let total = square.getAttribute('nbdBombs')
            if (total != 0) {
                valid+=1
                console.log(valid)
                square.classList.add('checked');
                if(valid === matrix*matrix - bombQuantity){
                    isGameOver = true
                    return
                }
                square.innerHTML = total;
                return
            }
            checkSquare(square, id)
            
        }

        square.classList.add('checked');
    }
    function checkSquare(square, id) {

        var row = [parseInt(id[0]), parseInt(id[1])]
        if (id < 10)
            row = [0, parseInt(id[0])]
        let i = row[0], j = row[1]
        // console.log(row)
        // console.log(square)
        setTimeout(() => {
            if (i - 1 >= 0) {
                let newsquare = document.getElementById((i - 1) * 10 + j)
                // console.log(newsquare);
                click(newsquare)
            }
            if (j - 1 >= 0) {
                click(document.getElementById(i * 10 + j - 1))
            }
            if (i + 1 < width)
                click(document.getElementById((i + 1) * 10 + j))

            if (j + 1 < width)
                click(document.getElementById((i * 10 )+ j + 1))

            if (i - 1 >= 0 && j - 1 >= 0)
                click(document.getElementById((i - 1) * 10 + (j - 1)))

            if (i - 1 >= 0 && j + 1 < width) {
                click(document.getElementById((i - 1) * 10 + j + 1))
            }

            if (i + 1 < width && j + 1 < width) {
                click(document.getElementById((i + 1) * 10 + j + 1))
            }

            if (i + 1 < width && j - 1 >= 0)
                click(document.getElementById((i + 1) * 10 + j - 1))
        }, 10)
    }

    function checkIfWon(){
        match = 0 
        valid = 0 
        for(let i = 0 ; i < width ; i++){
            for(let j = 0 ; j < width ; j++){
                if(matrix[i][j].classList.contains('flag') && matrix[i][j].classList.contains('bomb')){
                    match+=1
                    if(match === bombQuantity){
                        console.log('you won')
                        isGameOver = true
                        return
                    }
                }
                if(matrix[i][j].classList.contains('checked')){
                    valid+=1
                    if(valid === matrix*matrix- bombQuantity){
                        console.log('you won')
                        isGameOver =true
                        return
                    }
                    console.log(valid)
                }

            }
        }
    }



})