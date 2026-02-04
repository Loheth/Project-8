window.onload = () => {

    let start = false;
    context = canvas.getContext("2d");

    const menu = () => {
        renderMap(mapMenu)
        for (let i = 0; i < mapMenu[0].length; i += 1) {
            drawCyberSolidBlock(50 * i, 0, 50, 50)
        }
        context.drawImage(superBomberman, (canvas.width - 500) / 2, canvas.height / 1.55 - 370, 500, 500)
        context.font = "26px silkscreenbold";
        context.fillStyle = '#00ffaa';
        context.fillText('Press enter', canvas.width / 2 - 105, canvas.height / 1.55);
        context.fillText('to start', canvas.width / 2 - 90, canvas.height / 1.35);
        requestId2 = window.requestAnimationFrame(menu);
    }

    const startGame = () => {
        window.cancelAnimationFrame(requestId2);
        title.pause()
        startSound.play()
        switch (Math.floor(Math.random() * 2)) {
            case 0:
                randMap = makeRandMap(map1);
                break;
            case 1:
                randMap = makeRandMap(map2);
                break;
        }
        setTimeout(() => {
            level1.play()
            updateGameArea()
        }, 500);
    }

    const makeRandMap = (map) => {
        for (let j = 0; j < map.length; j += 1) {
            for (let i = 0; i < map[0].length; i += 1) {
                if (map[j][i] === 0 && Math.random() > 0.70) {
                    map[j][i] = 2;
                }
            }
        }
        map[1][1] = 0;
        map[1][2] = 0;
        map[2][1] = 0;
        map[9][13] = 0;
        map[8][13] = 0;
        map[9][12] = 0;
        return map;
    }

    // Cybersecurity-themed drawing functions
    const drawCyberBackground = (x, y, width, height) => {
        // Dark background with subtle grid
        context.fillStyle = '#0a0a0f';
        context.fillRect(x, y, width, height);
        
        // Subtle grid lines in cyan/green
        context.strokeStyle = '#00ffaa';
        context.lineWidth = 0.5;
        context.globalAlpha = 0.2;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + width, y);
        context.moveTo(x, y);
        context.lineTo(x, y + height);
        context.stroke();
        
        // Random binary code effect
        if (Math.random() > 0.95) {
            context.fillStyle = '#00ff88';
            context.globalAlpha = 0.3;
            context.font = '8px monospace';
            const binary = Math.random() > 0.5 ? '1' : '0';
            context.fillText(binary, x + 5, y + 15);
        }
        context.globalAlpha = 1;
    };

    const drawCyberWall = (x, y, width, height) => {
        // Server rack / firewall appearance
        const gradient = context.createLinearGradient(x, y, x + width, y + height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.5, '#16213e');
        gradient.addColorStop(1, '#0f3460');
        context.fillStyle = gradient;
        context.fillRect(x, y, width, height);
        
        // Border in cyan
        context.strokeStyle = '#00ffaa';
        context.lineWidth = 2;
        context.strokeRect(x + 1, y + 1, width - 2, height - 2);
        
        // Server rack slots
        context.fillStyle = '#00ff88';
        context.globalAlpha = 0.6;
        for (let i = 0; i < 3; i++) {
            context.fillRect(x + 8, y + 8 + i * 12, width - 16, 4);
        }
        
        // LED indicators
        context.fillStyle = '#ff0088';
        context.fillRect(x + width - 12, y + 8, 4, 4);
        context.fillStyle = '#00ff88';
        context.fillRect(x + width - 12, y + 16, 4, 4);
        
        context.globalAlpha = 1;
    };

    const drawCyberSolidBlock = (x, y, width, height) => {
        // Encrypted security barrier
        const gradient = context.createLinearGradient(x, y, x + width, y + height);
        gradient.addColorStop(0, '#1a0033');
        gradient.addColorStop(0.5, '#330066');
        gradient.addColorStop(1, '#1a0033');
        context.fillStyle = gradient;
        context.fillRect(x, y, width, height);
        
        // Hexagonal pattern border
        context.strokeStyle = '#ff00ff';
        context.lineWidth = 2;
        context.strokeRect(x + 2, y + 2, width - 4, height - 4);
        
        // Encryption symbols / lock pattern
        context.fillStyle = '#ff00ff';
        context.globalAlpha = 0.7;
        // Draw a lock-like pattern
        context.fillRect(x + width/2 - 4, y + 8, 8, 6);
        context.beginPath();
        context.arc(x + width/2, y + 14, 6, 0, Math.PI);
        context.stroke();
        
        // Binary code overlay
        context.fillStyle = '#00ffff';
        context.globalAlpha = 0.4;
        context.font = '6px monospace';
        context.fillText('1011', x + 4, y + height - 4);
        context.fillText('0101', x + width - 20, y + height - 4);
        
        context.globalAlpha = 1;
    };

    const drawVirusEnemy = (x, y, width, height, frame = 0) => {
        const centerX = x + width / 2;
        const centerY = y + height / 2;
        const radius = Math.min(width, height) / 2 - 2;
        
        // Pulsing effect based on frame
        const pulse = 1 + Math.sin(frame * 0.2) * 0.1;
        const currentRadius = radius * pulse;
        
        // Outer glow (infected aura)
        const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, currentRadius * 1.5);
        gradient.addColorStop(0, 'rgba(255, 0, 136, 0.6)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 136, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 0, 136, 0)');
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(centerX, centerY, currentRadius * 1.5, 0, Math.PI * 2);
        context.fill();
        
        // Main virus body (spiky circle)
        const bodyGradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, currentRadius);
        bodyGradient.addColorStop(0, '#ff0088');
        bodyGradient.addColorStop(0.5, '#cc0066');
        bodyGradient.addColorStop(1, '#990044');
        context.fillStyle = bodyGradient;
        
        // Draw spiky virus shape
        context.beginPath();
        const spikes = 8;
        for (let i = 0; i < spikes * 2; i++) {
            const angle = (i * Math.PI) / spikes;
            const r = i % 2 === 0 ? currentRadius : currentRadius * 0.7;
            const px = centerX + Math.cos(angle) * r;
            const py = centerY + Math.sin(angle) * r;
            if (i === 0) {
                context.moveTo(px, py);
            } else {
                context.lineTo(px, py);
            }
        }
        context.closePath();
        context.fill();
        
        // Border/outline
        context.strokeStyle = '#ff00aa';
        context.lineWidth = 2;
        context.stroke();
        
        // Infection particles around virus
        context.fillStyle = '#ff0088';
        context.globalAlpha = 0.7;
        for (let i = 0; i < 6; i++) {
            const particleAngle = (i * Math.PI * 2) / 6 + frame * 0.1;
            const particleDist = currentRadius * 1.2;
            const px = centerX + Math.cos(particleAngle) * particleDist;
            const py = centerY + Math.sin(particleAngle) * particleDist;
            context.beginPath();
            context.arc(px, py, 2, 0, Math.PI * 2);
            context.fill();
        }
        
        // Core (infected center)
        context.fillStyle = '#ffffff';
        context.globalAlpha = 0.9;
        context.beginPath();
        context.arc(centerX, centerY, currentRadius * 0.3, 0, Math.PI * 2);
        context.fill();
        
        // Red cross/X mark (infection symbol)
        context.strokeStyle = '#ff0000';
        context.lineWidth = 2;
        context.globalAlpha = 1;
        const crossSize = currentRadius * 0.4;
        context.beginPath();
        context.moveTo(centerX - crossSize, centerY - crossSize);
        context.lineTo(centerX + crossSize, centerY + crossSize);
        context.moveTo(centerX + crossSize, centerY - crossSize);
        context.lineTo(centerX - crossSize, centerY + crossSize);
        context.stroke();
        
        context.globalAlpha = 1;
    };

    const renderMap = (map) => {
        for (let j = 0; j < map.length; j += 1) {
            for (let i = 0; i < map[0].length; i += 1) {
                drawCyberBackground(i * gridWidth, j * gridHeigth + offset, 50, 50)
                switch (map[j][i]) {
                        case 1:
                        drawCyberSolidBlock(i * gridWidth, j * gridHeigth + offset, 50, 50)
                        break;
                    case 2:
                        drawCyberWall(i * gridWidth, j * gridHeigth + offset, 50, 50)
                        break;
                        case 3:
                        context.drawImage(bomb, 0, 0, 19, 20, i * gridWidth, j * gridHeigth + offset, 50, 50)
                        break;
                    case 4:
                        context.drawImage(explosion, 45, 0, 20, 20, i * gridWidth, j * gridHeigth + offset, 50, 50)
                        break;
                        case 5:
                        context.drawImage(items, 0, 0, 16, 16, i * gridWidth + 10, j * gridHeigth + offset + 10, 30, 30)
                        break;
                    case 6:
                        context.drawImage(items, 34, 0, 16, 16, i * gridWidth + 10, j * gridHeigth + offset + 10, 30, 30)
                        break;
                        case 7:
                        context.drawImage(items, 18, 0, 16, 16, i * gridWidth + 10, j * gridHeigth + offset + 10, 30, 30)
                        break;
                }
            }
        }
    }

    const clear = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const statusBar = () => {
        // Draw cybersecurity-themed status bar background
        const gradient = context.createLinearGradient(50, 0, 700, 0);
        gradient.addColorStop(0, '#0a0a0f');
        gradient.addColorStop(0.5, '#1a1a2e');
        gradient.addColorStop(1, '#0a0a0f');
        context.fillStyle = gradient;
        context.fillRect(50, 0, 650, 50);
        
        // Border
        context.strokeStyle = '#00ffaa';
        context.lineWidth = 2;
        context.strokeRect(50, 0, 650, 50);
        
        // Corner blocks
        drawCyberSolidBlock(0, 0, 50, 50)
        drawCyberSolidBlock(700, 0, 50, 50)
        
        context.drawImage(whiteHead, 60, 0, 50, 50)
        context.fillStyle = '#00ffaa';
        context.drawImage(heart, 103, 13, 25, 25)
        // Make health text larger and more visible
        context.font = "24px silkscreenbold";
        context.fillStyle = '#ffffff';
        context.strokeStyle = '#00ffaa';
        context.lineWidth = 2;
        context.strokeText(`${newPlayer.health}`, 135, 33);
        context.fillText(`${newPlayer.health}`, 135, 33);
        context.fillStyle = '#00ffaa';
        context.drawImage(items, 0, 0, 16, 16, 210, 10, 30, 30)
        context.font = "16px silkscreenbold";
        context.fillText(`${newPlayer.bombPower}`, 230, 40);
        context.drawImage(items, 34, 0, 16, 16, 255, 10, 30, 30)
        context.fillText(`${newPlayer.speed - 1}`, 275, 40);
        context.drawImage(items, 18, 0, 16, 16, 300, 10, 30, 30)
        context.fillText(`${newPlayer.bombs}`, 320, 40);
        // Draw virus icon instead of enemy sprite
        drawVirusEnemy(655, 5, 30, 30, frames);
        context.font = "26px silkscreenbold";
        if (newPlayer.enemiesKilled < 10) {
            context.fillText(`0${newPlayer.enemiesKilled}`, 608, 32);
        } else {
            context.fillText(`${newPlayer.enemiesKilled}`, 608, 32);
        }
        context.font = "26px silkscreenbold";
    }

    const gameOver = (player) => {
        level1.pause()
        setTimeout(() => {
            window.cancelAnimationFrame(requestId);
            clear();
            for (let i = 0; i < mapMenu[0].length; i += 1) {
                drawCyberSolidBlock(50 * i, 0, 50, 50)
            }
            renderMap(mapMenu);
            // Make game over text much larger and more visible
            context.font = "48px silkscreenbold";
            context.fillStyle = '#ff0088';
            context.strokeStyle = '#ffffff';
            context.lineWidth = 3;
            context.strokeText(`GAME OVER!`, 200, canvas.height / 2 - 50);
            context.fillText(`GAME OVER!`, 200, canvas.height / 2 - 50);
            
            context.font = "32px silkscreenbold";
            context.fillStyle = '#00ffaa';
            context.strokeStyle = '#000000';
            context.lineWidth = 2;
            context.strokeText(`YOUR FINAL SCORE IS ${newPlayer.enemiesKilled}`, 80, canvas.height / 2 + 30);
            context.fillText(`YOUR FINAL SCORE IS ${newPlayer.enemiesKilled}`, 80, canvas.height / 2 + 30);
            
            context.font = "28px silkscreenbold";
            context.fillStyle = '#00ffff';
            context.strokeStyle = '#000000';
            context.lineWidth = 2;
            context.strokeText(`PRESS ENTER TO PLAY AGAIN`, 50, canvas.height / 2 + 100);
            context.fillText(`PRESS ENTER TO PLAY AGAIN`, 50, canvas.height / 2 + 100);
        }, 500);
    }

    class Player {
        constructor(x, y, color, healthPosition, health, name, img) {
            this.name = name;
            this.healthPosition = healthPosition;
            this.x = x;
            this.y = y;
            this.color = color;
            this.speed = 2;
            this.speedX = 0;
            this.speedY = 0;
            this.size = 30;
            this.gridY = Math.floor((this.y + this.size / 2) / gridHeigth);
            this.gridX = Math.floor((this.x + this.size / 2) / gridWidth);
            this.bombs = 1;
            this.bombPower = 1;
            this.health = health;
            this.right = this.up = this.right = false;
            this.down = false;
            this.srcx = 0;
            this.srcy = 0;
            this.width = 16;
            this.height = 24;
            this.img = img;
            this.direction = Math.floor(Math.random() * 4);
            this.countAnim = 0;
            this.enemiesKilled = 0;

        }

        update() {
            context.fillStyle = this.color;
            this.sprites()
            context.drawImage(this.img, this.srcx, this.srcy, this.width, this.height, this.x, this.y - 20 + offset, this.width * 2.1, this.height * 2.1);
        }

        newPos() {
            this.x += this.speedX;
            this.gridX = Math.floor((this.x + this.size / 2) / gridWidth);

            this.y += this.speedY;
            this.gridY = Math.floor((this.y + this.size / 2) / gridHeigth);

            if (
                randMap[this.gridY - 1][this.gridX] !== 0 &&
                randMap[this.gridY - 1][this.gridX] !== 4 &&
                randMap[this.gridY - 1][this.gridX] !== 5 &&
                randMap[this.gridY - 1][this.gridX] !== 6 &&
                randMap[this.gridY - 1][this.gridX] !== 7 &&
                this.y < this.gridY * gridHeigth
            ) {
                this.y = this.gridY * gridHeigth;
            }
            if (
                randMap[this.gridY + 1][this.gridX] !== 0 &&
                randMap[this.gridY + 1][this.gridX] !== 4 &&
                randMap[this.gridY + 1][this.gridX] !== 5 &&
                randMap[this.gridY + 1][this.gridX] !== 6 &&
                randMap[this.gridY + 1][this.gridX] !== 7 &&
                this.y + this.size > (this.gridY + 1) * gridHeigth
            ) {
                this.y = this.gridY * gridHeigth + gridHeigth - this.size;
            }
            if (
                randMap[this.gridY][this.gridX - 1] !== 0 &&
                randMap[this.gridY][this.gridX - 1] !== 4 &&
                randMap[this.gridY][this.gridX - 1] !== 5 &&
                randMap[this.gridY][this.gridX - 1] !== 6 &&
                randMap[this.gridY][this.gridX - 1] !== 7 &&
                this.x < this.gridX * gridWidth
            ) {
                this.x = this.gridX * gridWidth;
            }
            if (
                randMap[this.gridY][this.gridX + 1] !== 0 &&
                randMap[this.gridY][this.gridX + 1] !== 4 &&
                randMap[this.gridY][this.gridX + 1] !== 5 &&
                randMap[this.gridY][this.gridX + 1] !== 6 &&
                randMap[this.gridY][this.gridX + 1] !== 7 &&
                this.x + this.size > (this.gridX + 1) * gridWidth
            ) {
                this.x = this.gridX * gridWidth + gridWidth - this.size;
            }

            if (randMap[this.gridY][this.gridX] === 5) {
                this.bombPower += 1;
                randMap[this.gridY][this.gridX] = 0;
            }

            if (randMap[this.gridY][this.gridX] === 6) {
                this.speed += 1;
                randMap[this.gridY][this.gridX] = 0;
            }

            if (randMap[this.gridY][this.gridX] === 7) {
                this.bombs += 1;
                randMap[this.gridY][this.gridX] = 0;
            }
        }

        sprites() {
            if (this.down) {
                this.srcy = 0;
            }
            if (this.right) {
                this.srcy = 26;
            }
            if (this.up) {
                this.srcy = 51;
            }
            if (this.left) {
                this.srcy = 76;
            }
            if (this.down || this.right || this.up || this.left) {
                this.countAnim += 1;
                if (this.countAnim > 25) this.countAnim = 0;
                this.srcx = Math.floor(this.countAnim / 5) * (this.width + 1);
            }
        }

        placeBomb() {
            placeBombSound.play()
            let bombx = this.gridX;
            let bomby = this.gridY;
            randMap[bomby][bombx] = 3;
            let bombPower = this.bombPower
            setTimeout(function () {
                setTimeout(function () {
                    for (let j = 0; j < randMap.length; j += 1) {
                        for (let i = 0; i < randMap[0].length; i += 1) {
                            if (randMap[j][i] === 4) {
                                randMap[j][i] = 0;
                            }
                        }
                    }
                }, 450);
                randMap[bomby][bombx] = 4;
                bombSound2.play()
                if (
                    randMap[bomby - 1][bombx] !== 1 &&
                    randMap[bomby - 1][bombx] !== 3 &&
                    randMap[bomby - 1][bombx] !== 5 &&
                    randMap[bomby - 1][bombx] !== 6 &&
                    randMap[bomby - 1][bombx] !== 7
                ) {
                    randMap[bomby - 1][bombx] = 4;
                    if (
                        bombPower > 1 &&
                        randMap[bomby - 2][bombx] !== 1 &&
                        randMap[bomby - 2][bombx] !== 3 &&
                        randMap[bomby - 2][bombx] !== 5 &&
                        randMap[bomby - 2][bombx] !== 6 &&
                        randMap[bomby - 2][bombx] !== 7
                    ) {
                        randMap[bomby - 2][bombx] = 4;
                        if (
                            bombPower > 2 &&
                            randMap[bomby - 3][bombx] !== 1 &&
                            randMap[bomby - 3][bombx] !== 3 &&
                            randMap[bomby - 3][bombx] !== 5 &&
                            randMap[bomby - 3][bombx] !== 6 &&
                            randMap[bomby - 3][bombx] !== 7
                        ) {
                            randMap[bomby - 3][bombx] = 4;
                        }
                    }
                }
                if (
                    randMap[bomby + 1][bombx] !== 1 &&
                    randMap[bomby + 1][bombx] !== 3 &&
                    randMap[bomby + 1][bombx] !== 5 &&
                    randMap[bomby + 1][bombx] !== 6 &&
                    randMap[bomby + 1][bombx] !== 7
                ) {
                    randMap[bomby + 1][bombx] = 4;
                    if (
                        bombPower > 1 &&
                        randMap[bomby + 2][bombx] !== 1 &&
                        randMap[bomby + 2][bombx] !== 3 &&
                        randMap[bomby + 2][bombx] !== 5 &&
                        randMap[bomby + 2][bombx] !== 6 &&
                        randMap[bomby + 2][bombx] !== 7
                    ) {
                        randMap[bomby + 2][bombx] = 4;
                        if (
                            bombPower > 2 &&
                            randMap[bomby + 3][bombx] !== 1 &&
                            randMap[bomby + 3][bombx] !== 3 &&
                            randMap[bomby + 3][bombx] !== 5 &&
                            randMap[bomby + 3][bombx] !== 6 &&
                            randMap[bomby + 3][bombx] !== 7
                        ) {
                            randMap[bomby + 3][bombx] = 4;
                        }
                    }
                }
                if (
                    randMap[bomby][bombx - 1] !== 1 &&
                    randMap[bomby][bombx - 1] !== 3 &&
                    randMap[bomby][bombx - 1] !== 5 &&
                    randMap[bomby][bombx - 1] !== 6 &&
                    randMap[bomby][bombx - 1] !== 7
                ) {
                    randMap[bomby][bombx - 1] = 4;
                    if (
                        bombPower > 1 &&
                        randMap[bomby][bombx - 2] !== 1 &&
                        randMap[bomby][bombx - 2] !== 3 &&
                        randMap[bomby][bombx - 2] !== 5 &&
                        randMap[bomby][bombx - 2] !== 6 &&
                        randMap[bomby][bombx - 2] !== 7
                    ) {
                        randMap[bomby][bombx - 2] = 4;
                        if (
                            bombPower > 2 &&
                            randMap[bomby][bombx - 3] !== 1 &&
                            randMap[bomby][bombx - 3] !== 3 &&
                            randMap[bomby][bombx - 3] !== 5 &&
                            randMap[bomby][bombx - 3] !== 6 &&
                            randMap[bomby][bombx - 3] !== 7
                        ) {
                            randMap[bomby][bombx - 3] = 4;
                        }
                    }
                }
                if (
                    randMap[bomby][bombx + 1] !== 1 &&
                    randMap[bomby][bombx + 1] !== 3 &&
                    randMap[bomby][bombx + 1] !== 5 &&
                    randMap[bomby][bombx + 1] !== 6 &&
                    randMap[bomby][bombx + 1] !== 7
                ) {
                    randMap[bomby][bombx + 1] = 4;
                    if (
                        bombPower > 1 &&
                        randMap[bomby][bombx + 2] !== 1 &&
                        randMap[bomby][bombx + 2] !== 3 &&
                        randMap[bomby][bombx + 2] !== 5 &&
                        randMap[bomby][bombx + 2] !== 6 &&
                        randMap[bomby][bombx + 2] !== 7
                    ) {
                        randMap[bomby][bombx + 2] = 4;
                        if (
                            bombPower > 2 &&
                            randMap[bomby][bombx + 3] !== 1 &&
                            randMap[bomby][bombx + 3] !== 3 &&
                            randMap[bomby][bombx + 3] !== 5 &&
                            randMap[bomby][bombx + 3] !== 6 &&
                            randMap[bomby][bombx + 3] !== 7
                        ) {
                            randMap[bomby][bombx + 3] = 4;
                        }
                    }
                }
            }, 2300);
        }

        checkDamage(damage = 0) {
            if (randMap[this.gridY][this.gridX] === 4) {
                this.health -= 1;
            }
            this.health -= damage;
            if (this.health < 0) {
                this.health = 0;
                stageComplete.play()
                gameOver(this)
            }
            this.health = Math.round(this.health)
        }

        checkEnemyDied() {
            if (randMap[this.gridY][this.gridX] === 4) {
                this.health -= 1;
                if (this.health < 0) {
                    if (Math.random() > 0.2) {
                        switch (Math.floor(Math.random() * 3)) {
                            case 0:
                                randMap[this.gridY][this.gridX] = 5;
                                break;
                            case 1:
                                randMap[this.gridY][this.gridX] = 6;
                                break;
                            case 2:
                                randMap[this.gridY][this.gridX] = 7;
                                break;
                        }
                    }
                    return true
                }
            }
        }

        randomMove() {
            switch (this.direction) {
                case 0:
                    this.x += 1;
                    this.gridX = Math.floor((this.x + this.size / 2) / gridWidth);
                    if (randMap[this.gridY][this.gridX + 1] !== 0 && randMap[this.gridY][this.gridX + 1] !== 4 && this.x + this.size > (this.gridX + 1) * gridWidth) {
                        this.x = this.gridX * gridWidth + gridWidth - this.size;
                        this.direction = Math.floor(Math.random() * 4)
                    }
                    break;
                case 1:
                    this.x -= 1;
                    this.gridX = Math.floor((this.x + this.size / 2) / gridWidth);
                    if (randMap[this.gridY][this.gridX - 1] !== 0 && randMap[this.gridY][this.gridX - 1] !== 4 && this.x < this.gridX * gridWidth) {
                        this.x = this.gridX * gridWidth;
                        this.direction = Math.floor(Math.random() * 4)
                    }
                    break;
                case 2:
                    this.y += 1;
                    this.gridY = Math.floor((this.y + this.size / 2) / gridHeigth);
                    if (randMap[this.gridY + 1][this.gridX] !== 0 && randMap[this.gridY + 1][this.gridX] !== 4 && this.y + this.size > (this.gridY + 1) * gridHeigth) {
                        this.y = this.gridY * gridHeigth + gridHeigth - this.size;
                        this.direction = Math.floor(Math.random() * 4)
                    }
                    break;
                case 3:
                    this.y -= 1;
                    this.gridY = Math.floor((this.y + this.size / 2) / gridHeigth);
                    if (randMap[this.gridY - 1][this.gridX] !== 0 && randMap[this.gridY - 1][this.gridX] !== 4 && this.y < this.gridY * gridHeigth) {
                        this.y = this.gridY * gridHeigth;
                        this.direction = Math.floor(Math.random() * 4)
                    }
                    break;
            }
            // Draw virus enemy instead of sprite
            drawVirusEnemy(this.x, this.y - 20 + offset, 30, 50, frames);
        }
    }

    const updateGameArea = () => {
        frames += 1;
        clear();
        renderMap(randMap);
        statusBar();
        newPlayer.newPos();
        newPlayer.update();
        newPlayer.checkDamage();
        if (frames % 150 === 0) {
            if (randMap[randy][randx] !== 0) {
                randx = Math.floor(Math.random() * map1[0].length);
                randy = Math.floor(Math.random() * map1.length);
            } else {
                enemies.push(new Player(randx * 50 + 10, randy * 50 + 10, 'white', 100, 5, enemies))
                randx = Math.floor(Math.random() * map1[0].length);
                randy = Math.floor(Math.random() * map1.length);
            }
        }
        enemies.forEach((enemy, i) => {
            enemy.randomMove()
            if (enemy.gridX === newPlayer.gridX && enemy.gridY === newPlayer.gridY) {
                newPlayer.checkDamage(1);
            }
            if (enemy.checkEnemyDied()) {
                enemies.splice(i, 1);
                newPlayer.enemiesKilled += 1;
            }
            
        });
        requestId = window.requestAnimationFrame(updateGameArea);
    }

    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 32:
                if (newPlayer.bombs > 0) {
                    newPlayer.bombs -= 1;
                    newPlayer.placeBomb();
                    setTimeout(() => {
                        newPlayer.bombs += 1;
                    }, 2300);
                }
                break;
            case 37:
                newPlayer.speedX = newPlayer.speed * -1;
                newPlayer.left = true;
                newPlayer.right = false;
                newPlayer.up = false;
                newPlayer.down = false;
                break;
            case 38:
                newPlayer.speedY = newPlayer.speed * -1;
                newPlayer.left = false;
                newPlayer.right = false;
                newPlayer.up = true;
                newPlayer.down = false;
                break;
            case 39:
                newPlayer.speedX = newPlayer.speed;
                newPlayer.left = false;
                newPlayer.right = true;
                newPlayer.up = false;
                newPlayer.down = false;
                break;
            case 40:
                newPlayer.speedY = newPlayer.speed;
                newPlayer.left = false;
                newPlayer.right = false;
                newPlayer.up = false;
                newPlayer.down = true;
                break;
        }
        if (!start) {
            if (e.keyCode === 13) {
                start = true;
                startGame();
            }
        } else {
            if (e.keyCode === 13) {
                window.location.reload();
            }
        }
    }

    document.onkeyup = function (e) {
        switch (e.keyCode) {
            case 37:
                newPlayer.speedX = 0;
                newPlayer.left = false;
                break;
            case 38:
                newPlayer.speedY = 0;
                newPlayer.up = false;
                break;
            case 39:
                newPlayer.speedX = 0;
                newPlayer.right = false;
                break;
            case 40:
                newPlayer.speedY = 0;
                newPlayer.down = false;
                break;
        }
    }

    let newPlayer = new Player(60, 60, 'white', 135, 100, 'Player 1', bomberman);
    let enemies = [];

    menu();

    title.play()
}