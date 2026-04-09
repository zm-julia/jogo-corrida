let carroInimigo = new CarroInimigo(1300, 115, 130, 130, './img/img_inimigoP.png')
let carroInimigo2 = new CarroInimigo(1500, 200, 123, 125, './img/img_dog.png')
let carroInimigo3 = new CarroInimigo(1700, 425, 125, 120, './img/img_fantasmas.png')

let powerVida = new CarroInimigo(1400, 200, 45, 35, './img/img_coracao.png')
let powerPonto = new CarroInimigo(1600, 400, 60, 60, './img/img_diamante.png')

// velocidade inicial da fase 1
carroInimigo.vel = 3
carroInimigo2.vel = 3
carroInimigo3.vel = 3

powerVida.vel = 2.5
powerPonto.vel = 2.5

let estrada = new Estrada(10, 345, 40, 10)
let estrada2 = new Estrada(80, 345, 40, 10)
let estrada3 = new Estrada(140, 345, 40, 10)

let carro1 = new Carro(190, 180, 125, 120, './img/img_jogador1.png')
let carro2 = new Carro(190, 420, 125, 120, './img/img_jogador2.png')

let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()

let motor = new Audio('./img/motor.wav')
let batida = new Audio('./img/batida.mp3')
let somDiamante = new Audio('./img/diamante.mp3')
let somVida = new Audio('./img/vida.mp3')

motor.volume = 0.12
motor.loop = true

batida.volume = 0.1
somDiamante.volume = 0.4
somVida.volume = 0.4

let somVitoria = new Audio('./img/vitoria.mp3')
let somDerrota = new Audio('./img/derrota.mp3')

somVitoria.volume = 0.4
somDerrota.volume = 0.4

let somFinalTocado = false
let motorLigado = false

let jogar = true
let fase = 1
let fundoAtual = 0
let venceu = false
let pausado = false
let vencedor = ""
let modoJogo = Number(localStorage.getItem("modoJogo")) || 2

document.addEventListener('keydown', (e) => {

    if (!jogar && e.key === 'Enter') {
        location.reload()
    }

    if (jogar && !pausado) {

        if (!motorLigado) {
            motor.play()
            motorLigado = true
        }

        // jogador 1 = W e S
        if (e.key === 'w' || e.key === 'W') {
            carro1.dir = -10
        } else if (e.key === 's' || e.key === 'S') {
            carro1.dir = 10
        }

        // jogador 2 = setas, só no modo 2 jogadores
        if (modoJogo === 2) {
            if (e.key === 'ArrowUp') {
                carro2.dir = -10
            } else if (e.key === 'ArrowDown') {
                carro2.dir = 10
            }
        }
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'W') {
        carro1.dir = 0
    } else if (e.key === 's' || e.key === 'S') {
        carro1.dir = 0
    }

    if (modoJogo === 2) {
        if (e.key === 'ArrowUp') {
            carro2.dir = 0
        } else if (e.key === 'ArrowDown') {
            carro2.dir = 0
        }
    }
})

function trocarFundo() {
    if (fundoAtual === fase) return

    if (fase === 1) {
        canvas.style.backgroundImage = "url('./img/img_fundo1.0.png')"
    } else if (fase === 2) {
        canvas.style.backgroundImage = "url('./img/img_fundo2.0.png')"
    } else if (fase === 3) {
        canvas.style.backgroundImage = "url('./img/img_fundo3.0.png')"
    }

    canvas.style.backgroundSize = "100% 100%"
    canvas.style.backgroundRepeat = "no-repeat"
    canvas.style.backgroundPosition = "center"

    fundoAtual = fase
}

function game_over() {

    // modo 1 jogador
    if (modoJogo === 1) {
        if (carro1.vida <= 0) {
            jogar = false
            venceu = false
            somFinalTocado = false

            motor.pause()
            motor.currentTime = 0
            motorLigado = false
        }
        return
    }

    // modo 2 jogadores
    if (carro1.vida <= 0 && carro2.vida <= 0) {
        jogar = false
        venceu = false
        somFinalTocado = false

        motor.pause()
        motor.currentTime = 0
        motorLigado = false
    }

    else if (carro1.vida <= 0) {
        jogar = false
        venceu = true
        vencedor = "Violeta 💜 VENCEU!"
        somFinalTocado = false

        motor.pause()
        motor.currentTime = 0
        motorLigado = false
    }

    else if (carro2.vida <= 0) {
        jogar = false
        venceu = true
        vencedor = "Penelope 💗 VENCEU!"
        somFinalTocado = false

        motor.pause()
        motor.currentTime = 0
        motorLigado = false
    }
}

