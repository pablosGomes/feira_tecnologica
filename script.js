// ===================================
// Theme Toggle Functionality
// ===================================

const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement
const body = document.body

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light"
body.setAttribute("data-theme", currentTheme)

// Update icon based on current theme
function updateThemeIcon() {
  const icon = themeToggle.querySelector("i")
  const currentTheme = body.getAttribute("data-theme")

  if (currentTheme === "dark") {
    icon.classList.remove("bi-moon-fill")
    icon.classList.add("bi-sun-fill")
  } else {
    icon.classList.remove("bi-sun-fill")
    icon.classList.add("bi-moon-fill")
  }
}

// Initialize icon
updateThemeIcon()

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "light" ? "dark" : "light"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon()
})

// ===================================
// Navbar Scroll Effect
// ===================================

const navbar = document.getElementById("mainNav")

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// ===================================
// Active Navigation Link
// ===================================

const navLinks = document.querySelectorAll(".nav-link")
const currentPage = window.location.pathname.split("/").pop() || "index.html"

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href")
  if (linkPage === currentPage) {
    link.classList.add("active")
  } else {
    link.classList.remove("active")
  }
})

// Declare AOS variable before using it
const AOS = window.AOS

// ===================================
// AOS (Animate On Scroll) Initialization
// ===================================

if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  })
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// ===================================
// Mobile Menu Close on Link Click
// ===================================

const navbarCollapse = document.querySelector(".navbar-collapse")
const navbarToggler = document.querySelector(".navbar-toggler")

if (navbarCollapse && navbarToggler) {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        navbarToggler.click()
      }
    })
  })
}

// ===================================
// Form Validation (for contact page)
// ===================================

const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const message = document.getElementById("message").value.trim()

    // Basic validation
    if (!name || !email || !message) {
      showAlert("Por favor, preencha todos os campos.", "danger")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      showAlert("Por favor, insira um email válido.", "danger")
      return
    }

    // Success message
    showAlert("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success")
    contactForm.reset()
  })
}

// ===================================
// Quiz Functionality (for quiz page)
// ===================================

const quizForm = document.getElementById("quizForm")
const quizResult = document.getElementById("quizResult")

if (quizForm) {
  quizForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get all selected answers
    const answers = []
    const questions = quizForm.querySelectorAll(".quiz-question")

    questions.forEach((question, index) => {
      const selected = question.querySelector('input[type="radio"]:checked')
      if (selected) {
        answers.push(selected.value)
      }
    })

    // Check if all questions are answered
    if (answers.length < questions.length) {
      showAlert("Por favor, responda todas as perguntas.", "warning")
      return
    }

    // Calculate result
    const result = calculateQuizResult(answers)
    displayQuizResult(result)

    // Scroll to result
    quizResult.scrollIntoView({ behavior: "smooth", block: "center" })
  })
}

function calculateQuizResult(answers) {
  // Count occurrences of each answer type
  const counts = {}
  answers.forEach((answer) => {
    counts[answer] = (counts[answer] || 0) + 1
  })

  // Find the most common answer
  let maxCount = 0
  let result = ""

  for (const [key, value] of Object.entries(counts)) {
    if (value > maxCount) {
      maxCount = value
      result = key
    }
  }

  return result
}

function displayQuizResult(result) {
  const results = {
    descoberta: {
      title: "Fase da Descoberta",
      character: "Ana",
      description:
        "Você está no início de sua jornada de autoconhecimento. Como Ana, você está começando a questionar suas crenças e padrões, abrindo-se para novas possibilidades de compreensão sobre si mesmo.",
      advice:
        "Continue explorando com curiosidade e abertura. Permita-se fazer perguntas difíceis e busque experiências que desafiem sua zona de conforto.",
      color: "primary",
    },
    conflito: {
      title: "Fase do Conflito",
      character: "Bruno",
      description:
        "Você está enfrentando tensões internas significativas. Como Bruno, você reconhece contradições em sua vida e está lutando para reconciliar diferentes aspectos de sua identidade.",
      advice:
        "Aceite que o conflito é parte natural do crescimento. Use este momento para integrar diferentes partes de si mesmo, sem julgamento.",
      color: "warning",
    },
    reflexao: {
      title: "Fase da Reflexão",
      character: "Clara",
      description:
        "Você está em um momento de profunda contemplação. Como Clara, você está processando experiências passadas e buscando compreender padrões mais profundos em sua vida.",
      advice:
        "Dedique tempo para a introspecção. Journaling, meditação e conversas profundas podem ser ferramentas valiosas neste momento.",
      color: "info",
    },
    transformacao: {
      title: "Fase da Transformação",
      character: "Daniel",
      description:
        "Você está experimentando mudanças significativas em sua consciência. Como Daniel, você está integrando insights e começando a viver de forma mais autêntica e alinhada com sua verdadeira essência.",
      advice:
        "Continue praticando a autenticidade. Compartilhe suas descobertas com outros e permita que sua transformação inspire aqueles ao seu redor.",
      color: "success",
    },
  }

  const resultData = results[result] || results["descoberta"]

  quizResult.innerHTML = `
        <div class="alert alert-${resultData.color} border-0 shadow-sm" role="alert">
            <h3 class="alert-heading mb-3">
                <i class="bi bi-star-fill me-2"></i>
                ${resultData.title}
            </h3>
            <p class="mb-3"><strong>Personagem:</strong> ${resultData.character}</p>
            <p class="mb-3">${resultData.description}</p>
            <hr>
            <p class="mb-0"><strong>Conselho:</strong> ${resultData.advice}</p>
        </div>
        <div class="text-center mt-4">
            <button class="btn btn-outline-primary" onclick="location.reload()">
                Refazer Quiz
            </button>
            <a href="conexao.html" class="btn btn-primary ms-2">
                Compartilhar Resultado
            </a>
        </div>
    `

  quizResult.style.display = "block"
}

// ===================================
// Alert Helper Function
// ===================================

function showAlert(message, type = "info") {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`
  alertDiv.style.zIndex = "9999"
  alertDiv.style.minWidth = "300px"
  alertDiv.setAttribute("role", "alert")
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `

  document.body.appendChild(alertDiv)

  // Auto dismiss after 5 seconds
  setTimeout(() => {
    alertDiv.remove()
  }, 5000)
}

// ===================================
// Timeline Interaction (for O Quarto page)
// ===================================

const timelineItems = document.querySelectorAll(".timeline-item")

if (timelineItems.length > 0) {
  timelineItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      timelineItems.forEach((i) => i.classList.remove("active"))

      // Add active class to clicked item
      this.classList.add("active")
    })
  })
}

// ===================================
// Progress Bar Animation (for A Jornada page)
// ===================================

const progressBars = document.querySelectorAll(".progress-bar")

if (progressBars.length > 0) {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target
        const targetWidth = progressBar.getAttribute("aria-valuenow")
        progressBar.style.width = targetWidth + "%"
      }
    })
  }, observerOptions)

  progressBars.forEach((bar) => {
    bar.style.width = "0%"
    bar.style.transition = "width 1s ease-in-out"
    progressObserver.observe(bar)
  })
}

console.log("[v0] Filhos do Quarto - Website initialized successfully")
