let carroInimigo = new CarroInimigo(1300, 115, 130, 130, './img/img_inimigoP.png')
let carroInimigo2 = new CarroInimigo(1500, 200, 123, 125, './img/img_dog.png')
let carroInimigo3 = new CarroInimigo(1700, 425, 125, 120, './img/img_fantasmas.png')

let powerVida = new CarroInimigo(1400, 200, 45, 35, './img/img_coracao.png')
let powerPonto = new CarroInimigo(1600, 400, 60, 60, './img/img_diamante.png')

let estrada = new Estrada(10, 345, 40, 10)
let estrada2 = new Estrada(80, 345, 40, 10)
let estrada3 = new Estrada(140, 345, 40, 10)

let carro1 = new Carro(190, 250, 125, 120, './img/img_jogador1.png')
let carro2 = new Carro(190, 350, 125, 120, './img/img_jogador2.png')

let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()

// ─── Sons do jogo ────────────────────────────────────────────────────────────
// motor = som contínuo dos carros
// batida = som quando bate nos inimigos
// somDiamante = som quando pega o diamante
// somVida = som quando pega o coração

let motor = new Audio('./img/motor.wav')
let batida = new Audio('./img/batida.mp3')
let somDiamante = new Audio('./img/diamante.mp3')
let somVida = new Audio('./img/vida.mp3')


// volumes ajustados para não ficarem altos demais
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

// essa variável controla se o motor já está tocando
// isso evita ficar chamando motor.play() várias vezes
let motorLigado = false


let jogar = true
let fase = 1
let fundoAtual = 0
let venceu = false
let pausado = false
let vencedor = ""

// ─── Eventos de teclado ──────────────────────────────────────────────────────

document.addEventListener('keydown', (e) => {

    // se o jogo acabou e apertar ENTER, reinicia a página
    if (!jogar && e.key === 'Enter') {
        location.reload()
    }

    // só movimenta os carros se o jogo estiver rodando e não estiver pausado
    if (jogar && !pausado) {

        // liga o som do motor só uma vez
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

        // jogador 2 = setas
        if (e.key === 'ArrowUp') {
            carro2.dir = -10
        } else if (e.key === 'ArrowDown') {
            carro2.dir = 10
        }
    }
})

document.addEventListener('keyup', (e) => {
    // para movimento do jogador 1
    if (e.key === 'w' || e.key === 'W') {
        carro1.dir = 0
    } else if (e.key === 's' || e.key === 'S') {
        carro1.dir = 0
    }

    // para movimento do jogador 2
    if (e.key === 'ArrowUp') {
        carro2.dir = 0
    } else if (e.key === 'ArrowDown') {
        carro2.dir = 0
    }
})

// ─── Função para trocar fundo ────────────────────────────────────────────────
// troca o cenário conforme a fase atual

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

// ─── Controle do jogo ────────────────────────────────────────────────────────

// verifica derrota e vitória por eliminação
function game_over() {

    // os dois perderam → GAME OVER
    if (carro1.vida <= 0 && carro2.vida <= 0) {
        jogar = false
        venceu = false
        somFinalTocado = false

        motor.pause()
        motor.currentTime = 0
        motorLigado = false
    }

    // jogador 1 morreu → jogador 2 vence
    else if (carro1.vida <= 0) {
        jogar = false
        venceu = true
        vencedor = "Violeta 💜 VENCEU"
        somFinalTocado = false

        motor.pause()
        motor.currentTime = 0
        motorLigado = false
    }

    // jogador 2 morreu → jogador 1 vence
    else if (carro2.vida <= 0) {
        jogar = false
        venceu = true
        vencedor = "Penelope 💗VENCEU!"
        somFinalTocado = false

        motor.pause()
        motor.currentTime = 0
        motorLigado = false
    }
}
// muda a fase e aumenta a velocidade dos inimigos
function ver_fase() {
    if ((carro1.pontos >= 200 || carro2.pontos >= 200) && fase === 1) {
        fase = 2
        carroInimigo.vel = 4
        carroInimigo2.vel = 4
        carroInimigo3.vel = 4
    } else if ((carro1.pontos >= 400 || carro2.pontos >= 400) && fase === 2) {
        fase = 3
        carroInimigo.vel = 6
        carroInimigo2.vel = 6
        carroInimigo3.vel = 6
    }
}

// verifica colisão com inimigos
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

// pontuação dos inimigos que saem da tela
// cada inimigo que passa dá ponto para os dois jogadores que ainda estiverem vivos
function pontuacao() {
    if (carroInimigo.x <= -100) {
        if (carro1.vida > 0) {
            carro1.pontos += 5
        }

        if (carro2.vida > 0) {
            carro2.pontos += 5
        }

        carroInimigo.recomeca()
    }

    if (carroInimigo2.x <= -100) {
        if (carro1.vida > 0) {
            carro1.pontos += 5
        }

        if (carro2.vida > 0) {
            carro2.pontos += 5
        }

        carroInimigo2.recomeca()
    }

    if (carroInimigo3.x <= -100) {
        if (carro1.vida > 0) {
            carro1.pontos += 5
        }

        if (carro2.vida > 0) {
            carro2.pontos += 5
        }

        carroInimigo3.recomeca()
    }
}

