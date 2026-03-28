let carroInimigo = new CarroInimigo(1300, 115, 130, 130, './img/img_inimigoP.png')
let carroInimigo2 = new CarroInimigo(1500, 200, 123, 125, './img/img_dog.png')
let carroInimigo3 = new CarroInimigo(1700, 425, 125, 120, './img/img_fantasmas.png')

let powerVida = new CarroInimigo(1400, 200, 45, 35, './img/img_coracao.png')
let powerPonto = new CarroInimigo(1600, 400, 60, 60, './img/img_diamante.png')

let estrada = new Estrada(10, 345, 40, 10)
let estrada2 = new Estrada(80, 345, 40, 10)
let estrada3 = new Estrada(140, 345, 40, 10)

let carro1 = new Carro(100, 250, 125, 120, './img/img_jogador1.png')
let carro2 = new Carro(100, 350, 125, 120, './img/img_jogador2.png')

let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()

let motor = new Audio('./img/motor.wav')
let batida = new Audio('./img/batida.mp3')
motor.volume = 0.5
motor.loop = true
batida.volume = 0.5

let jogar = true
let fase = 1
let fundoAtual = 0
let venceu = false
let pausado = false
let vencedor = ""

// ─── Eventos de teclado ──────────────────────────────────────────────────────

document.addEventListener('keydown', (e) => {
    motor.play()

    if (e.key === 'w' || e.key === 'W') {
        carro1.dir -= 10
    } else if (e.key === 's' || e.key === 'S') {
        carro1.dir += 10
    }

    if (e.key === 'ArrowUp') {
        carro2.dir -= 10
    } else if (e.key === 'ArrowDown') {
        carro2.dir += 10
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'W') {
        carro1.dir = 0
    } else if (e.key === 's' || e.key === 'S') {
        carro1.dir = 0
    }

    if (e.key === 'ArrowUp') {
        carro2.dir = 0
    } else if (e.key === 'ArrowDown') {
        carro2.dir = 0
    }
})

// ─── Função para trocar fundo ────────────────────────────────────────────────

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

function game_over() {
    // os dois perderam
    if (carro1.vida <= 0 && carro2.vida <= 0) {
        jogar = false
        venceu = false
        motor.pause()
    }

    // só o jogador 1 perdeu
    else if (carro1.vida <= 0) {
        jogar = false
        venceu = true
        vencedor = "JOGADOR 2 VENCEU!"
        motor.pause()
    }

    // só o jogador 2 perdeu
    else if (carro2.vida <= 0) {
        jogar = false
        venceu = true
        vencedor = "JOGADOR 1 VENCEU!"
        motor.pause()
    }
}
function ver_fase() {
    if ((carro1.pontos > 20 || carro2.pontos > 20) && fase === 1) {
        fase = 2
        carroInimigo.vel = 4
        carroInimigo2.vel = 4
        carroInimigo3.vel = 4
    } else if ((carro1.pontos > 40 || carro2.pontos > 40) && fase === 2) {
        fase = 3
        carroInimigo.vel = 6
        carroInimigo2.vel = 6
        carroInimigo3.vel = 6
    }
}

function colisao() {
    if (carro1.colid(carroInimigo)) {
        batida.play()
        carroInimigo.recomeca()
        carro1.vida -= 1
    }

    if (carro1.colid(carroInimigo2)) {
        batida.play()
        carroInimigo2.recomeca()
        carro1.vida -= 1
    }

    if (carro1.colid(carroInimigo3)) {
        batida.play()
        carroInimigo3.recomeca()
        carro1.vida -= 1
    }

    if (carro2.colid(carroInimigo)) {
        batida.play()
        carroInimigo.recomeca()
        carro2.vida -= 1
    }

    if (carro2.colid(carroInimigo2)) {
        batida.play()
        carroInimigo2.recomeca()
        carro2.vida -= 1
    }

    if (carro2.colid(carroInimigo3)) {
        batida.play()
        carroInimigo3.recomeca()
        carro2.vida -= 1
    }

    console.log('vida jogador 1: ', carro1.vida)
    console.log('vida jogador 2: ', carro2.vida)
}

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


function powerups() {
    if (carro1.colid(powerVida)) {
        if (carro1.vida < 5) {
            carro1.vida += 1
        }
        powerVida.recomeca()
    }

    if (carro2.colid(powerVida)) {
        if (carro2.vida < 5) {
            carro2.vida += 1
        }
        powerVida.recomeca()
    }

    if (carro1.colid(powerPonto)) {
        carro1.pontos += 10
        powerPonto.recomeca()
    }

    if (carro2.colid(powerPonto)) {
        carro2.pontos += 10
        powerPonto.recomeca()
    }
}

