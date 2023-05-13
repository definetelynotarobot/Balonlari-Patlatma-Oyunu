// Canvas'ı kur
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Oyun değişkenlerini tanımla
var bubbles = [];
var score = 0;
var timeLeft = 30;

// Balon sınıfını oluştur
class Bubble {
  constructor(x, y, radius, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  // Balonu çiz
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // Balonu hareket ettir
  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.speedX = -this.speedX;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.speedY = -this.speedY;
    }
  }
}

// Balonlar oluştur
for (var i = 0; i < 30; i++) {
  var radius = Math.random() * 50 + 10;
  var x = Math.random() * (canvas.width - radius * 2) + radius;
  var y = Math.random() * (canvas.height - radius * 2) + radius;
  var color = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
  var speedX = (Math.random() - 0.5) * 10;
  var speedY = (Math.random() - 0.5) * 10;
  var bubble = new Bubble(x, y, radius, color, speedX, speedY);
  bubbles.push(bubble);
}

// Canvas'a tıklama olayı ekle
canvas.addEventListener("click", function(event) {
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;
  for (var i = 0; i < bubbles.length; i++) {
    var dx = bubbles[i].x - mouseX;
    var dy = bubbles[i].y - mouseY;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < bubbles[i].radius) {
      bubbles.splice(i, 1);
      score++;
      break;
    }
  }
});

// Zamanlayıcıyı oluştur
var timer = setInterval(function() {
  timeLeft--;
  if (timeLeft == 0) {
    clearInterval(timer);
    alert("Oyun bitti! Skorunuz: " + score);
  }
  
}, 1000);

// Oyunu güncelle
function update() {
  // Canvas'ı temizle
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Balonları çiz
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].draw();
    bubbles[i].move();
  }

  // Skor ve kalan zamanı display et
  ctx.fillStyle = "white";
  ctx.font = "30px Montserrat";
  ctx.fillText("Skor: " + score, 20, 40);
  ctx.fillText("Kalan zaman: " + timeLeft, canvas.width - 250, 40);

  // Update fonksiyonunu çağır
  requestAnimationFrame(update);
}


// Update fonksiyonunu çağır
update();