function ver_fase() {

    if (modoJogo === 1) {
        if (carro1.pontos >= 150 && fase === 1) {
            fase = 2

            carroInimigo.vel = 5
            carroInimigo2.vel = 5
            carroInimigo3.vel = 5

            powerVida.vel = 3.5
            powerPonto.vel = 3.5
        }

        else if (carro1.pontos >= 300 && fase === 2) {
            fase = 3

            carroInimigo.vel = 7
            carroInimigo2.vel = 7
            carroInimigo3.vel = 7

            powerVida.vel = 4.5
            powerPonto.vel = 4.5
        }

        return
    }

    if ((carro1.pontos >= 150 || carro2.pontos >= 150) && fase === 1) {
        fase = 2

        carroInimigo.vel = 5
        carroInimigo2.vel = 5
        carroInimigo3.vel = 5

        powerVida.vel = 3.5
        powerPonto.vel = 3.5
    }

    else if ((carro1.pontos >= 300 || carro2.pontos >= 300) && fase === 2) {
        fase = 3

        carroInimigo.vel = 7
        carroInimigo2.vel = 7
        carroInimigo3.vel = 7

        powerVida.vel = 4.5
        powerPonto.vel = 4.5
    }
}

function colisao() {
    if (carro1.vida > 0 && carro1.colid(carroInimigo)) {
        batida.currentTime = 0
        batida.play()
        carroInimigo.recomeca()
        carro1.vida -= 1
    }

    if (carro1.vida > 0 && carro1.colid(carroInimigo2)) {
        batida.currentTime = 0
        batida.play()
        carroInimigo2.recomeca()
        carro1.vida -= 1
    }

    if (carro1.vida > 0 && carro1.colid(carroInimigo3)) {
        batida.currentTime = 0
        batida.play()
        carroInimigo3.recomeca()
        carro1.vida -= 1
    }

    if (modoJogo === 2) {
        if (carro2.vida > 0 && carro2.colid(carroInimigo)) {
            batida.currentTime = 0
            batida.play()
            carroInimigo.recomeca()
            carro2.vida -= 1
        }

        if (carro2.vida > 0 && carro2.colid(carroInimigo2)) {
            batida.currentTime = 0
            batida.play()
            carroInimigo2.recomeca()
            carro2.vida -= 1
        }

        if (carro2.vida > 0 && carro2.colid(carroInimigo3)) {
            batida.currentTime = 0
            batida.play()
            carroInimigo3.recomeca()
            carro2.vida -= 1
        }
    }
}

function pontuacao() {
    if (carroInimigo.x <= -100) {
        if (carro1.vida > 0) {
            carro1.pontos += 5
        }

        if (modoJogo === 2 && carro2.vida > 0) {
            carro2.pontos += 5
        }

        carroInimigo.recomeca()
    }

    if (carroInimigo2.x <= -100) {
        if (carro1.vida > 0) {
            carro1.pontos += 5
        }

        if (modoJogo === 2 && carro2.vida > 0) {
            carro2.pontos += 5
        }

        carroInimigo2.recomeca()
    }

    if (carroInimigo3.x <= -100) {
        if (carro1.vida > 0) {
            carro1.pontos += 5
        }

        if (modoJogo === 2 && carro2.vida > 0) {
            carro2.pontos += 5
        }

        carroInimigo3.recomeca()
    }
}

function powerups() {

    if (carro1.vida > 0 && carro1.colid(powerVida)) {
        if (carro1.vida < 5) {
            carro1.vida += 1
            somVida.currentTime = 0
            somVida.play()
        }
        powerVida.recomeca()
    }

    if (modoJogo === 2) {
        if (carro2.vida > 0 && carro2.colid(powerVida)) {
            if (carro2.vida < 5) {
                carro2.vida += 1
                somVida.currentTime = 0
                somVida.play()
            }
            powerVida.recomeca()
        }
    }

    if (carro1.vida > 0 && carro1.colid(powerPonto)) {
        carro1.pontos += 10
        somDiamante.currentTime = 0
        somDiamante.play()
        powerPonto.recomeca()
    }

    if (modoJogo === 2) {
        if (carro2.vida > 0 && carro2.colid(powerPonto)) {
            carro2.pontos += 10
            somDiamante.currentTime = 0
            somDiamante.play()
            powerPonto.recomeca()
        }
    }
}

function vitoria() {

    // modo 1 jogador
    if (modoJogo === 1) {
        if (fase === 3 && carro1.pontos >= 450 && carro1.vida > 0) {
            jogar = false
            venceu = true
            vencedor = "Penelope 💗 VENCEU!"
            somFinalTocado = false

            motor.pause()
            motor.currentTime = 0
            motorLigado = false
        }
        return
    }

    // modo 2 jogadores
    if (fase === 3 && carro1.pontos >= 450 && carro1.vida > 0) {
        jogar = false
        venceu = true
        vencedor = "Penélope 💗 VENCEU!"
        somFinalTocado = false

        motor.pause()
        motor.currentTime = 0
        motorLigado = false
    }

    else if (fase === 3 && carro2.pontos >= 450 && carro2.vida > 0) {
        jogar = false
        venceu = true
        vencedor = "Violeta 💜 VENCEU!"
        somFinalTocado = false

        motor.pause()
        motor.currentTime = 0
        motorLigado = false
    }
}