// powerups
function powerups() {

    // coração = ganha vida
    if (carro1.vida > 0 && carro1.colid(powerVida)) {
        if (carro1.vida < 5) {
            carro1.vida += 1

            // toca som da vida
            somVida.currentTime = 0
            somVida.play()
        }
        powerVida.recomeca()
    }

    if (carro2.vida > 0 && carro2.colid(powerVida)) {
        if (carro2.vida < 5) {
            carro2.vida += 1

            somVida.currentTime = 0
            somVida.play()
        }
        powerVida.recomeca()
    }

    // diamante = ganha pontos
    if (carro1.vida > 0 && carro1.colid(powerPonto)) {
        carro1.pontos += 10

        somDiamante.currentTime = 0
        somDiamante.play()

        powerPonto.recomeca()
    }

    if (carro2.vida > 0 && carro2.colid(powerPonto)) {
        carro2.pontos += 10

        somDiamante.currentTime = 0
        somDiamante.play()

        powerPonto.recomeca()
    }
}

// vitória por pontuação final
// só vence se estiver na fase 3 e com pelo menos 1 vida
function vitoria() {

    // jogador 1 vence
    if (fase === 3 && carro1.pontos >= 600 && carro1.vida > 0) {
        jogar = false
        venceu = true
        vencedor = " Penelope 💗 VENCEU!"
        somFinalTocado = false

        motor.pause()
        motor.currentTime = 0
        motorLigado = false
    }

    // jogador 2 vence
    else if (fase === 3 && carro2.pontos >= 600 && carro2.vida > 0) {
        jogar = false
        venceu = true
        vencedor = "Violeta 💜 VENCEU!"
        somFinalTocado = false

        motor.pause()
        motor.currentTime = 0
        motorLigado = false
    }
}
// ─── Desenho ─────────────────────────────────────────────────────────────────

function desenha() {
    if (jogar) {
        carroInimigo.des_carro()
        carroInimigo2.des_carro()
        carroInimigo3.des_carro()

        if (carro1.vida > 0) {
            carro1.des_carro()
        }

        if (carro2.vida > 0) {
            carro2.des_carro()
        }

        powerVida.des_carro()
        powerPonto.des_carro()

        // HUD
        des.fillStyle = 'rgba(255, 192, 203, 0.22)'
        des.fillRect(12, 12, 1080, 44)

        des.strokeStyle = 'rgba(255, 255, 255, 0.45)'
        des.lineWidth = 1.5
        des.strokeRect(12, 12, 1080, 44)

        des.beginPath()
        des.strokeStyle = 'rgba(255, 255, 255, 0.25)'
        des.moveTo(230, 18)
        des.lineTo(230, 50)
        des.moveTo(470, 18)
        des.lineTo(470, 50)
        des.moveTo(890, 18)
        des.lineTo(890, 50)
        des.stroke()

        des.shadowColor = 'rgba(0, 0, 0, 0.20)'
        des.shadowBlur = 4

        let vidasHUD1 = '💗'.repeat(carro1.vida)
        t2.des_text('P1 ' + vidasHUD1, 25, 41, '#ffffff', 'bold 18px Arial')
        t1.des_text('💎 ' + carro1.pontos, 173, 41, '#ffffff', 'bold 18px Arial')

        let vidasHUD2 = '💗'.repeat(carro2.vida)
        t2.des_text('P2 ' + vidasHUD2, 260, 41, '#ffffff', 'bold 18px Arial')
        t1.des_text('💎 ' + carro2.pontos, 410, 41, '#ffffff', 'bold 18px Arial')

        fase_txt.des_text('👑 Fase ' + fase, 900, 41, '#ffffff', 'bold 18px Arial')

        des.shadowBlur = 0

        if (pausado) {
            des.fillStyle = 'rgba(0, 0, 0, 0.35)'
            des.fillRect(0, 0, 1200, 700)

            des.fillStyle = 'white'
            des.font = 'bold 60px Arial'
            des.fillText('PAUSADO', 420, 360)
        }

    } else {

        // 🔊 SOM FINAL (CORRETO)
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

        // tela final
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
        t2.des_text('Pontos Violeta 💜: ' + carro2.pontos, 410, 380, '#7a2c5b', 'bold 24px Arial')
        t2.des_text('Pressione ENTER para jogar novamente', 350, 430, '#a14d7a', 'bold 22px Arial')
    }
}

// ─── Atualização ─────────────────────────────────────────────────────────────

function atualiza() {
    if (jogar) {
        if (carro1.vida > 0) {
            carro1.mov_car()
        }

        if (carro2.vida > 0) {
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

// ─── Loop principal ──────────────────────────────────────────────────────────

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

// pausa e despausa o jogo
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