function vitoria() {
    if (carro1.pontos >= 100) {
        jogar = false
        venceu = true
        vencedor = "JOGADOR 1 VENCEU!"
        motor.pause()
    }

    if (carro2.pontos >= 100) {
        jogar = false
        venceu = true
        vencedor = "JOGADOR 2 VENCEU!"
        motor.pause()
    }
}

// ─── Desenho ─────────────────────────────────────────────────────────────────

function desenha() {
    if (jogar) {
        carroInimigo.des_carro()
        carroInimigo2.des_carro()
        carroInimigo3.des_carro()
        carro1.des_carro()
        carro2.des_carro()
        powerVida.des_carro()
        powerPonto.des_carro()

        // ===== HUD PRINCIPAL =====

        // fundo da HUD (mais largo pra caber tudo)
       des.fillStyle = 'rgba(255, 192, 203, 0.22)'
        des.fillRect(12, 12, 1080, 44)

        // borda
        des.strokeStyle = 'rgba(255, 255, 255, 0.45)'
        des.lineWidth = 1.5
        des.strokeRect(12, 12, 1080, 44)

        // divisórias (organiza visualmente)
        des.beginPath()
        des.strokeStyle = 'rgba(255, 255, 255, 0.25)'

        // separa P1
        des.moveTo(230, 18)
        des.lineTo(230, 50)

        // separa P2
        des.moveTo(470, 18)
        des.lineTo(470, 50)

        // separa fase (lado direito)
        des.moveTo(890, 18)
        des.lineTo(890, 50)

        des.stroke()

        // sombra leve
        des.shadowColor = 'rgba(0, 0, 0, 0.20)'
        des.shadowBlur = 4

        // ===== JOGADOR 1 =====
        let vidasHUD1 = '💗'.repeat(carro1.vida)

        t2.des_text('P1 ' + vidasHUD1, 25, 41, '#ffffff', 'bold 18px Arial')
        t1.des_text('💎 ' + carro1.pontos, 173, 41, '#ffffff', 'bold 18px Arial')

        // ===== JOGADOR 2 =====
        let vidasHUD2 = '💗'.repeat(carro2.vida)

        t2.des_text('P2 ' + vidasHUD2, 260, 41, '#ffffff', 'bold 18px Arial')
        t1.des_text('💎 ' + carro2.pontos, 410, 41, '#ffffff', 'bold 18px Arial')

        // ===== FASE (lado direito, longe da logo) =====
        fase_txt.des_text('👑 Fase ' + fase, 900, 41, '#ffffff', 'bold 18px Arial')

        // tira sombra
        des.shadowBlur = 0
        if (pausado) {
            des.fillStyle = 'rgba(0, 0, 0, 0.35)'
            des.fillRect(0, 0, 1200, 700)

            des.fillStyle = 'white'
            des.font = 'bold 60px Arial'
            des.fillText('PAUSADO', 470, 350)
        }

  } else {
    if (venceu) {
        t1.des_text(vencedor, 300, 350, '#ff4da6', '60px Arial')
    } else {
        t1.des_text('GAME OVER', 420, 350, '#ff4da6', '60px Arial')
    }

    t2.des_text('P1: ' + carro1.pontos, 500, 410, '#ff4da6', '25px Arial')
    t2.des_text('P2: ' + carro2.pontos, 500, 450, '#ff4da6', '25px Arial')
}
}

// ─── Atualização ─────────────────────────────────────────────────────────────

function atualiza() {
    if (jogar) {
        carro1.mov_car()
        carro2.mov_car()
        carroInimigo.mov_car()
        carroInimigo2.mov_car()
        carroInimigo3.mov_car()
        powerVida.mov_car()
        powerPonto.mov_car()
        vitoria()

        estrada.mov_est()
        estrada2.mov_est()
        estrada3.mov_est()

        colisao()
        pontuacao()
        ver_fase()
        game_over()
        powerups()
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

function pausar() {
    pausado = !pausado

    let botao = document.getElementById("btn-pause")

    if (pausado) {
        botao.innerText = "▶"
    } else {
        botao.innerText = "⏸"
    }
}

if (!jogar) {
    t1.des_text("PAUSADO", 500, 350, "white", "40px Arial")
}

main()