function desenha() {
    if (jogar) {
        carroInimigo.des_carro()
        carroInimigo2.des_carro()
        carroInimigo3.des_carro()

        if (carro1.vida > 0) {
            carro1.des_carro()
        }

        if (modoJogo === 2 && carro2.vida > 0) {
            carro2.des_carro()
        }

        powerVida.des_carro()
        powerPonto.des_carro()

        des.fillStyle = 'rgba(255, 192, 203, 0.22)'
        des.fillRect(12, 12, 1080, 44)

        des.strokeStyle = 'rgba(255, 255, 255, 0.45)'
        des.lineWidth = 1.5
        des.strokeRect(12, 12, 1080, 44)

        des.beginPath()
        des.strokeStyle = 'rgba(255, 255, 255, 0.25)'
        des.moveTo(230, 18)
        des.lineTo(230, 50)

        if (modoJogo === 2) {
            des.moveTo(470, 18)
            des.lineTo(470, 50)
            des.moveTo(890, 18)
            des.lineTo(890, 50)
        } else {
            des.moveTo(430, 18)
            des.lineTo(430, 50)
        }

        des.stroke()

        des.shadowColor = 'rgba(0, 0, 0, 0.20)'
        des.shadowBlur = 4

        let vidasHUD1 = '💗'.repeat(carro1.vida)
        t2.des_text('P1 ' + vidasHUD1, 25, 41, '#ffffff', 'bold 18px Arial')
        t1.des_text('💎 ' + carro1.pontos, 173, 41, '#ffffff', 'bold 18px Arial')

        // desenha a fase SEMPRE
        fase_txt.des_text('👑 Fase ' + fase, 900, 41, '#ffffff', 'bold 18px Arial')

        if (modoJogo === 2) {
            let vidasHUD2 = '💗'.repeat(carro2.vida)
            t2.des_text('P2 ' + vidasHUD2, 260, 41, '#ffffff', 'bold 18px Arial')
            t1.des_text('💎 ' + carro2.pontos, 410, 41, '#ffffff', 'bold 18px Arial')
        }


        des.shadowBlur = 0

        if (pausado) {
            des.fillStyle = 'rgba(0, 0, 0, 0.35)'
            des.fillRect(0, 0, 1200, 700)

            des.fillStyle = 'white'
            des.font = 'bold 60px Arial'
            des.fillText('PAUSADO', 420, 360)
        }

    } else {

        if (!somFinalTocado) {
            if (venceu) {
                somVitoria.currentTime = 0
                somVitoria.play()
            } else {
                somDerrota.currentTime = 0
                somDerrota.play()
            }

            somFinalTocado = true
        }

        des.fillStyle = 'rgba(0, 0, 0, 0.45)'
        des.fillRect(0, 0, 1200, 700)

        des.fillStyle = 'rgba(255, 240, 245, 0.95)'
        des.fillRect(300, 180, 600, 260)

        des.strokeStyle = '#ff4da6'
        des.lineWidth = 4
        des.strokeRect(300, 180, 600, 260)

        if (venceu) {
            t1.des_text(vencedor, 340, 260, '#ff4da6', 'bold 42px Arial')
        } else {
            t1.des_text('GAME OVER', 410, 260, '#ff4da6', 'bold 50px Arial')
        }

        t2.des_text('Pontos Penelope 💗: ' + carro1.pontos, 410, 335, '#7a2c5b', 'bold 24px Arial')

        if (modoJogo === 2) {
            t2.des_text('Pontos Violeta 💜: ' + carro2.pontos, 410, 380, '#7a2c5b', 'bold 24px Arial')
        }

        t2.des_text('Pressione ENTER para jogar novamente', 350, 430, '#a14d7a', 'bold 22px Arial')
    }
}

function atualiza() {
    if (jogar) {
        if (carro1.vida > 0) {
            carro1.mov_car()
        }

        if (modoJogo === 2 && carro2.vida > 0) {
            carro2.mov_car()
        }

        carroInimigo.mov_car()
        carroInimigo2.mov_car()
        carroInimigo3.mov_car()
        powerVida.mov_car()
        powerPonto.mov_car()

        estrada.mov_est()
        estrada2.mov_est()
        estrada3.mov_est()

        colisao()
        pontuacao()
        ver_fase()
        powerups()
        game_over()
        vitoria()
    }
}

function main() {
    des.clearRect(0, 0, 1200, 700)
    trocarFundo()
    desenha()

    if (jogar && !pausado) {
        atualiza()
    }

    requestAnimationFrame(main)
}

function voltarMenu() {
    let sair = confirm("Tem certeza que deseja sair do jogo?")
    if (sair) {
        location.href = "index.html"
    }
}

function pausar() {
    pausado = !pausado

    let botao = document.getElementById("btn-pause")

    if (pausado) {
        botao.innerText = "▶"
        motor.pause()
        motorLigado = false
    } else {
        botao.innerText = "⏸"
    }
}

main()