window.onload = () => {

    let start = false;
    let gameOverState = false;
    let nameInputMode = false;
    let leaderboardMode = false;
    let playerName = '';
    let finalScore = 0;
    let nameError = '';
    let cursorBlink = 0;
    context = canvas.getContext("2d");

    const menu = () => {
        renderMap(mapMenu)
        for (let i = 0; i < mapMenu[0].length; i += 1) {
            drawCyberSolidBlock(50 * i, 0, 50, 50)
        }
        // Draw at larger size to account for transparent padding in the image
        const imageWidth = 600;
        const imageHeight = 600;
        context.drawImage(superBomberman, (canvas.width - imageWidth) / 2, canvas.height / 1.55 - 400, imageWidth, imageHeight)
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

    const getScores = () => {
        const storedScores = localStorage.getItem('gameScores');
        if (storedScores) {
            return JSON.parse(storedScores);
        }
        return [];
    };

    const saveScore = (name, score) => {
        // Get existing scores from localStorage
        let scores = getScores();
        
        // Check if name already exists (case-insensitive)
        const nameExists = scores.some(entry => entry.name.toLowerCase() === name.toLowerCase());
        if (nameExists) {
            return false; // Name already exists
        }
        
        // Add new score entry
        scores.push({
            name: name,
            score: score,
            date: new Date().toISOString()
        });
        
        // Remove duplicates by name (case-insensitive) - keep the highest score for each name
        const uniqueScores = [];
        const seenNames = new Set();
        scores.forEach(entry => {
            const lowerName = entry.name.toLowerCase();
            if (!seenNames.has(lowerName)) {
                seenNames.add(lowerName);
                uniqueScores.push(entry);
            } else {
                // If duplicate found, keep the one with higher score
                const existingIndex = uniqueScores.findIndex(e => e.name.toLowerCase() === lowerName);
                if (existingIndex !== -1 && entry.score > uniqueScores[existingIndex].score) {
                    uniqueScores[existingIndex] = entry;
                }
            }
        });
        
        // Sort by score (highest first)
        uniqueScores.sort((a, b) => b.score - a.score);
        
        // Keep only top 5 scores
        const top5Scores = uniqueScores.slice(0, 5);
        
        // Save back to localStorage
        localStorage.setItem('gameScores', JSON.stringify(top5Scores));
        return true; // Successfully saved
    };

    const drawNameInputScreen = () => {
        clear();
        for (let i = 0; i < mapMenu[0].length; i += 1) {
            drawCyberSolidBlock(50 * i, 0, 50, 50)
        }
        renderMap(mapMenu);
        
        // Game Over text
        context.font = "48px silkscreenbold";
        context.fillStyle = '#ff0088';
        context.strokeStyle = '#ffffff';
        context.lineWidth = 3;
        context.strokeText(`GAME OVER!`, 200, canvas.height / 2 - 150);
        context.fillText(`GAME OVER!`, 200, canvas.height / 2 - 150);
        
        // Score display
        context.font = "32px silkscreenbold";
        context.fillStyle = '#00ffaa';
        context.strokeStyle = '#000000';
        context.lineWidth = 2;
        context.strokeText(`YOUR FINAL SCORE: ${finalScore}`, 120, canvas.height / 2 - 80);
        context.fillText(`YOUR FINAL SCORE: ${finalScore}`, 120, canvas.height / 2 - 80);
        
        // Name input prompt
        context.font = "24px silkscreenbold";
        context.fillStyle = '#00ffff';
        context.strokeStyle = '#000000';
        context.lineWidth = 2;
        context.strokeText(`ENTER YOUR NAME:`, 150, canvas.height / 2 - 10);
        context.fillText(`ENTER YOUR NAME:`, 150, canvas.height / 2 - 10);
        
        // Name input box background
        const inputX = 150;
        const inputY = canvas.height / 2 + 20;
        const inputWidth = 450;
        const inputHeight = 50;
        
        // Draw input box
        const gradient = context.createLinearGradient(inputX, inputY, inputX + inputWidth, inputY + inputHeight);
        gradient.addColorStop(0, '#0a0a0f');
        gradient.addColorStop(0.5, '#1a1a2e');
        gradient.addColorStop(1, '#0a0a0f');
        context.fillStyle = gradient;
        context.fillRect(inputX, inputY, inputWidth, inputHeight);
        
        // Border
        context.strokeStyle = '#00ffaa';
        context.lineWidth = 3;
        context.strokeRect(inputX, inputY, inputWidth, inputHeight);
        
        // Player name text
        context.font = "28px silkscreenbold";
        context.fillStyle = '#00ffaa';
        context.fillText(playerName, inputX + 10, inputY + 35);
        
        // Cursor blink effect
        cursorBlink += 1;
        if (cursorBlink > 30) cursorBlink = 0;
        if (cursorBlink < 15) {
            const textWidth = context.measureText(playerName).width;
            context.fillStyle = '#00ffaa';
            context.fillRect(inputX + 15 + textWidth, inputY + 15, 3, 25);
        }
        
        // Error message
        if (nameError) {
            context.font = "20px silkscreenbold";
            context.fillStyle = '#ff0088';
            context.strokeStyle = '#000000';
            context.lineWidth = 2;
            context.strokeText(nameError, 150, inputY + 80);
            context.fillText(nameError, 150, inputY + 80);
        }
        
        // Instructions
        context.font = "18px silkscreenbold";
        context.fillStyle = '#00ffff';
        context.strokeStyle = '#000000';
        context.lineWidth = 1;
        context.strokeText(`PRESS ENTER TO SAVE`, 200, inputY + 120);
        context.fillText(`PRESS ENTER TO SAVE`, 200, inputY + 120);
    };

    const drawLeaderboard = () => {
        clear();
        for (let i = 0; i < mapMenu[0].length; i += 1) {
            drawCyberSolidBlock(50 * i, 0, 50, 50)
        }
        renderMap(mapMenu);
        
        // Leaderboard title
        context.font = "42px silkscreenbold";
        context.fillStyle = '#00ffaa';
        context.strokeStyle = '#000000';
        context.lineWidth = 3;
        context.strokeText(`LEADERBOARD`, 200, 80);
        context.fillText(`LEADERBOARD`, 200, 80);
        
        // Get and display scores (already limited to top 5, but ensure no duplicates)
        let scores = getScores();
        
        // Remove any duplicates (defensive check)
        const seenNames = new Set();
        const uniqueScores = scores.filter(entry => {
            const lowerName = entry.name.toLowerCase();
            if (!seenNames.has(lowerName)) {
                seenNames.add(lowerName);
                return true;
            }
            return false;
        });
        
        // Sort by score (highest first) and limit to top 5
        uniqueScores.sort((a, b) => b.score - a.score);
        const topScores = uniqueScores.slice(0, 5);
        
        if (topScores.length === 0) {
            context.font = "24px silkscreenbold";
            context.fillStyle = '#00ffff';
            context.strokeStyle = '#000000';
            context.lineWidth = 2;
            context.strokeText(`NO SCORES YET`, 250, canvas.height / 2);
            context.fillText(`NO SCORES YET`, 250, canvas.height / 2);
        } else {
            // Header
            context.font = "20px silkscreenbold";
            context.fillStyle = '#00ffaa';
            context.strokeStyle = '#000000';
            context.lineWidth = 1;
            context.strokeText(`RANK`, 100, 130);
            context.fillText(`RANK`, 100, 130);
            context.strokeText(`NAME`, 200, 130);
            context.fillText(`NAME`, 200, 130);
            context.strokeText(`SCORE`, 500, 130);
            context.fillText(`SCORE`, 500, 130);
            
            // Score entries
            topScores.forEach((entry, index) => {
                const yPos = 160 + index * 35;
                const rank = index + 1;
                
                // Highlight current player's score
                if (entry.name === playerName && entry.score === finalScore) {
                    context.fillStyle = 'rgba(0, 255, 170, 0.3)';
                    context.fillRect(80, yPos - 25, 590, 30);
                }
                
                // Rank
                context.font = "18px silkscreenbold";
                context.fillStyle = rank <= 3 ? '#ff0088' : '#00ffff';
                context.strokeStyle = '#000000';
                context.lineWidth = 1;
                const rankText = rank < 10 ? `0${rank}` : `${rank}`;
                context.strokeText(rankText, 100, yPos);
                context.fillText(rankText, 100, yPos);
                
                // Name
                context.fillStyle = entry.name === playerName && entry.score === finalScore ? '#00ffaa' : '#ffffff';
                const displayName = entry.name.length > 20 ? entry.name.substring(0, 17) + '...' : entry.name;
                context.strokeText(displayName, 200, yPos);
                context.fillText(displayName, 200, yPos);
                
                // Score
                context.fillStyle = entry.name === playerName && entry.score === finalScore ? '#00ffaa' : '#ffffff';
                const scoreText = entry.score < 10 ? `0${entry.score}` : `${entry.score}`;
                context.strokeText(scoreText, 500, yPos);
                context.fillText(scoreText, 500, yPos);
            });
        }
        
        // Instructions - centered below leaderboard
        context.font = "22px silkscreenbold";
        context.fillStyle = '#00ffff';
        context.strokeStyle = '#000000';
        context.lineWidth = 2;
        const instructionText = `PRESS ENTER TO PLAY AGAIN`;
        const textWidth = context.measureText(instructionText).width;
        const instructionX = (canvas.width - textWidth) / 2;
        // Position below leaderboard entries (last entry at ~300, add spacing)
        const instructionY = topScores.length > 0 ? 160 + topScores.length * 35 + 60 : canvas.height / 2 + 100;
        context.strokeText(instructionText, instructionX, instructionY);
        context.fillText(instructionText, instructionX, instructionY);
    };

    const gameOver = (player) => {
        level1.pause()
        setTimeout(() => {
            window.cancelAnimationFrame(requestId);
            gameOverState = true;
            nameInputMode = true;
            leaderboardMode = false;
            finalScore = newPlayer.enemiesKilled;
            playerName = '';
            nameError = '';
            cursorBlink = 0;
            gameOverLoop();
        }, 500);
    }

    const gameOverLoop = () => {
        if (nameInputMode) {
            drawNameInputScreen();
        } else if (leaderboardMode) {
            drawLeaderboard();
        }
        requestId = window.requestAnimationFrame(gameOverLoop);
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

            // Calculate sprite top position (sprite is drawn 20 pixels above player position)
            const spriteTop = this.y - 20;
            const spriteTopGridY = Math.floor(spriteTop / gridHeigth);
            const spriteTopGridX = Math.floor((this.x + this.size / 2) / gridWidth);

            // Check upward collision using sprite's top position
            // If sprite's top is in a wall cell, prevent it from going further up
            if (
                spriteTopGridY >= 0 &&
                spriteTopGridY < randMap.length &&
                spriteTopGridX >= 0 &&
                spriteTopGridX < randMap[0].length &&
                randMap[spriteTopGridY][spriteTopGridX] !== 0 &&
                randMap[spriteTopGridY][spriteTopGridX] !== 4 &&
                randMap[spriteTopGridY][spriteTopGridX] !== 5 &&
                randMap[spriteTopGridY][spriteTopGridX] !== 6 &&
                randMap[spriteTopGridY][spriteTopGridX] !== 7
            ) {
                // Align sprite top to bottom of the wall cell
                this.y = (spriteTopGridY + 1) * gridHeigth + 20;
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
        // Handle game over states
        if (gameOverState) {
            if (nameInputMode) {
                // Handle name input
                if (e.keyCode === 13) { // Enter key
                    const trimmedName = playerName.trim();
                    if (trimmedName === '') {
                        nameError = 'NAME CANNOT BE EMPTY!';
                    } else {
                        if (saveScore(trimmedName, finalScore)) {
                            playerName = trimmedName;
                            nameInputMode = false;
                            leaderboardMode = true;
                            nameError = '';
                        } else {
                            nameError = `NAME "${trimmedName}" ALREADY EXISTS!`;
                        }
                    }
                } else if (e.keyCode === 8) { // Backspace
                    playerName = playerName.slice(0, -1);
                    nameError = '';
                } else if (e.keyCode >= 65 && e.keyCode <= 90) { // A-Z
                    if (playerName.length < 20) {
                        playerName += String.fromCharCode(e.keyCode);
                        nameError = '';
                    }
                } else if (e.keyCode >= 48 && e.keyCode <= 57) { // 0-9
                    if (playerName.length < 20) {
                        playerName += String.fromCharCode(e.keyCode);
                        nameError = '';
                    }
                } else if (e.keyCode === 32) { // Space
                    if (playerName.length < 20) {
                        playerName += ' ';
                        nameError = '';
                    }
                }
            } else if (leaderboardMode) {
                // Handle leaderboard
                if (e.keyCode === 13) { // Enter key
                    window.location.reload();
                }
            }
            return;
        }

        // Handle normal game controls
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